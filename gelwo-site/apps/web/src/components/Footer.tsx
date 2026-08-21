'use client';

/**
 * Footer Component — GELWO Poster Color System
 * Palette: Midnight (#131322), Royal Purple (#261E3D), Warm Ivory (#FCF9F5), Sage (#566944)
 */

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FiMapPin, FiPhoneCall, FiMail, FiSend, FiArrowUp, FiGlobe,
  FiShield, FiCpu
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
    <footer id="footer" className="relative z-10 bg-gelwo-midnight text-gelwo-ivory/80 border-t border-gelwo-purple/20 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-gelwo-royal border border-gelwo-purple/30 mb-8 sm:mb-12">
          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-gelwo-midnight text-gelwo-purple border border-gelwo-purple/20 flex items-center justify-center text-lg flex-shrink-0">
              <FiShield />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gelwo-ivory font-heading">Secure &amp; Reliable</h5>
              <p className="text-[10px] text-gelwo-ivory/60">Enterprise grade SLA.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-gelwo-midnight text-gelwo-sage border border-gelwo-sage/20 flex items-center justify-center text-lg flex-shrink-0">
              <FiPhoneCall />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gelwo-ivory font-heading">24/7 Support</h5>
              <p className="text-[10px] text-gelwo-ivory/60">Always here to help.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-gelwo-midnight text-gelwo-purple border border-gelwo-purple/20 flex items-center justify-center text-lg flex-shrink-0">
              <FiSend />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gelwo-ivory font-heading">Fast Execution</h5>
              <p className="text-[10px] text-gelwo-ivory/60">Agile delivery cycles.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-gelwo-midnight text-gelwo-sage border border-gelwo-sage/20 flex items-center justify-center text-lg flex-shrink-0">
              <FiCpu />
            </div>
            <div>
              <h5 className="text-xs font-bold text-gelwo-ivory font-heading">AI Integrated</h5>
              <p className="text-[10px] text-gelwo-ivory/60">Next-gen technology.</p>
            </div>
          </div>
        </div>

        {/* Stats Band */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gelwo-royal border border-gelwo-purple/30 mb-12 sm:mb-16 grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 text-center">
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-gelwo-purple font-heading block">500+</span>
            <span className="text-[10px] sm:text-xs text-gelwo-ivory/60 font-medium">Projects Delivered</span>
          </div>
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-gelwo-sage font-heading block">200+</span>
            <span className="text-[10px] sm:text-xs text-gelwo-ivory/60 font-medium">Enterprise Clients</span>
          </div>
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-gelwo-purple font-heading block">50+</span>
            <span className="text-[10px] sm:text-xs text-gelwo-ivory/60 font-medium">Engineers &amp; Staff</span>
          </div>
          <div>
            <span className="text-2xl sm:text-4xl font-extrabold text-gelwo-sage font-heading block">3+</span>
            <span className="text-[10px] sm:text-xs text-gelwo-ivory/60 font-medium">Regional Hubs</span>
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl sm:text-4xl font-extrabold text-gelwo-purple font-heading block">100%</span>
            <span className="text-[10px] sm:text-xs text-gelwo-ivory/60 font-medium">NCA &amp; AGPO Certified</span>
          </div>
        </div>

        {/* Emergency & Hotline Bar */}
        <div className="p-5 sm:p-6 rounded-3xl border border-gelwo-purple/30 mb-12 sm:mb-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center bg-gelwo-royal">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gelwo-midnight text-gelwo-purple flex items-center justify-center text-xl sm:text-2xl border border-gelwo-purple/30 flex-shrink-0">
              <FiPhoneCall />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gelwo-ivory/60 font-mono block truncate">Technical Support</span>
              <a href="tel:+254797829911" className="block text-sm sm:text-base font-bold font-mono text-gelwo-purple hover:text-gelwo-ivory transition-colors truncate">
                +254 797 829 911
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gelwo-midnight text-gelwo-sage flex items-center justify-center text-xl sm:text-2xl border border-gelwo-sage/30 flex-shrink-0">
              <FaWhatsapp />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gelwo-ivory/60 font-mono block truncate">WhatsApp Desk</span>
              <a href="https://wa.me/254797829911" target="_blank" rel="noopener noreferrer" className="block text-sm sm:text-base font-bold text-gelwo-sage hover:text-gelwo-ivory transition-colors truncate">
                Chat With Engineers
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gelwo-midnight text-gelwo-ivory/80 flex items-center justify-center text-xl sm:text-2xl border border-gelwo-ivory/20 flex-shrink-0">
              <FiMail />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gelwo-ivory/60 font-mono block truncate">Official Inquiries</span>
              <a href="mailto:info@gelwo.co.ke" className="block text-sm sm:text-base font-bold text-gelwo-ivory hover:text-gelwo-purple transition-colors truncate">
                info@gelwo.co.ke
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gelwo-ivory shadow-gelwo-purple">
                <Image
                  src="/logo.png"
                  alt="GELWO"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-gelwo-ivory font-heading block leading-none">GELWO</span>
                <span className="text-[9px] tracking-[0.25em] text-gelwo-purple uppercase font-semibold block mt-0.5">Technologies</span>
              </div>
            </div>

            <p className="text-xs text-gelwo-ivory/60 leading-relaxed max-w-sm pt-2">
              GELWO Technologies — Reg. No. BN4-9GFKDG7 | Tax PIN: P052125735W | AGPO: NT/PPD/2025/DGY/8251 | IFMIS: 1013123. Transforming businesses, institutions &amp; communities through custom software, clean energy, ICT infrastructure &amp; civil engineering across Kenya.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#linkedin" className="w-9 h-9 rounded-xl bg-gelwo-royal border border-gelwo-purple/30 flex items-center justify-center text-gelwo-ivory/60 hover:text-gelwo-purple hover:border-gelwo-purple transition-colors">
                <FaLinkedin />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-xl bg-gelwo-royal border border-gelwo-purple/30 flex items-center justify-center text-gelwo-ivory/60 hover:text-gelwo-purple hover:border-gelwo-purple transition-colors">
                <FaTwitter />
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-xl bg-gelwo-royal border border-gelwo-purple/30 flex items-center justify-center text-gelwo-ivory/60 hover:text-gelwo-purple hover:border-gelwo-purple transition-colors">
                <FaFacebook />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-xl bg-gelwo-royal border border-gelwo-purple/30 flex items-center justify-center text-gelwo-ivory/60 hover:text-gelwo-purple hover:border-gelwo-purple transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gelwo-ivory font-heading uppercase tracking-wider mb-4 border-b border-gelwo-purple/20 pb-2">
              Divisions &amp; Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gelwo-ivory/60">
              <li><a href="/services/software-development" className="hover:text-gelwo-purple transition-colors">Software &amp; Web Apps</a></li>
              <li><a href="/services/business-systems" className="hover:text-gelwo-purple transition-colors">Business Systems &amp; ERP</a></li>
              <li><a href="/services/ai-solutions" className="hover:text-gelwo-purple transition-colors">AI Solutions &amp; Automation</a></li>
              <li><a href="/services/ict-infrastructure" className="hover:text-gelwo-purple transition-colors">ICT &amp; Security Infrastructure</a></li>
              <li><a href="/services/solar-energy" className="hover:text-gelwo-purple transition-colors">Solar Microgrids &amp; Power</a></li>
              <li><a href="/services/civil-construction" className="hover:text-gelwo-purple transition-colors">Civil Construction &amp; Works</a></li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h4 className="text-sm font-bold text-gelwo-ivory font-heading uppercase tracking-wider mb-4 border-b border-gelwo-purple/20 pb-2">
              Company &amp; Compliance
            </h4>
            <ul className="space-y-2.5 text-xs text-gelwo-ivory/60">
              <li><a href="/about" className="hover:text-gelwo-purple transition-colors">About GELWO</a></li>
              <li><a href="/projects" className="hover:text-gelwo-purple transition-colors">Selected Case Studies</a></li>
              <li><a href="/products" className="hover:text-gelwo-purple transition-colors">Product Catalog</a></li>
              <li><a href="/portal" className="hover:text-gelwo-purple transition-colors">Customer Portal</a></li>
              <li><a href="/contact" className="hover:text-gelwo-purple transition-colors">Contact &amp; Support</a></li>
            </ul>
          </div>

          {/* Location & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gelwo-ivory font-heading uppercase tracking-wider border-b border-gelwo-purple/20 pb-2">
              Headquarters
            </h4>
            <p className="text-[11px] text-gelwo-ivory/60 leading-relaxed">
              Nairobi &amp; Nakuru Hubs<br />
              Kenya, East Africa<br />
              P.O. Box 1559-50100
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-[11px] text-gelwo-ivory/60 block mb-2">Subscribe for Official Updates</span>
              {!subscribed ? (
                <form onSubmit={handleNewsletter} className="flex">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-gelwo-royal border border-gelwo-purple/30 rounded-l-xl px-3 py-2 text-xs text-gelwo-ivory focus:outline-none focus:border-gelwo-purple"
                  />
                  <button type="submit" className="bg-gelwo-purple hover:bg-gelwo-sage text-gelwo-ivory transition-colors px-3.5 rounded-r-xl font-bold flex items-center justify-center">
                    <FiSend />
                  </button>
                </form>
              ) : (
                <span className="text-xs text-gelwo-sage font-semibold">Subscribed to GELWO Updates</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-gelwo-purple/20 flex flex-col sm:flex-row justify-between items-center text-xs text-gelwo-ivory/50 space-y-4 sm:space-y-0">
          <div>
            <a
              href="/admin"
              className="hover:text-gelwo-purple transition-colors cursor-default"
              title="GELWO Enterprise"
            >
              © {new Date().getFullYear()}
            </a>{' '}
            GELWO Technologies | Reg. BN4-9GFKDG7 | Incorporated 18 June 2022 | All Rights Reserved.
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[11px]">Designed with GELWO Poster Color System</span>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-gelwo-royal border border-gelwo-purple/30 text-gelwo-purple hover:bg-gelwo-purple hover:text-gelwo-ivory transition-colors"
              title="Back to Top"
            >
              <FiArrowUp className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
