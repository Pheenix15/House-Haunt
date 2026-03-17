import { useState, useEffect } from "react";
import { useAlert } from "../Context/AlertContext";
import axios from "axios";
import './Admin-KYC.css'

function AdminKYC() {
    const [kycRecords, setKycRecords] = useState([]); // State to hold KYC requests
    const [selectedRecord, setSelectedRecord] = useState(null); // State for selected KYC record
    const [openNotes, setOpenNotes] = useState(false); // State to manage notes modal
    const [agentsNote, setAgentsNote] = useState(''); // State to hold agent's note input
    const [viewKyc, setViewKyc] = useState(false); // State to manage KYC document view
    // object URL + meta for the fetched file (used for in-modal preview, no downloads)
    const [kycFileUrl, setKycFileUrl] = useState(null);
    const [kycFileType, setKycFileType] = useState(null);
    const [kycFileName, setKycFileName] = useState(null);
    const {showSuccess, showFail} = useAlert()

    const token = localStorage.getItem('token');

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

    // Get Details of Selected Records
    useEffect(() => {
        // fetch the KYC file as a binary blob so it can be previewed inside the app (not downloaded)
        const fetchKycDetails = async () => {
            if (!selectedRecord || !viewKyc) return; // only fetch when a record is selected and modal is open

            console.log('[KYC] Starting fetch for record id:', selectedRecord.id);

            try {
                // request response as a blob (binary)
                const response = await axios.get(`/api/admin/kyc/view/${selectedRecord.id}`, {
                    responseType: 'blob',
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log('[KYC] Received response headers:', response.headers);

                // determine content type from response headers
                const contentType = response.headers['content-type'] || '';
                const disposition = response.headers['content-disposition'] || '';

                // attempt to extract filename from Content-Disposition (optional)
                let filename = 'kyc-file';
                const match = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/i);
                if (match && match[1]) {
                    try { filename = decodeURIComponent(match[1]); } catch { filename = match[1]; }
                }

                // create a Blob and an object URL that can be used for in-app preview (iframe/img)
                const blob = new Blob([response.data], { type: contentType || 'application/octet-stream' });
                const url = URL.createObjectURL(blob);

                // revoke any previous objectURL to avoid leaking memory
                if (kycFileUrl) {
                    console.log('[KYC] Revoking previous object URL');
                    URL.revokeObjectURL(kycFileUrl);
                }

                // store metadata for rendering in modal
                setKycFileUrl(url);
                setKycFileType(contentType);
                setKycFileName(filename);

                console.log('[KYC] File ready for preview:', { url, contentType, filename });
            } catch (error) {
                console.error('[KYC] Error fetching KYC details:', error);
                showFail('Unable to fetch KYC file');
            }
        };

        fetchKycDetails();

        // cleanup when selectedRecord/viewKyc changes or component unmounts
        return () => {
            if (kycFileUrl) {
                console.log('[KYC] Cleaning up object URL');
                URL.revokeObjectURL(kycFileUrl);
                setKycFileUrl(null);
                setKycFileType(null);
                setKycFileName(null);
            }
        };
    }, [selectedRecord, viewKyc]);

    // Post Notes for Selected Records
    const sendNotes = async (agentsId) => {
        if (!selectedRecord) return;

        try {
            const noteResponse = await axios.post(`/api/admin/kyc/review/${agentsId}`, {
                agentsNote
            }); //Findout if there is route for Notes

            console.log(agentsNote)
            showSuccess("Note Added Successfully")
            console.log(noteResponse.data)

            setAgentsNote(''); // Clear the textarea after submission
        } catch (error) {
            console.log('Error fetching KYC notes:', error);
            showFail("An error Occured")
        } finally {
            setAgentsNote(''); // Clear the textarea
        }
    }

    // Approve KYC
    const approveKyc = async (agentsId) => {
        if (!selectedRecord) return

        try {
            const approvalResponse = await axios.post(`/api/kyc/review/${agentsId}`, 
                {decision: "accepted"},
            );

            showSuccess("Kyc Approved")
            console.log("Kyc Response:", approvalResponse)
        } catch (error) {
            console.log("An error occured:", error)

            showFail("An error occured:", error)
        }
    }

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
            
            {/* Open Notes Modal */}
            {openNotes && (
                <div className="kyc-modal">
                    <div className="kyc-modal-heading">
                        <p className="bold" >Admin Notes</p>

                        <button className="close-button" onClick={() => setOpenNotes(false)} >Close</button>
                    </div>

                    <div className="kyc-modal-content">
                        <p>{selectedRecord?.admin_notes || "No notes available."}</p>

                        <div className="Kyc-Note">
                            <textarea className="note-textarea"
                                placeholder="Leave a note for the agent..."
                                value={agentsNote}
                                onChange={(e) => setAgentsNote(e.target.value)}
                            />

                            <button type="submit" className="modal-button action-button" onClick={() => sendNotes(selectedRecord?.agent_id)} >
                                Submit Note
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* View KYC Files */}
            {viewKyc && (
                <div className="kyc-modal">
                    <div className="kyc-modal-heading">
                        <p className="bold" >KYC Document</p>
                        <button className="close-button" onClick={() => {
                            // close modal and cleanup object URL to free memory
                            setViewKyc(false);
                            if (kycFileUrl) {
                                console.log('[KYC] Manual close: revoking object URL');
                                URL.revokeObjectURL(kycFileUrl);
                                setKycFileUrl(null);
                                setKycFileType(null);
                                setKycFileName(null);
                            }
                        }} >Close</button>
                    </div>

                    <div className="kyc-modal-content">

                    </div>
                </div>
            )}
        </div>
     );
}

export default AdminKYC;