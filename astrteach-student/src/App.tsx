import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentLayout from './components/StudentLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MyCourses from './pages/MyCourses'
import Homework from './pages/Homework'
import Exams from './pages/Exams'
import Grades from './pages/Grades'
import Profile from './pages/Profile'
import AiTutor from './pages/AiTutor'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<StudentLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/ai-tutor" element={<AiTutor />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
