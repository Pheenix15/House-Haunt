import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './component/Home'
import Signup from './component/Signup'
import Login from './component/Login'
import ProtectedRoute from './component/ProtectedRoute'
import DashboardAgent from './Dashboard/Agent-Dashboard/Dashboard-Agent'
import DashboardHaunter from './Dashboard/Haunter-Dashboard/Dashboard-Haunter'
import Admin from './Admin/Admin'
import axios from 'axios'
import EmptyPage from './component/404-not-found'
import { AlertProvider } from './Context/AlertContext'
import Alert from './component/Alert'


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// const token = localStorage.getItem("token");
// if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }


function App() {
  return (
    <>
      <AlertProvider>
        <Alert /> {/*Global Component for Alerts*/}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/Admin' element={<Admin />} />

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
      </AlertProvider>
    </>
  )
}

export default App
