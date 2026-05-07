import { useState } from 'react'
import {
  MonitorPlay, Hand, MessageSquareText, BarChart3, Zap, Users, Radio,
  CheckCircle2, Clock, StopCircle, X, Brain, Cpu,
  FileText, Mic, Bot, ChevronDown, Eye
} from 'lucide-react'

const quizResults = {
  total: 42,
  submitted: 41,
  avgScore: 78,
  timeLeft: '03:25',
  questions: [
    {
      id: 1, q: '解方程 2x+5=13，x 的值是？', correct: '88%',
      options: {
        A: { text: '3', count: 36, correct: false },
        B: { text: '4', count: 36, correct: true },
        C: { text: '5', count: 3, correct: false },
        D: { text: '2', count: 2, correct: false }
      }
    },
    {
      id: 2, q: '将 3x 从等式左边移到右边，变为？', correct: '72%',
      options: {
        A: { text: '3x', count: 4, correct: false },
        B: { text: '-3x', count: 30, correct: true },
        C: { text: 'x', count: 5, correct: false },
        D: { text: '-x', count: 2, correct: false }
      }
    },
    {
      id: 3, q: '解方程 5x-3=2x+6，x = ?', correct: '56%',
      options: {
        A: { text: '1', count: 8, correct: false },
        B: { text: '2', count: 6, correct: false },
        C: { text: '3', count: 23, correct: true },
        D: { text: '4', count: 4, correct: false }
      }
    },
  ]
}

const studentQuestions = [
  { student: '匿名学生A', q: '老师，移项的时候为什么符号要改变？', time: '1 分钟前', answered: false },
  { student: '匿名学生B', q: '方程 2x+5=13 中，5移到右边变成-5对吗？', time: '2 分钟前', answered: true },
  { student: '匿名学生C', q: '合并同类项和移项有什么区别？', time: '3 分钟前', answered: false },
]

const quizParticipants = [
  { name: '李明', status: 'submitted', score: 100, time: '02:15' },
  { name: '王芳', status: 'submitted', score: 95, time: '02:48' },
  { name: '张伟', status: 'submitted', score: 80, time: '03:12' },
  { name: '刘洋', status: 'submitted', score: 65, time: '04:20' },
  { name: '陈静', status: 'answering', score: null, time: null },
  { name: '赵磊', status: 'not_started', score: null, time: null },
]

const blackboardContent = `## 一元一次方程（第3课时）

### 移项法则
- **定义**：把等式一边的某项 **变号后** 移到另一边
- **口诀**：移项要变号，过桥要回头

### 例题演示
解方程：2x + 5 = 13
解：2x = 13 - 5  （+5移项变为-5）
    2x = 8
    x = 4

### 小组探究
验证：把 x=4 代入原方程，左边=2×4+5=13=右边 ✓`

const aiAgentDetails = [
  {
    icon: <MonitorPlay size={18} />, name: '结构化板书生成', status: '运行中',
    desc: '教师口述 → ASR语音识别 → NLP提取关键概念 → 结构化板书Markdown → 智慧黑板投屏',
    tech: 'Whisper + 教案文本对齐 + 层次结构生成', latency: '≤ 5s', accuracy: '95%+'
  },
  {
    icon: <Bot size={18} />, name: 'AI 概念实时答疑', status: '运行中',
    desc: '学生提问 → 意图分类（概念/计算/方法） → 校本RAG检索 → 引导式回答生成',
    tech: 'RAG + 分层回答策略 + 误解答复检测', latency: '≤ 3s', accuracy: '引导式回答率 ≥ 90%'
  },
  {
    icon: <FileText size={18} />, name: '课堂重点自动记录', status: '运行中',
    desc: '全文语音转写 → 知识点对齐教案 → 提取教师强调点 → 结构化课堂笔记生成',
    tech: 'ASR长语音识别 + Prompt摘要 + 教学结构化Schema', latency: '课后 ≤ 5min', accuracy: '重点覆盖 ≥ 85%'
  },
  {
    icon: <Eye size={18} />, name: '注意力监测与提醒', status: '已暂停',
    desc: '移动端操作空窗期检测 → 走神阈值判定 → 教师端静默震动提醒 → 不公开点名',
    tech: '客户端活动心跳监测 + 注意力阈值模型（可配置）', latency: '≤ 10s 触发', accuracy: '误报率 ≤ 5%'
  }
]

const teachingTools = [
  { icon: <Zap size={24} />, title: '随堂测', desc: '单选/多选/判断题即时检测，AI自动统计正确率并定位薄弱点', active: true },
  { icon: <Hand size={24} />, title: '抢答', desc: '课堂抢答，活跃气氛，自动记录参与度和正确率', active: true },
  { icon: <MessageSquareText size={24} />, title: '匿名提问', desc: '学生自由提问，消除顾虑，AI助教优先解答基础概念', active: true },
  { icon: <BarChart3 size={24} />, title: '投票', desc: '快速收集学生意见，结果实时可视化', active: false },
]

const Classroom = () => {
  const [isClassActive, setIsClassActive] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [showBlackboard] = useState(false)
  const [expandedAgent, setExpandedAgent] = useState<number | null>(null)

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title flex items-center gap-3">
              课堂互动
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 text-white text-[11px] font-semibold">
                <Brain size={12} />AI 课堂助教
              </span>
            </h1>
            <p className="page-subtitle">实时互动 · 学情反馈 · AI助教 · 语音板书 · 实现「教-学-评」一体化</p>
          </div>
          <div className="flex items-center gap-3">
            {isClassActive ? (
              <>
                <span className="flex items-center gap-1.5 text-accent-600 text-[13px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                  课堂进行中
                </span>
                <button className="btn-secondary text-rose-500 border-rose-200 hover:bg-rose-50" onClick={() => { setIsClassActive(false); setActiveQuiz(null) }}>
                  <StopCircle size={16} />结束课堂
                </button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => setIsClassActive(true)}>
                <Radio size={16} />开始课堂
              </button>
            )}
          </div>
        </div>
      </div>

      {isClassActive && (
        <div className="p-4 mb-6 rounded-xl border border-accent-200 bg-gradient-to-r from-accent-50/50 to-primary-50/30 flex items-center gap-4 animate-fade-in-up">
          <div className="flex items-center gap-2">
            <MonitorPlay size={18} className="text-accent-600" />
            <span className="text-[14px] font-bold text-accent-700">七年级1班 · 数学 · 一元一次方程</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-text-secondary">
            <Clock size={14} />已进行 18 分钟
          </div>
          <div className="flex items-center gap-2 text-[13px] text-text-secondary">
            <Users size={14} />在线 42/45 人
          </div>
          <div className="flex items-center gap-2 text-[13px] text-text-secondary">
            <Bot size={14} className="text-accent-500" />AI 助教全部在线
          </div>
          <div className="flex-1" />
          <button className="btn-primary text-[12px] py-1.5 px-3" onClick={() => setActiveQuiz(1)}>
            <Zap size={14} />发起随堂测
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Zap size={20} />, label: '随堂测', value: isClassActive ? '1次进行中' : '3 次', bg: 'bg-primary-50', color: 'text-primary-600' },
          { icon: <Hand size={20} />, label: '抢答', value: '5 次', bg: 'bg-accent-50', color: 'text-accent-600' },
          { icon: <MessageSquareText size={20} />, label: '匿名提问', value: '12 条', bg: 'bg-warm-50', color: 'text-warm-500' },
          { icon: <Users size={20} />, label: 'AI 参与率', value: '94%', bg: 'bg-rose-50', color: 'text-rose-500' }
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div>
              <div className="text-[12px] text-text-secondary">{s.label}</div>
              <div className="text-xl font-bold text-text-primary">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {activeQuiz ? (
        <div className="grid grid-cols-3 gap-6 mb-6 animate-fade-in-up">
          <div className="col-span-2 card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="section-title">正在进行：随堂测 #3</h2>
                <p className="section-desc flex items-center gap-2">
                  一元一次方程 · 3道题 · 每题30秒
                  <span className="flex items-center gap-1 text-accent-600">
                    <Brain size={12} />AI 实时分析中
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[20px] font-mono font-bold text-primary-600">{quizResults.timeLeft}</span>
                <button className="btn-secondary text-rose-500 text-[12px] py-1.5" onClick={() => setActiveQuiz(null)}>
                  <X size={14} />结束
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 p-3 rounded-xl bg-surface-overlay">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-accent-500" />
                <span className="text-[13px] font-medium">已提交</span>
                <span className="text-[16px] font-bold text-accent-600">{quizResults.submitted}</span>
                <span className="text-[12px] text-text-tertiary">/ {quizResults.total}</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-primary-500" />
                <span className="text-[13px] font-medium">均分</span>
                <span className="text-[16px] font-bold text-primary-600">{quizResults.avgScore}</span>
              </div>
              <div className="flex-1" />
              <span className="badge badge-accent">AI 正在分析第3题...</span>
            </div>

            <div className="space-y-4">
              {quizResults.questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl border border-border hover:border-primary-200 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-[11px] font-bold flex items-center justify-center">{q.id}</span>
                      <span className="text-[13px] font-semibold text-text-primary">{q.q}</span>
                    </div>
                    <span className={`badge ${parseInt(q.correct) >= 80 ? 'badge-accent' : parseInt(q.correct) >= 60 ? 'badge-warm' : 'badge-rose'}`}>
                      正确率 {q.correct}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(q.options).map(([key, opt]) => (
                      <div key={key} className={`p-3 rounded-lg text-center transition-all ${
                        opt.correct ? 'bg-accent-50 border border-accent-200' : 'bg-surface-overlay border border-transparent'
                      }`}>
                        <div className="text-[11px] text-text-tertiary mb-1">{key}. {opt.text}</div>
                        <div className="text-[20px] font-bold text-primary-600">{opt.count}</div>
                        <div className="text-[10px] text-text-tertiary">人选择</div>
                        {opt.correct && <CheckCircle2 size={12} className="text-accent-500 inline mt-1" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="section-title mb-5">作答状态</h2>
            <div className="space-y-2">
              {quizParticipants.map((p, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-overlay transition-colors">
                  <div className={`avatar w-7 h-7 text-[10px] ${
                    p.status === 'submitted' ? 'bg-accent-500' : p.status === 'answering' ? 'bg-primary-500' : 'bg-text-tertiary'
                  }`}>{p.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-text-primary">{p.name}</div>
                    <div className="text-[10px] text-text-tertiary">
                      {p.status === 'submitted' ? `得分 ${p.score} · ${p.time}` : p.status === 'answering' ? '作答中...' : '未开始'}
                    </div>
                  </div>
                  {p.status === 'submitted' && (
                    <span className={`text-[13px] font-bold ${(p.score ?? 0) >= 90 ? 'text-accent-600' : (p.score ?? 0) >= 70 ? 'text-primary-600' : 'text-rose-500'}`}>
                      {p.score}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">学情热力图</h2>
            <div className="flex items-center gap-2">
              <span className="badge bg-gradient-to-r from-accent-50 to-primary-50 text-accent-600 border-accent-200">
                <Brain size={10} />AI 知识点掌握度分析
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: '一元一次方程概念', rate: 92, level: 'good' },
              { name: '等式性质', rate: 85, level: 'good' },
              { name: '移项法则', rate: 45, level: 'danger' },
              { name: '合并同类项', rate: 78, level: 'warning' },
              { name: '系数化为1', rate: 68, level: 'warning' },
              { name: '含分母方程', rate: 35, level: 'danger' },
              { name: '实际问题列方程', rate: 72, level: 'warning' },
              { name: '方程应用题', rate: 58, level: 'danger' }
            ].map((kp, i) => (
              <div key={i} className={`p-3 rounded-xl border transition-colors hover:shadow-sm ${
                kp.level === 'good' ? 'bg-accent-50 border-accent-200' :
                kp.level === 'warning' ? 'bg-warm-50 border-warm-200' :
                'bg-rose-50 border-rose-200'
              }`}>
                <div className="text-[12px] font-medium text-text-primary mb-1 truncate">{kp.name}</div>
                <div className={`text-lg font-bold ${
                  kp.level === 'good' ? 'text-accent-600' : kp.level === 'warning' ? 'text-warm-500' : 'text-rose-500'
                }`}>{kp.rate}%</div>
                <div className="progress-bar mt-2">
                  <div className="progress-bar-fill" style={{
                    width: `${kp.rate}%`,
                    background: kp.level === 'good' ? 'var(--color-accent-500)' : kp.level === 'warning' ? 'var(--color-warm-400)' : 'var(--color-rose-400)'
                  }} />
                </div>
              </div>
            ))}
          </div>

          {isClassActive && (
            <div className="mt-5 p-4 rounded-xl bg-primary-50 border border-primary-100">
              <div className="flex items-center gap-2 mb-2">
                <Brain size={14} className="text-primary-600" />
                <span className="text-[13px] font-semibold text-primary-700">AI 动态分析建议</span>
              </div>
              <div className="text-[12px] text-primary-600 leading-relaxed">
                检测到「含分母方程」正确率仅 35%，建议当场补充一道巩固拓展题。
                已自动生成：解方程 (x+1)/3 + (2x-1)/2 = 4，请各小组讨论后上台板书。
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="section-title">AI 课堂助教</h2>
              <span className="badge badge-accent animate-pulse">3/4 运行中</span>
            </div>
            <div className="space-y-2">
              {aiAgentDetails.map((agent, i) => (
                <div key={i}>
                  <div
                    className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                      expandedAgent === i
                        ? `${agent.status === '已暂停' ? 'bg-surface-overlay' : 'bg-accent-50'} border border-accent-200 shadow-sm`
                        : 'hover:bg-surface-overlay'
                    }`}
                    onClick={() => setExpandedAgent(expandedAgent === i ? null : i)}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${agent.status === '已暂停' ? 'bg-surface-overlay text-text-tertiary' : 'bg-accent-100 text-accent-600'}`}>
                        {agent.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold text-text-primary">{agent.name}</div>
                        <div className="text-[10px] text-text-tertiary">{agent.status} · {agent.latency}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${agent.status === '运行中' ? 'bg-accent-500 animate-pulse' : 'bg-text-tertiary'}`} />
                      <ChevronDown size={12} className={`text-text-tertiary transition-transform ${expandedAgent === i ? 'rotate-180' : ''}`} />
                    </div>

                    {expandedAgent === i && (
                      <div className="mt-2 ml-10 p-2.5 rounded-lg bg-white/80 border border-border animate-fade-in-up">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <Cpu size={10} className="text-accent-500" />
                          <span className="text-[10px] font-semibold text-accent-600">技术栈</span>
                          <span className="text-[10px] text-text-tertiary ml-auto">准确率 {agent.accuracy}</span>
                        </div>
                        <div className="text-[10px] text-text-tertiary mb-1.5">{agent.tech}</div>
                        <div className="text-[11px] text-text-secondary">{agent.desc}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isClassActive && (
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-semibold text-text-primary">匿名提问（{studentQuestions.length}）</h3>
                <span className="text-[10px] text-text-tertiary flex items-center gap-1">
                  <Bot size={10} className="text-accent-500" />AI 优先解答
                </span>
              </div>
              <div className="space-y-2">
                {studentQuestions.map((sq, i) => (
                  <div key={i} className={`p-2.5 rounded-lg text-[12px] ${sq.answered ? 'bg-surface-overlay text-text-tertiary' : 'bg-primary-50 text-primary-700 border border-primary-100'}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-text-tertiary">{sq.student} · {sq.time}</span>
                      {sq.answered ? (
                        <span className="text-[10px] text-accent-600 flex items-center gap-1">
                          <CheckCircle2 size={8} />AI 已回复
                        </span>
                      ) : (
                        <button className="text-[10px] text-primary-600 font-semibold">教师回复</button>
                      )}
                    </div>
                    <div>{sq.q}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showBlackboard && (
            <div className="card animate-fade-in-up border-accent-300 bg-gradient-to-b from-white to-accent-50/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mic size={14} className="text-accent-500" />
                  <span className="text-[13px] font-semibold text-text-primary">AI 结构化板书</span>
                </div>
                <span className="badge badge-accent">实时生成</span>
              </div>
              <pre className="text-[11px] text-text-secondary leading-snug whitespace-pre-wrap font-body bg-white/80 p-3 rounded-lg border border-border max-h-[300px] overflow-y-auto">
{blackboardContent}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title">互动工具</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {teachingTools.map((tool, i) => (
            <button
              key={i}
              onClick={() => setSelectedTool(selectedTool === tool.title ? null : tool.title)}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all group ${
                selectedTool === tool.title
                  ? 'border-primary-400 bg-primary-50 shadow-md'
                  : tool.active
                    ? 'border-border hover:border-primary-200 hover:bg-primary-50/50'
                    : 'border-border opacity-50 cursor-not-allowed'
              }`}
              disabled={!tool.active}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                selectedTool === tool.title
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-surface-overlay text-text-secondary group-hover:bg-primary-100 group-hover:text-primary-600'
              }`}>{tool.icon}</div>
              <div className="text-[14px] font-semibold text-text-primary">{tool.title}</div>
              <div className="text-[12px] text-text-tertiary text-center">{tool.desc}</div>
              {!tool.active && <span className="badge badge-warm">开发中</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Classroom
