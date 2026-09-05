import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Scan, Sparkles, GraduationCap, Stethoscope, Landmark, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Zap, Volume2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import ServiceCard from '../components/ServiceCard';
import FormScanner from '../components/FormScanner';

export default function Home() {
  const navigate = useNavigate();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleStartScannedForm = (formId) => {
    navigate(`/assistant?form=${formId}`);
  };

  return (
    <div className="min-h-screen bg-mesh-pattern bg-grid-subtle text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar onOpenScanner={() => setIsScannerOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Glow backdrop blur circle */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="space-y-6 text-left z-10">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voice-First Form Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Forms should feel like{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                conversations.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Speak naturally. VaaniForm understands, validates and fills the form for you without frustrating input fields.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/assistant?form=scholarship_01')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Mic className="w-4 h-4 text-white" />
                <span>Start Conversation</span>
              </button>

              <button
                onClick={() => setIsScannerOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-bold text-sm flex items-center gap-2 shadow-md transition-all duration-200 hover:border-cyan-400 active:scale-95"
              >
                <Scan className="w-4 h-4 text-cyan-400" />
                <span>Scan a Form</span>
              </button>
            </div>

            {/* Code-mixed Language Chip Line */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Native Language Engine:</span>
              <span className="text-slate-200 font-semibold bg-slate-900/80 px-2.5 py-1 rounded-md border border-white/5">
                Tamil • English • हिन्दी • Code-Mixed
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Visual Simulation */}
          <div className="relative z-10">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
              
              {/* Card Header badge */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-mono pl-2">vaaniform_pipeline_demo.v1</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  LIVE INTERVIEW SIMULATION
                </span>
              </div>

              {/* Speech Bubble */}
              <div className="mb-5 p-4 rounded-2xl glass-bubble-user text-white shadow-lg flex items-start justify-between gap-3 animate-fade-in">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-cyan-200 font-bold block mb-1">
                    Spoken User Input (Tamil + EN Code-Mixed)
                  </span>
                  <p className="text-sm font-semibold italic">"Enakku scholarship apply pannanum."</p>
                </div>
                <Volume2 className="w-5 h-5 text-cyan-300 flex-shrink-0 animate-pulse" />
              </div>

              {/* Pipeline Step Visual */}
              <div className="grid grid-cols-4 gap-1 text-center py-2 my-3 bg-slate-950/70 rounded-xl border border-white/5 text-[10px] font-bold">
                <div className="p-2 text-cyan-400 border-r border-white/5">Speech</div>
                <div className="p-2 text-indigo-300 border-r border-white/5">Understand</div>
                <div className="p-2 text-amber-400 border-r border-white/5">Validate</div>
                <div className="p-2 text-emerald-400">Form Filled</div>
              </div>

              {/* Sample Extracted Form Fields */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Full Name</span>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span>Kavin Kumar</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Course</span>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span>B.Tech AI & DS</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Annual Family Income</span>
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <span>₹2,40,000</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Confirm
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Service Workflows Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold tracking-widest text-cyan-400 uppercase">Pre-Built Intelligence Workflows</span>
          <h2 className="text-3xl font-extrabold text-white">Choose a Service Workflow</h2>
          <p className="text-xs text-slate-400">Select any workflow to start an interactive voice application session immediately.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            title="Education Scholarship"
            badge="LIVE"
            description="Complete scholarship forms through guided voice interaction in Tamil & English."
            route="/assistant?form=scholarship_01"
            icon={GraduationCap}
            accentGradient="from-cyan-500/20 to-blue-500/20"
          />

          <ServiceCard
            title="Hospital Appointment"
            badge="DEMO"
            description="Book outpatient consultations through the same voice intelligence engine."
            route="/assistant?form=appointment_01"
            icon={Stethoscope}
            accentGradient="from-blue-500/20 to-indigo-500/20"
          />

          <ServiceCard
            title="Government Welfare Scheme"
            badge="DEMO"
            description="Apply for government welfare services conversationally with zero literacy friction."
            route="/assistant?form=government_scheme_01"
            icon={Landmark}
            accentGradient="from-indigo-500/20 to-cyan-500/20"
          />
        </div>
      </section>

      {/* Scan a Form CTA Feature Card */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <Scan className="w-3.5 h-3.5 text-cyan-400" />
              <span>Camera OCR Feature</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">Scan Any Physical Form</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Don't know what the form says? Scan paper forms using your camera, and let VaaniForm translate and guide you through the SAME conversation engine.
            </p>
          </div>

          <button
            onClick={() => setIsScannerOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Scan className="w-5 h-5 text-slate-950" />
            <span>Launch Form Scanner</span>
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Simple Architecture</span>
          <h2 className="text-2xl font-extrabold text-white">How VaaniForm Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Speak / Scan', desc: 'Speak naturally or scan paper form via camera.', color: 'text-cyan-400' },
            { step: '02', title: 'Understand', desc: 'Sarvam AI extracts structured fields & intent.', color: 'text-indigo-400' },
            { step: '03', title: 'Validate', desc: 'Cross-checks values & asks income clarifications.', color: 'text-amber-400' },
            { step: '04', title: 'Confirm', desc: 'Read back captured details & export clean JSON.', color: 'text-emerald-400' }
          ].map((s) => (
            <div key={s.step} className="glass-card p-5 rounded-2xl border border-white/10 relative">
              <span className={`text-2xl font-mono font-extrabold ${s.color} block mb-2`}>{s.step}</span>
              <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem VS Solution Side-by-Side Visual */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Why VaaniForm?</span>
          <h2 className="text-2xl font-extrabold text-white">Traditional Form vs VaaniForm</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Traditional Form Card */}
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-rose-500/20 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Traditional Form Experience</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 py-3 px-4 bg-slate-900 rounded-xl font-mono border border-white/5">
              <span>Read</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span>Type</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span>Fix Errors</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
              <span>Review</span>
            </div>

            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
              <li>High literacy and language barriers</li>
              <li>Confusing legal/official terminology</li>
              <li>Prone to input validation errors</li>
              <li>Frustrating keyboard typing on mobile</li>
            </ul>
          </div>

          {/* VaaniForm Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>VaaniForm Experience</span>
            </div>

            <div className="flex items-center justify-between text-xs text-cyan-300 py-3 px-4 bg-cyan-950/40 rounded-xl font-mono font-bold border border-cyan-500/30">
              <span>Speak</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>Answer</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>Validate</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
              <span>Confirm</span>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Code-mixed speech support (Tamil + EN)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Intelligent multi-field extraction
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Instant income calculation & confirmation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Zero manual typing required
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-6 text-center text-xs text-slate-500">
        <p>VAANIFORM — Built for Hackathon Excellence. Powered by Sarvam AI Voice Engine.</p>
      </footer>

      {/* Camera Form Scanner Modal */}
      <FormScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onFormScannedAndStart={handleStartScannedForm}
      />

    </div>
  );
}
