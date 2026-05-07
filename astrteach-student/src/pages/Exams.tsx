import { FileText, Clock, ChevronRight } from 'lucide-react'

const exams = [
  { id: 1, title: '数学期中考试', date: '2026-05-15', duration: '90 分钟', status: 'upcoming', totalScore: 100 },
  { id: 2, title: '英语单元测试', date: '2026-05-18', duration: '45 分钟', status: 'upcoming', totalScore: 50 },
  { id: 3, title: '数学单元测试 - 方程', date: '2026-05-01', duration: '45 分钟', status: 'completed', totalScore: 50, score: 42 },
  { id: 4, title: '英语期中模拟', date: '2026-04-28', duration: '60 分钟', status: 'completed', totalScore: 100, score: 85 },
]

const Exams = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">考试测评</h1>
        <p className="page-subtitle">查看即将到来的考试和考试成绩</p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="section-title mb-4">即将考试</h2>
          <div className="space-y-3">
            {exams.filter(e => e.status === 'upcoming').map(exam => (
              <div key={exam.id} className="p-4 rounded-xl bg-primary-50/50 border border-primary-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                    <FileText size={18} />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-text-primary">{exam.title}</div>
                    <div className="text-[12px] text-text-tertiary">满分 {exam.totalScore} 分</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[12px] text-text-secondary flex items-center gap-1">
                    <Clock size={12} />{exam.date} · {exam.duration}
                  </span>
                  <button className="btn-primary text-[12px] py-1.5 px-4">进入考试</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="section-title mb-4">已完成考试</h2>
          <div className="space-y-3">
            {exams.filter(e => e.status === 'completed').map(exam => (
              <div key={exam.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-overlay transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center text-accent-600">
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-medium text-text-primary">{exam.title}</div>
                  <div className="text-[12px] text-text-tertiary">{exam.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-[16px] font-bold text-accent-600">{exam.score}</div>
                  <div className="text-[11px] text-text-tertiary">/ {exam.totalScore}</div>
                </div>
                <ChevronRight size={14} className="text-text-tertiary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exams
