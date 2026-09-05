import React from 'react';
import { AlertTriangle, RefreshCw, MessageSquare, Upload, ArrowRight } from 'lucide-react';

export default function ErrorState({ title = 'Something went wrong', message, onRetry, onTypeInstead, onUploadImage, onContinue }) {
  return (
    <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-center space-y-4 max-w-md mx-auto shadow-2xl backdrop-blur-md">
      <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div>
        <h4 className="text-sm font-bold text-rose-200">{title}</h4>
        <p className="text-xs text-slate-300 mt-1">{message || 'An error occurred during processing. Please choose an alternative input method.'}</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry
          </button>
        )}

        {onTypeInstead && (
          <button
            onClick={onTypeInstead}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-white/10"
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Type Instead
          </button>
        )}

        {onUploadImage && (
          <button
            onClick={onUploadImage}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 border border-indigo-500/30"
          >
            <Upload className="w-3.5 h-3.5 text-indigo-400" /> Upload Image
          </button>
        )}

        {onContinue && (
          <button
            onClick={onContinue}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            Continue Manually <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
