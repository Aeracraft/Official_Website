<script setup>
import { NCard, NList, NListItem } from 'naive-ui'
import { site } from '../config/site.js'
</script>

<template>
  <div class="page">
    <div class="section-title">
      <h2>{{ site.rules.title }}</h2>
      <p>{{ site.rules.subtitle }}</p>
    </div>

    <div class="rules-list">
      <NCard v-for="category in site.rules.categories" :key="category.title" class="rule-card">
        <h3>{{ category.title }}</h3>
        <NList>
          <NListItem v-for="(item, index) in category.items" :key="index">
            {{ item }}
          </NListItem>
        </NList>
      </NCard>
    </div>
  </div>
</template>

<style scoped>
.rules-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.rule-card {
  margin-bottom: 0;
}
.rule-card :deep(.n-card__content) {
  padding: 24px !important;
}
.rule-card h3 {
  margin: 0 0 20px;
  color: var(--mc-grass);
  font-size: 1.25rem;
}
</style>
