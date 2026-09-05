export const scholarshipSchema = {
  form_id: 'scholarship_01',
  title: 'Education Scholarship Application',
  badge: 'LIVE',
  description: 'Complete scholarship forms through guided voice interaction in Tamil & English.',
  fields: [
    {
      id: 'full_name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. Kavin Kumar',
      explanation: 'Your official full name as registered in college/school.',
      tamilExplanation: 'Ungaloda official full name (college/school record-la irukkura madhiri).'
    },
    {
      id: 'dob',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      placeholder: 'YYYY-MM-DD',
      explanation: 'Your date of birth according to official ID.',
      tamilExplanation: 'Ungaloda pirantha thethi (DOB).'
    },
    {
      id: 'course',
      label: 'Course / Degree',
      type: 'text',
      required: true,
      placeholder: 'e.g. Computer Science',
      explanation: 'Degree or diploma course you are currently pursuing.',
      tamilExplanation: 'Neenga padikkura degree athavathu course name.'
    },
    {
      id: 'year',
      label: 'Year of Study',
      type: 'number',
      min: 1,
      max: 6,
      required: true,
      placeholder: 'e.g. 2',
      explanation: 'Current academic year (1st, 2nd, 3rd, 4th year).',
      tamilExplanation: 'Neenga ippo ethanaavadhu varusham padikkiringa.'
    },
    {
      id: 'institution_name',
      label: 'Institution Name',
      type: 'text',
      required: true,
      placeholder: 'e.g. VIT Vellore',
      explanation: 'The name of your college, university, or school.',
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
      explanation: 'Your family’s total combined income for one full year.',
      tamilExplanation: 'Ungal family-oda oru varusha total income.'
    },
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: ['General', 'BC', 'MBC', 'SC', 'ST', 'Other'],
      required: true,
      placeholder: 'Select category',
      explanation: 'Socio-economic reservation category if applicable.',
      tamilExplanation: 'Ungaloda community category.'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'phone',
      pattern: '^[0-9]{10}$',
      required: true,
      placeholder: '10 digit mobile number',
      explanation: 'Mobile number for SMS updates and verification.',
      tamilExplanation: 'Ungaloda 10-digit mobile number.'
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'kavin@example.com',
      explanation: 'Email ID to receive confirmation documents.',
      tamilExplanation: 'Ungaloda email address.'
    },
    {
      id: 'documents_confirmed',
      label: 'Documents Verified & Ready',
      type: 'boolean',
      required: true,
      explanation: 'Confirmation that marksheet and income certificate are ready.',
      tamilExplanation: 'Marksheet matrum income certificate irukka nu confirmation.'
    }
  ]
};
