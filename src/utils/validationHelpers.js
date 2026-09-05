export function validateFieldValue(field, value) {
  if (value === undefined || value === null || value === '') {
    if (field.required) return { valid: false, message: `${field.label} is required.` };
    return { valid: true };
  }

  if (field.type === 'number') {
    const num = Number(value);
    if (isNaN(num)) return { valid: false, message: `${field.label} must be a valid number.` };
    if (field.min !== undefined && num < field.min) return { valid: false, message: `${field.label} cannot be less than ${field.min}.` };
    if (field.max !== undefined && num > field.max) return { valid: false, message: `${field.label} cannot be greater than ${field.max}.` };
  }

  if (field.type === 'phone') {
    const cleaned = String(value).replace(/\D/g, '');
    if (cleaned.length !== 10) return { valid: false, message: `${field.label} must be a 10-digit mobile number.` };
  }

  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(value))) return { valid: false, message: `Please provide a valid email address.` };
  }

  return { valid: true };
}

export function getFieldStatusConfig(status) {
  switch (status) {
    case 'Verified':
      return { label: 'Verified', badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', icon: 'CheckCircle2' };
    case 'Corrected':
      return { label: 'Corrected', badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30', icon: 'Edit3' };
    case 'Needs confirmation':
      return { label: 'Needs confirmation', badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30', icon: 'AlertTriangle' };
    case 'Captured':
      return { label: 'Captured', badgeClass: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30', icon: 'Sparkles' };
    case 'Processing':
      return { label: 'Processing', badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30', icon: 'Loader2' };
    case 'Missing':
    default:
      return { label: 'Missing', badgeClass: 'bg-slate-700/50 text-slate-400 border-slate-700', icon: 'CircleDashed' };
  }
}
