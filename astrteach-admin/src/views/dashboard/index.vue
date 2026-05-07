<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <div class="welcome-section">
        <h2>早上好，{{ userStore.realName || '老师' }}！</h2>
        <p>今天有 3 节课待上，12 份作业待批改</p>
      </div>
      <div class="header-actions">
        <el-button @click="$router.push('/teaching/prep')">
          <el-icon><MagicStick /></el-icon>
          AI 快捷备课
        </el-button>
        <el-button type="primary" @click="$router.push('/exam/index')">
          <el-icon><Notebook /></el-icon>
          一键组卷
        </el-button>
      </div>
    </div>

    <el-row :gutter="16" class="stat-row">
      <el-col :span="6" v-for="stat in statCards" :key="stat.label">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" :style="{ background: stat.bgColor }">
            <el-icon :size="24" :style="{ color: stat.color }">
              <component :is="stat.icon" />
            </el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></div>
            <div class="stat-trend">{{ stat.trend }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="content-row">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>本周教学任务趋势</span>
              <el-radio-group v-model="chartPeriod" size="small">
                <el-radio-button value="day">按日</el-radio-button>
                <el-radio-button value="week">按周</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-placeholder">
            <div class="bar-chart">
              <div v-for="day in weeklyData" :key="day.day" class="bar-group">
                <div class="bars">
                  <div class="bar-item">
                    <span class="bar-value">{{ day.prep }}</span>
                    <div class="bar prep" :style="{ height: (day.prep / 5) * 140 + 'px' }" />
                  </div>
                  <div class="bar-item">
                    <span class="bar-value">{{ day.grade }}</span>
                    <div class="bar grade" :style="{ height: (day.grade / 14) * 140 + 'px' }" />
                  </div>
                  <div class="bar-item">
                    <span class="bar-value">{{ day.quiz }}</span>
                    <div class="bar quiz" :style="{ height: (day.quiz / 5) * 140 + 'px' }" />
                  </div>
                </div>
                <span class="bar-label">{{ day.day }}</span>
              </div>
            </div>
            <div class="chart-legend">
              <span><i class="dot prep" />备课</span>
              <span><i class="dot grade" />批改</span>
              <span><i class="dot quiz" />随堂测</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <span>快捷入口</span>
          </template>
          <div class="quick-entries">
            <div v-for="entry in quickEntries" :key="entry.label" class="quick-entry" @click="$router.push(entry.path)">
              <div class="entry-icon" :style="{ background: entry.bg, color: entry.color }">
                <el-icon :size="20"><component :is="entry.icon" /></el-icon>
              </div>
              <span class="entry-label">{{ entry.label }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="content-row">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>优秀学生 TOP4</span>
              <el-tag type="success" size="small">本周</el-tag>
            </div>
          </template>
          <div class="student-list">
            <div v-for="(s, i) in topStudents" :key="i" class="student-item">
              <el-avatar :size="36" :style="{ background: s.avatar }">{{ s.name[0] }}</el-avatar>
              <div class="student-info">
                <div class="student-name">{{ s.name }}</div>
                <div class="student-trend up">{{ s.trend }}分</div>
              </div>
              <div class="student-score">{{ s.score }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>需关注学生</span>
              <el-tag type="danger" size="small">3 人</el-tag>
            </div>
          </template>
          <div class="attention-list">
            <div v-for="(s, i) in attentionStudents" :key="i" class="attention-item">
              <div class="attention-header">
                <el-avatar :size="32" :style="{ background: s.avatar }">{{ s.name[0] }}</el-avatar>
                <div class="attention-info">
                  <div class="attention-name">{{ s.name }}</div>
                  <div class="attention-score">{{ s.score }}分 ({{ s.trend }})</div>
                </div>
              </div>
              <div class="attention-reason">{{ s.reason }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>班级学情速览</span>
              <el-link type="primary" underline="never">详情</el-link>
            </div>
          </template>
          <div class="class-list">
            <div v-for="(cls, i) in classOverview" :key="i" class="class-item">
              <div class="class-header">
                <span class="class-name">{{ cls.name }}</span>
                <div class="class-meta">
                  <span>{{ cls.students }}人</span>
                  <span :class="cls.trend.startsWith('+') ? 'trend-up' : 'trend-down'">{{ cls.trend }}</span>
                </div>
              </div>
              <el-progress
                :percentage="cls.mastery"
                :color="cls.mastery >= 80 ? '#67c23a' : cls.mastery >= 70 ? '#e6a23c' : '#f56c6c'"
                :stroke-width="6"
              />
              <div class="class-avg">均分 {{ cls.avg }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="content-row">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <span>最近动态</span>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(act, i) in recentActivities"
              :key="i"
              :timestamp="act.time"
              placement="top"
              :type="act.type === 'grade' ? 'warning' : act.type === 'prep' ? 'primary' : 'success'"
            >
              {{ act.text }}
              <el-tag size="small" style="margin-left: 8px">{{ act.class }}</el-tag>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
              <el-tag type="warning" size="small">5 项</el-tag>
            </div>
          </template>
          <div class="todo-list">
            <div v-for="(todo, i) in todoItems" :key="i" class="todo-item">
              <div class="todo-priority" :class="todo.priority" />
              <div class="todo-content">
                <div class="todo-text">{{ todo.text }}</div>
                <div class="todo-deadline">
                  <el-icon><Clock /></el-icon>
                  {{ todo.deadline }}
                </div>
              </div>
              <el-icon class="todo-arrow"><ArrowRight /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MagicStick, Notebook, Reading, EditPen, DataAnalysis,
  Document, User, ChatDotRound, Clock, ArrowRight
} from '@element-plus/icons-vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const chartPeriod = ref('day')

const statCards = [
  { icon: Reading, label: '待备课', value: '3', unit: '节', color: '#409eff', bgColor: '#ecf5ff', trend: '较昨日 -1' },
  { icon: EditPen, label: '待批改', value: '12', unit: '份', color: '#e6a23c', bgColor: '#fdf6ec', trend: '较昨日 +3' },
  { icon: DataAnalysis, label: '已完成批改', value: '45', unit: '份', color: '#67c23a', bgColor: '#f0f9eb', trend: '本周累计' },
  { icon: User, label: '薄弱预警学生', value: '8', unit: '人', color: '#f56c6c', bgColor: '#fef0f0', trend: '需重点关注' },
]

const weeklyData = [
  { day: '周一', prep: 3, grade: 8, quiz: 2 },
  { day: '周二', prep: 2, grade: 12, quiz: 1 },
  { day: '周三', prep: 4, grade: 6, quiz: 3 },
  { day: '周四', prep: 1, grade: 10, quiz: 2 },
  { day: '周五', prep: 3, grade: 5, quiz: 1 },
]

const quickEntries = [
  { icon: MagicStick, label: 'AI 生成教案', color: '#409eff', bg: '#ecf5ff', path: '/teaching/prep' },
  { icon: Notebook, label: '一键组卷', color: '#67c23a', bg: '#f0f9eb', path: '/exam/index' },
  { icon: EditPen, label: '批量批改', color: '#e6a23c', bg: '#fdf6ec', path: '/teaching/grading' },
  { icon: DataAnalysis, label: '学情报告', color: '#f56c6c', bg: '#fef0f0', path: '/teaching/profile' },
  { icon: ChatDotRound, label: '家校沟通', color: '#409eff', bg: '#ecf5ff', path: '/management/home-school' },
  { icon: Document, label: '题库管理', color: '#67c23a', bg: '#f0f9eb', path: '/exam/index' },
]

const topStudents = [
  { name: '李明', score: 98, trend: '+5', avatar: '#67c23a' },
  { name: '王芳', score: 95, trend: '+3', avatar: '#409eff' },
  { name: '赵磊', score: 93, trend: '+7', avatar: '#67c23a' },
  { name: '陈雨', score: 91, trend: '+2', avatar: '#409eff' },
]

const attentionStudents = [
  { name: '陈静', score: 52, trend: '-8', reason: '方程章节连续3次不及格', avatar: '#f56c6c' },
  { name: '刘洋', score: 55, trend: '-5', reason: '作业完成率降至60%', avatar: '#e6a23c' },
  { name: '张浩', score: 58, trend: '-3', reason: '课堂参与度明显下降', avatar: '#f56c6c' },
]

const classOverview = [
  { name: '七年级1班', mastery: 82, trend: '+3.2%', students: 45, avg: 85.2 },
  { name: '七年级2班', mastery: 76, trend: '+1.8%', students: 43, avg: 78.4 },
  { name: '七年级3班', mastery: 71, trend: '-0.5%', students: 44, avg: 72.1 },
]

const recentActivities = [
  { type: 'grade', text: '批改了七年级1班数学作业', class: '七年级1班', time: '10 分钟前' },
  { type: 'prep', text: '生成「一元一次方程（第3课时）」教案', class: '七年级', time: '1 小时前' },
  { type: 'quiz', text: '在七年级3班发起了随堂测', class: '七年级3班', time: '2 小时前' },
  { type: 'notice', text: '向七年级1班家长推送了本周学情周报', class: '七年级1班', time: '3 小时前' },
  { type: 'exam', text: '生成了期中复习专项试卷', class: '七年级', time: '昨天' },
]

const todoItems = [
  { text: '批改七年级1班数学作业', deadline: '今天 18:00', priority: 'high' },
  { text: '准备明日期中复习课件', deadline: '今天 20:00', priority: 'high' },
  { text: '查看3班薄弱点分析报告', deadline: '明天 12:00', priority: 'medium' },
  { text: '回复家长关于期中考试提问', deadline: '明天 17:00', priority: 'medium' },
  { text: '提交本学期教研总结', deadline: '本周五', priority: 'low' },
]
</script>

<style lang="scss" scoped>
.dashboard-container {
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .welcome-section {
      h2 {
        font-size: 22px;
        font-weight: 700;
        color: #303133;
        margin: 0;
      }

      p {
        font-size: 14px;
        color: #909399;
        margin-top: 6px;
      }
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }
  }

  .stat-row {
    margin-bottom: 16px;

    .stat-card {
      :deep(.el-card__body) {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
      }

      .stat-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .stat-info {
        .stat-label {
          font-size: 13px;
          color: #909399;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #303133;

          .stat-unit {
            font-size: 13px;
            font-weight: 400;
            color: #909399;
            margin-left: 2px;
          }
        }

        .stat-trend {
          font-size: 11px;
          color: #c0c4cc;
          margin-top: 2px;
        }
      }
    }
  }

  .content-row {
    margin-bottom: 16px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chart-placeholder {
    .bar-chart {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      height: 200px;
      padding: 0 16px;

      .bar-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;

        .bars {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 160px;

          .bar-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;

            .bar-value {
              font-size: 10px;
              color: #909399;
            }

            .bar {
              width: 28px;
              border-radius: 4px 4px 0 0;
              transition: height 0.5s ease-in-out;
              min-height: 4px;

              &.prep { background: #409eff; }
              &.grade { background: #e6a23c; }
              &.quiz { background: #67c23a; }

              &:hover { opacity: 0.8; }
            }
          }
        }

        .bar-label {
          font-size: 12px;
          color: #909399;
          margin-top: 8px;
        }
      }
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #ebeef5;

      span {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #909399;

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 2px;

          &.prep { background: #409eff; }
          &.grade { background: #e6a23c; }
          &.quiz { background: #67c23a; }
        }
      }
    }
  }

  .quick-entries {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .quick-entry {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        background: #f5f7fa;
      }

      .entry-icon {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .entry-label {
        font-size: 12px;
        color: #606266;
      }
    }
  }

  .student-list {
    .student-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px;
      border-radius: 8px;
      transition: background 0.2s;

      &:hover { background: #f5f7fa; }

      .student-info {
        flex: 1;

        .student-name { font-size: 14px; font-weight: 500; color: #303133; }
        .student-trend { font-size: 12px; &.up { color: #67c23a; } }
      }

      .student-score {
        font-size: 18px;
        font-weight: 700;
        color: #67c23a;
      }
    }
  }

  .attention-list {
    .attention-item {
      padding: 12px;
      border-radius: 8px;
      background: #f5f7fa;
      margin-bottom: 8px;

      &:last-child { margin-bottom: 0; }

      .attention-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;

        .attention-info {
          .attention-name { font-size: 14px; font-weight: 500; color: #303133; }
          .attention-score { font-size: 14px; font-weight: 700; color: #f56c6c; }
        }
      }

      .attention-reason {
        font-size: 12px;
        color: #909399;
        padding-left: 42px;
      }
    }
  }

  .class-list {
    .class-item {
      margin-bottom: 16px;

      &:last-child { margin-bottom: 0; }

      .class-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;

        .class-name { font-size: 14px; font-weight: 500; color: #303133; }

        .class-meta {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: #909399;

          .trend-up { color: #67c23a; font-weight: 600; }
          .trend-down { color: #f56c6c; font-weight: 600; }
        }
      }

      .class-avg {
        font-size: 12px;
        color: #909399;
        margin-top: 4px;
      }
    }
  }

  .todo-list {
    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 8px;
      transition: background 0.2s;

      &:hover { background: #f5f7fa; }

      .todo-priority {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;

        &.high { background: #f56c6c; }
        &.medium { background: #e6a23c; }
        &.low { background: #67c23a; }
      }

      .todo-content {
        flex: 1;

        .todo-text { font-size: 14px; color: #303133; }
        .todo-deadline {
          font-size: 12px;
          color: #909399;
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }

      .todo-arrow {
        color: #c0c4cc;
      }
    }
  }
}
</style>
