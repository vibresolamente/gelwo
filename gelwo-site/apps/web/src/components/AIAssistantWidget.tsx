'use client';

/**
 * AIAssistantWidget — GELWO AI Presenter Component
 *
 * Blueprint & Spec Section 12 & 15:
 *  - AI Identity palette: Sage (#566944) + Purple (#4A346A)
 *  - 6 Presenter Personas (Host, Technology, Business, Product, Support, Quotation)
 *  - Dynamic route detection (changes presenter title & system prompt based on current URL)
 *  - Interactive chat panel linked to /api/ai/chat
 */

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getPersonaForRoute, AI_PERSONAS, AIPersonaType } from '@/lib/ai-prompts';
import {
  FiCpu, FiX, FiSend, FiFileText, FiLoader
} from 'react-icons/fi';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  personaName?: string;
  actionButton?: {
    label: string;
    action: string;
  };
}

export const AIAssistantWidget: React.FC = () => {
  const pathname = usePathname();
  const { triggerQuotationModal } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const activePersonaType: AIPersonaType = getPersonaForRoute(pathname || '/');
  const personaConfig = AI_PERSONAS[activePersonaType];

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: 'init',
        sender: 'bot',
        text: personaConfig.greetingMessage,
        time: 'Just now',
        personaName: personaConfig.name,
      },
    ]);
  }, [activePersonaType]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputMsg;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          persona: activePersonaType,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      let actionBtn: ChatMessage['actionButton'] = undefined;
      const lower = query.toLowerCase();
      if (lower.includes('quote') || lower.includes('cost') || lower.includes('price')) {
        actionBtn = { label: 'Open AI Quotation Center', action: 'quotation' };
      } else if (lower.includes('solar') || lower.includes('power')) {
        actionBtn = { label: 'Explore Solar Solutions', action: 'solar' };
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        personaName: data.persona || personaConfig.name,
        actionButton: actionBtn,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Thank you for reaching out. A GELWO representative will be glad to assist you. You can also click below to request an instant quotation.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          personaName: personaConfig.name,
          actionButton: { label: 'Request Quotation', action: 'quotation' },
        },
      ]);
    }
  };

  const handleActionClick = (action: string) => {
    if (action === 'quotation' || action === 'solar') {
      triggerQuotationModal(action === 'solar' ? 'Solar Energy' : undefined);
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
    <div id="ai-assistant" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[6000]">
      {/* Floating AI Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          className="p-3 sm:px-5 sm:py-3.5 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-purple/40 text-gelwo-midnight dark:text-gelwo-ivory shadow-2xl flex items-center space-x-2.5 sm:space-x-3 glow-purple"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gelwo-sage to-gelwo-purple flex items-center justify-center text-gelwo-ivory font-bold flex-shrink-0">
            <FiCpu className="text-lg" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-xs font-extrabold tracking-wide block font-heading text-gelwo-sage">
              ◉ {personaConfig.name}
            </span>
            <span className="text-[10px] text-gelwo-purple block font-mono">AI Active</span>
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
            className="w-[calc(100vw-2rem)] sm:w-[420px] max-w-[420px] bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-purple/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] sm:h-[580px] max-h-[85vh]"
          >
            {/* Top Header Bar */}
            <div className="p-4 bg-gelwo-blush dark:bg-gelwo-royal border-b border-gelwo-gray dark:border-gelwo-purple/20 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-gelwo-sage to-gelwo-purple flex items-center justify-center text-gelwo-ivory font-bold text-lg">
                  <FiCpu />
                </div>
                <div>
                  <h4 className="font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading text-sm">{personaConfig.name}</h4>
                  <span className="text-[10px] text-gelwo-sage font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gelwo-sage animate-ping" />
                    {personaConfig.role} • GELWO AI
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple rounded-xl hover:bg-gelwo-gray dark:hover:bg-gelwo-purple/20 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="p-2.5 bg-gelwo-blush/80 dark:bg-gelwo-royal/80 border-b border-gelwo-gray dark:border-gelwo-purple/20 flex space-x-2 overflow-x-auto text-[11px] scrollbar-none">
              {personaConfig.suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1 rounded-full bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-sage border border-gelwo-sage/20 hover:border-gelwo-sage flex-shrink-0 transition-colors whitespace-nowrap shadow-sm"
                >
                  💬 {q}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gelwo-ivory dark:bg-gelwo-midnight">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-gelwo-sage to-gelwo-purple text-gelwo-ivory font-medium rounded-tr-none'
                        : 'bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-gelwo-midnight dark:text-gelwo-gray rounded-tl-none'
                    }`}
                  >
                    {msg.sender === 'bot' && msg.personaName && (
                      <span className="block text-[10px] font-mono text-gelwo-sage font-bold mb-1">
                        {msg.personaName}
                      </span>
                    )}
                    {msg.text}

                    {msg.actionButton && (
                      <button
                        onClick={() => handleActionClick(msg.actionButton!.action)}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-gelwo-sage text-gelwo-ivory font-bold text-xs hover:bg-gelwo-purple transition-colors flex items-center justify-center space-x-1"
                      >
                        <FiFileText />
                        <span>{msg.actionButton.label}</span>
                      </button>
                    )}
                    <span className={`block text-[9px] text-right mt-1 font-mono ${msg.sender === 'user' ? 'text-gelwo-ivory/80' : 'text-gelwo-midnight/40 dark:text-gelwo-gray'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="p-3.5 bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-2xl text-xs text-gelwo-sage flex items-center space-x-2">
                    <FiLoader className="animate-spin text-sm" />
                    <span>GELWO AI is processing...</span>
                  </div>
                </div>
              )}

              {/* ERP Project Tracker */}
              <div className="p-3 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 mt-2">
                <form onSubmit={handleTrackSubmit} className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. GLW-889)"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1 bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-purple/30 rounded-xl px-3 py-1.5 text-xs text-gelwo-midnight dark:text-gelwo-ivory focus:outline-none focus:border-gelwo-sage focus:ring-1 focus:ring-gelwo-sage"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-gelwo-sage hover:bg-gelwo-purple transition-colors text-gelwo-ivory font-bold rounded-xl text-xs"
                  >
                    Track
                  </button>
                </form>
                {trackingResult && (
                  <p className="text-[11px] text-gelwo-sage mt-2 font-mono">{trackingResult}</p>
                )}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-gelwo-blush dark:bg-gelwo-royal border-t border-gelwo-gray dark:border-gelwo-purple/20 flex items-center space-x-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask ${personaConfig.name}...`}
                className="flex-1 bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-purple/30 rounded-xl px-4 py-2.5 text-xs text-gelwo-midnight dark:text-gelwo-ivory focus:outline-none focus:border-gelwo-sage focus:ring-1 focus:ring-gelwo-sage"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading}
                className="p-2.5 bg-gelwo-sage text-gelwo-ivory rounded-xl hover:bg-gelwo-purple transition-colors font-bold disabled:opacity-50"
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
