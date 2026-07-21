<script setup>
import { ref, onMounted, computed } from 'vue'
import { NButton, NAlert, NSpace } from 'naive-ui'
import { site } from '../config/site.js'

const config = site.announcement
const showAlert = ref(false)
const currentIndex = ref(0)

const notices = computed(() => config.notices || [])
const currentNotice = computed(() => notices.value[currentIndex.value])
const totalCount = computed(() => notices.value.length)

const alertType = computed(() => {
  const types = ['info', 'success', 'warning', 'error']
  return types.includes(currentNotice.value?.type) ? currentNotice.value.type : 'info'
})

function handleClose() {
  showAlert.value = false
  if (config.onlyShowOnce) {
    localStorage.setItem('aeracraft_announcement_shown', 'true')
  }
}

function prevNotice() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function nextNotice() {
  if (currentIndex.value < totalCount.value - 1) {
    currentIndex.value++
  }
}

function showAnnouncement() {
  if (!config.enabled) return
  if (!notices.value.length) return
  if (config.onlyShowOnce) {
    const shown = localStorage.getItem('aeracraft_announcement_shown')
    if (shown === 'true') return
  }
  currentIndex.value = 0
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
      <NAlert
        :type="alertType"
        :show-icon="true"
        :closable="config.closable"
        class="announcement-alert"
        @close="handleClose"
      >
        <div class="alert-content">
          <div class="alert-title">{{ currentNotice?.title }}</div>
          <pre class="alert-text">{{ currentNotice?.content }}</pre>
        </div>

        <div v-if="totalCount > 1" class="alert-pagination">
          <NSpace justify="center" align="center" size="small">
            <NButton text size="small" @click="prevNotice" :disabled="currentIndex === 0">
              上一条
            </NButton>
            <span class="pagination-info">
              {{ currentIndex + 1 }} / {{ totalCount }}
            </span>
            <NButton text size="small" @click="nextNotice" :disabled="currentIndex === totalCount - 1">
              下一条
            </NButton>
          </NSpace>
        </div>

        <div v-if="config.showConfirmButton" class="alert-action">
          <NButton type="primary" size="small" @click="handleClose">
            {{ config.confirmButtonText }}
          </NButton>
        </div>
      </NAlert>
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
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 100%);
}
.announcement-alert {
  max-width: 800px;
  margin: 0 auto;
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
.alert-pagination {
  padding: 8px 0 4px;
  margin-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.1);
}
.pagination-info {
  color: inherit;
  opacity: 0.8;
  font-size: 0.8rem;
}
.alert-action {
  padding-top: 8px;
  margin-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: flex;
  justify-content: flex-end;
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