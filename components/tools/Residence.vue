<script setup lang="ts">
const sections = [
  {
    key: 'what',
    icon: 'i-heroicons-home',
    color: 'mc-green',
  },
  {
    key: 'create',
    icon: 'i-heroicons-plus-circle',
    color: 'mc-diamond',
  },
  {
    key: 'manage',
    icon: 'i-heroicons-cog-6-tooth',
    color: 'mc-gold',
  },
  {
    key: 'flags',
    icon: 'i-heroicons-flag',
    color: 'mc-purple',
  },
  {
    key: 'tips',
    icon: 'i-heroicons-light-bulb',
    color: 'mc-green',
  },
]

const activeSection = ref('what')
</script>

<template>
  <div class="space-y-6">
    <div class="glass rounded-2xl p-6 sm:p-8">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ t('tools.residence.title') }}</h2>
      <p class="text-sm text-gray-500 dark:text-white/40 mb-6">{{ t('tools.residence.desc') }}</p>

      <!-- Section Nav -->
      <div class="flex flex-wrap gap-1.5 mb-6">
        <button
          v-for="s in sections"
          :key="s.key"
          class="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg transition-all"
          :class="activeSection === s.key
            ? `bg-${s.color}/15 text-${s.color} border border-${s.color}/20`
            : 'text-gray-400 dark:text-white/30 border border-transparent hover:border-black/[0.06] dark:hover:border-white/[0.06]'"
          @click="activeSection = s.key"
        >
          <UIcon :name="s.icon" class="w-3.5 h-3.5" />
          {{ t(`tools.residence.${s.key}_title`) }}
        </button>
      </div>

      <!-- What is Residence -->
      <div v-if="activeSection === 'what'" class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-white/45 leading-relaxed">{{ t('tools.residence.what_p1') }}</p>
        <div class="grid sm:grid-cols-2 gap-3">
          <div class="p-3 rounded-xl bg-mc-green/5 border border-mc-green/10 flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green mt-0.5 shrink-0" />
            <span class="text-[13px] text-gray-600 dark:text-white/45">{{ t('tools.residence.what_f1') }}</span>
          </div>
          <div class="p-3 rounded-xl bg-mc-green/5 border border-mc-green/10 flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green mt-0.5 shrink-0" />
            <span class="text-[13px] text-gray-600 dark:text-white/45">{{ t('tools.residence.what_f2') }}</span>
          </div>
          <div class="p-3 rounded-xl bg-mc-green/5 border border-mc-green/10 flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green mt-0.5 shrink-0" />
            <span class="text-[13px] text-gray-600 dark:text-white/45">{{ t('tools.residence.what_f3') }}</span>
          </div>
          <div class="p-3 rounded-xl bg-mc-green/5 border border-mc-green/10 flex items-start gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-mc-green mt-0.5 shrink-0" />
            <span class="text-[13px] text-gray-600 dark:text-white/45">{{ t('tools.residence.what_f4') }}</span>
          </div>
        </div>
      </div>

      <!-- Create -->
      <div v-if="activeSection === 'create'" class="space-y-4">
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
            <span class="w-6 h-6 rounded-full bg-mc-diamond/10 flex items-center justify-center text-[11px] font-bold text-mc-diamond shrink-0 mt-0.5">1</span>
            <div>
              <p class="text-[13px] font-medium text-gray-700 dark:text-white/60 mb-1">{{ t('tools.residence.create_s1') }}</p>
              <code class="text-[12px] font-mono text-mc-diamond">/res select</code>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
            <span class="w-6 h-6 rounded-full bg-mc-diamond/10 flex items-center justify-center text-[11px] font-bold text-mc-diamond shrink-0 mt-0.5">2</span>
            <div>
              <p class="text-[13px] font-medium text-gray-700 dark:text-white/60 mb-1">{{ t('tools.residence.create_s2') }}</p>
              <p class="text-[12px] text-gray-500 dark:text-white/35">{{ t('tools.residence.create_s2_desc') }}</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
            <span class="w-6 h-6 rounded-full bg-mc-diamond/10 flex items-center justify-center text-[11px] font-bold text-mc-diamond shrink-0 mt-0.5">3</span>
            <div>
              <p class="text-[13px] font-medium text-gray-700 dark:text-white/60 mb-1">{{ t('tools.residence.create_s3') }}</p>
              <code class="text-[12px] font-mono text-mc-diamond">/res create 领地名称</code>
            </div>
          </div>
        </div>
      </div>

      <!-- Manage -->
      <div v-if="activeSection === 'manage'" class="space-y-3">
        <div class="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] font-mono text-[13px] space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-mc-gold shrink-0">/res area addplayer &lt;领地&gt; &lt;玩家&gt;</span>
          </div>
          <p class="text-[12px] text-gray-500 dark:text-white/35 pl-4">{{ t('tools.residence.manage_add') }}</p>
          <div class="flex items-center gap-2">
            <span class="text-mc-gold shrink-0">/res area removeplayer &lt;领地&gt; &lt;玩家&gt;</span>
          </div>
          <p class="text-[12px] text-gray-500 dark:text-white/35 pl-4">{{ t('tools.residence.manage_remove') }}</p>
          <div class="flex items-center gap-2">
            <span class="text-mc-gold shrink-0">/res rename &lt;旧名&gt; &lt;新名&gt;</span>
          </div>
          <p class="text-[12px] text-gray-500 dark:text-white/35 pl-4">{{ t('tools.residence.manage_rename') }}</p>
          <div class="flex items-center gap-2">
            <span class="text-mc-gold shrink-0">/res remove &lt;领地名&gt;</span>
          </div>
          <p class="text-[12px] text-gray-500 dark:text-white/35 pl-4">{{ t('tools.residence.manage_delete') }}</p>
        </div>
      </div>

      <!-- Flags -->
      <div v-if="activeSection === 'flags'" class="space-y-3">
        <p class="text-sm text-gray-600 dark:text-white/45 mb-3">{{ t('tools.residence.flags_desc') }}</p>
        <div class="grid sm:grid-cols-2 gap-2">
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mono text-mc-purple">build</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_build') }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mono text-mc-purple">use</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_use') }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mono text-mc-purple">pvp</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_pvp') }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mono text-mc-purple">chest</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_chest') }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mono text-mc-purple">destroy</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_destroy') }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mc-purple">flow</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_flow') }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mono text-mc-purple">fire</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_fire') }}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]">
            <code class="text-[12px] font-mono text-mc-purple">tnt</code>
            <span class="text-[11px] text-gray-400 dark:text-white/25 ml-2">— {{ t('tools.residence.flag_tnt') }}</span>
          </div>
        </div>
        <div class="p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] mt-2">
          <p class="text-[12px] text-gray-500 dark:text-white/35">{{ t('tools.residence.flag_example') }}</p>
          <code class="text-[12px] font-mono text-mc-purple">/res set &lt;领地&gt; pvp false</code>
        </div>
      </div>

      <!-- Tips -->
      <div v-if="activeSection === 'tips'" class="space-y-3">
        <div v-for="i in 5" :key="i" class="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
          <UIcon name="i-heroicons-light-bulb" class="w-4 h-4 text-mc-gold mt-0.5 shrink-0" />
          <span class="text-[13px] text-gray-600 dark:text-white/45">{{ t(`tools.residence.tip${i}`) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
