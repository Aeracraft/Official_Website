<script setup lang="ts">
const { t } = useI18n()
const mcColors = [
  { code: '0', name: 'Black', hex: '#000000', text: 'fff' },
  { code: '1', name: 'Dark Blue', hex: '#0000AA', text: 'fff' },
  { code: '2', name: 'Dark Green', hex: '#00AA00', text: 'fff' },
  { code: '3', name: 'Dark Aqua', hex: '#00AAAA', text: 'fff' },
  { code: '4', name: 'Dark Red', hex: '#AA0000', text: 'fff' },
  { code: '5', name: 'Dark Purple', hex: '#AA00AA', text: 'fff' },
  { code: '6', name: 'Gold', hex: '#FFAA00', text: '000' },
  { code: '7', name: 'Gray', hex: '#AAAAAA', text: '000' },
  { code: '8', name: 'Dark Gray', hex: '#555555', text: 'fff' },
  { code: '9', name: 'Blue', hex: '#5555FF', text: 'fff' },
  { code: 'a', name: 'Green', hex: '#55FF55', text: '000' },
  { code: 'b', name: 'Aqua', hex: '#55FFFF', text: '000' },
  { code: 'c', name: 'Red', hex: '#FF5555', text: 'fff' },
  { code: 'd', name: 'Light Purple', hex: '#FF55FF', text: '000' },
  { code: 'e', name: 'Yellow', hex: '#FFFF55', text: '000' },
  { code: 'f', name: 'White', hex: '#FFFFFF', text: '000' },
]

const mcFormats = [
  { code: 'l', name: 'Bold', icon: 'B' },
  { code: 'n', name: 'Underline', icon: 'U' },
  { code: 'o', name: 'Italic', icon: 'I' },
  { code: 'k', name: 'Obfuscated', icon: '?' },
  { code: 'm', name: 'Strikethrough', icon: 'S' },
  { code: 'r', name: 'Reset', icon: 'R' },
]

const input = ref(t('tools.color.default'))
const copied = ref(false)

const preview = computed(() => {
  let result = input.value
  for (const c of mcColors) {
    const regex = new RegExp(`&${c.code}`, 'gi')
    result = result.replace(regex, `§${c.code}`)
  }
  for (const f of mcFormats) {
    const regex = new RegExp(`&${f.code}`, 'gi')
    result = result.replace(regex, `§${f.code}`)
  }
  return result
})

function insertCode(code: string) {
  input.value += `&${code}`
}

const previewHtml = computed(() => {
  return preview.value.replace(/§([0-9a-fk-or])/gi, '<span style="color:inherit" class="mc-color-$1">')
})

function copyColor() {
  navigator.clipboard.writeText(preview.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="space-y-6">
    <div class="glass rounded-2xl p-6 sm:p-8">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{{ t('tools.color.title') }}</h2>

      <div class="mb-4">
        <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.color.input') }}</label>
        <textarea
          v-model="input"
          rows="3"
          class="w-full px-4 py-3 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-sm text-gray-800 dark:text-white/80 font-mono focus:outline-none focus:border-mc-green/30 transition-colors resize-none"
          placeholder="&aHello &bWorld"
        />
      </div>

      <div class="mb-4">
        <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.color.colors') }}</label>
        <div class="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
          <button
            v-for="c in mcColors"
            :key="c.code"
            class="w-full aspect-square rounded-lg flex items-center justify-center text-[11px] font-bold transition-all hover:scale-110 cursor-pointer border border-black/10 dark:border-white/10"
            :style="{ background: c.hex, color: c.text }"
            :title="`${c.name} (&${c.code})`"
            @click="insertCode(c.code)"
          >
            {{ c.code }}
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.color.formats') }}</label>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="f in mcFormats"
            :key="f.code"
            class="px-3 py-1.5 text-[12px] font-medium rounded-lg border border-black/[0.08] dark:border-white/[0.08] text-gray-600 dark:text-white/40 hover:border-mc-green/30 hover:text-mc-green transition-all"
            @click="insertCode(f.code)"
          >
            {{ f.name }} (&{{ f.code }})
          </button>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-mc-dark/5 dark:bg-white/5 border border-black/[0.05] dark:border-white/[0.05]">
        <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.color.preview') }}</label>
        <p class="text-base font-mono" v-html="previewHtml" />
        <div class="mt-2 flex items-center gap-2">
          <code class="text-[12px] font-mono text-gray-400 dark:text-white/25 break-all">{{ preview }}</code>
          <button class="shrink-0 px-2 py-1 text-[11px] rounded-md bg-mc-green/10 text-mc-green hover:bg-mc-green/20 transition-colors" @click="copyColor">
            {{ copied ? '✓' : t('tools.color.copy') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
