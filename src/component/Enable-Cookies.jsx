import { useState, useEffect } from 'react';
import { checkCookiesEnabled } from '../utilities/checkCookies';
import './Enable-Cookies.css';

function EnableCookies() {
    const [cookiesEnabled, setCookiesEnabled] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const enabled = checkCookiesEnabled();
        setCookiesEnabled(enabled);

        // Show notice only if cookies are disabled
        if (!enabled) {
            setShow(true);
        }
    }, []);

    if (!show || cookiesEnabled) return null;

    return (
        <div className="cookie-popup">
            <h2>Cookies Required!!</h2>

            <p>
                This site requires cookies to function properly.
                Cookies are currently disabled in your browser..
                <br />
                <br />
                Please enable cookies and refresh the page to continue.
            </p>

            <button className='reload-page' onClick={() => window.location.reload()}>
                Refresh Page
            </button>
        </div>
    );
}

export default EnableCookies;