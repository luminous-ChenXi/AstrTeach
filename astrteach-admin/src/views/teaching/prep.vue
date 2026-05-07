<template>
  <div class="page-container">
    <div class="page-header">
      <h2>AI 备课</h2>
      <p>利用 AI 智能生成教案、课件和教学设计</p>
    </div>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <span>智能备课</span>
          </template>
          <el-form label-width="80px">
            <el-form-item label="学科">
              <el-select v-model="form.subject" placeholder="请选择学科" style="width: 100%">
                <el-option label="数学" value="math" />
                <el-option label="语文" value="chinese" />
                <el-option label="英语" value="english" />
                <el-option label="物理" value="physics" />
              </el-select>
            </el-form-item>
            <el-form-item label="年级">
              <el-select v-model="form.grade" placeholder="请选择年级" style="width: 100%">
                <el-option label="七年级" value="7" />
                <el-option label="八年级" value="8" />
                <el-option label="九年级" value="9" />
              </el-select>
            </el-form-item>
            <el-form-item label="课题">
              <el-input v-model="form.topic" placeholder="请输入课题，如：一元一次方程" />
            </el-form-item>
            <el-form-item label="课时">
              <el-input-number v-model="form.hours" :min="1" :max="10" />
            </el-form-item>
            <el-form-item label="补充说明">
              <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="可补充教学目标、重难点等" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="generating" @click="handleGenerate">
                <el-icon><MagicStick /></el-icon>
                AI 生成教案
              </el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover" style="margin-bottom: 16px">
          <template #header>
            <span>最近教案</span>
          </template>
          <div class="recent-list">
            <div v-for="item in recentPlans" :key="item.id" class="recent-item">
              <el-icon><Document /></el-icon>
              <div class="recent-info">
                <div class="recent-title">{{ item.title }}</div>
                <div class="recent-meta">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </el-card>

        <el-card shadow="hover">
          <template #header>
            <span>备课统计</span>
          </template>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-num">28</span>
              <span class="stat-label">本月教案</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">12</span>
              <span class="stat-label">AI 生成</span>
            </div>
            <div class="stat-item">
              <span class="stat-num">16</span>
              <span class="stat-label">手动创建</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { MagicStick, Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const generating = ref(false)

const form = reactive({
  subject: '',
  grade: '',
  topic: '',
  hours: 1,
  remark: '',
})

const recentPlans = [
  { id: 1, title: '一元一次方程（第3课时）', time: '1 小时前' },
  { id: 2, title: '平面直角坐标系', time: '昨天' },
  { id: 3, title: '二元一次方程组', time: '2天前' },
  { id: 4, title: '数据的收集与整理', time: '3天前' },
]

const handleGenerate = () => {
  if (!form.subject || !form.grade || !form.topic) {
    ElMessage.warning('请填写学科、年级和课题')
    return
  }
  generating.value = true
  setTimeout(() => {
    generating.value = false
    ElMessage.success('教案生成成功！')
  }, 2000)
}

const handleReset = () => {
  form.subject = ''
  form.grade = ''
  form.topic = ''
  form.hours = 1
  form.remark = ''
}
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    margin-bottom: 20px;

    h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; }
    p { font-size: 14px; color: #909399; margin-top: 4px; }
  }

  .recent-list {
    .recent-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover { background: #f5f7fa; }

      .recent-info {
        .recent-title { font-size: 14px; color: #303133; }
        .recent-meta { font-size: 12px; color: #909399; margin-top: 2px; }
      }
    }
  }

  .stats {
    display: flex;
    justify-content: space-around;

    .stat-item {
      text-align: center;

      .stat-num { display: block; font-size: 24px; font-weight: 700; color: #409eff; }
      .stat-label { font-size: 12px; color: #909399; margin-top: 4px; }
    }
  }
}
</style>
