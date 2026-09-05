import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Mic, Sparkles } from 'lucide-react';
import ChatBubble from './ChatBubble';
import VoiceButton from './VoiceButton';
import TranscriptCard from './TranscriptCard';
import ValidationAlert from './ValidationAlert';
import TechnicalInspector from './TechnicalInspector';

export default function ConversationPanel({
  messages = [],
  lastTranscript = null,
  detectedLanguages = ['Tamil', 'English'],
  recorderState = 'IDLE',
  errorMessage = null,
  pendingClarification = null,
  technicalData = null,
  onSendMessage,
  onStartListening,
  onStopListening,
  onResetError,
  onConfirmClarification,
  onCorrectClarification
}) {
  const [textInput, setTextInput] = useState('');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, lastTranscript, pendingClarification]);

  const handleSendText = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    onSendMessage(textInput.trim());
    setTextInput('');
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      
      {/* Top Conversation Header */}
      <div className="px-5 py-3.5 border-b border-white/10 bg-slate-900/70 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Voice & Chat Interface</span>
          </h2>
          <p className="text-[11px] text-slate-400">Speak naturally in Tamil, English, or both.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-[11px] font-semibold text-cyan-400">Sarvam Engine</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <ChatBubble key={msg.id || index} message={msg} />
        ))}

        {/* Live Speech Transcript Card */}
        <TranscriptCard lastTranscript={lastTranscript} languages={detectedLanguages} />

        {/* Income Verification Alert */}
        <ValidationAlert
          clarification={pendingClarification}
          onConfirm={onConfirmClarification}
          onCorrect={onCorrectClarification}
        />

        {/* Collapsible Technical Inspector */}
        <TechnicalInspector technicalData={technicalData} />

        <div ref={chatBottomRef} />
      </div>

      {/* Voice Mic Interaction Area */}
      <div className="border-t border-white/10 bg-slate-950/60 pt-2 pb-1">
        <VoiceButton
          recorderState={recorderState}
          errorMessage={errorMessage}
          onStartListening={onStartListening}
          onStopListening={onStopListening}
          onResetError={onResetError}
          onSwitchToType={() => document.getElementById('text-fallback-input')?.focus()}
        />
      </div>

      {/* Text Input Fallback */}
      <form onSubmit={handleSendText} className="p-3 border-t border-white/10 bg-slate-900/90 flex items-center gap-2">
        <input
          id="text-fallback-input"
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Type your response instead (e.g. My name is Kavin)..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
        />
        <button
          type="submit"
          disabled={!textInput.trim()}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
}
