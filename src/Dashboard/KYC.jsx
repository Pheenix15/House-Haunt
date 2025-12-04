import { useState,useRef } from "react";
import "./KYC.css"

function KYC() {
    
    const [step, setStep] = useState(1) //Current KYC stage
    const [cameraStream, setCameraStream] = useState(null); //Holds camera strem and video element
    const videoRef = useRef(null); // <video> element shown to user
    const [failAlert, setFailAlert] = useState("") //Alert for errors
    const [kycData, setKycData] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        dOB: "",
        idImageFront: null,
        idImageBack: null,
        selfie: null,
    });


    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    // Validate Steps
    const isStepComplete = () => {
        if (step === 1) {
            // Personal Info
            return kycData.fullName && kycData.address && kycData.phoneNumber && kycData.dOB;
        }
        if (step === 2) {
            // ID upload
            return kycData.idImageFront && kycData.idImageBack;
        }
        if (step === 3) {
            // Selfie
            return kycData.selfie;
        }

        // Review
        return true;
    };

    // Handle uploading Id Document
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Store front first, then back
        setKycData(prev => ({
            ...prev,
            idImageFront: prev.idImageFront || file,
            idImageBack: prev.idImageFront ? file : prev.idImageBack
        }));
    };

    // Id Document Upload Handler for Camera Capture
    

    // Open Camera
    const openCamera = async () => {
        try {
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            // Assign stream to <video> element
            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                // Wait for metadata to load before playing
                videoRef.current.onloadedmetadata = async () => {
                    await videoRef.current.play();
                };
            }

            // Store the stream
            setCameraStream(stream);

        } catch (error) {
            console.error("Camera cannot be opened:", error);
        }
    };

    // Capture Image
    const captureImage = () => {
        try {
            if (!videoRef.current) return;

            // Create canvas to draw the current frame
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            // Convert frame to base64 image
            const imageDataUrl = canvas.toDataURL("image/png");

            // Store according to step
            if (step === 3) {
                setKycData(prev => ({
                    ...prev,
                    selfie: imageDataUrl
                }));
            } else {
                setKycData(prev => ({
                    ...prev,
                    idImageFront: prev.idImageFront ? prev.idImageFront : imageDataUrl,
                    idImageBack: prev.idImageFront ? imageDataUrl : prev.idImageBack
                }));
            }

            // Stop camera
            cameraStream?.getTracks().forEach(track => track.stop());
            setCameraStream(null);

        } catch (error) {
            console.error("Failed to Capture Image:", error);
        }
    };


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
                            <p>Review</p>
                            <i className="fa-solid fa-list-check"
                                style={{color: step === 4 ? "#0d47a1" : "Grey"}}
                            ></i>
                        </div>
                    </div>
                </div>

                <div className="KYC-board">
                    {failAlert && (
                        <div className="fail-alert">
                            {failAlert}
                        </div>
                    )}

                    <div className="step-counter">
                        <p>Step: {step}/4</p>
                    </div>


                    {step === 1 ? (
                        <div className="personal-info">
                            <h3>Personal Info</h3>
                            <form onSubmit={(e) => { e.preventDefault(); nextStep(); console.log(kycData) }} className="KYC-form">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text" name="fullName" value={kycData.fullName} placeholder="Anthony Patrick" required onChange={(e) => setKycData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                                <label htmlFor="address">Address</label>
                                <input type="address" name="address" value={kycData.address} placeholder="3 tafawa Balawa Street, Ikoyi, Lagos" required onChange={(e) => setKycData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="number" name="phoneNumber" value={kycData.phoneNumber} placeholder="+2349123456789" required onChange={(e) =>setKycData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                                <label htmlFor="dOB">Date of Birth</label>
                                <input type="date" name="dOB" value={kycData.dOB} placeholder="12/12/1912" required onChange={(e) => setKycData(prev => ({ ...prev, [e.target.name]: e.target.value }))} />
                                
                            </form>
                            
                        </div>
                    ) : step === 2 ? (
                        <div className="id-verification">
                            <h3>Upload your Id</h3>

                            <div className="upload-box">
                                <div className="upload-box-icon">
                                    {/* Camera Preview */}
                                    {cameraStream && (
                                        <div className="camera-preview">
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
                                            />
                                            <button onClick={captureImage}>Capture</button>
                                        </div>
                                    )}
                                    <div className="upload-box-input">
                                        <input
                                            id="uploadIdInput"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleFileUpload}
                                        />
                                    </div>

                                    <div className="uploaded-file">
                                        {kycData.idImageFront && (
                                            <div className="uploaded-file-data front-of-id">
                                                <p>{kycData.idImageFront.name}</p>
                                                <p className="upload-file-size" >size: <span>{(kycData.idImageFront.size / 1024).toFixed(1)} KB</span></p>
                                            </div>
                                        )}
                                        
                                        {kycData.idImageBack && (
                                            <div className="uploaded-file-data back-of-id">
                                                <p>{kycData.idImageBack.name}</p>
                                                <p className="upload-file-size" >size: <span>{(kycData.idImageBack.size / 1024).toFixed(1)} KB</span></p>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>

                                <div className="upload-buttons">
                                    {/* Upload Button */}
                                    <button
                                        onClick={() => document.getElementById("uploadIdInput").click()}
                                    >
                                        {!kycData.idImageFront
                                            ? "Upload front of ID"
                                            : !kycData.idImageBack
                                            ? "Upload back of ID"
                                            : "Both sides uploaded"}
                                    </button>

                                    {/* Camera Capture Button */}
                                    <button onClick={openCamera}>
                                        {!kycData.idImageFront
                                            ? "Take a picture of front of ID"
                                            : !kycData.idImageBack
                                            ? "Take a picture of back of ID"
                                            : "Both pictures taken"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : step === 3 ? (
                        <div className="selfie">
                            <h3>Sefie</h3>

                            <div className="upload-box">
                                <div className="upload-box-icon">
                                    <div className="upload-box-input">
                                        <input
                                            id="uploadIdInput"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (!file) return;

                                                // Decide where to store the file
                                                setKycData(prev => ({
                                                ...prev,
                                                idImageFront: prev.idImageFront ? prev.idImageFront : file,
                                                idImageBack: prev.idImageFront ? file : prev.idImageBack
                                                }));
                                            }}
                                        />

                                        {/* For Camera Stream */}
                                        <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
                                    </div>

                                    <div className="uploaded-file">
                                        {kycData.idImageFront && (
                                            <div className="uploaded-file-data front-of-id">
                                                <p>{kycData.idImageFront.name}</p>
                                                <p className="upload-file-size" >size: <span>{(kycData.idImageFront.size / 1024).toFixed(1)} KB</span></p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="upload-buttons">
                                    {/* Camera Capture Button */}
                                    <button onClick={openCamera}>
                                        {!kycData.selfie
                                            ? "Take a Selfie"
                                            : !kycData.selfie
                                            ? "Selfie taken"
                                            : "Take a Selfie"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="Review">
                            <h3>Review</h3>
                        </div>
                    )}

                    <div className="KYC-buttons">
                        <button className="KYC-back" onClick={() => prevStep()}
                            disabled= {step === 1}
                            style={{
                                backgroundColor: step === 1 ? "var(--mainBlack)" : "var(--mainBlue)",
                                cursor: step === 1 ? "not-allowed" : "pointer"
                            }}
                        >Back</button>
                        <button className="KYC-next" 
                            onClick={() => {
                                // Go to next step if process is complete
                                if (isStepComplete()) {
                                    nextStep()
                                } else {
                                    console.log(kycData)
                                    setFailAlert("Please complect this step before going to the next")

                                    setTimeout(() => {
                                        setFailAlert("")
                                    }, 3000);
                                }
                            }}
                            // disabled={!isStepComplete()} 
                        >{step === 4 ? "Submit" : "Next"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KYC;