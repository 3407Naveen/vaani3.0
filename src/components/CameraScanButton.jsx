import React from 'react';
import { Scan, Camera } from 'lucide-react';

export default function CameraScanButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      <Scan className="w-4 h-4 text-slate-950" />
      <span>Scan a Form</span>
    </button>
  );
}
