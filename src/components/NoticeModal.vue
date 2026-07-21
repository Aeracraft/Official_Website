<script setup>
import { ref, onMounted, computed } from 'vue'
import { NButton, NCard, NAlert, NSpace } from 'naive-ui'
import { site } from '../config/site.js'

const config = site.announcement
const showModal = ref(false)
const currentIndex = ref(0)

const notices = computed(() => config.notices || [])
const currentNotice = computed(() => notices.value[currentIndex.value])
const totalCount = computed(() => notices.value.length)

const alertType = computed(() => {
  const types = ['info', 'success', 'warning', 'error']
  return types.includes(currentNotice.value?.type) ? currentNotice.value.type : 'info'
})

function handleConfirm() {
  showModal.value = false
  if (config.onlyShowOnce) {
    localStorage.setItem('aeracraft_announcement_shown', 'true')
  }
}

function handleCancel() {
  showModal.value = false
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
  showModal.value = true
}

onMounted(() => {
  setTimeout(() => {
    showAnnouncement()
  }, 500)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="showModal" class="announcement-overlay" @click.self="handleCancel">
      <NCard :title="currentNotice?.title" bordered class="announcement-card">
        <div class="announcement-content">
          <NAlert :type="alertType" :show-icon="true">
            <pre class="content-text">{{ currentNotice?.content }}</pre>
          </NAlert>
        </div>

        <div v-if="totalCount > 1" class="announcement-pagination">
          <NSpace justify="center" align="center">
            <NButton size="small" @click="prevNotice" :disabled="currentIndex === 0">
              上一条
            </NButton>
            <span class="pagination-info">
              {{ currentIndex + 1 }} / {{ totalCount }}
            </span>
            <NButton size="small" @click="nextNotice" :disabled="currentIndex === totalCount - 1">
              下一条
            </NButton>
          </NSpace>
        </div>

        <div class="announcement-actions">
          <NButton
            v-if="config.showCancelButton"
            size="medium"
            @click="handleCancel"
          >
            {{ config.cancelButtonText }}
          </NButton>
          <NButton
            v-if="config.showConfirmButton"
            type="primary"
            size="medium"
            @click="handleConfirm"
          >
            {{ config.confirmButtonText }}
          </NButton>
        </div>
      </NCard>
    </div>
  </Transition>
</template>

<style scoped>
.announcement-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}
.announcement-card {
  width: 100%;
  max-width: 480px;
  margin: 0;
}
.announcement-card :deep(.n-card__content) {
  padding: 20px !important;
}
.announcement-card :deep(.n-card__header) {
  padding: 16px 20px !important;
  border-bottom: 2px solid var(--mc-border) !important;
}
.announcement-card :deep(.n-card__header-title) {
  font-size: 1.15rem !important;
  font-weight: 600 !important;
  color: var(--mc-grass) !important;
}
.announcement-content {
  margin-bottom: 16px;
}
.content-text {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'v-mono', 'PingFang SC', 'Microsoft YaHei', monospace;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--mc-text);
}
.announcement-pagination {
  padding: 12px 0;
  border-top: 1px solid var(--mc-border);
  border-bottom: 1px solid var(--mc-border);
  margin-bottom: 16px;
}
.pagination-info {
  color: var(--mc-text-secondary);
  font-size: 0.85rem;
}
.announcement-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
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