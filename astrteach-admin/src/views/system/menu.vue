<template>
  <div class="page-container">
    <div class="page-header"><h2>菜单管理</h2></div>
    <el-card shadow="hover">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>菜单列表</span>
          <el-button type="primary" size="small">新增菜单</el-button>
        </div>
      </template>
      <el-table :data="menus" row-key="id" :tree-props="{ children: 'children' }" default-expand-all>
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="icon" label="图标" width="80" />
        <el-table-column prop="path" label="路由地址" />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="visible" label="可见" width="80">
          <template #default="{ row }">
            <el-tag :type="row.visible ? 'success' : 'danger'" size="small">{{ row.visible ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button type="primary" link size="small">编辑</el-button>
            <el-button type="success" link size="small">新增</el-button>
            <el-button type="danger" link size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const menus = [
  { id: 1, name: '工作台', icon: 'Odometer', path: '/dashboard', sort: 1, visible: true },
  { id: 2, name: '教学核心', icon: 'Reading', path: '/teaching', sort: 2, visible: true, children: [
    { id: 21, name: 'AI 备课', icon: 'MagicStick', path: '/teaching/prep', sort: 1, visible: true },
    { id: 22, name: '课堂互动', icon: 'Monitor', path: '/teaching/classroom', sort: 2, visible: true },
    { id: 23, name: '作业批改', icon: 'EditPen', path: '/teaching/grading', sort: 3, visible: true },
    { id: 24, name: '学情画像', icon: 'DataAnalysis', path: '/teaching/profile', sort: 4, visible: true },
  ]},
  { id: 3, name: '考试测评', icon: 'Document', path: '/exam', sort: 3, visible: true, children: [
    { id: 31, name: '题库与考试', icon: 'Notebook', path: '/exam/index', sort: 1, visible: true },
  ]},
  { id: 4, name: '系统管理', icon: 'Setting', path: '/system', sort: 6, visible: true, children: [
    { id: 41, name: '用户管理', icon: 'User', path: '/system/user', sort: 1, visible: true },
    { id: 42, name: '角色管理', icon: 'UserFilled', path: '/system/role', sort: 2, visible: true },
    { id: 43, name: '菜单管理', icon: 'Menu', path: '/system/menu', sort: 3, visible: true },
    { id: 44, name: '学校管理', icon: 'School', path: '/system/school', sort: 4, visible: true },
  ]},
]
</script>

<style lang="scss" scoped>
.page-container {
  .page-header { margin-bottom: 20px; h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; } }
}
</style>
