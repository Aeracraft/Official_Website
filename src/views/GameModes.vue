<script setup>
import { NCard, NTag, NSpace, NGrid, NGridItem } from 'naive-ui'
import { site } from '../config/site.js'
</script>

<template>
  <div class="page">
    <div class="section-title">
      <h2>{{ site.gameModes.pageTitle }}</h2>
      <p>{{ site.gameModes.pageSubtitle }}</p>
    </div>

    <NGrid cols="1 s:2" responsive="screen" x-gap="24" y-gap="24">
      <NGridItem v-for="mode in site.gameModes.modes" :key="mode.key">
        <NCard class="game-card" hoverable>
          <div class="game-header">
            <span class="game-icon">{{ mode.icon }}</span>
            <h3>{{ mode.name }}</h3>
          </div>
          <p class="game-desc">{{ mode.description }}</p>
          <NSpace wrap>
            <NTag v-for="feature in mode.features" :key="feature" type="success">
              {{ feature }}
            </NTag>
          </NSpace>
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>

<style scoped>
.game-card {
  min-height: 280px;
}
.game-card :deep(.n-card__content) {
  padding: 24px !important;
}
.game-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.game-icon {
  font-size: 2.5rem;
}
.game-header h3 {
  margin: 0;
  color: var(--mc-grass);
  font-size: 1.35rem;
}
.game-desc {
  color: var(--mc-text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 0.95rem;
}
</style>
