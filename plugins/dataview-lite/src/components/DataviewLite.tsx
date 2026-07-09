import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
// @ts-expect-error - importado como texto pelo bundler
import script from "./dataview.inline.ts"
// @ts-expect-error - importado como texto pelo bundler
import styles from "./dataview.scss"

interface IndexEntry {
  slug: string
  title: string
  folder: string
  tags: string[]
  fm: Record<string, unknown>
  created?: string
  modified?: string
}

const EXCLUDED_FM_KEYS = new Set(["password", "title", "tags"])

const DataviewLiteConstructor: QuartzComponentConstructor = () => {
  const DataviewLite: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    // só injeta o índice em páginas que contêm blocos dataview
    if (!fileData.dataviewLite) return null

    const entries: IndexEntry[] = []
    for (const f of allFiles) {
      const slug = f.slug as string | undefined
      if (!slug || slug === "404") continue
      const frontmatter = (f.frontmatter ?? {}) as Record<string, unknown>
      const filePath = (f.filePath as string | undefined) ?? ""
      const folder = filePath.replace(/^content\//, "").split("/").slice(0, -1).join("/")
      const rawTags = frontmatter.tags ?? []
      const tags = (Array.isArray(rawTags) ? rawTags : [rawTags])
        .map((t) => String(t).replace(/^#/, ""))
        .filter(Boolean)
      const fm: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(frontmatter)) {
        if (!EXCLUDED_FM_KEYS.has(k) && v !== null && v !== undefined) fm[k] = v
      }
      const dates = f.dates as { created?: Date; modified?: Date } | undefined
      entries.push({
        slug,
        title: (frontmatter.title as string) ?? slug.split("/").pop() ?? slug,
        folder,
        tags,
        fm,
        created: dates?.created ? new Date(dates.created).toISOString() : undefined,
        modified: dates?.modified ? new Date(dates.modified).toISOString() : undefined,
      })
    }

    const json = JSON.stringify(entries).replace(/</g, "\\u003c")
    return (
      <script
        id="dataview-lite-index"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    )
  }

  DataviewLite.css = styles
  DataviewLite.afterDOMLoaded = script
  return DataviewLite
}

export default DataviewLiteConstructor
