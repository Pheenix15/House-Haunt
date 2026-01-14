import { useState } from 'react';
import KYC from '../KYC.jsx';
import AgentDashboardHeader from './Agent-Dashboard-Header';
import Posts from './Agent-Posts';
import AgentProfile from './Agent-Profile';
import '../Dashboard-Content.css'
import Transaction from './Agent-Transaction';
import AgentWallet from './Agent-Wallet';
import Loading from '../../component/Loading';


function AgentDashboardContent({section, setSidebarVisible}) {
    const [loading, setLoading] = useState(false);

    return ( 
        <div className="dashboard-content">
            <AgentDashboardHeader setSidebarVisible={setSidebarVisible} />
            
            <div className="dashboard-section-content">
                {section === "Posts" &&
                    <Posts setLoading={setLoading} loading={loading} />
                }

                {section === "Profile" &&
                    <AgentProfile setLoading={setLoading} />
                }

                {section === "Transactions" &&
                    <Transaction setLoading={setLoading} />
                }

                {section === "Wallet" &&
                    <AgentWallet setLoading={setLoading} />
                }

                {section === "KYC" &&
                    <KYC />
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

export default AgentDashboardContent;