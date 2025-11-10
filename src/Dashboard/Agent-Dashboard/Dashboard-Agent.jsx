import { useState } from 'react';
import DashboardSidebar from './Dashboard-sidebar';
import './Dashboard-Agent.css'
import AgentDashboardContent from './Agent-Dashboard-Content';

function DashboardAgent() {
    const [section, setSection] = useState("Profile")

    return ( 
        <div className="agent-dashboard">
            <div className="agent-dashboard-container">
                <DashboardSidebar setSection={setSection} />
                <AgentDashboardContent section={section} />
            </div>
            
        </div>
     );
}

export default DashboardAgent;