<script setup lang="ts">
const { t } = useI18n()
const appConfig = useAppConfig()

useSeoMeta({
  title: `${appConfig.site.name} - Minecraft Server`,
  description: () => t('hero.desc')
})

useScrollReveal()
const { particles } = useParticles()
const { servers, anyOnline } = useServerStatus()

const colorMode = useColorMode()
const toast = useToast()
const copied = ref(false)
const primaryHost = computed(() => servers.value[0]?.host ?? '')
const mobileOpen = ref(false)
const showScrollTop = ref(false)

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function copyIP(host: string) {
  navigator.clipboard.writeText(host)
  copied.value = true
  toast.add({
    title: t('hero.copied'),
    description: host,
    icon: 'i-heroicons-check-circle',
    color: 'success'
  })
  setTimeout(() => { copied.value = false }, 2000)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeMobile() {
  mobileOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    showScrollTop.value = window.scrollY > 500
  })
})

const features = computed(() => appConfig.features.map(f => ({
  icon: f.icon,
  title: t(f.titleKey),
  desc: t(f.descKey)
})))

const rules = computed(() => appConfig.rules.map(r => ({
  icon: r.icon,
  text: t(r.textKey)
})))

const totalOnline = computed(() =>
  servers.value.reduce((sum, s) => sum + (s.status?.players?.online ?? 0), 0)
)

const navLinks = computed(() => appConfig.nav.map(l => ({
  href: l.href,
  label: t(l.key)
})))
</script>

<template>
  <div class="min-h-screen dot-grid transition-colors duration-300">

    <!-- Particles -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div v-for="p in particles" :key="p.id" class="particle" :class="p.color" :style="{ left: p.x + '%', width: p.size + 'px', height: p.size + 'px', animationDuration: p.duration + 's', animationDelay: p.delay + 's' }" />
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-if="mobileOpen" class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden" @click="closeMobile" />
    </Transition>

    <!-- Mobile Menu Drawer -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="-translate-x-full" enter-to-class="translate-x-0" leave-active-class="transition duration-200 ease-in" leave-from-class="translate-x-0" leave-to-class="-translate-x-full">
      <div v-if="mobileOpen" class="fixed top-0 left-0 bottom-0 z-[70] w-72 bg-white dark:bg-mc-surface border-r border-black/[0.06] dark:border-white/[0.06] shadow-2xl md:hidden overflow-y-auto">
        <div class="p-5">
          <div class="flex items-center justify-between mb-8">
            <a href="#home" class="flex items-center gap-2.5" @click="closeMobile">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-mc-green to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-mc-green/20">{{ appConfig.site.logo }}</div>
              <span class="font-semibold text-[15px] tracking-tight text-gray-900 dark:text-white">{{ appConfig.site.name }}</span>
            </a>
            <button class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="closeMobile">
              <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
            </button>
          </div>

          <nav class="space-y-1 mb-6">
            <a v-for="link in navLinks" :key="link.href" :href="link.href" class="flex items-center gap-3 px-3.5 py-2.5 text-[14px] font-medium rounded-xl text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="closeMobile">
              {{ link.label }}
            </a>
          </nav>

          <div class="border-t border-black/[0.06] dark:border-white/[0.06] pt-4 mb-4">
            <div class="flex items-center gap-2 px-3.5 mb-2">
              <LanguageSwitcher />
              <button class="p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="toggleTheme">
                <UIcon :name="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>

          <UButton block color="primary" icon="i-heroicons-play" size="lg" @click="copyIP(primaryHost); closeMobile()">
            {{ copied ? t('hero.copied') : t('nav.join') }}
          </UButton>
        </div>
      </div>
    </Transition>

    <!-- Nav -->
    <header class="fixed top-0 inset-x-0 z-50">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <nav class="flex items-center justify-between h-14 sm:h-16 mt-3 sm:mt-4 px-4 sm:px-5 rounded-2xl glass">
          <a href="#home" class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-mc-green to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-mc-green/20">{{ appConfig.site.logo }}</div>
            <span class="font-semibold text-[15px] tracking-tight text-gray-900 dark:text-white">{{ appConfig.site.name }}</span>
          </a>

          <div class="hidden md:flex items-center gap-1">
            <a v-for="link in navLinks" :key="link.href" :href="link.href" class="px-3.5 py-1.5 text-[13px] font-medium rounded-lg text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all">
              {{ link.label }}
            </a>
          </div>

          <div class="flex items-center gap-1 sm:gap-1.5">
            <div class="hidden sm:flex items-center gap-1.5">
              <LanguageSwitcher />
              <button class="p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="toggleTheme">
                <UIcon :name="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-[18px] h-[18px]" />
              </button>
              <a v-for="s in appConfig.site.socials.filter(s => s.name === 'Discord')" :key="s.url" :href="s.url" target="_blank" class="p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                <svg class="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
            </div>
            <UButton size="sm" color="primary" icon="i-heroicons-play" class="hidden sm:inline-flex" @click="copyIP(primaryHost)">
              {{ copied ? t('hero.copied') : t('nav.join') }}
            </UButton>
            <button class="md:hidden p-2 rounded-lg text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all" @click="mobileOpen = true">
              <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
            </button>
          </div>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section id="home" class="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-20 sm:pt-24 pb-16 sm:pb-20 hero-mesh overflow-hidden">
      <div class="absolute top-32 left-[15%] w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-mc-green/5 blur-[100px] anim-float dark:bg-mc-green/10" />
      <div class="absolute bottom-20 right-[10%] w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-mc-diamond/5 blur-[80px] anim-float dark:bg-mc-diamond/8" style="animation-delay: 1.5s" />

      <div class="relative z-10 text-center max-w-4xl mx-auto px-5 sm:px-6">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 sm:mb-8 anim-slide-up opacity-0" :class="anyOnline ? 'border-mc-green/20 bg-mc-green/5' : 'border-mc-redstone/20 bg-mc-redstone/5'">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="anyOnline ? 'bg-mc-green' : 'bg-mc-redstone'" />
            <span class="relative inline-flex rounded-full h-2 w-2" :class="anyOnline ? 'bg-mc-green' : 'bg-mc-redstone'" />
          </span>
          <span class="text-xs font-medium tracking-wide uppercase" :class="anyOnline ? 'text-mc-green' : 'text-mc-redstone'">
            {{ anyOnline ? t('hero.badge') : t('hero.badge_offline') }}
          </span>
        </div>

        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.08] mb-5 sm:mb-6 anim-slide-up opacity-0 delay-100">
          <span class="text-gray-900 dark:text-white">{{ t('hero.title1') }}</span>
          <br>
          <span class="text-gradient">{{ t('hero.title2') }}</span>
        </h1>

        <p class="text-sm sm:text-base md:text-lg text-gray-500 dark:text-white/40 max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 anim-slide-up opacity-0 delay-200">
          {{ t('hero.desc') }}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 sm:mb-14 anim-slide-up opacity-0 delay-300">
          <div class="ip-box" @click="copyIP(primaryHost)">
            <div class="w-7 h-7 rounded-md bg-mc-green/10 flex items-center justify-center">
              <UIcon name="i-heroicons-server" class="w-4 h-4 text-mc-green" />
            </div>
            <code class="text-gray-800 dark:text-white/80">{{ primaryHost }}</code>
            <UIcon :name="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="w-4 h-4 text-gray-400 dark:text-white/25 ml-1" />
          </div>
          <UButton size="lg" color="primary" icon="i-heroicons-play" @click="copyIP(primaryHost)">
            {{ copied ? t('hero.copied') : t('hero.start') }}
          </UButton>
          <UButton size="lg" variant="outline" icon="i-heroicons-chat-bubble-left-right" :to="appConfig.site.socials.find(s => s.name === 'Discord')?.url" target="_blank">
            {{ t('hero.discord') }}
          </UButton>
        </div>

        <div class="grid grid-cols-3 gap-2 sm:gap-3 max-w-md sm:max-w-lg mx-auto anim-slide-up opacity-0 delay-400">
          <div class="stat-card rounded-xl p-3 sm:p-4 text-center card-hover">
            <div class="flex items-center justify-center gap-1.5 mb-0.5">
              <span class="w-1.5 h-1.5 rounded-full bg-mc-green animate-pulse" />
              <span class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{{ totalOnline.toLocaleString() }}</span>
            </div>
            <div class="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider">{{ t('stats.online') }}</div>
          </div>
          <div class="stat-card rounded-xl p-3 sm:p-4 text-center card-hover">
            <div class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-0.5">{{ servers.length }}</div>
            <div class="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider">{{ t('stats.gamemodes') }}</div>
          </div>
          <div class="stat-card rounded-xl p-3 sm:p-4 text-center card-hover">
            <div class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-0.5">{{ servers.filter(s => s.status?.status === 'online').length }}</div>
            <div class="text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-white/30 uppercase tracking-wider">{{ t('stats.online_servers') }}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="sep" />

    <!-- Features -->
    <section id="features" class="py-16 sm:py-24 md:py-32 px-5 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12 sm:mb-16 reveal">
          <p class="text-xs font-semibold text-mc-green uppercase tracking-[0.2em] mb-3">{{ t('nav.features') }}</p>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {{ t('features.title') }} <span class="text-gradient">{{ t('hero.title2') }}</span>{{ t('features.suffix') }}
          </h2>
          <p class="text-gray-500 dark:text-white/35 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">{{ t('features.desc') }}</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div v-for="(f, i) in features" :key="i" class="glass rounded-2xl p-5 sm:p-6 reveal card-hover transition-all duration-300" :style="{ transitionDelay: (i * 60) + 'ms' }">
            <div class="w-10 h-10 rounded-xl bg-mc-green/8 flex items-center justify-center mb-4">
              <UIcon :name="f.icon" class="w-5 h-5 text-mc-green" />
            </div>
            <h3 class="text-[14px] sm:text-[15px] font-semibold text-gray-900 dark:text-white/90 mb-1.5">{{ f.title }}</h3>
            <p class="text-[13px] sm:text-sm text-gray-500 dark:text-white/35 leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="sep" />

    <!-- Server Status -->
    <section id="servers" class="py-16 sm:py-24 md:py-32 px-5 sm:px-6">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12 sm:mb-16 reveal">
          <p class="text-xs font-semibold text-mc-green uppercase tracking-[0.2em] mb-3">{{ t('nav.servers') }}</p>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{{ t('servers.title') }}</h2>
          <p class="text-gray-500 dark:text-white/35 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">{{ t('servers.desc') }}</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
          <div v-for="(s, i) in servers" :key="s.host" class="glass rounded-2xl p-5 sm:p-6 reveal card-hover transition-all duration-300" :style="{ transitionDelay: (i * 80) + 'ms' }">
            <div class="flex items-start gap-3 sm:gap-4 mb-4">
              <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0" :class="s.status?.status === 'online' ? 'bg-mc-green/8' : 'bg-mc-redstone/8'">
                <img v-if="s.status?.icon" :src="s.status.icon" class="w-7 h-7 sm:w-8 sm:h-8 rounded" alt="">
                <UIcon v-else name="i-heroicons-server" class="w-5 h-5 sm:w-6 sm:h-6" :class="s.status?.status === 'online' ? 'text-mc-green' : 'text-mc-redstone'" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline justify-between mb-0.5">
                  <h3 class="text-[15px] sm:text-base font-semibold text-gray-900 dark:text-white/90">{{ s.name }}</h3>
                  <span class="text-[10px] sm:text-[11px] font-mono" :class="s.status?.status === 'online' ? 'text-mc-green' : 'text-mc-redstone'">
                    {{ s.loading ? '...' : (s.status?.status === 'online' ? 'ONLINE' : 'OFFLINE') }}
                  </span>
                </div>
                <code class="text-[11px] sm:text-[12px] font-mono text-gray-400 dark:text-white/25">{{ s.host }}:{{ s.port }}</code>
              </div>
            </div>
            <div v-if="s.status?.status === 'online'" class="grid grid-cols-3 gap-2 pt-3 border-t border-black/[0.05] dark:border-white/[0.05]">
              <div class="text-center">
                <div class="text-[13px] sm:text-sm font-semibold text-gray-900 dark:text-white/80">{{ s.status.players.online.toLocaleString() }}</div>
                <div class="text-[9px] sm:text-[10px] text-gray-400 dark:text-white/25 uppercase">{{ t('servers.players') }}</div>
              </div>
              <div class="text-center">
                <div class="text-[13px] sm:text-sm font-semibold text-gray-900 dark:text-white/80">{{ s.status.version }}</div>
                <div class="text-[9px] sm:text-[10px] text-gray-400 dark:text-white/25 uppercase">{{ t('servers.version') }}</div>
              </div>
              <div class="text-center">
                <div class="text-[13px] sm:text-sm font-semibold text-gray-900 dark:text-white/80">{{ s.status.delay }}ms</div>
                <div class="text-[9px] sm:text-[10px] text-gray-400 dark:text-white/25 uppercase">{{ t('servers.ping') }}</div>
              </div>
            </div>
            <div v-else class="pt-3 border-t border-black/[0.05] dark:border-white/[0.05]">
              <p class="text-xs text-gray-400 dark:text-white/20 text-center">
                {{ s.error || t('servers.offline_msg') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="sep" />

    <!-- Rules -->
    <section id="rules" class="py-16 sm:py-24 md:py-32 px-5 sm:px-6">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12 sm:mb-16 reveal">
          <p class="text-xs font-semibold text-mc-green uppercase tracking-[0.2em] mb-3">{{ t('nav.rules') }}</p>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{{ t('rules.title') }}</h2>
          <p class="text-gray-500 dark:text-white/35 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">{{ t('rules.desc') }}</p>
        </div>

        <div class="space-y-2.5 sm:space-y-3">
          <div v-for="(r, i) in rules" :key="i" class="glass rounded-xl p-3.5 sm:p-4 flex items-center gap-3 reveal card-hover transition-all duration-300" :style="{ transitionDelay: (i * 60) + 'ms' }">
            <span class="w-7 h-7 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center text-[11px] font-bold text-gray-400 dark:text-white/30 shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>
            <UIcon :name="r.icon" class="w-4 h-4 text-gray-400 dark:text-white/15 shrink-0" />
            <span class="text-[13px] sm:text-sm text-gray-600 dark:text-white/50">{{ r.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 sm:py-24 md:py-32 px-5 sm:px-6">
      <div class="max-w-2xl mx-auto text-center reveal">
        <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ t('cta.title') }}</h2>
        <p class="text-gray-500 dark:text-white/35 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base leading-relaxed">{{ t('cta.desc') }}</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div class="ip-box" @click="copyIP(primaryHost)">
            <div class="w-7 h-7 rounded-md bg-mc-green/10 flex items-center justify-center">
              <UIcon name="i-heroicons-server" class="w-4 h-4 text-mc-green" />
            </div>
            <code class="text-gray-800 dark:text-white/80">{{ primaryHost }}</code>
            <UIcon :name="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="w-4 h-4 text-gray-400 dark:text-white/25 ml-1" />
          </div>
          <UButton size="lg" color="primary" icon="i-heroicons-play" @click="copyIP(primaryHost)">
            {{ copied ? t('hero.copied') : t('hero.copy') }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-black/[0.06] dark:border-white/[0.05] px-5 sm:px-6 py-6 sm:py-8">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-md bg-gradient-to-br from-mc-green to-emerald-600 flex items-center justify-center text-white text-xs font-bold">{{ appConfig.site.logo }}</div>
          <span class="text-sm font-medium text-gray-700 dark:text-white/70">{{ appConfig.site.name }}</span>
          <span class="text-xs text-gray-400 dark:text-white/20 hidden sm:inline">· {{ t('footer.disclaimer') }}</span>
        </div>
        <div class="flex items-center gap-4">
          <template v-for="s in appConfig.site.socials" :key="s.url">
            <a :href="s.url" target="_blank" class="social-icon" :title="s.name">
              <svg v-if="s.icon === 'svg:discord'" class="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              <svg v-else-if="s.icon === 'svg:twitter'" class="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              <UIcon v-else :name="s.icon" class="w-4 h-4" />
            </a>
          </template>
          <span class="text-[11px] text-gray-400 dark:text-white/15">&copy; {{ new Date().getFullYear() }} {{ appConfig.site.name }}</span>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-4">
      <button v-if="showScrollTop" class="scroll-top-btn" @click="scrollToTop" :title="t('nav.top')">
        <UIcon name="i-heroicons-arrow-up" class="w-5 h-5" />
      </button>
    </Transition>
  </div>
</template>
