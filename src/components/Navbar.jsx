import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mic, Sparkles, Scan, FileCheck } from 'lucide-react';

export default function Navbar({ onOpenScanner }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Mic className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                VAANIFORM
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                v1.0 Hackathon
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Voice-First Form Intelligence</p>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/5">
          <Link
            to="/"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              location.pathname === '/' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </Link>
          <Link
            to="/assistant"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              location.pathname === '/assistant' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Workspace
          </Link>
          <Link
            to="/review"
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              location.pathname === '/review' 
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Review & Export
          </Link>
        </nav>

        {/* Right: Quick Scanner & AI Tech Tag */}
        <div className="flex items-center gap-3">
          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 border border-cyan-500/30 transition-all duration-200 shadow-sm hover:shadow-cyan-500/10 active:scale-95"
            >
              <Scan className="w-4 h-4 text-cyan-400" />
              <span>Scan Form</span>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-medium text-slate-300">
              Powered by <strong className="text-white font-semibold">Sarvam AI</strong>
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
