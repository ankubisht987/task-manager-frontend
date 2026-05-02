import { Route, Routes } from 'react-router-dom'
import Projects from './pages/Projects'
import Login from './pages/Login'
import Task from './pages/Task'
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/tasks' element={<Task />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
