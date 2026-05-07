import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  PenTool,
  FileText,
  BarChart3,
  Brain,
  User,
  GraduationCap,
  Settings,
  LogOut
} from 'lucide-react'

const NAV_ITEMS = [
  { path: '/', label: '学习台', icon: <LayoutDashboard size={18} /> },
  { path: '/courses', label: '我的课程', icon: <BookOpen size={18} /> },
  { path: '/homework', label: '作业中心', icon: <PenTool size={18} /> },
  { path: '/exams', label: '考试测评', icon: <FileText size={18} /> },
  { path: '/grades', label: '成绩查询', icon: <BarChart3 size={18} /> },
  { path: '/ai-tutor', label: 'AI 答疑', icon: <Brain size={18} /> },
]

const StudentSidebar = () => {
  const location = useLocation()

  return (
    <aside className="w-[240px] min-h-screen bg-sidebar-bg flex flex-col fixed left-0 top-0 z-50">
      <div className="h-16 flex items-center px-5 gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
          <GraduationCap size={18} className="text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-[15px] tracking-tight">AstrTeach</div>
          <div className="text-sidebar-text text-[11px]">学生智慧学习平台</div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="space-y-0.5">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-sidebar-active text-sidebar-text-active shadow-lg shadow-primary-900/30'
                    : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-bold">李</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[13px] font-medium truncate">李明</div>
            <div className="text-sidebar-text text-[11px]">七年级1班</div>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active transition-colors text-[12px]">
            <Settings size={14} />
            <span>设置</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-text hover:bg-sidebar-hover hover:text-rose-400 transition-colors text-[12px]">
            <LogOut size={14} />
            <span>退出</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default StudentSidebar
