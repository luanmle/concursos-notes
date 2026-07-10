// SPA-safe: re-executa a cada navegação e limpa os listeners.
function setupNoteActions() {
  const container = document.querySelector<HTMLElement>(".note-actions")
  if (!container) return

  const dlBtn = document.getElementById("note-actions-download")
  const menu = document.getElementById("note-actions-menu")

  const closeMenu = () => {
    if (!menu) return
    menu.hidden = true
    dlBtn?.setAttribute("aria-expanded", "false")
    container.classList.remove("menu-open")
  }

  if (dlBtn && menu) {
    const onToggle = (e: Event) => {
      e.stopPropagation()
      const willOpen = menu.hidden
      menu.hidden = !willOpen
      dlBtn.setAttribute("aria-expanded", String(willOpen))
      container.classList.toggle("menu-open", willOpen)
    }
    dlBtn.addEventListener("click", onToggle)
    window.addCleanup(() => dlBtn.removeEventListener("click", onToggle))

    // fecha ao clicar fora ou ao escolher uma opção
    const onDocClick = () => closeMenu()
    document.addEventListener("click", onDocClick)
    window.addCleanup(() => document.removeEventListener("click", onDocClick))

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    document.addEventListener("keydown", onEsc)
    window.addCleanup(() => document.removeEventListener("keydown", onEsc))
  }

  const pdfBtn = document.getElementById("note-actions-pdf")
  if (pdfBtn) {
    const onPrint = () => {
      closeMenu()
      window.print()
    }
    pdfBtn.addEventListener("click", onPrint)
    window.addCleanup(() => pdfBtn.removeEventListener("click", onPrint))
  }

  const fsBtn = document.getElementById("note-actions-fullscreen")
  if (fsBtn) {
    const onFullscreen = () => {
      if (document.fullscreenElement) {
        void document.exitFullscreen()
      } else {
        void document.documentElement.requestFullscreen()
      }
    }
    fsBtn.addEventListener("click", onFullscreen)
    window.addCleanup(() => fsBtn.removeEventListener("click", onFullscreen))
  }
}

document.addEventListener("nav", setupNoteActions)
