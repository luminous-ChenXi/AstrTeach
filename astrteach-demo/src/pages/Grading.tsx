import { useState } from 'react'
import {
  ListChecks, Clock, TrendingUp, AlertCircle, RotateCcw,
  FileCheck, Camera, Sparkles, Brain, Cpu, Zap, FileText,
  ChevronDown, Lightbulb, Bot, CheckCircle2
} from 'lucide-react'

const mockGradingDetail = {
  student: '李明',
  class: '七年级1班',
  assignment: '一元一次方程练习（三）',
  totalScore: 100,
  score: 85,
  parts: [
    { type: '客观题', questions: [
      { id: 1, q: '方程 2x+5=13 的解是 x=4', answer: '✓', correct: true as boolean | undefined, score: '5/5', reason: undefined as string | undefined, comment: undefined as string | undefined },
      { id: 2, q: '移项时符号不变', answer: '✗', correct: false, score: '0/5', reason: '移项必须变号', comment: undefined },
      { id: 3, q: '若 3(x-2)=6，则 x=4', answer: '✓', correct: true, score: '5/5', reason: undefined, comment: undefined },
    ]},
    { type: '主观题', questions: [
      { id: 4, q: '解方程：3x-7=2(x+1)+3，并写出每一步的依据', answer: '步骤正确但跳步', score: '8/10', comment: '建议写出每步依据，不要跳步', correct: undefined, reason: undefined },
      { id: 5, q: '列方程解应用题：小明买笔记本...', answer: '方程列对但计算有小误', score: '7/10', comment: '方程列式正确，注意计算过程中符号处理', correct: undefined, reason: undefined },
    ]},
  ]
}

const recentReports = [
  { title: '七年级1班 · 方程练习（二）', avg: 82.5, pass: '91%', weak: '含分母方程', date: '2026-05-05' },
  { title: '七年级2班 · 方程练习（二）', avg: 76.3, pass: '84%', weak: '移项法则', date: '2026-05-05' },
  { title: '七年级3班 · 方程练习（二）', avg: 71.8, pass: '78%', weak: '等式性质', date: '2026-05-04' },
]

const gradingPipeline = [
  { step: '图像预处理', desc: 'OCR识别 + 数学公式解析 + 手写体倾斜校正', time: '0.8s/页', icon: <Camera size={14} />, tech: 'PaddleOCR + LaTeX公式还原引擎' },
  { step: '题目-作答对齐', desc: '将OCR提取的作答内容与题库标准答案进行语义对齐', time: '0.3s/题', icon: <ListChecks size={14} />, tech: '文本匹配 + 坐标对齐 + BERT语义匹配' },
  { step: '客观题自动判分', desc: '比对标准答案，准确率99%+，支持选择题/填空题/判断题', time: '≤ 1s/题', icon: <CheckCircle2 size={14} />, tech: '短文本精确匹配 + 等价变体正则表达式' },
  { step: '主观题AI分步批改', desc: '按评分标准分步判分 + 扣分点标注 + 详细解析 + 优化建议', time: '3-5s/题', icon: <Brain size={14} />, tech: 'DeepSeek + 定制化评分Schema + 分步约束Prompt' },
  { step: '质量交叉验证', desc: '多AI评委交叉打分取均值，教师可复核修正 ±2分偏差', time: '1-2s/份', icon: <Cpu size={14} />, tech: '3模型交叉评分 + 异常值检测 + 教师覆盖校准' },
  { step: '报告生成', desc: '班级批改报告 + 学生个人报告 + 错题归因分析', time: '5s/班', icon: <FileText size={14} />, tech: '数据聚合 + 模板渲染 + PDF/HTML导出' },
]

const Grading = () => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [activeTab, setActiveTab] = useState('all')
  const [showPipeline, setShowPipeline] = useState(false)
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title flex items-center gap-3">
              作业批改
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-warm-500 to-rose-500 text-white text-[11px] font-semibold">
                <Brain size={12} />AI 全题型批改
              </span>
            </h1>
            <p className="page-subtitle">多模态AI批改 · OCR识别 · 分步评分 · 2-3小时 → 30分钟内 · 主观题AI分步批改</p>
          </div>
          <div className="flex gap-3">
            {viewMode === 'detail' && (
              <button className="btn-secondary" onClick={() => setViewMode('list')}>
                <RotateCcw size={16} />返回列表
              </button>
            )}
            <button className="btn-secondary" onClick={() => setShowPipeline(!showPipeline)}>
              <Cpu size={16} />{showPipeline ? '收起流水线' : '查看AI批改流水线'}
            </button>
            <button className="btn-secondary"><Camera size={16} />拍照上传</button>
            <button className="btn-primary"><Zap size={16} />批量批改</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Clock size={20} />, label: '待批改', value: '12', extra: '份作业', bg: 'bg-warm-50', color: 'text-warm-500' },
          { icon: <FileCheck size={20} />, label: '已批改', value: '45', extra: 'AI批改', bg: 'bg-accent-50', color: 'text-accent-600' },
          { icon: <TrendingUp size={20} />, label: '班级均分', value: '78.5', extra: '本周', bg: 'bg-primary-50', color: 'text-primary-600' },
          { icon: <AlertCircle size={20} />, label: 'AI置信度', value: '96%', extra: '评分准确率', bg: 'bg-rose-50', color: 'text-rose-500' }
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

      {showPipeline && (
        <div className="card mb-6 animate-fade-in-up border-warm-200 bg-gradient-to-b from-white to-warm-50/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-warm-400 to-rose-400 flex items-center justify-center">
                <Cpu size={14} className="text-white" />
              </div>
              <h2 className="section-title">AI 批改流水线（Pipeline）</h2>
              <span className="badge bg-gradient-to-r from-warm-50 to-rose-50 text-warm-600 border-warm-200">50份作业 ≤ 5min</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-text-tertiary">引擎</span>
              <span className="badge badge-primary">DeepSeek-V4</span>
              <span className="badge badge-accent">PaddleOCR</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-warm-300 via-rose-200 to-accent-200" />
            <div className="space-y-2">
              {gradingPipeline.map((s, i) => (
                <div key={i} className="relative pl-14 pr-4">
                  <div className="absolute left-2.5 top-3 w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center z-10 ring-4 ring-accent-100">
                    <CheckCircle2 size={10} className="text-white" />
                  </div>
                  <div
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      expandedStep === i ? 'bg-accent-50 border border-accent-200 shadow-sm' : 'hover:bg-surface-overlay'
                    }`}
                    onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-accent-600 bg-accent-50 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">{s.icon}</span>
                      <span className="text-[13px] font-semibold text-text-primary w-[120px]">{s.step}</span>
                      <span className="text-[12px] text-text-secondary flex-1 min-w-0 truncate">{s.desc}</span>
                      <span className="text-[11px] text-text-tertiary font-mono">{s.time}</span>
                      <ChevronDown size={14} className={`text-text-tertiary transition-transform flex-shrink-0 ${expandedStep === i ? 'rotate-180' : ''}`} />
                    </div>
                    {expandedStep === i && (
                      <div className="mt-2 ml-11 p-2.5 rounded-lg bg-white/70 border border-border animate-fade-in-up">
                        <div className="flex items-center gap-1 mb-1">
                          <Cpu size={11} className="text-accent-500" />
                          <span className="text-[10px] font-semibold text-accent-600">技术实现</span>
                        </div>
                        <div className="text-[11px] text-text-secondary">{s.tech}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'detail' ? (
        <div className="grid grid-cols-3 gap-6 mb-6 animate-fade-in-up">
          <div className="col-span-2 card">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="avatar w-10 h-10 text-[12px] bg-primary-500">{mockGradingDetail.student[0]}</div>
                <div>
                  <h2 className="text-[16px] font-bold text-text-primary">
                    {mockGradingDetail.student} · {mockGradingDetail.assignment}
                  </h2>
                  <div className="text-[12px] text-text-tertiary flex items-center gap-2">
                    {mockGradingDetail.class}
                    <span className="flex items-center gap-1 text-accent-600">
                      <Brain size={10} />DeepSeek-V4 批改
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[28px] font-bold text-accent-600">{mockGradingDetail.score}<span className="text-[16px] text-text-tertiary">/100</span></div>
                <span className="badge bg-gradient-to-r from-accent-50 to-primary-50 text-accent-600 border-accent-200">AI 批改完成</span>
              </div>
            </div>

            <div className="space-y-4">
              {mockGradingDetail.parts.map((part, pi) => (
                <div key={pi}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`badge ${part.type === '客观题' ? 'badge-primary' : 'badge-warm'}`}>{part.type}</span>
                    <span className="text-[11px] text-text-tertiary">{part.questions.length} 题 · AI自动判分</span>
                    {part.type === '客观题' && <span className="text-[10px] text-accent-600">准确率 99%+</span>}
                    {part.type === '主观题' && <span className="text-[10px] text-warm-500">分步批改</span>}
                  </div>
                  <div className="space-y-3">
                    {part.questions.map((q) => (
                      <div key={q.id} className={`p-4 rounded-xl border ${
                        q.correct === false ? 'border-rose-200 bg-rose-50/30' :
                        q.correct === undefined || q.correct === true ? 'border-border bg-surface-overlay' : ''
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-2">
                            <span className="text-[11px] font-bold text-text-tertiary w-4 mt-0.5">{q.id}.</span>
                            <span className="text-[13px] text-text-primary">{q.q}</span>
                          </div>
                          <span className={`text-[13px] font-bold ${
                            q.score.startsWith('0') ? 'text-rose-500' :
                            parseInt(q.score) >= 8 ? 'text-accent-600' : 'text-warm-500'
                          }`}>{q.score}</span>
                        </div>
                        <div className="flex items-start gap-3 pl-6">
                          <div className="flex-1">
                            <div className="text-[12px] text-text-secondary break-all">作答：{q.answer}</div>
                            {q.correct === false && q.reason && (
                              <div className="flex items-center gap-1 mt-1">
                                <AlertCircle size={11} className="text-rose-500" />
                                <span className="text-[11px] text-rose-600">{q.reason}</span>
                              </div>
                            )}
                          </div>
                          {q.comment && (
                            <div className="p-2 rounded-lg bg-accent-50 border border-accent-100 max-w-[220px]">
                              <div className="flex items-center gap-1 mb-1">
                                <Sparkles size={10} className="text-accent-500" />
                                <span className="text-[10px] font-semibold text-accent-600">AI 评语</span>
                              </div>
                              <div className="text-[11px] text-accent-700">{q.comment}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="section-title mb-5">AI 综合分析</h2>
            <div className="p-4 rounded-xl bg-accent-50 border border-accent-100 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Bot size={13} className="text-accent-600" />
                <span className="text-[12px] font-semibold text-accent-700">AI 评语</span>
              </div>
              <div className="text-[12px] text-accent-700 leading-relaxed">
                李明在本次练习中整体表现良好。客观题掌握扎实，但移项变号仍有失误。主观题解题思路正确，但步骤不够完整。建议重点攻克含分母方程题型。
              </div>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertCircle size={13} className="text-rose-500" />
                <span className="text-[12px] font-semibold text-rose-700">薄弱点</span>
              </div>
              <div className="text-[12px] text-rose-600 space-y-1">
                <div>1. 移项时容易忘记变号（置信度 94%）</div>
                <div>2. 合并同类项时符号混淆（置信度 87%）</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 mb-4">
              <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb size={13} className="text-primary-600" />
                <span className="text-[12px] font-semibold text-primary-700">AI 推荐练习</span>
              </div>
              <div className="text-[12px] text-primary-600 space-y-1">
                <div>1. 移项法则专项练习（10题，难度递进）</div>
                <div>2. 含分母方程强化训练（8题）</div>
                <div>3. 应用题审题3步法微课（15分钟）</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="col-span-2 card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title flex items-center gap-2">
                  待批改作业
                  <span className="badge bg-gradient-to-r from-primary-50 to-accent-50 text-primary-600">AI批改引擎就绪</span>
                </h2>
                <div className="flex gap-2">
                  {['all', 'math', 'chinese'].map(tab => (
                    <span key={tab} onClick={() => setActiveTab(tab)} className={`tab-item ${activeTab === tab ? 'tab-item-active' : ''}`}>
                      {tab === 'all' ? '全部' : tab === 'math' ? '数学' : '语文'}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { class: '七年级1班', title: '一元一次方程练习（三）', submitted: 45, total: 45, deadline: '今天 18:00', ready: true },
                  { class: '七年级2班', title: '一元一次方程练习（三）', submitted: 38, total: 43, deadline: '今天 18:00', ready: false },
                  { class: '七年级3班', title: '一元一次方程练习（三）', submitted: 30, total: 44, deadline: '明天 08:00', ready: false },
                  { class: '七年级1班', title: '期中复习专项训练', submitted: 20, total: 45, deadline: '后天 18:00', ready: false }
                ].map((hw, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary-200 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-warm-50 flex items-center justify-center text-warm-500">
                      <ListChecks size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-text-primary">{hw.title}</div>
                      <div className="text-[11px] text-text-tertiary">{hw.class} · 截止 {hw.deadline} · {hw.ready ? 'AI可批量批改' : '待收集完毕'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-semibold text-text-primary">{hw.submitted}/{hw.total}</div>
                      <div className="text-[11px] text-text-tertiary">已提交</div>
                    </div>
                    <div className="text-right mr-2">
                      <div className="progress-bar w-[80px]">
                        <div className="progress-bar-fill" style={{
                          width: `${(hw.submitted / hw.total) * 100}%`,
                          background: hw.ready ? 'var(--color-accent-500)' : 'var(--color-warm-400)'
                        }} />
                      </div>
                    </div>
                    <button
                      className={hw.ready ? 'btn-primary text-[12px] py-1.5 px-3' : 'btn-secondary text-[12px] py-1.5 px-3'}
                      onClick={() => hw.ready && setViewMode('detail')}
                    >
                      {hw.ready ? 'AI 批改' : '催交'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="section-title mb-5">批改报告 <span className="text-[11px] text-text-tertiary font-normal">AI 生成</span></h2>
              <div className="space-y-4">
                {recentReports.map((r, i) => (
                  <div key={i} className="p-3 rounded-xl bg-surface-overlay hover:bg-accent-50/30 transition-colors cursor-pointer">
                    <div className="text-[13px] font-medium text-text-primary mb-2">{r.title}</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div><div className="text-[16px] font-bold text-primary-600">{r.avg}</div><div className="text-[10px] text-text-tertiary">均分</div></div>
                      <div><div className="text-[16px] font-bold text-accent-600">{r.pass}</div><div className="text-[10px] text-text-tertiary">及格率</div></div>
                      <div><div className="text-[12px] font-semibold text-rose-500 truncate">{r.weak}</div><div className="text-[10px] text-text-tertiary">最薄弱</div></div>
                    </div>
                    <div className="text-[10px] text-text-tertiary mt-2">{r.date} · AI生成</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="section-title">批改规则配置 <span className="text-[11px] text-text-tertiary font-normal">AI 按规则批量批改</span></h2>
              <button className="btn-secondary text-[12px] py-1.5 px-3">新建规则</button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: '数学标准批改', score: 100, rules: 8, used: 23, lastUsed: '今天' },
                { name: '作文评分标准', score: 50, rules: 5, used: 15, lastUsed: '昨天' },
                { name: '期中考试批改规则', score: 150, rules: 12, used: 3, lastUsed: '3天前' }
              ].map((rule, i) => (
                <div key={i} className="p-4 rounded-xl border border-border hover:border-primary-200 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-semibold text-text-primary">{rule.name}</span>
                    <span className="badge badge-primary">{rule.score}分</span>
                  </div>
                  <div className="flex items-center gap-4 text-[12px] text-text-tertiary mb-2">
                    <span>{rule.rules} 条规则</span>
                    <span>已使用 {rule.used} 次</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-text-tertiary">最近：{rule.lastUsed}</span>
                    <button className="text-[11px] text-primary-600 font-medium">编辑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Grading
