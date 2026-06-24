<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()
const colorMode = useColorMode()
const mobileOpen = ref(false)

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function closeMobile() {
  mobileOpen.value = false
}

const navLinks = computed(() => appConfig.nav.map(l => ({
  href: l.href,
  label: t(l.key)
})))
</script>

<template>
  <!-- Mobile Menu Overlay -->
  <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="mobileOpen" class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden" @click="closeMobile" />
  </Transition>

  <!-- Mobile Menu Drawer -->
  <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="-translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
    <div v-if="mobileOpen" class="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white dark:bg-mc-surface border-r border-black/[0.06] dark:border-white/[0.06] shadow-2xl md:hidden overflow-y-auto">
      <div class="p-5">
        <div class="flex items-center justify-between mb-8">
          <NuxtLink to="/" class="flex items-center gap-2.5" @click="closeMobile">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-mc-green to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-mc-green/20">{{ appConfig.site.logo }}</div>
            <span class="font-semibold text-[15px] tracking-tight text-gray-900 dark:text-white">{{ appConfig.site.name }}</span>
          </NuxtLink>
          <button class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="closeMobile">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </button>
        </div>

        <nav class="space-y-1 mb-6">
          <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" class="flex items-center gap-3 px-3.5 py-2.5 text-[14px] font-medium rounded-xl text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="closeMobile">
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="border-t border-black/[0.06] dark:border-white/[0.06] pt-4 mb-4">
          <div class="flex items-center gap-2 px-3.5">
            <LanguageSwitcher />
            <button class="p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="toggleTheme">
              <UIcon :name="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Nav -->
  <header class="fixed top-0 inset-x-0 z-50">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <nav class="flex items-center justify-between h-14 sm:h-16 mt-3 sm:mt-4 px-4 sm:px-5 rounded-2xl glass">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-mc-green to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-mc-green/20">{{ appConfig.site.logo }}</div>
          <span class="font-semibold text-[15px] tracking-tight text-gray-900 dark:text-white">{{ appConfig.site.name }}</span>
        </NuxtLink>

        <div class="hidden md:flex items-center gap-1">
          <NuxtLink v-for="link in navLinks" :key="link.href" :to="link.href" class="px-3.5 py-1.5 text-[13px] font-medium rounded-lg text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            {{ link.label }}
          </NuxtLink>
        </div>

        <div class="flex items-center gap-1 sm:gap-1.5">
          <div class="hidden sm:flex items-center gap-1.5">
            <LanguageSwitcher />
            <button class="p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="toggleTheme">
              <UIcon :name="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-[18px] h-[18px]" />
            </button>
            <a v-for="s in appConfig.site.socials" :key="s.url" :href="s.url" target="_blank" class="p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" :title="s.name">
              <svg v-if="s.icon === 'svg:discord'" class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              <svg v-else-if="s.icon === 'svg:twitter'" class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <svg v-else-if="s.icon === 'svg:qq'" class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.003 2C6.004 2 3 6.59 3 10.02c0 1.956.652 3.77 1.73 5.167-.08.832-.308 2.12-.563 3.107-.105.41-.228.787-.298.974-.08.212-.16.384-.16.384s.395-.012.858-.012c.288 0 .656.037 1.044.09.68.094 1.596.213 1.888.213.292 0 1.208-.119 1.888-.213.388-.053.756-.09 1.044-.09.463 0 .858.012.858.012s-.08-.172-.16-.384c-.07-.187-.193-.564-.298-.974-.255-.987-.483-2.275-.563-3.107C15.35 13.79 16 11.976 16 10.02 16 6.59 14.002 2 12.003 2Zm0 2.16c.37 0 1.44 1.9 1.44 4.04 0 1.228-.424 2.22-.96 2.952l-.18.248c.224-.008.448-.016.66-.016.12 0 .24.004.36.012a8.19 8.19 0 0 0-.48-1.144c-.44-.788-1-1.6-1-2.56 0-1.36.7-2.52 1.44-3.24a7.282 7.282 0 0 0-1.28-.292Z"/></svg>
              <UIcon v-else :name="s.icon" class="w-[18px] h-[18px]" />
            </a>
          </div>
          <UButton size="sm" color="primary" icon="i-heroicons-play" class="hidden sm:inline-flex" to="/">
            {{ t('nav.join') }}
          </UButton>
          <button class="md:hidden p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="mobileOpen = true">
            <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
