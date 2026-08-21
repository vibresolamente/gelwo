'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { IndustriesWeServe } from '@/components/IndustriesWeServe';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { FiGlobe, FiArrowRight } from 'react-icons/fi';

export default function IndustriesPage() {
  const { triggerQuotationModal } = useApp();

  const industries = [
    { name: 'HOSPITALITY', desc: 'Technology for hotels, restaurants, and hospitality businesses.', icon: '🏨' },
    { name: 'HEALTHCARE', desc: 'Patient management portals, medical inventory, and hospital ERPs.', icon: '🏥' },
    { name: 'EDUCATION', desc: 'School management systems, e-learning platforms, and campus wifi.', icon: '🎓' },
    { name: 'AGRICULTURE', desc: 'Commodities tracking, solar irrigation microgrids, and poultry tech.', icon: '🌾' },
    { name: 'RETAIL & E-COMMERCE', desc: 'POS systems, online booking, multi-store stock control.', icon: '🛒' },
    { name: 'LOGISTICS & FLEET', desc: 'GPS tracking, warehouse automation, cargo dispatch platforms.', icon: '🚛' },
    { name: 'FINANCE & BANKING', desc: 'High-security transaction APIs, micro-finance ERPs, audit systems.', icon: '🏦' },
    { name: 'REAL ESTATE', desc: 'Property management portals, tenant billing, utility metering gateways.', icon: '🏢' },
    { name: 'MANUFACTURING', desc: 'Factory floor automation, sensor networks, production tracking.', icon: '🏭' },
    { name: 'GOVERNMENT & COUNTIES', desc: 'NCA certified civil infrastructure, ICT data hubs, public portals.', icon: '🏛️' },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      {/* Hero Header */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-gradient-to-b from-[#070B19] via-[#0A0F1D] to-[#0A0F1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30"
          >
            <FiGlobe className="text-cyan-400" />
            <span>Multi-Sector Domain Expertise</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white mt-6 font-heading tracking-tight uppercase"
          >
            INDUSTRIES <span className="text-gradient-cyan">WE SERVE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Tailored digital platforms and infrastructure engineered for specific industry demands.
          </motion.p>
        </div>
      </section>

      {/* Industry Grid matching txt Section 19 */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-cyan-500/30 flex flex-col justify-between hover:border-cyan-400 transition-all shadow-xl group"
            >
              <div>
                <span className="text-4xl mb-4 block">{ind.icon}</span>
                <h3 className="text-2xl font-extrabold text-white font-heading mb-2 group-hover:text-cyan-300 transition-colors uppercase">
                  {ind.name}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{ind.desc}</p>
              </div>

              <button
                onClick={() => triggerQuotationModal(ind.name)}
                className="w-full py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs uppercase tracking-wider hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center space-x-2"
              >
                <span>[ EXPLORE ] →</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <IndustriesWeServe />

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
