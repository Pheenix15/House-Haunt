import { useState } from 'react';
import KYC from '../KYC';
import HaunterDashboardHeader from './Haunter-Dashboard-Header';
import HaunterFeed from './Haunter-Feed';
import HaunterProfile from './Haunter-Profile';
import Wallet from './Haunter-Wallet';
import '../Dashboard-Content.css'
import Loading from '../../component/Loading';


function HaunterDashboardContent({section, setSidebarVisible}) {
    const [loading, setLoading] = useState(false);

    return ( 
        <div className="dashboard-content">
            <HaunterDashboardHeader setSidebarVisible={setSidebarVisible} />
            
            <div className="dashboard-section-content">
                {section === "Feeds" &&
                    <HaunterFeed setLoading={setLoading} />
                }

                {section === "Profile" &&
                    <div className="profile">
                        <HaunterProfile setLoading={setLoading} />
                    </div>
                }

                {section === "Wallet" &&
                    <div className="wallet">
                        <Wallet setLoading={setLoading} />
                    </div>
                }

                {section === "KYC" &&
                    <KYC setLoading={setLoading} />
                }
            </div>

            {loading && (
                <>
                    <Loading />
                </>
            )}
        </div>
    );
}

export default HaunterDashboardContent;