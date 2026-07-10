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

    const showDownload = opts.showDownloadMd || opts.showPdf

    return (
      <div class={`note-actions ${displayClass ?? ""}`}>
        {showDownload && (
          <div class="note-actions-dl">
            <button
              class="note-actions-btn icon-only"
              id="note-actions-download"
              title="Baixar"
              aria-label="Baixar"
              aria-haspopup="true"
              aria-expanded="false"
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
            </button>
            <div class="note-actions-menu" id="note-actions-menu" hidden>
              {opts.showDownloadMd && (
                <a href={mdUrl} download={mdName} data-close-menu>
                  Markdown (.md)
                </a>
              )}
              {opts.showPdf && (
                <button type="button" id="note-actions-pdf" data-close-menu>
                  PDF
                </button>
              )}
            </div>
          </div>
        )}
        {opts.showFullscreen && (
          <button
            class="note-actions-btn icon-only"
            id="note-actions-fullscreen"
            title="Tela cheia"
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
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>Editar</span>
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
