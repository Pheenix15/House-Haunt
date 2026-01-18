import { useCallback } from "react";

//KYC CAMERA FUNCTIONS HERE

export const useCamera = ({
    videoRef,
    step,
    cameraStream,
    setCameraStream,
    idImageFront,
    setIdImageFront,
    idImageBack,
    setIdImageBack,
    selfie,
    setSelfie, 
}) =>{
    // Open Camera with front/back camera selection
    const openCamera = useCallback(async () => {
        try {
            // Check if context (browser, connection) is secure
            if (!window.isSecureContext) {
                alert("Camera access requires HTTPS connection");
                return;
            }

            // Check if getUserMedia is supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert("Camera access is not supported on this browser/device");
                return;
            }

            // Stop any existing stream first
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }

            // Determine which camera to use based on step
            const useFrontCamera = step === 3; // Front camera for selfie, back camera for ID
            
            console.log("Requesting camera access...", useFrontCamera ? "front" : "back");

            // Request camera access with facingMode
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: useFrontCamera ? "user" : "environment" 
                },
                audio: false
            });

            // For Debugging
            console.log("Camera stream obtained:", stream);
            console.log("Video tracks:", stream.getVideoTracks());

            // Store the stream
            setCameraStream(stream);

            // Assign stream to <video> element
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                
                // Force play after a short delay
                setTimeout(async () => {
                    if (videoRef.current) {
                        try {
                            await videoRef.current.play();
                            console.log("Video playing successfully");
                        } catch (playError) {
                            console.error("Play error:", playError);
                        }
                    }
                }, 100);
            } else {
                console.error("Video ref is null");
            }

            

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
    }, [cameraStream, setCameraStream, step, videoRef]);


    const stopCamera = useCallback(() => {
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
    }, [cameraStream, setCameraStream, videoRef])

    // Capture Image
    const captureImage = useCallback(() => {
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

            // Convert base64 to file
            const base64ToFile = (base64, filename) => {
                const [meta, data] = base64.split(",");
                const mime = meta.match(/:(.*?);/)[1];
                const bytes = atob(data);
                const arr = new Uint8Array(bytes.length);

                for (let i = 0; i < bytes.length; i++) {
                    arr[i] = bytes.charCodeAt(i);
                }

                return new File([arr], filename, { type: mime });
            };

            

            // Store according to step
            console.log("Current step:", step);
            console.log("idImageFront exists:", !!idImageFront);
            console.log("idImageBack exists:", !!idImageBack);

            if (step === 3) {
                setSelfie(base64ToFile(imageDataUrl, "selfie.png"));
            } else {
                // Use functional updates to get current state
                setIdImageFront(currentFront => {
                    if (!currentFront) {
                        console.log("Storing in FRONT");
                        return base64ToFile(imageDataUrl, "id_front.png");
                    } else {
                        // Front already exists, store in back
                        setIdImageBack(currentBack => {
                            if (!currentBack) {
                                console.log("Storing in BACK");
                                return base64ToFile(imageDataUrl, "id_back.png");
                            }
                            return currentBack;
                        });
                        return currentFront;
                    }
                });
            }

            console.log("Image captured successfully");
            
            // Stop camera AFTER storing the image
            stopCamera();

        } catch (error) {
            console.error("Failed to Capture Image:", error);
            alert("Failed to capture image. Please try again.");
        }
    }, [cameraStream, setIdImageFront, setIdImageBack, setSelfie, step, stopCamera, videoRef]);

    return {
        openCamera,
        stopCamera,
        captureImage
    };
}