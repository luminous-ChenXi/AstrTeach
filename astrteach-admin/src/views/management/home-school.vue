<template>
  <div class="page-container">
    <div class="page-header">
      <h2>家校沟通</h2>
      <p>与家长进行学情反馈、通知推送与在线沟通</p>
    </div>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <span>消息列表</span>
              <el-button type="primary" size="small">发送通知</el-button>
            </div>
          </template>
          <el-table :data="messages" stripe>
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="className" label="班级" width="120" />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <el-tag :type="row.type === '学情周报' ? 'primary' : row.type === '通知' ? 'warning' : 'success'" size="small">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="readRate" label="阅读率" width="100" />
            <el-table-column prop="time" label="发送时间" width="160" />
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <template #header><span>快捷操作</span></template>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <el-button style="width: 100%">推送学情周报</el-button>
            <el-button style="width: 100%">发送考试通知</el-button>
            <el-button style="width: 100%">家长会邀请</el-button>
            <el-button style="width: 100%">个别沟通</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const messages = [
  { title: '本周学情周报', className: '七年级1班', type: '学情周报', readRate: '92%', time: '2026-05-05 18:00' },
  { title: '期中考试安排通知', className: '七年级', type: '通知', readRate: '88%', time: '2026-05-03 10:00' },
  { title: '家长会邀请函', className: '七年级1班', type: '活动', readRate: '76%', time: '2026-05-01 09:00' },
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
