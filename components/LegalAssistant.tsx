import React, { useState, useRef, useEffect } from 'react';
import { Send, Scale, User, Bot, AlertTriangle, Sparkles, MessageSquare, ArrowRight, FileText, Shield } from 'lucide-react';
import { createLegalChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat, GenerateContentResponse } from "@google/genai";

// Advanced Text Renderer for simple Markdown (Bold, Bullet points, Paragraphs)
const FormattedText = ({ text }: { text: string }) => {
  const paragraphs = text.split('\n');
  
  return (
    <div className="space-y-2">
      {paragraphs.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;
        
        // Handle Bullet Points
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
          const content = line.trim().substring(2);
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-current opacity-70 mt-1.5 w-1.5 h-1.5 bg-current rounded-full shrink-0" />
              <span>{parseBold(content)}</span>
            </div>
          );
        }

        return <p key={i} className="leading-relaxed">{parseBold(line)}</p>;
      })}
    </div>
  );
};

const parseBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

const QUICK_ACTIONS = [
  { label: "Draft Complaint Letter", icon: <FileText size={14} /> },
  { label: "List of Evidence Needed", icon: <Scale size={14} /> },
  { label: "What is Stridhan?", icon: <Shield size={14} /> },
  { label: "How to file Zero FIR?", icon: <AlertTriangle size={14} /> },
];

const LegalAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "**Namaste.** I am your NariRaksha AI.\n\nI can help you understand your rights, **draft a police complaint**, or explain legal safety measures.\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatSessionRef.current = createLegalChatSession();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || query;
    if (!textToSend.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    try {
      const result = await chatSessionRef.current.sendMessageStream({ message: textToSend });
      
      let fullResponseText = "";
      setMessages(prev => [...prev, { role: 'model', text: "", timestamp: new Date() }]);

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          fullResponseText += text;
          setMessages(prev => {
            const newHistory = [...prev];
            newHistory[newHistory.length - 1].text = fullResponseText;
            return newHistory;
          });
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Network error. Please try again.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 rounded-t-2xl shadow-xl p-4 flex items-center justify-between text-white border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Legal AI Companion</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Real-time Support
            </div>
          </div>
        </div>
        <div className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-full text-xs font-bold cursor-pointer flex items-center gap-2 animate-pulse">
          <AlertTriangle size={14} /> EMERGENCY: 112
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-slate-100 overflow-y-auto p-4 space-y-6 relative">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
            <div className={`flex gap-3 max-w-[90%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-purple-600 border border-slate-200 shadow-sm'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Scale size={16} />}
              </div>

              <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
              }`}>
                <FormattedText text={msg.text} />
                <div className={`text-[10px] mt-2 opacity-60 text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[75%]">
             <div className="w-8 h-8 bg-white text-purple-600 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
               <Scale size={16} />
             </div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 flex items-center gap-2">
               <span className="text-xs text-slate-500 font-medium">Drafting response...</span>
               <div className="flex gap-1">
                 <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-200"></span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Actions */}
      <div className="bg-slate-100 px-4 py-2 border-t border-slate-200">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSend(action.label)}
              disabled={isTyping}
              className="whitespace-nowrap flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 text-xs font-medium px-3 py-2 rounded-full transition shadow-sm"
            >
              {action.icon} {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 rounded-b-2xl shadow-lg border-t border-slate-200">
        <div className="flex items-end gap-2">
          <textarea 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
            placeholder="Type your question regarding dowry, harassment, or legal help..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-12 max-h-32"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!query.trim() || isTyping}
            className="h-12 w-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center shadow-lg disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalAssistant;