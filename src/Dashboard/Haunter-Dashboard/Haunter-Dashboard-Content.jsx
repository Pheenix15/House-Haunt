import KYC from '../KYC';
import HaunterDashboardHeader from './Haunter-Dashboard-Header';
import HaunterFeed from './Haunter-Feed';
import HaunterProfile from './Haunter-Profile';
import Wallet from './Haunter-Wallet';
import '../Dashboard-Content.css'


function HaunterDashboardContent({section, setSidebarVisible}) {
    return ( 
        <div className="dashboard-content">
            <div className="dashbord-content-container">
        
                <HaunterDashboardHeader setSidebarVisible={setSidebarVisible} />
                
                <div className="dashboard-section-content">
                    {section === "Feeds" &&
                        <div className="feeds-container">
                            <div className="feeds">
                                <HaunterFeed />
                            </div>
                        </div>
                    }

                    {section === "Profile" &&
                        <div className="profile">
                            <HaunterProfile />
                        </div>
                    }

                    {section === "Wallet" &&
                        <div className="wallet">
                            <Wallet />
                        </div>
                    }

                    {section === "KYC" &&
                        <KYC />
                    }
                </div>
            </div>
            
        </div>
    );
}

export default HaunterDashboardContent;