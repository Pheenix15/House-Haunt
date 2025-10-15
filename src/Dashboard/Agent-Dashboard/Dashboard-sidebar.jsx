import './Dashboard-sidebar.css'

function DashboardSidebar({setSection}) {
    return ( 
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-image">
                    <img src="../img/House-haunt-white.png" alt="House Haunt logo" />
                </div>

                <div className="sidebar-sections">
                    <div className="sidebar-option"onClick={() => setSection("Feeds")}>
                        <div className="sidebar-icon"><img src="../img/icons/feeds.png" alt="feeds icon" /></div>
                        <p>Feeds</p>
                    </div>

                    <div className="sidebar-option"onClick={() => setSection("Properties")}>
                        <div className="sidebar-icon"><img src="../img/icons/House-owner.png" alt="feeds icon" /></div>
                        <p>Properties</p>
                    </div>

                    <div className="sidebar-option"onClick={() => setSection("Profile")}>
                        <div className="sidebar-icon"><img src="../img/icons/Profile.png" alt="feeds icon" /></div>
                        <p>Profile</p>
                    </div>

                    <div className="sidebar-option"onClick={() => setSection("Transactions")}>
                        <div className="sidebar-icon"><img src="../img/icons/Transaction.png" alt="feeds icon" /></div>
                        <p>Transactions</p>
                    </div>

                    <div className="sidebar-option"onClick={() => setSection("History")}>
                        <div className="sidebar-icon"><img src="../img/icons/History.png" alt="feeds icon" /></div>
                        <p>History</p>
                    </div>

                    <div className="sidebar-option"onClick={() => setSection("KYC")}>
                        <div className="sidebar-icon"><img src="../img/icons/KYC.png" alt="feeds icon" /></div>
                        <p>KYC</p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DashboardSidebar;