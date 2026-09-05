import React from 'react';
import { AlertTriangle, Check, Edit3, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function ValidationAlert({ clarification, onConfirm, onCorrect }) {
  if (!clarification) return null;

  return (
    <div className="mx-4 my-3 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-slate-900 border border-amber-500/40 shadow-xl backdrop-blur-lg animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Verification Required</h4>
          <p className="text-[11px] text-slate-300 font-medium">Income Calculation Double-Check</p>
        </div>
      </div>

      <div className="my-2.5 p-3 rounded-lg bg-slate-950/70 border border-amber-500/20 flex items-center justify-between text-xs font-mono">
        <div className="text-slate-400">
          <span>{formatCurrency(clarification.monthly)} / month</span>
        </div>
        <ArrowRight className="w-4 h-4 text-amber-400" />
        <div className="text-amber-300 font-bold">
          <span>{formatCurrency(clarification.value)} / year</span>
        </div>
      </div>

      <p className="text-xs text-slate-200 mb-3">
        {clarification.prompt || `Should I record your total annual family income as ${formatCurrency(clarification.value)}?`}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onConfirm(clarification)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-emerald-600/30"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Confirm</span>
        </button>
        <button
          onClick={() => onCorrect(clarification)}
          className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Correct</span>
        </button>
      </div>
    </div>
  );
}
