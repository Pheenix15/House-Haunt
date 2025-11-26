import { useState, useEffect } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import { HiBellAlert } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import '../Dashboard-Header.css'


function AgentDashboardHeader({setSidebarVisible}) {
    const [name, setName] = useState(null) // USERS NAME FROM LOCALSTORAGE
    
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
                    <h2>Agent Dashboard</h2>
                </div>

                <div className="greeting">
                    {/* Notification Bell(Figure out where to put it) <HiBellAlert /> */}
                    <div className="greeting-icon">
                        <HiMiniUser />
                    </div>

                    <div className="user-info">
                        <p className='username' >Welcome {name}</p>                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AgentDashboardHeader;