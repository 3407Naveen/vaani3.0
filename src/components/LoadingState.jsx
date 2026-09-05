import React from 'react';
import { Loader2, Mic } from 'lucide-react';

export default function LoadingState({ message = 'Loading VaaniForm Workspace...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-teal-400 p-0.5 shadow-xl animate-pulse">
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-300">{message}</p>
    </div>
  );
}
