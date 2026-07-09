import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
// @ts-expect-error - importado como texto pelo bundler
import script from "./sidebartoggle.inline.ts"
// @ts-expect-error - importado como texto pelo bundler
import styles from "./sidebartoggle.scss"

const SidebarToggleConstructor: QuartzComponentConstructor = () => {
  const SidebarToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <button
        class={`sidebar-toggle ${displayClass ?? ""}`}
        id="sidebar-toggle-btn"
        title="Recolher/expandir menu lateral"
        aria-label="Recolher ou expandir o menu lateral"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
        </svg>
      </button>
    )
  }

  SidebarToggle.css = styles
  SidebarToggle.beforeDOMLoaded = `
    try {
      if (localStorage.getItem("sidebar-collapsed") === "true") {
        document.documentElement.classList.add("sidebar-collapsed")
      }
    } catch (e) {}
  `
  SidebarToggle.afterDOMLoaded = script
  return SidebarToggle
}

export default SidebarToggleConstructor
