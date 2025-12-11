import { useState } from 'react';
import { Logout } from '../Dashboard/Logout';
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { HiOutlineChevronDoubleLeft } from "react-icons/hi2";
import { HiOutlineChevronDoubleRight } from "react-icons/hi2";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import { HiOutlineWallet } from "react-icons/hi2";
import { HiOutlineIdentification } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import "./Admin-Sidebar.css"

function AdminSidebar({sidebarSection, setSidebarSection, sidebarVisible, setSidebarVisible}) {
    const [openSidebar, setOpenSidebar] = useState(true) //OPENS SIDEBAR

    const handleLogout = Logout()

    return (
        <div className="admin-sidebar">
            <div className="admin-sidebar-top">
                <div className="close-arrow"
                    onClick={ () => sidebarVisible ? setSidebarVisible(false) : setOpenSidebar(prev => !prev)}
                >
                    {openSidebar ? <HiOutlineChevronDoubleLeft /> : <HiOutlineChevronDoubleRight />}
                </div>
            </div>
            {openSidebar ? (
                <div className="open">
                    {/* PROFILE */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("Agents")}
                    style={{
                        color: sidebarSection === "Agents" ? "black" : "white",
                        backgroundColor: sidebarSection === "Agents" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineUser /></div>
                        <p>Agents</p>
                    </div>

                    {/* FEEDS */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("Hunters")}
                    style={{
                        color: sidebarSection === "Hunters" ? "black" : "white",
                        backgroundColor: sidebarSection === "Hunters" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineSquare3Stack3D /></div>
                        <p>Hunters</p>
                    </div>

                    {/* WALLET */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("Houses")}
                    style={{
                        color: sidebarSection === "Houses" ? "black" : "white",
                        backgroundColor: sidebarSection === "Houses" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineWallet /></div>
                        <p>Houses</p>
                    </div>

                    {/* TRANSACTION */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("KYC")}
                    style={{
                        color: sidebarSection === "KYC" ? "black" : "white",
                        backgroundColor: sidebarSection === "KYC" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineIdentification /></div>
                        <p>KYC</p>
                    </div>

                    
                    <div className="sidebar-option"
                    role='button'
                    onClick={handleLogout}
                    style={{
                        color: "white"
                    }}
                    >
                        <div className="sidebar-icon" ><HiOutlineArrowLeftStartOnRectangle /></div>
                        <p>Logout</p>
                    </div>
                </div>
            ) : (
                <div className="close">
                    {/* PROFILE */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("Agents")}
                    style={{
                        color: sidebarSection === "Agents" ? "black" : "white",
                        backgroundColor: sidebarSection === "Agents" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineUser /></div>
                    </div>

                    {/* FEEDS */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("Hunters")}
                    style={{
                        color: sidebarSection === "Hunters" ? "black" : "white",
                        backgroundColor: sidebarSection === "Hunters" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineSquare3Stack3D /></div>
                    </div>

                    {/* WALLET */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("Houses")}
                    style={{
                        color: sidebarSection === "Houses" ? "black" : "white",
                        backgroundColor: sidebarSection === "Houses" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineWallet /></div>
                    </div>


                    {/* KYC */}
                    <div className="sidebar-option"
                    onClick={() => setSidebarSection("KYC")}
                    style={{
                        color: sidebarSection === "KYC" ? "black" : "white",
                        backgroundColor: sidebarSection === "KYC" ? "white" : "transparent",
                        transition: "background-color 0.3s ease-in, color 0.3s ease-in"
                    }}
                    >
                        <div className="sidebar-icon"><HiOutlineIdentification /></div>
                    </div>

                    {/* LOGOUT */}
                    <div className="sidebar-option"
                    role='button'
                    onClick={handleLogout}
                    style={{
                        color: "white"
                    }}
                    >
                        <div className="sidebar-icon" ><HiOutlineArrowLeftStartOnRectangle /></div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminSidebar;