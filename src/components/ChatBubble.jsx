import React from 'react';
import { Bot, User, Volume2 } from 'lucide-react';
import { synthesizeSpeech } from '../services/api';

export default function ChatBubble({ message }) {
  const isAssistant = message.role === 'assistant';

  const handleReadAloud = () => {
    synthesizeSpeech(message.text);
  };

  return (
    <div className={`flex items-start gap-3 my-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-md flex-shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Bot className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
      )}

      {/* Bubble Box */}
      <div
        className={`max-w-[85%] sm:max-w-[78%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
          isAssistant
            ? 'glass-bubble-assistant text-slate-100 rounded-tl-sm'
            : 'glass-bubble-user text-white rounded-tr-sm'
        }`}
      >
        <p className="whitespace-pre-line">{message.text}</p>
        
        <div className="flex items-center justify-between gap-4 mt-1.5 text-[10px] opacity-70">
          <span>{message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          
          {isAssistant && (
            <button
              onClick={handleReadAloud}
              className="hover:text-cyan-300 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
              title="Read aloud message"
            >
              <Volume2 className="w-3 h-3" />
              <span>Read</span>
            </button>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-700 p-0.5 shadow-md flex-shrink-0">
          <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
            <User className="w-4 h-4 text-blue-300" />
          </div>
        </div>
      )}

    </div>
  );
}
