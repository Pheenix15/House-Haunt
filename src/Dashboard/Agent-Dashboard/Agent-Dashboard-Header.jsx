import { useState, useEffect, useRef } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import { HiBellAlert } from "react-icons/hi2";
import { HiMiniUser } from "react-icons/hi2";
import axios from 'axios';
import { formatDate } from '../../utilities/formatDate';
import { useAlert } from '../../Context/AlertContext';
import '../Dashboard-Header.css'


function AgentDashboardHeader({setSidebarVisible, section}) {
    const [name, setName] = useState(null) // USERS NAME FROM LOCALSTORAGE
    const notificationRef = useRef(null); //REF TO NOTIFICATION CONTAINER
    const [notifications, setNotifications] = useState([]) //NOTIFICATIONS
    const [totalNotifications, setTotalNotifications] = useState(0) // NUMBER OF NOTIFICATIONS
    const [openNotification, setOpenNotification] = useState(false) //OPENS NOTIFICATIONS
    const { showSuccess, showFail } = useAlert()

    useEffect(() => {
        const usersName = localStorage.getItem("name");
        if (usersName) {
            setName(usersName);
        }
    }, []);


    //NOTIFICATIONS
    // Get Notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notificationResponse = await axios.get('/api/notifications/')

                const notificationData = notificationResponse.data
                console.log(notificationResponse)

                setNotifications(notificationData.notifications)

            } catch (error) {

            }
        }

        fetchNotifications()
    }, [])

    // Notification Actions
    const readNotification = async (notificationId) => {
        // Mark notification as read
        try {
            const response = await axios.patch(`/api/notifications/mark-read/${notificationId}`)
            // Update local state to reflect change
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification.id === notificationId
                        ? { ...notification, is_read: true }
                        : notification
                )
            );

            console.log('Notification marked as read:', response.data);
        } catch (error) {
            console.log('Error marking notifications as read:', error);

            showFail("Failed to mark notifications as read.")
        }
    }

    const markAllAsRead = async () => {
        // Mark all notifications as read
        try {
            const response = await axios.patch('/api/notifications/mark-all-read')
            // Update local state to reflect change
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => ({ ...notification, is_read: true }))
            );
            console.log('All notifications marked as read:', response.data);
        } catch (error) {
            console.log('Error marking all notifications as read:', error);
            showFail("Failed to mark all notifications as read.")
        }
    }

    // Close notification on outside click
    useEffect(() => {
    const handleClickOutside = (event) => {
        // if open AND click is outside the component
        if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
        ) {
        setOpenNotification(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("touchstart", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        // document.removeEventListener("touchstart", handleClickOutside);
    };
    }, []);



    return ( 
        <div className="dashboard-header">
            <div className="dashboard-header-content">
                <div className="sidebar-menu-icon">
                    <HiBars3BottomRight onClick={() => setSidebarVisible(true)} />
                </div>

                <div className="header-title">
                    <h2>{section}</h2>
                </div>

                <div className="dashboard-header-right">
                    <div className="dashboard-notification-bell">
                        <HiBellAlert 
                            className='notification-bell'
                            onClick={() => setOpenNotification(prev => !prev)}
                            // onTouchStart={() => setOpenNotification(prev => !prev)}
                        />

                        <div className={notifications.filter(notification => !notification.is_read).length === 0 ? " " : "notification-circle"}>
                            {/* Number of unread notifications */}
                            <p>
                                {notifications.filter(notification => !notification.is_read).length === 0 ? " " : notifications.filter(notification => !notification.is_read).length}
                                
                            </p>
                        </div>
                    </div>

                    <div className="greeting">
                        {/* <div className="greeting-icon">
                            <img src="../img/users/profile-1.png" alt="Admin-image" />
                        </div> */}

                        <div className="user-info">
                            <p className='username' >{name}</p>                        
                        </div>
                    </div>
                </div>

                {openNotification && (
                    <div className="notifications-container" ref={notificationRef} >
                        <div className="notifications-heading">
                            <h3>Notifications</h3>

                            {notifications.length > 0 && (
                                <p className="mark-all-read blue-link bold"
                                    onClick={() => markAllAsRead()}
                                >
                                    Mark as read
                                </p>
                            )}
                        </div>
                        {notifications.length === 0 ? (
                            <div className='no-notification' ><p>You have no notifications</p></div>
                        ) : (
                            <div className='notifications' >
                                {notifications.map((notification) => (
                                    <div key={notification.id} 
                                        className="notification"
                                        onClick={() => {
                                            // Mark as Read
                                            readNotification(notification.id);
                                        }}
                                        style={{
                                            backgroundColor: notification.is_read === false ? "var(--mainWhite) " : "var(--backgroundGray)"
                                        }}
                                    >
                                        <p className="message">
                                            {notification.message}
                                        </p>

                                        <p className="created-date">
                                            {formatDate(notification.created_at)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div> 
                )}
            </div>
        </div>
    );
}

export default AgentDashboardHeader;