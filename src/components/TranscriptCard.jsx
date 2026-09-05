import React from 'react';
import { Mic, Globe, CheckCircle2 } from 'lucide-react';

export default function TranscriptCard({ lastTranscript, languages = ['Tamil', 'English'] }) {
  if (!lastTranscript) return null;

  return (
    <div className="mx-4 my-2 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between text-[11px] font-semibold text-cyan-400 mb-1">
        <div className="flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Live Transcript</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
          <Globe className="w-3 h-3 text-indigo-400" />
          <span>Detected: {languages.join(' + ')}</span>
        </div>
      </div>
      <p className="text-xs text-slate-200 font-mono bg-slate-950/60 p-2 rounded-lg border border-white/5 italic">
        "{lastTranscript}"
      </p>
    </div>
  );
}
