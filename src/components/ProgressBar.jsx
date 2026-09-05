import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ProgressBar({ progress = 0 }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
        <span className="text-slate-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Application Progress</span>
        </span>
        <span className="text-cyan-400 font-mono font-bold text-xs">{progress}%</span>
      </div>

      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 transition-all duration-500 shadow-sm"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
