// SPA-safe: re-executa a cada navegação e limpa os listeners.
function setupSidebarToggle() {
  const btn = document.getElementById("sidebar-toggle-btn")
  if (!btn) return
  const onToggle = () => {
    const collapsed = document.documentElement.classList.toggle("sidebar-collapsed")
    try {
      localStorage.setItem("sidebar-collapsed", String(collapsed))
    } catch (e) {
      // localStorage indisponível (modo privado); só não persiste
    }
  }
  btn.addEventListener("click", onToggle)
  window.addCleanup(() => btn.removeEventListener("click", onToggle))
}

document.addEventListener("nav", setupSidebarToggle)
