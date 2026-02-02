import { useEffect, useState } from 'react';
import DashboardSidebar from './Dashboard-sidebar';
import './Dashboard-Haunter.css'
import HaunterDashboardContent from './Haunter-Dashboard-Content';

function DashboardHaunter() {
    const [section, setSection] = useState(() => {
        // Render once on initial load
        const stored = localStorage.getItem("sidebarSection");
        // console.log('[DashboardHaunter] initial sidebarSection from localStorage:', stored);For Debugging
        return stored || "Feeds";
    }); // STATE FOR SIDEBAR SECTION
    const [sidebarVisible, setSidebarVisible] = useState(false) // STATE FOR SIDEBAR IN MOBILE VIEW

    useEffect(() => {
        // console.log('[DashboardHaunter] writing sidebarSection to localStorage:', section); For Debugging
        localStorage.setItem("sidebarSection", section);
    }, [section])

    return ( 
        <div className="haunter-dashboard">
            <div className="haunter-dashboard-container">
                <DashboardSidebar section={section} setSection={setSection} sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
                <HaunterDashboardContent section={section} setSidebarVisible={setSidebarVisible} />
            </div>
            
        </div>
     );
}

export default DashboardHaunter;