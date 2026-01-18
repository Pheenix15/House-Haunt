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
                const response = await axios.get('/api/agent/contact-requests')

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
            const response = await axios.post(`/api/contact-requests/${requestId}`,
                {decision: "accepted"},
            )

            console.log(response)

            showSuccess("Request Accepted")
        } catch (error) {
            console.log("Error:", error)

            showFail("An Error Occured:", error.message)
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
                {contactRequests.map((cr) => (
                    <div key={cr.request_id} className="contact-request">
                        <div className="hunters-info">
                            <p className="hunters-name" >{cr.haunter.username}</p>

                            <div className="requested-house">
                                <p><IoHome /> {cr.house.title}</p>
                                <p><IoLocation /> {cr.house.location}</p>
                            </div>
                            
                        </div>

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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactRequests;