import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import FormField from './FormField';
import ProgressBar from './ProgressBar';

export default function DynamicForm({ schema, formState, progress = 0, onChangeManual }) {
  const navigate = useNavigate();

  if (!schema) return null;

  const isComplete = progress >= 100;

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      
      {/* Form Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-slate-900/70 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Live Application Form</span>
            </h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {schema.badge || 'SCHEMA'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">{schema.title} — Fields update automatically.</p>
        </div>

        {/* Review Action */}
        <button
          onClick={() => navigate('/review', { state: { formId: schema.form_id, formState } })}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
            isComplete
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-bounce shadow-emerald-500/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          <span>Review</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Section */}
      <div className="px-5 py-3 bg-slate-950/60 border-b border-white/5">
        <ProgressBar progress={progress} />
      </div>

      {/* Dynamic Fields Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {schema.fields?.map((field) => (
          <FormField
            key={field.id}
            field={field}
            state={formState[field.id]}
            onChangeManual={onChangeManual}
          />
        ))}

        {isComplete && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2 mt-4">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-xs font-bold text-emerald-300">All Fields Verified & Ready!</h4>
            <p className="text-[11px] text-slate-300">
              Click the button below to perform final review and speech read-back.
            </p>
            <button
              onClick={() => navigate('/review', { state: { formId: schema.form_id, formState } })}
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all"
            >
              Proceed to Review & Confirmation
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
