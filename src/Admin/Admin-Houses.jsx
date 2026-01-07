import axios from "axios";
import { useState, useEffect } from "react";
import { formatNumber } from "../utilities/formatDate";
import "./Admin-Houses.css"
import { useAlert } from "../Context/AlertContext";


function AdminHouses({setLoading}) {
    const [allHouses, setAllHouses] = useState([]) 
    const [pendingHouses, setPendingHouses] = useState([])
    const [currentHouseList, setCurrentHouseList] = useState("All houses")
    const {showSuccess, showFail} = useAlert()

    // RETRIEVE HOUSES

    // Pending Houses
    useEffect(() => {
        const fetchUnApprovedHouses = async () => {
            setLoading(true)
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

    // Approve House
    const approveHouse = async (houseId) => {
        try {
            console.log(houseId)
            await axios.post(`/api/admin/review-house/${houseId}`, {
                decision: "approved"
            },);
            console.log("House Approved")
            showSuccess("House Approved")
        } catch(error) {
            console.log(error)
            showFail("Failed to approve House")
        }
        

        
    };

    const rejectHouse = async (houseId) => {
        try {
            console.log(houseId)
            await axios.post(`/api/admin/review-house/${houseId}`, {
                decision: "rejected"
            },);

            console.log("House Rejected")
            showSuccess("House has been rejected")
        } catch(error) {
            console.log("Rejection Failed", error)
            showFail("Unable to reject house")
        }
        
    };

    // All Houses
    useEffect(() => {
        const fetchAllHouses = async () => {
            setLoading(true)
            try {
                const allHousesResponse = await axios.get('/api/admin/all-houses')

                console.log('All houses:', allHousesResponse.data)
                const allHousesData = allHousesResponse.data
                setAllHouses(allHousesData.houses)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
            
        }

        fetchAllHouses()
    }, [])

    return ( 
        <div className="admin-houses">
            <div className="house-list-selector">
                <button 
                    className={currentHouseList === "All houses" ? "list-selector active-list" : "list-selector"} 
                    onClick={()=> setCurrentHouseList("All houses")}
                    type="button" 
                >
                    All Houses
                </button>
                <button 
                    className={currentHouseList === "Pending houses" ? "list-selector active-list" : "list-selector"} 
                    onClick={()=> setCurrentHouseList("Pending houses")}
                    type="button" 
                >
                    Pending Houses
                </button>
            </div>
            {currentHouseList === "All houses" ? (
                // All Houses
                <div className="all-houses">
                    {/* <div className="all-houses-header">
                        <h2>All houses</h2>
                    </div> */}

                    <div className="all-houses-table">
                        {allHouses.length === 0 ? (
                            <p>No House has been Added yet</p>
                        ) : (
                        
                            <table>
                                <thead className="table-heading" >
                                    <tr className="table-heading-row" >
                                        <th className="table-heading-data" ><h3>Image</h3></th>
                                        <th className="table-heading-data" ><h3>Title</h3></th>
                                        <th className="table-heading-data" ><h3>Price(₦)</h3></th>
                                        <th className="table-heading-data" ><h3>Location</h3></th>
                                        <th className="table-heading-data" ><h3>Status</h3></th>
                                        {/* <th className="table-heading-data" ><h3>Action</h3></th> */}
                                    </tr>
                                </thead>

                                <tbody className="table-body" >
                                    {allHouses.map((allHouse, index) => (
                                        <tr
                                            key={index} 
                                            className="house table-body-row"
                                        >
                                            <td className="table-body-data table-body-image"><img src={allHouse.images[0]} alt={allHouse.title} /></td>
                                            <td className="table-body-data"><p>{allHouse.title}</p></td>
                                            <td className="table-body-data"><p>{formatNumber(allHouse.price)}</p></td>
                                            <td className="table-body-data"><p>{allHouse.location}</p></td>
                                            <td className="table-body-data"><p>{allHouse.status}</p></td>
                                            {/* <td className="table-body-data">
                                                <div className="action-buttons">
                                                    <button className="action-button approve-button" onClick={() => approveHouse(allHouse.id)}>Approve</button>

                                                    <button className="action-button reject-button" onClick={() => rejectHouse(allHouse.id)}>Reject</button>
                                                </div>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        )}
                        
                        
                    </div>
                </div>
            ) : (
                // Pending Houses
                <div className="pending-houses">
                    {/* <div className="all-houses-header">
                        <h2>Pending houses</h2>
                    </div> */}

                    <div className="all-houses-table">
                        {pendingHouses.length === 0 ? (
                            <p>There are no pending houses </p>
                        ) : (
                        
                            <table>
                                <thead className="table-heading" >
                                    <tr className="table-heading-row" >
                                        <th className="table-heading-data" ><h3>Image</h3></th>
                                        <th className="table-heading-data" ><h3>Title</h3></th>
                                        <th className="table-heading-data" ><h3>Price(₦)</h3></th>
                                        <th className="table-heading-data" ><h3>Location</h3></th>
                                        <th className="table-heading-data" ><h3>Status</h3></th>
                                        <th className="table-heading-data" ><h3>Action</h3></th>
                                    </tr>
                                </thead>

                                <tbody className="table-body" >
                                    {pendingHouses.map((pendingHouse, index) => (
                                        <tr
                                            key={index} 
                                            className="house table-body-row"
                                        >
                                            <td className="table-body-data table-body-image"><img src={pendingHouse.images[0]} alt={pendingHouse.title} /></td>
                                            <td className="table-body-data"><p>{pendingHouse.title}</p></td>
                                            <td className="table-body-data"><p>{formatNumber(pendingHouse.price)}</p></td>
                                            <td className="table-body-data"><p>{pendingHouse.location}</p></td>
                                            <td className="table-body-data"><p>{pendingHouse.status}</p></td>
                                            <td className="table-body-data">
                                                <div className="action-buttons">
                                                    <button className="action-button approve-button" onClick={() => approveHouse(pendingHouse.id)}>Approve</button>

                                                    <button className="action-button reject-button" onClick={() => rejectHouse(pendingHouse.id)}>Reject</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        )}
                        
                        
                    </div>
                </div>
            )}    
        </div>
     );
}

export default AdminHouses;