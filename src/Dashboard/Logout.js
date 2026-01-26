import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";

export const useLogout = () => {
    const [isLogginOut, setIsLoggingOut] = useState(false)
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        setIsLoggingOut(true)
        try {
            await axios.post("/api/auth/logout");
            // Clean user for authContext
            setUser(null);

            localStorage.removeItem("id");
            localStorage.removeItem("name");
            localStorage.removeItem("role");

            navigate("/login");
        } catch (error) {
            console.log("Logout failed:", error)
        } finally {
            setIsLoggingOut(false)
        }
        
    };

    return { logout, isLogginOut };
};