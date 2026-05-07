import { Bell, Search } from 'lucide-react'

const StudentHeader = () => {
  return (
    <header className="h-16 bg-surface-elevated border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            placeholder="搜索课程、作业..."
            className="input-field pl-9 w-[280px] text-[13px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-surface-overlay transition-colors relative">
          <Bell size={18} className="text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-bold">李</div>
          <div>
            <div className="text-[13px] font-semibold text-text-primary">李明</div>
            <div className="text-[11px] text-text-tertiary">七年级1班</div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default StudentHeader
