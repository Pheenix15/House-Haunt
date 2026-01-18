import { useState } from 'react';
import { useLogout } from '../Logout';
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi2";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { HiOutlineWallet } from "react-icons/hi2";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { HiOutlineIdentification } from "react-icons/hi2";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi2";
import '../Dashboard-sidebar.css'

function DashboardSidebar({section, setSection, sidebarVisible, setSidebarVisible}) {
    const [openSidebar, setOpenSidebar] = useState(true) //OPENS SIDEBAR
    

    // Handle Logout
    const {logout, isLogginOut} = useLogout();
    const handleLogout = async () => {
        await logout();
    };
    return ( 
        <div className={sidebarVisible ? "sidebar sidebar-visible" : "sidebar-hidden"}>
            <div className="sidebar-container">
                <div className="sidebar-top">
                    <div 
                        className={openSidebar ? "sidebar-image" : "sidebar-image sidebar-closed"}
                    >
                        {openSidebar ? (
                            <img src="../img/House-haunt-white.png" alt="House Haunt logo" />
                        ) : (
                            <></>
                        )}
                        
                    </div>

                    <div className="close-arrow"
                        onClick={ () => sidebarVisible ? setSidebarVisible(false) : setOpenSidebar(prev => !prev)}
                    >
                        {openSidebar ? <HiOutlineChevronDoubleLeft /> : <HiOutlineChevronDoubleRight />}
                    </div>
                </div>
                

                <div className="sidebar-sections">
                    {openSidebar ? (
                        <div className="open">
                            {/* PROFILE */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Profile")}
                            style={{
                                color: section === "Profile" ? "black" : "white",
                                backgroundColor: section === "Profile" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineUser /></div>
                                <p>Profile</p>
                            </div>

                            {/* FEEDS */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Posts")}
                            style={{
                                color: section === "Posts" ? "black" : "white",
                                backgroundColor: section === "Posts" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineSquare3Stack3D /></div>
                                <p>Posts</p>
                            </div>

                            {/* CONTACT REQUESTS */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Contact Requests")}
                            style={{
                                color: section === "Contact Requests" ? "black" : "white",
                                backgroundColor: section === "Contact Requests" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><IoCall /></div>
                                <p>Contact Requests</p>
                            </div>

                            {/* CHAT */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Chat")}
                            style={{
                                color: section === "Chat" ? "black" : "white",
                                backgroundColor: section === "Chat" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><IoChatbubblesOutline /></div>
                                <p>Chat</p>
                            </div>

                            {/* WALLET */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Wallet")}
                            style={{
                                color: section === "Wallet" ? "black" : "white",
                                backgroundColor: section === "Wallet" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineWallet /></div>
                                <p>Wallet</p>
                            </div>

                            {/* TRANSACTION */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Transactions")}
                            style={{
                                color: section === "Transactions" ? "black" : "white",
                                backgroundColor: section === "Transactions" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineBanknotes /></div>
                                <p>Transactions</p>
                            </div>

                            {/* HISTORY */}
                            <div className="sidebar-option"
                            onClick={() => setSection("History")}
                            style={{
                                color: section === "History" ? "black" : "white",
                                backgroundColor: section === "History" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineNewspaper /></div>
                                <p>History</p>
                            </div>

                            {/* KYC */}
                            <div className="sidebar-option"
                            onClick={() => setSection("KYC")}
                            style={{
                                color: section === "KYC" ? "black" : "white",
                                backgroundColor: section === "KYC" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineIdentification /></div>
                                <p>KYC</p>
                            </div>

                            {/* LOGOUT */}
                            <div className="sidebar-option"
                            role='button'
                            onClick={handleLogout}
                            style={{
                                color: "white"
                            }}
                            >
                                <div className="sidebar-icon" ><HiOutlineArrowLeftStartOnRectangle /></div>
                                <p>{isLogginOut ? "Logging Out" : "Logout"}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="close">
                            {/* PROFILE */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Profile")}
                            style={{
                                color: section === "Profile" ? "black" : "white",
                                backgroundColor: section === "Profile" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineUser /></div>
                            </div>

                            {/* FEEDS */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Feeds")}
                            style={{
                                color: section === "Feeds" ? "black" : "white",
                                backgroundColor: section === "Feeds" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineSquare3Stack3D /></div>
                            </div>

                            {/* CONTACT REQUESTS */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Contact Requests")}
                            style={{
                                color: section === "Contact Requests" ? "black" : "white",
                                backgroundColor: section === "Contact Requests" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><IoCall /></div>
                            </div>

                            {/* CHAT */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Chat")}
                            style={{
                                color: section === "Chat" ? "black" : "white",
                                backgroundColor: section === "Chat" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><IoChatbubblesOutline /></div>
                            </div>

                            {/* WALLET */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Wallet")}
                            style={{
                                color: section === "Wallet" ? "black" : "white",
                                backgroundColor: section === "Wallet" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineWallet /></div>
                            </div>

                            {/* TRANSACTION */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Transactions")}
                            style={{
                                color: section === "Transactions" ? "black" : "white",
                                backgroundColor: section === "Transactions" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineBanknotes /></div>
                            </div>

                            {/* HISTORY */}
                            <div className="sidebar-option"
                            onClick={() => setSection("History")}
                            style={{
                                color: section === "History" ? "black" : "white",
                                backgroundColor: section === "History" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineNewspaper /></div>
                            </div>

                            {/* KYC */}
                            <div className="sidebar-option"
                            onClick={() => setSection("KYC")}
                            style={{
                                color: section === "KYC" ? "black" : "white",
                                backgroundColor: section === "KYC" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><HiOutlineIdentification /></div>
                            </div>

                            {/* LOGOUT */}
                            <div className="sidebar-option"
                            role='button'
                            onClick={handleLogout}
                            style={{
                                color: "white"
                            }}
                            >
                                <div className="sidebar-icon" ><HiOutlineArrowLeftStartOnRectangle /></div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
     );
}

export default DashboardSidebar;