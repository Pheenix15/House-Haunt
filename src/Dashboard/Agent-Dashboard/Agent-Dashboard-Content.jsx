import KYC from '../KYC';
import AgentDashboardHeader from './Agent-Dashboard-Header';
import './Agent-Dashboard-Content.css'
import Posts from './Agent-Posts';
import AgentProfile from './Agent-Profile';

function AgentDashboardContent({section}) {
    return ( 
        <div className="agent-dashboard-content">
            <div className="agent-content-container">
        
                <AgentDashboardHeader />
                
                <div className="dashboard-content">
                    {section === "Posts" &&
                        <Posts />
                    }

                    {section === "Profile" &&
                        <AgentProfile />
                    }

                    {section === "KYC" &&
                        <KYC />
                    }
                </div>
            </div>
            
        </div>
    );
}

export default AgentDashboardContent;