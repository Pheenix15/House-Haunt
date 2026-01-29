import { useState, useEffect } from "react";
import axios from "axios";
import { IoHome } from "react-icons/io5";
import { IoLocation } from "react-icons/io5";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useAlert } from "../../Context/AlertContext";
import './Contact-Requests.css'


function ContactRequests({setLoading, loading}) {
    const [contactRequests, setContactRequests] = useState([])
    const {showSuccess, showFail} = useAlert()

    // Fetch Contact Requests
    useEffect(() => {
        const fetchContactRequest = async () => {
            setLoading(true)
            try {
                const response = await axios.get('/api/agent/contact-requests',
                    { headers: { "Content-Type": "application/json" } }
                )

                console.log(response)
                setContactRequests(response.data.requests)
            } catch (error) {

            } finally {
                setLoading(false)
            }
        }

        fetchContactRequest()
    }, [])

    // Accept Request
    const acceptRequest = async (requestId) => {
        try {
            const response = await axios.post(`/api/agent/contact-requests/${requestId}/decision`,
                {decision: "accepted"},
            )

            console.log(response)

            showSuccess("Request Accepted")
        } catch (error) {
            console.log("Error:", error)

            showFail("An Error Occured:", error)
        }
    }

    useEffect(() => {
        console.log(contactRequests)
    }, [])

    return (
        <div className="contact-requests-section">
            {/* <div className="contact-request-heading">
                <h2>Contact Requests</h2>
            </div> */}

            <div className="contact-request-body">
                <table>
                    <thead className="table-heading" >
                        <tr className="table-heading-row" >
                            <th className="table-heading-data" ><h3>Hunter Name</h3></th>
                            <th className="table-heading-data" ><h3><IoHome /> Requested House</h3></th>
                            <th className="table-heading-data" ><h3><IoLocation /> Location</h3></th>
                            <th className="table-heading-data" ><h3>Action</h3></th>
                        </tr>
                    </thead>

                    <tbody>
                        {contactRequests.map((cr) => (
                            <tr key={cr.request_id} className="table-body-row contact-request">
                                <td className="table-body-data" ><p>{cr.haunter.username}</p></td>
                                <td className="table-body-data" ><p>{cr.house.title}</p></td>
                                <td className="table-body-data" ><p>{cr.house.location}</p></td>
                                <td className="table-body-data" >
                                    <div className="contact-request-actions">
                                        <button className="accept-request-button"
                                            onClick={() => acceptRequest(cr.request_id)}
                                        >
                                            <IoCheckmarkOutline />
                                        </button>

                                        <button className="reject-request-button">
                                            <IoClose />
                                        </button>
                                    </div>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
}

export default ContactRequests;