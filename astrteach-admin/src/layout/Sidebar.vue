<template>
  <div class="sidebar-container">
    <div class="sidebar-logo" @click="$router.push('/')">
      <div class="logo-icon">A</div>
      <span v-show="appStore.sidebarOpened" class="logo-title">AstrTeach</span>
    </div>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="!appStore.sidebarOpened"
        :collapse-transition="false"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
      >
        <SidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore, usePermissionStore } from '@/store'
import SidebarItem from './SidebarItem.vue'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const activeMenu = computed(() => route.path)
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  background-color: #304156;

  .sidebar-logo {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: #2b2f3a;
    cursor: pointer;

    .logo-icon {
      width: 32px;
      height: 32px;
      background: #409eff;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .logo-title {
      margin-left: 12px;
      color: #fff;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
