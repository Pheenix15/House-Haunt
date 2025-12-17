import { useState } from "react";
import AdminAgents from "./Admin-Agents";
import AdminHouses from "./Admin-Houses";
import AdminHunters from "./Admin-Hunters";
import AdminKYC from "./Admin-KYC";
import Loading from '../component/Loading';
import "./Admin-Content.css"


function AdminContent({sidebarSection, setSidebarSection}) {
    const [loading, setLoading] = useState(false)
    

    return ( 
        <div className="admin-content">
            {loading && (
                <Loading />
            )}
            {sidebarSection === "Agents" ? (
                <AdminAgents setLoading={setLoading} />
            ) : sidebarSection === "Hunters" ? (
                <AdminHunters setLoading={setLoading} />
            ) : sidebarSection === "Houses" ? (
                <AdminHouses setLoading={setLoading} />
            ) : (
                <AdminKYC />
            )}
        </div>
    );
}

export default AdminContent;