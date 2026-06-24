<script setup lang="ts">
const overworldX = ref('')
const overworldZ = ref('')
const netherX = ref('')
const netherZ = ref('')

function overworldToNether() {
  const x = parseFloat(overworldX.value)
  const z = parseFloat(overworldZ.value)
  if (!isNaN(x) && !isNaN(z)) {
    netherX.value = (x / 8).toFixed(1)
    netherZ.value = (z / 8).toFixed(1)
  }
}

function netherToOverworld() {
  const x = parseFloat(netherX.value)
  const z = parseFloat(netherZ.value)
  if (!isNaN(x) && !isNaN(z)) {
    overworldX.value = (x * 8).toFixed(1)
    overworldZ.value = (z * 8).toFixed(1)
  }
}

function clear() {
  overworldX.value = ''
  overworldZ.value = ''
  netherX.value = ''
  netherZ.value = ''
}
</script>

<template>
  <div class="glass rounded-2xl p-6 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('tools.coords.title') }}</h2>
    <p class="text-sm text-gray-500 dark:text-white/40 mb-6">{{ t('tools.coords.desc') }}</p>

    <div class="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
      <!-- Overworld -->
      <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05]">
        <label class="text-xs font-semibold text-mc-green uppercase tracking-wider mb-3 block">{{ t('tools.coords.overworld') }}</label>
        <div class="space-y-2">
          <div>
            <span class="text-[11px] text-gray-400 dark:text-white/25">X</span>
            <input v-model="overworldX" type="number" class="w-full px-3 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-transparent text-sm font-mono text-gray-800 dark:text-white/80 focus:outline-none focus:border-mc-green/30 transition-colors" placeholder="0">
          </div>
          <div>
            <span class="text-[11px] text-gray-400 dark:text-white/25">Z</span>
            <input v-model="overworldZ" type="number" class="w-full px-3 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-transparent text-sm font-mono text-gray-800 dark:text-white/80 focus:outline-none focus:border-mc-green/30 transition-colors" placeholder="0">
          </div>
        </div>
        <button class="w-full mt-3 px-3 py-1.5 text-[12px] font-medium rounded-lg bg-mc-green/10 text-mc-green hover:bg-mc-green/20 transition-colors" @click="overworldToNether">
          → {{ t('tools.coords.to_nether') }}
        </button>
      </div>

      <div class="hidden sm:flex flex-col items-center gap-2 text-gray-300 dark:text-white/15">
        <UIcon name="i-heroicons-arrows-right-left" class="w-5 h-5" />
      </div>

      <!-- Nether -->
      <div class="p-4 rounded-xl bg-mc-purple/5 border border-mc-purple/10">
        <label class="text-xs font-semibold text-mc-purple uppercase tracking-wider mb-3 block">{{ t('tools.coords.nether') }}</label>
        <div class="space-y-2">
          <div>
            <span class="text-[11px] text-gray-400 dark:text-white/25">X</span>
            <input v-model="netherX" type="number" class="w-full px-3 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-transparent text-sm font-mono text-gray-800 dark:text-white/80 focus:outline-none focus:border-mc-purple/30 transition-colors" placeholder="0">
          </div>
          <div>
            <span class="text-[11px] text-gray-400 dark:text-white/25">Z</span>
            <input v-model="netherZ" type="number" class="w-full px-3 py-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-transparent text-sm font-mono text-gray-800 dark:text-white/80 focus:outline-none focus:border-mc-purple/30 transition-colors" placeholder="0">
          </div>
        </div>
        <button class="w-full mt-3 px-3 py-1.5 text-[12px] font-medium rounded-lg bg-mc-purple/10 text-mc-purple hover:bg-mc-purple/20 transition-colors" @click="netherToOverworld">
          → {{ t('tools.coords.to_overworld') }}
        </button>
      </div>
    </div>

    <button class="mt-4 px-3 py-1.5 text-[12px] text-gray-400 dark:text-white/25 hover:text-gray-600 dark:hover:text-white/40 transition-colors" @click="clear">
      {{ t('tools.coords.clear') }}
    </button>

    <div class="mt-4 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05]">
      <p class="text-xs text-gray-400 dark:text-white/25">💡 {{ t('tools.coords.tip') }}</p>
    </div>
  </div>
</template>
