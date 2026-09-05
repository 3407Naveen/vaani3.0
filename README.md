VAANI — Voice-First Digital Forms

Give every digital form a voice.
Don’t fill the form. Just have a conversation.

VAANI is an API-first Voice Intelligence Platform that converts natural spoken responses into structured, validated form data.

It enables people who struggle with typing, reading, digital interfaces, or language barriers to complete digital forms simply by speaking in their own language.

Organizations can integrate VAANI into their existing applications through a simple API without rebuilding their existing forms or workflows.

🚨 The Problem

Millions of people struggle with digital forms because they require:

Reading complex instructions
Typing personal information
Understanding unfamiliar field labels
Switching between languages
Knowing what information is required
Correctly entering dates, numbers, and other structured data

For example, a farmer visiting a bank may know exactly what information to provide but may not be able to independently complete an online account-opening form.

This creates dependence on:

Bank employees
Family members
Agents
Cyber cafes
Other intermediaries

The problem isn't that people don't have the information.
The problem is that digital forms don't understand how people naturally communicate.

💡 Our Solution
VAANI turns any digital form into a voice conversation.

Instead of asking users to navigate a complicated form:

Traditional Form

Name: __________
Date of Birth: __________
Occupation: __________
Annual Income: __________
Account Type: __________

VAANI enables:

VAANI:

"What is your name?"

"My name is Arun Kumar."

"What is your occupation?"

"I'm a farmer."

"What type of account would you like?"

"I want a savings account."

VAANI understands the conversation, identifies the relevant information, validates it, and fills the corresponding fields automatically.

🎯 Core Idea
User Speech
     ↓
Speech Recognition
     ↓
Language Understanding
     ↓
Intent & Entity Extraction
     ↓
Form Schema Mapping
     ↓
Validation
     ↓
Missing Field Detection
     ↓
Conversational Clarification
     ↓
User Confirmation
     ↓
Structured JSON
     ↓
Customer Application / Backend
🌍 Example

A user speaks naturally:

"என் பெயர் Arun Kumar. நான் farmer. எனக்கு savings account வேண்டும்."

VAANI understands the mixed-language input and extracts:

{
  "full_name": "Arun Kumar",
  "occupation": "Farmer",
  "account_type": "Savings"
}

If the form still requires the date of birth and annual income, VAANI continues:

"What is your date of birth?"

User:

"12 March 2004."

VAANI updates the form.

Then:

"What is your annual income?"

User:

"Around 3 lakh rupees."

VAANI converts the response into structured data:

{
  "full_name": "Arun Kumar",
  "date_of_birth": "2004-03-12",
  "occupation": "Farmer",
  "annual_income": 300000,
  "account_type": "Savings"
}

Finally:

"I have completed your application. Would you like me to submit it?"

Only after explicit confirmation is the application submitted.

🚀 Why VAANI?

VAANI is not just speech-to-text.

Speech-to-Text
Speech → Text
Chatbot
Text → Answer
VAANI
Speech
   ↓
Meaning
   ↓
Form Schema
   ↓
Structured Data
   ↓
Validation
   ↓
Business System

VAANI is specifically designed to solve the voice-to-structured-data problem.

🔑 Key Features
🎙️ Voice-First Interaction

Users can provide information naturally through speech instead of typing.

🌐 Multilingual

Designed for Indian language interactions including:

Tamil
Hindi
English

and natural code-switching between languages.

🧠 Intelligent Form Understanding

VAANI maps spoken information to the correct fields in a predefined form schema.

🔍 Missing Field Detection

VAANI automatically identifies required fields that haven't been provided.

💬 Conversational Clarification

Instead of showing validation errors, VAANI asks simple follow-up questions.

✅ Structured Validation

Extracted information is validated using deterministic schemas and typed validation.

🔄 Session-Based Conversations

VAANI maintains the current form state across multiple voice interactions.

🔐 Secure API Authentication

Organizations authenticate their applications using VAANI API keys.

🔗 Webhooks

Completed forms can automatically be sent to the organization's backend.

📊 Developer Dashboard

Organizations can manage:

API keys
Form schemas
Requests
Usage
Webhooks
API documentation
Testing playground
🏗️ Architecture
                         VAANI CLOUD
                              │
                       API GATEWAY
                API Key / Tenant / Rate Limit
                              │
                       VOICE PIPELINE
                              │
              Audio → Speech Recognition
                              │
                         Transcript
                              │
                    VAANI Intelligence
                              │
                    Form Intelligence
                              │
               Schema Mapping + Extraction
                              │
                       Validation
                              │
                 Missing Field Detection
                              │
                  Conversational Follow-up
                              │
                       User Confirmation
                              │
                    Structured JSON
                              │
                         Webhook
                              │
                    Customer Backend
🧩 Dynamic Form Schema

VAANI does not hardcode individual forms.

Organizations define their form structure using a schema.

Example:

{
  "name": "Bank Account Opening",
  "fields": [
    {
      "name": "full_name",
      "label": "Full Name",
      "type": "string",
      "required": true
    },
    {
      "name": "date_of_birth",
      "label": "Date of Birth",
      "type": "date",
      "required": true
    },
    {
      "name": "occupation",
      "label": "Occupation",
      "type": "string",
      "required": true
    },
    {
      "name": "annual_income",
      "label": "Annual Income",
      "type": "number",
      "required": true
    },
    {
      "name": "account_type",
      "label": "Account Type",
      "type": "enum",
      "values": [
        "Savings",
        "Current"
      ],
      "required": true
    }
  ]
}

This makes VAANI form-agnostic.

The same intelligence layer can work with:

Bank forms
Insurance forms
Healthcare forms
Government applications
Education forms
Agriculture forms
Loan applications
MSME applications
🔌 API-First Platform

VAANI is designed as infrastructure rather than only a standalone application.

An organization can integrate VAANI into its existing application.

Integration Flow
Existing Customer App
        │
        │ Voice Input
        ↓
   VAANI API
        │
        ↓
 Voice Intelligence
        │
        ↓
 Form Intelligence
        │
        ↓
 Validation
        │
        ↓
 Structured JSON
        │
        ↓
Customer Backend

Organizations don't need to rebuild their applications.

They provide:

A form schema
Voice input
VAANI API credentials

VAANI returns structured, validated data.

🔑 API Authentication

Example API request:

curl https://api.vaani.ai/v1/voice-intake \
  -H "Authorization: Bearer vaani_live_xxxxx" \
  -F "audio=@customer.wav" \
  -F "form_id=bank_account"

Example response:

{
  "request_id": "req_82H7K",
  "session_id": "sess_8392",
  "status": "partial",
  "data": {
    "full_name": "Arun Kumar",
    "occupation": "Farmer",
    "account_type": "Savings"
  },
  "missing_fields": [
    "date_of_birth",
    "annual_income"
  ],
  "next_question": "What is your date of birth?"
}
🔄 Session-Based Form Filling

VAANI maintains the state of an ongoing conversation.

Example:

{
  "full_name": "Arun Kumar",
  "occupation": "Farmer",
  "account_type": "Savings",
  "date_of_birth": null,
  "annual_income": null
}

After the next response:

{
  "full_name": "Arun Kumar",
  "occupation": "Farmer",
  "account_type": "Savings",
  "date_of_birth": "2004-03-12",
  "annual_income": null
}

The conversation continues until all required fields are completed.

🧠 Form Intelligence Engine

VAANI's intelligence layer performs:

Transcript
    ↓
Information Extraction
    ↓
Schema Mapping
    ↓
Type Conversion
    ↓
Validation
    ↓
Form State Update
    ↓
Missing Field Detection
    ↓
Next Question

The AI is instructed to extract only information corresponding to fields defined by the supplied schema.

It must not invent information.

🛡️ Validation

AI-generated extraction is not directly trusted.

The pipeline is:

LLM
 ↓
Candidate JSON
 ↓
Schema Mapper
 ↓
Pydantic / JSON Schema
 ↓
Validated Data

For example:

User:
"My annual income is banana."

VAANI:
"Could you please tell me your annual income in numbers?"

This prevents invalid AI output from directly entering business systems.

🔗 Webhooks

Organizations can configure a webhook endpoint.

Example:

https://customer.com/api/vaani/webhook

After a form is completed:

{
  "event": "voice.form.completed",
  "request_id": "req_123",
  "form_id": "bank_account",
  "data": {
    "full_name": "Arun Kumar",
    "occupation": "Farmer",
    "account_type": "Savings"
  }
}

The webhook can be secured using an HMAC signature.

📡 API Endpoints

Core endpoints include:

POST   /v1/voice-intake

GET    /v1/voice-intake/{id}

POST   /v1/schemas

GET    /v1/schemas

GET    /v1/schemas/{id}

PUT    /v1/schemas/{id}

DELETE /v1/schemas/{id}

GET    /v1/usage

POST   /v1/webhooks

GET    /v1/webhooks

DELETE /v1/webhooks/{id}

GET    /health

FastAPI also provides interactive API documentation through:

/docs
/redoc
🖥️ User Experience

VAANI provides a simple voice-first interface.

Step 1 — Choose Service
Bank Account
Healthcare
Insurance
Government
Education
Agriculture
Step 2 — Choose Language
தமிழ்
हिन्दी
English
Step 3 — Speak

Large microphone interface with:

Listening status
Audio waveform
Live transcript
Replay
Pause / Resume
Step 4 — Form Updates
CONVERSATION             FORM

You said:                ✓ Full Name
"என் பெயர் Arun..."       Arun Kumar

                         ✓ Occupation
                         Farmer

                         ✓ Account Type
                         Savings

                         ○ Date of Birth
                         Missing
Step 5 — Clarification

VAANI asks one question at a time.

Step 6 — Review

The user can review the completed information.

Step 7 — Confirmation
Confirm & Submit
Step 8 — Success
Application Submitted

Application ID:
BANK-82931
♿ Accessibility

VAANI is designed for users who may struggle with conventional digital interfaces.

The interface prioritizes:

Large text
Large touch targets
High contrast
Audio instructions
Minimal typing
Simple questions
One question at a time
Replay functionality
Voice-first interaction
Natural language instead of technical field labels
🛠️ Tech Stack
Frontend
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Lucide Icons
Framer Motion
Recharts
Backend
Python
FastAPI
Pydantic
HTTPX
Python dotenv
AI
Sarvam AI Speech Recognition
Sarvam LLM / structured-output-capable LLM
Form Intelligence Layer
Schema-based extraction
Pydantic validation
Database
Supabase
PostgreSQL
Supabase Auth
Row Level Security
Deployment
Vercel
Railway / Render
Supabase
Development
Git
GitHub
VS Code / Cursor
Postman
FastAPI Swagger
🗄️ Database Structure

Core entities include:

organizations
profiles
api_keys
form_schemas
voice_sessions
voice_requests
usage_logs
webhooks
webhook_deliveries

Every organization-owned resource is associated with an organization to maintain tenant isolation.

🔐 Security

VAANI follows a security-first approach.

API Keys
Cryptographically secure key generation
Raw API key shown only once
Secure hash storage
Key revocation
Key prefix identification
Rate limiting
Data Isolation
Organization-level tenant isolation
Supabase Row Level Security
Organization IDs on customer-owned records
Sensitive Operations

Form submission requires explicit user confirmation.

Secrets

Sensitive credentials remain backend-side:

SARVAM_API_KEY
LLM_API_KEY
SUPABASE_SERVICE_ROLE_KEY
WEBHOOK_SECRETS
📊 Developer Dashboard

Organizations can manage their VAANI integration through a dashboard.

VAANI Dashboard

├── Overview
├── API Keys
├── Form Schemas
├── Requests
├── Usage
├── Webhooks
├── API Docs
├── Playground
└── Settings
Overview

Monitor:

API requests
Completed applications
Completion rate
Voice minutes
Processing time
Recent requests
API Keys

Create and revoke API keys.

Form Schemas

Create and manage dynamic forms.

Requests

Inspect:

Transcript
Extracted data
Validated data
Missing fields
Processing time
Response JSON
Usage

Track API usage and voice processing.

Playground

Developers can test:

API Key
   ↓
Select Form
   ↓
Upload Audio
   ↓
Send Request
   ↓
View JSON Response
🧪 Testing

VAANI should be tested with different speech patterns.

English

"My name is Arun Kumar. I'm a farmer. I need a savings account."

Tamil

"என் பெயர் அருண் குமார். நான் விவசாயி. எனக்கு savings account வேண்டும்."

Code-Switching

"என் பெயர் Arun Kumar, நான் farmer. Savings account வேண்டும்."

Missing Information

"My name is Arun."

Expected:

VAANI:
"What is your occupation?"
Ambiguous Information

"I want an account."

Expected:

VAANI:
"Would you like a Savings account or a Current account?"
Invalid Information

"My annual income is banana."

Expected:

VAANI:
"Could you please tell me your annual income in numbers?"
📈 Evaluation Metrics

Important metrics for evaluating VAANI include:

Field Extraction Accuracy

How accurately spoken information is mapped to form fields.

Required Field Completion

Percentage of required fields successfully completed.

Validation Accuracy

Ability to identify and handle invalid inputs.

Language Accuracy

Quality of understanding across supported languages and code-switching.

Task Completion Rate

Percentage of users who successfully complete the form.

Clarification Efficiency

Number of additional questions required to complete a form.

Response Time

Average processing time per interaction.

All benchmark numbers should be reported only after actual testing.

💰 Business Model

VAANI follows a B2B2C API-first SaaS model.

VAANI
  │
  ├── Banks
  ├── Hospitals
  ├── Insurance Companies
  ├── Government Platforms
  ├── Education Platforms
  ├── Agriculture Platforms
  └── Enterprises
           │
           ↓
        End Users

Potential pricing model:

Free

For experimentation and prototypes.

Developer

For startups and small applications.

Business

For organizations with higher API usage.

Enterprise

For large institutions requiring:

Higher limits
Dedicated infrastructure
Custom integrations
Enterprise support

Potential usage-based billing can include:

API requests
Voice minutes
Premium processing
🎯 Target Customers

VAANI can serve:

🏦 Banking

Account opening, loan applications, KYC-related workflows.

🏥 Healthcare

Patient registration and intake forms.

🛡️ Insurance

Policy applications and claims intake.

🏛️ Government

Citizen service applications.

🌾 Agriculture

Farmer registration, schemes and applications.

🎓 Education

Admissions and scholarship forms.

🏢 MSMEs

Business registrations and applications.

🌟 What Makes VAANI Different?

VAANI combines:

Multilingual Voice
        +
Intent Understanding
        +
Entity Extraction
        +
Dynamic Form Schemas
        +
Validation
        +
Missing Field Detection
        +
Conversational Clarification
        +
Session Management
        +
API Integration
        +
Webhooks

The key innovation is the complete pipeline:

Speech → Meaning → Form → Validation → Structured Data → Business System

🔮 Future Roadmap
Phase 1 — MVP
Voice form filling
Multilingual support
Dynamic schemas
Validation
Session management
API
Developer dashboard
Phase 2 — Platform Expansion
More Indian languages
Advanced analytics
More integrations
Enterprise controls
Improved language/code-switching support
Phase 3 — Intelligence
Domain-specific models
Better contextual understanding
Personalized clarification
Improved speech robustness
Advanced form reasoning
Phase 4 — Scale

Expand across:

Banking
   ↓
Insurance
   ↓
Healthcare
   ↓
Government
   ↓
Agriculture
   ↓
Education
   ↓
Enterprise
📁 Project Structure
vaani/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── api-keys/
│   │   ├── schemas/
│   │   ├── requests/
│   │   ├── usage/
│   │   ├── webhooks/
│   │   ├── docs/
│   │   └── playground/
│   │
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── services/
│   └── types/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── intake.py
│   │   │   ├── schemas.py
│   │   │   ├── requests.py
│   │   │   ├── usage.py
│   │   │   └── webhooks.py
│   │   │
│   │   ├── services/
│   │   │   ├── sarvam_asr.py
│   │   │   ├── llm.py
│   │   │   ├── extraction.py
│   │   │   ├── form_engine.py
│   │   │   ├── validation.py
│   │   │   ├── api_keys.py
│   │   │   ├── usage.py
│   │   │   └── webhook.py
│   │   │
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── core/
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── supabase/
│   └── migrations/
│
├── docs/
│
└── README.md
⚡ Getting Started
1. Clone Repository
git clone https://github.com/3407Naveen/vaani.git
cd vaani
2. Setup Frontend
cd frontend
npm install
npm run dev
3. Setup Backend
cd backend

python -m venv venv
Windows
venv\Scripts\activate
macOS / Linux
source venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Run FastAPI:

uvicorn app.main:app --reload

Backend documentation:

http://localhost:8000/docs
🔑 Environment Variables
Frontend
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_API_URL=
Backend
SARVAM_API_KEY=
LLM_API_KEY=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

WEBHOOK_SECRET=

Never commit secrets to GitHub.

🧪 Mock Bank Integration

For hackathon demonstration, VAANI can connect to a mock banking backend.

Example:

POST /mock-bank/applications

Request:

{
  "full_name": "Arun Kumar",
  "date_of_birth": "2004-03-12",
  "occupation": "Farmer",
  "annual_income": 300000,
  "account_type": "Savings"
}

Response:

{
  "status": "received",
  "application_id": "BANK-82931"
}

This demonstrates how a real organization could receive the structured output from VAANI.

🎬 Hackathon Demo

The recommended demonstration flow:

1. Show the Problem

Display a complicated digital bank form.

Explain:

"The information exists in the user's mind, but the digital form expects the user to know how to read, type and navigate it."

2. Start VAANI

Select Tamil / English.

3. Speak Naturally

User says:

"என் பெயர் Arun Kumar. நான் farmer. எனக்கு savings account வேண்டும்."

4. Show AI Extraction

The form automatically fills:

✓ Arun Kumar
✓ Farmer
✓ Savings Account
○ Date of Birth
○ Annual Income
5. Intelligent Question

VAANI asks:

"What is your date of birth?"

6. Complete the Form

User provides the remaining information.

7. Review

VAANI summarizes the completed form.

8. Confirm

User explicitly confirms submission.

9. Show Developer Side

Open the dashboard and demonstrate:

API Key
   ↓
Form Schema
   ↓
Voice Request
   ↓
Validated JSON
   ↓
Webhook
10. Final Message

"We don't replace digital forms. We make them accessible through voice."

🏆 Vision

Today, digital forms assume:

People can read + type + navigate.

VAANI changes that assumption to:

People can simply speak.

Our vision is to make digital services accessible to every person regardless of literacy level, typing ability, language, or digital experience.

🚀 VAANI
Give every digital form a voice.

One API. Any form. Any Indian language. Just speak.

License

This project is developed as a hackathon prototype and can be adapted for future commercial development.
