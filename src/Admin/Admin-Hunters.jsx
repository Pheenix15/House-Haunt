import { useState, useEffect } from "react"
import axios from "axios"

function AdminHunters({setLoading}) {
    const [huntersList, setHuntersList] = useState([]) //List of Hunters

    useEffect(() => {
        const fetchHunterList = async () => {
            setLoading(true)
            try {
                const huntersListResponse = await axios.get('/api/admin/haunters')

                const huntersListData = huntersListResponse.data

                setHuntersList(huntersListData.haunters)

                console.log('List of Hunters:', huntersListData.haunters)
                

            } catch (error) {
                console.log('hunter list error:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchHunterList()
    }, [])

    return ( 
        <div className="admin-hunters">
            <div className="admin-hunters-heading">
                <h2>Hunters List</h2>
            </div>

            <div className="admin-hunters-table">
                <table>
                    <thead className="table-heading" >
                        <tr className="table-heading-row" >
                            <th className="table-heading-data" ><h3>Id</h3></th>
                            <th className="table-heading-data" ><h3>Name</h3></th>
                            <th className="table-heading-data" ><h3>Email</h3></th>
                            <th className="table-heading-data" ><h3>Date joined</h3></th>
                        </tr>
                    </thead>

                    <tbody className="table-body" >
                        {huntersList.map((hunter, index) => (
                            <tr key={index} className="table-body-row" >
                                <td className="table-body-data" ><p>{hunter.id}</p></td>
                                <td className="table-body-data" ><p>{hunter.username}</p></td>
                                <td className="table-body-data" ><p>{hunter.email}</p></td>
                                <td className="table-body-data" ><p>{hunter.created_at}</p></td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHunters;