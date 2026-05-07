<template>
  <div class="page-container">
    <div class="page-header"><h2>角色管理</h2></div>
    <el-card shadow="hover">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>角色列表</span>
          <el-button type="primary" size="small">新增角色</el-button>
        </div>
      </template>
      <el-table :data="roles" stripe>
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="key" label="角色标识" />
        <el-table-column prop="desc" label="描述" />
        <el-table-column prop="userCount" label="用户数" width="100" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">编辑</el-button>
            <el-button type="warning" link size="small">权限</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const roles = [
  { name: '超级管理员', key: 'admin', desc: '拥有系统所有权限', userCount: 1 },
  { name: '教师', key: 'teacher', desc: '教学相关功能权限', userCount: 15 },
  { name: '学生', key: 'student', desc: '学生学习相关权限', userCount: 132 },
]
</script>

<style lang="scss" scoped>
.page-container {
  .page-header { margin-bottom: 20px; h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; } }
}
</style>
