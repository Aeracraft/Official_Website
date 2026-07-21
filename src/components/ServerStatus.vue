<script setup>
import { ref, onMounted, computed } from 'vue'
import { NCard, NSpace, NTag, NButton, NSkeleton, NAlert } from 'naive-ui'
import { site } from '../config/site.js'

const props = defineProps({
  serverKey: {
    type: String,
    required: true,
  },
})

const server = site.servers[props.serverKey]
const status = ref(null)
const loading = ref(false)
const error = ref(null)

const isOnline = computed(() => status.value?.status === 'online')
const playerOnline = computed(() => Number(status.value?.players?.online || 0))
const playerMax = computed(() => Number(status.value?.players?.max || 0))
const serverVersion = computed(() => status.value?.version || '')
const serverMotd = computed(() => status.value?.motd || '')
const serverPing = computed(() => Number(status.value?.delay || 0))
const pingColor = computed(() => {
  const ping = serverPing.value
  if (ping === 0) return 'default'
  if (ping < 50) return 'success'
  if (ping < 100) return 'warning'
  return 'error'
})

async function fetchStatus() {
  loading.value = true
  error.value = null
  status.value = null
  try {
    const res = await fetch(`https://motd.minebbs.com/api/status?ip=${server.javaAddress}`, {
      method: 'GET',
    })
    if (!res.ok) {
      throw new Error(`请求失败：${res.status}`)
    }
    const data = await res.json()
    status.value = data
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchStatus)
</script>

<template>
  <NCard :title="server.name" class="status-card">
    <NSpace vertical>
      <div>{{ site.serverStatus.javaLabel }}：<code>{{ server.javaAddress }}</code></div>
      <div>{{ site.serverStatus.bedrockLabel }}：<code>{{ server.bedrockAddress }}</code> : {{ server.bedrockPort }}</div>

      <NSkeleton v-if="loading" text :repeat="3" />

      <NAlert v-else-if="error" type="error" :show-icon="false">
        {{ site.serverStatus.errorPrefix }}：{{ error }}
      </NAlert>

      <div v-else-if="status" class="status-info">
        <div class="status-row">
          <NTag :type="isOnline ? 'success' : 'error'">
            {{ isOnline ? site.serverStatus.onlineText : site.serverStatus.offlineText }}
          </NTag>
          <span class="player-count">{{ site.serverStatus.playersLabel }} {{ playerOnline }} / {{ playerMax }}</span>
        </div>
        <div v-if="serverVersion" class="meta">{{ site.serverStatus.versionLabel }}：{{ serverVersion }}</div>
        <div v-if="serverMotd" class="meta">{{ site.serverStatus.motdLabel }}：{{ serverMotd }}</div>
        <div class="meta" :class="`ping-${pingColor}`">{{ site.serverStatus.pingLabel }}：<span>{{ serverPing }}ms</span></div>
      </div>

      <NButton size="small" @click="fetchStatus" :loading="loading">{{ site.serverStatus.refreshButton }}</NButton>
    </NSpace>
  </NCard>
</template>

<style scoped>
.status-card {
  margin-bottom: 0;
}
.status-card code {
  background: #eef7ee;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'v-mono', monospace;
}
.status-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.player-count {
  color: var(--mc-text);
}
.meta {
  font-size: 0.85rem;
  color: var(--mc-text-secondary);
}
.meta.ping-success span {
  color: #52c41a;
  font-weight: 600;
}
.meta.ping-warning span {
  color: #faad14;
  font-weight: 600;
}
.meta.ping-error span {
  color: #ff4d4f;
  font-weight: 600;
}
.meta.ping-default span {
  color: var(--mc-text-secondary);
}
</style>
