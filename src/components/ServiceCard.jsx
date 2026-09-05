import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ServiceCard({ title, badge, description, route, icon: Icon, accentGradient }) {
  const navigate = useNavigate();

  return (
    <div className="group relative rounded-2xl glass-card p-6 border border-white/10 hover:border-cyan-500/40 flex flex-col justify-between transition-all duration-300">
      
      {/* Subtle Background Accent Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${accentGradient || 'from-cyan-500/10 to-indigo-500/10'} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`} />

      <div>
        {/* Card Header: Icon + Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300 shadow-md">
            <Icon className="w-6 h-6" />
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
            badge === 'LIVE' 
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
              : 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
          }`}>
            {badge}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={() => navigate(route)}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-cyan-600 text-white text-xs font-semibold flex items-center justify-between border border-white/10 group-hover:border-cyan-500/30 transition-all duration-300 shadow-md"
      >
        <span>{badge === 'LIVE' ? 'Start Application' : 'Try Demo'}</span>
        <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
      </button>

    </div>
  );
}
