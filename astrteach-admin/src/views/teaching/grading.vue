<template>
  <div class="page-container">
    <div class="page-header">
      <h2>作业批改</h2>
      <p>智能批改与人工批改相结合，提升批改效率</p>
    </div>

    <el-card shadow="hover">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="待批改" name="pending" />
            <el-tab-pane label="已批改" name="done" />
            <el-tab-pane label="全部" name="all" />
          </el-tabs>
          <el-button type="primary" size="small">AI 批量批改</el-button>
        </div>
      </template>

      <el-table :data="assignments" stripe>
        <el-table-column prop="title" label="作业名称" />
        <el-table-column prop="className" label="班级" width="120" />
        <el-table-column prop="submitted" label="已提交" width="100" />
        <el-table-column prop="graded" label="已批改" width="100" />
        <el-table-column prop="deadline" label="截止时间" width="160" />
        <el-table-column label="操作" width="160" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">批改</el-button>
            <el-button type="info" link size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <el-pagination
          :total="50"
          :page-size="10"
          layout="prev, pager, next"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('pending')

const assignments = [
  { title: '一元一次方程练习', className: '七年级1班', submitted: 42, graded: 30, deadline: '2026-05-07 18:00' },
  { title: '平面直角坐标系作业', className: '七年级2班', submitted: 38, graded: 38, deadline: '2026-05-06 18:00' },
  { title: '二元一次方程组', className: '七年级3班', submitted: 40, graded: 0, deadline: '2026-05-08 18:00' },
  { title: '数据收集与整理', className: '七年级1班', submitted: 44, graded: 20, deadline: '2026-05-09 18:00' },
]
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    margin-bottom: 20px;
    h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; }
    p { font-size: 14px; color: #909399; margin-top: 4px; }
  }
}
</style>
