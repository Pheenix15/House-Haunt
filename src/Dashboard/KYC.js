/**
 * Request camera permission and get video stream
 * @returns {Promise<MediaStream>} - Returns the camera stream
 */

export async function getCameraStream() {
  try {
    // Request access to user's camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },  // Preferred width
        height: { ideal: 720 },   // Preferred height
        facingMode: 'user'        // 'user' = front camera, 'environment' = back camera
      },
      audio: false // disables audio
    });
    
    return stream;
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'NotAllowedError') {
      throw new Error('Camera permission denied. Please allow camera access.');
    } else if (error.name === 'NotFoundError') {
      throw new Error('No camera found on this device.');
    } else {
      throw new Error('Error accessing camera: ' + error.message);
    }
  }
}

/**
 * Stop the camera stream (turns off the camera)
 * @param {MediaStream} stream - The camera stream to stop
 */
export function stopCameraStream(stream) {
  if (stream) {
    // Get all video tracks
    const tracks = stream.getTracks();
    
    // Stops the video stream (tracks)
    tracks.forEach(track => {
      track.stop();
    });
  }
}

/**
 * Capture image from video element
 * @param {HTMLVideoElement} videoElement - The video element showing camera feed
 * @returns {string} - Base64 encoded image data
 */
export function captureImage(videoElement) {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  
  // Set canvas size to match video dimensions
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  
  // Get canvas context for drawing
  const context = canvas.getContext('2d');
  
  // Draw the current video frame onto the canvas
  // Parameters: (source, destX, destY, destWidth, destHeight)
  context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
  // Convert canvas to base64 image data
  // 'image/jpeg' format, 0.95 quality (0-1 scale)
  const imageData = canvas.toDataURL('image/jpeg', 0.95);
  
  return imageData;
}

/**
 * Convert base64 image to Blob (useful for file uploads)
 * @param {string} base64Data - Base64 encoded image
 * @returns {Blob} - Image blob
 */
export function base64ToBlob(base64Data) {
  // Split the base64 string
  const parts = base64Data.split(',');
  const contentType = parts[0].split(':')[1].split(';')[0];
  const raw = window.atob(parts[1]);
  
  // Convert to array
  const array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([array], { type: contentType });
}