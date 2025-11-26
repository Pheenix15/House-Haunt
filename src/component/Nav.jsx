import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Nav.css'

function Nav() {
    const [openNav, setOpenNav] = useState(false)
    const [isSticky, setIsSticky] = useState(false);// FOR STICKE NAV

    const navigate = useNavigate()

    // KEEPS NAV AT THE TOP OF THE PAGE
    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 150);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return ( 
        <>
            {/* DESKTOP NAV */}
            <nav className= {`${isSticky ? 'sticky-nav' : 'navbar'} desktop-nav`} >
                <div className={isSticky ? "logo-invinsible" : "nav-logo"}><img src="img/logo-black.png" alt="house haunt logo" /></div>
                {/* Sticky Logo */}
                <div className={isSticky ? "nav-logo" : "logo-invinsible"}><img src="img/logo.png" alt="house haunt logo" /></div>
                <div className="nav">
                    <ul className='nav-links-list' >
                        <li className='nav-link' > <Link to= '/About-us' >About Us</Link> </li>
                        <li className='nav-link' > <Link to= '/Properties' >Properties</Link></li>
                        <li className='nav-link' > <Link to= '/Become-a-partner' >Become a partner</Link> </li> 
                        <li className='nav-link' > <Link to= '/Newsletters' >Newsletters</Link> </li>
                        <li className='nav-link' > <Link to= '/Login' >Login</Link> </li>
                        {/* <li className='nav-link' > <Link to= '/Dashboard-Haunter' >Dashboard</Link> </li> */}
                    </ul>
                </div>

                <div className="nav-button">
                    <button className="button nav-search-button" onClick={() => navigate('/Signup', {state: {role: 'haunter'}})} >Find A House</button>
                </div>
            </nav>

            {/* MOBIAL NAV */}
            <nav 
                className= {`${isSticky ? 'sticky-nav' : 'navbar'} mobial-nav`}
                style={{
                    position: isSticky ? 'fixed' : 'relative'
                }}
            >
                <div className="nav-logo"><img src="img/logo-black-100.png" alt="house haunt logo" /></div>

                <div className="search-bar">
                    <input type="search" name="Search" id="" />
                    <button className="button search-button mobile-search-button" ><i className="fa-solid fa-magnifying-glass" style={{color: '#1a73e8'}} ></i></button>
                </div>

                <div className="menu-button" 
                    aria-label={openNav ? "Close menu" : "Open menu"}
                    aria-expanded={openNav}
                    aria-controls="nav-menu"
                    onClick={() => setOpenNav(!openNav)}
                >
                    <button className='button menu-button' >
                        <i 
                            className={`${openNav? 'fa-solid fa-times rotate' : 'fa-solid fa-bars'}`}
                            style={{
                                color: "#1a73e8"
                            }}
                        ></i>
                    </button>
                </div>

                <div className={`nav mobial-nav-list ${openNav ? 'open-nav-list' : ''}`} role="menu" >
                    <ul className='nav-links-list' >
                        <li className='nav-link' > <Link to= '/About-us' >About Us</Link> </li>
                        <li className='nav-link' > <Link to= '/Properties' >Properties</Link></li>
                        <li className='nav-link' > <Link to= '/Become-a-partner' >Become a partner</Link> </li> 
                        <li className='nav-link' > <Link to= '/Newsletters' >Newsletters</Link> </li>
                        <li className='nav-link' > <Link to= '/Login' >Login</Link> </li>
                        {/* <li className='nav-link' > <Link to= '/Dashboard-Haunter' >Dashboard</Link> </li> */}
                    </ul>
                </div>
            </nav>
        </>
     );
}

export default Nav;