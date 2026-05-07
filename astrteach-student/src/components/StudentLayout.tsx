import { Outlet } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import StudentHeader from './StudentHeader'

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-surface">
      <StudentSidebar />
      <div className="flex-1 ml-[240px]">
        <StudentHeader />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout
