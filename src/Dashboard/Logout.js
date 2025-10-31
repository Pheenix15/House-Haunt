import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Logout = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await axios.post(`/api/auth/logout`);
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            localStorage.removeItem("role");
            navigate('/login');
            console.log('✅ Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
            navigate('/login');
        }
    };
    
    return handleLogout;
};
