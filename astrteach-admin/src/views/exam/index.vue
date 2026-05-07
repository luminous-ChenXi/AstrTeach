<template>
  <div class="page-container">
    <div class="page-header">
      <h2>题库与考试</h2>
      <p>题目管理、智能组卷与考试安排</p>
    </div>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="题库管理" name="questions">
        <el-card shadow="hover">
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
            <div style="display: flex; gap: 12px">
              <el-select v-model="filter.subject" placeholder="学科" style="width: 120px">
                <el-option label="数学" value="math" />
                <el-option label="语文" value="chinese" />
              </el-select>
              <el-select v-model="filter.type" placeholder="题型" style="width: 120px">
                <el-option label="选择题" value="choice" />
                <el-option label="填空题" value="fill" />
                <el-option label="解答题" value="answer" />
              </el-select>
              <el-select v-model="filter.difficulty" placeholder="难度" style="width: 120px">
                <el-option label="简单" value="easy" />
                <el-option label="中等" value="medium" />
                <el-option label="困难" value="hard" />
              </el-select>
            </div>
            <el-button type="primary" @click="showAddQuestion = true">添加题目</el-button>
          </div>

          <el-table :data="questions" stripe>
            <el-table-column prop="id" label="ID" width="60" />
            <el-table-column prop="content" label="题目内容" show-overflow-tooltip />
            <el-table-column prop="type" label="题型" width="100">
              <template #default="{ row }">
                <el-tag size="small">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="difficulty" label="难度" width="80">
              <template #default="{ row }">
                <el-tag :type="row.difficulty === '简单' ? 'success' : row.difficulty === '中等' ? 'warning' : 'danger'" size="small">{{ row.difficulty }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="subject" label="学科" width="80" />
            <el-table-column label="操作" width="140" fixed="right">
              <template #default>
                <el-button type="primary" link size="small">编辑</el-button>
                <el-button type="danger" link size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="试卷管理" name="papers">
        <el-card shadow="hover">
          <div style="display: flex; justify-content: flex-end; margin-bottom: 16px">
            <el-button type="primary">AI 智能组卷</el-button>
            <el-button>手动组卷</el-button>
          </div>

          <el-table :data="papers" stripe>
            <el-table-column prop="title" label="试卷名称" />
            <el-table-column prop="subject" label="学科" width="80" />
            <el-table-column prop="totalScore" label="总分" width="80" />
            <el-table-column prop="questionCount" label="题目数" width="80" />
            <el-table-column prop="createdAt" label="创建时间" width="160" />
            <el-table-column label="操作" width="180" fixed="right">
              <template #default>
                <el-button type="primary" link size="small">预览</el-button>
                <el-button type="success" link size="small">发布</el-button>
                <el-button type="danger" link size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeTab = ref('questions')
const showAddQuestion = ref(false)

const filter = reactive({ subject: '', type: '', difficulty: '' })

const questions = [
  { id: 1, content: '解方程 2x + 3 = 7', type: '解答题', difficulty: '简单', subject: '数学' },
  { id: 2, content: '下列哪个是二元一次方程？', type: '选择题', difficulty: '中等', subject: '数学' },
  { id: 3, content: '平面直角坐标系中，点(3, -2)在第几象限？', type: '选择题', difficulty: '简单', subject: '数学' },
  { id: 4, content: '若 x² = 16，则 x = ___', type: '填空题', difficulty: '简单', subject: '数学' },
]

const papers = [
  { title: '七年级数学期中考试', subject: '数学', totalScore: 100, questionCount: 25, createdAt: '2026-05-01' },
  { title: '一元一次方程专项测试', subject: '数学', totalScore: 50, questionCount: 15, createdAt: '2026-04-28' },
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
