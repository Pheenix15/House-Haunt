import { useState, useEffect, useRef } from "react";
import { uploadKYC } from "../Api/Upload-KYC";
import { useCamera } from "./useCamera";
import { useAlert } from "../Context/AlertContext";
import "./KYC.css"

function KYC() {
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1) //Current KYC stage
    const [cameraStream, setCameraStream] = useState(null); //Holds camera strem and video element
    const videoRef = useRef(null); // <video> element shown to user
    const [fullName, setFullName] = useState("")
    const [address, setAdress] = useState("")
    const [dOB, setDOB] = useState("")
    const [nationality, setNatioality] = useState("")
    const [idType, setIdType] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [idImageBack, setIdImageBack] = useState(null)
    const [idImageFront, setIdImageFront] = useState(null)
    const [selfie, setSelfie] = useState(null)
    const {showSuccess, showFail} = useAlert()

    const {openCamera, stopCamera, captureImage} = useCamera({
        videoRef,
        step,
        cameraStream,
        setCameraStream,
        // kycData,
        setIdImageFront,
        setIdImageBack,
        setSelfie
    })

    // KYC Data
    const kycData = new FormData()
    kycData.append("full_name", fullName)
    kycData.append("date_of_birth", dOB)
    kycData.append("nationality", nationality)
    kycData.append("id_type", idType)
    kycData.append("id_number", idNumber)
    kycData.append("address", address)
    kycData.append("id_documents", idImageFront)
    kycData.append("id_documents", idImageBack) //Temporary Until I Know what the backend expects
    kycData.append("selfie", selfie)


    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    // Validate Steps
    const isStepComplete = () => {
        if (step === 1) {
            // Personal Info
            return fullName && address && dOB && nationality;
        }
        if (step === 2) {
            // ID upload
            return idImageFront && idImageBack;
        }
        if (step === 3) {
            // Selfie
            return selfie;
        }

        // Review
        return true;
    };

    // Handle uploading Id Document
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Store front first, then back
        if (!idImageFront) {
            setIdImageFront(file);
        } else if (!idImageBack) {
            setIdImageBack(file);
        }

        e.target.value = null; // reset the input
    };

    useEffect(() => {
        console.log("Front:", idImageFront);
    }, [idImageFront]);

    useEffect(() => {
        console.log("Back:", idImageBack);
    }, [idImageBack]);

    // Upload KYC DATA
    const handleKycUpload = async () => {
        setLoading(true)

        // Debug: Check FormData contents
        console.log("=== FormData Contents ===");
        for (let [key, value] of kycData.entries()) {
            console.log(key, value);
            if (value instanceof File) {
                console.log(`  - File name: ${value.name}, size: ${value.size}, type: ${value.type}`);
            }
        }
        console.log("========================");

        try {
            const uploadKycResponse = await uploadKYC(kycData)

            console.log('KYC Response:', uploadKycResponse)

            showSuccess("KYC submitted Successfully")
        } catch (error) {
            console.log(error)
            showFail(error.message)
        } finally {
            setLoading(false)
        }
    }


    // Detect mobile / tablet devices
    const isMobileDevice = () => {
    const ua = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    const isMobileUA =
        ua.includes("android") ||
        ua.includes("iphone") ||
        ua.includes("ipad") ||
        ua.includes("ipod");

    const isDesktopPlatform =
        platform.includes("win") ||
        platform.includes("mac") ||
        platform.includes("linux");

    return isMobileUA && !isDesktopPlatform;
    };

    // if (!isMobileDevice()) {
    //     return (
    //         <div className="kyc-blocked">
    //             <h2>KYC Unavailable</h2>

    //             <p>
    //                 Identity verification can only be completed on a mobile device.
    //                 Please continue on your phone or tablet.
    //             </p>
    //         </div>
    //     );
    // }



    return ( 
        <div className="KYC">
            <div className="KYC-header">
                <h2>KYC Verification</h2>
                <p>Verify your identity</p>
            </div>

            <div className="KYC-body">
                <div className="KYC-steps">
                    <div className="KYC-steps-container">
                        <div className="steps-icon">
                            <p>Personal Info</p>
                            <i className="fa-solid fa-user"
                                style={{color: step === 1 ? "#0d47a1" : "Grey"}}
                            ></i>
                        </div>

                        <div className="steps-icon">
                            <p>ID Verification</p>
                            <i className="fa-solid fa-id-card"
                                style={{color: step === 2 ? "#0d47a1" : "Grey"}}
                            ></i>
                        </div>

                        <div className="steps-icon">
                            <p>Selfie</p>
                            <i className="fa-solid fa-camera"
                                style={{color: step === 3 ? "#0d47a1" : "Grey"}}
                            ></i>
                        </div>

                        <div className="steps-icon">
                            <p>Submit</p>
                            <i className="fa-solid fa-list-check"
                                style={{color: step === 4 ? "#0d47a1" : "Grey"}}
                            ></i>
                        </div>
                    </div>
                </div>

                <div className="KYC-board">

                    <div className="step-counter">
                        <p>Step: {step}/4</p>
                    </div>


                    {step === 1 ? (
                        <div className="personal-info">
                            <h3>Personal Info</h3>
                            <form onSubmit={(e) => { e.preventDefault(); nextStep(); console.log(kycData) }} className="KYC-form">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" value={fullName} placeholder="Your name as it is on your Id" required onChange={(e) => setFullName(e.target.value)} />
                                
                                <label htmlFor="address">Address</label>
                                <input type="address" name="address" value={address} placeholder="3 tafawa Balawa Street, Ikoyi, Lagos" required onChange={(e) => setAdress(e.target.value)} />

                                <label htmlFor="dOB">Date of Birth</label>
                                <input type="date" name="dOB" value={dOB} placeholder="12/12/1912" required onChange={(e) => setDOB(e.target.value)} />

                                <label htmlFor="nationality">Nationality</label>
                                <input type="text" name="nationality" value={nationality} placeholder="e.g: Nigerian" required onChange={(e) => setNatioality(e.target.value)} />

                                <label htmlFor="Id_type">Id Type</label>
                                <select name="Id_type" id="id-type" value={idType} required onChange={(e) => setIdType(e.target.value)} >
                                    <option value="Select Id" >Select Id</option>
                                    <option value="Drivers Licence">Driver's Licence</option>
                                    <option value="Passport">Passport</option>
                                    <option value="National Id">National Id</option>
                                    <option value="Voters Id">Voters Id</option>
                                </select>

                                <label htmlFor="Id_Number">Id Number</label>
                                <input type="text" name="Id_Number" value={idNumber} placeholder="" required onChange={(e) =>setIdNumber(e.target.value)} />
                                
                            </form>
                            
                        </div>
                    ) : step === 2 ? (
                        <div className="id-verification">
                            <h3>Upload your ID</h3>

                            <div className="upload-box">
                                <div className="upload-box-icon">
                                    {/* Camera Preview for ID */}
                                    
                                    <div className="camera-preview"
                                        style={{
                                            display: cameraStream && step !== 3 ? 'block' : 'none'
                                        }}
                                    >
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                        />
                                        <div className="camera-controls" >
                                            <button className="capture-image" onClick={captureImage} >
                                                
                                            </button>
                                            <button className="close-camera" onClick={stopCamera} >
                                                ✕ Close
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* File Input for Upload */}
                                    <div className="upload-box-input">
                                        <input
                                            id="uploadIdInput"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleFileUpload}
                                        />
                                    </div>

                                    {/* Display uploaded files */}
                                    <div className="uploaded-file">
                                        {idImageFront && (
                                            <div className="uploaded-file-data front-of-id">
                                                <p>{idImageFront.name || "Front ID"}</p>
                                                <p className="upload-file-size">
                                                    size: <span>
                                                        {idImageFront.size 
                                                            ? (idImageFront.size / 1024).toFixed(1) 
                                                            : 'N/A'} KB
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                        
                                        {idImageBack && (
                                            <div className="uploaded-file-data back-of-id">
                                                <p>{idImageBack.name || "Back ID"}</p>
                                                <p className="upload-file-size">
                                                    size: <span>
                                                        {idImageBack.size 
                                                            ? (idImageBack.size / 1024).toFixed(1) 
                                                            : 'N/A'} KB
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Upload and Camera Buttons */}
                                <div className="upload-buttons">
                                    <button
                                        onClick={() => document.getElementById("uploadIdInput").click()} 
                                    >
                                        {!idImageFront
                                            ? "Upload front of ID"
                                            : !idImageBack
                                            ? "Upload back of ID"
                                            : "Both sides uploaded"}
                                    </button>

                                    <button onClick={openCamera}>
                                        {!idImageFront
                                            ? "Take picture of front"
                                            : !idImageBack
                                            ? "Take picture of back"
                                            : "Both sides captured"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : step === 3 ? (
                        <div className="selfie">
                            <h3>Selfie</h3>

                            <div className="upload-box">
                                <div className="upload-box-icon">
                                    {/* Camera Preview for Selfie */}
                                    
                                    <div className="camera-preview"
                                        style={{
                                            display: cameraStream && step === 3 ? 'block' : 'none'
                                        }}
                                    >
                                        <video 
                                            ref={videoRef} 
                                            autoPlay 
                                            playsInline 
                                        />
                                        <div className="camera-controls">
                                            <button className="capture-image" onClick={captureImage}>
                                                
                                            </button>
                                            <button className="close-camera" onClick={stopCamera}>Close Camera</button>
                                        </div>
                                    </div>
                                    
                                    {/*Show preview of captured selfie when camera is not active */}
                                    {!cameraStream && selfie && (
                                        <div className="selfie-preview">
                                            <img 
                                                src={URL.createObjectURL(selfie)} 
                                                alt="Selfie preview" 
                                            />
                                        </div>
                                    )}
                                    

                                    <div className="uploaded-file selfie-uploaded-file">
                                        {selfie && (
                                            <div className="uploaded-file-data">
                                                <p>{selfie.name || "selfie.png"}</p>
                                                <p className="upload-file-size">
                                                    size: <span>
                                                        {selfie.size 
                                                            ? (selfie.size / 1024).toFixed(1) 
                                                            : 'N/A'} KB
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="upload-buttons">
                                    {/* Open Camera Button */}
                                    <button onClick={openCamera}>
                                        {!selfie ? "Take a Selfie" : "Retake Selfie"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="Submit">
                            <h3>SUbmit</h3>
                            <p>You can go back and review your entries or submit</p>
                        </div>
                    )}

                    <div className="KYC-buttons">
                        <button className="KYC-back" onClick={() => prevStep()}
                            disabled= {step === 1}
                            style={{
                                backgroundColor: step === 1 ? "var(--textGray)" : "var(--mainBlack)",
                                cursor: step === 1 ? "not-allowed" : "pointer"
                            }}
                        >Back</button>
                        <button className="KYC-next" 
                            onClick={() => {

                                if (step === 4) {
                                    handleKycUpload()
                                    return
                                }

                                // Go to next step if process is complete
                                if (isStepComplete()) {
                                    nextStep()
                                } else {
                                    console.log(kycData)
                                    showFail("Please complect this step before going to the next")
                                }
                            }}

                            style={{
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                            disabled={loading} 
                        >{step === 4 ? loading ? 'processing...' : "Submit" : "Next"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KYC;