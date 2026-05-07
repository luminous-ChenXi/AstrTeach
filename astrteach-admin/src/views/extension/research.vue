<template>
  <div class="page-container">
    <div class="page-header">
      <h2>教科研辅助</h2>
      <p>论文写作辅助、课题管理与教研活动</p>
    </div>

    <el-row :gutter="16">
      <el-col :span="12">
        <el-card shadow="hover" style="margin-bottom: 16px">
          <template #header><span>论文辅助</span></template>
          <el-form label-width="80px">
            <el-form-item label="研究方向">
              <el-input v-model="form.direction" placeholder="如：数学教学中的问题设计" />
            </el-form-item>
            <el-form-item label="关键词">
              <el-input v-model="form.keywords" placeholder="多个关键词用逗号分隔" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">AI 生成大纲</el-button>
              <el-button>文献检索</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover">
          <template #header><span>近期教研活动</span></template>
          <el-timeline>
            <el-timeline-item timestamp="2026-05-10" placement="top" type="primary">
              数学组集体备课 - 一元一次方程
            </el-timeline-item>
            <el-timeline-item timestamp="2026-05-15" placement="top" type="success">
              区级公开课展示
            </el-timeline-item>
            <el-timeline-item timestamp="2026-05-20" placement="top" type="warning">
              教学论文提交截止
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  direction: '',
  keywords: '',
})
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
