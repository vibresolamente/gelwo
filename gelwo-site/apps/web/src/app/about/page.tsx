'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion } from 'framer-motion';
import { FiChevronDown, FiShield, FiGlobe } from 'react-icons/fi';

export default function AboutPage() {
  const [expandedValue, setExpandedValue] = useState<number | null>(0);

  const values = [
    {
      id: '01',
      title: 'INNOVATION',
      summary: 'Pioneering cutting-edge technology, artificial intelligence, and clean energy systems.',
      detail: 'We constantly challenge traditional business bottlenecks by building AI-integrated workflows, cloud-native ERPs, and solar microgrid infrastructure engineered for scalability and endurance.',
    },
    {
      id: '02',
      title: 'INTEGRITY',
      summary: 'Uncompromising corporate governance, transparent pricing, and regulatory compliance.',
      detail: 'Every tender, contract, and client deployment is governed by strict ISO-standard audit trails, KRA tax compliance, and AGPO accredited procurement frameworks.',
    },
    {
      id: '03',
      title: 'EXCELLENCE',
      summary: 'World-class craftsmanship across digital software engineering and physical infrastructure.',
      detail: 'From multi-node data center installations to clean-code web architectures, we accept nothing less than zero-downtime, high-performance execution.',
    },
    {
      id: '04',
      title: 'COURAGE',
      summary: 'Tackling complex multi-sector challenges across remote and demanding East African regions.',
      detail: 'Whether deploying off-grid solar microgrids in arid northern counties or engineering multi-county ICT networks, we step forward where others hesitate.',
    },
    {
      id: '05',
      title: 'IMPACT',
      summary: 'Creating sustainable economic growth, local empowerment, and institutional progress.',
      detail: 'Our solutions generate measurable socio-economic dividends, job creation, and digital empowerment for thousands of citizens across East Africa.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-20 relative overflow-hidden bg-gradient-to-b from-[#070B19] via-[#0A0F1D] to-[#0A0F1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30"
          >
            <FiShield className="text-cyan-400" />
            <span>Corporate Identity & Philosophy</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white mt-6 font-heading tracking-tight"
          >
            ABOUT <span className="text-gradient-cyan">GELWO</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            We build digital and physical solutions designed around the way ambitious organizations actually work.
          </motion.p>
        </div>
      </section>

      {/* Structured Sections matching txt Section 23 */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Our Story */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-cyan-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">01 • OUR STORY</span>
            <h2 className="text-3xl font-extrabold text-white font-heading">From Vision to Multi-Sector Powerhouse</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              GELWO Technologies was founded with a singular objective: to bridge the gap between technological innovation and practical enterprise execution. Over the years, GELWO has evolved from a specialized engineering firm into an East African multi-sector corporate leader managing ICT installations, solar microgrids, civil projects, and enterprise ERP systems.
            </p>
          </div>
          <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3 text-cyan-400">
              <FiGlobe className="text-2xl" />
              <span className="font-bold text-white text-lg">East African Reach</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Operating across Nairobi HQ, Kakamega, Nakuru, and Mombasa hubs, providing end-to-end service delivery for institutional and enterprise clients.
            </p>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-3xl border border-cyan-500/20">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">02 • OUR MISSION</span>
            <h3 className="text-2xl font-bold text-white font-heading mt-2 mb-4">Empowering Institutional Progress</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To empower institutions and commercial enterprises by engineering resilient software platforms, clean solar microgrids, and reliable physical supply chains executed with absolute precision and integrity.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-cyan-500/20">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-widest">03 • OUR VISION</span>
            <h3 className="text-2xl font-bold text-white font-heading mt-2 mb-4">Africa’s Premier Digital Partner</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To be Africa’s most trusted technology ecosystem, defining standards in AI integration, clean energy infrastructure, and digital business automation.
            </p>
          </div>
        </div>

        {/* Our Values (Section 24 in txt) */}
        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">04 • OUR VALUES</span>
            <h2 className="text-3xl font-extrabold text-white font-heading mt-2">The Principles That Drive GELWO</h2>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {values.map((v, index) => (
              <div
                key={v.id}
                onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                className="glass-card rounded-2xl p-6 border border-cyan-500/30 cursor-pointer transition-all hover:border-cyan-400"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-black text-cyan-400 font-mono">{v.id}</span>
                    <h3 className="text-xl font-bold text-white font-heading tracking-wide">{v.title}</h3>
                  </div>
                  <FiChevronDown
                    className={`text-cyan-400 text-xl transition-transform ${expandedValue === index ? 'rotate-180' : ''}`}
                  />
                </div>
                <p className="text-slate-300 text-sm mt-2 font-medium">{v.summary}</p>
                {expandedValue === index && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                    {v.detail}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach, Technology, People & Future */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl text-cyan-400 mb-2 block font-mono">05</span>
            <h4 className="font-bold text-white text-base font-heading mb-2">Our Approach</h4>
            <p className="text-xs text-slate-400">Human-centered engineering combined with agile, data-driven execution.</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl text-purple-400 mb-2 block font-mono">06</span>
            <h4 className="font-bold text-white text-base font-heading mb-2">Our Technology</h4>
            <p className="text-xs text-slate-400">Modern Next.js stack, AI engine, NestJS microservices & high-efficiency hardware.</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl text-blue-400 mb-2 block font-mono">07</span>
            <h4 className="font-bold text-white text-base font-heading mb-2">Our People</h4>
            <p className="text-xs text-slate-400">Certified engineers, software architects, energy consultants & project directors.</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
            <span className="text-3xl text-emerald-400 mb-2 block font-mono">08</span>
            <h4 className="font-bold text-white text-base font-heading mb-2">Our Future</h4>
            <p className="text-xs text-slate-400">Expanding AI automation and renewable microgrids across Africa.</p>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
