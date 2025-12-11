import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Nav from './Nav';
import Loading from './Loading';
import './Home.css'
import Footer from './Footer';

function Home() {
    const [backgroundImagesIndex, setBackgroundImagesIndex] = useState(0);
    const[activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
    const [howItWorksState, setHowItWorksState] = useState("hunter") //STATE FOR HOW IT WORKS SECTION


    // CHECK IF USER IS LOGGED IN
    const {user, loading} = useAuth();

    // useEffect(() => {
    //     if (loading) return;          // Wait until auth check finishes.
    //     if (!user) return;

        //    If user exists redirect to their dashboard
    //     if (!loading && user.role === "agent") {
    //         navigate('/Dashboard-Agent');
    //     } else if (!loading && user.role === "haunter") {
    //         navigate('/Dashboard-Haunter')
    //     }
    // }, [loading, user]);

    // BACKGROUND IMAGES
    const backgroundImages = [
        // "./img/Hero-houses/House-1.png",
        "./img/Hero-houses/House-2.png",
        "./img/Hero-houses/House-6.png",
        "./img/Hero-houses/House-4.png",
    ]

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundImagesIndex((i) => (i + 1) % backgroundImages.length);
        }, 6500);// changes every 1.5s
        return () => clearInterval(interval)
    }, []);

    // HOW IT WORKS SWITCH
    const handleHowItWorksSwitchToggle = () => {
        setHowItWorksState(prev => (prev === "hunter" ? "agent" : "hunter"));
    };

    // TESTIMONIALS
    const testimonials = [
        {
            id: 0,
            name: 'Anthony Nnadi',
            review: 'Listed my property here and got genuine inquiries within days.',
            image: "./img/users/profile-1.png"
        },

        {
            id: 1,
            name: 'Morenike Boluwatife',
            review: 'Clean interface, verified listings, and I actually saved enough on fees to buy furniture for my new place. Worth every minute spent browsing.',
            image: "./img/users/profile-2.png"
        },

        {
            id: 3,
            name: 'Justin Onwadi',
            review: 'As an agent, I appreciate the fair fee structure. It attracts serious buyers and sellers, making my job easier and more profitable.',
            image: "./img/users/profile-1.png"
        },

        {
            id: 4,
            name: 'Chisom Nnebedum',
            review: 'Transparent, straightforward, and cost-effective. Finally, a platform that puts buyers and renters first instead of squeezing them dry.',
            image: "./img/users/profile-3.png"
        },
    ]

    const activeReview = testimonials[activeTestimonialIndex]

    // LOADING PAGE
    if (loading) return (
        <>
            <Loading />
        </>
    )

    return ( 
        <div className="home-page">
            <section className="hero">
                <Nav/>

                <div className="hero-body">
                    <div className="hero-text">
                        <h1>Let us help you find that house you crave and desire</h1>
                        <p>We Link you up with direct owners. No outrageous agent fee</p>
                    </div>

                    <div className="hero-image">
                        <img src={backgroundImages[backgroundImagesIndex]} alt="appartment building" />
                    </div>
                </div>
            </section>

            {/* HOME SEARCH SECTION */}
            {/* <section className="home-search-section">
                
                <div className="home-search">
                    <div className="home-search-heading">
                        <h2>Search for available houses</h2>
                    </div>

                    <div className="home-search-body">
                        <div className="home-search-boxes">
                            <div className="home-search-box home-search-location">
                                <input type="text" name='Location' placeholder='Location' />
                                <HiMiniMapPin className='search-box-icon' />
                            </div>
                            <div className="home-search-box home-search-price">
                                <input type="number" name='Budget' placeholder='Budget' />
                                <HiCurrencyDollar className='search-box-icon' />
                            </div>
                        </div>

                        <div className="home-search-button">
                            <button>Search Now</button>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* HOW IT WORKS SECTION */}
            <section className="how-it-works-section">
                <div className="how-it-works">
                    <div className="how-it-works-heading">
                        <h2>How It Works</h2>
                    </div>

                    
                    <div className="how-it-works-for">
                        <div className="role-toggle-container">
                            <p className="role-label">For Hunters</p>
                            {/* Toggle Switch */}
                            <label className="toggle">
                                <input
                                type="checkbox"
                                checked={howItWorksState === "agent"}
                                onChange={handleHowItWorksSwitchToggle}
                                />

                                {/* Slider UI */}
                                <span className="slider"></span>
                            </label>

                            {/* Role label */}
                            <p className="role-label">For Agents</p>
                        </div>

                        {howItWorksState === "hunter" ? (
                            <div className="how-it-works-cards">
                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/new-user.png" alt="sign up" />
                                    </div>
                                    <div className="card-text">
                                        <h3>Sign Up</h3>

                                        <p className="card-description">
                                            Sign up and verify your profile to start viewing properties on the platform.
                                        </p>
                                    </div>
                                </div>

                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/search.png" alt="sign up" />
                                    </div>

                                    <div className="card-text">
                                        <h3>Search for Listings</h3>

                                        <p className="card-description">
                                            Browse verified houses and apartments based on your budget and location.
                                        </p>
                                    </div>
                                </div>

                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/communication.png" alt="sign up" />
                                    </div>

                                    <div className="card-text">
                                        <h3>Connect with the Listing Agent</h3>

                                        <p className="card-description">
                                            Connect directly with the listing agent without extra middlemen or inflated fees.
                                        </p>
                                    </div>
                                </div>

                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/key-house.png" alt="sign up" />
                                    </div>

                                    <div className="card-text">
                                        <h3>Secure Your Space</h3>

                                        <p className="card-description">
                                            Schedule a visit, verify the property meets your expectations, and close the deal on your terms.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="how-it-works-cards">
                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/new-user.png" alt="sign up" />
                                    </div>
                                    <div className="card-text">
                                        <h3>Sign Up</h3>

                                        <p className="card-description">
                                            Sign up and verify your profile to start listing properties on the platform.
                                        </p>
                                    </div>
                                </div>

                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/add-house.png" alt="sign up" />
                                    </div>

                                    <div className="card-text">
                                        <h3>Add Your Property Listings</h3>

                                        <p className="card-description">
                                            Upload photos, add pricing, describe the house or apartment, and publish your listing.
                                        </p>
                                    </div>
                                </div>

                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/communication.png" alt="sign up" />
                                    </div>

                                    <div className="card-text">
                                        <h3>Reach Active House Hunters</h3>

                                        <p className="card-description">
                                            Once your listing is verifyed and approved by the admin, it becomes visible to verified house hunters searching for homes.
                                        </p>
                                    </div>
                                </div>

                                <div className="how-it-works-card card">
                                    <div className="how-it-works-icon card-icon">
                                        <img src="./img/icons/deal.png" alt="sign up" />
                                    </div>

                                    <div className="card-text">
                                        <h3>Connect and Close Deals</h3>

                                        <p className="card-description">
                                            Receive inquiries, schedule viewings, and finalize deals faster through a transparent, direct process.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="why-choose-us-section">
                <div className="why-choose-us-heading">
                    <h2>Why Choose Us</h2>
                </div>
                <div className="why-choose-us">

                    <div className="why-choose-us-list">
                        <div className="why-choose-us-card card">
                            <div className="why-choose-us-icon card-icon">
                                <img src="./img/icons/transparency.png" alt="eye in the middle of a square" />
                            </div>

                            <div className="why-choose-us-card-text card-text">
                                <h3>Transparent Listings</h3>

                                <p className="card-description">
                                    Every property comes with clear pricing and real information.
                                </p>
                            </div>
                        </div>

                        <div className="why-choose-us-card card">
                            <div className="why-choose-us-icon card-icon">
                                <img src="./img/icons/dollar-symbol.png" alt="dollar sign" />
                            </div>

                            <div className="why-choose-us-card-text card-text">
                                <h3>Fair Agent Fees</h3>

                                <p className="card-description">
                                    Agents list their properties at honest, affordable rates.
                                </p>
                            </div>
                        </div>

                        <div className="why-choose-us-card card">
                            <div className="why-choose-us-icon card-icon">
                                <img src="./img/icons/key.png" alt="house with key icon" />
                            </div>

                            <div className="why-choose-us-card-text card-text">
                                <h3>For House hunters</h3>

                                <p className="card-description">
                                    Find houses or apartments fast, without paying unnecessary charges.
                                </p>
                            </div>
                        </div>

                        <div className="why-choose-us-card card">
                            <div className="why-choose-us-icon card-icon">
                                <img src="./img/icons/agent.png" alt="agent" />
                            </div>

                            <div className="why-choose-us-card-text card-text">
                                <h3>For Agents</h3>

                                <p className="card-description">
                                    Showcase your listings to active house hunters ready to move.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="why-choose-us-image">
                        <img src="./img/why-us.jpg" alt="A real estate agent and a buyer shaking hands after a successful deal with the house blured in the background." />
                    </div>
                </div>
            </section>

            {/* CTA SECTION OR FEATURED HOUSES SECTION */}
            <section className="cta-section">
                <div className="cta">
                    <div className="cta-text">
                        <h3>Verified Listings Available Now</h3>
                        <p>Real homes. Real agents. Real prices.</p>
                    </div>

                    <div className="cta-button">
                        <button className="button" onClick={() => navigate("/Signup")} >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            {/* SIGN UP */}
            {/* <section className="sign-up-section">
                <div className="home-signup home-agent-signup">
                    <div className="signup-image"><img src="./img/Agent.png" alt="a 3d smiling man wearing a suit and holding a model of a house" /></div>

                    <div className="home-signup-text">
                        <p>List your properties and reach thousands of verified house hunters.</p>
                        <button
                        className='button home-signup-button'
                        onClick={() => navigate('/Signup', {state: {role: 'agent'}})}
                        >
                            Start Listing
                        </button>
                    </div>
                </div>
                <div className="home-signup home-haunter-signup">
                    <div className="signup-image"><img src="./img/Haunter.png" alt="a 3d smiling man wearing a suit and holding a model of a house" /></div>

                    <div className="home-signup-text">
                        <p>Search homes across your preferred areas with no extra fees.</p>
                        <button
                        className='button home-signup-button'
                        onClick={() => navigate('/Signup', {state: {role: 'haunter'}})}
                        >
                            Browse Homes
                        </button>
                    </div>
                </div>
            </section> */}

            <section className="testimonial-section">
                <h2>What Our Users Are Saying</h2>
                <div className="testimonials-container">
                    <div className="testimonials-container-text">
                        <p></p>
                    </div>
                    
                    <div className="testimonials-card-container">
                        <div className="testimonial-text">
                            <div className="review-quote" ><img src="./img/icons/quotation-mark.png" alt="" /></div>
                            <p className="review-text">
                                {activeReview.review}
                            </p>
                        </div>

                        

                        <div className="author">
                            <p className="author-name">{activeReview.name}</p>
                        </div>

                        <div className="author-image-row">
                            {testimonials.map((user, index) => (
                                <img 
                                    key={user.id}
                                    src={user.image} 
                                    alt={user.name}
                                    className={
                                        index === activeTestimonialIndex ? "author-image active" : "author-image"
                                    }
                                    onClick={() => setActiveTestimonialIndex(index)}
                                />
                            ))}
                        </div>
                        
                        {/* <div className="testimonial-card">
                            <div className="user-review">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo minima blanditiis amet similique doloremque enim deserunt quidem? Ullam, incidunt eum.</p>
                            </div>

                            <div className="user">
                                <div className="users-image">
                                    <img src="./img/users/user-1.jpg" alt="user-1" />
                                </div>

                                
                            </div>
                        </div> */}
                        
                    </div>
                    
                </div>
            </section>

            <Footer />
        </div>
     );
}

export default Home;