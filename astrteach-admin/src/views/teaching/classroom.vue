<template>
  <div class="page-container">
    <div class="page-header">
      <h2>课堂互动</h2>
      <p>实时课堂互动、随堂测验与学生反馈</p>
    </div>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <span>当前课堂</span>
              <el-button type="primary" size="small">开始上课</el-button>
            </div>
          </template>
          <el-empty description="暂无进行中的课堂" />
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover" style="margin-bottom: 16px">
          <template #header><span>快捷操作</span></template>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px">
            <el-button style="width: 100%">发起签到</el-button>
            <el-button style="width: 100%">随机点名</el-button>
            <el-button style="width: 100%">随堂测验</el-button>
            <el-button style="width: 100%">课堂投票</el-button>
          </div>
        </el-card>

        <el-card shadow="hover">
          <template #header><span>历史课堂</span></template>
          <el-timeline>
            <el-timeline-item timestamp="今天 10:00" placement="top">
              七年级1班 - 一元一次方程
            </el-timeline-item>
            <el-timeline-item timestamp="昨天 14:00" placement="top">
              七年级2班 - 平面直角坐标系
            </el-timeline-item>
            <el-timeline-item timestamp="前天 08:00" placement="top">
              七年级3班 - 二元一次方程组
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
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
