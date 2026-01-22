import { useState } from 'react';
import KYC from '../KYC.jsx';
import HaunterDashboardHeader from './Haunter-Dashboard-Header';
import HaunterFeed from './Haunter-Feed';
import HaunterProfile from './Haunter-Profile';
import Wallet from './Haunter-Wallet';
import '../Dashboard-Content.css'
import Loading from '../../component/Loading';
import Chat from '../Chat.jsx';


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

                {section === 'Chat' && (
                    <Chat />
                )}

                {section === "Wallet" &&
                    <div className="wallet">
                        <Wallet setLoading={setLoading} />
                    </div>
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