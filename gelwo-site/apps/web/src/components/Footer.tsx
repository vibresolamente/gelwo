'use client';

import React, { useState } from 'react';
import {
  FiMapPin, FiPhoneCall, FiMail, FiSend, FiArrowUp, FiGlobe,
  FiShield, FiCpu, FiMessageSquare
} from 'react-icons/fi';
import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative z-10 bg-[#070B16] text-white border-t border-cyan-500/20 pt-10 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Icons Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0E1528] border border-slate-800 mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-lg">
              <FiShield />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-heading">Secure & Reliable</h5>
              <p className="text-[10px] text-slate-400">Your data is safe with us.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-lg">
              <FiPhoneCall />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-heading">24/7 Support</h5>
              <p className="text-[10px] text-slate-400">We are always here to help.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-lg">
              <FiSend />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-heading">Fast & Efficient</h5>
              <p className="text-[10px] text-slate-400">We deliver results quickly.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center text-lg">
              <FiCpu />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white font-heading">Innovative Solutions</h5>
              <p className="text-[10px] text-slate-400">Technology for a better tomorrow.</p>
            </div>
          </div>
        </div>

        {/* Bottom Dark Stats Band */}
        <div className="p-8 rounded-2xl bg-[#040710] border border-cyan-500/30 mb-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-heading block">500+</span>
            <span className="text-xs text-slate-400 font-medium">Projects Completed</span>
          </div>
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-heading block">200+</span>
            <span className="text-xs text-slate-400 font-medium">Happy Clients</span>
          </div>
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-heading block">50+</span>
            <span className="text-xs text-slate-400 font-medium">Expert Team</span>
          </div>
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-heading block">3+</span>
            <span className="text-xs text-slate-400 font-medium">Countries Served</span>
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-cyan-400 font-heading block">100%</span>
            <span className="text-xs text-slate-400 font-medium">Commitment</span>
          </div>
        </div>
        {/* Top Emergency & Quick Contact Bar */}
        <div className="glass-card p-6 rounded-3xl border border-cyan-500/30 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl">
              <FiPhoneCall />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Emergency Technical Hotline</span>
              <a href="tel:+254797829911" className="block text-lg font-bold font-mono text-cyan-300 hover:underline">
                0797-829-911 / 0112-556-940
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
              <FaWhatsapp />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Instant WhatsApp Support</span>
              <a href="https://wa.me/254797829911" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold text-emerald-400 hover:underline">
                Chat With GELWO Desk
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
              <FiMail />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Official Procurement Email</span>
              <a href="mailto:gelwotech@gmail.com" className="block text-lg font-bold text-slate-200 hover:underline">
                gelwotech@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Google Maps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F4C81] via-[#00F0FF] to-[#7C3AED] p-[2px]">
                <div className="w-full h-full bg-[#0A0F1D] rounded-[14px] flex items-center justify-center font-bold text-white text-lg font-heading">
                  G<span className="text-cyan-400">E</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white font-heading block leading-none">GELWO</span>
                <span className="text-[9px] tracking-[0.25em] text-cyan-400 uppercase font-semibold block">Technologies</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              GELWO Technologies — Reg. No. BN4-9GFKDG7 | Tax PIN: P052125735W | AGPO: NT/PPD/2025/DGY/8251 | IFMIS: 1013123. Transforming businesses, institutions &amp; communities through ICT, solar energy, engineering &amp; supplies across Kenya.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-3 pt-2">
              <a href="#linkedin" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors">
                <FaLinkedin />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors">
                <FaFacebook />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider mb-4 text-cyan-400">
              Divisions & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-cyan-300">ICT & Security Solutions</a></li>
              <li><a href="#services" className="hover:text-cyan-300">Solar Energy & Microgrids</a></li>
              <li><a href="#services" className="hover:text-cyan-300">Electrical Infrastructure</a></li>
              <li><a href="#services" className="hover:text-cyan-300">General Supplies & Logistics</a></li>
              <li><a href="#services" className="hover:text-cyan-300">Branding & Media</a></li>
              <li><a href="#services" className="hover:text-cyan-300">Civil & Structural Works</a></li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider mb-4 text-cyan-400">
              Company & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#about" className="hover:text-cyan-300">About GELWO</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-300">Featured Portfolio</a></li>
              <li><a href="#certifications" className="hover:text-cyan-300">NCA & AGPO Registrations</a></li>
              <li><a href="#quotation" className="hover:text-cyan-300">AI Quotation Center</a></li>
              <li><a href="#careers" className="hover:text-cyan-300">Careers & Tenders</a></li>
              <li><a href="#footer" className="hover:text-cyan-300">Privacy & Terms</a></li>
            </ul>
          </div>

          {/* Google Maps Embed & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider text-cyan-400">
              Headquarters Location
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Lwande Apartment, Door 52<br />
              Old National Housing, Kisumu–Kakamega Highway<br />
              Kakamega County, Kenya<br />
              P.O. Box 1559-50100
            </p>
            {/* Embedded Google Maps View — Kakamega */}
            <div className="w-full h-32 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative">
              <iframe
                title="GELWO Headquarters — Kakamega Kenya"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3989.4679040!2d34.750440!3d0.269019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMTYnMDguNSJOIDM0wrA0NScwMS42IkU!5e0!3m2!1sen!2ske!4v1700000000002!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0, opacity: 0.8 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            {/* Newsletter */}
            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Subscribe for Official Tender Alerts</span>
              {!subscribed ? (
                <form onSubmit={handleNewsletter} className="flex">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-l-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button type="submit" className="bg-cyan-500 text-black px-3.5 rounded-r-xl font-bold hover:bg-cyan-400">
                    <FiSend />
                  </button>
                </form>
              ) : (
                <span className="text-xs text-emerald-400 font-semibold">Subscribed to GELWO Gazette</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Floating Controls */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} GELWO Technologies | Reg. BN4-9GFKDG7 | Incorporated 18 June 2022 | Kakamega, Kenya. All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px]">Crafted with High Precision</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
              title="Back to Top"
            >
              <FiArrowUp className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Quick Launchers */}
      <a
        href="https://wa.me/254797829911"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-[6000] w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-transform glow-green border border-emerald-300/40"
      >
        <FaWhatsapp />
      </a>
    </footer>
  );
};
