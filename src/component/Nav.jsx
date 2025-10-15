import { useState } from "react";
import { Link } from "react-router-dom";
import './Nav.css'

function Nav() {
    const [openNav, setOpenNav] = useState(false)

    return ( 
        <>
            {/* DESKTOP NAV */}
            <nav className= "navbar desktop-nav">
                <div className="nav-logo"><img src="img/logo-black.png" alt="" /></div>
                <div className="nav">
                    <ul className='nav-links-list' >
                        <li className='nav-link' > <Link to= '/#' >About Us</Link> </li>
                        <li className='nav-link' > <Link to= '/#' >Properties</Link></li>
                        <li className='nav-link' > <Link to= '/Signup' >Sign up</Link> </li>
                        <li className='nav-link' > <Link to= '/Login' >Login</Link> </li>
                        <li className='nav-link' > <Link to= '/#' >Become a partner</Link> </li> 
                        <li className='nav-link' > <Link to= '/#' >Newsletters</Link> </li>
                    </ul>
                </div>

                <div className="search-button">
                    <button className="button" >Search</button>
                </div>
            </nav>

            {/* MOBIAL NAV */}
            <nav className= "navbar mobial-nav">
                <div className="nav-logo"><img src="img/logo-black-100.png" alt="" /></div>

                <div className="search-bar">
                    <input type="search" name="Search" id="" />
                    <button className="button search-button mobile-search-button" ><i className="fa-solid fa-magnifying-glass" style={{color: 'black'}} ></i></button>
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
                                color: "black"
                            }}
                        ></i>
                    </button>
                </div>

                <div className={`nav mobial-nav-list ${openNav ? 'open-nav-list' : ''}`} role="menu" >
                    <ul className='nav-links-list' >
                        <li className='nav-link' > <Link to= '/#' >About Us</Link> </li>
                        <li className='nav-link' > <Link to= '/#' >Properties</Link></li>
                        <li className='nav-link' > <Link to= '/Signup' >Sign up</Link> </li>
                        <li className='nav-link' > <Link to= '/Login' >Login</Link> </li>
                        <li className='nav-link' > <Link to= '/#' >Become a partner</Link> </li> 
                        <li className='nav-link' > <Link to= '/#' >Newsletters</Link> </li>
                    </ul>
                </div>
            </nav>
        </>
     );
}

export default Nav;