import { scannedFormDemoSchema } from '../data/scannedFormDemoSchema';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function scanFormImage(imageFileOrBlob) {
  if (USE_MOCK_API) {
    // Artificial scanning processing step
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      mode: 'mock',
      form_id: 'scanned_form_demo',
      form_name: 'Scanned Education Scholarship Form',
      fields_detected_count: 10,
      confidence: 94,
      schema: scannedFormDemoSchema,
      detected_fields: scannedFormDemoSchema.fields.map(f => ({
        id: f.id,
        label: f.label,
        type: f.type,
        explanation: f.explanation,
        tamilExplanation: f.tamilExplanation
      }))
    };
  }

  const formData = new FormData();
  formData.append('image', imageFileOrBlob, 'scanned_form.jpg');

  const response = await fetch(`${API_BASE_URL}/api/forms/scan`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}
