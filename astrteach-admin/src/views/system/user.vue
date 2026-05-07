<template>
  <div class="page-container">
    <div class="page-header">
      <h2>用户管理</h2>
    </div>

    <el-card shadow="hover">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div style="display: flex; gap: 12px">
            <el-input v-model="search" placeholder="搜索用户名/姓名" style="width: 240px" clearable />
            <el-select v-model="roleFilter" placeholder="角色" style="width: 120px" clearable>
              <el-option label="教师" value="teacher" />
              <el-option label="学生" value="student" />
              <el-option label="管理员" value="admin" />
            </el-select>
          </div>
          <el-button type="primary">新增用户</el-button>
        </div>
      </template>

      <el-table :data="users" stripe>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="realName" label="姓名" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.role === '管理员' ? 'danger' : row.role === '教师' ? 'primary' : 'success'" size="small">{{ row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="school" label="学校" />
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '正常' ? 'success' : 'danger'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="160" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">编辑</el-button>
            <el-button type="warning" link size="small">重置密码</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')
const roleFilter = ref('')

const users = [
  { username: 'zhangsan', realName: '张老师', role: '教师', school: '实验中学', phone: '138****1234', status: '正常', createdAt: '2026-01-15' },
  { username: 'lisi', realName: '李老师', role: '教师', school: '实验中学', phone: '139****5678', status: '正常', createdAt: '2026-02-01' },
  { username: 'admin', realName: '系统管理员', role: '管理员', school: '实验中学', phone: '137****0000', status: '正常', createdAt: '2026-01-01' },
]
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    margin-bottom: 20px;
    h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; }
  }
}
</style>
