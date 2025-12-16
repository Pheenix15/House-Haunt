import { useState, useEffect } from "react";
import "./Admin-Agents.css"
import axios from "axios";

function AdminAgents() {
    const [agentList, setAgentList] = useState([]) //List if agents

    useEffect(() => {
        const fetchAgentList = async () => {
            try {
                const agentListResponse = await axios.get('/api/admin/agents')

                const agentListData = agentListResponse.data

                setAgentList(agentListData.agents)

                console.log('List of Agents:', agentList)
                

            } catch (error) {
                
            }
        }

        fetchAgentList()
    }, [])


    return (
        <div className="admin-agents">
            <div className="admin-agents-heading">
                <h2>Agent List</h2>
            </div>

            <div className="admin-agent-table">
                <table>
                    <thead className="table-heading" >
                        <tr className="table-heading-row" >
                            <th className="table-heading-data" ><h3>Id</h3></th>
                            <th className="table-heading-data" ><h3>Name</h3></th>
                            <th className="table-heading-data" ><h3>Email</h3></th>
                            <th className="table-heading-data" ><h3>KYC Status</h3></th>
                        </tr>
                    </thead>

                    <tbody className="table-body" >
                        {agentList.map((agent, index) => (
                            <tr key={index} className="table-body-row" >
                                <td className="table-body-data" ><p>{agent.id}</p></td>
                                <td className="table-body-data" ><p>{agent.username}</p></td>
                                <td className="table-body-data" ><p>{agent.email}</p></td>
                                <td className="table-body-data" ><p>{agent.is_verified ? 'Verified' : 'Not Verified'}</p></td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminAgents;