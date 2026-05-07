import { useState } from 'react'
import {
  Sparkles, FileDown, BookOpen, Layers, Globe, ArrowRight, Clock,
  Eye, Download, Edit3, Copy, ChevronDown, Brain, Cpu, List,
  Zap, FileText, RefreshCw, Database, Bot, MessageSquare,
  SlidersHorizontal, Wand2, Lightbulb, CheckCircle2, Target
} from 'lucide-react'

const generatedLessonPlan = `# 一元一次方程（第3课时）教案

## 一、教学目标
1. **知识与技能**：掌握移项法则，能正确运用移项解一元一次方程
2. **过程与方法**：通过小组合作探究，经历移项法则的发现过程
3. **情感态度**：培养学生严谨的数学思维习惯

## 二、教学重难点
- **重点**：移项法则的理解与应用
- **难点**：移项时符号变化的正确处理

## 三、教学过程
### 环节一：复习导入（5分钟）
回顾等式性质：等式两边同时加减同一个数，等式仍成立。

### 环节二：探究新知（20分钟）
**问题**：解方程 2x + 5 = 13
- 学生自主尝试 → 小组交流 → 归纳总结
- 引出"移项"概念：把等式一边的某项变号后移到另一边

### 环节三：巩固练习（15分钟）
例题+变式训练，层次递进

### 环节四：课堂小结（5分钟）
师生共同总结移项法则口诀：「移项要变号，过桥要回头」`

const pptPreviews = [
  { slide: 1, title: '一元一次方程（第3课时）', type: '标题页', bg: 'from-primary-500 to-primary-700' },
  { slide: 2, title: '复习回顾：等式性质', type: '内容页', bg: 'from-accent-500 to-accent-600' },
  { slide: 3, title: '探究：如何解 2x+5=13？', type: '互动页', bg: 'from-warm-400 to-warm-500' },
  { slide: 4, title: '移项法则总结', type: '内容页', bg: 'from-primary-400 to-primary-600' },
  { slide: 5, title: '课堂练习', type: '练习页', bg: 'from-rose-400 to-rose-500' },
  { slide: 6, title: '本课小结与作业', type: '总结页', bg: 'from-accent-500 to-accent-700' },
]

const tieredHomework = [
  { tier: 'A 层（尖子班）', questions: [
    { q: '解方程：3(x-2)+5=2x+1', difficulty: '中等' },
    { q: '若方程 2x+a=5 的解是 x=2，求 a 的值', difficulty: '中等' },
    { q: '列方程解应用题：甲乙两地相距 120km...', difficulty: '较难' },
    { q: '已知关于 x 的方程 4x-3m=2x+m+1 的解是正整数...', difficulty: '拔高' },
    { q: '探究：移项法则与等式性质的关系', difficulty: '拓展' },
  ]},
  { tier: 'B 层（平行班）', questions: [
    { q: '解方程：x+5=12', difficulty: '基础' },
    { q: '解方程：2x-3=7', difficulty: '基础' },
    { q: '解方程：5x-2=3x+4', difficulty: '中等' },
    { q: '方程 3x-1=2x+4 的解是多少？', difficulty: '中等' },
    { q: '小明买了 3 本笔记本，付出 20 元找回 2 元...', difficulty: '较难' },
  ]},
  { tier: 'C 层（基础班）', questions: [
    { q: '解方程：x+3=8', difficulty: '基础' },
    { q: '解方程：x-2=5', difficulty: '基础' },
    { q: '解方程：4x=20', difficulty: '基础' },
    { q: '解方程：2x-1=3', difficulty: '基础' },
    { q: '解方程：3+x=9', difficulty: '基础' },
  ]},
]



const aiPipeline = [
  { step: '需求解析', icon: <Brain size={16} />, desc: 'NLP 理解教师输入的学科/章节/班型/课时目标', time: '0.3s', color: 'text-primary-500', bg: 'bg-primary-50', detail: '使用 DeepSeek NLU 模块将自然语言目标结构化，提取知识点链、难度标签、班型特征' },
  { step: 'RAG 知识检索', icon: <Database size={16} />, desc: '从校本资源库 & 教材知识库检索相关教案模板与教学素材', time: '0.8s', color: 'text-accent-600', bg: 'bg-accent-50', detail: '向量检索 Top-10 相关教案 → 重排序 → 提取章节知识图谱 → 关联课程标准要求' },
  { step: 'Prompt 组装', icon: <FileText size={16} />, desc: '动态拼接 System Prompt + 检索上下文 + 格式化指令 + 输出模板', time: '0.2s', color: 'text-warm-500', bg: 'bg-warm-50', detail: '注入 8 个约束规则（禁止直接给答案/引导式设计/分层难度控制...）+ 教案输出 Schema 校验' },
  { step: '大模型推理', icon: <Cpu size={16} />, desc: '流式调用国产大模型（DeepSeek/豆包），输出教学方案', time: '18s', color: 'text-rose-500', bg: 'bg-rose-50', detail: 'DeepSeek-V4-Pro（默认）→ 自动切换豆包备用 → SSE 流式输出 → 逐 Token 展示生成过程' },
  { step: '内容安全审查', icon: <SlidersHorizontal size={16} />, desc: '过滤敏感/政治/偏见内容，确保输出符合教育规范', time: '0.5s', color: 'text-warm-500', bg: 'bg-warm-50', detail: '关键词过滤 + 语义审核双管线 → 敏感内容自动替换 → 合规标记打标' },
  { step: '结构化输出', icon: <List size={16} />, desc: 'Markdown → 结构化 JSON，生成教案/PPT/作业三件套', time: '0.3s', color: 'text-accent-600', bg: 'bg-accent-50', detail: '教案 Markdown → JSON → 模板渲染 + PPT Slide 编排 + 分层难度系数校准' },
]

const promptSample = `## System Prompt（教案生成）
你是资深数学教研员，教龄20年。请基于以下约束生成教案：

【硬约束】R-008: 必须包含课堂问答设计（≥3个提问）
【硬约束】R-002: 实验类/探究类活动 ≥1 个
【硬约束】R-010: 基于班级学情数据个性化分层（尖子/平行/基础）
【软约束】每5分钟一个互动节点

## Context（RAG 检索结果）
- 教材版本：人教版 2024版，P42-P45
- 班级学情：七年级1班"移项法则"掌握率 55%（薄弱）
- 教参建议：用天平模型类比引入（来源：区教研论文 #1287）

## 输出格式
严格按 Markdown 模板：教学目标→重难点→教学过程→板书→作业`

const modelComparison = [
  { name: 'DeepSeek-V4-Pro', status: '当前', latency: '18s', quality: 9.2, cost: '¥0.08/次' },
  { name: '豆包 lite-32k', status: '备用', latency: '12s', quality: 8.5, cost: '¥0.05/次' },
  { name: '智谱 GLM-4-Flash', status: '候选', latency: '22s', quality: 8.8, cost: '¥0.06/次' },
]

const AiPrep = () => {
  const [activeTab, setActiveTab] = useState<'plan' | 'ppt' | 'homework'>('plan')
  const [showGenerated, setShowGenerated] = useState(false)
  const [showPipeline, setShowPipeline] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setShowPipeline(true)
    setTimeout(() => {
      setGenerating(false)
      setShowGenerated(true)
    }, 3000)
  }

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title flex items-center gap-3">
              AI 备课
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-[11px] font-semibold animate-pulse">
                <Wand2 size={12} />Powered by AI
              </span>
            </h1>
            <p className="page-subtitle">多模态 AI 全流程备课助手 · 基于国产大模型 + RAG 知识增强 + Prompt 工程</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary" onClick={() => setShowPrompt(!showPrompt)}>
              <MessageSquare size={16} />
              {showPrompt ? '收起 Prompt' : '查看 Prompt'}
            </button>
            <button className="btn-secondary">
              <Globe size={16} />
              双语教案
            </button>
          </div>
        </div>
      </div>

      {showPrompt && (
        <div className="card mb-6 animate-fade-in-up border-accent-300 bg-gradient-to-r from-accent-50/30 to-primary-50/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent-100 flex items-center justify-center">
                <Wand2 size={14} className="text-accent-600" />
              </div>
              <h2 className="section-title">Prompt 工程模板（可编辑）</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-accent">Settings注入</span>
              <span className="badge badge-primary">Context注入</span>
              <span className="badge badge-warm">Format约束</span>
              <button className="btn-secondary text-[11px] py-1 px-2"><Copy size={12} />复制</button>
            </div>
          </div>
          <pre className="text-[12px] text-text-secondary leading-relaxed whitespace-pre-wrap font-mono bg-white/60 p-4 rounded-xl max-h-[300px] overflow-y-auto border border-border">
{promptSample}
          </pre>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-text-tertiary">
            <span className="flex items-center gap-1"><Database size={11} />Retrieval-Augmented Generation（RAG）</span>
            <span className="flex items-center gap-1"><Bot size={11} />DeepSeek-V4-Pro（可切换）</span>
            <span className="flex items-center gap-1"><SlidersHorizontal size={11} />内容安全过滤已启用</span>
          </div>
        </div>
      )}

      <div className="card mb-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Wand2 size={14} className="text-white" />
          </div>
          <h2 className="section-title">智能备课生成</h2>
          <span className="badge bg-gradient-to-r from-primary-50 to-accent-50 text-primary-600 text-[10px]">国产大模型驱动</span>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-5">
          <div>
            <label className="text-[12px] font-semibold text-text-secondary mb-1.5 block">学科</label>
            <select className="select-field w-full text-[13px]">
              <option>数学</option><option>语文</option><option>英语</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-text-secondary mb-1.5 block">年级 / 章节</label>
            <select className="select-field w-full text-[13px]">
              <option>七年级 · 第3章 一元一次方程</option>
              <option>七年级 · 第4章 几何初步</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-text-secondary mb-1.5 block">目标班型</label>
            <select className="select-field w-full text-[13px]">
              <option>平行班（B层）</option>
              <option>尖子班（A层）</option>
              <option>基础班（C层）</option>
            </select>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-text-secondary mb-1.5 block">课时时长</label>
            <select className="select-field w-full text-[13px]">
              <option>45 分钟</option><option>40 分钟</option>
            </select>
          </div>
        </div>
        <div className="mb-5">
          <label className="text-[12px] font-semibold text-text-secondary mb-1.5 block">
            教学目标 / 特殊要求
            <span className="text-text-tertiary font-normal ml-2">（支持自然语言描述，AI 自动解析为结构化目标）</span>
          </label>
          <textarea
            className="input-field h-20 resize-none text-[13px]"
            placeholder="例：掌握移项法则并熟练应用于一元一次方程求解，设计至少1个小组合作探究活动，准备3个层次递进的例题..."
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary" onClick={handleGenerate} disabled={generating}>
            {generating ? (
              <><RefreshCw size={16} className="animate-spin" />AI 生成中...</>
            ) : (
              <><Wand2 size={16} />生成教案 + PPT + 分层作业</>
            )}
          </button>
          <button className="btn-secondary">
            <FileDown size={16} />
            导入校本课件 · AI 优化
          </button>
          <button className="btn-secondary">
            <Globe size={16} />
            双语教案
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[11px] text-text-tertiary">默认模型</span>
            <span className="badge badge-accent">DeepSeek-V4</span>
            <ChevronDown size={12} className="text-text-tertiary" />
          </div>
        </div>
      </div>

      {showPipeline && (
        <div className="card mb-6 animate-fade-in-up border-accent-200 bg-gradient-to-b from-white to-accent-50/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <Cpu size={14} className="text-white" />
              </div>
              <h2 className="section-title">
                {generating ? 'AI 正在生成...' : 'AI 生成流水线（Pipeline）'}
              </h2>
              {generating ? (
                <span className="text-[12px] text-accent-600 animate-pulse">已完成 2/6 步骤...</span>
              ) : (
                <span className="badge badge-accent">总耗时 20.1s</span>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent-300 via-accent-200 to-primary-200" />

            <div className="space-y-2">
              {aiPipeline.map((p, i) => (
                <div
                  key={i}
                  className={`relative pl-14 pr-4 ${(generating && i <= 2) || !generating ? 'opacity-100' : generating ? 'opacity-30' : 'opacity-100'}`}
                >
                  <div className={`absolute left-2.5 top-3 w-5 h-5 rounded-full flex items-center justify-center z-10 ${
                    (generating && i <= 2) || !generating ? 'bg-accent-500 ring-4 ring-accent-100' : 'bg-text-tertiary'
                  }`}>
                    {((generating && i <= 2) || !generating) && <CheckCircle2 size={11} className="text-white" />}
                  </div>

                  <div
                    className={`p-3 rounded-xl cursor-pointer transition-all ${
                      expandedStep === i
                        ? `${p.bg} border border-current/20 shadow-sm`
                        : 'hover:bg-surface-overlay'
                    }`}
                    onClick={() => setExpandedStep(expandedStep === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${p.color} ${p.bg} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        {p.icon}
                      </span>
                      <span className="text-[13px] font-semibold text-text-primary w-[110px]">{p.step}</span>
                      <span className="text-[12px] text-text-secondary flex-1 min-w-0 truncate">{p.desc}</span>
                      <span className="text-[11px] text-text-tertiary font-mono">{p.time}</span>
                      <ChevronDown
                        size={14}
                        className={`text-text-tertiary transition-transform flex-shrink-0 ${expandedStep === i ? 'rotate-180' : ''}`}
                      />
                    </div>

                    {expandedStep === i && (
                      <div className={`mt-2 ml-11 p-3 rounded-lg bg-white/60 border border-border animate-fade-in-up`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <Lightbulb size={11} className={p.color} />
                          <span className={`text-[11px] font-semibold ${p.color}`}>技术实现</span>
                        </div>
                        <div className="text-[12px] text-text-secondary">{p.detail}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-4">
            {modelComparison.map((m, i) => (
              <div key={i} className="p-3 rounded-xl bg-surface-overlay hover:bg-accent-50/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[13px] font-semibold text-text-primary">{m.name}</span>
                  <span className={`badge ${m.status === '当前' ? 'badge-accent' : m.status === '备用' ? 'badge-primary' : 'badge-warm'}`}>{m.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                  <div><div className="text-[15px] font-bold text-primary-600">{m.latency}</div><div className="text-[10px] text-text-tertiary">延迟</div></div>
                  <div><div className="text-[15px] font-bold text-accent-600">{m.quality}</div><div className="text-[10px] text-text-tertiary">质量分</div></div>
                  <div><div className="text-[15px] font-bold text-warm-500">{m.cost}</div><div className="text-[10px] text-text-tertiary">成本</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showGenerated && (
        <div className="mb-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1">
              <span onClick={() => setActiveTab('plan')} className={`tab-item ${activeTab === 'plan' ? 'tab-item-active' : ''}`}>📝 教案</span>
              <span onClick={() => setActiveTab('ppt')} className={`tab-item ${activeTab === 'ppt' ? 'tab-item-active' : ''}`}>🎨 PPT 课件</span>
              <span onClick={() => setActiveTab('homework')} className={`tab-item ${activeTab === 'homework' ? 'tab-item-active' : ''}`}>📋 分层作业</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-text-tertiary">由</span>
              <span className="badge bg-gradient-to-r from-primary-50 to-accent-50 text-primary-600">DeepSeek-V4-Pro</span>
              <span className="text-[11px] text-text-tertiary">生成 · 20.1s</span>
              <div className="w-px h-5 bg-border mx-1" />
              <button className="btn-secondary text-[12px] py-1.5"><Edit3 size={14} />编辑</button>
              <button className="btn-secondary text-[12px] py-1.5"><Download size={14} />导出</button>
              <button className="btn-secondary text-[12px] py-1.5"><Copy size={14} />复制</button>
            </div>
          </div>

          {activeTab === 'plan' && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-text-primary">一元一次方程（第3课时）</div>
                    <div className="text-[12px] text-text-tertiary flex items-center gap-2">
                      七年级数学 · 45分钟 · AI生成于 20秒前
                      <span className="flex items-center gap-1 text-accent-600">
                        <Sparkles size={10} />基于RAG增强
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge bg-gradient-to-r from-primary-50 to-accent-50 text-accent-600 border-accent-200">AI 生成</span>
                  <span className="badge badge-accent">置信度 92%</span>
                </div>
              </div>
              <pre className="text-[13px] text-text-secondary leading-relaxed whitespace-pre-wrap font-body bg-surface-overlay p-5 rounded-xl max-h-[500px] overflow-y-auto border border-border">
{generatedLessonPlan}
              </pre>
            </div>
          )}

          {activeTab === 'ppt' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center text-accent-600">
                    <Layers size={20} />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-text-primary">PPT 课件 · 一元一次方程（第3课时）</div>
                    <div className="text-[12px] text-text-tertiary">共 12 页 · AI 自动编排幻灯片结构 · 支持下载 .pptx</div>
                  </div>
                </div>
                <button className="btn-primary">
                  <Download size={16} />下载 .pptx
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {pptPreviews.map((slide) => (
                  <div key={slide.slide} className="card p-0 overflow-hidden hover:shadow-lg transition-all cursor-pointer group hover:-translate-y-0.5">
                    <div className={`h-32 bg-gradient-to-br ${slide.bg} flex items-center justify-center p-4 relative`}>
                      <span className="text-[10px] text-white/60 absolute top-2 left-3 font-mono">Slide {slide.slide}</span>
                      <span className="text-white font-bold text-center text-[13px] leading-snug">{slide.title}</span>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <span className="badge badge-primary">{slide.type}</span>
                      <Eye size={14} className="text-text-tertiary group-hover:text-primary-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'homework' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warm-50 flex items-center justify-center text-warm-500">
                    <Target size={20} />
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-text-primary">
                      分层作业 · 一元一次方程（第3课时）
                      <span className="text-[11px] font-normal text-text-tertiary ml-2">
                        AI 根据班型学情自动调节难度系数
                      </span>
                    </div>
                    <div className="text-[12px] text-text-tertiary flex items-center gap-2">
                      3 个层级 · 15 道题目 · 难度系数自动校准
                      <span className="flex items-center gap-1 text-accent-600">
                        <Brain size={10} />自适应出题引擎
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-primary">平行班80%→中等难度</span>
                  <span className="badge badge-warm">尖子班60%→拔高难度</span>
                  <span className="badge badge-accent">基础班80%→基础难度</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {tieredHomework.map((tier) => (
                  <div key={tier.tier} className="card">
                    <h3 className="text-[14px] font-bold text-text-primary mb-3">{tier.tier}</h3>
                    <div className="space-y-2.5">
                      {tier.questions.map((item, j) => (
                        <div key={j} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-overlay hover:bg-white transition-colors">
                          <span className="text-[11px] font-bold text-text-tertiary mt-0.5 flex-shrink-0">{j + 1}.</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] text-text-primary">{item.q}</div>
                          </div>
                          <span className={`badge flex-shrink-0 text-[10px] ${
                            item.difficulty === '基础' ? 'badge-accent' :
                            item.difficulty === '拔高' || item.difficulty === '拓展' ? 'badge-rose' : 'badge-primary'
                          }`}>{item.difficulty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-6">
        {[
          {
            icon: <BookOpen size={24} />, title: '教案生成', desc: '完整教案含教学目标/重难点/教学过程/板书设计/作业布置',
            tag: 'P0 核心', tagType: 'primary', time: '约 30s',
            aiDetail: 'NLP需求解析 → RAG检索教材&教参 → 注入班级学情 → 大模型生成 → 格式标准化'
          },
          {
            icon: <Layers size={24} />, title: 'PPT 课件生成', desc: '一键生成结构化 PPT，含标题页/内容页/互动页/总结页',
            tag: 'P0 核心', tagType: 'primary', time: '约 45s',
            aiDetail: '教案→Slide结构化分解 → 每页Prompt独立生成 → 排版自动化 → 支持.pptx导出'
          },
          {
            icon: <Target size={24} />, title: '分层作业生成', desc: '适配尖子班/平行班/基础班三种难度，每份 ≥ 5 题',
            tag: 'P0 核心', tagType: 'primary', time: '约 20s',
            aiDetail: '班型难度矩阵 → 知识点薄弱项加权 → 自适应出题引擎 → 同知识点多难度变体'
          }
        ].map((item, i) => (
          <div key={i} className="card hover:shadow-lg transition-shadow group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center text-primary-600 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <span className={`badge badge-${item.tagType}`}>{item.tag}</span>
            </div>
            <h3 className="text-[15px] font-bold text-text-primary mb-1">{item.title}</h3>
            <p className="text-[13px] text-text-secondary mb-3">{item.desc}</p>
            <div className="p-2.5 rounded-lg bg-accent-50/50 border border-accent-100 mb-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap size={10} className="text-accent-500" />
                <span className="text-[10px] font-semibold text-accent-600">AI 处理链路</span>
              </div>
              <div className="text-[11px] text-text-tertiary leading-relaxed">{item.aiDetail}</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-tertiary flex items-center gap-1">
                <Clock size={12} />{item.time}
              </span>
              <button className="text-[13px] text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                使用 <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">最近教案</h2>
            <button className="text-[13px] text-primary-600 font-medium">查看全部</button>
          </div>
          <div className="space-y-3">
            {[
              { title: '一元一次方程（第3课时）', subject: '七年级数学', time: '2 小时前', status: '已发布', ai: 'RAG增强' },
              { title: '一元一次方程（第2课时）', subject: '七年级数学', time: '昨天', status: '已发布', ai: '豆包生成' },
              { title: '有理数混合运算', subject: '七年级数学', time: '3天前', status: '草稿', ai: 'DeepSeek' },
              { title: '绝对值的概念与性质', subject: '七年级数学', time: '5天前', status: '已发布', ai: '手动' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-overlay transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-500">
                  <BookOpen size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary truncate">{item.title}</div>
                  <div className="text-[11px] text-text-tertiary flex items-center gap-2">
                    {item.subject} · {item.time}
                    {item.ai !== '手动' && (
                      <span className="flex items-center gap-1 text-accent-600">
                        <Sparkles size={9} />{item.ai}
                      </span>
                    )}
                  </div>
                </div>
                <span className={`badge ${item.status === '已发布' ? 'badge-accent' : 'badge-warm'}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">AI 能力中心</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: '国产大模型', value: 'DeepSeek-V4-Pro（当前）', icon: <Cpu size={16} />, color: 'text-primary-500', bg: 'bg-primary-50' },
              { label: 'RAG 知识库', value: '校本资源 1,247 篇已索引', icon: <Database size={16} />, color: 'text-accent-600', bg: 'bg-accent-50' },
              { label: '内容安全', value: '关键词过滤 + 语义审核双管线', icon: <SlidersHorizontal size={16} />, color: 'text-warm-500', bg: 'bg-warm-50' },
              { label: '多模型切换', value: 'DeepSeek / 豆包 / 智谱自动切换', icon: <RefreshCw size={16} />, color: 'text-accent-600', bg: 'bg-accent-50' },
              { label: '流式输出', value: 'SSE 逐 Token 推送，首 Token ≤ 1s', icon: <Zap size={16} />, color: 'text-rose-500', bg: 'bg-rose-50' },
              { label: 'Prompt 模板库', value: '12 套教案生成 + 6 套出题模板', icon: <FileText size={16} />, color: 'text-primary-500', bg: 'bg-primary-50' }
            ].map((cap, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-overlay hover:bg-white transition-colors border border-transparent hover:border-border">
                <div className={`w-9 h-9 rounded-lg ${cap.bg} flex items-center justify-center ${cap.color}`}>
                  {cap.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary">{cap.label}</div>
                  <div className="text-[12px] text-text-tertiary">{cap.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiPrep
