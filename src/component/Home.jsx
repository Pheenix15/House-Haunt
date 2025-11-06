import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Nav from './Nav';
import './Home.css'
import Footer from './Footer';

function Home() {

    // BACKGROUND IMAGE CONTROLS
    const backgroundImages = [
        "./img/House-1.png",
        "./img/House-2.png",
    ]

    const [index, setIndex] = useState(0);
    const [openNav, setOpenNav] = useState(false) //OPENS MOBILE NAV

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 6500);// changes every 1.5s
        return () => clearInterval(interval)
    }, []);

    return ( 
        <div className="home-page">
            <section className="hero">
                {backgroundImages.map((img, i) => (
                    <div 
                        key={i}
                        className={`hero-bkg ${i === index ? "active" : ""}`}
                        style={{
                            backgroundImage: `linear-gradient(to right,  rgba(255,255,255,1),  rgba(255,255,255,1),  rgba(255,255,255,0)), url(${img})`,
                        }}
                    />
                ))}
                
                <Nav/>

                <div className="hero-text">
                    <h1>Let us help you find that house you crave and desire</h1>
                    <p>Linking you up to direct owners. No outrageous agent fee</p>
                </div>
            </section>

            <section className="sign-up-section">
                <div className="home-signup agent-signup">
                    <div className="agent-image"><img src="./img/Agent.png" alt="a 3d smiling man wearing a suit and holding a model of a house" /></div>

                    <div className="home-signup-text">
                        <p>Linking you up to direct owners. No outrageous agent fee</p>
                        <button
                        className='button home-signup-button'
                        onClick={() => navigate('/Signup', {state: {role: 'agent'}})}
                        >
                            Signup as an Agent
                        </button>
                    </div>
                </div>
                <div className="home-signup haunter-signup">
                    <div className="agent-image"><img src="./img/Haunter.png" alt="a 3d smiling man wearing a suit and holding a model of a house" /></div>

                    <div className="home-signup-text">
                        <p>Linking you up to direct owners. No outrageous agent fee</p>
                        <button
                        className='button home-signup-button'
                        onClick={() => navigate('/Signup', {state: {role: 'haunter'}})}
                        >
                            Signup as a House haunter
                        </button>
                    </div>
                </div>
            </section>

            <section className="testimonial-section">
                <h2>Testimonial</h2>
                <div className="testimonials-container">

                    <div className="testimonials-card-container">
                        <div className="testimonial-card">
                            <div className="users-image">
                                <img src="./img/users/user-1.jpg" alt="user-1" />
                            </div>
                            <div className="users-comment">
                                <div className="user-info">
                                    {/* Users Name */}
                                    <p>User Name</p>
                                </div>
                                <div className="user-review">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo minima blanditiis amet similique doloremque enim deserunt quidem? Ullam, incidunt eum.</p>
                                </div>
                            </div>

                        </div>

                        <div className="testimonial-card">
                            <div className="users-image">
                                <img src="./img/users/user-2.jpg" alt="user-1" />
                            </div>
                            <div className="users-comment">
                                <div className="user-info">
                                    {/* Users Name */}
                                    <p>User Name</p>
                                </div>
                                <div className="user-review">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo minima blanditiis amet similique doloremque enim deserunt quidem? Ullam, incidunt eum.</p>
                                </div>
                            </div>

                        </div>

                        <div className="testimonial-card">
                            <div className="users-image">
                                <img src="./img/users/user-3.jpg" alt="user-1" />
                            </div>
                            <div className="users-comment">
                                <div className="user-info">
                                    {/* Users Name */}
                                    <p>User Name</p>
                                </div>
                                <div className="user-review">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo minima blanditiis amet similique doloremque enim deserunt quidem? Ullam, incidunt eum.</p>
                                </div>
                            </div>

                        </div>

                        {/* DUPLICATE CARDS */}
                        <div className="testimonial-card">
                            <div className="users-image">
                                <img src="./img/users/user-1.jpg" alt="user-1" />
                            </div>
                            <div className="users-comment">
                                <div className="user-info">
                                    {/* Users Name */}
                                    <p>User Name</p>
                                </div>
                                <div className="user-review">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo minima blanditiis amet similique doloremque enim deserunt quidem? Ullam, incidunt eum.</p>
                                </div>
                            </div>

                        </div>

                        <div className="testimonial-card">
                            <div className="users-image">
                                <img src="./img/users/user-2.jpg" alt="user-1" />
                            </div>
                            <div className="users-comment">
                                <div className="user-info">
                                    {/* Users Name */}
                                    <p>User Name</p>
                                </div>
                                <div className="user-review">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo minima blanditiis amet similique doloremque enim deserunt quidem? Ullam, incidunt eum.</p>
                                </div>
                            </div>

                        </div>

                        <div className="testimonial-card">
                            <div className="users-image">
                                <img src="./img/users/user-3.jpg" alt="user-1" />
                            </div>
                            <div className="users-comment">
                                <div className="user-info">
                                    {/* Users Name */}
                                    <p>User Name</p>
                                </div>
                                <div className="user-review">
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo minima blanditiis amet similique doloremque enim deserunt quidem? Ullam, incidunt eum.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
     );
}

export default Home;