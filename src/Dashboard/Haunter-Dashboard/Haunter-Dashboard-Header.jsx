import { useState, useEffect } from 'react';
import './Haunter-Dashboard-Header.css'


function HaunterDashboardHeader() {
    const [name, setName] = useState(null) // USERS NAME FROM LOCALSTORAGE
    
    useEffect(() => {
        const usersName = localStorage.getItem("name");
        if (usersName) {
            setName(usersName);
        }
    }, []);


    return ( 
        <div className="agent-dashboard-header">
            <div className="dashboard-header-content">
                <div className="greeting">
                    <div className="greating-icon">
                        <img src="../img/icons/user-profile.png" alt="user profile icon" />
                    </div>

                    <div className="user-info">
                        <p className='welcome' >Welcome</p>

                        <p className='username' >{name}</p>                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HaunterDashboardHeader;