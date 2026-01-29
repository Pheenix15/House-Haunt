import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './component/Home'
import Signup from './component/Signup'
import Login from './component/Login'
import ProtectedRoute from './component/ProtectedRoute'
import DashboardAgent from './Dashboard/Agent-Dashboard/Dashboard-Agent'
import DashboardHaunter from './Dashboard/Haunter-Dashboard/Dashboard-Haunter'
import HouseDetails from './Dashboard/House-Details'
import Admin from './Admin/Admin'
import axios from 'axios'
import EmptyPage from './component/404-not-found'
import { AlertProvider } from './Context/AlertContext'
import Alert from './component/Alert'

// Swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// read token from localStorage and attach to every request
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// if (token) {
//   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
          <Route path="/houses/:houseId" element={<HouseDetails />} />
          
          {/* Protected route - Admin only */}
          <Route path='/Admin' element={
              <ProtectedRoute allowedRole="admin" >
                <Admin />
              </ProtectedRoute>
              
            } 
          />

          {/* Protected routes - Agent only */}
          <Route 
            path="/Dashboard-Agent" 
            element={
              <ProtectedRoute allowedRole="agent">
                <DashboardAgent />
              </ProtectedRoute>
            } 
          />

          {/* Protected routes - Haunter only */}
          <Route 
            path="/Dashboard-Haunter" 
            element={
              <ProtectedRoute allowedRole="haunter">
                <DashboardHaunter />
              </ProtectedRoute>
            } 
          />
          {/* <Route path='/Dashboard-Agent' element={<DashboardAgent />} />
          <Route path='/Dashboard-Haunter' element={<DashboardHaunter />} /> */}

          <Route path='*' element={<EmptyPage />} />
        </Routes>
      </AlertProvider>
    </>
  )
}

export default App
