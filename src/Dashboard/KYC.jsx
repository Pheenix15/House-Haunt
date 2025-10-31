import { useState } from "react";
import "./KYC.css"

function KYC() {
    const [KYCStage, setKYCStage] = useState("Personal Info")

    return ( 
        <div className="KYC">
            <div className="KYC-container">
                <div className="KYC-header">
                    <h2>KYC Verification</h2>
                    <p>Verify your identity</p>
                </div>

                <div className="KYC-steps">
                    <div className="KYC-steps-container">
                        <div className="steps-icon">
                            <i className="fa-solid fa-user"
                                style={{color: KYCStage === "Personal Info" ? "White" : "Grey"}}
                            ></i>
                        </div>

                        <div className="steps-icon">
                            <i className="fa-solid fa-id-card"
                                style={{color: KYCStage === "Id Verification" ? "White" : "Grey"}}
                            ></i>
                        </div>

                        <div className="steps-icon">
                            <i className="fa-solid fa-camera"
                                style={{color: KYCStage === "Selfie" ? "White" : "Grey"}}
                            ></i>
                        </div>

                        <div className="steps-icon">
                            <i className="fa-solid fa-list-check"
                                style={{color: KYCStage === "Review" ? "White" : "Grey"}}
                            ></i>
                        </div>
                    </div>
                </div>

                <div className="KYC-board">
                    <div className="KYC-board-container">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KYC;