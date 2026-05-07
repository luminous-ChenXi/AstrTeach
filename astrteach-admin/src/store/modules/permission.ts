import { defineStore } from 'pinia'
import { ref } from 'vue'
import { constantRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  const addedRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (newRoutes: RouteRecordRaw[]) => {
    addedRoutes.value = newRoutes
    routes.value = constantRoutes.concat(newRoutes)
  }

  const generateRoutes = async () => {
    const accessedRoutes = [] as RouteRecordRaw[]
    setRoutes(accessedRoutes)
    return accessedRoutes
  }

  return {
    routes,
    addedRoutes,
    setRoutes,
    generateRoutes,
  }
})
