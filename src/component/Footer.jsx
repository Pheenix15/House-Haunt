import { Link } from "react-router-dom";
import "./Footer.css"

function Footer() {
    return ( 
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <img src="img/House-haunt-white.png" alt="house haunt logo with house haunt text" />
                </div>

                <div className="footer-links">
                    <ul className='footer-links-list' >
                        <li className='footer-link' > <Link to= '/Properties' >Properties</Link></li>
                        <li className='footer-link' > <Link to= '/Become-a-partner' >Become a partner</Link> </li> 
                        <li className='footer-link' > <Link to= '/Newsletters' >Newsletters</Link> </li>
                        <li className='footer-link' > <Link to= '/Login' >Login</Link> </li>
                        {/* <li className='nav-link' > <Link to= '/Dashboard-Haunter' >Dashboard</Link> </li> */}
                    </ul>
                </div>

                <div className="footer-social-link">
                    <div className="instagram"></div>
                    <div className="twitter"></div>
                    
                </div>
            </div>

            <hr />

            <div className="footer-bottom">
                <div className="copyright">
                    <p>&copy; house hunt {new Date().getFullYear()}.</p>
                </div>
                
            </div>
            
        </footer>
     );
}

export default Footer;