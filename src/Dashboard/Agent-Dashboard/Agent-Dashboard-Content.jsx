import { useState } from 'react';
import KYC from '../KYC';
import AgentDashboardHeader from './Agent-Dashboard-Header';
import Posts from './Agent-Posts';
import AgentProfile from './Agent-Profile';
import '../Dashboard-Content.css'
import Transaction from './Agent-Transaction';
import AgentWallet from './Agent-Wallet';


function AgentDashboardContent({section, setSidebarVisible}) {
    const [loading, setLoading] = useState(false);

    return ( 
        <div className="dashboard-content">
            <AgentDashboardHeader setSidebarVisible={setSidebarVisible} />
            
            <div className="dashboard-section-content">
                {section === "Posts" &&
                    <Posts setLoading={setLoading} />
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
        </div>
    );
}

export default AgentDashboardContent;