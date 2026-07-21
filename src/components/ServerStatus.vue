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
      <div>Java 地址：<code>{{ server.javaAddress }}</code></div>
      <div>基岩地址：<code>{{ server.bedrockAddress }}</code> : {{ server.bedrockPort }}</div>

      <NSkeleton v-if="loading" text :repeat="3" />

      <NAlert v-else-if="error" type="error" :show-icon="false">
        状态获取失败：{{ error }}
      </NAlert>

      <div v-else-if="status" class="status-info">
        <div class="status-row">
          <NTag :type="isOnline ? 'success' : 'error'">
            {{ isOnline ? '在线' : '离线' }}
          </NTag>
          <span class="player-count">玩家 {{ playerOnline }} / {{ playerMax }}</span>
        </div>
        <div v-if="serverVersion" class="meta">版本：{{ serverVersion }}</div>
        <div v-if="serverMotd" class="meta">MOTD：{{ serverMotd }}</div>
      </div>

      <NButton size="small" @click="fetchStatus" :loading="loading">刷新状态</NButton>
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
</style>
