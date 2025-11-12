import { useState } from 'react';
import DashboardSidebar from './Dashboard-sidebar';
import './Dashboard-Haunter.css'
import HaunterDashboardContent from './Haunter-Dashboard-Content';

function DashboardHaunter() {
    const [section, setSection] = useState("Feeds")
    const [sidebarVisible, setSidebarVisible] = useState(false) // STATE FOR SIDEBAR IN MOBILE VIEW

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