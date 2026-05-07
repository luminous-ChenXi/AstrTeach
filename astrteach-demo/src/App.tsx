import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AiPrep from './pages/AiPrep'
import Classroom from './pages/Classroom'
import Grading from './pages/Grading'
import Profile from './pages/Profile'
import Exam from './pages/Exam'
import ClassMgmt from './pages/ClassMgmt'
import HomeSchool from './pages/HomeSchool'
import { Research, AiLearning } from './pages/Research'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/prep" element={<AiPrep />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/grading" element={<Grading />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/class-mgmt" element={<ClassMgmt />} />
          <Route path="/home-school" element={<HomeSchool />} />
          <Route path="/research" element={<Research />} />
          <Route path="/ai-learning" element={<AiLearning />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
