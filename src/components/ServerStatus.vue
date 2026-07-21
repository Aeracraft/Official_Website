<script setup>
import { ref, onMounted, computed } from 'vue'
import { NCard, NSpace, NTag, NButton, NSkeleton, NAlert } from 'naive-ui'
import { useMessage } from 'naive-ui'
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
const copied = ref(false)
const message = useMessage()

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

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(server.javaAddress)
    copied.value = true
    message.success(`${site.serverStatus.copiedText}：${server.javaAddress}`)
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (e) {
    message.error('复制失败，请手动复制')
  }
}

onMounted(fetchStatus)
</script>

<template>
  <NCard :title="server.name" class="status-card">
    <NSpace vertical>
      <div class="address-row">
        <span class="label">{{ site.serverStatus.javaLabel }}：</span>
        <code class="address">{{ server.javaAddress }}</code>
        <NButton
          size="tiny"
          @click="copyAddress"
          :type="copied ? 'success' : 'default'"
          class="copy-btn"
        >
          {{ copied ? site.serverStatus.copiedText : site.serverStatus.copyButton }}
        </NButton>
      </div>

      <div class="address-row">
        <span class="label">{{ site.serverStatus.bedrockLabel }}：</span>
        <code class="address">{{ server.bedrockAddress }}:{{ server.bedrockPort }}</code>
      </div>

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
          <span class="ping" :class="`ping-${pingColor}`">{{ site.serverStatus.pingLabel }} {{ serverPing }}ms</span>
        </div>
        <div v-if="serverVersion" class="meta">{{ site.serverStatus.versionLabel }}：{{ serverVersion }}</div>
        <div v-if="serverMotd" class="meta">{{ site.serverStatus.motdLabel }}：{{ serverMotd }}</div>
      </div>

      <NButton size="small" @click="fetchStatus" :loading="loading">{{ site.serverStatus.refreshButton }}</NButton>
    </NSpace>
  </NCard>
</template>

<style scoped>
.status-card {
  margin-bottom: 0;
}
.status-card :deep(.n-card__content) {
  padding: 20px !important;
}
.status-card :deep(.n-card__header) {
  padding: 16px 20px !important;
  border-bottom: 2px solid var(--mc-border) !important;
}
.status-card :deep(.n-card__header-title) {
  font-size: 1.15rem !important;
  font-weight: 600 !important;
  color: var(--mc-grass) !important;
}
.status-card code {
  background: #eef7ee;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: 'v-mono', monospace;
  font-size: 0.95rem;
}
.address-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 8px 0;
}
.address-row .label {
  flex-shrink: 0;
  color: var(--mc-text-secondary);
  font-size: 0.95rem;
  min-width: 70px;
}
.address-row .address {
  flex: 1;
  min-width: 140px;
}
.copy-btn {
  flex-shrink: 0;
  margin-left: auto;
}
.status-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}
.status-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.player-count {
  color: var(--mc-text);
  font-size: 0.95rem;
}
.ping {
  font-size: 0.9rem;
  font-weight: 600;
}
.ping-success {
  color: #52c41a;
}
.ping-warning {
  color: #faad14;
}
.ping-error {
  color: #ff4d4f;
}
.ping-default {
  color: var(--mc-text-secondary);
}
.meta {
  font-size: 0.9rem;
  color: var(--mc-text-secondary);
}
</style>
