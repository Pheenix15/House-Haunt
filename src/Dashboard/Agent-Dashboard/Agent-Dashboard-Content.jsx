import AgentDashboardHeader from './Agent-Dashboard-Header';
import './Agent-Dashboard-Content.css'

function AgentDashboardContent({section}) {
    return ( 
        <div className="agent-dashboard-content">
            <div className="agent-content-container">
        
                <AgentDashboardHeader />
                
                <div className="dashboard-content">
                    {section === "Feeds" &&
                        <div className="admin-feeds">
                            <div className="wallet">
                                <div className="wallet-hading">
                                    <h4>Wallet</h4>
                                </div>


                            </div>
                        </div>
                    }

                    {section === "Properties" &&
                        <div className="properties">
                            PROPERTIES
                        </div>
                    }
                </div>
            </div>
            
        </div>
    );
}

export default AgentDashboardContent;