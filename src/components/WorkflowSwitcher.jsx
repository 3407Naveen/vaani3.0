import React from 'react';
import { Layers, ChevronDown } from 'lucide-react';

export default function WorkflowSwitcher({ activeFormId, onChangeWorkflow }) {
  const workflows = [
    { id: 'scholarship_01', title: 'Education Scholarship', badge: 'LIVE' },
    { id: 'appointment_01', title: 'Hospital Appointment', badge: 'DEMO' },
    { id: 'government_scheme_01', title: 'Government Welfare Scheme', badge: 'DEMO' },
    { id: 'scanned_form_demo', title: 'Scanned Scholarship Form', badge: 'SCAN' }
  ];

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">Active Workflow:</span>
        <div className="relative">
          <select
            value={activeFormId}
            onChange={(e) => onChangeWorkflow(e.target.value)}
            className="appearance-none bg-slate-900/90 text-white text-xs font-semibold pl-8 pr-8 py-1.5 rounded-lg border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 cursor-pointer shadow-sm hover:border-cyan-500/50 transition-colors"
          >
            {workflows.map((wf) => (
              <option key={wf.id} value={wf.id} className="bg-slate-900 text-white">
                {wf.title} ({wf.badge})
              </option>
            ))}
          </select>
          <Layers className="w-3.5 h-3.5 text-cyan-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
