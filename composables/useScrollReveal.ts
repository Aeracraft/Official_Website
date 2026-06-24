export function useScrollReveal() {
  const observe = () => {
    if (import.meta.server) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
      observer.observe(el)
    })
  }

  onMounted(() => {
    nextTick(() => {
      observe()
    })
  })

  return { observe }
}
