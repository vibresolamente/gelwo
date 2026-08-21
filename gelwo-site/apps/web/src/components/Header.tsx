'use client';

/**
 * Header Component — GELWO Poster Color System
 * Palette: Warm Ivory (#FCF9F5), Midnight (#131322), Deep Purple (#4A346A), Sage (#566944)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import Image from 'next/image';
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
    { name: language === 'SW' ? 'Kuhusu' : 'About', href: '/about' },
    { name: language === 'SW' ? 'Huduma' : 'Services', href: '/services' },
    { name: language === 'SW' ? 'Bidhaa' : 'Products', href: '/products' },
    { name: language === 'SW' ? 'Suluhisho' : 'Solutions', href: '/solutions' },
    { name: language === 'SW' ? 'Miradi' : 'Projects', href: '/projects' },
    { name: language === 'SW' ? 'Sekta' : 'Industries', href: '/industries' },
    { name: language === 'SW' ? 'Teknolojia' : 'Technology', href: '/technology' },
    { name: language === 'SW' ? 'Wasiliana' : 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[5000] glass-nav transition-all duration-300">
      {/* Top Status Bar */}
      <div className="bg-gelwo-midnight/95 dark:bg-gelwo-midnight/90 border-b border-gelwo-purple/10 py-1.5 px-3 sm:px-6 lg:px-8 text-xs flex justify-between items-center text-gelwo-gray">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-hidden">
          <span className="flex items-center text-gelwo-sage font-mono text-[10px] sm:text-[11px] truncate">
            <span className="w-2 h-2 rounded-full bg-gelwo-sage animate-ping mr-1.5 sm:mr-2 flex-shrink-0" />
            <span className="truncate">GELWO Live: All Hubs Active</span>
          </span>
          <span className="hidden lg:inline text-gelwo-royal">|</span>
          <span className="hidden lg:flex items-center space-x-1 hover:text-gelwo-ivory transition-colors">
            <FiMapPin className="text-gelwo-purple" />
            <span className="text-gelwo-blush">Nairobi HQ • Nakuru • Mombasa</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <a href="tel:+254797829911" className="flex items-center space-x-1 hover:text-gelwo-purple text-gelwo-blush transition-colors text-[10px] sm:text-xs">
            <FiPhoneCall className="text-xs" />
            <span className="font-mono hidden sm:inline">+254 797 829 911</span>
            <span className="font-mono sm:hidden">Call</span>
          </a>
          <a href="mailto:info@gelwo.co.ke" className="hidden md:flex items-center space-x-1 hover:text-gelwo-purple text-gelwo-blush transition-colors text-xs">
            <FiMail className="text-xs" />
            <span>info@gelwo.co.ke</span>
          </a>
          <div className="flex items-center space-x-1 border-l border-gelwo-royal pl-2 sm:pl-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 rounded bg-gelwo-royal hover:bg-gelwo-purple text-gelwo-ivory font-semibold transition-colors text-xs"
              title="Toggle dark mode"
            >
              {theme === 'dark' ? <FiSun className="text-gelwo-sage" /> : <FiMoon />}
            </button>
            <button
              onClick={() => setLanguage(language === 'EN' ? 'SW' : 'EN')}
              className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 rounded bg-gelwo-royal hover:bg-gelwo-purple text-gelwo-ivory font-semibold transition-colors text-xs"
            >
              <FiGlobe />
              <span>{language}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-gelwo-purple group-hover:scale-105 transition-transform flex-shrink-0">
            <Image
              src="/logo.png"
              alt="GELWO Technologies"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-gelwo-midnight dark:text-gelwo-ivory font-heading block leading-none">
              GELWO
            </span>
            <span className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-gelwo-purple uppercase font-semibold block mt-0.5">
              Technologies
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-6 text-sm font-medium text-gelwo-midnight dark:text-gelwo-gray">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-gelwo-purple transition-colors relative py-1 hover:border-b-2 border-gelwo-purple whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          {/* Smart Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            title="Smart Search"
            className="p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/30 text-gelwo-midnight dark:text-gelwo-gray hover:text-gelwo-purple hover:border-gelwo-purple/40 transition-all"
          >
            <FiSearch className="text-lg" />
          </button>

          {/* Voice Search */}
          <button
            onClick={() => setIsVoiceSearchOpen(true)}
            title="Voice Search"
            className="p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/30 text-gelwo-midnight dark:text-gelwo-gray hover:text-gelwo-purple hover:border-gelwo-purple/40 transition-all hidden sm:block"
          >
            <FiMic className="text-lg" />
          </button>

          {/* ERP Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationsPopover(!showNotificationsPopover)}
              title="ERP Notifications"
              className="p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/30 text-gelwo-midnight dark:text-gelwo-gray hover:text-gelwo-purple hover:border-gelwo-purple/40 transition-all relative"
            >
              <FiBell className="text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gelwo-purple text-gelwo-ivory text-[10px] font-bold flex items-center justify-center">
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
                  className="absolute right-0 mt-3 w-80 bg-gelwo-ivory dark:bg-gelwo-royal border border-gelwo-purple/30 rounded-2xl p-4 shadow-gelwo-purple z-[6000]"
                >
                  <div className="flex items-center justify-between border-b border-gelwo-gray dark:border-gelwo-purple/20 pb-2 mb-3">
                    <span className="font-bold text-sm text-gelwo-purple">ERP System Feed</span>
                    <span className="text-[10px] bg-gelwo-sage/20 text-gelwo-sage px-2 py-0.5 rounded font-mono">Live</span>
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => markNotificationRead(item.id)}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer border transition-colors ${
                          item.read
                            ? 'bg-gelwo-blush dark:bg-gelwo-midnight border-gelwo-gray dark:border-gelwo-royal text-gelwo-midnight/60 dark:text-gelwo-gray'
                            : 'bg-gelwo-purple/10 border-gelwo-purple/30 text-gelwo-midnight dark:text-gelwo-ivory'
                        }`}
                      >
                        <div className="flex justify-between font-semibold text-gelwo-purple mb-1">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-gelwo-midnight/40 dark:text-gelwo-gray">{item.time}</span>
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
            className="p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/30 text-gelwo-midnight dark:text-gelwo-gray hover:text-gelwo-purple hover:border-gelwo-purple/40 transition-all relative"
          >
            <FiShoppingBag className="text-lg" />
            {inquiryCart.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gelwo-sage text-gelwo-ivory text-[10px] font-extrabold flex items-center justify-center">
                {inquiryCart.length}
              </span>
            )}
          </button>

          {/* Client Portal Button */}
          <a
            href="/portal"
            className="hidden sm:flex items-center space-x-2 px-4 py-2.5 rounded-xl btn-secondary text-xs"
          >
            <FiUser />
            <span>Customer Portal</span>
          </a>

          {/* Primary CTA — Signature GELWO Gradient */}
          <button
            onClick={() => triggerQuotationModal()}
            className="hidden md:flex items-center space-x-1.5 px-5 py-2.5 rounded-xl btn-primary text-xs"
          >
            <FiCpu className="text-sm" />
            <span>[ START A PROJECT ]</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/30 text-gelwo-midnight dark:text-gelwo-gray hover:text-gelwo-purple"
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
            className="xl:hidden bg-gelwo-ivory dark:bg-gelwo-midnight border-b border-gelwo-purple/20 px-6 py-6 space-y-4"
          >
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gelwo-midnight dark:text-gelwo-gray hover:text-gelwo-purple font-medium py-2 border-b border-gelwo-gray dark:border-gelwo-royal"
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
                className="w-full py-3 btn-primary text-center rounded-xl"
              >
                [ START A PROJECT ]
              </button>
              <a
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 btn-secondary text-center rounded-xl block"
              >
                👤 Customer Portal
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
