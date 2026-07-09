import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
// @ts-expect-error - importado como texto pelo bundler
import script from "./noteactions.inline.ts"
// @ts-expect-error - importado como texto pelo bundler
import styles from "./noteactions.scss"

export interface Options {
  repo: string
  branch: string
  showDownloadMd: boolean
  showPdf: boolean
  showFullscreen: boolean
  showEdit: boolean
}

const defaultOptions: Options = {
  repo: "luanmle/concursos-notes",
  branch: "v5",
  showDownloadMd: true,
  showPdf: true,
  showFullscreen: true,
  showEdit: true,
}

const NoteActionsConstructor: QuartzComponentConstructor<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  const NoteActions: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const filePath = fileData.filePath as string | undefined
    const slug = fileData.slug as string | undefined
    // páginas virtuais (tags, pastas) não têm arquivo fonte
    if (!filePath || !slug) return null

    const editUrl = `https://github.com/${opts.repo}/edit/${opts.branch}/${filePath}`
    const mdUrl = `/${slug}.md`
    const mdName = filePath.split("/").pop() ?? "nota.md"

    return (
      <div class={`note-actions ${displayClass ?? ""}`}>
        {opts.showDownloadMd && (
          <a
            class="note-actions-btn"
            href={mdUrl}
            download={mdName}
            title="Baixar como Markdown (.md)"
            aria-label="Baixar como Markdown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>.md</span>
          </a>
        )}
        {opts.showPdf && (
          <button
            class="note-actions-btn"
            id="note-actions-print"
            title="Imprimir ou salvar como PDF"
            aria-label="Imprimir ou salvar como PDF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>PDF</span>
          </button>
        )}
        {opts.showFullscreen && (
          <button
            class="note-actions-btn"
            id="note-actions-fullscreen"
            title="Alternar tela cheia"
            aria-label="Alternar tela cheia"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <span>Tela cheia</span>
          </button>
        )}
        {opts.showEdit && (
          <a
            class="note-actions-btn"
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Editar esta nota no GitHub"
            aria-label="Editar esta nota no GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
            <span>Editar no GitHub</span>
          </a>
        )}
      </div>
    )
  }

  NoteActions.css = styles
  NoteActions.afterDOMLoaded = script
  return NoteActions
}

export default NoteActionsConstructor
