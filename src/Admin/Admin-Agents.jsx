import { useState, useEffect } from "react";
import "./Admin-Agents.css"

function AdminAgents() {
    // /api/admin/agents

    // Dummy Agent Data
    const agents = [
        {
            name: "Anthony Nnadi",
            email: "nnaditony@gmail.com",
            phoneNumber: "+2348012345678",
            image: "../img/users/profile-1.png",
            kyc: "complete"
        },

        {
            name: "Justin Shodeke",
            email: "jshodeke@gmail.com",
            phoneNumber: "+2348012345678",
            image: "../img/users/profile-2.png",
            kyc: "pending"
        },

        {
            name: "Chioma Adugo",
            email: "adaoma@gmail.com",
            phoneNumber: "+2348012345678",
            image: "../img/users/profile-3.png",
            kyc: "pending"
        }
    ]

    return (
        <div className="admin-agents">
            <div className="admin-agents-heading">

            </div>

            <div className="admin-agent-table">
                <table>
                    <thead className="table-heading" >
                        <tr className="table-heading-row" >
                            <th className="table-heading-data" ><h2>Image</h2></th>
                            <th className="table-heading-data" ><h2>Name</h2></th>
                            <th className="table-heading-data" ><h2>Email</h2></th>
                            <th className="table-heading-data" ><h2>Phone Number</h2></th>
                            <th className="table-heading-data" ><h2>KYC Status</h2></th>
                        </tr>
                    </thead>

                    <tbody className="table-body" >
                        {agents.map((agent, index) => (
                            <tr key={index} className="table-body-row" >
                                <td className="table-body-data" ><img src={agent.image} alt={agent.name} width="50" /></td>
                                <td className="table-body-data" ><p>{agent.name}</p></td>
                                <td className="table-body-data" ><p>{agent.email}</p></td>
                                <td className="table-body-data" ><p>{agent.phoneNumber}</p></td>
                                <td className="table-body-data" ><p>{agent.kyc}</p></td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminAgents;