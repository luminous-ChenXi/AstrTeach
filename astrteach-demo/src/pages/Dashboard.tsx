import { useState } from 'react'
import {
  BookOpen, PenTool, BarChart3, FileText, Users, Brain,
  TrendingUp, Clock, CheckCircle2, AlertTriangle, ArrowUpRight,
  Sparkles, Calendar, Bell, ChevronRight
} from 'lucide-react'

const weeklyData = [
  { day: '周一', prep: 3, grade: 8, quiz: 2 },
  { day: '周二', prep: 2, grade: 12, quiz: 1 },
  { day: '周三', prep: 4, grade: 6, quiz: 3 },
  { day: '周四', prep: 1, grade: 10, quiz: 2 },
  { day: '周五', prep: 3, grade: 5, quiz: 1 },
]

const recentActivities = [
  { type: 'grade', text: '批改了七年级1班数学作业', class: '七年级1班', time: '10 分钟前' },
  { type: 'prep', text: '生成「一元一次方程（第3课时）」教案', class: '七年级', time: '1 小时前' },
  { type: 'quiz', text: '在七年级3班发起了随堂测', class: '七年级3班', time: '2 小时前' },
  { type: 'notice', text: '向七年级1班家长推送了本周学情周报', class: '七年级1班', time: '3 小时前' },
  { type: 'exam', text: '生成了期中复习专项试卷', class: '七年级', time: '昨天' },
]

const topStudents = [
  { name: '李明', score: 98, trend: '+5', avatar: 'bg-accent-500' },
  { name: '王芳', score: 95, trend: '+3', avatar: 'bg-primary-500' },
  { name: '赵磊', score: 93, trend: '+7', avatar: 'bg-accent-500' },
  { name: '陈雨', score: 91, trend: '+2', avatar: 'bg-primary-500' },
]

const attentionStudents = [
  { name: '陈静', score: 52, trend: '-8', reason: '方程章节连续3次不及格', avatar: 'bg-rose-400' },
  { name: '刘洋', score: 55, trend: '-5', reason: '作业完成率降至60%', avatar: 'bg-warm-400' },
  { name: '张浩', score: 58, trend: '-3', reason: '课堂参与度明显下降', avatar: 'bg-rose-400' },
]

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week'>('today')

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">工作台</h1>
            <p className="page-subtitle">早上好，张老师！今天有 3 节课待上，12 份作业待批改</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <Calendar size={16} />
              本周课表
            </button>
            <button className="btn-primary">
              <Sparkles size={16} />
              AI 快捷备课
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <BookOpen size={22} />, label: '待备课', value: '3', extra: '节', color: 'bg-primary-50 text-primary-600', iconBg: 'bg-primary-100', trend: '较昨日 -1' },
          { icon: <PenTool size={22} />, label: '待批改', value: '12', extra: '份', color: 'bg-warm-50 text-warm-500', iconBg: 'bg-warm-100', trend: '较昨日 +3' },
          { icon: <CheckCircle2 size={22} />, label: '已完成批改', value: '45', extra: '份', color: 'bg-accent-50 text-accent-600', iconBg: 'bg-accent-100', trend: '本周累计' },
          { icon: <AlertTriangle size={22} />, label: '薄弱预警学生', value: '8', extra: '人', color: 'bg-rose-50 text-rose-500', iconBg: 'bg-rose-100', trend: '需重点关注' }
        ].map((stat, i) => (
          <div key={i} className={`stat-card animate-fade-in-up stagger-${i + 1}`}>
            <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
              <span className={stat.color.split(' ')[1]}>{stat.icon}</span>
            </div>
            <div>
              <div className="text-[13px] text-text-secondary">{stat.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className="text-[13px] text-text-tertiary">{stat.extra}</span>
              </div>
              <div className="text-[11px] text-text-tertiary mt-0.5">{stat.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="section-title">本周教学任务趋势</h2>
              <p className="section-desc">备课 / 批改 / 随堂测 完成统计</p>
            </div>
            <div className="flex gap-2">
              <span
                onClick={() => setSelectedPeriod('today')}
                className={`badge cursor-pointer transition-colors ${selectedPeriod === 'today' ? 'badge-primary' : 'badge-warm'}`}
              >按日</span>
              <span
                onClick={() => setSelectedPeriod('week')}
                className={`badge cursor-pointer transition-colors ${selectedPeriod === 'week' ? 'badge-primary' : 'badge-accent'}`}
              >按周</span>
            </div>
          </div>

          <div className="flex items-end gap-8 h-[200px] px-2">
            {weeklyData.map((day) => {
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex items-end gap-2 h-[160px]">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-text-tertiary">{day.prep}</span>
                      <div
                        className="w-8 rounded-t-md bg-primary-400 transition-all duration-500 ease-in-out hover:bg-primary-500"
                        style={{ height: `${(day.prep / 5) * 140}px`, minHeight: '4px' }}
                        title={`备课: ${day.prep}`}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-text-tertiary">{day.grade}</span>
                      <div
                        className="w-8 rounded-t-md bg-warm-400 transition-all duration-500 ease-in-out hover:bg-warm-500"
                        style={{ height: `${(day.grade / 14) * 140}px`, minHeight: '4px' }}
                        title={`批改: ${day.grade}`}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[10px] text-text-tertiary">{day.quiz}</span>
                      <div
                        className="w-8 rounded-t-md bg-accent-400 transition-all duration-500 ease-in-out hover:bg-accent-500"
                        style={{ height: `${(day.quiz / 5) * 140}px`, minHeight: '4px' }}
                        title={`随堂测: ${day.quiz}`}
                      />
                    </div>
                  </div>
                  <span className="text-[12px] text-text-tertiary font-medium">{day.day}</span>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary-400" />
              <span className="text-[12px] text-text-tertiary">备课</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-warm-400" />
              <span className="text-[12px] text-text-tertiary">批改</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-accent-400" />
              <span className="text-[12px] text-text-tertiary">随堂测</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">快捷入口</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Sparkles size={20} />, label: 'AI 生成教案', color: 'text-primary-500', bg: 'bg-primary-50' },
              { icon: <FileText size={20} />, label: '一键组卷', color: 'text-accent-600', bg: 'bg-accent-50' },
              { icon: <PenTool size={20} />, label: '批量批改', color: 'text-warm-500', bg: 'bg-warm-50' },
              { icon: <BarChart3 size={20} />, label: '学情报告', color: 'text-rose-500', bg: 'bg-rose-50' },
              { icon: <Users size={20} />, label: '家校沟通', color: 'text-primary-600', bg: 'bg-primary-50' },
              { icon: <Brain size={20} />, label: 'AI 答疑', color: 'text-accent-500', bg: 'bg-accent-50' }
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-surface-overlay transition-all hover:shadow-sm">
                <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <span className="text-[12px] font-medium text-text-secondary">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">优秀学生 TOP4</h2>
            <span className="badge badge-accent">本周</span>
          </div>
          <div className="space-y-3">
            {topStudents.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-overlay transition-colors">
                <div className={`avatar w-9 h-9 text-[11px] ${s.avatar}`}>{s.name[0]}</div>
                <div className="flex-1">
                  <div className="text-[13px] font-medium text-text-primary">{s.name}</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={10} className="text-accent-500" />
                    <span className="text-[11px] text-accent-600 font-medium">{s.trend}分</span>
                  </div>
                </div>
                <span className="text-[18px] font-bold text-accent-600">{s.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">需关注学生</h2>
            <span className="badge badge-rose">3 人</span>
          </div>
          <div className="space-y-3">
            {attentionStudents.map((s, i) => (
              <div key={i} className="p-3 rounded-lg bg-surface-overlay hover:bg-rose-50/30 transition-colors">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className={`w-8 h-8 rounded-full ${s.avatar} flex items-center justify-center text-white text-[11px] font-bold`}>{s.name[0]}</div>
                  <div>
                    <div className="text-[13px] font-medium text-text-primary">{s.name}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-[14px] font-bold text-rose-500">{s.score}分</span>
                      <span className="text-[11px] text-rose-500">({s.trend})</span>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-text-tertiary pl-11">{s.reason}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">班级学情速览</h2>
            <button className="text-[13px] text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              详情 <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: '七年级1班', mastery: 82, trend: '+3.2%', students: 45, avg: 85.2 },
              { name: '七年级2班', mastery: 76, trend: '+1.8%', students: 43, avg: 78.4 },
              { name: '七年级3班', mastery: 71, trend: '-0.5%', students: 44, avg: 72.1 }
            ].map((cls, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-text-primary">{cls.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-text-tertiary">{cls.students}人</span>
                      <span className={`text-[12px] font-semibold ${cls.trend.startsWith('+') ? 'text-accent-600' : 'text-rose-500'}`}>
                        {cls.trend}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${cls.mastery}%`,
                        background: cls.mastery >= 80 ? 'var(--color-accent-500)' : cls.mastery >= 70 ? 'var(--color-warm-400)' : 'var(--color-rose-400)'
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-text-tertiary mt-1">均分 {cls.avg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">最近动态</h2>
          </div>
          <div className="space-y-3">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-overlay transition-colors">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  act.type === 'grade' ? 'bg-warm-50 text-warm-500' :
                  act.type === 'prep' ? 'bg-primary-50 text-primary-600' :
                  act.type === 'quiz' ? 'bg-accent-50 text-accent-600' :
                  act.type === 'notice' ? 'bg-primary-50 text-primary-600' :
                  'bg-accent-50 text-accent-600'
                }`}>
                  {act.type === 'grade' ? <PenTool size={16} /> :
                   act.type === 'prep' ? <BookOpen size={16} /> :
                   act.type === 'quiz' ? <BarChart3 size={16} /> :
                   act.type === 'notice' ? <Bell size={16} /> :
                   <FileText size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary">{act.text}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-primary">{act.class}</span>
                    <span className="text-[11px] text-text-tertiary">{act.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">待办事项</h2>
            <span className="badge badge-warm">5 项</span>
          </div>
          <div className="space-y-3">
            {[
              { text: '批改七年级1班数学作业', deadline: '今天 18:00', priority: 'high' },
              { text: '准备明日期中复习课件', deadline: '今天 20:00', priority: 'high' },
              { text: '查看3班薄弱点分析报告', deadline: '明天 12:00', priority: 'medium' },
              { text: '回复家长关于期中考试提问', deadline: '明天 17:00', priority: 'medium' },
              { text: '提交本学期教研总结', deadline: '本周五', priority: 'low' }
            ].map((todo, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-overlay transition-colors">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  todo.priority === 'high' ? 'bg-rose-500' : todo.priority === 'medium' ? 'bg-warm-400' : 'bg-accent-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">{todo.text}</div>
                  <div className="text-[11px] text-text-tertiary mt-0.5 flex items-center gap-1">
                    <Clock size={11} />{todo.deadline}
                  </div>
                </div>
                <ChevronRight size={14} className="text-text-tertiary flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
