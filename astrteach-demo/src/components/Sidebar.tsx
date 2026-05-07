import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  MonitorPlay,
  PenTool,
  BarChart3,
  FileText,
  Users,
  FlaskConical,
  Brain,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Settings,
  LogOut,
  MessageSquare
} from 'lucide-react'

interface NavGroup {
  label: string
  items: { path: string; label: string; icon: React.ReactNode }[]
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: '概览',
    items: [
      { path: '/', label: '工作台', icon: <LayoutDashboard size={18} /> }
    ]
  },
  {
    label: '教学核心',
    items: [
      { path: '/prep', label: 'AI 备课', icon: <BookOpen size={18} /> },
      { path: '/classroom', label: '课堂互动', icon: <MonitorPlay size={18} /> },
      { path: '/grading', label: '作业批改', icon: <PenTool size={18} /> },
      { path: '/profile', label: '学情画像', icon: <BarChart3 size={18} /> }
    ]
  },
  {
    label: '考试测评',
    items: [
      { path: '/exam', label: '题库与考试', icon: <FileText size={18} /> }
    ]
  },
  {
    label: '管理与协同',
    items: [
      { path: '/class-mgmt', label: '班级管理', icon: <Users size={18} /> },
      { path: '/home-school', label: '家校沟通', icon: <MessageSquare size={18} /> }
    ]
  },
  {
    label: '拓展',
    items: [
      { path: '/research', label: '教科研辅助', icon: <FlaskConical size={18} /> },
      { path: '/ai-learning', label: 'AI 素养学习', icon: <Brain size={18} /> }
    ]
  }
]

const Sidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggleGroup = (label: string) => {
    setCollapsed(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <aside className="w-[260px] min-h-screen bg-sidebar-bg flex flex-col fixed left-0 top-0 z-50">
      <div className="h-16 flex items-center px-5 gap-3 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
          <GraduationCap size={18} className="text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-[15px] tracking-tight">AstrTeach</div>
          <div className="text-sidebar-text text-[11px]">智教全场景协同平台</div>
        </div>
      </div>

      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        {NAV_GROUPS.map(group => {
          const isCollapsed = collapsed[group.label]
          const isGroupActive = group.items.some(item => location.pathname === item.path)

          return (
            <div key={group.label} className="mb-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-md transition-colors ${
                  isGroupActive ? 'text-primary-400' : 'text-sidebar-text'
                } hover:text-sidebar-text-active`}
              >
                <span>{group.label}</span>
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
              </button>

              {!isCollapsed && (
                <div className="mt-1 space-y-0.5">
                  {group.items.map(item => (
                    <NavLink
                      key={item.path}
                      to={item.path}
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
              )}
            </div>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-hover transition-colors cursor-pointer">
          <div className="avatar w-8 h-8 text-xs bg-primary-600">张</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[13px] font-medium truncate">张老师</div>
            <div className="text-sidebar-text text-[11px]">七年级数学</div>
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

export default Sidebar
