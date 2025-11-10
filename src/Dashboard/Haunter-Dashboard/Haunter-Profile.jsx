import { useState, useEffect } from "react"
import "../profile.css"


function HaunterProfile() {
    const [profile, setProfile] = useState([]) //AGENTS PROFILE

    // RETRIVE USER PROFILE
    useEffect(() => {
        const fetchProfile = async () => {
            const profileResponse = await axios.get('/api/haunter/profile')

            console.log(profileResponse.data)

            setProfile(profileResponse.data)
        }

        fetchProfile()
    }, [])

    return ( 
        <div className="user-profile-container">
            <div className="user-profile">
                <div className="profile-box">
                    <div className="profile-details">
                        <h2>{profile.username}</h2>

                        <p>{profile.created_at}</p>
                    </div>

                    <div className="profile-contact">
                        <h3>Email:</h3>
                        <p>{profile.email}</p>
                    </div>

                    <div className="profile-role">
                        <h3>Role:</h3>
                        <p>{profile.role}</p>
                    </div>

                    <div className="profile-credit">
                        <h3>Credit</h3>
                        <p>{profile.credits}</p>
                    </div>
                </div>

                {/* KYC BOX */}
                <div className="kyc-box">
                    <div className="kyc-box-heading">
                        <h2>KYC Status</h2>
                    </div>

                    <div className="kyc-status">
                        <div className="status">
                            <h3>kyc status</h3>
                            <p>{profile.kyc_status}</p>
                        </div>
                        <div className="verified">
                            <h3>kyc verification:</h3>
                            <p>{profile.kyc_verified === false ? 'False' : 'True' }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HaunterProfile;