import React, { useState } from 'react';
import { HelpCircle, Languages, BookOpen } from 'lucide-react';

export default function FormExplanationCard({ fields = [] }) {
  const [selectedFieldId, setSelectedFieldId] = useState(fields[0]?.id || 'annual_income');

  const selectedField = fields.find(f => f.id === selectedFieldId) || fields[0] || {
    label: 'Annual Family Income',
    explanation: 'Your family\'s total income for one year.',
    tamilExplanation: 'Ungal family-oda oru varusha total income.'
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-3 my-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Explain This Form (Simplified Translator)</span>
        </div>
        <span className="text-[10px] text-slate-400">No English Literacy Needed</span>
      </div>

      {/* Select Field Selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {fields.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFieldId(f.id)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
              selectedFieldId === f.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Detailed Card */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
        <div className="text-[11px]">
          <span className="text-slate-500 uppercase font-bold text-[9px] block">Original Form Label</span>
          <span className="text-white font-bold">{selectedField.label}</span>
        </div>

        <div className="text-xs text-slate-300 bg-indigo-950/40 p-2 rounded-lg border border-indigo-500/20">
          <span className="text-indigo-400 font-semibold block text-[10px] uppercase mb-0.5">Simple English</span>
          {selectedField.explanation || 'Simplified explanation for this field.'}
        </div>

        <div className="text-xs text-cyan-300 bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/20">
          <span className="text-cyan-400 font-semibold block text-[10px] uppercase mb-0.5 flex items-center gap-1">
            <Languages className="w-3 h-3" /> Tamil + Code-Mixed Explanation
          </span>
          "{selectedField.tamilExplanation || 'Ungaloda விவரங்கள்.'}"
        </div>
      </div>
    </div>
  );
}
