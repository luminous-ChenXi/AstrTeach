<template>
  <div class="page-container">
    <div class="page-header">
      <h2>AI 素养学习</h2>
      <p>提升教师 AI 教学应用能力与数字素养</p>
    </div>

    <el-row :gutter="16">
      <el-col :span="8" v-for="course in courses" :key="course.id">
        <el-card shadow="hover" style="margin-bottom: 16px">
          <div class="course-cover" :style="{ background: course.cover }">
            <el-icon :size="40" color="#fff"><component :is="course.icon" /></el-icon>
          </div>
          <div style="padding: 12px 0">
            <h4 style="margin: 0 0 8px">{{ course.title }}</h4>
            <p style="font-size: 13px; color: #909399; margin: 0 0 12px">{{ course.desc }}</p>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <el-progress :percentage="course.progress" :stroke-width="6" style="flex: 1; margin-right: 12px" />
              <span style="font-size: 12px; color: #909399">{{ course.progress }}%</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Cpu, Monitor, MagicStick } from '@element-plus/icons-vue'

const courses = [
  { id: 1, title: 'AI 基础概念与应用', desc: '了解人工智能的基本概念、发展历程及教育应用场景', progress: 75, cover: 'linear-gradient(135deg, #667eea, #764ba2)', icon: Cpu },
  { id: 2, title: 'AI 辅助教学实践', desc: '学习如何利用 AI 工具提升教学效率与质量', progress: 40, cover: 'linear-gradient(135deg, #f093fb, #f5576c)', icon: MagicStick },
  { id: 3, title: '智能教育工具使用', desc: '掌握常用智能教育工具的操作与教学融合方法', progress: 20, cover: 'linear-gradient(135deg, #4facfe, #00f2fe)', icon: Monitor },
]
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    margin-bottom: 20px;
    h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; }
    p { font-size: 14px; color: #909399; margin-top: 4px; }
  }

  .course-cover {
    height: 120px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
