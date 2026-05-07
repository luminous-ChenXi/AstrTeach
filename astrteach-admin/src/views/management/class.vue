<template>
  <div class="page-container">
    <div class="page-header">
      <h2>班级管理</h2>
      <p>班级信息、学生名单与班级数据管理</p>
    </div>

    <el-card shadow="hover">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>班级列表</span>
          <el-button type="primary" size="small">新增班级</el-button>
        </div>
      </template>

      <el-table :data="classList" stripe>
        <el-table-column prop="name" label="班级名称" />
        <el-table-column prop="grade" label="年级" width="100" />
        <el-table-column prop="studentCount" label="学生数" width="100" />
        <el-table-column prop="avgScore" label="平均分" width="100" />
        <el-table-column prop="teacher" label="班主任" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '活跃' ? 'success' : 'info'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">查看</el-button>
            <el-button type="warning" link size="small">编辑</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const classList = [
  { name: '七年级1班', grade: '七年级', studentCount: 45, avgScore: 85.2, teacher: '张老师', status: '活跃' },
  { name: '七年级2班', grade: '七年级', studentCount: 43, avgScore: 78.4, teacher: '李老师', status: '活跃' },
  { name: '七年级3班', grade: '七年级', studentCount: 44, avgScore: 72.1, teacher: '王老师', status: '活跃' },
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
