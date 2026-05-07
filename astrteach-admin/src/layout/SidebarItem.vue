<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item, item.children) && (!onlyChild.children || onlyChild.noShowingChildren) && !item.meta">
      <el-menu-item :index="resolvePath(onlyChild.path)">
        <el-icon v-if="onlyChild.meta?.icon">
          <component :is="onlyChild.meta.icon" />
        </el-icon>
        <template #title>{{ onlyChild.meta?.title }}</template>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'

const props = defineProps<{
  item: RouteRecordRaw
  basePath: string
}>()

const onlyChild = ref<RouteRecordRaw>({} as RouteRecordRaw)

const hasOneShowingChild = (parent: RouteRecordRaw, children?: RouteRecordRaw[]) => {
  const showingChildren = (children || []).filter((child) => {
    if (child.hidden) return false
    return true
  })

  if (showingChildren.length === 1) {
    onlyChild.value = showingChildren[0]
    return true
  }

  if (showingChildren.length === 0) {
    onlyChild.value = { ...parent, path: '', noShowingChildren: true } as any
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  return path.resolve(props.basePath, routePath)
}
</script>
