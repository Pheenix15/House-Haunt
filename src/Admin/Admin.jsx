import { useState } from "react";
import AdminContent from "./Admin-Content";
import AdminHeader from "./Admin-Header";
import AdminSidebar from "./Admin-Sidebar";
import "./Admin.css"

function Admin() {
    const [sidebarSection, setSidebarSection] = useState("Agents")
    const [sidebarVisible, setSidebarVisible] = useState(false) // STATE FOR SIDEBAR IN MOBILE VIEW

    return ( 
        <div className="admin">
            <div className="admin-top">
                <AdminHeader setSidebarVisible={setSidebarVisible} />
            </div>
            
            <div className="admin-bottom">
                <AdminSidebar sidebarSection={sidebarSection} setSidebarSection={setSidebarSection} sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
                <AdminContent sidebarSection={sidebarSection} setSidebarSection={setSidebarSection} />
            </div>
            
        </div>
    );
}

export default Admin;