import { Bell, Search, Sun, Moon, Menu } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isDark, setIsDark] = useState(false)

  return (
    <header className="h-16 bg-surface-elevated border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 rounded-lg hover:bg-surface-overlay transition-colors">
          <Menu size={20} className="text-text-secondary" />
        </button>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="搜索教案、题目、学生..."
            className="input-field pl-9 w-[320px] text-[13px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg hover:bg-surface-overlay transition-colors"
        >
          {isDark ? <Sun size={18} className="text-text-secondary" /> : <Moon size={18} className="text-text-secondary" />}
        </button>

        <button className="p-2 rounded-lg hover:bg-surface-overlay transition-colors relative">
          <Bell size={18} className="text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="avatar bg-primary-600">张</div>
          <div>
            <div className="text-[13px] font-semibold text-text-primary">张老师</div>
            <div className="text-[11px] text-text-tertiary">七年级 · 数学</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
