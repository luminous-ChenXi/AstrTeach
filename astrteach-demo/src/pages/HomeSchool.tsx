import { useState } from 'react'
import { MessageSquare, Send, Bell, FileText, Shield, Eye, Clock, Sparkles, CheckCircle2 } from 'lucide-react'

const messages = [
  { parent: '李明家长', student: '李明', msg: '张老师您好，李明最近数学成绩有所下降，想了解一下他在校的学习情况...', time: '10 分钟前', unread: true, aiReply: '您好！李明近期课堂表现积极，举手回答较上学期增多。数学成绩在方程章节稍有波动（从92→85），主要薄弱点是列方程解应用题，建议可以让孩子在家每天做 1-2 道应用题巩固。' },
  { parent: '王芳家长', student: '王芳', msg: '老师好，请问期中考试范围是什么？需要重点复习哪些？', time: '1 小时前', unread: true, aiReply: '期中考试范围为第一章至第三章（一元一次方程为主），重点复习：移项法则、含分母方程解法、实际应用题列方程。建议参考第3次和第4次练习卷的错题。' },
  { parent: '张伟家长', student: '张伟', msg: '感谢老师的耐心指导，张伟回家说现在能听懂了，谢谢！', time: '3 小时前', unread: false, aiReply: null },
  { parent: '刘洋家长', student: '刘洋', msg: '老师，刘洋说最近作业有点多，每天做到很晚，能否适当调整？', time: '昨天', unread: false, aiReply: '理解您的担忧。我会关注刘洋的作业完成时长。目前课堂练习已完成大部分（约60%），回家只需巩固。建议先让孩子在自习课完成部分，减轻回家负担。' },
]

const weeklyReports = [
  { class: '七年级1班', week: '第12周', date: '2026-05-05', readRate: '95%', status: 'sent' },
  { class: '七年级2班', week: '第12周', date: '2026-05-05', readRate: '88%', status: 'sent' },
  { class: '七年级3班', week: '第12周', date: '2026-05-05', readRate: '72%', status: 'sent' },
]

const announcementHistory = [
  { title: '关于期中考试安排的通知', time: '2天前', readCount: 42, totalCount: 44, type: 'important' },
  { title: '本周班会主题：时间管理', time: '5天前', readCount: 44, totalCount: 44, type: 'normal' },
  { title: '数学作业：方程练习（二）', time: '6天前', readCount: 40, totalCount: 44, type: 'homework' },
]

const HomeSchool = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false)

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">家校沟通</h1>
            <p className="page-subtitle">智能家校沟通协同系统，AI 辅助回复、周报推送、敏感信息过滤</p>
          </div>
          <button className="btn-primary" onClick={() => setShowNewAnnouncement(!showNewAnnouncement)}>
            <Bell size={16} />
            发送通知
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <MessageSquare size={20} />, label: '今日消息', value: '15', extra: '较昨日 +3', bg: 'bg-primary-50', color: 'text-primary-600' },
          { icon: <Bell size={20} />, label: '未读消息', value: '5', extra: '来自3位家长', bg: 'bg-rose-50', color: 'text-rose-500' },
          { icon: <Eye size={20} />, label: '通知已读率', value: '92%', extra: '较上周 +2%', bg: 'bg-accent-50', color: 'text-accent-600' },
          { icon: <Shield size={20} />, label: '过滤拦截', value: '3', extra: '敏感/广告信息', bg: 'bg-warm-50', color: 'text-warm-500' }
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

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">消息中心</h2>
            <div className="flex gap-2">
              <span className="tab-item tab-item-active">全部 (4)</span>
              <span className="tab-item">未读 (2)</span>
              <span className="tab-item">已回复</span>
            </div>
          </div>
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedMessage === i
                    ? 'border-primary-300 bg-primary-50/20 shadow-sm'
                    : m.unread ? 'border-primary-200 bg-primary-50/30' : 'border-border'
                }`}
                onClick={() => setSelectedMessage(selectedMessage === i ? null : i)}
              >
                <div className="flex items-start gap-3">
                  <div className="avatar w-9 h-9 text-[11px] bg-primary-500">{m.parent[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-text-primary">{m.parent}</span>
                      <span className="text-[11px] text-text-tertiary">{m.student}的家长</span>
                      {m.unread && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                    </div>
                    <div className="text-[13px] text-text-secondary mb-2">{m.msg}</div>

                    {(selectedMessage === i || (m.aiReply && selectedMessage === null)) && m.aiReply && (
                      <div className={`p-3 rounded-lg border border-primary-100 bg-primary-50/50 mb-2 ${
                        selectedMessage === i ? 'animate-fade-in-up' : ''
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <SparklesIcon size={12} className="text-primary-500" />
                          <span className="text-[11px] font-semibold text-primary-600">AI 建议回复</span>
                        </div>
                        <div className="text-[12px] text-text-secondary leading-relaxed">{m.aiReply}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button className="btn-primary text-[11px] py-1 px-3">
                            <Send size={10} />一键发送
                          </button>
                          <button className="btn-secondary text-[11px] py-1 px-3">修改后发送</button>
                        </div>
                      </div>
                    )}

                    <div className="text-[11px] text-text-tertiary flex items-center gap-1">
                      <Clock size={10} />{m.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">学生周报推送</h2>
            </div>
            <div className="space-y-2">
              {weeklyReports.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-overlay transition-colors">
                  <FileText size={16} className="text-primary-500" />
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-text-primary">{r.class}</div>
                    <div className="text-[10px] text-text-tertiary">{r.week} · 第{r.date} · 已读率 {r.readRate}</div>
                  </div>
                  <span className="badge badge-accent">已推送</span>
                </div>
              ))}
            </div>
            <button className="btn-primary w-full mt-3 justify-center text-[12px]">
              <FileText size={14} />生成本周周报
            </button>
          </div>

          <div className="card">
            <h2 className="section-title mb-4">通知历史</h2>
            <div className="space-y-2">
              {announcementHistory.map((a, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-surface-overlay hover:bg-primary-50/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`badge ${a.type === 'important' ? 'badge-rose' : a.type === 'homework' ? 'badge-primary' : 'badge-accent'}`}>
                      {a.type === 'important' ? '重要' : a.type === 'homework' ? '作业' : '普通'}
                    </span>
                    <span className="text-[10px] text-text-tertiary">{a.time}</span>
                  </div>
                  <div className="text-[12px] font-medium text-text-primary">{a.title}</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5 flex items-center gap-1">
                    <CheckCircle2 size={10} className="text-accent-500" />
                    已读 {a.readCount}/{a.totalCount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showNewAnnouncement && (
        <div className="card animate-fade-in-up">
          <h2 className="section-title mb-4">发送班级通知</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <input className="input-field text-[13px]" placeholder="通知标题" />
              <textarea className="input-field text-[13px] h-24 resize-none" placeholder="通知内容..." />
              <div className="flex gap-2">
                <select className="select-field flex-1 text-[12px]">
                  <option>七年级1班</option>
                  <option>七年级2班</option>
                  <option>七年级3班</option>
                </select>
                <select className="select-field text-[12px]">
                  <option>普通通知</option>
                  <option>紧急通知</option>
                  <option>作业提醒</option>
                </select>
              </div>
              <button className="btn-primary w-full justify-center">
                <Bell size={14} />发送通知
              </button>
            </div>
            <div className="p-4 rounded-xl bg-accent-50 border border-accent-100 text-[12px] text-accent-700">
              <div className="font-semibold mb-2">AI 写作助手</div>
              <div className="mb-2">为您准备的通知模板：</div>
              <div className="text-accent-600 space-y-1">
                <div>【期中考试通知】</div>
                <div>各位家长好！期中考试将于下周三进行，请您督促孩子合理安排复习时间。</div>
              </div>
              <button className="btn-secondary w-full mt-3 text-[11px] py-1.5 justify-center">
                <Sparkles size={12} />使用此模板
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const SparklesIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
  </svg>
)

export default HomeSchool
