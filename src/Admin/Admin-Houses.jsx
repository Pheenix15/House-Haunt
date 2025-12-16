import axios from "axios";
import { useState, useEffect } from "react";


function AdminHouses() {
    const [allHouses, setAllHouses] = useState([]) 
    const [pendingHouses, setPendingHouses] = useState([])
    // RETRIEVE HOUSES

    // Pending Houses
    useEffect(() => {
        const fetchUnApprovedHouses = async () => {

            try {
                const pendingHousesResponse = await axios.get('/api/admin/pending-houses')

                console.log('pending houses:', pendingHousesResponse)
                const pendingHousesData = pendingHousesResponse.data
                setPendingHouses(pendingHousesData.pending_houses)
            } catch (error) {
                console.log(error)
            }
            
        }

        fetchUnApprovedHouses()
    }, [])

    // All Houses
    useEffect(() => {
        const fetchAllHouses = async () => {

            try {
                const allHousesResponse = await axios.get('/api/admin/all-houses')

                console.log('All houses:', allHousesResponse.data)
                const allHousesData = allHousesResponse.data
                setAllHouses(allHousesData.houses)
            } catch (error) {
                console.log(error)
            }
            
        }

        fetchAllHouses()
    }, [])

    return ( 
        <div className="admin-houses">
            {/* {pendingHouses.map((pendingHouse) => {
                <div key={pendingHouse.id}
                    className="pending-house"
                >

                </div>
            })} */}

            <div className="all-houses">
                <div className="all-houses-header">
                    <h2>All houses</h2>
                </div>

                <div className="all-houses-table">
                    {allHouses.length === 0 ? (
                        <p>No House has been Added yet</p>
                    ) : (
                    
                        <table>
                            <thead className="table-heading" >
                                <tr className="table-heading-row" >
                                    <th className="table-heading-data" ><h3>Image</h3></th>
                                    <th className="table-heading-data" ><h3>Title</h3></th>
                                    <th className="table-heading-data" ><h3>Price</h3></th>
                                    <th className="table-heading-data" ><h3>Location</h3></th>
                                    <th className="table-heading-data" ><h3>Status</h3></th>
                                </tr>
                            </thead>

                            <tbody className="table-body" >
                                {allHouses.map((allHouse, index) => (
                                    <tr
                                        key={index} 
                                        className="house table-body-row"
                                    >
                                        <td className="table-body-data table-body-image"><img src={allHouse.image_url} alt={allHouse.title} /></td>
                                        <td className="table-body-data"><p>{allHouse.title}</p></td>
                                        <td className="table-body-data"><p>{allHouse.price}</p></td>
                                        <td className="table-body-data"><p>{allHouse.location}</p></td>
                                        <td className="table-body-data"><p>{allHouse.status}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                    )}
                    
                    
                </div>
            </div>
        </div>
     );
}

export default AdminHouses;