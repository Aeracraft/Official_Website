<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const activeTool = ref(route.query.tool as string || 'color')

useSeoMeta({
  title: `${t('nav.tools')} - Aeracraft`,
  description: 'Minecraft server tools: color codes, UUID lookup, IP checker and more.'
})

const tools = [
  { key: 'color', label: 'tools.color.title', icon: 'i-heroicons-swatch' },
  { key: 'chat', label: 'tools.chat.title', icon: 'i-heroicons-chat-bubble-left-right' },
  { key: 'ip', label: 'tools.ip.title', icon: 'i-heroicons-globe-alt' },
  { key: 'uuid', label: 'tools.uuid.title', icon: 'i-heroicons-finger-print' },
  { key: 'coords', label: 'tools.coords.title', icon: 'i-heroicons-map-pin' },
  { key: 'commands', label: 'tools.commands.title', icon: 'i-heroicons-command-line' },
  { key: 'residence', label: 'tools.residence.title', icon: 'i-heroicons-home' },
]

function setTool(key: string) {
  activeTool.value = key
  navigateTo({ query: { tool: key } })
}
</script>

<template>
  <div class="min-h-screen dot-grid transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-5 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div class="text-center mb-10 sm:mb-14">
        <p class="text-xs font-semibold text-mc-green uppercase tracking-[0.2em] mb-3">{{ t('nav.tools') }}</p>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{{ t('tools.title') }}</h1>
        <p class="text-gray-500 dark:text-white/35 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">{{ t('tools.desc') }}</p>
      </div>

      <div class="flex flex-col md:flex-row gap-6 lg:gap-8">
        <!-- Sidebar -->
        <aside class="md:w-56 lg:w-64 shrink-0">
          <nav class="sticky top-28 space-y-1">
            <button
              v-for="tool in tools"
              :key="tool.key"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium rounded-xl transition-all text-left"
              :class="activeTool === tool.key
                ? 'bg-mc-green/15 text-mc-green border border-mc-green/20'
                : 'text-gray-500 dark:text-white/35 hover:text-gray-700 dark:hover:text-white/60 border border-transparent hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'"
              @click="setTool(tool.key)"
            >
              <UIcon :name="tool.icon" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ t(tool.label) }}</span>
            </button>
          </nav>
        </aside>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <ToolsColorCode v-if="activeTool === 'color'" />
          <ToolsChatFormat v-if="activeTool === 'chat'" />
          <ToolsIpCheck v-if="activeTool === 'ip'" />
          <ToolsUuid v-if="activeTool === 'uuid'" />
          <ToolsCoords v-if="activeTool === 'coords'" />
          <ToolsCommands v-if="activeTool === 'commands'" />
          <ToolsResidence v-if="activeTool === 'residence'" />
        </div>
      </div>
    </div>
  </div>
</template>
