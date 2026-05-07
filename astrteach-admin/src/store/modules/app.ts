import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebarOpened = ref(true)
  const device = ref<'desktop' | 'mobile'>('desktop')

  const toggleSidebar = () => {
    sidebarOpened.value = !sidebarOpened.value
  }

  const closeSidebar = () => {
    sidebarOpened.value = false
  }

  const setDevice = (val: 'desktop' | 'mobile') => {
    device.value = val
  }

  return {
    sidebarOpened,
    device,
    toggleSidebar,
    closeSidebar,
    setDevice,
  }
})
