<script setup>
import { ref, onMounted, computed } from 'vue'
import { NAlert } from 'naive-ui'
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
  <Transition name="fade">
    <div v-if="showAlert" class="announcement-section">
      <NAlert
        v-for="(notice, index) in notices"
        :key="index"
        :type="getAlertType(notice.type)"
        :show-icon="true"
        :closable="config.closable"
        :bordered="false"
        class="notice-alert"
        @close="handleClose"
      >
        <span class="alert-title">{{ notice.title }}</span>
        <span class="alert-text">{{ notice.content }}</span>
      </NAlert>
    </div>
  </Transition>
</template>

<style scoped>
.announcement-section {
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.notice-alert :deep(.n-alert) {
  padding: 8px 12px !important;
  border-radius: 6px !important;
  margin: 0 !important;
}
.notice-alert :deep(.n-alert__content) {
  padding: 0 !important;
}
.notice-alert :deep(.n-alert__icon) {
  font-size: 14px !important;
  margin-right: 8px !important;
}
.alert-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-right: 8px;
}
.alert-text {
  font-size: 0.8rem;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>