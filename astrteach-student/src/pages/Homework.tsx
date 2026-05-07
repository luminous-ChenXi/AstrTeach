import { useState } from 'react'
import { PenTool, Clock, CheckCircle2, AlertTriangle } from 'lucide-react'

const homeworkList = [
  { id: 1, title: '一元一次方程练习', subject: '数学', deadline: '今天 18:00', status: 'pending', teacher: '张老师' },
  { id: 2, title: '英语阅读理解 Unit5', subject: '英语', deadline: '明天 20:00', status: 'pending', teacher: '王老师' },
  { id: 3, title: '物理实验报告', subject: '物理', deadline: '后天 18:00', status: 'pending', teacher: '李老师' },
  { id: 4, title: '平面直角坐标系作业', subject: '数学', deadline: '2026-05-05', status: 'submitted', teacher: '张老师' },
  { id: 5, title: '英语听力练习', subject: '英语', deadline: '2026-05-04', status: 'graded', teacher: '王老师', score: 88 },
  { id: 6, title: '二元一次方程组', subject: '数学', deadline: '2026-05-03', status: 'graded', teacher: '张老师', score: 92 },
]

const Homework = () => {
  const [tab, setTab] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all')

  const filtered = tab === 'all' ? homeworkList : homeworkList.filter(h => h.status === tab)

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">作业中心</h1>
        <p className="page-subtitle">查看、提交和管理你的作业</p>
      </div>

      <div className="card">
        <div className="flex gap-2 mb-6 border-b border-border pb-4">
          {[
            { key: 'all', label: '全部' },
            { key: 'pending', label: '待完成' },
            { key: 'submitted', label: '已提交' },
            { key: 'graded', label: '已批改' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                tab === t.key ? 'bg-primary-600 text-white' : 'text-text-secondary hover:bg-surface-overlay'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map(hw => (
            <div key={hw.id} className="flex items-center gap-3 p-4 rounded-xl hover:bg-surface-overlay transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                hw.status === 'pending' ? 'bg-warm-50 text-warm-500' :
                hw.status === 'submitted' ? 'bg-primary-50 text-primary-600' :
                'bg-accent-50 text-accent-600'
              }`}>
                {hw.status === 'pending' ? <AlertTriangle size={18} /> :
                 hw.status === 'submitted' ? <Clock size={18} /> :
                 <CheckCircle2 size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-text-primary">{hw.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge badge-primary">{hw.subject}</span>
                  <span className="text-[11px] text-text-tertiary">{hw.teacher}</span>
                  <span className="text-[11px] text-text-tertiary flex items-center gap-1">
                    <Clock size={11} />{hw.deadline}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {hw.status === 'graded' && (
                  <span className="text-[16px] font-bold text-accent-600">{hw.score}分</span>
                )}
                <button className={`text-[12px] py-1.5 px-4 rounded-lg font-medium ${
                  hw.status === 'pending' ? 'btn-primary' : 'btn-secondary'
                }`}>
                  {hw.status === 'pending' ? '去完成' : hw.status === 'submitted' ? '查看' : '查看详情'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homework
