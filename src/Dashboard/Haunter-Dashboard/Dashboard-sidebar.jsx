import { Logout } from '../Logout';
import '../Dashboard-sidebar.css'

function DashboardSidebar({section, setSection}) {
    const handleLogout = Logout()
    return ( 
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-image">
                    <img src="../img/House-haunt-white.png" alt="House Haunt logo" />
                </div>

                <div className="sidebar-sections">
                    <div className="sidebar-option"
                    onClick={() => setSection("Feeds")}
                    style={{
                        color: section === "Feeds" ? "black" : "white",
                        backgroundColor: section === "Feeds" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><i className="fa-solid fa-square-rss"  ></i></div>
                        <p>Feeds</p>
                    </div>

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

                    {/* WALLET */}
                    <div className="sidebar-option"
                    onClick={() => setSection("Wallet")}
                    style={{
                        color: section === "Wallet" ? "black" : "white",
                        backgroundColor: section === "Wallet" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><i className="fa-solid fa-user" ></i></div>
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
            </div>
        </div>
     );
}

export default DashboardSidebar;