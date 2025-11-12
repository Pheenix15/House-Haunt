import { useState, useEffect } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import '../Dashboard-Header.css'


function HaunterDashboardHeader({setSidebarVisible}) {
    const [name, setName] = useState(null) // USERS NAME FROM LOCALSTORAGE
    
    // GET THE USERS NAME FROM LOCALSTORAGE
    useEffect(() => {
        const usersName = localStorage.getItem("name");
        if (usersName) {
            setName(usersName);
        }
    }, []);


    return ( 
        <div className="dashboard-header">
            <div className="dashboard-header-content">
                <div className="sidebar-menu-icon">
                    <HiBars3BottomRight onClick={() => setSidebarVisible(true)} />
                </div>
                <div className="header-title">
                    <h2>Hunter Dashboard</h2>
                </div>
                <div className="greeting">
                    <div className="greeting-icon">
                        <img src="../img/icons/user-profile.png" alt="user profile icon" />
                    </div>

                    <div className="user-info">
                        <p className='username' >Welcome {name}</p>                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default HaunterDashboardHeader;