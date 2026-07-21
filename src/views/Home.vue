<script setup>
import { NButton, NSpace, NCard, NGrid, NGridItem } from 'naive-ui'
import { useRouter } from 'vue-router'
import { site } from '../config/site.js'
import ServerStatus from '../components/ServerStatus.vue'
import NoticeModal from '../components/NoticeModal.vue'

const router = useRouter()
</script>

<template>
  <div class="page">
    <NoticeModal />
    <section class="hero">
      <div class="hero-content">
        <h1>{{ site.hero.title }}</h1>
        <p class="slogan">{{ site.hero.subtitle }}</p>
        <p class="description">{{ site.hero.description }}</p>
        <NSpace justify="center" class="hero-buttons">
          <NButton
            v-for="btn in site.hero.buttons"
            :key="btn.label"
            :type="btn.type"
            size="large"
            @click="router.push(btn.path)"
          >
            {{ btn.label }}
          </NButton>
        </NSpace>
      </div>
    </section>

    <section class="servers-section">
      <div class="section-title">
        <h2>{{ site.home.serversTitle }}</h2>
        <p>{{ site.home.serversSubtitle }}</p>
      </div>
      <div class="servers-grid">
        <ServerStatus server-key="lobby" />
        <ServerStatus server-key="survival" />
      </div>
    </section>

    <section class="intro">
      <div class="section-title">
        <h2>{{ site.home.intro.title }}</h2>
        <p>{{ site.home.intro.subtitle }}</p>
      </div>
      <NGrid cols="1 s:2 m:4" responsive="screen" x-gap="20" y-gap="20">
        <NGridItem v-for="mode in site.gameModes.modes.slice(0, 4)" :key="mode.key">
          <NCard class="mode-card" hoverable>
            <div class="mode-icon">{{ mode.icon }}</div>
            <h3>{{ mode.name }}</h3>
            <p>{{ mode.description }}</p>
          </NCard>
        </NGridItem>
      </NGrid>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 60px 0;
  text-align: center;
}
.hero-content h1 {
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin: 0 0 12px;
  color: var(--mc-grass);
  font-weight: 700;
}
.hero-content .slogan {
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  color: var(--mc-gold);
  margin: 0 0 24px;
  font-weight: 600;
}
.hero-content .description {
  font-size: 1.1rem;
  color: var(--mc-text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
}
.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.servers-section {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.servers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  max-width: 900px;
  width: 100%;
}
.intro {
  padding: 60px 0;
}
.mode-card {
  text-align: center;
  min-height: 240px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.mode-card:hover {
  transform: translateY(-4px);
}
.mode-card :deep(.n-card__content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px !important;
}
.mode-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}
.mode-card h3 {
  margin: 0 0 12px;
  color: var(--mc-grass);
  font-size: 1.25rem;
}
.mode-card p {
  margin: 0;
  color: var(--mc-text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 0;
  }
  .hero-content h1 {
    font-size: clamp(2rem, 6vw, 2.75rem);
  }
  .servers-section,
  .intro {
    padding: 32px 0;
  }
  .servers-grid {
    grid-template-columns: 1fr;
  }
}
</style>
