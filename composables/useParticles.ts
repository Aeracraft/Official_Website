export function useParticles() {
  const particles = ref<{ id: number; x: number; size: number; duration: number; delay: number; drift: number; color: string }[]>([])

  const colors = ['particle-green', 'particle-diamond', 'particle-gold', 'particle-purple']

  const createParticles = () => {
    if (import.meta.server) return

    const count = 20
    const items = []
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 200,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    particles.value = items
  }

  onMounted(() => {
    createParticles()
  })

  return { particles }
}
