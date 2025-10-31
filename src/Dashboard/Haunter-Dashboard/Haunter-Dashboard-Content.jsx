import KYC from '../KYC';
import HaunterDashboardHeader from './Haunter-Dashboard-Header';
import HaunterFeed from './Haunter-Feed';
import './Haunter-Dashboard-Content.css'
import HaunterProfile from './Haunter-Profile';
import Wallet from './Haunter-Wallet';

function HaunterDashboardContent({section}) {
    return ( 
        <div className="agent-dashboard-content">
            <div className="agent-content-container">
        
                <HaunterDashboardHeader />
                
                <div className="dashboard-content">
                    {section === "Feeds" &&
                        <div className="feeds-container">
                            <div className="feeds">
                                <HaunterFeed />
                            </div>
                        </div>
                    }

                    {section === "Profile" &&
                        <div className="properties">
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