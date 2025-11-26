import { useState } from 'react';
import DashboardSidebar from './Dashboard-sidebar';
import './Dashboard-Agent.css'
import AgentDashboardContent from './Agent-Dashboard-Content';

function DashboardAgent() {
    const [section, setSection] = useState("Profile")
    const [sidebarVisible, setSidebarVisible] = useState(false) // STATE FOR SIDEBAR IN MOBILE VIEW

    return ( 
        <div className="agent-dashboard">
            <div className="agent-dashboard-container">
                <DashboardSidebar section={section} setSection={setSection} sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
                <AgentDashboardContent section={section} setSidebarVisible={setSidebarVisible} />
            </div>
            
        </div>
     );
}

export default DashboardAgent;