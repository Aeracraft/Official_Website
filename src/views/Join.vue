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
      <h3>连接信息</h3>
      <div class="server-info">
        <div class="info-row">
          <span>支持版本：</span>
          <code>{{ site.versionRange }}</code>
        </div>
        <div class="info-row">
          <span>大厅 Java：</span>
          <code>{{ site.servers.lobby.javaAddress }}</code>
        </div>
        <div class="info-row">
          <span>生存 Java：</span>
          <code>{{ site.servers.survival.javaAddress }}</code>
        </div>
        <div class="info-row">
          <span>基岩端口：</span>
          <code>{{ site.servers.lobby.bedrockAddress }}:{{ site.servers.lobby.bedrockPort }}</code>
        </div>
      </div>

      <NDivider />

      <h3>加入步骤</h3>
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

      <h3>相关链接</h3>
      <NSpace>
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
.join-card h3 {
  color: var(--mc-grass);
  margin: 0 0 16px;
}
.server-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.info-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.info-row code {
  background: #eef7ee;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'v-mono', monospace;
}
</style>
