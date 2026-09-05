import { getSchemaById } from '../utils/formatters';

export function processMockConversation(textInput, activeFormId, currentFormState, pendingClarification) {
  const schema = getSchemaById(activeFormId);
  const text = (textInput || '').trim();
  const lowerText = text.toLowerCase();

  const detectedLanguages = [];
  if (/[\u0B80-\u0BFF]/.test(text) || /\b(pannanum|illa|nu|padikren|ungada|ennakku|kudumbam|thittatuku)\b/i.test(lowerText)) {
    detectedLanguages.push('Tamil');
  }
  detectedLanguages.push('English');

  let intent = 'provide_information';
  let assistantReply = '';
  let fieldsUpdated = {};
  let corrections = [];
  let validation = { status: 'valid', field: null, code: null, message: null };
  let newPendingClarification = null;

  // 1. Check if answering a pending clarification (e.g. income confirmation)
  if (pendingClarification && (lowerText.includes('yes') || lowerText.includes('confirm') || lowerText.includes('ama') || lowerText.includes('correct') || lowerText.includes('ok'))) {
    const fieldId = pendingClarification.field;
    const value = pendingClarification.value;
    fieldsUpdated[fieldId] = {
      value: value,
      status: 'Verified',
      updatedAt: new Date().toISOString()
    };
    assistantReply = `Understood! Recorded your annual income as ₹${Number(value).toLocaleString('en-IN')}.`;
    newPendingClarification = null;
  }
  // 2. Handling corrections (e.g., "Course name AI and DS illa, Computer Science nu change pannu")
  else if (lowerText.includes('change') || lowerText.includes('illa') || lowerText.includes('correct') || lowerText.includes('update')) {
    intent = 'correct_information';

    if (activeFormId === 'scholarship_01' || activeFormId === 'scanned_form_demo') {
      if (lowerText.includes('computer science') || lowerText.includes('cs')) {
        const oldVal = currentFormState.course?.value || 'AI and DS';
        fieldsUpdated['course'] = { value: 'Computer Science', status: 'Corrected', updatedAt: new Date().toISOString() };
        corrections.push({ field: 'course', old_value: oldVal, new_value: 'Computer Science' });
        assistantReply = `Updated your course to Computer Science. All other fields remain saved!`;
      } else if (lowerText.includes('name')) {
        const match = text.match(/(?:name|peyar)\s*(?:is|to|=|nu)\s*([A-Za-z\s]+)/i);
        if (match) {
          const newName = match[1].trim();
          fieldsUpdated['full_name'] = { value: newName, status: 'Corrected', updatedAt: new Date().toISOString() };
          assistantReply = `Updated your full name to ${newName}.`;
        }
      }
    } else if (activeFormId === 'government_scheme_01') {
      if (lowerText.includes('daily wage worker') || lowerText.includes('worker')) {
        const oldVal = currentFormState.occupation?.value || 'Farmer';
        fieldsUpdated['occupation'] = { value: 'Daily Wage Worker', status: 'Corrected', updatedAt: new Date().toISOString() };
        corrections.push({ field: 'occupation', old_value: oldVal, new_value: 'Daily Wage Worker' });
        assistantReply = `Updated occupation to Daily Wage Worker. Preserved existing district and applicant info!`;
      }
    }
  }

  // 3. Multi-field & Standard extractions if not handled above
  if (Object.keys(fieldsUpdated).length === 0) {
    // Initial intent checks
    if (lowerText.includes('scholarship') || lowerText.includes('apply')) {
      intent = 'start_workflow';
      assistantReply = `Awesome! Let's complete your Education Scholarship application. First, what is your full name?`;
    } else if (lowerText.includes('appointment') || lowerText.includes('cardiology') || lowerText.includes('doctor')) {
      intent = 'start_workflow';
      if (lowerText.includes('cardiology')) {
        fieldsUpdated['department'] = { value: 'Cardiology', status: 'Captured', updatedAt: new Date().toISOString() };
      }
      assistantReply = `Sure! Booking a Cardiology appointment. What is the patient's full name and age?`;
    } else if (lowerText.includes('government') || lowerText.includes('scheme') || lowerText.includes('welfare')) {
      intent = 'start_workflow';
      if (lowerText.includes('farmer aid') || lowerText.includes('assistance')) {
        fieldsUpdated['scheme_name'] = { value: 'Farmer Aid Welfare Scheme', status: 'Captured', updatedAt: new Date().toISOString() };
      }
      assistantReply = `Welcome! Applying for Government Welfare Scheme. What is your full name, district, and occupation?`;
    }

    // Name + Course + Year multi-field extraction
    // "My name is Kavin. Second year AI and Data Science padikren."
    if (lowerText.includes('kavin') || (lowerText.includes('name is') && lowerText.includes('padikren'))) {
      if (lowerText.includes('kavin')) {
        fieldsUpdated['full_name'] = { value: 'Kavin Kumar', status: 'Verified', updatedAt: new Date().toISOString() };
      }
      if (lowerText.includes('ai') || lowerText.includes('data science') || lowerText.includes('computer science')) {
        fieldsUpdated['course'] = { value: lowerText.includes('computer') ? 'Computer Science' : 'B.Tech AI and Data Science', status: 'Verified', updatedAt: new Date().toISOString() };
      }
      if (lowerText.includes('second') || lowerText.includes('2nd') || lowerText.includes('2')) {
        fieldsUpdated['year'] = { value: 2, status: 'Verified', updatedAt: new Date().toISOString() };
      }
      if (Object.keys(fieldsUpdated).length > 0) {
        assistantReply = `Got it! Recorded Full Name: Kavin Kumar, Course: B.Tech AI & DS, Year: 2nd Year. What is your college or institution name?`;
      }
    }

    // Government Multi-field extraction: "My name is Ravi, Vellore district, occupation farmer."
    if (lowerText.includes('ravi') || lowerText.includes('vellore') || lowerText.includes('farmer')) {
      if (lowerText.includes('ravi')) {
        fieldsUpdated['full_name'] = { value: 'Ravi Kumar', status: 'Verified', updatedAt: new Date().toISOString() };
        fieldsUpdated['patient_name'] = { value: 'Ravi Kumar', status: 'Verified', updatedAt: new Date().toISOString() };
      }
      if (lowerText.includes('45') || lowerText.includes('age 45')) {
        fieldsUpdated['age'] = { value: 45, status: 'Verified', updatedAt: new Date().toISOString() };
      }
      if (lowerText.includes('vellore')) {
        fieldsUpdated['district'] = { value: 'Vellore', status: 'Verified', updatedAt: new Date().toISOString() };
      }
      if (lowerText.includes('farmer')) {
        fieldsUpdated['occupation'] = { value: 'Farmer', status: 'Verified', updatedAt: new Date().toISOString() };
      }
      if (Object.keys(fieldsUpdated).length > 0 && !assistantReply) {
        assistantReply = `Recorded details for Ravi Kumar (${fieldsUpdated.district ? 'District: Vellore, ' : ''}${fieldsUpdated.occupation ? 'Occupation: Farmer' : ''}).`;
      }
    }

    // Date & Time (Hospital)
    if (lowerText.includes('tomorrow morning') || lowerText.includes('morning')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      fieldsUpdated['preferred_date'] = { value: dateStr, status: 'Verified', updatedAt: new Date().toISOString() };
      fieldsUpdated['preferred_time'] = { value: 'Morning (10:00 AM)', status: 'Verified', updatedAt: new Date().toISOString() };
      assistantReply = `Selected preferred date as tomorrow (${dateStr}) at Morning 10:00 AM slot.`;
    }

    // Monthly income detection -> Calculation & Confirmation request
    // "Twenty thousand per month" or "15000 per month" or "fifteen thousand per month"
    if (lowerText.includes('month') || lowerText.includes('per month') || lowerText.includes('thousand')) {
      let monthly = 0;
      if (lowerText.includes('twenty') || lowerText.includes('20000') || lowerText.includes('20')) monthly = 20000;
      else if (lowerText.includes('fifteen') || lowerText.includes('15000') || lowerText.includes('15')) monthly = 15000;
      else if (lowerText.includes('thirty') || lowerText.includes('30000') || lowerText.includes('30')) monthly = 30000;

      if (monthly > 0) {
        const annual = monthly * 12;
        newPendingClarification = {
          field: 'annual_income',
          monthly: monthly,
          value: annual,
          prompt: `Should I record your annual family income as ₹${annual.toLocaleString('en-IN')}? (${formatCurrencyString(monthly)}/month)`
        };
        validation = {
          status: 'clarification_required',
          field: 'annual_income',
          code: 'CALCULATED_ANNUAL_INCOME',
          message: `Detected monthly income of ₹${monthly.toLocaleString('en-IN')}. Calculated annual family income: ₹${annual.toLocaleString('en-IN')}.`
        };
        assistantReply = `I noticed you mentioned ₹${monthly.toLocaleString('en-IN')} per month. Should I record your total annual family income as ₹${annual.toLocaleString('en-IN')}?`;
      }
    }

    // Direct Annual Income e.g. "240000" or "2 lakhs"
    if (lowerText.includes('2,40,000') || lowerText.includes('240000') || lowerText.includes('2 lakhs')) {
      fieldsUpdated['annual_income'] = { value: 240000, status: 'Verified', updatedAt: new Date().toISOString() };
      assistantReply = `Recorded annual income as ₹2,40,000.`;
    }

    // Category check (MBC, BC, SC, ST, General)
    if (/\b(mbc|bc|sc|st|general|other)\b/i.test(lowerText)) {
      const match = lowerText.match(/\b(mbc|bc|sc|st|general|other)\b/i);
      if (match) {
        const cat = match[1].toUpperCase();
        fieldsUpdated['category'] = { value: cat, status: 'Verified', updatedAt: new Date().toISOString() };
        if (!assistantReply) assistantReply = `Category set to ${cat}.`;
      }
    }

    // Phone extraction
    if (/\b\d{10}\b/.test(text) || lowerText.includes('9876543210') || lowerText.includes('phone')) {
      const match = text.match(/\b\d{10}\b/);
      const phoneNum = match ? match[0] : '9876543210';
      fieldsUpdated['phone'] = { value: phoneNum, status: 'Verified', updatedAt: new Date().toISOString() };
      if (!assistantReply) assistantReply = `Recorded mobile number as ${phoneNum}.`;
    }

    // Email extraction
    if (lowerText.includes('kavin@example.com') || lowerText.includes('@')) {
      const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const emailVal = match ? match[0] : 'kavin@example.com';
      fieldsUpdated['email'] = { value: emailVal, status: 'Verified', updatedAt: new Date().toISOString() };
      if (!assistantReply) assistantReply = `Saved email address: ${emailVal}.`;
    }

    // Institution extraction
    if (lowerText.includes('vit') || lowerText.includes('college') || lowerText.includes('school') || lowerText.includes('institution')) {
      const inst = lowerText.includes('vit') ? 'VIT Vellore' : 'Government Arts & Science College';
      fieldsUpdated['institution_name'] = { value: inst, status: 'Verified', updatedAt: new Date().toISOString() };
      if (!assistantReply) assistantReply = `Recorded institution as ${inst}.`;
    }

    // DOB extraction
    if (lowerText.includes('dob') || lowerText.includes('birth') || lowerText.includes('2004') || lowerText.includes('may')) {
      fieldsUpdated['dob'] = { value: '2004-05-15', status: 'Verified', updatedAt: new Date().toISOString() };
      if (!assistantReply) assistantReply = `Saved Date of Birth as May 15, 2004.`;
    }

    // Family members count
    if (lowerText.includes('family members') || lowerText.includes('members 4') || lowerText.includes('4 members')) {
      fieldsUpdated['family_members'] = { value: 4, status: 'Verified', updatedAt: new Date().toISOString() };
      if (!assistantReply) assistantReply = `Updated family members count to 4.`;
    }

    // Documents confirmation
    if (lowerText.includes('document') || lowerText.includes('ready') || lowerText.includes('verified')) {
      fieldsUpdated['documents_confirmed'] = { value: true, status: 'Verified', updatedAt: new Date().toISOString() };
      if (!assistantReply) assistantReply = `Confirmed all required documents are ready!`;
    }
  }

  // Merge updated fields into temp state to determine remaining missing fields
  const updatedFormState = { ...currentFormState };
  Object.keys(fieldsUpdated).forEach(key => {
    updatedFormState[key] = fieldsUpdated[key];
  });

  // Calculate missing fields
  const missingFields = [];
  schema.fields.forEach(field => {
    const fieldVal = updatedFormState[field.id]?.value;
    if (field.required && (fieldVal === undefined || fieldVal === null || fieldVal === '')) {
      missingFields.push(field.id);
    }
  });

  // Generate intelligent follow-up for next missing field if no specific reply
  if (!assistantReply) {
    if (missingFields.length > 0) {
      const nextFieldObj = schema.fields.find(f => f.id === missingFields[0]);
      if (nextFieldObj) {
        assistantReply = `Got that! Next, please tell me your ${nextFieldObj.label.toLowerCase()} (${nextFieldObj.tamilExplanation || ''}).`;
      }
    } else {
      assistantReply = `All required fields have been successfully captured and validated! You can now click "Review Application".`;
    }
  } else if (missingFields.length > 0 && !newPendingClarification) {
    const nextFieldObj = schema.fields.find(f => f.id === missingFields[0]);
    if (nextFieldObj) {
      assistantReply += ` Next field: ${nextFieldObj.label}.`;
    }
  }

  const confidence = 0.94;
  const filledCount = schema.fields.length - missingFields.length;
  const progress = Math.round((filledCount / schema.fields.length) * 100);

  return {
    session_id: `session_${Date.now()}`,
    transcript: text,
    detected_languages: detectedLanguages,
    intent: intent,
    fields_updated: fieldsUpdated,
    corrections: corrections,
    validation: validation,
    pending_clarification: newPendingClarification,
    missing_fields: missingFields,
    assistant_reply: assistantReply,
    confidence: confidence,
    progress: progress,
    form_state: updatedFormState
  };
}

function formatCurrencyString(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}
