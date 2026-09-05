export const appointmentSchema = {
  form_id: 'appointment_01',
  title: 'Hospital Appointment Booking',
  badge: 'DEMO',
  description: 'Book hospital outpatient visits conversationally using natural voice instructions.',
  fields: [
    {
      id: 'patient_name',
      label: 'Patient Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Ravi Kumar',
      explanation: 'Name of the patient needing consultation.',
      tamilExplanation: 'Doctor paarka vendiya patient-oda peyar.'
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      min: 1,
      max: 120,
      required: true,
      placeholder: 'e.g. 45',
      explanation: 'Patient’s current age in years.',
      tamilExplanation: 'Patient-oda vayadhu.'
    },
    {
      id: 'department',
      label: 'Department / Specialty',
      type: 'text',
      required: true,
      placeholder: 'e.g. Cardiology',
      explanation: 'Medical specialty or department required.',
      tamilExplanation: 'Ethu sambandhapatta doctor-a paarkanum (Cardiology, ENT, etc).'
    },
    {
      id: 'preferred_date',
      label: 'Preferred Date',
      type: 'date',
      required: true,
      placeholder: 'YYYY-MM-DD',
      explanation: 'Date requested for doctor appointment.',
      tamilExplanation: 'Doctor paarka virumbum thethi.'
    },
    {
      id: 'preferred_time',
      label: 'Preferred Time Slot',
      type: 'text',
      required: true,
      placeholder: 'e.g. Morning (10:00 AM)',
      explanation: 'Preferred time slot during clinic hours.',
      tamilExplanation: 'Kalaiya illa maalaiya (time slot).'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'phone',
      pattern: '^[0-9]{10}$',
      required: true,
      placeholder: '10 digit phone number',
      explanation: 'Contact number for appointment confirmation SMS.',
      tamilExplanation: 'SMS vaara vendiya mobile number.'
    }
  ]
};
