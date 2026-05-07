<template>
  <div class="navbar">
    <div style="display: flex; align-items: center">
      <div class="hamburger-container" @click="toggleSidebar">
        <el-icon :size="20">
          <Fold v-if="appStore.sidebarOpened" />
          <Expand v-else />
        </el-icon>
      </div>
      <Breadcrumb class="breadcrumb-container" />
    </div>

    <div class="right-menu">
      <el-tooltip content="全屏" placement="bottom">
        <div class="hamburger-container" @click="toggleFullscreen">
          <el-icon :size="18">
            <FullScreen />
          </el-icon>
        </div>
      </el-tooltip>

      <el-dropdown trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <el-avatar :size="30" :style="{ background: '#409eff' }">
            {{ userStore.realName?.charAt(0) || 'U' }}
          </el-avatar>
          <span class="username">{{ userStore.realName || '用户' }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="dashboard">首页</el-dropdown-item>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { Fold, Expand, FullScreen, ArrowDown } from '@element-plus/icons-vue'
import { useAppStore, useUserStore } from '@/store'
import Breadcrumb from './Breadcrumb.vue'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const toggleSidebar = () => {
  appStore.toggleSidebar()
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const handleCommand = async (command: string) => {
  switch (command) {
    case 'dashboard':
      router.push('/')
      break
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      try {
        await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await userStore.logoutAction()
        router.push('/login')
      } catch {}
      break
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 8px;
    color: #606266;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    margin-left: 8px;
  }

  .right-menu {
    display: flex;
    align-items: center;
    gap: 8px;

    .avatar-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 0 8px;

      .username {
        font-size: 14px;
        color: #606266;
      }
    }
  }
}
</style>
