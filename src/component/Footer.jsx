import "./Footer.css"

function Footer() {
    return ( 
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                    <img src="img/House-haunt-white.png" alt="house haunt logo with house haunt text" />
                </div>

                <div className="footer-social-link">
                    <div className="instagram"></div>
                    <div className="twitter"></div>
                    
                </div>
            </div>

            <hr />

            <div className="footer-bottom">
                <div className="copyright">
                    <p>&copy; house haunt {new Date().getFullYear()}.</p>
                </div>
                
            </div>
            
        </footer>
     );
}

export default Footer;