import { useState } from 'react'
import { Target, TrendingUp, AlertTriangle, User, BookOpen, Search, Download, Eye } from 'lucide-react'

const studentDetail = {
  name: '李明',
  class: '七年级1班',
  overall: 92,
  trend: '+5',
  dimensions: [
    { name: '概念理解', score: 95, max: 100 },
    { name: '运算能力', score: 88, max: 100 },
    { name: '应用解题', score: 93, max: 100 },
    { name: '逻辑推理', score: 90, max: 100 },
    { name: '创新思维', score: 85, max: 100 },
    { name: '学习习惯', score: 92, max: 100 },
  ],
  knowledgePoints: [
    { name: '等式性质', mastery: 98, status: 'good' },
    { name: '移项法则', mastery: 92, status: 'good' },
    { name: '合并同类项', mastery: 88, status: 'good' },
    { name: '系数化为1', mastery: 85, status: 'good' },
    { name: '含分母方程', mastery: 75, status: 'warning' },
    { name: '列方程解应用题', mastery: 68, status: 'danger' },
    { name: '绝对值化简', mastery: 82, status: 'good' },
  ],
  recentScores: [
    { date: '第1周', score: 78 },
    { date: '第2周', score: 82 },
    { date: '第3周', score: 85 },
    { date: '第4周', score: 88 },
    { date: '第5周', score: 90 },
    { date: '第6周', score: 92 },
  ],
  weakPoints: [
    { kp: '列方程解应用题', mastery: 68, reason: '审题不够仔细，容易漏掉关键条件', suggestions: ['加练5道应用题', '观看审题技巧微课'] },
    { kp: '含分母方程', mastery: 75, reason: '去分母时容易计算错误', suggestions: ['专项练习含分母方程', '用验算方法自我检查'] },
  ]
}

const classWeakPoints = [
  { name: '含分母方程解法', rate: '62%', count: 28, trend: '-2%' },
  { name: '移项法则', rate: '55%', count: 25, trend: '-5%' },
  { name: '实际问题列方程', rate: '48%', count: 22, trend: '-3%' },
  { name: '绝对值化简', rate: '42%', count: 19, trend: '+1%' },
  { name: '有理数混合运算', rate: '38%', count: 17, trend: '-4%' },
]

const studentList = [
  { name: '李明', level: '优秀', mastery: 92, trend: '+5', avatar: 'bg-accent-500' },
  { name: '王芳', level: '良好', mastery: 85, trend: '+3', avatar: 'bg-primary-500' },
  { name: '赵磊', level: '优秀', mastery: 93, trend: '+7', avatar: 'bg-accent-500' },
  { name: '张伟', level: '良好', mastery: 79, trend: '+2', avatar: 'bg-primary-500' },
  { name: '刘洋', level: '中等', mastery: 68, trend: '-3', avatar: 'bg-warm-400' },
  { name: '陈静', level: '薄弱', mastery: 52, trend: '-8', avatar: 'bg-rose-400' },
  { name: '陈雨', level: '良好', mastery: 91, trend: '+2', avatar: 'bg-primary-500' },
  { name: '周强', level: '中等', mastery: 71, trend: '+1', avatar: 'bg-warm-400' },
]

const resourceRecommendations = [
  { student: '陈静', weak: '含分母方程', resource: '含分母方程解法微课（15分钟）', type: '微课', match: '92%' },
  { student: '刘洋', weak: '移项法则', resource: '移项法则专项练习30题', type: '练习', match: '88%' },
  { student: '张伟', weak: '实际问题列方程', resource: '方程应用题审题3步法', type: '拓展', match: '85%' },
  { student: '周强', weak: '有理数混合运算', resource: '有理数运算易错点梳理', type: '微课', match: '90%' },
]

const Profile = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">学情画像</h1>
            <p className="page-subtitle">学生个性化学习画像与薄弱点智能诊断，实现「千人千策」精准教学</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input className="input-field text-[13px] pl-8 w-[220px]" placeholder="搜索学生姓名..." />
            </div>
            <button className="btn-secondary"><Download size={16} />导出报告</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: <User size={20} />, label: '已建档学生', value: '132', extra: '覆盖3个班', bg: 'bg-primary-50', color: 'text-primary-600' },
          { icon: <Target size={20} />, label: '薄弱点预警', value: '28', extra: '分布在5个知识点', bg: 'bg-rose-50', color: 'text-rose-500' },
          { icon: <TrendingUp size={20} />, label: '本周进步', value: '18', extra: '含3人进步明显', bg: 'bg-accent-50', color: 'text-accent-600' },
          { icon: <AlertTriangle size={20} />, label: '退步预警', value: '5', extra: '需重点关注', bg: 'bg-warm-50', color: 'text-warm-500' }
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
            <h2 className="section-title">班级学情诊断仪表盘</h2>
            <select className="select-field text-[12px] py-1.5">七年级1班</select>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100 text-center">
              <div className="text-[28px] font-bold text-primary-700">82%</div>
              <div className="text-[12px] text-primary-600 mt-1">整体掌握率</div>
              <div className="text-[10px] text-primary-500 mt-0.5">较上周 +2.1%</div>
            </div>
            <div className="p-4 rounded-xl bg-accent-50 border border-accent-100 text-center">
              <div className="text-[28px] font-bold text-accent-600">91%</div>
              <div className="text-[12px] text-accent-600 mt-1">作业完成率</div>
              <div className="text-[10px] text-accent-500 mt-0.5">较上周 +1.5%</div>
            </div>
            <div className="p-4 rounded-xl bg-warm-50 border border-warm-100 text-center">
              <div className="text-[28px] font-bold text-warm-500">78.5</div>
              <div className="text-[12px] text-warm-500 mt-1">班级平均分</div>
              <div className="text-[10px] text-warm-400 mt-0.5">较上周 +0.8</div>
            </div>
          </div>

          <div className="mb-5">
            <div className="text-[13px] font-semibold text-text-primary mb-3">学生分层分布</div>
            <div className="flex gap-2">
              {[
                { label: '优秀', count: 8, color: 'bg-accent-500', bg: 'bg-accent-50', textColor: 'text-accent-600', pct: '18%' },
                { label: '良好', count: 15, color: 'bg-primary-500', bg: 'bg-primary-50', textColor: 'text-primary-600', pct: '33%' },
                { label: '中等', count: 14, color: 'bg-warm-400', bg: 'bg-warm-50', textColor: 'text-warm-500', pct: '31%' },
                { label: '薄弱', count: 8, color: 'bg-rose-400', bg: 'bg-rose-50', textColor: 'text-rose-500', pct: '18%' }
              ].map((l, i) => (
                <div key={i} className={`flex-1 p-3 rounded-lg ${l.bg} text-center hover:shadow-sm transition-all cursor-pointer`}>
                  <div className={`text-xl font-bold ${l.textColor}`}>{l.count}</div>
                  <div className={`text-[11px] ${l.textColor} font-medium`}>{l.label}</div>
                  <div className="text-[10px] text-text-tertiary mt-0.5">{l.pct}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] font-semibold text-text-primary">共性薄弱知识点 TOP5</div>
              <span className="badge badge-rose">需重点关注</span>
            </div>
            <div className="space-y-2">
              {classWeakPoints.map((w, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-overlay transition-colors">
                  <span className={`text-[11px] font-bold w-4 ${i < 3 ? 'text-rose-500' : 'text-warm-400'}`}>{i + 1}</span>
                  <span className="text-[13px] text-text-primary flex-1 font-medium">{w.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-text-tertiary">{w.count}人</span>
                    <span className={`text-[11px] font-medium ${w.trend.startsWith('+') ? 'text-accent-600' : 'text-rose-500'}`}>{w.trend}</span>
                    <div className="w-[120px] progress-bar">
                      <div className="progress-bar-fill" style={{ width: w.rate, background: 'var(--color-rose-400)' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title mb-5">学生知识图谱</h2>
          <div className="space-y-2">
            {studentList.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                  selectedStudent === s.name ? 'bg-primary-50 border border-primary-200' : 'hover:bg-surface-overlay'
                }`}
                onClick={() => setSelectedStudent(selectedStudent === s.name ? null : s.name)}
              >
                <div className={`avatar w-8 h-8 text-[11px] ${s.avatar}`}>{s.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-text-primary">{s.name}</span>
                    <span className="text-[12px] font-bold text-text-primary">{s.mastery}%</span>
                  </div>
                  <div className="progress-bar mt-1">
                    <div className="progress-bar-fill" style={{
                      width: `${s.mastery}%`,
                      background: s.level === '优秀' ? 'var(--color-accent-500)' :
                        s.level === '良好' ? 'var(--color-primary-500)' :
                        s.level === '中等' ? 'var(--color-warm-400)' :
                        'var(--color-rose-400)'
                    }} />
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge ${
                      s.level === '优秀' ? 'badge-accent' :
                      s.level === '良好' ? 'badge-primary' :
                      s.level === '中等' ? 'badge-warm' : 'badge-rose'
                    }`}>{s.level}</span>
                    <span className={`text-[11px] font-medium ${s.trend.startsWith('+') ? 'text-accent-600' : 'text-rose-500'}`}>
                      {s.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedStudent && (
        <div className="mb-6 animate-fade-in-up">
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                <div className="avatar w-12 h-12 text-[14px] bg-accent-500">{studentDetail.name[0]}</div>
                <div>
                  <h2 className="section-title">{studentDetail.name}</h2>
                  <p className="section-desc">{studentDetail.class} · 综合掌握率 {studentDetail.overall}% · 趋势 {studentDetail.trend}</p>
                </div>
              </div>
              <span className="badge badge-accent">优秀</span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[13px] font-semibold text-text-primary mb-4">能力维度评估</div>
                <div className="space-y-3">
                  {studentDetail.dimensions.map((dim, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[12px] text-text-secondary w-[80px]">{dim.name}</span>
                      <div className="flex-1 progress-bar">
                        <div className="progress-bar-fill" style={{
                          width: `${(dim.score / dim.max) * 100}%`,
                          background: dim.score >= 90 ? 'var(--color-accent-500)' : dim.score >= 80 ? 'var(--color-primary-500)' : 'var(--color-warm-400)'
                        }} />
                      </div>
                      <span className="text-[13px] font-bold text-text-primary w-10 text-right">{dim.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[13px] font-semibold text-text-primary mb-4">成绩趋势（近6周）</div>
                <div className="flex items-end gap-2 h-[140px]">
                  {studentDetail.recentScores.map((s, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-text-tertiary font-medium">{s.score}</span>
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-accent-500 to-accent-400 transition-all duration-300 hover:from-accent-600 hover:to-accent-500"
                        style={{ height: `${((s.score - 70) / 30) * 120}px`, minHeight: '8px' }}
                      />
                      <span className="text-[10px] text-text-tertiary">{s.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title">薄弱点诊断</h2>
                <span className="badge badge-rose">2 项</span>
              </div>
              <div className="space-y-4">
                {studentDetail.weakPoints.map((wp, i) => (
                  <div key={i} className="p-4 rounded-xl border border-rose-200 bg-rose-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle size={14} className="text-rose-500" />
                        <span className="text-[14px] font-semibold text-text-primary">{wp.kp}</span>
                      </div>
                      <span className="text-[16px] font-bold text-rose-500">{wp.mastery}%</span>
                    </div>
                    <div className="text-[12px] text-text-tertiary mb-3 pl-6">{wp.reason}</div>
                    <div className="pl-6 space-y-1.5">
                      <div className="text-[11px] font-semibold text-rose-600 mb-1">建议补学方案：</div>
                      {wp.suggestions.map((sg, j) => (
                        <div key={j} className="flex items-center gap-2 text-[12px] text-text-secondary">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                          {sg}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title">知识点掌握详情</h2>
              </div>
              <div className="space-y-3">
                {studentDetail.knowledgePoints.map((kp, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[12px] text-text-secondary w-[90px] truncate">{kp.name}</span>
                    <div className="flex-1 progress-bar">
                      <div className="progress-bar-fill" style={{
                        width: `${kp.mastery}%`,
                        background: kp.status === 'good' ? 'var(--color-accent-500)' : kp.status === 'warning' ? 'var(--color-warm-400)' : 'var(--color-rose-400)'
                      }} />
                    </div>
                    <span className={`text-[13px] font-bold w-10 text-right ${
                      kp.status === 'good' ? 'text-accent-600' : kp.status === 'warning' ? 'text-warm-500' : 'text-rose-500'
                    }`}>{kp.mastery}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="section-title">千人千策 · 个性化资源推荐</h2>
          <span className="badge badge-primary">{resourceRecommendations.length} 条推荐</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {resourceRecommendations.map((r, i) => (
            <div key={i} className="p-4 rounded-xl border border-border hover:border-primary-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={14} className="text-primary-500" />
                <span className="badge badge-primary">{r.type}</span>
                <span className="text-[10px] text-accent-600 font-medium ml-auto">匹配 {r.match}</span>
              </div>
              <div className="text-[13px] font-medium text-text-primary mb-1">{r.resource}</div>
              <div className="text-[11px] text-text-tertiary">推荐给 {r.student} · {r.weak}</div>
              <button className="btn-secondary w-full mt-3 justify-center text-[11px] py-1.5">
                <Eye size={12} />查看详情
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
