import { useState } from 'react'
import { FileText, Sparkles, Upload, Download, Search, Tag, BarChart3, RotateCcw, Edit3 } from 'lucide-react'

const generatedPaper = {
  title: '七年级数学 · 一元一次方程单元测试',
  totalScore: 100,
  time: 60,
  class: '七年级1班',
  sections: [
    { type: '选择题', count: 10, perScore: 3, total: 30, questions: [
      { q: '下列方程中，一元一次方程是（  ）', options: ['A. x²+2x=0', 'B. 3x-5=7', 'C. x/y=3', 'D. 2x²-1=0'], answer: 'B' as string | undefined },
      { q: '方程 2x+3=11 的解是（  ）', options: ['A. x=3', 'B. x=4', 'C. x=5', 'D. x=6'], answer: 'B' },
    ]},
    { type: '填空题', count: 6, perScore: 3, total: 18, questions: [
      { q: '方程 5x-2=13 的解是 x=______', options: undefined as string[] | undefined, answer: undefined },
      { q: '若方程 ax+3=7 的解是 x=2，则 a=______', options: undefined, answer: undefined },
    ]},
    { type: '解答题', count: 5, perScore: 10, total: 50, questions: [
      { q: '解方程：3(x-2)+5=2x+1，并写出解题步骤。（10分）', options: undefined, answer: undefined },
      { q: '列方程解应用题：甲乙两地相距120km，一辆汽车从甲地出发...（10分）', options: undefined, answer: undefined },
    ]},
  ]
}

const recentExams = [
  { name: '期中考试', date: '2026-04-20', avg: 78.5, pass: '84%', top: 96, bottom: 42, count: 132 },
  { name: '第4单元测验', date: '2026-04-08', avg: 82.3, pass: '89%', top: 100, bottom: 55, count: 132 },
  { name: '第3单元测验', date: '2026-03-22', avg: 80.1, pass: '86%', top: 98, bottom: 48, count: 131 },
]

const Exam = () => {
  const [showPaper, setShowPaper] = useState(false)

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">题库与考试</h1>
            <p className="page-subtitle">大数据智能题库与 AI 自适应出题，实现「以学定考」精准测评</p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary"><Upload size={16} />上传题目</button>
            <button className="btn-primary" onClick={() => setShowPaper(true)}>
              <Sparkles size={16} />一键组卷
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <FileText size={20} />, label: '题库总量', value: '2,847', extra: '题', bg: 'bg-primary-50', color: 'text-primary-600' },
          { icon: <Tag size={20} />, label: '今日新增', value: '36', extra: '题', bg: 'bg-accent-50', color: 'text-accent-600' },
          { icon: <BarChart3 size={20} />, label: '已组试卷', value: '128', extra: '份', bg: 'bg-warm-50', color: 'text-warm-500' },
          { icon: <RotateCcw size={20} />, label: '待分析考试', value: '2', extra: '场', bg: 'bg-rose-50', color: 'text-rose-500' }
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <div className="text-[12px] text-text-secondary">{s.label}</div>
              <div className="text-xl font-bold text-text-primary">{s.value}</div>
              <div className="text-[11px] text-text-tertiary">{s.extra}</div>
            </div>
          </div>
        ))}
      </div>

      {showPaper && (
        <div className="card mb-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="section-title">{generatedPaper.title}</h2>
              <p className="section-desc">总分 {generatedPaper.totalScore} 分 · {generatedPaper.time} 分钟 · {generatedPaper.class}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-accent">AI 自适应生成</span>
              <button className="btn-secondary text-[12px] py-1.5"><Edit3 size={14} />调整</button>
              <button className="btn-primary text-[12px] py-1.5"><Download size={14} />导出 Word/PDF</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {generatedPaper.sections.map((sec, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-primary">{sec.type}</span>
                  <span className="text-[11px] text-text-tertiary">{sec.count}题 × {sec.perScore}分 = {sec.total}分</span>
                </div>
                <div className="space-y-2">
                  {sec.questions.slice(0, 2).map((q, j) => (
                    <div key={j} className="p-3 rounded-lg bg-surface-overlay text-[12px] text-text-primary">
                      <div className="mb-1">{j + 1}. {q.q}</div>
                      {q.options && (
                        <div className="grid grid-cols-2 gap-1 mt-1">
                          {q.options.map((opt, k) => (
                            <span key={k} className="text-[11px] text-text-tertiary">{opt}</span>
                          ))}
                        </div>
                      )}
                      <div className="text-[10px] text-accent-600 mt-1">答案：{q.answer || '参见评分标准'}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">题库管理</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input className="input-field pl-8 text-[12px] w-[200px]" placeholder="搜索题目..." />
              </div>
              <select className="select-field text-[12px] py-1.5 w-[120px]">全部题型</select>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { id: 'Q001', content: '解方程：2x + 5 = 13', type: '解答题', difficulty: '简单', kp: '一元一次方程', usage: 12 },
              { id: 'Q002', content: '若 3(x-2) = 6，则 x = ?', type: '选择题', difficulty: '中等', kp: '移项法则', usage: 8 },
              { id: 'Q003', content: '方程 (x+1)/2 = 3 的解是', type: '填空题', difficulty: '中等', kp: '含分母方程', usage: 15 },
              { id: 'Q004', content: '小明有 10 元，买了 3 支笔后剩 1 元，每支笔多少钱？', type: '解答题', difficulty: '较难', kp: '实际应用', usage: 6 },
              { id: 'Q005', content: '下列方程中，一元一次方程是', type: '选择题', difficulty: '简单', kp: '方程概念', usage: 10 },
              { id: 'Q006', content: '解方程 4(x-1)+3=2x+5', type: '解答题', difficulty: '中等', kp: '综合运算', usage: 4 },
            ].map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-overlay transition-colors">
                <span className="text-[11px] font-mono text-text-tertiary w-10">{q.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] text-text-primary truncate">{q.content}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-text-tertiary">{q.kp}</span>
                    <span className="text-[10px] text-text-tertiary">被组卷 {q.usage} 次</span>
                  </div>
                </div>
                <span className={`badge ${q.difficulty === '简单' ? 'badge-accent' : q.difficulty === '中等' ? 'badge-primary' : 'badge-rose'}`}>
                  {q.difficulty}
                </span>
                <span className="badge badge-warm">{q.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="section-title mb-4">近期考试记录</h2>
            <div className="space-y-3">
              {recentExams.map((e, i) => (
                <div key={i} className="p-3 rounded-xl bg-surface-overlay hover:bg-primary-50/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-semibold text-text-primary">{e.name}</span>
                    <span className="text-[10px] text-text-tertiary">{e.date}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                    <div><span className="text-[13px] font-bold text-primary-600 block">{e.avg}</span>均分</div>
                    <div><span className="text-[13px] font-bold text-accent-600 block">{e.pass}</span>及格率</div>
                    <div><span className="text-[13px] font-bold text-accent-600 block">{e.top}</span>最高</div>
                    <div><span className="text-[13px] font-bold text-rose-500 block">{e.bottom}</span>最低</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="section-title mb-4">错题本统计</h2>
            <div className="space-y-2">
              {[
                { q: '含分母方程解法', count: 89, trend: '+12' },
                { q: '移项法则变号', count: 67, trend: '+8' },
                { q: '列方程审题', count: 55, trend: '-3' },
              ].map((err, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-surface-overlay transition-colors">
                  <FileText size={14} className="text-rose-500" />
                  <span className="text-[12px] text-text-primary flex-1">{err.q}</span>
                  <span className="text-[13px] font-bold text-text-primary">{err.count}</span>
                  <span className={`text-[10px] font-medium ${err.trend.startsWith('+') ? 'text-rose-500' : 'text-accent-600'}`}>{err.trend}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exam
