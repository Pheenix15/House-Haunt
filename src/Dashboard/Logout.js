import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
import axios from "axios";


export const Logout = () => {
    const navigate = useNavigate();
    // const { setUser } = useAuth();
    
    const handleLogout = async () => {
        try {
            await axios.post(`/api/auth/logout`);

            // Clears user in AuthContext
            // setUser(null);

            // Clears LocalStorage
            localStorage.removeItem("id");
            localStorage.removeItem("name");
            localStorage.removeItem("role");

            navigate('/login');
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    
    return handleLogout;
};
