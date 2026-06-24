<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const isOpen = ref(false)

const current = computed(() =>
  locales.value.find(l => typeof l === 'object' && l.code === locale.value) as { code: string; name: string } | undefined
)

function pick(code: string) {
  setLocale(code)
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[13px] text-gray-400 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
      @click="isOpen = !isOpen"
    >
      <UIcon name="i-heroicons-language" class="w-3.5 h-3.5" />
      <span>{{ current?.name || 'EN' }}</span>
      <UIcon name="i-heroicons-chevron-down" class="w-3 h-3 transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <Transition enter-active-class="transition duration-150 ease-out" enter-from-class="opacity-0 -translate-y-1 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100" leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100" leave-to-class="opacity-0 -translate-y-1 scale-95">
      <div v-if="isOpen" class="absolute right-0 top-full mt-1.5 w-36 bg-white dark:bg-mc-surface border border-black/[0.06] dark:border-white/[0.06] rounded-xl shadow-xl overflow-hidden z-50">
        <button
          v-for="loc in locales"
          :key="typeof loc === 'object' ? loc.code : loc"
          class="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] transition-colors"
          :class="locale === (typeof loc === 'object' ? loc.code : loc) ? 'text-mc-green bg-mc-green/5' : 'text-gray-500 dark:text-white/45 hover:bg-black/5 dark:hover:bg-white/5'"
          @click="pick(typeof loc === 'object' ? loc.code : loc)"
        >
          <span class="w-5 text-center font-mono text-[11px] opacity-60">
            {{ typeof loc === 'object' ? (loc.code === 'en' ? 'EN' : loc.code === 'zh-CN' ? '简' : '繁') : '' }}
          </span>
          {{ typeof loc === 'object' ? loc.name : loc }}
        </button>
      </div>
    </Transition>
  </div>
</template>
