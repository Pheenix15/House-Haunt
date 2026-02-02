import { useState, useEffect } from 'react';
import DashboardSidebar from './Dashboard-sidebar';
import './Dashboard-Agent.css'
import AgentDashboardContent from './Agent-Dashboard-Content';

function DashboardAgent() {
    const [section, setSection] = useState(() => {
        // Render once on initial load
        const stored = localStorage.getItem("sidebarSection");
        // console.log('[DashboardHaunter] initial sidebarSection from localStorage:', stored); For Debugging
        return stored || "Profile";
    }); // STATE FOR SIDEBAR SECTION
    const [sidebarVisible, setSidebarVisible] = useState(false) // STATE FOR SIDEBAR IN MOBILE VIEW


    useEffect(() => {
        // console.log('[DashboardHaunter] writing sidebarSection to localStorage:', section); For Debugging
        localStorage.setItem("sidebarSection", section);
    }, [section])
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