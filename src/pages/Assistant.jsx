import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { RefreshCw, Scan, Sparkles, Zap, RotateCcw, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import WorkflowSwitcher from '../components/WorkflowSwitcher';
import LanguageBadge from '../components/LanguageBadge';
import ConversationPanel from '../components/ConversationPanel';
import DynamicForm from '../components/DynamicForm';
import FormScanner from '../components/FormScanner';
import { getSchemaById, calculateProgress } from '../utils/formatters';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { processConversation, transcribeAudio } from '../services/api';

export default function Assistant() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeFormId = searchParams.get('form') || 'scholarship_01';
  const schema = getSchemaById(activeFormId);

  // Core State
  const [formState, setFormState] = useState({});
  const [messages, setMessages] = useState([]);
  const [lastTranscript, setLastTranscript] = useState(null);
  const [detectedLanguages, setDetectedLanguages] = useState(['Tamil', 'English']);
  const [pendingClarification, setPendingClarification] = useState(null);
  const [technicalData, setTechnicalData] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Initialize workflow welcome message
  useEffect(() => {
    setFormState({});
    setPendingClarification(null);
    setLastTranscript(null);
    setMessages([
      {
        id: 'msg_welcome',
        role: 'assistant',
        text: `Welcome! I am VaaniForm for ${schema.title}.\nSpeak naturally in Tamil or English (e.g. "My name is Kavin...").`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [activeFormId]);

  // Voice recorder hook setup
  const handleSpeechBlobRecorded = async (audioBlob) => {
    const speechResult = await transcribeAudio(audioBlob);
    setLastTranscript(speechResult.transcript);
    await handleUserMessageSubmit(speechResult.transcript);
  };

  const {
    recorderState,
    errorMessage,
    startListening,
    stopListening,
    resetState
  } = useVoiceRecorder({ onSpeechRecorded: handleSpeechBlobRecorded });

  // Single Shared Conversation Processor
  const handleUserMessageSubmit = async (userText) => {
    const userMsg = {
      id: `msg_${Date.now()}`,
      role: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    // Send to processing API (mock or backend)
    try {
      const res = await processConversation(userText, activeFormId, formState, pendingClarification);

      setFormState(res.form_state);
      setDetectedLanguages(res.detected_languages || ['Tamil', 'English']);
      setPendingClarification(res.pending_clarification);
      setTechnicalData({
        detected_languages: res.detected_languages,
        intent: res.intent,
        extracted_fields: res.fields_updated,
        missing_fields: res.missing_fields,
        validation: res.validation,
        confidence: res.confidence
      });

      const assistantMsg = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        text: res.assistant_reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        text: 'Sorry, I ran into an issue processing that. Please try again or type your reply.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  // Workflow Switching
  const handleChangeWorkflow = (newFormId) => {
    setSearchParams({ form: newFormId });
  };

  // Manual Form Input Override
  const handleManualFieldChange = (fieldId, newValue) => {
    setFormState(prev => ({
      ...prev,
      [fieldId]: {
        value: newValue,
        status: newValue ? 'Verified' : 'Missing',
        updatedAt: new Date().toISOString()
      }
    }));
  };

  // Confirmation Alert Action Callbacks
  const handleConfirmClarification = async (clarification) => {
    await handleUserMessageSubmit('Yes, confirm');
  };

  const handleCorrectClarification = async (clarification) => {
    await handleUserMessageSubmit('No, let me correct the income amount');
  };

  // Reset Session
  const handleResetSession = () => {
    setFormState({});
    setPendingClarification(null);
    setLastTranscript(null);
    setTechnicalData(null);
    resetState();
    setMessages([
      {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        text: `Session reset! I am ready to guide you through ${schema.title}. Tap the mic to speak.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Hackathon Demo Helper Buttons (Section 43)
  const handleLoadDemoScenario = async () => {
    handleResetSession();
    setTimeout(async () => {
      setLastTranscript("My name is Kavin. Second year AI and Data Science padikren.");
      await handleUserMessageSubmit("My name is Kavin. Second year AI and Data Science padikren.");
      setTimeout(async () => {
        setLastTranscript("Twenty thousand per month.");
        await handleUserMessageSubmit("Twenty thousand per month.");
      }, 1000);
    }, 400);
  };

  const handleLoadDemoScan = () => {
    setSearchParams({ form: 'scanned_form_demo' });
  };

  const currentProgress = calculateProgress(schema, formState);

  return (
    <div className="min-h-screen bg-mesh-pattern bg-grid-subtle text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar onOpenScanner={() => setIsScannerOpen(true)} />

      {/* Main Workspace Sub-Header Controls */}
      <div className="border-b border-white/10 glass-panel py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Left: Workflow Switcher & Status */}
          <div className="flex items-center gap-3">
            <WorkflowSwitcher activeFormId={activeFormId} onChangeWorkflow={handleChangeWorkflow} />
            <LanguageBadge languages={detectedLanguages} />
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>● Online</span>
            </div>
          </div>

          {/* Right: Quick Action Controls & Hackathon Demo Helpers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold flex items-center gap-1.5 transition-all"
            >
              <Scan className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scan Form</span>
            </button>

            <button
              onClick={handleResetSession}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 font-semibold flex items-center gap-1.5 transition-all"
              title="Reset current session"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset</span>
            </button>

            {/* Demo Helper Group */}
            <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-white/10">
              <button
                onClick={handleLoadDemoScenario}
                className="px-2.5 py-1 rounded-md bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-sm"
              >
                <Zap className="w-3 h-3 text-yellow-300" />
                <span>Load Demo Scenario</span>
              </button>
              <button
                onClick={handleLoadDemoScan}
                className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold"
              >
                Load Demo Scan
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Workspace Main Area: 50/50 Desktop Split Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-140px)]">
        
        {/* LEFT PANEL: Conversation */}
        <div className="h-[600px] lg:h-[calc(100vh-160px)]">
          <ConversationPanel
            messages={messages}
            lastTranscript={lastTranscript}
            detectedLanguages={detectedLanguages}
            recorderState={recorderState}
            errorMessage={errorMessage}
            pendingClarification={pendingClarification}
            technicalData={technicalData}
            onSendMessage={handleUserMessageSubmit}
            onStartListening={startListening}
            onStopListening={stopListening}
            onResetError={resetState}
            onConfirmClarification={handleConfirmClarification}
            onCorrectClarification={handleCorrectClarification}
          />
        </div>

        {/* RIGHT PANEL: Live Form */}
        <div className="h-[600px] lg:h-[calc(100vh-160px)]">
          <DynamicForm
            schema={schema}
            formState={formState}
            progress={currentProgress}
            onChangeManual={handleManualFieldChange}
          />
        </div>

      </main>

      {/* Camera Form Scanner Modal */}
      <FormScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onFormScannedAndStart={(scannedFormId) => handleChangeWorkflow(scannedFormId)}
      />

    </div>
  );
}
