import React from 'react';
import { FileCheck2, CheckCircle2, Mic } from 'lucide-react';

export default function DetectedFieldsPreview({ scanResult, onStartVoiceFilling }) {
  if (!scanResult) return null;

  const { form_name, fields_detected_count = 10, confidence = 94, detected_fields = [] } = scanResult;

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-3 animate-fade-in my-3">
      
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Form Detected</span>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>{form_name || 'Scanned Scholarship Form'}</span>
          </h4>
        </div>

        <div className="text-right">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
            {confidence}% Confidence
          </span>
          <p className="text-[10px] text-slate-400 mt-0.5">{fields_detected_count} Fields Extracted</p>
        </div>
      </div>

      {/* Detected Fields Chips Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono py-1">
        {detected_fields.map((f, idx) => (
          <div key={f.id || idx} className="p-2 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-between text-slate-200">
            <span className="truncate">{f.label}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Start Voice Filling CTA */}
      <button
        onClick={onStartVoiceFilling}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-95"
      >
        <Mic className="w-4 h-4 text-slate-950" />
        <span>Start Voice Filling Scanned Form</span>
      </button>

    </div>
  );
}
