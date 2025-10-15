import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css"
import { testConnection } from "../api";

function Signup() {
    const [userRole, setUserRole] = useState("Agent") //Role of the user signingup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); //STATE TO REVIEAL PASSWORD
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
                                onClick={() => setUserRole("Agent")}
                                style={{
                                    backgroundColor: userRole === "Agent" ? "var(--backgroundGray)" : "var(--mainBlack)",
                                    color: userRole === "Agent" ? "var(--mainBlack)" : "var(--mainWhite)"
                                }} 
                            >
                                Agents
                            </button>

                            <button 
                                className="signup-button haunter-signup"
                                onClick={() => setUserRole("House Haunter")}
                                style={{
                                    backgroundColor: userRole === "House Haunter" ? "var(--backgroundGray)" : "var(--mainBlack)",
                                    color: userRole === "House Haunter" ? "var(--mainBlack)" : "var(--mainWhite)",
                                }} 
                            >
                                House Haunter
                            </button>
                        </div>

                        <div className="signup-form">
                            <h2>Signup</h2>
                            {userRole === "House Haunter" ? (
                                // Haunters Signup Form
                                <form className='form' >
                                    
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

                                    <input
                                    type="tel"
                                    placeholder='Phone Number'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                                        <button type="submit" className='button primary-form-button' >Signup</button>
                                    </div>

                                </form>
                            ) : (
                                // Agent Signup Form
                                <form className='form' >
                                    
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

                                    <input
                                    type="tel"
                                    placeholder='Phone Number'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                                        <Link to='/Dashboard-Agent' ><button type="submit" className='button primary-form-button' >Signup</button></Link>
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