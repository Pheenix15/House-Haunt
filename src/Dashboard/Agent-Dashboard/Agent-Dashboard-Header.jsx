import { useState, useEffect, useRef } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import { HiBellAlert } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import '../Dashboard-Header.css'
import axios from 'axios';


function AgentDashboardHeader({setSidebarVisible}) {
    const [name, setName] = useState(null) // USERS NAME FROM LOCALSTORAGE
    const notificationRef = useRef(null); //REF TO NOTIFICATION CONTAINER
    const [notifications, setNotifications] = useState([]) //NOTIFICATIONS
    const [totalNotifications, setTotalNotifications] = useState(0) // NUMBER OF NOTIFICATIONS
    const [openNotification, setOpenNotification] = useState(false) //OPENS NOTIFICATIONS
    
    useEffect(() => {
        const usersName = localStorage.getItem("name");
        if (usersName) {
            setName(usersName);
        }
    }, []);

    // GET NOTIFICATIONS
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notificationResponse = await axios.get('/api/notifications/')

                const notificationData = notificationResponse.data

                setNotifications(notificationData.notifications)
                setTotalNotifications(notificationData.total)

            } catch (error) {

            }
        }

        fetchNotifications()
    }, [])

    // useEffect(() => {
    // const handleClickOutside = (event) => {
    //     // if open AND click is outside the component
    //     if (
    //     notificationRef.current &&
    //     !notificationRef.current.contains(event.target)
    //     ) {
    //     setOpenNotification(false);
    //     }
    // };

    // document.addEventListener("mousedown", handleClickOutside);
    // // document.addEventListener("touchstart", handleClickOutside);
    // return () => {
    //     document.removeEventListener("mousedown", handleClickOutside);
    //     // document.removeEventListener("touchstart", handleClickOutside);
    // };
    // }, []);



    return ( 
        <div className="dashboard-header">
            <div className="dashboard-header-content">
                <div className="sidebar-menu-icon">
                    <HiBars3BottomRight onClick={() => setSidebarVisible(true)} />
                </div>

                <div className="header-title">
                    <h2>Agent Dashboard</h2>
                </div>

                <div className="dashboard-header-right">
                    <div className="dashboard-notification-bell">
                        <HiBellAlert 
                            className='notification-bell'
                            onClick={() => setOpenNotification(prev => !prev)}
                            // onTouchStart={() => setOpenNotification(prev => !prev)}
                        />
                    </div>

                    <div className="greeting">
                        {/* Notification Bell(Figure out where to put it) <HiBellAlert /> */}
                        <div className="greeting-icon">
                            <img src="../img/users/profile-1.png" alt="Admin-image" />
                        </div>

                        <div className="user-info">
                            <p className='username' >{name}</p>                        
                        </div>
                    </div>
                </div>

                {/* NOTIFICATION MODAL */}
                {openNotification && (
                    <div className="notifications-container" ref={notificationRef} >
                        {notifications.length === 0 ? (
                            <p className='no-notification' >You have no notifications</p>
                        ) : (
                            <>
                                {notifications.map((notification) => (
                                    <div className="notification">
                                        <h3 className="notification-title">
                                            {notification.title}
                                        </h3>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                    
                    
                )}
            </div>
        </div>
    );
}

export default AgentDashboardHeader;