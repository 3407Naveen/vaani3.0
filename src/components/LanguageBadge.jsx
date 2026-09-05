import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageBadge({ languages = ['Tamil', 'English'] }) {
  const displayLabel = languages.includes('Tamil') && languages.includes('English')
    ? 'தமிழ் + EN'
    : languages.join(' + ');

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
      <Globe className="w-3.5 h-3.5 text-indigo-400" />
      <span>{displayLabel}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
    </div>
  );
}
