export const scannedFormDemoSchema = {
  form_id: 'scanned_form_demo',
  title: 'Scanned Scholarship Form',
  badge: 'CAMERA SCAN',
  source: 'camera_scan',
  description: 'Form structure extracted instantly from physical paper scan via VaaniForm OCR.',
  confidence: 94,
  fieldsCount: 10,
  fields: [
    {
      id: 'full_name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Extracted from OCR...',
      explanation: 'Your official name printed on certificates.',
      tamilExplanation: 'Ungal official full name.'
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      placeholder: 'YYYY-MM-DD',
      explanation: 'Birth date written on paper form.',
      tamilExplanation: 'Ungal pirantha thethi.'
    },
    {
      id: 'course',
      label: 'Course / Degree',
      type: 'text',
      required: true,
      placeholder: 'e.g. Computer Science',
      explanation: 'Degree name listed on institution document.',
      tamilExplanation: 'Neenga padikkura course name.'
    },
    {
      id: 'year',
      label: 'Year of Study',
      type: 'number',
      min: 1,
      max: 6,
      required: true,
      placeholder: '1-4',
      explanation: 'Current study year specified in registration.',
      tamilExplanation: 'Padikkum varusham.'
    },
    {
      id: 'institution_name',
      label: 'Institution Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Govt Engineering College',
      explanation: 'The name of your college or school.',
      tamilExplanation: 'Neenga padikkura college illa school-oda name.'
    },
    {
      id: 'annual_income',
      label: 'Annual Family Income (₹)',
      type: 'number',
      min: 0,
      unit: 'INR/year',
      required: true,
      placeholder: 'e.g. 240000',
      explanation: 'Your family’s total income for one year.',
      tamilExplanation: 'Ungal family-oda oru varusha total income.'
    },
    {
      id: 'category',
      label: 'Scholarship Category',
      type: 'select',
      options: ['General', 'BC', 'MBC', 'SC', 'ST', 'Other'],
      required: true,
      placeholder: 'Select category',
      explanation: 'Category selected for welfare quota.',
      tamilExplanation: 'Ungaloda reservation category.'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'phone',
      pattern: '^[0-9]{10}$',
      required: true,
      placeholder: '10 digit number',
      explanation: 'Contact mobile number.',
      tamilExplanation: 'Mobile number.'
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'email@domain.com',
      explanation: 'Primary email ID.',
      tamilExplanation: 'Email address.'
    },
    {
      id: 'documents_confirmed',
      label: 'Required Documents',
      type: 'boolean',
      required: true,
      explanation: 'Attached certificates and physical copies.',
      tamilExplanation: 'Form-kku avasiyamaana documents.'
    }
  ]
};
