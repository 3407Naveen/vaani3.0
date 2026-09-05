import React, { useState } from 'react';
import { X, ShieldAlert, Scan, Sparkles } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { scanFormImage } from '../services/formScanService';
import CameraPreview from './CameraPreview';
import ScanProgress from './ScanProgress';
import DetectedFieldsPreview from './DetectedFieldsPreview';
import FormExplanationCard from './FormExplanationCard';

export default function FormScanner({ isOpen, onClose, onFormScannedAndStart }) {
  const {
    videoRef,
    cameraState,
    setCameraState,
    errorMessage,
    capturedImage,
    setCapturedImage,
    startCamera,
    capturePhoto,
    resetCamera
  } = useCamera();

  const [scanResult, setScanResult] = useState(null);

  React.useEffect(() => {
    if (isOpen && cameraState === 'IDLE') {
      startCamera();
    } else if (!isOpen) {
      resetCamera();
      setScanResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCaptureAndScan = async () => {
    const photoDataUrl = capturePhoto();
    setCameraState('SCANNING');

    try {
      setTimeout(async () => {
        setCameraState('ANALYZING');
        const res = await scanFormImage(photoDataUrl);
        setScanResult(res);
        setCameraState('SUCCESS');
      }, 1000);
    } catch (err) {
      console.error(err);
      setCameraState('ERROR');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      setCapturedImage(evt.target.result);
      setCameraState('SCANNING');
      setTimeout(async () => {
        setCameraState('ANALYZING');
        const res = await scanFormImage(file);
        setScanResult(res);
        setCameraState('SUCCESS');
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  const handleStartFilling = () => {
    if (onFormScannedAndStart) {
      onFormScannedAndStart(scanResult?.form_id || 'scanned_form_demo', scanResult);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Scan a Physical Form</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  Demo Scan
                </span>
              </div>
              <p className="text-xs text-slate-400">Don't know what the form says? Let VaaniForm scan and guide you.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Privacy Callout */}
        <div className="p-3 mb-4 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-slate-300 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>
            Privacy Guard: Your form image is processed locally to extract fields needed for this session only.
          </span>
        </div>

        {/* Main Camera Preview Component */}
        <CameraPreview
          videoRef={videoRef}
          cameraState={cameraState}
          capturedImage={capturedImage}
          errorMessage={errorMessage}
          onCapture={handleCaptureAndScan}
          onRetake={resetCamera}
          onFileUpload={handleFileUpload}
        />

        {/* Scan Progress */}
        <ScanProgress state={cameraState} />

        {/* OCR Result & Field Breakdown */}
        {scanResult && (
          <>
            <DetectedFieldsPreview
              scanResult={scanResult}
              onStartVoiceFilling={handleStartFilling}
            />

            {/* Explain This Form Section */}
            <FormExplanationCard fields={scanResult.detected_fields} />
          </>
        )}

      </div>
    </div>
  );
}
