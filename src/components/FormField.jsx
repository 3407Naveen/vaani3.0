import React from 'react';
import { CheckCircle2, Edit3, AlertTriangle, Sparkles, Loader2, CircleDashed, Check } from 'lucide-react';
import { getFieldStatusConfig } from '../utils/validationHelpers';
import { formatCurrency } from '../utils/formatters';

export default function FormField({ field, state, onChangeManual }) {
  const value = state?.value ?? '';
  const status = state?.status || 'Missing';
  const statusConfig = getFieldStatusConfig(status);

  const renderStatusBadge = () => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified
          </span>
        );
      case 'Corrected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Edit3 className="w-3 h-3 text-indigo-400" />
            Corrected
          </span>
        );
      case 'Needs confirmation':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Needs confirmation
          </span>
        );
      case 'Captured':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            Captured
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
            Processing
          </span>
        );
      case 'Missing':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
            <CircleDashed className="w-3 h-3 text-slate-500" />
            Missing
          </span>
        );
    }
  };

  const displayValue = field.id === 'annual_income' && value !== '' && !isNaN(Number(value))
    ? formatCurrency(value)
    : String(value);

  return (
    <div className={`p-3 rounded-xl transition-all duration-200 border ${
      status === 'Verified' 
        ? 'bg-slate-900/80 border-emerald-500/30 shadow-sm' 
        : status === 'Corrected'
        ? 'bg-slate-900/80 border-indigo-500/30 ring-1 ring-indigo-500/20'
        : status === 'Needs confirmation'
        ? 'bg-amber-950/20 border-amber-500/40 ring-1 ring-amber-500/20'
        : status === 'Captured'
        ? 'bg-slate-900/80 border-cyan-500/30'
        : 'bg-slate-950/40 border-white/5 opacity-75'
    }`}>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <span>{field.label}</span>
          {field.required && <span className="text-rose-400">*</span>}
        </label>
        {renderStatusBadge()}
      </div>

      {/* Render Value or Input Field */}
      <div className="relative">
        {field.type === 'select' ? (
          <select
            value={value}
            onChange={(e) => onChangeManual(field.id, e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-950/90 border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            <option value="">-- Select Category --</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : field.type === 'boolean' ? (
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onChangeManual(field.id, true)}
              className={`flex-1 py-1 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1 transition-all ${
                value === true 
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm' 
                  : 'bg-slate-900 text-slate-400 border-white/10'
              }`}
            >
              <Check className="w-3.5 h-3.5" /> Ready & Confirmed
            </button>
          </div>
        ) : (
          <input
            type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
            value={value}
            onChange={(e) => onChangeManual(field.id, e.target.value)}
            placeholder={field.placeholder || 'Waiting for voice input...'}
            className={`w-full px-3 py-1.5 rounded-lg bg-slate-950/90 border text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono transition-all ${
              value ? 'border-white/20' : 'border-white/5'
            }`}
          />
        )}
      </div>

      {field.tamilExplanation && (
        <p className="mt-1 text-[10px] text-slate-500 font-sans italic">
          💡 {field.tamilExplanation}
        </p>
      )}
    </div>
  );
}
