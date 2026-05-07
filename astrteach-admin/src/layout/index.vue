<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': true }">
        <Navbar />
        <TagsView />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/store'
import Sidebar from './Sidebar.vue'
import Navbar from './Navbar.vue'
import TagsView from './TagsView.vue'
import AppMain from './AppMain.vue'

const appStore = useAppStore()

const classObj = computed(() => ({
  hideSidebar: !appStore.sidebarOpened,
  openSidebar: appStore.sidebarOpened,
  mobile: appStore.device === 'mobile',
}))
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &.hideSidebar {
    .sidebar-container {
      width: var(--sidebar-collapsed-width);
    }

    .main-container {
      margin-left: var(--sidebar-collapsed-width);
    }
  }
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100%;
  overflow: hidden;
  background-color: #304156;
  transition: width 0.28s ease-in-out;
  z-index: 1001;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s ease-in-out;
  margin-left: var(--sidebar-width);
  position: relative;
}

.fixed-header {
  position: sticky;
  top: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s ease-in-out;
}
</style>
