<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()
const route = useRoute()
const activeTab = ref(route.query.tab as string || 'join')

useSeoMeta({
  title: `${t('nav.docs')} - Aeracraft`,
  description: 'Aeracraft server documentation, guides and FAQ.'
})

const tabs = [
  { key: 'join', label: 'nav.docs_join', icon: 'i-heroicons-arrow-right-circle' },
  { key: 'gamemodes', label: 'nav.docs_gamemodes', icon: 'i-heroicons-puzzle-piece' },
  { key: 'faq', label: 'nav.docs_faq', icon: 'i-heroicons-question-mark-circle' },
  { key: 'changelog', label: 'nav.docs_changelog', icon: 'i-heroicons-clock' },
]

function setTab(key: string) {
  activeTab.value = key
  navigateTo({ query: { tab: key } })
}
</script>

<template>
  <div class="min-h-screen dot-grid transition-colors duration-300">
    <AppHeader />
    <div class="max-w-6xl mx-auto px-5 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div class="text-center mb-10 sm:mb-14">
        <p class="text-xs font-semibold text-mc-green uppercase tracking-[0.2em] mb-3">{{ t('nav.docs') }}</p>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{{ t('docs.title') }}</h1>
        <p class="text-gray-500 dark:text-white/35 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">{{ t('docs.desc') }}</p>
      </div>

      <div class="flex flex-col md:flex-row gap-6 lg:gap-8">
        <!-- Sidebar -->
        <aside class="md:w-56 lg:w-64 shrink-0">
          <nav class="sticky top-28 space-y-1">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              class="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium rounded-xl transition-all text-left"
              :class="activeTab === tab.key
                ? 'bg-mc-green/15 text-mc-green border border-mc-green/20'
                : 'text-gray-500 dark:text-white/35 hover:text-gray-700 dark:hover:text-white/60 border border-transparent hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'"
              @click="setTab(tab.key)"
            >
              <UIcon :name="tab.icon" class="w-4 h-4 shrink-0" />
              <span class="truncate">{{ t(tab.label) }}</span>
            </button>
          </nav>
        </aside>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <!-- Join Guide -->
          <div v-if="activeTab === 'join'" class="space-y-6">
            <div class="glass rounded-2xl p-6 sm:p-8">
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ t('docs.join.step1_title') }}</h2>
              <ol class="space-y-3 text-sm text-gray-600 dark:text-white/50 leading-relaxed list-decimal list-inside">
                <li>{{ t('docs.join.step1_1') }}</li>
                <li>{{ t('docs.join.step1_2') }}</li>
                <li>{{ t('docs.join.step1_3') }}</li>
              </ol>
              <div class="mt-4 p-3 rounded-xl bg-mc-green/5 border border-mc-green/10">
                <p class="text-xs text-mc-green font-medium">💡 {{ t('docs.join.step1_tip') }}</p>
              </div>
            </div>

            <div class="glass rounded-2xl p-6 sm:p-8">
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ t('docs.join.step2_title') }}</h2>
              <ol class="space-y-3 text-sm text-gray-600 dark:text-white/50 leading-relaxed list-decimal list-inside">
                <li>{{ t('docs.join.step2_1') }}</li>
                <li>{{ t('docs.join.step2_2') }}</li>
                <li>{{ t('docs.join.step2_3') }}</li>
              </ol>
            </div>

            <div class="glass rounded-2xl p-6 sm:p-8">
              <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">{{ t('docs.join.step3_title') }}</h2>
              <div class="grid sm:grid-cols-2 gap-3">
                <div class="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                  <div class="w-8 h-8 rounded-lg bg-mc-green/10 flex items-center justify-center shrink-0">
                    <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green" />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-white/50">{{ t('docs.join.step3_item1') }}</span>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                  <div class="w-8 h-8 rounded-lg bg-mc-green/10 flex items-center justify-center shrink-0">
                    <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green" />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-white/50">{{ t('docs.join.step3_item2') }}</span>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                  <div class="w-8 h-8 rounded-lg bg-mc-green/10 flex items-center justify-center shrink-0">
                    <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green" />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-white/50">{{ t('docs.join.step3_item3') }}</span>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                  <div class="w-8 h-8 rounded-lg bg-mc-green/10 flex items-center justify-center shrink-0">
                    <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green" />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-white/50">{{ t('docs.join.step3_item4') }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Game Modes -->
          <div v-if="activeTab === 'gamemodes'" class="space-y-4">
            <div class="glass rounded-2xl p-6 sm:p-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl bg-mc-green/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-home-modern" class="w-5 h-5 text-mc-green" />
                </div>
                <div>
                  <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ t('docs.gamemodes.survival_title') }}</h2>
                  <code class="text-[11px] font-mono text-mc-green">{{ appConfig.servers[0]?.host }}:{{ appConfig.servers[0]?.port }}</code>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-white/45 leading-relaxed">{{ t('docs.gamemodes.survival_desc') }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="px-2 py-0.5 text-[11px] rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-gray-500 dark:text-white/30">{{ t('docs.gamemodes.tag_economy') }}</span>
                <span class="px-2 py-0.5 text-[11px] rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-gray-500 dark:text-white/30">{{ t('docs.gamemodes.tag_land') }}</span>
                <span class="px-2 py-0.5 text-[11px] rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-gray-500 dark:text-white/30">{{ t('docs.gamemodes.tag_quests') }}</span>
              </div>
            </div>

            <div class="glass rounded-2xl p-6 sm:p-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-xl bg-mc-diamond/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-map" class="w-5 h-5 text-mc-diamond" />
                </div>
                <div>
                  <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ t('docs.gamemodes.smp_title') }}</h2>
                  <code class="text-[11px] font-mono text-mc-diamond">{{ appConfig.servers[1]?.host }}:{{ appConfig.servers[1]?.port }}</code>
                </div>
              </div>
              <p class="text-sm text-gray-600 dark:text-white/45 leading-relaxed">{{ t('docs.gamemodes.smp_desc') }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="px-2 py-0.5 text-[11px] rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-gray-500 dark:text-white/30">{{ t('docs.gamemodes.tag_multiplayer') }}</span>
                <span class="px-2 py-0.5 text-[11px] rounded-md bg-black/[0.04] dark:bg-white/[0.04] text-gray-500 dark:text-white/30">{{ t('docs.gamemodes.tag_building') }}</span>
              </div>
            </div>

            <div class="glass rounded-2xl p-6 sm:p-8">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-3">{{ t('docs.gamemodes.residence_title') }}</h2>
              <p class="text-sm text-gray-600 dark:text-white/45 leading-relaxed mb-4">{{ t('docs.gamemodes.residence_desc') }}</p>
              <div class="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] font-mono text-[13px] text-gray-600 dark:text-white/50 space-y-1.5">
                <p><span class="text-mc-green">/res create</span> {{ t('docs.gamemodes.residence_cmd1') }}</p>
                <p><span class="text-mc-green">/res select</span> {{ t('docs.gamemodes.residence_cmd2') }}</p>
                <p><span class="text-mc-green">/res area setowner</span> {{ t('docs.gamemodes.residence_cmd3') }}</p>
                <p><span class="text-mc-green">/res remove</span> {{ t('docs.gamemodes.residence_cmd4') }}</p>
                <p><span class="text-mc-green">/res info</span> {{ t('docs.gamemodes.residence_cmd5') }}</p>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div v-if="activeTab === 'faq'" class="space-y-3">
            <div v-for="(item, i) in (t('docs.faq.items') as any[])" :key="i" class="glass rounded-xl p-5 sm:p-6">
              <h3 class="text-[15px] font-semibold text-gray-900 dark:text-white/90 mb-2">{{ item.q }}</h3>
              <p class="text-sm text-gray-500 dark:text-white/40 leading-relaxed">{{ item.a }}</p>
            </div>
          </div>

          <!-- Changelog -->
          <div v-if="activeTab === 'changelog'" class="space-y-6">
            <div v-for="(item, i) in (t('docs.changelog.items') as any[])" :key="i" class="glass rounded-2xl p-6 sm:p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-2.5 py-0.5 text-[11px] font-semibold rounded-lg bg-mc-green/10 text-mc-green">{{ item.version }}</span>
                <span class="text-[12px] text-gray-400 dark:text-white/25">{{ item.date }}</span>
              </div>
              <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-2">{{ item.title }}</h3>
              <ul class="space-y-1.5">
                <li v-for="(change, j) in item.changes" :key="j" class="flex items-start gap-2 text-sm text-gray-500 dark:text-white/40">
                  <span class="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" :class="change.type === 'add' ? 'bg-mc-green' : change.type === 'fix' ? 'bg-mc-diamond' : 'bg-mc-gold'" />
                  {{ change.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-black/[0.06] dark:border-white/[0.05] px-5 sm:px-6 py-6 sm:py-8">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-mc-green to-emerald-600 flex items-center justify-center text-white text-xs font-bold">{{ appConfig.site.logo }}</div>
          <span class="text-sm font-medium text-gray-700 dark:text-white/70">{{ appConfig.site.name }}</span>
          <span class="text-xs text-gray-400 dark:text-white/20 hidden sm:inline">· {{ t('footer.disclaimer') }}</span>
        </div>
        <span class="text-[11px] text-gray-400 dark:text-white/15">&copy; {{ new Date().getFullYear() }} {{ appConfig.site.name }}</span>
      </div>
    </footer>
  </div>
</template>
