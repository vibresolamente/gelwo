'use client';

/**
 * GlobalModals Component — GELWO Futuristic Color System
 * Palette: Warm Ivory, Midnight, Deep Purple, Sage Green
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  FiSearch, FiMic, FiX, FiUser, FiShoppingBag, FiSettings,
  FiBell, FiCheck, FiTrash2, FiVolume2, FiEye, FiMoon, FiSun, FiGlobe
} from 'react-icons/fi';

export const GlobalModals: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    isVoiceSearchOpen,
    setIsVoiceSearchOpen,
    isLoginOpen,
    setIsLoginOpen,
    isCartOpen,
    setIsCartOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    notifications,
    markNotificationRead,
    inquiryCart,
    removeFromCart,
    accessibility,
    updateAccessibility,
    theme,
    toggleTheme,
    language,
    setLanguage,
    triggerQuotationModal,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('Click microphone to speak your request...');

  const searchCatalog = [
    { title: 'Software Development & Systems', category: 'Services', link: '#services' },
    { title: 'Solar Energy & Microgrids', category: 'Services', link: '#services' },
    { title: 'CCTV & Surveillance Installation', category: 'ICT', link: '#services' },
    { title: 'AI Quotation Center', category: 'Tools', link: '#quotation' },
    { title: 'General Procurement & Supplies', category: 'Services', link: '#services' },
    { title: 'Civil Construction & Infrastructure', category: 'Services', link: '#services' },
    { title: 'AGPO / NCA Certifications', category: 'Compliance', link: '#certifications' },
    { title: 'GELWO AI Assistant', category: 'AI', link: '#ai-assistant' },
    { title: 'Careers & Tenders', category: 'Company', link: '#footer' },
  ];

  const filteredSearch = searchQuery.trim() === ''
    ? searchCatalog
    : searchCatalog.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const startVoiceRecognition = () => {
    setIsListening(true);
    setVoiceText('Listening for your command (e.g. "Get Solar Quote")...');

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'SW' ? 'sw-KE' : 'en-US';
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceText(`" ${transcript} "`);
        setIsListening(false);
        setTimeout(() => {
          setIsVoiceSearchOpen(false);
          setSearchQuery(transcript);
          setIsSearchOpen(true);
        }, 1200);
      };

      recognition.onerror = () => {
        setVoiceText('Voice input simulated. Found: "ICT & Security Solutions"');
        setIsListening(false);
        setTimeout(() => {
          setIsVoiceSearchOpen(false);
          setSearchQuery('ICT Security');
          setIsSearchOpen(true);
        }, 1500);
      };
    } else {
      setTimeout(() => {
        setVoiceText('Voice input captured: "Request Solar Installation Quote"');
        setIsListening(false);
        setTimeout(() => {
          setIsVoiceSearchOpen(false);
          triggerQuotationModal('Solar Energy');
        }, 1200);
      }, 2000);
    }
  };

  return (
    <>
      {/* 🔍 SMART SEARCH MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-gelwo-midnight/75 backdrop-blur-md flex items-start justify-center pt-20 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-purple/30 rounded-2xl p-6 shadow-2xl text-gelwo-midnight dark:text-gelwo-ivory"
            >
              <div className="flex items-center space-x-3 border-b border-gelwo-gray dark:border-gelwo-purple/20 pb-4">
                <FiSearch className="text-gelwo-purple text-2xl" />
                <input
                  type="text"
                  placeholder="Search GELWO services, products, tenders, or AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-lg text-gelwo-midnight dark:text-gelwo-ivory placeholder-gelwo-midnight/50 dark:placeholder-gelwo-gray focus:outline-none"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gelwo-blush dark:hover:bg-gelwo-royal rounded-lg text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1">
                {filteredSearch.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gelwo-blush dark:hover:bg-gelwo-royal border border-transparent hover:border-gelwo-purple/30 transition-all"
                  >
                    <span className="font-medium text-gelwo-midnight/80 dark:text-gelwo-gray">{item.title}</span>
                    <span className="text-xs uppercase px-2.5 py-1 rounded-full bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-sage border border-gelwo-gray dark:border-gelwo-royal">
                      {item.category}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎤 VOICE SEARCH MODAL */}
      <AnimatePresence>
        {isVoiceSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-gelwo-midnight/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsVoiceSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-purple/40 rounded-3xl p-8 shadow-2xl text-center text-gelwo-midnight dark:text-gelwo-ivory relative"
            >
              <button
                onClick={() => setIsVoiceSearchOpen(false)}
                className="absolute top-4 right-4 p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple transition-colors"
              >
                <FiX className="text-xl" />
              </button>

              <h3 className="text-2xl font-bold font-heading mb-2 text-gelwo-sage">GELWO Voice Search</h3>
              <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-sm mb-6">{voiceText}</p>

              <div className="flex justify-center my-6">
                <button
                  onClick={startVoiceRecognition}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl ${
                    isListening
                      ? 'bg-red-500 animate-pulse text-white'
                      : 'bg-gradient-to-r from-gelwo-sage to-gelwo-purple hover:scale-105 text-gelwo-ivory'
                  }`}
                >
                  <FiMic className="text-4xl" />
                </button>
              </div>

              <p className="text-xs text-gelwo-midnight/50 dark:text-gelwo-gray uppercase tracking-widest">
                {isListening ? 'Listening...' : 'Tap Mic to Start'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👤 CLIENT LOGIN / REGISTRATION MODAL */}
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-gelwo-midnight/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsLoginOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-purple/30 rounded-3xl p-8 shadow-2xl text-gelwo-midnight dark:text-gelwo-ivory relative"
            >
              <button
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-4 right-4 p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple transition-colors"
              >
                <FiX className="text-xl" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gelwo-blush dark:bg-gelwo-royal rounded-2xl text-gelwo-purple border border-gelwo-purple/20">
                  <FiUser className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading">GELWO Client Portal</h3>
                  <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">Access quotations, invoices &amp; project tracking</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                  You can log in or register your institutional account directly on the <strong>Customer Portal</strong> page.
                </p>

                <a
                  href="/portal"
                  onClick={() => setIsLoginOpen(false)}
                  className="w-full py-3.5 btn-primary rounded-xl text-xs uppercase font-extrabold flex items-center justify-center space-x-2 block text-center"
                >
                  <span>Open Customer Portal Gateway</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛒 INQUIRIES / CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-gelwo-midnight/60 backdrop-blur-sm flex justify-end"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gelwo-ivory dark:bg-gelwo-midnight h-full border-l border-gelwo-purple/30 p-6 flex flex-col justify-between text-gelwo-midnight dark:text-gelwo-ivory shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gelwo-gray dark:border-gelwo-purple/20 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <FiShoppingBag className="text-2xl text-gelwo-purple" />
                    <h3 className="text-xl font-bold font-heading">Quotation Basket</h3>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple transition-colors">
                    <FiX className="text-xl" />
                  </button>
                </div>

                {inquiryCart.length === 0 ? (
                  <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-center py-12">Your quotation basket is empty.</p>
                ) : (
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                    {inquiryCart.map((item) => (
                      <div key={item.id} className="p-4 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gelwo-purple">{item.service}</h4>
                          <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray mt-1">{item.details}</p>
                          {item.estimatedCost && (
                            <p className="text-xs font-bold text-gelwo-sage mt-2">Est: {item.estimatedCost}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-red-500 p-1 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gelwo-gray dark:border-gelwo-purple/20 pt-4 space-y-3">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    triggerQuotationModal();
                  }}
                  className="w-full py-3.5 btn-primary rounded-xl text-xs uppercase"
                >
                  Generate Official Proposal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⚙ ACCESSIBILITY & SETTINGS DRAWER */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-gelwo-midnight/60 backdrop-blur-sm flex justify-end"
            onClick={() => setIsSettingsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-gelwo-ivory dark:bg-gelwo-midnight h-full border-l border-gelwo-purple/30 p-6 flex flex-col justify-between text-gelwo-midnight dark:text-gelwo-ivory shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-gelwo-gray dark:border-gelwo-purple/20 pb-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <FiSettings className="text-2xl text-gelwo-purple" />
                    <h3 className="text-xl font-bold font-heading">Settings & Accessibility</h3>
                  </div>
                  <button onClick={() => setIsSettingsOpen(false)} className="p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple transition-colors">
                    <FiX className="text-xl" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Theme Selector */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-2">Display Theme</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => toggleTheme()}
                        className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-sm transition-colors ${
                          theme === 'dark'
                            ? 'border-gelwo-purple bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-purple'
                            : 'border-gelwo-gray dark:border-gelwo-royal bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray hover:border-gelwo-purple/50'
                        }`}
                      >
                        <FiMoon />
                        <span>Dark Mode</span>
                      </button>
                      <button
                        onClick={() => toggleTheme()}
                        className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-sm transition-colors ${
                          theme === 'light'
                            ? 'border-gelwo-purple bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-purple'
                            : 'border-gelwo-gray dark:border-gelwo-royal bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray hover:border-gelwo-purple/50'
                        }`}
                      >
                        <FiSun />
                        <span>Light Mode</span>
                      </button>
                    </div>
                  </div>

                  {/* Language Selector */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-2">System Language</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setLanguage('EN')}
                        className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-sm transition-colors ${
                          language === 'EN'
                            ? 'border-gelwo-sage bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-sage'
                            : 'border-gelwo-gray dark:border-gelwo-royal bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray hover:border-gelwo-sage/50'
                        }`}
                      >
                        <FiGlobe />
                        <span>English (EN)</span>
                      </button>
                      <button
                        onClick={() => setLanguage('SW')}
                        className={`p-3 rounded-xl border flex items-center justify-center space-x-2 text-sm transition-colors ${
                          language === 'SW'
                            ? 'border-gelwo-sage bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-sage'
                            : 'border-gelwo-gray dark:border-gelwo-royal bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray hover:border-gelwo-sage/50'
                        }`}
                      >
                        <FiGlobe />
                        <span>Kiswahili (SW)</span>
                      </button>
                    </div>
                  </div>

                  {/* Accessibility Options */}
                  <div className="space-y-3 pt-4 border-t border-gelwo-gray dark:border-gelwo-purple/20">
                    <h4 className="text-sm font-semibold text-gelwo-midnight/90 dark:text-gelwo-gray">Accessibility Preferences</h4>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-transparent">
                      <span className="text-sm text-gelwo-midnight/80 dark:text-gelwo-gray">High Contrast Mode</span>
                      <button
                        onClick={() => updateAccessibility('highContrast')}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          accessibility.highContrast ? 'bg-gelwo-purple' : 'bg-gelwo-gray dark:bg-gelwo-midnight'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${accessibility.highContrast ? 'translate-x-6' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-transparent">
                      <span className="text-sm text-gelwo-midnight/80 dark:text-gelwo-gray">Large Text Scaling</span>
                      <button
                        onClick={() => updateAccessibility('textScale')}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          accessibility.textScale ? 'bg-gelwo-purple' : 'bg-gelwo-gray dark:bg-gelwo-midnight'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${accessibility.textScale ? 'translate-x-6' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-transparent">
                      <span className="text-sm text-gelwo-midnight/80 dark:text-gelwo-gray">Reduce Motion & Animations</span>
                      <button
                        onClick={() => updateAccessibility('reduceMotion')}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${
                          accessibility.reduceMotion ? 'bg-gelwo-purple' : 'bg-gelwo-gray dark:bg-gelwo-midnight'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${accessibility.reduceMotion ? 'translate-x-6' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-gelwo-midnight/50 dark:text-gelwo-gray pt-6 font-mono">
                GELWO Core Web Engine v1.0 • Government Compliant
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
