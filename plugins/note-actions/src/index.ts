import path from "node:path"
import fs from "node:fs/promises"
import type { QuartzEmitterPlugin, FilePath } from "@quartz-community/types"

export interface Options {
  repo: string
  branch: string
  showDownloadMd: boolean
  showPdf: boolean
  showFullscreen: boolean
  showEdit: boolean
}

/**
 * Emitter: copia o markdown original de cada nota para `public/<slug>.md`,
 * permitindo o botão "Baixar .md" funcionar offline e sem depender do GitHub.
 * Notas com frontmatter `password` (encrypted-pages) são puladas para não
 * vazar o conteúdo em texto puro.
 */
const NoteActionsEmitter: QuartzEmitterPlugin<Partial<Options>> = () => ({
  name: "NoteActionsRawMd",
  async emit(ctx, content) {
    const emitted: FilePath[] = []
    for (const [, file] of content) {
      const data = (file.data ?? {}) as Record<string, unknown>
      const filePath = data.filePath as string | undefined
      const slug = data.slug as string | undefined
      const frontmatter = (data.frontmatter ?? {}) as Record<string, unknown>
      if (!filePath || !slug) continue
      if (frontmatter.password) continue
      try {
        const src = await fs.readFile(path.resolve(filePath), "utf8")
        const dest = path.join(ctx.argv.output, slug + ".md")
        await fs.mkdir(path.dirname(dest), { recursive: true })
        await fs.writeFile(dest, src)
        emitted.push(dest as FilePath)
      } catch {
        // arquivo pode ter sido movido durante o watch; ignora
      }
    }
    return emitted
  },
  async *partialEmit() {},
})

export default NoteActionsEmitter
