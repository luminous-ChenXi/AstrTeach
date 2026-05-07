<template>
  <div class="page-container">
    <div class="page-header"><h2>学校管理</h2></div>
    <el-card shadow="hover">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>学校列表</span>
          <el-button type="primary" size="small">新增学校</el-button>
        </div>
      </template>
      <el-table :data="schools" stripe>
        <el-table-column prop="name" label="学校名称" />
        <el-table-column prop="type" label="学校类型" width="120" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="teacherCount" label="教师数" width="100" />
        <el-table-column prop="studentCount" label="学生数" width="100" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">编辑</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const schools = [
  { name: '实验中学', type: '初级中学', address: '北京市海淀区中关村大街1号', teacherCount: 15, studentCount: 132, status: '正常' },
]
</script>

<style lang="scss" scoped>
.page-container {
  .page-header { margin-bottom: 20px; h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; } }
}
</style>
