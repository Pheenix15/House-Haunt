import { Link } from 'react-router-dom';
import './404-not-found.css'

function EmptyPage() {
    return ( 
        <div className="empty-page">
            <div className="center-logo">
                <img src="./img/House-haunt-black.png" alt="house haunt logo" />
            </div>

            <div className="center-text">
                <p>There is no data for this page yet!! <br /> <br /> <span className="empty-page-link"><Link to='/' >Return to Homepage</Link></span></p>
            </div>
            
        </div>
     );
}

export default EmptyPage;