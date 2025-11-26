import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css"
import { registerHaunter } from "../Api/Haunter-Signup";

function Signup() {
    const [userRole, setUserRole] = useState("agent") //Role of the user signingup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); //STATE TO REVIEAL PASSWORD
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false) //LOADING STATE
    
    const navigate = useNavigate();
    const location = useLocation();

    // RETRIVE userRole FROM HOMEPAGE SIGNUP BUTTON
    useEffect(() => {
        if (location.state?.role) {
        setUserRole(location.state.role);
        }
    }, [location.state]);

    const formData = {
        username: `${firstName} ${lastName}`,
        email,
        password,
        role: userRole
    }
    
    const submitSignupForm = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            console.log(formData)
            const result = await registerHaunter(formData);
            console.log("Registration response:", result);

            navigate('/Login')
            setLoading(false)
        } catch (err) {
            if (err.response) {
                console.error("Backend returned an error:", err.response.status, err.response.data);
            } else {
                console.error("Request failed:", err.message);
            } 
        }
        
    };


    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-box">
                    <div className="signup-box-left">
                        <div className="signup-logo">
                            <img src="./img/House-haunt-white.png" alt="House Haunt logo" />
                        </div>
                    </div>
                    <div className="signup-box-right">
                        <div className="signup-box-button">
                            <button 
                                className="signup-button agent-signup"
                                onClick={() => setUserRole("agent")}
                                style={{
                                    backgroundColor: userRole === "agent" ? "var(--backgroundGray)" : "var(--mainBlue)",
                                    color: userRole === "agent" ? "var(--mainBlack)" : "var(--mainWhite)"
                                }} 
                            >
                                Agents
                            </button>

                            <button 
                                className="signup-button haunter-signup"
                                onClick={() => setUserRole("haunter")}
                                style={{
                                    backgroundColor: userRole === "haunter" ? "var(--backgroundGray)" : "var(--mainBlue)",
                                    color: userRole === "haunter" ? "var(--mainBlack)" : "var(--mainWhite)",
                                }} 
                            >
                                House Haunter
                            </button>
                        </div>

                        <div className="signup-form">
                            
                            {userRole === "haunter" ? (
                                // Haunters Signup Form
                                <form className='form' onSubmit={submitSignupForm} >
                                    <h2>Signup as a haunter</h2>
                                    <div className="fullname">
                                        <input 
                                        type="text"
                                        placeholder='First Name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required 
                                        />

                                        <input 
                                        type="text"
                                        placeholder='Last Name'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required 
                                        />
                                    </div>
                                    

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
                                        <button type="submit" className='button primary-form-button' >{loading ? "Processing" : "Signup"}</button>
                                    </div>

                                </form>
                            ) : (
                                // Agent Signup Form
                                <form className='form' onSubmit={submitSignupForm} >
                                    <h2>Signup as an agent</h2>
                                    <div className="fullname">
                                        <input 
                                        type="text"
                                        placeholder='First Name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required 
                                        />

                                        <input 
                                        type="text"
                                        placeholder='Last Name'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required 
                                        />
                                    </div>
                                    

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
                                        <button type="submit" className='button primary-form-button' >{loading ? "Processing" : "Signup"}</button>
                                        {/* <button type="submit" className='button primary-form-button' onClick={() => testConnection()} >Signup</button> */}
                                    </div>

                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;