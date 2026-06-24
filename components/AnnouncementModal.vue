<script setup lang="ts">
const config = useAppConfig().announcement
const isOpen = ref(false)

onMounted(() => {
  if (!config.enabled) return
  if (config.showOnce) {
    const seen = localStorage.getItem(`announcement_${config.id}`)
    if (seen) return
  }
  isOpen.value = true
})

function dismiss() {
  isOpen.value = false
  if (config.showOnce) {
    localStorage.setItem(`announcement_${config.id}`, '1')
  }
}

function handleButton(btn: { label: string; action: string; href?: string }) {
  if (btn.action === 'close') {
    dismiss()
  } else if (btn.action === 'link' && btn.href) {
    window.open(btn.href, '_blank')
    dismiss()
  }
}
</script>

<template>
  <UModal v-model:open="isOpen" :title="config.title" :ui="{ footer: 'justify-end' }">
    <template #body>
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <UIcon :name="config.icon" class="w-5 h-5 text-primary" />
        </div>
        <p class="text-sm text-gray-600 dark:text-white/60 leading-relaxed whitespace-pre-line">{{ config.content }}</p>
      </div>
    </template>

    <template #footer>
      <UButton
        v-for="btn in config.buttons"
        :key="btn.label"
        :variant="btn.action === 'close' ? 'outline' : 'solid'"
        color="primary"
        @click="handleButton(btn)"
      >
        {{ btn.label }}
      </UButton>
    </template>
  </UModal>
</template>
