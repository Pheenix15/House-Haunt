import './App.css'
import { Routes,Route } from 'react-router-dom'
import HaunterSignup from './component/House-haunter-Signup'
import Home from './component/Home'
import Signup from './component/Signup'
import Login from './component/Login'
import DashboardAgent from './Dashboard/Agent-Dashboard/Dashboard-Agent'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Dashboard-Agent' element={<DashboardAgent />} />
      </Routes>
    </>
  )
}

export default App
