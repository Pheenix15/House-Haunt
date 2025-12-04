import { useState, useEffect } from "react"
import axios from "axios"
import "../profile.css"


function HaunterProfile({setLoading}) {
    const [details, setDetails] = useState([]) //AGENT PROFILE DETAILS
    const [kyc, setKyc] = useState([])
    const [wallet, setWallet] = useState([])
    const [totalReviews, setTotalReviews] = useState(0)
    const [requestedHouses, setRequestedHouses] = useState([])
    const [reviewsWritten, setReviewsWritten] = useState([])

    // RETRIVE USER PROFILE
    useEffect(() => {
        setLoading(true)

        const fetchProfile = async () => {
            const profileResponse = await axios.get('/api/dashboard/haunter')
            console.log(profileResponse.data)

            const profile = profileResponse.data

            setDetails(profile.haunter)
            // setKyc(profile.kyc)
            setWallet(profile.wallet)
            setTotalReviews(profile.total_reviews)
            setRequestedHouses(profile.requested_houses)
            setReviewsWritten(profile.reviews_written)
    
        }

        fetchProfile()
        setLoading(false)
    }, [])

    return ( 
        <div className="profile-container">
            <div className="profile-user-info">
                <div className="profile-user-info-left profile-box">
                    <div className="profile-details">
                        <h2>{details.name}</h2>
                    </div>

                    <div className="profile-contact">
                        <p className="bold" >Email:</p>
                        <p>{details.email}</p>
                    </div>

                    <div className="profile-contact">
                        <p className="bold" >Total Reviews:</p>
                        <p>{totalReviews}</p>
                    </div>

                    <div className="profile-contact">
                        <p className="bold" >Joined on:</p>
                        <p>{details.joined_on}</p>
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
                    {/* <div className="profile-kyc-box">
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
                    </div> */}
                </div>
            </div>

            {/* CONTACT REQUESTS */}
            <div className="profile-reviews">
                <div className="profile-reviews-heading">
                    <h2>Requested Houses</h2>
                </div>

                <div className="profile-reviews-body">
                    {requestedHouses.map((cr) => (
                        <div key={cr.id} className="contact-requests">

                        </div>
                    ))}
                </div>
            </div>
            
            {/* PROFILE REVIEWS */}
            <div className="profile-reviews">
                <div className="profile-reviews-heading">
                    <h2>Reviews</h2>
                </div>

                <div className="profile-reviews-body">
                    {reviewsWritten.map((review) => (
                        <div key={review.id} className="review">

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HaunterProfile;