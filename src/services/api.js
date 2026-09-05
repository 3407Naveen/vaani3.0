import { processMockConversation } from './mockApi';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export async function startSession(formId = 'scholarship_01') {
  if (USE_MOCK_API) {
    return {
      session_id: `session_${Date.now()}`,
      form_id: formId,
      status: 'active',
      created_at: new Date().toISOString()
    };
  }

  const response = await fetch(`${API_BASE_URL}/api/session/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form_id: formId })
  });
  return response.json();
}

export async function transcribeAudio(audioBlob) {
  if (USE_MOCK_API) {
    // Return sample transcribed text for mock voice input
    return {
      transcript: "My name is Kavin. Second year AI and Data Science padikren.",
      language: "Tamil + English"
    };
  }

  const formData = new FormData();
  formData.append('file', audioBlob, 'speech.webm');

  const response = await fetch(`${API_BASE_URL}/api/speech/transcribe`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}

export async function processConversation(textInput, activeFormId, currentFormState, pendingClarification) {
  if (USE_MOCK_API) {
    // Simulate slight network delay for natural feel
    await new Promise(resolve => setTimeout(resolve, 400));
    return processMockConversation(textInput, activeFormId, currentFormState, pendingClarification);
  }

  const response = await fetch(`${API_BASE_URL}/api/conversation/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text_input: textInput,
      form_id: activeFormId,
      form_state: currentFormState,
      pending_clarification: pendingClarification
    })
  });
  return response.json();
}

export async function synthesizeSpeech(text) {
  if (USE_MOCK_API) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
    return { status: 'playing', mode: 'web_speech_synthesis' };
  }

  const response = await fetch(`${API_BASE_URL}/api/speech/synthesize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return response.json();
}
