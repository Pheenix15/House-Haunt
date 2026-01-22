// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        console.log('Starting auth check...');
        try {
            const response = await axios.get('/api/auth/me');
            console.log('Auth response:', response.data);
            setUser(response.data);
            
            // Store in localStorage as backup
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("name", response.data.username);
            localStorage.setItem("role", response.data.role);

            return response.data
        } catch (error) {
            console.log('Auth failed:', error.response?.status);
            setUser(null);
            localStorage.clear();
        } finally {
            console.log('Auth check complete, setting loading to false');
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth(); //RUNS ON STARTUP
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, setUser, refreshAuth: checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);