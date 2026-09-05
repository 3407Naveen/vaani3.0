import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Edit3, Volume2, ShieldCheck, ArrowLeft, Code, FileText, Sparkles, Copy, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import { getSchemaById, formatCurrency } from '../utils/formatters';
import { synthesizeSpeech } from '../services/api';
import FormScanner from '../components/FormScanner';

export default function Review() {
  const location = useLocation();
  const navigate = useNavigate();

  const formId = location.state?.formId || 'scholarship_01';
  const formState = location.state?.formState || {};
  const schema = getSchemaById(formId);

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Synthesize natural summary for voice read-back
  const generateReadBackText = () => {
    let text = `Reviewing application for ${schema.title}. `;
    schema.fields.forEach(field => {
      const val = formState[field.id]?.value;
      if (val !== undefined && val !== null && val !== '') {
        const displayVal = field.id === 'annual_income' ? formatCurrency(val) : String(val);
        text += `${field.label}: ${displayVal}. `;
      }
    });
    return text;
  };

  const handleReadAloud = async () => {
    setIsReadingAloud(true);
    await synthesizeSpeech(generateReadBackText());
    setTimeout(() => setIsReadingAloud(false), 4000);
  };

  const handleConfirmApplication = () => {
    setIsConfirmed(true);
  };

  // Convert formState into clean target JSON structure
  const cleanStructuredData = {
    application_id: `VAANI_${Date.now()}`,
    workflow_id: schema.form_id,
    form_title: schema.title,
    verified_at: new Date().toISOString(),
    status: 'VERIFIED_STRUCTURED_DATA',
    fields: schema.fields.reduce((acc, f) => {
      acc[f.id] = formState[f.id]?.value ?? null;
      return acc;
    }, {})
  };

  const jsonString = JSON.stringify(cleanStructuredData, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="min-h-screen bg-mesh-pattern bg-grid-subtle text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar onOpenScanner={() => setIsScannerOpen(true)} />

      <main className="max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Navigation back button */}
        <button
          onClick={() => navigate(`/assistant?form=${formId}`)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Voice Workspace</span>
        </button>

        {/* Confirmation Success Banner or Main Review Container */}
        {isConfirmed ? (
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 bg-slate-900/90 text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Application Verified</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your structured application is ready and fully validated by VaaniForm Voice Intelligence.
              </p>
              <div className="inline-block mt-1 px-3 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-slate-400 border border-white/10">
                Notice: Demo Mode — Form data verified locally.
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setShowJsonModal(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
              >
                <Code className="w-4 h-4" />
                <span>View Structured Data (JSON)</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-white/10 transition-all"
              >
                Return to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Final Verification</span>
                <h1 className="text-2xl font-extrabold text-white mt-0.5">Ready to Confirm</h1>
                <p className="text-xs text-slate-400 mt-1">Review the captured details before final confirmation.</p>
              </div>

              {/* Demo Voice Read-Back Badge & CTA */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReadAloud}
                  disabled={isReadingAloud}
                  className="px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Volume2 className={`w-4 h-4 text-indigo-400 ${isReadingAloud ? 'animate-bounce' : ''}`} />
                  <span>{isReadingAloud ? 'Reading Aloud...' : 'Read Aloud'}</span>
                </button>
                <span className="text-[10px] text-slate-400 italic hidden sm:inline">Demo voice read-back</span>
              </div>
            </div>

            {/* Field Breakdown List */}
            <div className="space-y-3">
              {schema.fields.map((field) => {
                const val = formState[field.id]?.value;
                const status = formState[field.id]?.status || (val ? 'Verified' : 'Missing');
                const isCaptured = val !== undefined && val !== null && val !== '';

                return (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-wrap items-center justify-between gap-3 hover:border-cyan-500/30 transition-all"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {field.label}
                      </span>
                      <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                        {isCaptured
                          ? field.id === 'annual_income'
                            ? formatCurrency(val)
                            : String(val)
                          : 'Not Provided'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          status === 'Corrected'
                            ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                            : isCaptured
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {status === 'Corrected' ? 'Corrected' : isCaptured ? 'Verified' : 'Missing'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-6">
              <button
                onClick={() => navigate(`/assistant?form=${formId}`)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-white/10 flex items-center gap-1.5 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Edit Fields</span>
              </button>

              <button
                onClick={handleConfirmApplication}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-950" />
                <span>Confirm Application</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* JSON Viewer Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Code className="w-4 h-4" />
                <span>Verified Structured Data JSON</span>
              </div>
              <button
                onClick={handleCopyJson}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-white/10 flex items-center gap-1"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-white/10 text-xs text-cyan-300 font-mono overflow-x-auto max-h-[380px]">
              {jsonString}
            </pre>

            <div className="text-right pt-2">
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Form Scanner Modal */}
      <FormScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onFormScannedAndStart={(scannedFormId) => navigate(`/assistant?form=${scannedFormId}`)}
      />

    </div>
  );
}
