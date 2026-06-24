<script setup lang="ts">
const { t } = useI18n()
const playerName = ref('')
const uuid = ref('')
const loading = ref(false)
const result = ref<any>(null)
const error = ref('')

async function lookup() {
  if (!playerName.value.trim()) return
  loading.value = true
  error.value = ''
  result.value = null
  try {
    const data = await $fetch<any>(`https://api.mojang.com/users/profiles/minecraft/${playerName.value.trim()}`)
    if (data) {
      result.value = {
        name: data.name,
        uuid: data.id,
        uuidFormatted: formatUUID(data.id),
        raw: data
      }
    } else {
      error.value = 'Player not found'
    }
  } catch (e: any) {
    error.value = e.message || 'Failed to look up player'
  } finally {
    loading.value = false
  }
}

function formatUUID(id: string) {
  return `${id.slice(0,8)}-${id.slice(8,12)}-${id.slice(12,16)}-${id.slice(16,20)}-${id.slice(20)}`
}

function copyUUID(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="glass rounded-2xl p-6 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{{ t('tools.uuid.title') }}</h2>

    <div class="flex gap-3 mb-6">
      <input
        v-model="playerName"
        class="flex-1 px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-sm text-gray-800 dark:text-white/80 font-mono focus:outline-none focus:border-mc-green/30 transition-colors"
        placeholder="PlayerName"
        @keyup.enter="lookup"
      >
      <button
        class="px-5 py-2.5 rounded-xl bg-mc-green text-white text-sm font-medium hover:bg-mc-green-light transition-colors disabled:opacity-50"
        :disabled="loading || !playerName.trim()"
        @click="lookup"
      >
        {{ loading ? '...' : t('tools.uuid.lookup') }}
      </button>
    </div>

    <div v-if="error" class="p-4 rounded-xl bg-mc-redstone/5 border border-mc-redstone/10 text-sm text-mc-redstone mb-4">
      {{ error }}
    </div>

    <div v-if="result" class="space-y-3">
      <div class="flex items-center gap-3 p-4 rounded-xl bg-mc-green/5 border border-mc-green/10">
        <div class="w-10 h-10 rounded-xl bg-mc-green/10 flex items-center justify-center">
          <UIcon name="i-heroicons-user" class="w-5 h-5 text-mc-green" />
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">{{ result.name }}</h3>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
        <div class="flex items-center justify-between mb-1">
          <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider">{{ t('tools.uuid.uuid') }}</label>
          <button class="text-[11px] text-mc-green hover:underline" @click="copyUUID(result.uuidFormatted)">Copy</button>
        </div>
        <code class="text-sm font-mono text-gray-700 dark:text-white/60">{{ result.uuidFormatted }}</code>
      </div>

      <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
        <div class="flex items-center justify-between mb-1">
          <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider">{{ t('tools.uuid.no_dash') }}</label>
          <button class="text-[11px] text-mc-green hover:underline" @click="copyUUID(result.uuid)">Copy</button>
        </div>
        <code class="text-sm font-mono text-gray-700 dark:text-white/60">{{ result.uuid }}</code>
      </div>
    </div>
  </div>
</template>
