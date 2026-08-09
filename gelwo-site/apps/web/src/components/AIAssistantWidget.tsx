'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  FiCpu, FiX, FiSend, FiCheckCircle, FiCalendar, FiSearch,
  FiFileText, FiHelpCircle, FiChevronUp, FiMic
} from 'react-icons/fi';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionButton?: {
    label: string;
    action: string;
  };
}

export const AIAssistantWidget: React.FC = () => {
  const { triggerQuotationModal, setIsLoginOpen } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: "👋 Welcome to GELWO Technologies.\nI'm GELWO AI.\n\nI can:\n✓ Recommend services\n✓ Calculate quotations\n✓ Explain our portfolio\n✓ Book consultations\n✓ Track projects\n\nHow may I help you today?",
      time: 'Just now',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');

    // AI Intelligent Response Logic
    setTimeout(() => {
      let botResponse = "I can definitely assist you with that! GELWO offers comprehensive multi-sector services including ICT, Solar, Construction, and Supplies.";
      let actionBtn: ChatMessage['actionButton'] = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('quote') || lower.includes('cost') || lower.includes('price')) {
        botResponse = "I have calibrated our AI Quotation Engine for you. You can calculate instant cost estimates, risk metrics, and timelines.";
        actionBtn = { label: 'Open AI Quotation Center', action: 'quotation' };
      } else if (lower.includes('solar') || lower.includes('power') || lower.includes('energy')) {
        botResponse = "GELWO Solar Division installs commercial PV microgrids (100kW to 2MW+), hybrid lithium battery banks, and solar water pumps across East Africa.";
        actionBtn = { label: 'Explore Solar Division', action: 'solar' };
      } else if (lower.includes('track') || lower.includes('status') || lower.includes('project')) {
        botResponse = "Please enter your Project Tracking ID (e.g. GLW-8891) below to fetch real-time ERP progress.";
      } else if (lower.includes('ict') || lower.includes('cctv') || lower.includes('network')) {
        botResponse = "Our ICT Security Division builds enterprise server racks, fiber optic grids, and biometric access controls certified for institutional use.";
        actionBtn = { label: 'View ICT Services', action: 'ict' };
      } else if (lower.includes('book') || lower.includes('consult')) {
        botResponse = "Our lead engineers and consultants are available for site surveys and technical consultations. Would you like to schedule a session?";
        actionBtn = { label: 'Book Expert Consultation', action: 'consult' };
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionButton: actionBtn,
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 700);
  };

  const handleActionClick = (action: string) => {
    if (action === 'quotation' || action === 'solar' || action === 'ict') {
      triggerQuotationModal(action === 'solar' ? 'Solar Energy' : action === 'ict' ? 'ICT & Security' : undefined);
    } else if (action === 'consult') {
      alert('Consultation Booking: Opening direct calendar booking...');
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setTrackingResult(
      `Status for #${trackingId.toUpperCase()}: Project at 85% completion. Commissioning scheduled for Nakuru Hub.`
    );
  };

  return (
    <div id="ai-assistant" className="fixed bottom-6 right-6 z-[6000]">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          onClick={() => setIsOpen(true)}
          className="px-5 py-4 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-2xl flex items-center space-x-3 glow-cyan border border-cyan-300/40"
        >
          <div className="w-9 h-9 rounded-2xl bg-black/40 flex items-center justify-center text-cyan-300">
            <FiCpu className="text-xl animate-spin" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-extrabold tracking-wide block font-heading">GELWO AI</span>
            <span className="text-[10px] text-cyan-200 block font-mono">Assistant Active</span>
          </div>
        </motion.button>
      )}

      {/* Floating Interactive Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-[92vw] sm:w-[420px] bg-[#0A0F1D] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[560px]"
          >
            {/* Top Header Bar */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black font-bold text-lg shadow-md">
                  <FiCpu />
                </div>
                <div>
                  <h4 className="font-bold text-white font-heading text-sm">GELWO AI Assistant</h4>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                    Online • Corporate Engine v2.0
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="p-2.5 bg-slate-950/80 border-b border-slate-800 flex space-x-2 overflow-x-auto text-[11px] scrollbar-none">
              <button
                onClick={() => handleSend('Recommend Solar Solution')}
                className="px-3 py-1.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-800 hover:border-cyan-500 flex-shrink-0"
              >
                ⚡ Solar Solution
              </button>
              <button
                onClick={() => handleSend('Calculate Quotation')}
                className="px-3 py-1.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-800 hover:border-cyan-500 flex-shrink-0"
              >
                📄 Instant Quote
              </button>
              <button
                onClick={() => handleSend('Track Project Status')}
                className="px-3 py-1.5 rounded-full bg-slate-900 text-cyan-300 border border-slate-800 hover:border-cyan-500 flex-shrink-0"
              >
                🔍 Track ERP
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-tr-none'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    {msg.actionButton && (
                      <button
                        onClick={() => handleActionClick(msg.actionButton!.action)}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-cyan-500 text-black font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center justify-center space-x-1"
                      >
                        <span>{msg.actionButton.label}</span>
                      </button>
                    )}
                    <span className="block text-[9px] text-slate-400 text-right mt-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {/* Project ERP Tracker Box */}
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <form onSubmit={handleTrackSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. GLW-889)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-cyan-500 text-black font-bold rounded-xl text-xs"
                  >
                    Track
                  </button>
                </form>
                {trackingResult && (
                  <p className="text-[11px] text-emerald-400 mt-2 font-mono">{trackingResult}</p>
                )}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask GELWO AI anything..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400 transition-colors font-bold"
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
