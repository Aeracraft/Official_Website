export function useTypingEffect(texts: string[], speed = 100, pause = 2000) {
  const displayText = ref('')
  const isDeleting = ref(false)
  const currentIndex = ref(0)

  let timeout: ReturnType<typeof setTimeout> | null = null

  const type = () => {
    const current = texts[currentIndex.value]

    if (!isDeleting.value) {
      displayText.value = current.substring(0, displayText.value.length + 1)

      if (displayText.value === current) {
        timeout = setTimeout(() => {
          isDeleting.value = true
          type()
        }, pause)
        return
      }
    } else {
      displayText.value = current.substring(0, displayText.value.length - 1)

      if (displayText.value === '') {
        isDeleting.value = false
        currentIndex.value = (currentIndex.value + 1) % texts.length
      }
    }

    timeout = setTimeout(type, isDeleting.value ? speed / 2 : speed)
  }

  onMounted(() => {
    type()
  })

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })

  return { displayText }
}
