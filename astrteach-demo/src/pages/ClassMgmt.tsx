import { useState } from 'react'
import { Users, ClipboardList, Heart, Bell, MessageSquare, FileText, Shield, Clock, ChevronRight, UserPlus } from 'lucide-react'

const studentRoster = [
  { name: '李明', gender: '男', parent: '李父', phone: '138****5678', attendance: '98%', behavior: '优秀' },
  { name: '王芳', gender: '女', parent: '王母', phone: '139****1234', attendance: '100%', behavior: '优秀' },
  { name: '张伟', gender: '男', parent: '张父', phone: '137****9876', attendance: '95%', behavior: '良好' },
  { name: '刘洋', gender: '男', parent: '刘母', phone: '136****5432', attendance: '88%', behavior: '一般' },
  { name: '陈静', gender: '女', parent: '陈父', phone: '135****2345', attendance: '90%', behavior: '一般' },
  { name: '赵磊', gender: '男', parent: '赵母', phone: '133****8765', attendance: '98%', behavior: '优秀' },
]

const classSchedule = [
  { day: '周一', items: ['08:00 数学', '10:00 语文', '14:00 英语'] },
  { day: '周二', items: ['08:00 数学', '10:00 体育', '14:00 物理'] },
  { day: '周三', items: ['08:00 数学', '10:00 英语', '14:00 自习'] },
]

const weeklyStats = [
  { label: '出勤率', value: '97.7%', trend: '+0.5%', good: true },
  { label: '作业完成率', value: '91%', trend: '+2.1%', good: true },
  { label: '课堂参与度', value: '85%', trend: '-1.3%', good: false },
  { label: '纪律扣分', value: '3 分', trend: '-2 分', good: true },
  { label: '卫生评分', value: 'A 级', trend: '持平', good: true },
]

const ClassMgmt = () => {
  const [activeSection, setActiveSection] = useState<'auto' | 'roster' | 'stats'>('auto')

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">班级管理</h1>
            <p className="page-subtitle">AI 班级管理助手，自动生成文案、统计报表、心理预警</p>
          </div>
          <div className="flex gap-2">
            <span
              onClick={() => setActiveSection('auto')}
              className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg cursor-pointer transition-all ${
                activeSection === 'auto' ? 'bg-primary-600 text-white' : 'text-text-secondary hover:bg-surface-overlay'
              }`}
            >AI 文案</span>
            <span
              onClick={() => setActiveSection('roster')}
              className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg cursor-pointer transition-all ${
                activeSection === 'roster' ? 'bg-primary-600 text-white' : 'text-text-secondary hover:bg-surface-overlay'
              }`}
            >花名册</span>
            <span
              onClick={() => setActiveSection('stats')}
              className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg cursor-pointer transition-all ${
                activeSection === 'stats' ? 'bg-primary-600 text-white' : 'text-text-secondary hover:bg-surface-overlay'
              }`}
            >统计</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <Users size={20} />, label: '班级人数', value: '44', extra: '男24 女20', bg: 'bg-primary-50', color: 'text-primary-600' },
          { icon: <ClipboardList size={20} />, label: '本周待办', value: '6', extra: '含2项紧急', bg: 'bg-warm-50', color: 'text-warm-500' },
          { icon: <Heart size={20} />, label: '心理预警', value: '2', extra: '需关注', bg: 'bg-rose-50', color: 'text-rose-500' },
          { icon: <Bell size={20} />, label: '未读通知', value: '8', extra: '家长消息', bg: 'bg-accent-50', color: 'text-accent-600' }
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

      {activeSection === 'auto' && (
        <div className="grid grid-cols-3 gap-6 mb-6 animate-fade-in-up">
          <div className="card">
            <h2 className="section-title mb-5">AI 文案生成</h2>
            <div className="space-y-3">
              {[
                { icon: <FileText size={16} />, label: '班级日志', desc: '自动生成每日班级日志', time: '约 15s' },
                { icon: <ClipboardList size={16} />, label: '班会教案', desc: '生成主题班会教学设计', time: '约 30s' },
                { icon: <MessageSquare size={16} />, label: '家长会发言稿', desc: 'AI 辅助撰写发言稿', time: '约 20s' },
                { icon: <Users size={16} />, label: '学生期末评语', desc: '个性化评语一键生成', time: '约 10s/人' }
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-surface-overlay transition-colors text-left group">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 transition-colors">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-text-primary">{item.label}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-text-tertiary">{item.desc}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-text-tertiary">
                    <Clock size={10} />{item.time}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="section-title mb-5">班级数据周报</h2>
            <div className="space-y-3">
              {weeklyStats.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-overlay transition-colors">
                  <span className="text-[13px] text-text-secondary">{d.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-text-primary">{d.value}</span>
                    <span className={`text-[11px] font-medium ${d.good ? 'text-accent-600' : 'text-rose-500'}`}>
                      {d.good ? '↑' : '↓'} {d.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-secondary w-full mt-3 justify-center text-[12px]">
              <FileText size={14} />生成完整周报
            </button>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="section-title">心理预警</h2>
              <Shield size={16} className="text-rose-500" />
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-semibold text-rose-700">匿名预警 #1</span>
                  <span className="badge badge-rose">需关注</span>
                </div>
                <div className="text-[12px] text-rose-600 mb-2">该学生近期多次表达学业压力过大，AI 建议班主任关注并安排一次轻松谈话。</div>
                <button className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                  查看干预建议 <ChevronRight size={10} />
                </button>
              </div>
              <div className="p-3 rounded-xl bg-warm-50 border border-warm-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-semibold text-warm-600">匿名预警 #2</span>
                  <span className="badge badge-warm">关注</span>
                </div>
                <div className="text-[12px] text-warm-500">该学生课堂参与度连续3周下降，建议课下沟通了解原因。</div>
              </div>
            </div>
            <button className="btn-secondary w-full mt-3 justify-center text-[12px]">
              <Heart size={14} />查看全部预警记录
            </button>
          </div>
        </div>
      )}

      {activeSection === 'roster' && (
        <div className="card mb-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <h2 className="section-title">班级花名册</h2>
              <span className="badge badge-primary">44 人</span>
            </div>
            <button className="btn-secondary text-[12px] py-1.5">
              <UserPlus size={14} />添加学生
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-[11px] font-semibold text-text-tertiary py-3 px-3">姓名</th>
                  <th className="text-[11px] font-semibold text-text-tertiary py-3 px-3">性别</th>
                  <th className="text-[11px] font-semibold text-text-tertiary py-3 px-3">家长</th>
                  <th className="text-[11px] font-semibold text-text-tertiary py-3 px-3">联系方式</th>
                  <th className="text-[11px] font-semibold text-text-tertiary py-3 px-3">出勤率</th>
                  <th className="text-[11px] font-semibold text-text-tertiary py-3 px-3">行为评定</th>
                </tr>
              </thead>
              <tbody>
                {studentRoster.map((s, i) => (
                  <tr key={i} className="border-b border-border-light hover:bg-surface-overlay transition-colors cursor-pointer">
                    <td className="py-3 px-3 text-[13px] font-medium text-text-primary">{s.name}</td>
                    <td className="py-3 px-3 text-[12px] text-text-tertiary">{s.gender}</td>
                    <td className="py-3 px-3 text-[12px] text-text-secondary">{s.parent}</td>
                    <td className="py-3 px-3 text-[12px] font-mono text-text-tertiary">{s.phone}</td>
                    <td className="py-3 px-3 text-[13px] font-semibold text-accent-600">{s.attendance}</td>
                    <td className="py-3 px-3">
                      <span className={`badge ${s.behavior === '优秀' ? 'badge-accent' : s.behavior === '良好' ? 'badge-primary' : 'badge-warm'}`}>
                        {s.behavior}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSection === 'stats' && (
        <div className="grid grid-cols-2 gap-6 mb-6 animate-fade-in-up">
          <div className="card">
            <h2 className="section-title mb-5">本周课表</h2>
            <div className="space-y-3">
              {classSchedule.map((day, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface-overlay">
                  <div className="text-[13px] font-bold text-text-primary mb-2">{day.day}</div>
                  <div className="grid grid-cols-3 gap-2">
                    {day.items.map((item, j) => (
                      <span key={j} className="text-[12px] text-text-secondary">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h2 className="section-title mb-5">待办事项</h2>
            <div className="space-y-3">
              {[
                { text: '批改七年级1班数学作业', deadline: '今天 18:00', priority: 'high' },
                { text: '与陈静家长沟通学习情况', deadline: '明天 10:00', priority: 'medium' },
                { text: '准备明日期中复习课件', deadline: '今天 20:00', priority: 'high' },
                { text: '提交本周班级管理周报', deadline: '周五 17:00', priority: 'low' },
                { text: '组织本周班会（主题：时间管理）', deadline: '周四 14:00', priority: 'medium' },
                { text: '更新个别学生期末评语', deadline: '下周一', priority: 'low' }
              ].map((todo, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-overlay transition-colors">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    todo.priority === 'high' ? 'bg-rose-500' : todo.priority === 'medium' ? 'bg-warm-400' : 'bg-accent-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-text-primary truncate">{todo.text}</div>
                    <div className="text-[11px] text-text-tertiary">{todo.deadline}</div>
                  </div>
                  <ChevronRight size={14} className="text-text-tertiary flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassMgmt
