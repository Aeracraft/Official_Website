<script setup>
import { NCard, NSteps, NStep, NButton, NSpace, NDivider } from 'naive-ui'
import { site } from '../config/site.js'
</script>

<template>
  <div class="page">
    <div class="section-title">
      <h2>{{ site.join.title }}</h2>
      <p>{{ site.join.subtitle }}</p>
    </div>

    <NCard class="join-card">
      <h3>{{ site.join.sections.serverInfo.title }}</h3>
      <div class="server-info">
        <div class="info-row">
          <span class="label">{{ site.join.sections.serverInfo.versionLabel }}：</span>
          <code>{{ site.versionRange }}</code>
        </div>
        <div class="info-row">
          <span class="label">{{ site.join.sections.serverInfo.lobbyJavaLabel }}：</span>
          <code>{{ site.servers.lobby.javaAddress }}</code>
        </div>
        <div class="info-row">
          <span class="label">{{ site.join.sections.serverInfo.survivalJavaLabel }}：</span>
          <code>{{ site.servers.survival.javaAddress }}</code>
        </div>
        <div class="info-row">
          <span class="label">{{ site.join.sections.serverInfo.bedrockLabel }}：</span>
          <code>{{ site.servers.lobby.bedrockAddress }}:{{ site.servers.lobby.bedrockPort }}</code>
        </div>
      </div>

      <NDivider />

      <h3>{{ site.join.sections.steps.title }}</h3>
      <NSteps vertical>
        <NStep
          v-for="(step, index) in site.join.steps"
          :key="index"
          :title="step.title"
          :description="step.content"
          status="finish"
        />
      </NSteps>

      <NDivider />

      <h3>{{ site.join.sections.links.title }}</h3>
      <NSpace wrap class="links-wrap">
        <NButton
          v-for="link in site.join.externalLinks"
          :key="link.url"
          tag="a"
          :href="link.url"
          target="_blank"
        >
          {{ link.label }}
        </NButton>
      </NSpace>
    </NCard>
  </div>
</template>

<style scoped>
.join-card {
  margin-bottom: 0;
}
.join-card :deep(.n-card__content) {
  padding: 24px !important;
}
.join-card h3 {
  color: var(--mc-grass);
  margin: 0 0 20px;
  font-size: 1.25rem;
}
.server-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.info-row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.info-row .label {
  flex-shrink: 0;
  color: var(--mc-text-secondary);
}
.info-row code {
  background: #eef7ee;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: 'v-mono', monospace;
  flex: 1;
  min-width: 180px;
}
.links-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
