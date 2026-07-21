<script setup>
import { NCard, NList, NListItem, NTag, NSpace, NGrid, NGridItem } from 'naive-ui'
import { site } from '../config/site.js'
</script>

<template>
  <div class="page">
    <div class="section-title">
      <h2>玩法介绍</h2>
      <p>AeraCraft 提供多样化的游戏体验</p>
    </div>

    <NGrid cols="1 s:2" responsive="screen" x-gap="24" y-gap="24">
      <NGridItem v-for="mode in site.gameModes" :key="mode.key">
        <NCard class="game-card">
          <div class="game-header">
            <span class="game-icon">{{ mode.icon }}</span>
            <h3>{{ mode.name }}</h3>
          </div>
          <p class="game-desc">{{ mode.description }}</p>
          <NSpace>
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
  min-height: 260px;
}
.game-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.game-icon {
  font-size: 2rem;
}
.game-header h3 {
  margin: 0;
  color: var(--mc-grass);
  font-size: 1.25rem;
}
.game-desc {
  color: var(--mc-text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}
</style>
