import {
  BookOpen, PenTool, FileText, BarChart3, Brain,
  CheckCircle2, Clock, AlertTriangle, Calendar,
  TrendingUp, ArrowUpRight, Sparkles
} from 'lucide-react'

const upcomingHomework = [
  { title: '一元一次方程练习', subject: '数学', deadline: '今天 18:00', status: 'pending' },
  { title: '英语阅读理解', subject: '英语', deadline: '明天 20:00', status: 'pending' },
  { title: '物理实验报告', subject: '物理', deadline: '后天 18:00', status: 'pending' },
]

const upcomingExams = [
  { title: '数学期中考试', date: '2026-05-15', duration: '90 分钟', status: 'upcoming' },
  { title: '英语单元测试', date: '2026-05-18', duration: '45 分钟', status: 'upcoming' },
]

const recentGrades = [
  { subject: '数学', score: 92, total: 100, trend: '+5' },
  { subject: '英语', score: 85, total: 100, trend: '+3' },
  { subject: '物理', score: 78, total: 100, trend: '-2' },
]

const Dashboard = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">学习台</h1>
            <p className="page-subtitle">你好，李明！今天有 3 项作业待完成</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <Calendar size={16} />
              本周课表
            </button>
            <button className="btn-primary">
              <Sparkles size={16} />
              AI 答疑
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <PenTool size={22} />, label: '待完成作业', value: '3', extra: '份', color: 'text-warm-500', iconBg: 'bg-warm-100' },
          { icon: <FileText size={22} />, label: '即将考试', value: '2', extra: '场', color: 'text-primary-600', iconBg: 'bg-primary-100' },
          { icon: <CheckCircle2 size={22} />, label: '已完成作业', value: '28', extra: '份', color: 'text-accent-600', iconBg: 'bg-accent-100' },
          { icon: <TrendingUp size={22} />, label: '平均分', value: '85', extra: '分', color: 'text-accent-600', iconBg: 'bg-accent-100' },
        ].map((stat, i) => (
          <div key={i} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <div>
              <div className="text-[13px] text-text-secondary">{stat.label}</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className="text-[13px] text-text-tertiary">{stat.extra}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">待完成作业</h2>
            <span className="badge badge-warm">3 项</span>
          </div>
          <div className="space-y-3">
            {upcomingHomework.map((hw, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-overlay transition-colors">
                <div className="w-9 h-9 rounded-lg bg-warm-50 flex items-center justify-center text-warm-500">
                  <PenTool size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary">{hw.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge badge-primary">{hw.subject}</span>
                    <span className="text-[11px] text-text-tertiary flex items-center gap-1">
                      <Clock size={11} />{hw.deadline}
                    </span>
                  </div>
                </div>
                <button className="btn-primary text-[12px] py-1.5 px-4">去完成</button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">即将考试</h2>
          </div>
          <div className="space-y-3">
            {upcomingExams.map((exam, i) => (
              <div key={i} className="p-3 rounded-xl bg-surface-overlay">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                    <FileText size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-text-primary">{exam.title}</div>
                    <div className="text-[11px] text-text-tertiary">{exam.duration}</div>
                  </div>
                </div>
                <div className="text-[12px] text-text-tertiary flex items-center gap-1 pl-12">
                  <Calendar size={11} />{exam.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">最近成绩</h2>
            <button className="text-[13px] text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              详情 <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {recentGrades.map((g, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-text-primary">{g.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-text-primary">{g.score}</span>
                      <span className="text-[12px] text-text-tertiary">/ {g.total}</span>
                      <span className={`text-[12px] font-semibold ${g.trend.startsWith('+') ? 'text-accent-600' : 'text-rose-500'}`}>
                        {g.trend}
                      </span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${g.score}%`,
                        background: g.score >= 90 ? 'var(--color-accent-500)' : g.score >= 80 ? 'var(--color-primary-500)' : g.score >= 60 ? 'var(--color-warm-400)' : 'var(--color-rose-400)'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">知识点掌握</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: '一元一次方程', mastery: 92 },
              { name: '平面直角坐标系', mastery: 78 },
              { name: '二元一次方程组', mastery: 65 },
              { name: '数据收集与整理', mastery: 88 },
            ].map((point, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] text-text-primary">{point.name}</span>
                  <span className="text-[12px] text-text-tertiary">{point.mastery}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${point.mastery}%`,
                      background: point.mastery >= 80 ? 'var(--color-accent-500)' : point.mastery >= 60 ? 'var(--color-warm-400)' : 'var(--color-rose-400)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
