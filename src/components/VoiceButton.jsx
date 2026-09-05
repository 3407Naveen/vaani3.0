import React from 'react';
import { Mic, MicOff, Loader2, Check, AlertCircle, RefreshCw } from 'lucide-react';
import Waveform from './Waveform';

export default function VoiceButton({
  recorderState = 'IDLE',
  errorMessage = null,
  onStartListening,
  onStopListening,
  onResetError,
  onSwitchToType
}) {
  const isListening = recorderState === 'LISTENING';
  const isProcessing = recorderState === 'PROCESSING';
  const isSuccess = recorderState === 'SUCCESS';
  const isError = recorderState === 'ERROR';

  const handleClick = () => {
    if (isListening) {
      onStopListening();
    } else if (isError) {
      if (onResetError) onResetError();
      onStartListening();
    } else if (recorderState === 'IDLE' || isSuccess) {
      onStartListening();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Microphone Main Button */}
      <div className="relative group flex items-center justify-center">
        {/* Animated Glow Pulsing Ring */}
        {isListening && (
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 animate-mic-pulse pointer-events-none scale-125" />
        )}
        
        <button
          onClick={handleClick}
          disabled={isProcessing}
          className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
            isListening
              ? 'bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-600 ring-4 ring-cyan-400/50 scale-105 shadow-cyan-500/50'
              : isProcessing
              ? 'bg-slate-800 border-2 border-indigo-500/50 ring-2 ring-indigo-500/30'
              : isSuccess
              ? 'bg-emerald-600 border-2 border-emerald-400 shadow-emerald-500/30'
              : isError
              ? 'bg-rose-950/80 border-2 border-rose-500/50 text-rose-300 shadow-rose-500/20'
              : 'bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 border-2 border-white/20 hover:scale-105 hover:shadow-cyan-500/40'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Tap to speak'}
        >
          {isProcessing ? (
            <Loader2 className="w-9 h-9 text-indigo-400 animate-spin" />
          ) : isSuccess ? (
            <Check className="w-10 h-10 text-white animate-bounce" />
          ) : isError ? (
            <AlertCircle className="w-9 h-9 text-rose-400" />
          ) : (
            <Mic className={`w-9 h-9 transition-transform duration-200 ${isListening ? 'scale-110 text-slate-950' : 'text-white group-hover:scale-110'}`} />
          )}

          {/* Sub-label inside button */}
          <span className={`text-[10px] font-bold tracking-wider uppercase mt-1 ${isListening ? 'text-slate-950' : 'text-white/80'}`}>
            {isListening ? 'Stop' : isProcessing ? 'Wait' : isSuccess ? 'Done' : isError ? 'Retry' : 'Speak'}
          </span>
        </button>
      </div>

      {/* Dynamic Status Text & Waveform */}
      <div className="mt-3 text-center min-h-[52px] flex flex-col items-center justify-center">
        {isListening && (
          <div className="flex flex-col items-center animate-fade-in">
            <Waveform active={true} />
            <span className="text-xs font-semibold text-cyan-400 tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Listening to Tamil / English...
            </span>
          </div>
        )}

        {isProcessing && (
          <span className="text-xs font-semibold text-indigo-300 tracking-wide flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
            Understanding speech intent & extracting fields...
          </span>
        )}

        {isSuccess && (
          <span className="text-xs font-semibold text-emerald-400 tracking-wide flex items-center gap-1">
            <Check className="w-4 h-4" /> Got it! Field extracted.
          </span>
        )}

        {recorderState === 'IDLE' && (
          <span className="text-xs font-medium text-slate-400">
            Tap mic button to speak naturally
          </span>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-rose-300 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/30">
              {errorMessage || 'Could not understand. Try again.'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClick}
                className="text-[11px] font-semibold text-cyan-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Retry Mic
              </button>
              {onSwitchToType && (
                <button
                  onClick={onSwitchToType}
                  className="text-[11px] font-semibold text-slate-400 hover:text-white underline"
                >
                  Type Instead
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
