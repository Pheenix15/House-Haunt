import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './component/Home'
import Signup from './component/Signup'
import Login from './component/Login'
import ProtectedRoute from './component/ProtectedRoute'
import DashboardAgent from './Dashboard/Agent-Dashboard/Dashboard-Agent'
import DashboardHaunter from './Dashboard/Haunter-Dashboard/Dashboard-Haunter'
import axios from 'axios'
import EmptyPage from './component/404-not-found'


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// const token = localStorage.getItem("token");
// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

        {/* Protected routes - Agent only */}
        {/* <Route 
          path="/Dashboard-Agent" 
          element={
            <ProtectedRoute allowedRole="agent">
              <DashboardAgent />
            </ProtectedRoute>
          } 
        /> */}

        {/* Protected routes - Haunter only */}
        {/* <Route 
          path="/Dashboard-Haunter" 
          element={
            <ProtectedRoute allowedRole="haunter">
              <DashboardHaunter />
            </ProtectedRoute>
          } 
        /> */}
        <Route path='/Dashboard-Agent' element={<DashboardAgent />} />
        <Route path='/Dashboard-Haunter' element={<DashboardHaunter />} />

        <Route path='*' element={<EmptyPage />} />
      </Routes>
    </>
  )
}

export default App
