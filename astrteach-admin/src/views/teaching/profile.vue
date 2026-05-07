<template>
  <div class="page-container">
    <div class="page-header">
      <h2>学情画像</h2>
      <p>多维度学生学情分析与个性化教学建议</p>
    </div>

    <el-row :gutter="16">
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header><span>班级选择</span></template>
          <el-select v-model="selectedClass" placeholder="选择班级" style="width: 100%">
            <el-option label="七年级1班" value="1" />
            <el-option label="七年级2班" value="2" />
            <el-option label="七年级3班" value="3" />
          </el-select>
          <div style="margin-top: 16px">
            <div v-for="student in students" :key="student.id" class="student-item" @click="selectedStudent = student">
              <el-avatar :size="32" :style="{ background: student.color }">{{ student.name[0] }}</el-avatar>
              <div class="student-info">
                <span class="name">{{ student.name }}</span>
                <span class="score">{{ student.avgScore }}分</span>
              </div>
              <el-tag :type="student.trend > 0 ? 'success' : 'danger'" size="small">
                {{ student.trend > 0 ? '+' : '' }}{{ student.trend }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card shadow="hover" v-if="selectedStudent">
          <template #header>
            <span>{{ selectedStudent.name }} - 学情分析</span>
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="平均分">{{ selectedStudent.avgScore }}</el-descriptions-item>
            <el-descriptions-item label="班级排名">{{ selectedStudent.rank }}</el-descriptions-item>
            <el-descriptions-item label="作业完成率">{{ selectedStudent.homeworkRate }}%</el-descriptions-item>
            <el-descriptions-item label="课堂参与度">{{ selectedStudent.participation }}%</el-descriptions-item>
            <el-descriptions-item label="薄弱知识点" :span="2">{{ selectedStudent.weakPoints }}</el-descriptions-item>
          </el-descriptions>

          <div style="margin-top: 20px">
            <h4>知识点掌握情况</h4>
            <div v-for="point in selectedStudent.knowledgePoints" :key="point.name" style="margin-top: 12px">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px">
                <span style="font-size: 14px">{{ point.name }}</span>
                <span style="font-size: 14px; color: #909399">{{ point.mastery }}%</span>
              </div>
              <el-progress :percentage="point.mastery" :color="point.mastery >= 80 ? '#67c23a' : point.mastery >= 60 ? '#e6a23c' : '#f56c6c'" :stroke-width="8" :show-text="false" />
            </div>
          </div>
        </el-card>

        <el-card shadow="hover" v-else>
          <el-empty description="请选择学生查看学情画像" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedClass = ref('1')
const selectedStudent = ref<any>(null)

const students = [
  { id: 1, name: '李明', avgScore: 92, trend: 5, color: '#409eff', rank: '第3名', homeworkRate: 98, participation: 95, weakPoints: '无', knowledgePoints: [{ name: '一元一次方程', mastery: 95 }, { name: '平面直角坐标系', mastery: 88 }, { name: '数据统计', mastery: 92 }] },
  { id: 2, name: '王芳', avgScore: 88, trend: 3, color: '#67c23a', rank: '第8名', homeworkRate: 95, participation: 90, weakPoints: '平面直角坐标系', knowledgePoints: [{ name: '一元一次方程', mastery: 90 }, { name: '平面直角坐标系', mastery: 72 }, { name: '数据统计', mastery: 88 }] },
  { id: 3, name: '陈静', avgScore: 52, trend: -8, color: '#f56c6c', rank: '第42名', homeworkRate: 60, participation: 45, weakPoints: '一元一次方程、二元一次方程组', knowledgePoints: [{ name: '一元一次方程', mastery: 35 }, { name: '平面直角坐标系', mastery: 48 }, { name: '数据统计', mastery: 55 }] },
]
</script>

<style lang="scss" scoped>
.page-container {
  .page-header {
    margin-bottom: 20px;
    h2 { font-size: 20px; font-weight: 700; color: #303133; margin: 0; }
    p { font-size: 14px; color: #909399; margin-top: 4px; }
  }

  .student-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover { background: #f5f7fa; }

    .student-info {
      flex: 1;
      .name { font-size: 14px; color: #303133; }
      .score { font-size: 12px; color: #909399; margin-left: 8px; }
    }
  }
}
</style>
