import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useAlert } from "../Context/AlertContext";
import './Login.css'

function Login() {
    const [showPassword, setShowPassword] = useState(false); //STATE TO REVIEAL PASSWORD
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false) //LOADING STATE
    const {refreshAuth} = useAuth()
    const { showSuccess, showFail } = useAlert()

    const navigate = useNavigate();

   const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/auth/login", { email, password },
                { withCredentials: true }
            );
            

            const { user } = response.data;
            console.log('Login response:', response.data);


            // Store token and user data to local storage
            localStorage.setItem("id", user.id);
            localStorage.setItem("name", user.username);
            localStorage.setItem("role", user.role);

            // Rerun auth check
            await refreshAuth();

            showSuccess("Login successful!");

            // Redirect based on role
            const role = user.role; // Used directly from response instead of localStorage
            if (role === 'admin') {
                navigate('/Admin');
                
            } else if (role === "agent") {
                navigate('/Dashboard-Agent');
                
                // console.log('Redirected to agent dashboard');
            } else {
                navigate('/Dashboard-Haunter');
                
                // console.log('Redirected to haunter dashboard');
            }
             

        } catch (error) {

            if (error.response) {
            // Server responded with status code outside 2xx
            switch (error.response.status) {
                case 400:
                showFail("Invalid email or password.");
                break;
                case 401:
                showFail("Unauthorized. Please check your credentials.");
                break;
                case 403:
                showFail("Your account is blocked.");
                break;
                case 500:
                showFail("Server error. Please try again later.");
                break;
                default:
                showFail("Login failed. Please try again.");
            }
            } else if (error.request) {
            // Request was made but no response received
            showFail("Network error. Please check your connection.");
            } else {
            // Something else went wrong
            showFail("An unexpected error occurred.");
            }

            console.error('Login failed:', error.response?.data || error.message);

        } finally {
            setLoading(false);
        }
    };
    

    return ( 
        <div className="login-page">
            <div className="login-container signup-container">
                <div className="signup-box">
                    <div className="signup-box-left">
                        <div className="signup-logo">
                            <img src="./img/House-haunt-white.png" alt="House Haunt logo" />
                        </div>
                    </div>

                    <div className="signup-box-right">
                        <div className="login-form signup-form">
                            <form className='form' onSubmit={handleLogin} >
                                <h2>Login</h2>
                                
                                <input
                                type="email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                />

                                
                                <div className="password">
                                    <input 
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    />

                                    <span className='password-eye' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                

                                <div className="form-button-container">
                                    <button type="submit" className='button primary-form-button' >{loading ? "Logginng" : "Login"}</button>
                                </div>

                            </form>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
     );
}

export default Login;