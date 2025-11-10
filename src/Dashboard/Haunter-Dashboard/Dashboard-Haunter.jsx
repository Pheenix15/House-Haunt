import { useState } from 'react';
import DashboardSidebar from './Dashboard-sidebar';
import './Dashboard-Haunter.css'
import HaunterDashboardContent from './Haunter-Dashboard-Content';

function DashboardHaunter() {
    const [section, setSection] = useState("Feeds")

    return ( 
        <div className="haunter-dashboard">
            <div className="haunter-dashboard-container">
                <DashboardSidebar section={section} setSection={setSection} />
                <HaunterDashboardContent section={section} />
            </div>
            
        </div>
     );
}

export default DashboardHaunter;