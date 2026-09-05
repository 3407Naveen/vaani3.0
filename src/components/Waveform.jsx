import React from 'react';

export default function Waveform({ active = false }) {
  return (
    <div className="flex items-center justify-center gap-1 h-8 px-4 py-1">
      {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.3].map((heightScale, idx) => (
        <span
          key={idx}
          className={`w-1 rounded-full bg-gradient-to-t from-cyan-500 to-indigo-400 transition-all duration-300 ${
            active ? 'animate-pulse' : 'opacity-40'
          }`}
          style={{
            height: active ? `${Math.max(12, heightScale * 28)}px` : '8px',
            animationDelay: `${idx * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
}
