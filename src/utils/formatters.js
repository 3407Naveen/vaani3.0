import { scholarshipSchema } from '../data/scholarshipSchema';
import { appointmentSchema } from '../data/appointmentSchema';
import { governmentSchemeSchema } from '../data/governmentSchemeSchema';
import { scannedFormDemoSchema } from '../data/scannedFormDemoSchema';

export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function getSchemaById(formId) {
  switch (formId) {
    case 'scholarship_01':
      return scholarshipSchema;
    case 'appointment_01':
      return appointmentSchema;
    case 'government_scheme_01':
      return governmentSchemeSchema;
    case 'scanned_form_demo':
      return scannedFormDemoSchema;
    default:
      return scholarshipSchema;
  }
}

export function calculateProgress(schema, formState) {
  if (!schema || !schema.fields || schema.fields.length === 0) return 0;
  const total = schema.fields.length;
  let filled = 0;

  schema.fields.forEach(field => {
    const val = formState[field.id]?.value;
    if (val !== undefined && val !== null && val !== '') {
      filled += 1;
    }
  });

  return Math.round((filled / total) * 100);
}
