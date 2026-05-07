import { BookOpen, Clock, ChevronRight } from 'lucide-react'

const courses = [
  { name: '七年级数学', teacher: '张老师', progress: 68, lessons: 32, completed: 22, nextLesson: '一元一次方程（第4课时）' },
  { name: '七年级英语', teacher: '王老师', progress: 55, lessons: 28, completed: 15, nextLesson: 'Unit 5 Reading' },
  { name: '七年级物理', teacher: '李老师', progress: 42, lessons: 24, completed: 10, nextLesson: '光的折射' },
]

const MyCourses = () => {
  return (
    <div className="animate-fade-in-up">
      <div className="page-header">
        <h1 className="page-title">我的课程</h1>
        <p className="page-subtitle">查看课程进度与学习内容</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {courses.map((course, i) => (
          <div key={i} className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-text-primary">{course.name}</h3>
                <p className="text-[12px] text-text-tertiary">{course.teacher}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] text-text-secondary">学习进度</span>
                <span className="text-[13px] font-semibold text-primary-600">{course.progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${course.progress}%`, background: 'var(--color-primary-500)' }} />
              </div>
              <div className="text-[11px] text-text-tertiary mt-1">{course.completed} / {course.lessons} 课时</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-overlay">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-text-tertiary" />
                <span className="text-[12px] text-text-secondary">下一节：{course.nextLesson}</span>
              </div>
              <ChevronRight size={14} className="text-text-tertiary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCourses
