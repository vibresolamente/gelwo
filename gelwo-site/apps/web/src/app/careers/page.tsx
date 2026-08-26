/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */


import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';

export default function CareersPage() {
  const openings = [
    { title: 'Senior Full-Stack Next.js Architect', dept: 'Software Division', loc: 'Nairobi HQ / Hybrid' },
    { title: 'Solar Microgrid Lead Engineer', dept: 'Energy Division', loc: 'Nakuru / Field' },
    { title: 'AI & Data Pipeline Engineer', dept: 'AI & Analytics Layer', loc: 'Remote / Nairobi' },
    { title: 'Government & Enterprise Tender Manager', dept: 'Corporate Affairs', loc: 'Nairobi HQ' },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30 mb-4">
          <FiBriefcase />
          <span>Talent & Careers</span>
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading uppercase">
          JOIN <span className="text-gradient-cyan">GELWO</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4">
          Help build Africa's next generation of digital platforms and clean energy infrastructure.
        </p>

        <div className="max-w-4xl mx-auto mt-14 space-y-4 text-left">
          {openings.map((op, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-cyan-500/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{op.dept} • {op.loc}</span>
                <h3 className="text-xl font-bold text-white font-heading mt-1">{op.title}</h3>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs uppercase rounded-xl hover:scale-105">
                APPLY NOW →
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
