export const governmentSchemeSchema = {
  form_id: 'government_scheme_01',
  title: 'Government Welfare Scheme Application',
  badge: 'DEMO',
  description: 'Apply for welfare schemes easily via voice, overcoming language and literacy barriers.',
  fields: [
    {
      id: 'full_name',
      label: 'Applicant Full Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Ravi Kumar',
      explanation: 'Name of the main applicant as per Aadhar / Ration card.',
      tamilExplanation: 'Aadhar/Ration card-la irukkura madhiri ungal name.'
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      min: 18,
      max: 120,
      required: true,
      placeholder: 'e.g. 42',
      explanation: 'Applicant age (must be 18+ for adult welfare schemes).',
      tamilExplanation: 'Vinnappadharar-in vayadhu (18+).'
    },
    {
      id: 'district',
      label: 'District',
      type: 'text',
      required: true,
      placeholder: 'e.g. Vellore',
      explanation: 'Residential district in Tamil Nadu or state.',
      tamilExplanation: 'Neenga irukkura mavattam (District).'
    },
    {
      id: 'occupation',
      label: 'Occupation',
      type: 'text',
      required: true,
      placeholder: 'e.g. Farmer / Daily Wage Worker',
      explanation: 'Primary source of livelihood or employment.',
      tamilExplanation: 'Ungaloda primary thozhil.'
    },
    {
      id: 'annual_income',
      label: 'Annual Income (₹)',
      type: 'number',
      min: 0,
      unit: 'INR/year',
      required: true,
      placeholder: 'e.g. 180000',
      explanation: 'Total annual household income for eligibility check.',
      tamilExplanation: 'Ungaloda varusha mottha varumanam.'
    },
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: ['General', 'BC', 'MBC', 'SC', 'ST', 'Other'],
      required: true,
      placeholder: 'Select Category',
      explanation: 'Reservation category for scheme quota.',
      tamilExplanation: 'Ungal oda community category.'
    },
    {
      id: 'family_members',
      label: 'Family Members Count',
      type: 'number',
      min: 1,
      max: 20,
      required: true,
      placeholder: 'e.g. 4',
      explanation: 'Total number of dependents residing together.',
      tamilExplanation: 'Kudumbathil ulla urupinargalin ennikkai.'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'phone',
      pattern: '^[0-9]{10}$',
      required: true,
      placeholder: '10 digit mobile number',
      explanation: 'Mobile number linked with welfare updates.',
      tamilExplanation: 'Ungal mobile number.'
    },
    {
      id: 'scheme_name',
      label: 'Welfare Scheme Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Farmer Aid Scheme / Welfare Assistance',
      explanation: 'Name of the specific scheme being requested.',
      tamilExplanation: 'Neenga vinnapikkum thittathin peyar.'
    },
    {
      id: 'documents_confirmed',
      label: 'Documents Verified',
      type: 'boolean',
      required: true,
      explanation: 'Ration card, Income & Community cert availability.',
      tamilExplanation: 'Avasiyamaana aavanangal irukkiraadha.'
    }
  ]
};
