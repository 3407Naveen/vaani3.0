import { useState, useRef, useCallback } from 'react';

export function useCamera() {
  const [cameraState, setCameraState] = useState('IDLE'); // IDLE, READY, CAPTURING, SCANNING, ANALYZING, SUCCESS, ERROR
  const [errorMessage, setErrorMessage] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = useCallback(async () => {
    setErrorMessage(null);
    setCameraState('READY');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported on this device/browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
      setCameraState('ERROR');
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMessage('Camera access permission denied.');
      } else {
        setErrorMessage(err.message || 'Camera access unavailable.');
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraState('IDLE');
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return null;
    setCameraState('CAPTURING');
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedImage(dataUrl);
    stopCamera();
    return dataUrl;
  }, [stopCamera]);

  const resetCamera = useCallback(() => {
    stopCamera();
    setCapturedImage(null);
    setErrorMessage(null);
    setCameraState('IDLE');
  }, [stopCamera]);

  return {
    videoRef,
    cameraState,
    setCameraState,
    errorMessage,
    capturedImage,
    setCapturedImage,
    startCamera,
    stopCamera,
    capturePhoto,
    resetCamera
  };
}
