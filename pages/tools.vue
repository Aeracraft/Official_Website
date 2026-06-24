<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const activeTool = ref(route.query.tool as string || 'color')

useSeoMeta({
  title: `${t('nav.tools')} - Aeracraft`,
  description: 'Minecraft server tools: color codes, UUID lookup, IP checker and more.'
})

const tools = [
  { key: 'color', label: 'tools.color', icon: 'i-heroicons-swatch' },
  { key: 'chat', label: 'tools.chat', icon: 'i-heroicons-chat-bubble-left-right' },
  { key: 'ip', label: 'tools.ip', icon: 'i-heroicons-globe-alt' },
  { key: 'uuid', label: 'tools.uuid', icon: 'i-heroicons-finger-print' },
  { key: 'coords', label: 'tools.coords', icon: 'i-heroicons-map-pin' },
  { key: 'commands', label: 'tools.commands', icon: 'i-heroicons-command-line' },
  { key: 'residence', label: 'tools.residence', icon: 'i-heroicons-home' },
]

function setTool(key: string) {
  activeTool.value = key
  navigateTo({ query: { tool: key } })
}
</script>

<template>
  <div class="min-h-screen dot-grid transition-colors duration-300">
    <div class="max-w-4xl mx-auto px-5 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div class="text-center mb-10 sm:mb-14">
        <p class="text-xs font-semibold text-mc-green uppercase tracking-[0.2em] mb-3">{{ t('nav.tools') }}</p>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{{ t('tools.title') }}</h1>
        <p class="text-gray-500 dark:text-white/35 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">{{ t('tools.desc') }}</p>
      </div>

      <!-- Tool Tabs -->
      <div class="flex flex-wrap justify-center gap-1.5 mb-10 sm:mb-14">
        <button
          v-for="tool in tools"
          :key="tool.key"
          class="flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-xl transition-all"
          :class="activeTool === tool.key
            ? 'bg-mc-green/15 text-mc-green border border-mc-green/20'
            : 'text-gray-500 dark:text-white/35 hover:text-gray-700 dark:hover:text-white/60 border border-transparent hover:border-black/[0.06] dark:hover:border-white/[0.06]'"
          @click="setTool(tool.key)"
        >
          <UIcon :name="tool.icon" class="w-4 h-4" />
          {{ t(tool.label) }}
        </button>
      </div>

      <ToolsColorCode v-if="activeTool === 'color'" />
      <ToolsChatFormat v-if="activeTool === 'chat'" />
      <ToolsIpCheck v-if="activeTool === 'ip'" />
      <ToolsUuid v-if="activeTool === 'uuid'" />
      <ToolsCoords v-if="activeTool === 'coords'" />
      <ToolsCommands v-if="activeTool === 'commands'" />
      <ToolsResidence v-if="activeTool === 'residence'" />
    </div>
  </div>
</template>
