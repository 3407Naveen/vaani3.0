import React from 'react';
import { Camera, RefreshCw, Upload, Sparkles } from 'lucide-react';

export default function CameraPreview({
  videoRef,
  cameraState,
  capturedImage,
  errorMessage,
  onCapture,
  onRetake,
  onFileUpload
}) {
  return (
    <div className="relative w-full aspect-[4/3] max-h-[360px] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/30 flex items-center justify-center shadow-2xl">
      
      {/* Video stream or Captured Image */}
      {capturedImage ? (
        <img src={capturedImage} alt="Scanned form preview" className="w-full h-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      )}

      {/* Document Framing Guide Corners */}
      <div className="absolute inset-6 border-2 border-dashed border-cyan-400/40 rounded-xl pointer-events-none flex flex-col justify-between p-2">
        <div className="flex justify-between">
          <div className="w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
          <div className="w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        </div>
        <div className="flex justify-between">
          <div className="w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
          <div className="w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
        </div>
      </div>

      {/* Laser Scanning Animation Beam */}
      {(cameraState === 'SCANNING' || cameraState === 'ANALYZING') && (
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.9)] animate-scan-beam" />
      )}

      {/* Status Overlay Badge */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-bold text-cyan-300 flex items-center gap-1.5 shadow-md">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>
          {cameraState === 'READY'
            ? 'Position form inside frame'
            : cameraState === 'CAPTURING'
            ? 'Hold steady...'
            : cameraState === 'SCANNING'
            ? 'Reading paper form...'
            : cameraState === 'ANALYZING'
            ? 'Identifying fields via OCR...'
            : cameraState === 'SUCCESS'
            ? 'Form Extracted Successfully'
            : 'Form Scanner'}
        </span>
      </div>

      {/* Camera Action Overlay Controls */}
      {cameraState === 'READY' && (
        <div className="absolute bottom-4 flex items-center gap-3">
          <button
            onClick={onCapture}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>Snap Form Photo</span>
          </button>
          
          <label className="px-4 py-2.5 rounded-full bg-slate-900/90 text-slate-200 border border-white/20 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 transition-all">
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            <span>Upload Image</span>
            <input type="file" accept="image/*" className="hidden" onChange={onFileUpload} />
          </label>
        </div>
      )}

      {capturedImage && cameraState !== 'SCANNING' && cameraState !== 'ANALYZING' && (
        <div className="absolute bottom-3 right-3">
          <button
            onClick={onRetake}
            className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-xs text-slate-300 hover:text-white border border-white/10 flex items-center gap-1 shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retake
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center">
          <p className="text-xs text-rose-400 font-semibold mb-3">{errorMessage}</p>
          <div className="flex gap-2">
            <button
              onClick={onRetake}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold"
            >
              Retry Camera
            </button>
            <label className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold cursor-pointer">
              Upload Image Instead
              <input type="file" accept="image/*" className="hidden" onChange={onFileUpload} />
            </label>
          </div>
        </div>
      )}

    </div>
  );
}
