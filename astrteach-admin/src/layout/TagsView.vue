<template>
  <div class="tags-view-container">
    <router-link
      v-for="tag in visitedViews"
      :key="tag.path"
      :to="tag.path"
      :class="{ active: isActive(tag) }"
      class="tags-view-item"
      @contextmenu.prevent="openContextMenu($event, tag)"
    >
      {{ tag.meta?.title }}
      <el-icon
        v-if="!isAffix(tag)"
        @click.prevent.stop="closeTag(tag)"
      >
        <Close />
      </el-icon>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { Close } from '@element-plus/icons-vue'
import { constantRoutes } from '@/router'

interface TagView {
  path: string
  name?: string
  meta: Record<string, any>
}

const route = useRoute()
const router = useRouter()
const visitedViews = ref<TagView[]>([])

const isActive = (tag: TagView) => tag.path === route.path

const isAffix = (tag: TagView) => tag.meta?.affix

const addTag = () => {
  if (route.name && !visitedViews.value.some((v) => v.path === route.path)) {
    visitedViews.value.push({
      path: route.path,
      name: route.name as string,
      meta: { ...route.meta },
    })
  }
}

const closeTag = (tag: TagView) => {
  const index = visitedViews.value.findIndex((v) => v.path === tag.path)
  if (index > -1) {
    visitedViews.value.splice(index, 1)
    if (isActive(tag)) {
      const lastView = visitedViews.value[visitedViews.value.length - 1]
      if (lastView) {
        router.push(lastView.path)
      } else {
        router.push('/')
      }
    }
  }
}

const openContextMenu = (_e: MouseEvent, _tag: TagView) => {}

const initTags = () => {
  const affixTags = constantRoutes
    .flatMap((r) => r.children || [])
    .filter((r) => r.meta?.affix)
  affixTags.forEach((tag) => {
    if (tag.path && !visitedViews.value.some((v) => v.path === '/' + tag.path)) {
      visitedViews.value.push({
        path: '/' + tag.path,
        name: tag.name as string,
        meta: { ...tag.meta },
      })
    }
  })
}

watch(() => route.path, addTag)
onMounted(() => {
  initTags()
  addTag()
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  padding: 0 12px;
  overflow-x: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 0;
  }

  .tags-view-item {
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-right: 6px;
    text-decoration: none;
    border-radius: 2px;

    &.active {
      background-color: #409eff;
      color: #fff;
      border-color: #409eff;

      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    .el-icon {
      margin-left: 4px;
      font-size: 12px;
      border-radius: 50%;

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
