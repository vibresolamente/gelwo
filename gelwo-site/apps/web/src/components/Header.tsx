'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  FiSearch, FiMic, FiUser, FiShoppingBag, FiSettings,
  FiBell, FiMoon, FiSun, FiGlobe, FiMenu, FiX, FiMail, FiPhoneCall, FiMapPin, FiCpu
} from 'react-icons/fi';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    language,
    setLanguage,
    setIsSearchOpen,
    setIsVoiceSearchOpen,
    setIsLoginOpen,
    setIsCartOpen,
    setIsSettingsOpen,
    unreadCount,
    notifications,
    markNotificationRead,
    inquiryCart,
    triggerQuotationModal,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationsPopover, setShowNotificationsPopover] = useState(false);

  const navLinks = [
    { name: language === 'SW' ? 'Nyumbani' : 'Home', href: '#hero' },
    { name: language === 'SW' ? 'Kuhusu GELWO' : 'About GELWO', href: '#about' },
    { name: language === 'SW' ? 'Huduma' : 'Services', href: '#services' },
    { name: language === 'SW' ? 'Sekta' : 'Industries', href: '#industries' },
    { name: language === 'SW' ? 'Miradi' : 'Portfolio', href: '#portfolio' },
    { name: language === 'SW' ? 'Nukuu ya AI' : 'AI Quotation', href: '#quotation' },
    { name: language === 'SW' ? 'Msaidizi wa AI' : 'AI Assistant', href: '#ai-assistant' },
    { name: language === 'SW' ? 'Wasiliana' : 'Contact', href: '#footer' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[5000] glass-nav transition-all duration-300">
      {/* Top Corporate Status Bar */}
      <div className="bg-[#0A0F1D]/90 border-b border-cyan-500/10 py-1.5 px-4 md:px-8 text-xs flex justify-between items-center text-slate-400">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-cyan-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2" />
            GELWO ERP System Live: All Kenya Hubs Operational
          </span>
          <span className="hidden lg:inline text-slate-500">|</span>
          <span className="hidden lg:flex items-center space-x-1 hover:text-white transition-colors">
            <FiMapPin className="text-cyan-400" />
            <span>Nairobi HQ • Nakuru • Mombasa</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <a href="tel:+254700000000" className="flex items-center space-x-1 hover:text-cyan-400 transition-colors">
            <FiPhoneCall className="text-xs" />
            <span className="font-mono">+254 700 000 000</span>
          </a>
          <a href="mailto:info@gelwo.co.ke" className="hidden sm:flex items-center space-x-1 hover:text-cyan-400 transition-colors">
            <FiMail className="text-xs" />
            <span>info@gelwo.co.ke</span>
          </a>
          <div className="flex items-center space-x-1 border-l border-slate-800 pl-3">
            <button
              onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold"
            >
              <FiGlobe />
              <span>{language}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0F4C81] via-[#00F0FF] to-[#7C3AED] p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0A0F1D] rounded-[14px] flex items-center justify-center font-bold text-white text-xl font-heading">
              G<span className="text-cyan-400">E</span>
            </div>
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white font-heading block leading-none">
              GELWO
            </span>
            <span className="text-[10px] tracking-[0.25em] text-cyan-400 uppercase font-semibold block mt-0.5">
              Technologies
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium text-slate-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-cyan-400 transition-colors relative py-1 hover:border-b-2 border-cyan-400"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Global Website Feature Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Smart Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            title="Smart Search"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <FiSearch className="text-lg" />
          </button>

          {/* Voice Search */}
          <button
            onClick={() => setIsVoiceSearchOpen(true)}
            title="Voice Search"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hidden sm:block"
          >
            <FiMic className="text-lg" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title="Toggle Light / Dark Mode"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            {theme === 'dark' ? <FiSun className="text-lg text-amber-400" /> : <FiMoon className="text-lg text-cyan-400" />}
          </button>

          {/* Live ERP Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
              title="ERP Notifications"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all relative"
            >
              <FiBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            <AnimatePresence>
              {showNotificationsPopover && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-80 bg-[#0A0F1D] border border-cyan-500/30 rounded-2xl p-4 shadow-2xl z-[6000]"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="font-bold text-sm text-cyan-400">ERP System Feed</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">Live</span>
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markNotificationRead(item.id)}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer border transition-colors ${
                          item.read
                            ? 'bg-slate-900/40 border-slate-800/60 text-slate-400'
                            : 'bg-cyan-500/10 border-cyan-500/30 text-white'
                        }`}
                      >
                        <div className="flex justify-between font-semibold text-cyan-300 mb-1">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-slate-400">{item.time}</span>
                        </div>
                        <p>{item.message}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart / Inquiry Drawer */}
          <button
            onClick={() => setIsCartOpen(true)}
            title="Quotation Basket"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all relative"
          >
            <FiShoppingBag className="text-lg" />
            {inquiryCart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-black text-[10px] font-extrabold flex items-center justify-center">
                {inquiryCart.length}
              </span>
            )}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            title="Settings & Accessibility"
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hidden md:block"
          >
            <FiSettings className="text-lg" />
          </button>

          {/* Client Portal Button */}
          <a
            href="/customer-portal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
          >
            <FiUser />
            <span>Customer Portal</span>
          </a>

          {/* Admin ERP Portal Button */}
          <a
            href="/admin-portal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center space-x-1.5 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 font-semibold text-xs hover:border-cyan-500/40 transition-all"
          >
            <span>Admin ERP</span>
          </a>

          {/* Instant Quote Action */}
          <button
            onClick={() => triggerQuotationModal()}
            className="hidden md:flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs hover:scale-105 transition-all shadow-md"
          >
            <FiCpu className="text-sm text-cyan-300" />
            <span>AI Quotation</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-[#0A0F1D] border-b border-cyan-500/20 px-6 py-6 space-y-4"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-slate-200 hover:text-cyan-400 font-medium py-2 border-b border-slate-800/50"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerQuotationModal();
                }}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-center shadow-lg"
              >
                Instant AI Quotation Engine
              </button>
              <a
                href="/customer-portal.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-slate-800 text-cyan-400 border border-cyan-500/30 font-semibold rounded-xl text-center block"
              >
                👤 Client Portal (Register / Sign In)
              </a>
              <a
                href="/admin-portal.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-slate-900 text-slate-200 border border-slate-700 font-semibold rounded-xl text-center block"
              >
                🛠️ Admin ERP Portal
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
