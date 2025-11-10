import { useState } from 'react';
import { Logout } from '../Logout';
import '../Dashboard-sidebar.css'

function DashboardSidebar({section, setSection}) {
    const [openSidebar, setOpenSidebar] = useState(true) //OPENS SIDEBAR

    const handleLogout = Logout()
    return ( 
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-top">
                    <div 
                        className="sidebar-image"
                        style={{
                            width: openSidebar ? "150px" : "unset"
                        }}
                    >
                        {openSidebar ? (
                            <img src="../img/House-haunt-white.png" alt="House Haunt logo" />
                        ) : (
                            <></>
                        )}
                        
                    </div>

                    <div className="close-arrow"
                        onClick={() => setOpenSidebar(prev => !prev)}
                    >
                        <i className= {openSidebar ? "fa-solid fa-arrow-left" : "fa-solid fa-arrow-right" }></i>
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
                                <div className="sidebar-icon"><i className="fa-solid fa-user" ></i></div>
                                <p>Profile</p>
                            </div>

                            {/* POSTS */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Posts")}
                            style={{
                                color: section === "Posts" ? "black" : "white",
                                backgroundColor: section === "Posts" ? "white" : "transparent",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><i className="fa-solid fa-square-rss"  ></i></div>
                                <p>Posts</p>
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
                                <div className="sidebar-icon"><i className="fa-solid fa-wallet" ></i></div>
                                <p>Wallet</p>
                            </div>

                            {/* TRANSACTION */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Transactions")}
                            style={{
                                color: section === "Transactions" ? "black" : "white",
                                backgroundColor: section === "Transactions" ? "white" : "black",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><i className="fa-solid fa-money-bill" ></i></div>
                                <p>Transactions</p>
                            </div>

                            {/* HISTORY */}
                            <div className="sidebar-option"
                            onClick={() => setSection("History")}
                            style={{
                                color: section === "History" ? "black" : "white",
                                backgroundColor: section === "History" ? "white" : "black",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><i className="fa-solid fa-clock-rotate-left" ></i></div>
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
                                <div className="sidebar-icon"><i className="fa-solid fa-user-check" ></i></div>
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
                                <div className="sidebar-icon" ><i className="fa-solid fa-arrow-right-from-bracket" ></i></div>
                                <p>Logout</p>
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
                                <div className="sidebar-icon"><i className="fa-solid fa-user" ></i></div>
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
                                <div className="sidebar-icon"><i className="fa-solid fa-square-rss"  ></i></div>
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
                                <div className="sidebar-icon"><i className="fa-solid fa-wallet" ></i></div>
                            </div>

                            {/* TRANSACTION */}
                            <div className="sidebar-option"
                            onClick={() => setSection("Transactions")}
                            style={{
                                color: section === "Transactions" ? "black" : "white",
                                backgroundColor: section === "Transactions" ? "white" : "black",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><i className="fa-solid fa-money-bill" ></i></div>
                            </div>

                            {/* HISTORY */}
                            <div className="sidebar-option"
                            onClick={() => setSection("History")}
                            style={{
                                color: section === "History" ? "black" : "white",
                                backgroundColor: section === "History" ? "white" : "black",
                                transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                            }}
                            >
                                <div className="sidebar-icon"><i className="fa-solid fa-clock-rotate-left" ></i></div>
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
                                <div className="sidebar-icon"><i className="fa-solid fa-user-check" ></i></div>
                            </div>

                            {/* LOGOUT */}
                            <div className="sidebar-option"
                            role='button'
                            onClick={handleLogout}
                            style={{
                                color: "white"
                            }}
                            >
                                <div className="sidebar-icon" ><i className="fa-solid fa-arrow-right-from-bracket" ></i></div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
     );
}

export default DashboardSidebar;