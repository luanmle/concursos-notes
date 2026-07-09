// SPA-safe: re-executa a cada navegação e limpa os listeners.
function setupNoteActions() {
  const printBtn = document.getElementById("note-actions-print")
  if (printBtn) {
    const onPrint = () => window.print()
    printBtn.addEventListener("click", onPrint)
    window.addCleanup(() => printBtn.removeEventListener("click", onPrint))
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
