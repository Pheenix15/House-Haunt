import KYC from '../KYC';
import AgentDashboardHeader from './Agent-Dashboard-Header';
import Posts from './Agent-Posts';
import AgentProfile from './Agent-Profile';
import '../Dashboard-Content.css'


function AgentDashboardContent({section, setSidebarVisible}) {
    return ( 
        <div className="dashboard-content">
            <div className="dashboard-content-container">
        
                <AgentDashboardHeader setSidebarVisible={setSidebarVisible} />
                
                <div className="dashboard-section-content">
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