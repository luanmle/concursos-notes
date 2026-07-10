import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import type { FullSlug } from "@quartz-community/utils"
import { resolveRelative } from "@quartz-community/utils"
// @ts-expect-error - importado como texto pelo bundler
import styles from "./topnav.scss"

const TopNavConstructor: QuartzComponentConstructor = () => {
  const TopNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const slug = fileData.slug as FullSlug
    const inCentral = String(slug).startsWith("01.-central-de-estudos")
    const disciplinesHref = resolveRelative(slug, "index" as FullSlug)
    const centralHref = resolveRelative(slug, "01.-central-de-estudos/index" as FullSlug)

    return (
      <nav class={`top-nav ${displayClass ?? ""}`} aria-label="Navegação principal">
        <a class="top-nav-mark" href={disciplinesHref} aria-label="Concursos Notes — início">
          <span aria-hidden="true">CN</span>
        </a>
        <div class="top-nav-links">
          <a
            href={disciplinesHref}
            class={`top-nav-link ${!inCentral ? "is-active" : ""}`}
            aria-current={!inCentral ? "page" : undefined}
          >
            Disciplinas
          </a>
          <a
            href={centralHref}
            class={`top-nav-link ${inCentral ? "is-active" : ""}`}
            aria-current={inCentral ? "page" : undefined}
          >
            Central de Estudos
          </a>
        </div>
      </nav>
    )
  }

  TopNav.css = styles
  return TopNav
}

export default TopNavConstructor
