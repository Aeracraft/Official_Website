<script setup lang="ts">
const { t } = useI18n()
const host = ref('play.aeracraft.cn')
const port = ref(25565)
const loading = ref(false)
const result = ref<any>(null)
const error = ref('')

async function check() {
  loading.value = true
  error.value = ''
  result.value = null
  try {
    const data = await $fetch<any>(`https://motd.minebbs.com/api/status?host=${host.value}:${port.value}`)
    result.value = data
  } catch (e: any) {
    error.value = e.message || 'Failed to connect'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="glass rounded-2xl p-6 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{{ t('tools.ip.title') }}</h2>

    <div class="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        v-model="host"
        class="flex-1 px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-sm text-gray-800 dark:text-white/80 font-mono focus:outline-none focus:border-mc-green/30 transition-colors"
        placeholder="play.aeracraft.cn"
      >
      <input
        v-model.number="port"
        type="number"
        class="w-28 px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-sm text-gray-800 dark:text-white/80 font-mono focus:outline-none focus:border-mc-green/30 transition-colors"
        placeholder="25565"
      >
      <button
        class="px-5 py-2.5 rounded-xl bg-mc-green text-white text-sm font-medium hover:bg-mc-green-light transition-colors disabled:opacity-50"
        :disabled="loading"
        @click="check"
      >
        {{ loading ? '...' : t('tools.ip.check') }}
      </button>
    </div>

    <div v-if="error" class="p-4 rounded-xl bg-mc-redstone/5 border border-mc-redstone/10 text-sm text-mc-redstone">
      {{ error }}
    </div>

    <div v-if="result" class="space-y-4">
      <div class="flex items-center gap-3 p-4 rounded-xl" :class="result.status === 'online' ? 'bg-mc-green/5 border border-mc-green/10' : 'bg-mc-redstone/5 border border-mc-redstone/10'">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="result.status === 'online' ? 'bg-mc-green/10' : 'bg-mc-redstone/10'">
          <img v-if="result.icon" :src="result.icon" class="w-8 h-8 rounded" alt="">
          <UIcon v-else name="i-heroicons-server" class="w-6 h-6" :class="result.status === 'online' ? 'text-mc-green' : 'text-mc-redstone'" />
        </div>
        <div>
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">{{ result.motd?.clean || host }}</h3>
          <div class="flex items-center gap-3 mt-0.5">
            <span class="text-[11px] font-mono" :class="result.status === 'online' ? 'text-mc-green' : 'text-mc-redstone'">
              {{ result.status === 'online' ? 'ONLINE' : 'OFFLINE' }}
            </span>
            <span v-if="result.version" class="text-[11px] text-gray-400 dark:text-white/25">v{{ result.version }}</span>
          </div>
        </div>
      </div>

      <div v-if="result.status === 'online'" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] text-center">
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ result.players?.online ?? 0 }}</div>
          <div class="text-[10px] text-gray-400 dark:text-white/25 uppercase">{{ t('tools.ip.players') }}</div>
        </div>
        <div class="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] text-center">
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ result.players?.max ?? 0 }}</div>
          <div class="text-[10px] text-gray-400 dark:text-white/25 uppercase">{{ t('tools.ip.max') }}</div>
        </div>
        <div class="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] text-center">
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ result.version }}</div>
          <div class="text-[10px] text-gray-400 dark:text-white/25 uppercase">{{ t('tools.ip.version') }}</div>
        </div>
        <div class="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] text-center">
          <div class="text-lg font-bold text-gray-900 dark:text-white">{{ result.delay }}ms</div>
          <div class="text-[10px] text-gray-400 dark:text-white/25 uppercase">{{ t('tools.ip.ping') }}</div>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
        <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">MOTD</label>
        <p class="text-sm font-mono text-gray-600 dark:text-white/50 whitespace-pre-wrap">{{ result.motd?.clean || 'N/A' }}</p>
      </div>

      <div v-if="result.players?.sample?.length" class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
        <label class="text-xs font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider mb-2 block">{{ t('tools.ip.sample') }}</label>
        <div class="flex flex-wrap gap-1.5">
          <span v-for="p in result.players.sample" :key="p.name" class="px-2 py-0.5 text-[11px] rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-gray-500 dark:text-white/35 font-mono">{{ p.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
