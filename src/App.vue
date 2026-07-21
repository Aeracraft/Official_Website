<script setup>
import { h } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NMenu, NSpace, NButton } from 'naive-ui'
import { site } from './config/site.js'

const route = useRoute()

const menuOptions = site.nav.map(item => ({
  key: item.path,
  label: item.label,
  path: item.path,
}))

function renderMenuLabel(option) {
  return h(RouterLink, { to: option.path }, { default: () => option.label })
}
</script>

<template>
  <NLayout class="site-layout">
    <NLayoutHeader bordered class="site-header">
      <div class="header-inner">
        <RouterLink to="/" class="brand">
          <span class="brand-icon">⛏️</span>
          <span class="brand-text">{{ site.name }}</span>
        </RouterLink>

        <NMenu
          mode="horizontal"
          :value="route.path"
          :options="menuOptions"
          :render-label="renderMenuLabel"
          class="main-nav"
        />

        <NButton tag="a" :href="site.qqGroup.link" target="_blank" type="primary" class="join-btn">
          Q 群 {{ site.qqGroup.number }}
        </NButton>
      </div>
    </NLayoutHeader>

    <NLayoutContent class="site-content">
      <RouterView />
    </NLayoutContent>

    <NLayoutFooter bordered class="site-footer">
      <NSpace justify="center" align="center" vertical>
        <NSpace>
          <a v-for="link in site.footer.links" :key="link.url" :href="link.url" target="_blank">
            {{ link.label }}
          </a>
        </NSpace>
        <p>{{ site.footer.copyright }}</p>
      </NSpace>
    </NLayoutFooter>
  </NLayout>
</template>

<style scoped>
.site-layout {
  min-height: 100vh;
  background: var(--mc-light-bg) !important;
}
.site-layout :deep(.n-layout-scroll-container) {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.site-header {
  background: var(--mc-cloud) !important;
  border-bottom: 4px solid var(--mc-grass) !important;
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--mc-dark);
  font-weight: bold;
  font-size: 1.25rem;
  white-space: nowrap;
}
.brand-icon {
  font-size: 1.5rem;
}
.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}
.site-content {
  flex: 1;
}
.site-footer {
  background: var(--mc-cloud) !important;
  padding: 24px;
  text-align: center;
  border-top: 4px solid var(--mc-grass) !important;
}
.site-footer a {
  color: var(--mc-grass);
  text-decoration: none;
  margin: 0 8px;
}
.site-footer a:hover {
  text-decoration: underline;
}
.site-footer p {
  margin: 8px 0 0;
  color: var(--mc-text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .header-inner {
    flex-wrap: wrap;
    height: auto;
    padding: 12px;
  }
  .brand {
    width: 100%;
    margin-bottom: 8px;
  }
  .main-nav {
    order: 3;
    width: 100%;
    justify-content: flex-start;
  }
  .join-btn {
    display: none;
  }
}
</style>
