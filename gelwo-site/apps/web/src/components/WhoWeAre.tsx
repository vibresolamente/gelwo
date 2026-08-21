'use client';

/**
 * WhoWeAre Component — GELWO Poster Color System
 * Warm Ivory (#FCF9F5), Deep Purple (#4A346A), Sage (#566944), Midnight (#131322)
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiAward, FiGlobe, FiClock, FiCheck, FiMapPin, FiCompass } from 'react-icons/fi';

export const WhoWeAre: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values' | 'timeline'>('mission');

  const coreValues = [
    { title: 'Innovation', desc: 'Pioneering custom software, solar microgrids, and AI solutions.' },
    { title: 'Professionalism', desc: 'Uncompromising corporate compliance, technical precision, and ethics.' },
    { title: 'Trust & Reliability', desc: 'Long-term government, institutional, and enterprise partnerships.' },
    { title: 'Compliance', desc: 'Fully compliant with KRA tax standards, AGPO, and NCA regulatory bodies.' },
    { title: 'Quality Assurance', desc: 'High-grade equipment, certified engineers, and guaranteed outcomes.' },
    { title: 'Community Impact', desc: 'Sustainable empowerment, local employment, and social development.' },
  ];

  const timelineEvents = [
    { year: '2022', title: 'Foundation of GELWO', desc: 'Incorporated June 18, 2022 as a multi-sector technology enterprise in Kenya.' },
    { year: '2023', title: 'NCA & AGPO Certification', desc: 'Accredited by National Construction Authority and AGPO for government tenders.' },
    { year: '2024', title: 'Solar Energy & ICT Expansion', desc: 'Commissioned large-scale solar microgrids & enterprise data infrastructure across Kenya.' },
    { year: '2025', title: 'Enterprise ERP Division', desc: 'Expanded into full-stack custom software development and multi-branch business systems.' },
    { year: '2026', title: 'AI Presenter Platform', desc: 'Launched GELWO AI Assistant & instant AI Quotation Engine.' },
  ];

  const tabClass = (tab: string) =>
    `px-6 py-2.5 rounded-xl text-xs font-bold font-heading uppercase transition-all ${
      activeTab === tab
        ? 'bg-gelwo-purple text-gelwo-ivory shadow-gelwo-purple'
        : 'text-gelwo-midnight dark:text-gelwo-gray hover:text-gelwo-purple'
    }`;

  return (
    <section id="about" className="py-24 relative z-10 bg-gelwo-ivory dark:bg-gelwo-midnight overflow-hidden">
      {/* Background Purple Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gelwo-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gelwo-purple font-mono">
            WHO WE ARE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory mt-3 font-heading uppercase">
            We build digital solutions for <span className="text-gradient-champagne">ambitious organizations.</span>
          </h2>
          <p className="text-gelwo-midnight/70 dark:text-gelwo-gray mt-4 text-sm sm:text-base font-medium leading-relaxed">
            GELWO Technologies is an East African multi-sector corporate leader delivering custom software systems, clean renewable energy, ICT security infrastructure, and civil engineering.
          </p>

          {/* 01-04 Stat Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
              <span className="text-2xl font-black text-gelwo-purple font-mono block">01</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gelwo-midnight dark:text-gelwo-ivory mt-1 block">Technology</span>
            </div>
            <div className="p-4 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
              <span className="text-2xl font-black text-gelwo-sage font-mono block">02</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gelwo-midnight dark:text-gelwo-ivory mt-1 block">Innovation</span>
            </div>
            <div className="p-4 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
              <span className="text-2xl font-black text-gelwo-purple font-mono block">03</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gelwo-midnight dark:text-gelwo-ivory mt-1 block">Enterprise</span>
            </div>
            <div className="p-4 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
              <span className="text-2xl font-black text-gelwo-sage font-mono block">04</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gelwo-midnight dark:text-gelwo-ivory mt-1 block">Engineering</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20">
            <button onClick={() => setActiveTab('mission')} className={tabClass('mission')}>Mission</button>
            <button onClick={() => setActiveTab('vision')} className={tabClass('vision')}>Vision</button>
            <button onClick={() => setActiveTab('values')} className={tabClass('values')}>Core Values</button>
            <button onClick={() => setActiveTab('timeline')} className={tabClass('timeline')}>Milestones</button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'mission' && (
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-gelwo-purple/25 text-center space-y-4">
              <FiTarget className="text-4xl text-gelwo-purple mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading uppercase">Our Mission</h3>
              <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-base leading-relaxed">
                To empower African businesses, government bodies, and institutions through institutional-grade software systems, reliable clean energy microgrids, and resilient ICT infrastructure engineered around local operational realities.
              </p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-gelwo-sage/25 text-center space-y-4">
              <FiEye className="text-4xl text-gelwo-sage mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading uppercase">Our Vision</h3>
              <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-base leading-relaxed">
                To be East Africa's most trusted technology and engineering conglomerate — recognized for technical excellence, seamless AI integration, and transformative infrastructure development.
              </p>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {coreValues.map((v, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20">
                  <h4 className="text-sm font-bold text-gelwo-purple font-heading mb-2">{v.title}</h4>
                  <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {timelineEvents.map((t, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20 flex items-start gap-4">
                  <span className="px-3 py-1 rounded-xl bg-gelwo-blush dark:bg-gelwo-midnight text-gelwo-purple font-mono font-bold text-sm border border-gelwo-purple/30">
                    {t.year}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading">{t.title}</h4>
                    <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray mt-1">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
