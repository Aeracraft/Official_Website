<script setup>
import { NButton, NSpace, NCard, NGrid, NGridItem } from 'naive-ui'
import { useRouter } from 'vue-router'
import { site } from '../config/site.js'
import ServerStatus from '../components/ServerStatus.vue'

const router = useRouter()
</script>

<template>
  <div class="page">
    <section class="hero">
      <div class="hero-content">
        <h1>{{ site.hero.title }}</h1>
        <p class="slogan">{{ site.hero.subtitle }}</p>
        <p class="description">{{ site.hero.description }}</p>
        <NSpace>
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
      <div class="hero-status">
        <ServerStatus server-key="lobby" />
        <ServerStatus server-key="survival" />
      </div>
    </section>

    <section class="intro">
      <div class="section-title">
        <h2>{{ site.home.intro.title }}</h2>
        <p>{{ site.home.intro.subtitle }}</p>
      </div>
      <NGrid cols="1 s:2 m:4" responsive="screen" x-gap="16" y-gap="16">
        <NGridItem v-for="mode in site.gameModes.modes.slice(0, 4)" :key="mode.key">
          <NCard class="mode-card">
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
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
  gap: 40px;
  align-items: start;
  padding: 48px 0;
}
.hero-content {
  min-width: 0;
}
.hero-content h1 {
  font-size: clamp(2rem, 5vw, 3rem);
  margin: 0 0 8px;
  color: var(--mc-grass);
}
.hero-content .slogan {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: var(--mc-gold);
  margin: 0 0 16px;
  font-weight: 600;
}
.hero-content .description {
  font-size: 1rem;
  color: var(--mc-text-secondary);
  line-height: 1.7;
  margin-bottom: 24px;
  max-width: 600px;
}
.hero-status {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 24px;
}
.intro {
  padding: 48px 0;
}
.mode-card {
  text-align: center;
  min-height: 220px;
}
.mode-card :deep(.n-card__content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.mode-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}
.mode-card h3 {
  margin: 0 0 8px;
  color: var(--mc-grass);
}
.mode-card p {
  margin: 0;
  color: var(--mc-text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .hero-status {
    position: static;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 24px 0;
  }
  .intro {
    padding: 24px 0;
  }
  .hero-status {
    grid-template-columns: 1fr;
  }
}
</style>
