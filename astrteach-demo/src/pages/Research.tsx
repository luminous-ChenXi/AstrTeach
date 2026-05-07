import { useState } from 'react'
import { FlaskConical, FileText, BookOpen, Brain, Code, Lightbulb, Play, ChevronRight, Clock, Users, Download } from 'lucide-react'

const researchProjects = [
  { title: '基于 AI 的个性化数学教学策略研究', status: 'active', progress: 65, members: '张老师、李老师', startDate: '2025-12', deadline: '2026-09' },
  { title: '新课标下初中数学核心素养培养路径', status: 'completed', progress: 100, members: '张老师、王老师、赵老师', startDate: '2025-03', deadline: '2026-01' },
  { title: '信息技术与数学课堂深度融合实践', status: 'applying', progress: 20, members: '张老师', startDate: '2026-04', deadline: '2027-04' },
  { title: '项目式学习在初中数学中的应用研究', status: 'active', progress: 35, members: '张老师、陈老师', startDate: '2026-02', deadline: '2027-02' },
]

const Research = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">教科研辅助</h1>
            <p className="page-subtitle">AI 课题申报助手、文献综述生成、教学论文辅助写作</p>
          </div>
          <button className="btn-primary">
            <FlaskConical size={16} />
            新建教研项目
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {[
          { icon: <FlaskConical size={24} />, title: '课题申报助手', desc: '基于教研资源库，AI 辅助生成课题申报书框架，含研究背景/目标/方法/预期成果/参考文献', tag: 'P1', color: 'bg-primary-50 text-primary-600', stats: '已辅助申报 3 项' },
          { icon: <BookOpen size={24} />, title: '文献综述生成', desc: 'AI 自动检索目标文献，生成综述框架，含研究现状/方法/趋势/空白分析', tag: 'P2', color: 'bg-accent-50 text-accent-600', stats: '已生成 5 篇框架' },
          { icon: <FileText size={24} />, title: '论文辅助写作', desc: 'AI 辅助论文结构设计/内容生成/格式规范，支持多种期刊模板排版', tag: 'P2', color: 'bg-warm-50 text-warm-500', stats: '已辅助 2 篇论文' }
        ].map((item, i) => (
          <div key={i} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${item.color.split(' ')[0]} flex items-center justify-center ${item.color.split(' ')[1]}`}>
                {item.icon}
              </div>
              <span className="badge badge-primary">{item.tag}</span>
            </div>
            <h3 className="text-[16px] font-bold text-text-primary mb-2">{item.title}</h3>
            <p className="text-[13px] text-text-secondary mb-3">{item.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-text-tertiary">{item.stats}</span>
              <button className="text-[13px] text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                使用 <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title">教研项目管理</h2>
          <div className="flex gap-2">
            <span className="badge badge-primary">4 个项目</span>
            <span className="badge badge-accent">2 个进行中</span>
          </div>
        </div>
        <div className="space-y-3">
          {researchProjects.map((p, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeProject === i ? 'border-primary-300 bg-primary-50/20 shadow-sm' : 'border-border hover:border-primary-200'
              }`}
              onClick={() => setActiveProject(activeProject === i ? null : i)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  p.status === 'active' ? 'bg-primary-50 text-primary-500' :
                  p.status === 'completed' ? 'bg-accent-50 text-accent-500' :
                  'bg-warm-50 text-warm-500'
                }`}>
                  <FlaskConical size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-medium text-text-primary">{p.title}</span>
                    <span className={`badge ${
                      p.status === 'active' ? 'badge-primary' :
                      p.status === 'completed' ? 'badge-accent' :
                      'badge-warm'
                    }`}>
                      {p.status === 'active' ? '进行中' : p.status === 'completed' ? '已结题' : '申报中'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-text-tertiary">
                    <span className="flex items-center gap-1"><Users size={11} />{p.members}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{p.startDate} → {p.deadline}</span>
                  </div>
                </div>
                <div className="w-[100px]">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{
                      width: `${p.progress}%`,
                      background: p.progress === 100 ? 'var(--color-accent-500)' : 'var(--color-primary-500)'
                    }} />
                  </div>
                  <div className="text-[10px] text-text-tertiary text-center mt-1">{p.progress}%</div>
                </div>
              </div>

              {activeProject === i && (
                <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-border animate-fade-in-up">
                  <button className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-overlay hover:bg-primary-50 transition-colors text-[12px] font-medium">
                    <FileText size={14} className="text-primary-500" />查看课题文档
                  </button>
                  <button className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-overlay hover:bg-primary-50 transition-colors text-[12px] font-medium">
                    <BookOpen size={14} className="text-primary-500" />生成文献综述
                  </button>
                  <button className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-overlay hover:bg-primary-50 transition-colors text-[12px] font-medium">
                    <Download size={14} className="text-primary-500" />导出结题报告
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const AiLearning = () => (
  <div className="animate-fade-in-up">
    <div className="page-header">
      <h1 className="page-title">AI 素养学习</h1>
      <p className="page-subtitle">AI 算法可视化学习、交互式编程环境、AI 项目式实践</p>
    </div>

    <div className="grid grid-cols-3 gap-6 mb-6">
      {[
        { icon: <Lightbulb size={24} />, title: '算法可视化', desc: '拖拽组件、调整参数，直观理解 ML/神经网络/图像识别原理', tag: 'P1', bg: 'bg-primary-50', color: 'text-primary-600', progress: 60 },
        { icon: <Code size={24} />, title: 'Jupyter 编程', desc: '容器化 Jupyter 环境，内置 Python AI 库，三端直接编写运行调试代码', tag: 'P1', bg: 'bg-accent-50', color: 'text-accent-600', progress: 25 },
        { icon: <Play size={24} />, title: 'AI 实战案例', desc: '手写数字识别/垃圾分类等实战案例，含完整教程+代码+数据集', tag: 'P1', bg: 'bg-warm-50', color: 'text-warm-500', progress: 10 }
      ].map((item, i) => (
        <div key={i} className="card hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>{item.icon}</div>
            <span className="badge badge-primary">{item.tag}</span>
          </div>
          <h3 className="text-[16px] font-bold text-text-primary mb-2">{item.title}</h3>
          <p className="text-[13px] text-text-secondary mb-3">{item.desc}</p>
          <div className="progress-bar mb-2">
            <div className="progress-bar-fill" style={{ width: `${item.progress}%`, background: 'var(--color-primary-500)' }} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-text-tertiary">班级完成 {item.progress}%</span>
            <button className="btn-primary text-[12px] py-1.5 px-3">进入学习</button>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="card">
        <h2 className="section-title mb-5">可视化学习模块</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: '机器学习基础', lessons: 8, progress: 60, icon: 'ML' },
            { name: '神经网络入门', lessons: 12, progress: 25, icon: 'NN' },
            { name: '图像识别原理', lessons: 6, progress: 0, icon: 'CV' },
            { name: '自然语言处理', lessons: 10, progress: 0, icon: 'NLP' }
          ].map((m, i) => (
            <div key={i} className="p-4 rounded-xl border border-border hover:border-primary-200 transition-all cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors flex items-center justify-center text-[10px] font-bold text-primary-600">
                  {m.icon}
                </span>
                <div>
                  <span className="text-[13px] font-medium text-text-primary block">{m.name}</span>
                  <span className="text-[10px] text-text-tertiary">{m.lessons} 课时</span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${m.progress}%`, background: 'var(--color-primary-500)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 className="section-title mb-5">AI 实战案例</h2>
        <div className="space-y-3">
          {[
            { name: '手写数字识别', difficulty: '入门', tech: 'CNN / PyTorch', status: 'available', students: 23 },
            { name: '垃圾分类识别', difficulty: '进阶', tech: 'ResNet / TensorFlow', status: 'available', students: 8 },
            { name: '文本情感分析', difficulty: '进阶', tech: 'BERT / Transformers', status: 'soon', students: 0 },
            { name: '智能问答系统', difficulty: '高级', tech: 'RAG / LangChain', status: 'soon', students: 0 }
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:border-primary-200 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center text-accent-600">
                <Brain size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-text-primary">{c.name}</span>
                  <span className={`badge ${c.difficulty === '入门' ? 'badge-accent' : c.difficulty === '进阶' ? 'badge-warm' : 'badge-rose'}`}>
                    {c.difficulty}
                  </span>
                </div>
                <div className="text-[11px] text-text-tertiary mt-0.5">{c.tech}</div>
              </div>
              <div className="text-right">
                {c.status === 'available' ? (
                  <>
                    <div className="text-[11px] text-text-tertiary">{c.students} 名学生已参与</div>
                    <button className="btn-primary text-[11px] py-1 px-3 mt-1">开始</button>
                  </>
                ) : (
                  <span className="badge badge-warm">即将上线</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export { Research, AiLearning }
