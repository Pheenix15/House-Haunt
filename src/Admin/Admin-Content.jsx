import AdminAgents from "./Admin-Agents";
import AdminHouses from "./Admin-Houses";
import AdminHunters from "./Admin-Hunters";
import AdminKYC from "./Admin-KYC";
import "./Admin-Content.css"

function AdminContent({sidebarSection, setSidebarSection}) {
    return ( 
        <div className="admin-content">
            {sidebarSection === "Agents" ? (
                <AdminAgents />
            ) : sidebarSection === "Hunters" ? (
                <AdminHunters />
            ) : sidebarSection === "Houses" ? (
                <AdminHouses />
            ) : (
                <AdminKYC />
            )}
        </div>
    );
}

export default AdminContent;