<template>
  <div v-if="redirect" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const redirect = route.fullPath

onMounted(() => {
  const { params, query } = route
  const path = '/' + (params.path as string)
  router.replace({ path, query })
})
</script>
