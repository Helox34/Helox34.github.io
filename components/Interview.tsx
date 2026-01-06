import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage, CreatorMode } from '../types';
import { sendInterviewMessage } from '../services/geminiService';

interface InterviewProps {
  mode: CreatorMode;
  onFinished: (history: ChatMessage[]) => void;
}

export const Interview: React.FC<InterviewProps> = ({ mode, onFinished }) => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    const startInterview = async () => {
      setIsLoading(true);
      const initialPrompt = mode === CreatorMode.WORKOUT 
        ? "Cześć! Chcę ułożyć plan treningowy. Zacznij wywiad." 
        : "Cześć! Chcę ułożyć dietę. Zacznij wywiad.";
      
      const response = await sendInterviewMessage([], initialPrompt, mode);
      setHistory([{ role: 'model', text: response }]);
      setIsLoading(false);
    };
    startInterview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setInput('');
    setIsLoading(true);

    const response = await sendInterviewMessage(newHistory, input, mode);
    setHistory(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col h-[600px]">
      <div className="bg-slate-800 p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5 text-emerald-400" />
          Wirtualny Trener (Wywiad)
        </h3>
        {history.length > 4 && (
          <button
            onClick={() => onFinished(history)}
            className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-full transition-colors font-medium animate-pulse"
          >
            Zakończ i Generuj Plan
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {history.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-blue-100' : 'bg-emerald-100'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-blue-600" /> : <Bot className="w-5 h-5 text-emerald-600" />}
            </div>
            <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-sm p-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            AI pisze...
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Twoja odpowiedź..."
            disabled={isLoading}
            className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-slate-800 hover:bg-slate-900 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};