import React from 'react';
import { Loader2, ScanLine } from 'lucide-react';

export default function ScanProgress({ state }) {
  if (state !== 'SCANNING' && state !== 'ANALYZING') return null;

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-center space-y-3 animate-fade-in my-3">
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-cyan-300">
        <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
        <span>{state === 'SCANNING' ? 'Scanning Document Layout...' : 'Identifying Form Fields via VaaniForm OCR...'}</span>
      </div>

      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-cyan-500/20">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-teal-300 rounded-full animate-pulse w-3/4" />
      </div>

      <p className="text-[11px] text-slate-400 font-mono">
        Extracting field labels, required inputs, and translation mappings...
      </p>
    </div>
  );
}
