<script setup lang="ts">
const { t } = useI18n()
const categories = [
  {
    name: 'tools.commands.general',
    commands: [
      { cmd: '/help', desc: 'tools.commands.cmd_help' },
      { cmd: '/spawn', desc: 'tools.commands.cmd_spawn' },
      { cmd: '/home', desc: 'tools.commands.cmd_home' },
      { cmd: '/sethome', desc: 'tools.commands.cmd_sethome' },
      { cmd: '/back', desc: 'tools.commands.cmd_back' },
      { cmd: '/tpa <player>', desc: 'tools.commands.cmd_tpa' },
      { cmd: '/tpaccept', desc: 'tools.commands.cmd_tpaccept' },
      { cmd: '/tpdeny', desc: 'tools.commands.cmd_tpdeny' },
      { cmd: '/msg <player> <message>', desc: 'tools.commands.cmd_msg' },
      { cmd: '/r <message>', desc: 'tools.commands.cmd_r' },
      { cmd: '/pay <player> <amount>', desc: 'tools.commands.cmd_pay' },
      { cmd: '/bal', desc: 'tools.commands.cmd_bal' },
    ]
  },
  {
    name: 'tools.commands.teleport',
    commands: [
      { cmd: '/tp <player>', desc: 'tools.commands.cmd_tp' },
      { cmd: '/tpall', desc: 'tools.commands.cmd_tpall' },
      { cmd: '/back', desc: 'tools.commands.cmd_back2' },
      { cmd: '/warp <name>', desc: 'tools.commands.cmd_warp' },
      { cmd: '/warps', desc: 'tools.commands.cmd_warps' },
    ]
  },
  {
    name: 'tools.commands.protection',
    commands: [
      { cmd: '/res create <name>', desc: 'tools.commands.cmd_res_create' },
      { cmd: '/res select', desc: 'tools.commands.cmd_res_select' },
      { cmd: '/res info', desc: 'tools.commands.cmd_res_info' },
      { cmd: '/res area addplayer', desc: 'tools.commands.cmd_res_addplayer' },
      { cmd: '/res remove', desc: 'tools.commands.cmd_res_remove' },
    ]
  },
]

const search = ref('')

const filtered = computed(() => {
  if (!search.value.trim()) return categories
  const q = search.value.toLowerCase()
  return categories.map(c => ({
    ...c,
    commands: c.commands.filter(cmd => cmd.cmd.toLowerCase().includes(q) || cmd.desc.toLowerCase().includes(q))
  })).filter(c => c.commands.length > 0)
})

function copyCmd(cmd: string) {
  navigator.clipboard.writeText(cmd)
}
</script>

<template>
  <div class="glass rounded-2xl p-6 sm:p-8">
    <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('tools.commands.title') }}</h2>
    <p class="text-sm text-gray-500 dark:text-white/40 mb-4">{{ t('tools.commands.desc') }}</p>

    <div class="mb-6">
      <input
        v-model="search"
        class="w-full px-4 py-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] text-sm text-gray-800 dark:text-white/80 focus:outline-none focus:border-mc-green/30 transition-colors"
        :placeholder="t('tools.commands.search')"
      >
    </div>

    <div class="space-y-6">
      <div v-for="cat in filtered" :key="cat.name">
        <h3 class="text-xs font-semibold text-mc-green uppercase tracking-[0.15em] mb-3">{{ t(cat.name) }}</h3>
        <div class="space-y-1.5">
          <div
            v-for="cmd in cat.commands"
            :key="cmd.cmd"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors group cursor-pointer"
            @click="copyCmd(cmd.cmd)"
          >
            <code class="text-[13px] font-mono text-mc-green shrink-0">{{ cmd.cmd }}</code>
            <span class="text-[12px] text-gray-400 dark:text-white/25 hidden sm:inline">—</span>
            <span class="text-[12px] text-gray-500 dark:text-white/35 flex-1">{{ t(cmd.desc) }}</span>
            <UIcon name="i-heroicons-clipboard" class="w-3.5 h-3.5 text-gray-300 dark:text-white/10 group-hover:text-mc-green transition-colors shrink-0" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05]">
      <p class="text-xs text-gray-400 dark:text-white/25">💡 {{ t('tools.commands.tip') }}</p>
    </div>
  </div>
</template>
