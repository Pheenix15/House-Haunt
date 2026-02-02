import { useState, useEffect } from "react";
import axios from "axios";
import './Admin-KYC.css'

function AdminKYC() {
    const [kycRecords, setKycRecords] = useState([]); // State to hold KYC requests
    const [selectedRecord, setSelectedRecord] = useState(null); // State for selected KYC record
    const [openNotes, setOpenNotes] = useState(false); // State to manage notes modal
    const [viewKyc, setViewKyc] = useState(false); // State to manage KYC document view

    // Get KYC requests
    useEffect(() => {
        const fetchKycRequests = async () => {
            try {
                const response = await axios.get('/api/kyc/all');

                const requests = response.data.kyc_records;
                setKycRecords(requests);
                console.log('Fetched KYC Requests:', requests);
            } catch (error) {
                console.log('Error fetching KYC requests:', error);
            }
        };

        fetchKycRequests();
    }, [])

    return ( 
        <div className="admin-KYC">
            <table>
                <thead className="table-heading" >
                    <tr className="table-heading-row" >
                        <th className="table-heading-data" ><h3>Id</h3></th>
                        <th className="table-heading-data" ><h3>Upload Date</h3></th>
                        <th className="table-heading-data" ><h3>Status</h3></th>
                        <th className="table-heading-data" ><h3>Review Date</h3></th>
                        <th className="table-heading-data" ><h3>Options</h3></th>
                    </tr>
                </thead>

                <tbody className="table-body" >
                    {kycRecords.map((records, index) => (
                        <tr key={records.id} className="table-body-row" >
                            <td className="table-body-data" ><p>{records.agent_id}</p></td>
                            <td className="table-body-data" ><p>{records.uploaded_at}</p></td>
                            <td className="table-body-data" ><p>{records.status}</p></td>
                            <td className="table-body-data" ><p>{records.reviewed_at}</p></td>
                            <td className="table-body-data" >
                                <div className="action-buttons">
                                    <button
                                        className="action-button view-note-button"
                                        onClick={() => { setSelectedRecord(records); setOpenNotes(true); }}
                                    >
                                        Notes
                                    </button>
                                    <button className="action-button view-kyc-button" onClick={() => {setSelectedRecord(records); setViewKyc(true)}} >view Kyc</button>
                                </div>
                                
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>

            {openNotes && (
                <div className="kyc-modal">
                    <div className="kyc-modal-heading">
                        <p className="bold" >Admin Notes</p>

                        <button className="close-button" onClick={() => setOpenNotes(false)} >Close</button>
                    </div>

                    <div className="kyc-modal-content">
                        <p>{selectedRecord?.admin_notes || "No notes available."}</p>
                    </div>
                </div>
            )}

            {viewKyc && (
                <div className="kyc-modal">
                    <div className="kyc-modal-heading">
                        <p className="bold" >KYC Document</p>
                        <button className="close-button" onClick={() => setViewKyc(false)} >Close</button>
                    </div>

                    <div className="kyc-modal-content">

                    </div>
                </div>
            )}
        </div>
     );
}

export default AdminKYC;