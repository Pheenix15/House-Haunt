import axios from "axios";
import { useEffect, useState } from "react";
import "../profile.css"

function AgentProfile({setLoading}) {
    const [details, setDetails] = useState([]) //AGENT PROFILE DETAILS
    const [kyc, setKyc] = useState([])
    const [reviews, setReviews] = useState([]) //AGENT PROFILE REVIEWS
    const [wallet, setWallet] = useState([])
    const [agentRating, setAgentRating] = useState(0)

    // RETRIVE USER PROFILE
    useEffect(() => {
        
        const fetchProfile = async () => {
            setLoading(true)
            try {
                const profileResponse = await axios.get('/api/dashboard/agent')
                console.log(profileResponse.data)

                const profile = profileResponse.data

                setDetails(profile.agent)
                setKyc(profile.kyc)
                setWallet(profile.wallet)
                setReviews(profile.reviews)
                setAgentRating(profile.average_rating)
            } catch (error) {
                console.log("Failed to fetch profile:", error);
            } finally {
                setLoading(false)
            }
    
        }

        fetchProfile()
        
    }, [])

    

    return ( 
        <div className="profile-container">
            <div className="profile-user-info">
                <div className="profile-user-info-left profile-box">
                    <div className="profile-details">
                        <h2>{details.name}</h2>
                    </div>

                    <div className="profile-contact">
                        <h3>Email:</h3>
                        <p>{details.email}</p>
                    </div>

                    <div className="profile-contact">
                        <h3>Agent Rating:</h3>
                        <p>{agentRating}</p>
                    </div>

                </div>

                <div className="profile-user-info-right user-profile">
                    <div className="profile-wallet">
                        <div className="profile-wallet-heading">
                            <h2>Wallet</h2>
                        </div>

                        <div className="profile-wallet-body">
                            <div className="profile-wallet-balance">
                                <p className="bold" >balance:</p>
                                <p>{wallet.balance}</p>
                            </div>
                            <div className="profile-wallet-credits">
                                <p className="bold" >Credits Spent:</p>
                                <p>{wallet.credits_spent}</p>
                            </div>
                        </div>
                        
                    </div>

                    {/* KYC BOX */}
                    <div className="profile-kyc-box">
                        <div className="profile-kyc-box-heading">
                            <h2>KYC Status</h2>
                        </div>

                        <div className="profile-kyc-status">
                            <div className="status">
                                <p className="bold" >kyc status:</p>
                                <p>{kyc.status}</p>
                            </div>
                            <div className="verified">
                                <p className="bold" >Reviewed at:</p>
                                <p>{kyc.reviewed_at}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* PROFILE REVIEWS */}
            <div className="profile-reviews">
                <div className="profile-reviews-heading">
                    <h2>Reviews</h2>
                </div>

                <div className="profile-reviews-body">
                    {reviews.map((review) => (
                        <div key={review.id} className="review">

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AgentProfile;