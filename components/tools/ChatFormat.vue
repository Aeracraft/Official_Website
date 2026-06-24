<script setup lang="ts">
const { t } = useI18n()
const input = ref('')
const copied = ref(false)

const preview = computed(() => {
  let result = input.value
  result = result.replace(/&([0-9a-fk-or])/gi, '§$1')
  return result
})

function copyText() {
  navigator.clipboard.writeText(preview.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="glass rounded-2xl p-6 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{{ t('tools.chat.title') }}</h2>
    <p class="text-sm text-gray-500 dark:text-white/40 mb-4">{{ t('tools.chat.desc') }}</p>

    <div class="mb-4">
      <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.chat.input') }}</label>
      <textarea
        v-model="input"
        rows="4"
        class="w-full px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-sm text-gray-800 dark:text-white/80 font-mono focus:outline-none focus:border-mc-green/30 transition-colors resize-none"
        :placeholder="t('tools.color.placeholder_chat')"
      />
    </div>

    <div class="p-4 rounded-xl bg-mc-dark/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/[0.05] mb-4">
      <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.chat.preview') }}</label>
      <p class="text-sm font-mono whitespace-pre-wrap break-all">{{ preview }}</p>
    </div>

    <div class="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05]">
      <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.chat.output') }}</label>
      <div class="flex items-start gap-2">
        <code class="text-[12px] font-mono text-gray-500 dark:text-white/35 break-all flex-1 select-all">{{ preview }}</code>
        <button class="shrink-0 px-2 py-1 text-[11px] rounded-md bg-mc-green/10 text-mc-green hover:bg-mc-green/20 transition-colors" @click="copyText">
          {{ copied ? '✓' : t('tools.chat.copy') }}
        </button>
      </div>
    </div>
  </div>
</template>
