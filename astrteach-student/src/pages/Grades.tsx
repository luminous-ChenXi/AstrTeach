import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'

const gradeData = [
  { subject: '数学', scores: [85, 88, 92, 90, 95], avg: 90, trend: '+5', rank: 3 },
  { subject: '英语', scores: [80, 82, 85, 83, 88], avg: 84, trend: '+3', rank: 8 },
  { subject: '物理', scores: [75, 78, 72, 80, 78], avg: 77, trend: '-2', rank: 15 },
  { subject: '语文', scores: [82, 85, 88, 86, 90], avg: 86, trend: '+4', rank: 6 },
]

const Grades = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">成绩查询</h1>
        <p className="page-subtitle">查看各科成绩与趋势分析</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {gradeData.map((g, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-bold text-text-primary">{g.subject}</span>
              <span className={`text-[12px] font-semibold flex items-center gap-0.5 ${
                g.trend.startsWith('+') ? 'text-accent-600' : 'text-rose-500'
              }`}>
                {g.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {g.trend}
              </span>
            </div>
            <div className="text-[28px] font-bold text-text-primary mb-1">{g.avg}</div>
            <div className="text-[12px] text-text-tertiary">班级排名 第{g.rank}名</div>
            <div className="mt-3 flex items-end gap-1 h-[40px]">
              {g.scores.map((s, j) => (
                <div
                  key={j}
                  className="flex-1 rounded-t bg-primary-400 transition-all duration-300 hover:bg-primary-500"
                  style={{ height: `${(s / 100) * 40}px` }}
                  title={`${s}分`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="section-title mb-4">各科成绩趋势</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-[13px] font-semibold text-text-secondary">科目</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-text-secondary">第1次</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-text-secondary">第2次</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-text-secondary">第3次</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-text-secondary">第4次</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-text-secondary">第5次</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-text-secondary">平均分</th>
                <th className="text-center py-3 px-4 text-[13px] font-semibold text-text-secondary">排名</th>
              </tr>
            </thead>
            <tbody>
              {gradeData.map((g, i) => (
                <tr key={i} className="border-b border-border-light hover:bg-surface-overlay transition-colors">
                  <td className="py-3 px-4 text-[13px] font-medium text-text-primary">{g.subject}</td>
                  {g.scores.map((s, j) => (
                    <td key={j} className="py-3 px-4 text-[13px] text-center text-text-secondary">{s}</td>
                  ))}
                  <td className="py-3 px-4 text-[14px] text-center font-bold text-text-primary">{g.avg}</td>
                  <td className="py-3 px-4 text-[13px] text-center text-text-secondary">第{g.rank}名</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Grades
