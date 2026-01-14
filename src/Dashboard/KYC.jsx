import { useState,useRef } from "react";
import { uploadKYC } from "../Api/Upload-KYC";
import "./KYC.css"

function KYC() {
    
    const [step, setStep] = useState(2) //Current KYC stage
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
    

    // Open Camera with front/back camera selection
    const openCamera = async () => {
        try {
            // Check if we're in a secure context
            if (!window.isSecureContext) {
                alert("Camera access requires HTTPS connection");
                return;
            }

            // Check if getUserMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("Camera access is not supported on this browser/device");
                return;
            }

            // Determine which camera to use based on step
            const useFrontCamera = step === 3; // Front camera for selfie, back camera for ID
            
            // Request camera access with facingMode
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: useFrontCamera ? "user" : "environment" 
                } 
            });

            // Assign stream to <video> element
            if (videoRef.current) {
                videoRef.current.srcObject = stream;

                // Wait for metadata to load before playing
                videoRef.current.onloadedmetadata = async () => {
                    try {
                        await videoRef.current.play();
                        console.log("Camera started successfully");
                    } catch (playError) {
                        console.error("Error playing video:", playError);
                    }
                };
            }

            // Store the stream
            setCameraStream(stream);

        } catch (error) {
            console.error("Camera cannot be opened:", error);
            alert("Unable to access camera. Please check permissions.");

            // More specific error messages
            if (error.name === 'NotAllowedError') {
                alert("Camera permission denied. Please allow camera access in your browser settings.");
            } else if (error.name === 'NotFoundError') {
                alert("No camera found on this device.");
            } else if (error.name === 'NotReadableError') {
                alert("Camera is already in use by another application.");
            } else if (error.name === 'SecurityError') {
                alert("Camera access blocked due to security settings. Please ensure you're using HTTPS.");
            } else {
                alert(`Unable to access camera: ${error.message}`);
            }
        }
    };


    const stopCamera = () => {
        // Stop all tracks in the camera stream
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => {
                track.stop();
                console.log("Camera track stopped");
            });
        }
        
        // Clear video source
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        
        setCameraStream(null);
    }

    // Capture Image
    const captureImage = () => {
        try {
            if (!videoRef.current || !cameraStream) {
                console.error("No video stream available");
                alert("Camera not ready. Please try again.");
                return;
            }

            // Check if video has valid dimensions
            if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
                console.error("Video dimensions are zero");
                alert("Camera is not ready yet. Please wait a moment.");
                return;
            }

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
                // Selfie
                setKycData(prev => ({
                    ...prev,
                    selfie: {
                        data: imageDataUrl,
                        name: "selfie.png",
                        size: imageDataUrl.length
                    }
                }));
            } else {
                // ID front or back
                if (!kycData.idImageFront) {
                    setKycData(prev => ({
                        ...prev,
                        idImageFront: {
                            data: imageDataUrl,
                            name: "id_front.png",
                            size: imageDataUrl.length
                        }
                    }));
                } else if (!kycData.idImageBack) {
                    setKycData(prev => ({
                        ...prev,
                        idImageBack: {
                            data: imageDataUrl,
                            name: "id_back.png",
                            size: imageDataUrl.length
                        }
                    }));
                }
            }

            console.log("Image captured successfully");
            
            // Stop camera AFTER storing the image
            stopCamera();

        } catch (error) {
            console.error("Failed to Capture Image:", error);
            alert("Failed to capture image. Please try again.");
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
                            <h3>Upload your ID</h3>

                            <div className="upload-box">
                                <div className="upload-box-icon">
                                    {/* Camera Preview for ID */}
                                    {cameraStream && step !== 3 && (
                                        <div className="camera-preview">
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                            />
                                            <div className="camera-controls" >
                                                <button className="capture-image" onClick={captureImage} >
                                                    Capture
                                                </button>
                                                <button className="close-camera" onClick={stopCamera} >
                                                    ✕ Close
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
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
                                        {kycData.idImageFront && (
                                            <div className="uploaded-file-data front-of-id">
                                                <p>{kycData.idImageFront.name || "Front ID"}</p>
                                                <p className="upload-file-size">
                                                    size: <span>
                                                        {kycData.idImageFront.size 
                                                            ? (kycData.idImageFront.size / 1024).toFixed(1) 
                                                            : 'N/A'} KB
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                        
                                        {kycData.idImageBack && (
                                            <div className="uploaded-file-data back-of-id">
                                                <p>{kycData.idImageBack.name || "Back ID"}</p>
                                                <p className="upload-file-size">
                                                    size: <span>
                                                        {kycData.idImageBack.size 
                                                            ? (kycData.idImageBack.size / 1024).toFixed(1) 
                                                            : 'N/A'} KB
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Upload and Camera Buttons - Hide when camera is active */}
                                {!cameraStream && (
                                    <div className="upload-buttons">
                                        <button
                                            onClick={() => document.getElementById("uploadIdInput").click()} 
                                        >
                                            {!kycData.idImageFront
                                                ? "Upload front of ID"
                                                : !kycData.idImageBack
                                                ? "Upload back of ID"
                                                : "Both sides uploaded"}
                                        </button>

                                        <button onClick={openCamera}>
                                            {!kycData.idImageFront
                                                ? "Take picture of front"
                                                : !kycData.idImageBack
                                                ? "Take picture of back"
                                                : "Retake pictures"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : step === 3 ? (
                        <div className="selfie">
                            <h3>Selfie</h3>

                            <div className="upload-box">
                                <div className="upload-box-icon">
                                    {/* Camera Preview - Only show when camera is active */}
                                    {cameraStream ? (
                                        <div className="camera-preview">
                                            <video 
                                                ref={videoRef} 
                                                autoPlay 
                                                playsInline 
                                            />
                                            <div className="camera-controls">
                                                <button className="capture-image" onClick={captureImage}>
                                                    Capture
                                                </button>
                                                <button className="close-camera" onClick={stopCamera}>Close Camera</button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Show preview of captured selfie when camera is not active
                                        kycData.selfie && (
                                            <div className="selfie-preview">
                                                <img 
                                                    src={kycData.selfie.data} 
                                                    alt="Selfie preview" 
                                                />
                                            </div>
                                        )
                                    )}

                                    <div className="uploaded-file">
                                        {kycData.selfie && (
                                            <div className="uploaded-file-data">
                                                <p>{kycData.selfie.name || "selfie.png"}</p>
                                                <p className="upload-file-size">
                                                    size: <span>
                                                        {kycData.selfie.size 
                                                            ? (kycData.selfie.size / 1024).toFixed(1) 
                                                            : 'N/A'} KB
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="upload-buttons">
                                    {/* Camera Capture Button - Only show when camera is NOT active */}
                                    {!cameraStream && (
                                        <button onClick={openCamera}>
                                            {!kycData.selfie ? "Take a Selfie" : "Retake Selfie"}
                                        </button>
                                    )}
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

                                if (step === 4) {
                                    uploadKYC(kycData)
                                    return
                                }

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