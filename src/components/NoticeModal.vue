<script setup>
import { ref, onMounted, computed } from 'vue'
import { NAlert } from 'naive-ui'
import { site } from '../config/site.js'

const config = site.announcement
const closedNoticeIds = ref([])

const notices = computed(() => config.notices || [])
const visibleNotices = computed(() => {
  return notices.value.filter(notice => !closedNoticeIds.value.includes(notice.id))
})

function getAlertType(type) {
  const types = ['info', 'success', 'warning', 'error']
  return types.includes(type) ? type : 'info'
}

function handleClose(noticeId) {
  closedNoticeIds.value.push(noticeId)
  localStorage.setItem('aeracraft_closed_notices', JSON.stringify(closedNoticeIds.value))
}

function loadClosedNotices() {
  const stored = localStorage.getItem('aeracraft_closed_notices')
  if (stored) {
    try {
      closedNoticeIds.value = JSON.parse(stored)
    } catch (e) {
      closedNoticeIds.value = []
    }
  }
}

onMounted(() => {
  loadClosedNotices()
})
</script>

<template>
  <div v-if="visibleNotices.length > 0" class="notice-container">
    <TransitionGroup name="slide">
      <NAlert
        v-for="notice in visibleNotices"
        :key="notice.id"
        :type="getAlertType(notice.type)"
        :show-icon="true"
        :closable="config.closable"
        :bordered="false"
        class="notice-alert"
        @close="handleClose(notice.id)"
      >
        <span class="alert-title">{{ notice.title }}</span>
        <span class="alert-text">{{ notice.content }}</span>
      </NAlert>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notice-container {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 360px;
}
.notice-alert :deep(.n-alert) {
  padding: 10px 14px !important;
  border-radius: 8px !important;
  margin: 0 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.notice-alert :deep(.n-alert__content) {
  padding: 0 !important;
}
.notice-alert :deep(.n-alert__icon) {
  font-size: 16px !important;
  margin-right: 8px !important;
}
.notice-alert :deep(.n-alert__close) {
  font-size: 14px !important;
}
.alert-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-right: 8px;
}
.alert-text {
  font-size: 0.85rem;
  opacity: 0.9;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.slide-move {
  transition: transform 0.3s ease;
}
</style>