<script setup>
import { ref, onMounted, computed } from 'vue'
import { NButton, NAlert } from 'naive-ui'
import { site } from '../config/site.js'

const config = site.announcement
const showAlert = ref(false)

const notices = computed(() => config.notices || [])

function getAlertType(type) {
  const types = ['info', 'success', 'warning', 'error']
  return types.includes(type) ? type : 'info'
}

function handleClose() {
  showAlert.value = false
  if (config.onlyShowOnce) {
    localStorage.setItem('aeracraft_announcement_shown', 'true')
  }
}

function showAnnouncement() {
  if (!config.enabled) return
  if (!notices.value.length) return
  if (config.onlyShowOnce) {
    const shown = localStorage.getItem('aeracraft_announcement_shown')
    if (shown === 'true') return
  }
  showAlert.value = true
}

onMounted(() => {
  setTimeout(() => {
    showAnnouncement()
  }, 500)
})
</script>

<template>
  <Transition name="slide">
    <div v-if="showAlert" class="announcement-container">
      <div class="announcement-list">
        <NAlert
          v-for="(notice, index) in notices"
          :key="index"
          :type="getAlertType(notice.type)"
          :show-icon="true"
          :closable="config.closable"
          class="announcement-alert"
          @close="handleClose"
        >
          <div class="alert-content">
            <div class="alert-title">{{ notice.title }}</div>
            <pre class="alert-text">{{ notice.content }}</pre>
          </div>
        </NAlert>
      </div>

      <div v-if="config.showConfirmButton" class="announcement-action">
        <NButton type="primary" size="small" @click="handleClose">
          {{ config.confirmButtonText }}
        </NButton>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.announcement-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 8px 16px;
}
.announcement-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.announcement-alert :deep(.n-alert__content) {
  padding: 12px 16px !important;
}
.alert-content {
  flex: 1;
}
.alert-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 4px;
}
.alert-text {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'v-mono', 'PingFang SC', 'Microsoft YaHei', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
}
.announcement-action {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>