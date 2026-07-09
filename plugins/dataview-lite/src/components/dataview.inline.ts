// Interpretador de um subconjunto da linguagem Dataview, executado no navegador
// sobre o índice JSON injetado pelo componente DataviewLite.
//
// Suportado:
//   TABLE [WITHOUT ID] col[, col…]   (col := expr [AS "alias"])
//   LIST
//   FROM #tag | "pasta"  (múltiplas fontes com OR)
//   WHERE campo = "v" | campo != "v" | contains(campo, "v")  (encadeadas com AND)
//   SORT expr [ASC|DESC]
//   GROUP BY campo [AS "alias"]
//   length(rows...) vira contagem quando há GROUP BY

interface Entry {
  slug: string
  title: string
  folder: string
  tags: string[]
  fm: Record<string, unknown>
  created?: string
  modified?: string
}

interface Column {
  expr: string
  alias?: string
}

interface Query {
  kind: "TABLE" | "LIST"
  withoutId: boolean
  columns: Column[]
  sources: { tag?: string; folder?: string }[]
  where: { field: string; op: "=" | "!=" | "contains"; value: string }[]
  sort?: { expr: string; desc: boolean }
  groupBy?: { field: string; alias?: string }
}

function decodeQuery(b64: string): string {
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function escapeHtml(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function parseQuery(raw: string): Query {
  const text = raw.replace(/\s+/g, " ").trim()
  const kindMatch = text.match(/^(TABLE|LIST)(\s+WITHOUT\s+ID)?/i)
  if (!kindMatch) throw new Error("A consulta deve começar com TABLE ou LIST")
  const kind = kindMatch[1].toUpperCase() as "TABLE" | "LIST"
  const withoutId = !!kindMatch[2]

  const kw = /\s+(FROM|WHERE|SORT|GROUP\s+BY)\s+/gi
  const head = text.slice(kindMatch[0].length)
  const sections: Record<string, string> = {}
  let lastKey = "_cols"
  let lastIdx = 0
  let m: RegExpExecArray | null
  while ((m = kw.exec(head)) !== null) {
    sections[lastKey] = head.slice(lastIdx, m.index).trim()
    lastKey = m[1].toUpperCase().replace(/\s+/g, " ")
    lastIdx = kw.lastIndex
  }
  sections[lastKey] = head.slice(lastIdx).trim()

  const columns: Column[] = []
  if (kind === "TABLE" && sections["_cols"]) {
    for (const part of sections["_cols"].split(",")) {
      const p = part.trim()
      if (!p) continue
      const aliasMatch = p.match(/^(.+?)\s+AS\s+"([^"]+)"$/i)
      if (aliasMatch) columns.push({ expr: aliasMatch[1].trim(), alias: aliasMatch[2] })
      else columns.push({ expr: p })
    }
  }

  const sources: Query["sources"] = []
  if (sections["FROM"]) {
    for (const src of sections["FROM"].split(/\s+OR\s+/i)) {
      const s = src.trim()
      if (s.startsWith("#")) sources.push({ tag: s.slice(1) })
      else if (s.startsWith('"')) sources.push({ folder: s.replace(/^"|"$/g, "") })
    }
  }

  const where: Query["where"] = []
  if (sections["WHERE"]) {
    for (const cond of sections["WHERE"].split(/\s+AND\s+/i)) {
      const c = cond.trim()
      let cm = c.match(/^contains\(\s*([\w.-]+)\s*,\s*"([^"]*)"\s*\)$/i)
      if (cm) {
        where.push({ field: cm[1], op: "contains", value: cm[2] })
        continue
      }
      cm = c.match(/^([\w.-]+)\s*(!=|=)\s*"([^"]*)"$/)
      if (cm) {
        where.push({ field: cm[1], op: cm[2] as "=" | "!=", value: cm[3] })
        continue
      }
      throw new Error(`Condição WHERE não suportada: ${c}`)
    }
  }

  let sort: Query["sort"]
  if (sections["SORT"]) {
    const sm = sections["SORT"].match(/^(.+?)(?:\s+(ASC|DESC))?$/i)
    if (sm) sort = { expr: sm[1].trim(), desc: (sm[2] ?? "").toUpperCase() === "DESC" }
  }

  let groupBy: Query["groupBy"]
  if (sections["GROUP BY"]) {
    const gm = sections["GROUP BY"].match(/^([\w.-]+)(?:\s+AS\s+"([^"]+)")?$/i)
    if (!gm) throw new Error(`GROUP BY não suportado: ${sections["GROUP BY"]}`)
    groupBy = { field: gm[1], alias: gm[2] }
  }

  return { kind, withoutId, columns, sources, where, sort, groupBy }
}

function resolveField(e: Entry, field: string): unknown {
  const f = field.toLowerCase()
  if (f === "file.link" || f === "file.name") return e.title
  if (f === "file.folder") return e.folder
  if (f === "file.ctime" || f === "data_criacao") return e.fm["data_criacao"] ?? e.created
  if (f === "file.mtime") return e.modified
  if (f === "tags") return e.tags
  return e.fm[field] ?? e.fm[f]
}

function asComparable(v: unknown): string | number {
  if (typeof v === "number") return v
  if (Array.isArray(v)) return v.join(", ")
  return String(v ?? "")
}

function matchesSources(e: Entry, sources: Query["sources"]): boolean {
  if (sources.length === 0) return true
  return sources.some((s) => {
    if (s.tag) {
      const t = s.tag
      return e.tags.some((tag) => tag === t || tag.startsWith(t + "/"))
    }
    if (s.folder) {
      const folder = s.folder.replace(/^\/+|\/+$/g, "")
      return e.folder === folder || e.folder.startsWith(folder + "/")
    }
    return false
  })
}

function matchesWhere(e: Entry, where: Query["where"]): boolean {
  return where.every((c) => {
    const v = resolveField(e, c.field)
    const s = Array.isArray(v) ? v.map(String) : String(v ?? "")
    if (c.op === "=") return String(v ?? "") === c.value
    if (c.op === "!=") return String(v ?? "") !== c.value
    if (c.op === "contains") {
      if (Array.isArray(s)) return s.includes(c.value)
      return s.includes(c.value)
    }
    return true
  })
}

function fileLink(e: Entry): string {
  return `<a href="/${encodeURI(e.slug)}" class="internal">${escapeHtml(e.title)}</a>`
}

function renderValue(e: Entry, expr: string): string {
  if (expr.toLowerCase() === "file.link") return fileLink(e)
  const v = resolveField(e, expr)
  if (Array.isArray(v)) return escapeHtml(v.join(", "))
  return escapeHtml(v ?? "—")
}

function renderQuery(el: HTMLElement, q: Query, files: Entry[]): void {
  let rows = files.filter((e) => matchesSources(e, q.sources) && matchesWhere(e, q.where))

  if (q.groupBy) {
    const groups = new Map<string, Entry[]>()
    for (const e of rows) {
      const raw = resolveField(e, q.groupBy.field)
      const key = Array.isArray(raw) ? raw.join(", ") : String(raw ?? "(sem valor)")
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key)!.push(e)
    }
    let entries = [...groups.entries()]

    const isCount = (expr: string) => /length\s*\(\s*rows/i.test(expr)
    if (q.sort) {
      const sortByCount =
        isCount(q.sort.expr) ||
        q.columns.some((c) => isCount(c.expr) && c.alias?.toLowerCase() === q.sort!.expr.toLowerCase())
      entries.sort((a, b) => {
        const cmp = sortByCount
          ? a[1].length - b[1].length
          : a[0].localeCompare(b[0], "pt-BR")
        return q.sort!.desc ? -cmp : cmp
      })
    } else {
      entries.sort((a, b) => a[0].localeCompare(b[0], "pt-BR"))
    }

    if (q.kind === "LIST") {
      let html = ""
      for (const [key, group] of entries) {
        html += `<h4 class="dataview-lite-group">${escapeHtml(key)} <span class="dataview-lite-count">(${group.length})</span></h4>`
        html += `<ul class="dataview-lite-list">${group.map((e) => `<li>${fileLink(e)}</li>`).join("")}</ul>`
      }
      el.innerHTML = html || emptyMessage()
      return
    }

    const cols = q.columns.length > 0 ? q.columns : [{ expr: "length(rows)", alias: "Notas" }]
    const headers = [q.groupBy.alias ?? q.groupBy.field, ...cols.map((c) => c.alias ?? c.expr)]
    let body = ""
    for (const [key, group] of entries) {
      const cells = cols.map((c) => {
        if (isCount(c.expr)) return String(group.length)
        if (c.expr.toLowerCase() === q.groupBy!.field.toLowerCase()) return escapeHtml(key)
        const uniq = [...new Set(group.map((e) => asComparable(resolveField(e, c.expr))))].filter(
          (v) => v !== "",
        )
        return escapeHtml(uniq.join(", ") || "—")
      })
      body += `<tr><td>${escapeHtml(key)}</td>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`
    }
    el.innerHTML = tableHtml(headers, body)
    return
  }

  if (q.sort) {
    const { expr, desc } = q.sort
    rows.sort((a, b) => {
      const va = asComparable(resolveField(a, expr))
      const vb = asComparable(resolveField(b, expr))
      const cmp =
        typeof va === "number" && typeof vb === "number"
          ? va - vb
          : String(va).localeCompare(String(vb), "pt-BR")
      return desc ? -cmp : cmp
    })
  } else {
    rows.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
  }

  if (q.kind === "LIST") {
    el.innerHTML = rows.length
      ? `<ul class="dataview-lite-list">${rows.map((e) => `<li>${fileLink(e)}</li>`).join("")}</ul>`
      : emptyMessage()
    return
  }

  const cols: Column[] = q.withoutId ? [...q.columns] : [{ expr: "file.link", alias: "Nota" }, ...q.columns]
  const headers = cols.map((c) => c.alias ?? c.expr)
  const body = rows
    .map((e) => `<tr>${cols.map((c) => `<td>${renderValue(e, c.expr)}</td>`).join("")}</tr>`)
    .join("")
  el.innerHTML = rows.length ? tableHtml(headers, body) : emptyMessage()
}

function tableHtml(headers: string[], body: string): string {
  return `<div class="table-container dataview-lite-table"><table><thead><tr>${headers
    .map((h) => `<th>${escapeHtml(h)}</th>`)
    .join("")}</tr></thead><tbody>${body}</tbody></table></div>`
}

function emptyMessage(): string {
  return `<p class="dataview-lite-empty">Nenhuma nota encontrada para esta consulta.</p>`
}

function setupDataviewLite() {
  const blocks = document.querySelectorAll<HTMLElement>(".dataview-lite[data-query]")
  if (blocks.length === 0) return
  const island = document.getElementById("dataview-lite-index")
  if (!island || !island.textContent) return
  let files: Entry[]
  try {
    files = JSON.parse(island.textContent)
  } catch {
    return
  }
  for (const el of blocks) {
    try {
      const q = parseQuery(decodeQuery(el.dataset.query!))
      renderQuery(el, q, files)
    } catch (err) {
      el.innerHTML = `<div class="dataview-lite-error"><strong>Consulta Dataview não suportada:</strong> ${escapeHtml(
        err instanceof Error ? err.message : String(err),
      )}</div>`
    }
  }
}

document.addEventListener("nav", setupDataviewLite)
document.addEventListener("render", setupDataviewLite)
