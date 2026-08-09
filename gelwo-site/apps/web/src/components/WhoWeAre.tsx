'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiAward, FiGlobe, FiClock, FiCheck, FiMapPin, FiCompass } from 'react-icons/fi';

export const WhoWeAre: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values' | 'timeline'>('mission');

  const coreValues = [
    { title: 'Innovation', desc: 'Pioneering cutting-edge ICT, solar microgrids, and AI solutions.' },
    { title: 'Professionalism', desc: 'Uncompromising corporate compliance, technical precision, and ethics.' },
    { title: 'Trust & Reliability', desc: 'Long-term government, institutional, and enterprise partnerships.' },
    { title: 'Compliance', desc: 'Fully compliant with KRA tax standards, AGPO, and NCA regulatory bodies.' },
    { title: 'Quality Assurance', desc: 'High-grade equipment, certified engineers, and guaranteed outcomes.' },
    { title: 'Community Impact', desc: 'Sustainable empowerment, local employment, and social development.' },
  ];

  const timelineEvents = [
    { year: '2018', title: 'Foundation of GELWO', desc: 'Established as a multi-sector technology & general supplies enterprise in Nairobi.' },
    { year: '2020', title: 'NCA & AGPO Certification', desc: 'Accredited by National Construction Authority and AGPO for government tenders.' },
    { year: '2022', title: 'Solar Energy & ICT Expansion', desc: 'Commissioned large-scale solar microgrids & enterprise data infrastructure across 15 counties.' },
    { year: '2024', title: 'Integrated Supply & Cleaning Division', desc: 'Expanded into institutional supplies, cereals, poultry infrastructure, and commercial cleaning.' },
    { year: '2026', title: 'AI & Digital ERP Headquarters', desc: 'Launched GELWO AI Quotation Engine and live digital corporate platform.' },
  ];

  return (
    <section id="about" className="py-24 relative z-10 bg-[#0A0F1D] overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 font-mono">
            Digital Headquarters • GELWO Corporate Profile
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 font-heading">
            Who We <span className="text-gradient-cyan">Are</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            GELWO Technologies is an East African multi-sector powerhouse delivering world-class ICT solutions, clean renewable energy, civil infrastructure, institutional supplies, and strategic consultancy.
          </p>
        </div>

        {/* Interactive Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'mission'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-300 hover:text-white'
            }`}
          >
            <FiTarget />
            <span>Our Mission</span>
          </button>

          <button
            onClick={() => setActiveTab('vision')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'vision'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-300 hover:text-white'
            }`}
          >
            <FiEye />
            <span>Our Vision</span>
          </button>

          <button
            onClick={() => setActiveTab('values')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'values'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-300 hover:text-white'
            }`}
          >
            <FiAward />
            <span>Core Values</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center space-x-2 ${
              activeTab === 'timeline'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'glass-card text-slate-300 hover:text-white'
            }`}
          >
            <FiClock />
            <span>Growth Timeline</span>
          </button>
        </div>

        {/* Tab Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Interactive Display Box */}
          <div className="lg:col-span-7">
            {activeTab === 'mission' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-3xl h-full flex flex-col justify-between border border-cyan-500/30"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-3xl mb-6">
                    <FiTarget />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading mb-4">Our Corporate Mission</h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    To empower institutions, businesses, and communities across Africa by delivering innovative, reliable, and high-performance technology, solar energy microgrids, structural engineering, and essential supplies executed with absolute integrity and excellence.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                  <div className="p-3 bg-slate-900/60 rounded-xl">
                    <span className="block text-cyan-400 font-bold text-xl">100%</span>
                    <span className="text-xs text-slate-400">Institutional Reliability</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl">
                    <span className="block text-purple-400 font-bold text-xl">ISO Standard</span>
                    <span className="text-xs text-slate-400">Quality Framework</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'vision' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-3xl h-full flex flex-col justify-between border border-cyan-500/30"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-3xl mb-6">
                    <FiEye />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading mb-4">Our Vision for Africa</h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    To be Africa’s most trusted multi-sector partner, pioneering digital transformation, clean energy accessibility, and sustainable socio-economic development through intelligent engineering and world-class enterprise service delivery.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
                  <div className="p-3 bg-slate-900/60 rounded-xl">
                    <span className="block text-cyan-400 font-bold text-xl">47 Counties</span>
                    <span className="text-xs text-slate-400">Full Kenyan Coverage</span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl">
                    <span className="block text-emerald-400 font-bold text-xl">Net Zero</span>
                    <span className="text-xs text-slate-400">Clean Energy Goal</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'values' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-3xl h-full border border-cyan-500/30"
              >
                <h3 className="text-2xl font-bold text-white font-heading mb-6 flex items-center">
                  <FiAward className="text-cyan-400 mr-3" />
                  GELWO Core Values
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coreValues.map((v, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <h4 className="font-bold text-cyan-300 text-sm mb-1">{v.title}</h4>
                      <p className="text-xs text-slate-400 leading-normal">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-8 rounded-3xl h-full border border-cyan-500/30 overflow-y-auto max-h-[480px]"
              >
                <h3 className="text-2xl font-bold text-white font-heading mb-6 flex items-center">
                  <FiClock className="text-cyan-400 mr-3" />
                  GELWO Historical Milestones
                </h3>
                <div className="relative border-l-2 border-cyan-500/30 ml-4 space-y-6">
                  {timelineEvents.map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#0A0F1D]" />
                      <span className="text-xs font-bold text-cyan-400 font-mono">{item.year}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          {/* Live Google Maps — GELWO HQ Kakamega */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 rounded-3xl h-full border border-cyan-500/30 flex flex-col relative overflow-hidden">
              <div className="relative z-10 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider flex items-center">
                    <FiCompass className="mr-2" />
                    Geographic Reach
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    ● Live Location
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-heading mb-1">
                  GELWO HQ — Kakamega, Kenya
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lwande Apartment, Door 52 · Old National Housing · Along Kisumu–Kakamega Highway · Kakamega County. Serving Western Kenya and beyond.
                </p>
              </div>

              {/* Live Google Maps Embed */}
              <div className="flex-1 rounded-2xl overflow-hidden border border-cyan-500/20 min-h-[260px]">
                <iframe
                  title="GELWO Technologies HQ – Kakamega Kenya"
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3989.4679040!2d34.750440!3d0.269019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwMTYnMDguNSJOIDM0wrA0NScwMS42IkU!5e0!3m2!1sen!2ske!4v1700000000002!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '260px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Operational reach stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                  <span className="text-lg font-extrabold text-cyan-400 block">47</span>
                  <span className="text-[10px] text-slate-400">Counties Reached</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                  <span className="text-lg font-extrabold text-emerald-400 block">3+</span>
                  <span className="text-[10px] text-slate-400">Countries</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-center">
                  <span className="text-lg font-extrabold text-purple-400 block">W.Kenya</span>
                  <span className="text-[10px] text-slate-400">Primary Region</span>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between items-center">
                <span className="flex items-center gap-1"><FiMapPin className="text-cyan-400" /> Reg. BN4-9GFKDG7 · Est. June 2022</span>
                <span className="font-bold text-emerald-400">AGPO Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
