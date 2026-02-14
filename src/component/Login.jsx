import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useAlert } from "../Context/AlertContext";
import { IoClose } from "react-icons/io5";
import './Login.css'

function Login() {
    const [resetPasswordModal, setResetPasswordModal] = useState(false) //MODAL TO RESET PASSWORD
    const [usersEmail, setUsersEmail] = useState("") // USERS EMAIL FOR RESET PASSWORD MODAL
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
            

            const loginData = response.data;
            const user = loginData.user; // Extract user data from response
            console.log('Login response:', response.data);


            // Store token and user data to local storage
            localStorage.setItem("token", loginData.token);
            // localStorage.setItem("id", user.id);
            // localStorage.setItem("name", user.username);
            // localStorage.setItem("role", user.role);

            // Rerun auth check
            await refreshAuth();

            // const refreshedUser = await refreshAuth();
            // if (!refreshedUser) {
            //     showFail("Auth refresh failed. No user returned.")
            //     return
            // } DEBUGGING PURPOSES

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

    // Reset Password
    const resetPassword = async () => {
        console.log('Users Email', usersEmail)
        try {
            const resetResponse = await axios.post('/api/auth/forgot-password', {email: usersEmail});

            console.log("Reset Response:", resetResponse)
        } catch (error) {
            console.log('error resetting Password:', error)
        }
    }
    

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
                                    <p className="login-text" >Forgot your password? <span className="blue-link" onClick={() => setResetPasswordModal(true)} >click here to reset it.</span></p>
                                    <button type="submit" className='button primary-form-button'disabled={loading} >{loading ? "Logginng" : "Login"}</button>
                                </div>

                            </form>
                        </div>
                        
                    </div>
                </div>
                
            </div>

            {/* Reset Pqssword Modal */}
            {resetPasswordModal && (
                <div className="modal">
                    <div className="reset-password-modal-heading modal-heading">
                        <h2>Reset Password</h2>

                        <div className="close-button">
                            <IoClose 
                                style={{
                                    color: "#f5f7fa",
                                    fontSize: "1.4em",
                                    cursor: "Pointer",
                                }}
                                onClick={() => {setResetPasswordModal(false); setUsersEmail("")}}
                            />
                        </div>
                    </div>

                    <div className="reset-password-modal-body modal-body">
                        <input
                            type="email"
                            placeholder='Enter your email'
                            value={usersEmail}
                            onChange={(e) => setUsersEmail(e.target.value)}
                            required
                        />

                        <button className="reset-password-button" onClick={() => resetPassword()}>
                            Reset Password
                        </button>
                    </div>
                </div>
            )}
        </div>
     );
}

export default Login;