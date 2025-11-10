import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, loading } = useAuth();
    console.log(' ProtectedRoute render:', { loading, user, allowedRole });

    if (loading) return <div>Loading...</div>;
    if (!user) {
        console.log('No user found - attempting redirect to /Login'); 
        return <Navigate to="/Login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        console.log('redirecting to dashboard');
        return <Navigate to={user.role === "agent" ? "/Dashboard-Agent" : "/Dashboard-Haunter"} replace />;
    }

    console.log('Access granted');
    return children;
};

export default ProtectedRoute;