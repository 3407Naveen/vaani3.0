import React, { useState } from 'react';
import { Cpu, ChevronDown, ChevronUp, ShieldCheck, Activity } from 'lucide-react';

export default function TechnicalInspector({ technicalData }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!technicalData) return null;

  const {
    detected_languages = ['Tamil', 'English'],
    intent = 'provide_information',
    extracted_fields = {},
    missing_fields = [],
    validation = { status: 'Passed' },
    confidence = 0.94
  } = technicalData;

  return (
    <div className="mx-4 my-3 rounded-xl bg-slate-950/70 border border-indigo-500/20 overflow-hidden backdrop-blur-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-indigo-300 hover:bg-indigo-500/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>AI Understanding & Extraction Meta</span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
            {Math.round((confidence || 0.94) * 100)}% Conf
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 border-t border-white/5 space-y-2.5 text-[11px] font-mono">
          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-slate-400">Language Detected:</span>
            <span className="text-cyan-300 font-semibold">{detected_languages.join(' + ')}</span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-white/5">
            <span className="text-slate-400">Intent:</span>
            <span className="text-indigo-300 font-semibold">{intent}</span>
          </div>

          <div className="py-1 border-b border-white/5">
            <span className="text-slate-400 block mb-1">Extracted Fields:</span>
            {Object.keys(extracted_fields).length === 0 ? (
              <span className="text-slate-500 italic">None extracted in this turn</span>
            ) : (
              <div className="pl-2 space-y-1 text-emerald-400">
                {Object.entries(extracted_fields).map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span>{k}:</span>
                    <span className="font-bold">{String(v.value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="py-1 border-b border-white/5">
            <span className="text-slate-400 block mb-1">Missing Required Fields:</span>
            {missing_fields.length === 0 ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> All fields complete
              </span>
            ) : (
              <span className="text-amber-400">{missing_fields.join(', ')}</span>
            )}
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Validation Status:</span>
            <span className={`font-semibold ${validation.status === 'clarification_required' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {validation.status === 'clarification_required' ? 'Clarification Required' : 'Passed'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
