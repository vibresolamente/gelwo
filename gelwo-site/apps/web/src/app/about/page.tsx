'use client';

/**
 * /about — GELWO Corporate Identity & Philosophy
 * Styled with GELWO Poster Color System & fully responsive on all devices.
 */

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion } from 'framer-motion';
import { FiChevronDown, FiShield, FiGlobe, FiTarget, FiEye, FiCpu } from 'react-icons/fi';

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
    <main className="min-h-screen bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-midnight dark:text-gelwo-ivory relative selection:bg-gelwo-purple selection:text-gelwo-ivory transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="pt-36 pb-16 relative overflow-hidden bg-hero-atmosphere">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-gelwo-purple bg-gelwo-blush dark:bg-gelwo-royal px-4 py-1.5 rounded-full border border-gelwo-purple/30 font-bold"
          >
            <FiShield className="text-gelwo-purple" />
            <span>Corporate Identity &amp; Philosophy</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight uppercase mt-6"
          >
            ABOUT <span className="text-gradient-purple dark:text-gradient-light">GELWO</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gelwo-midnight/70 dark:text-gelwo-gray text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            We build digital and physical solutions designed around the way ambitious organizations actually work.
          </motion.p>
        </div>
      </section>

      {/* Structured Sections */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Our Story */}
        <div className="glass-card p-6 sm:p-10 md:p-12 rounded-3xl border border-gelwo-purple/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-mono text-gelwo-purple font-bold uppercase tracking-widest">01 • OUR STORY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">From Vision to Multi-Sector Powerhouse</h2>
            <p className="text-gelwo-midnight/70 dark:text-gelwo-gray leading-relaxed text-sm sm:text-base">
              GELWO Technologies was founded with a singular objective: to bridge the gap between technological innovation and practical enterprise execution. Over the years, GELWO has evolved from a specialized engineering firm into an East African multi-sector corporate leader managing ICT installations, solar microgrids, civil projects, and enterprise ERP systems.
            </p>
          </div>
          <div className="lg:col-span-5 bg-gelwo-blush dark:bg-gelwo-royal p-6 rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20 space-y-3">
            <div className="flex items-center space-x-3 text-gelwo-purple">
              <FiGlobe className="text-2xl" />
              <span className="font-bold text-base sm:text-lg">East African Reach</span>
            </div>
            <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed">
              Operating across Nairobi HQ, Kakamega, Nakuru, and Mombasa hubs, providing end-to-end service delivery for institutional and enterprise clients.
            </p>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/20">
            <span className="text-xs font-mono text-gelwo-purple font-bold uppercase tracking-widest">02 • OUR MISSION</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading mt-2 mb-3">Empowering Institutional Progress</h3>
            <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-xs sm:text-sm leading-relaxed">
              To empower institutions and commercial enterprises by engineering resilient software platforms, clean solar microgrids, and reliable physical supply chains executed with absolute precision and integrity.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-sage/20">
            <span className="text-xs font-mono text-gelwo-sage font-bold uppercase tracking-widest">03 • OUR VISION</span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading mt-2 mb-3">Africa’s Premier Digital Partner</h3>
            <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-xs sm:text-sm leading-relaxed">
              To be Africa’s most trusted technology ecosystem, defining standards in AI integration, clean energy infrastructure, and digital business automation.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-xs font-mono text-gelwo-purple font-bold uppercase tracking-widest">04 • OUR VALUES</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mt-2">The Principles That Drive GELWO</h2>
          </div>

          <div className="space-y-3.5 max-w-4xl mx-auto">
            {values.map((v, index) => (
              <div
                key={v.id}
                onClick={() => setExpandedValue(expandedValue === index ? null : index)}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-gelwo-purple/25 cursor-pointer transition-all hover:border-gelwo-purple"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="text-xl sm:text-2xl font-black text-gelwo-purple font-mono">{v.id}</span>
                    <h3 className="text-base sm:text-xl font-bold font-heading tracking-wide">{v.title}</h3>
                  </div>
                  <FiChevronDown
                    className={`text-gelwo-purple text-lg sm:text-xl transition-transform ${expandedValue === index ? 'rotate-180' : ''}`}
                  />
                </div>
                <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-xs sm:text-sm mt-2 font-medium">{v.summary}</p>
                {expandedValue === index && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3.5 pt-3.5 border-t border-gelwo-gray dark:border-gelwo-royal text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed">
                    {v.detail}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach, Technology, People & Future */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 bg-gelwo-blush dark:bg-gelwo-royal rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
            <span className="text-2xl sm:text-3xl text-gelwo-purple mb-2 block font-mono font-bold">05</span>
            <h4 className="font-bold text-sm sm:text-base font-heading mb-1.5">Our Approach</h4>
            <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray">Human-centered engineering combined with agile, data-driven execution.</p>
          </div>

          <div className="p-6 bg-gelwo-blush dark:bg-gelwo-royal rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
            <span className="text-2xl sm:text-3xl text-gelwo-sage mb-2 block font-mono font-bold">06</span>
            <h4 className="font-bold text-sm sm:text-base font-heading mb-1.5">Our Technology</h4>
            <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray">Modern Next.js stack, AI engine, and high-efficiency hardware.</p>
          </div>

          <div className="p-6 bg-gelwo-blush dark:bg-gelwo-royal rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
            <span className="text-2xl sm:text-3xl text-gelwo-purple mb-2 block font-mono font-bold">07</span>
            <h4 className="font-bold text-sm sm:text-base font-heading mb-1.5">Our People</h4>
            <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray">Certified engineers, software architects, energy specialists &amp; directors.</p>
          </div>

          <div className="p-6 bg-gelwo-blush dark:bg-gelwo-royal rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20 text-center">
            <span className="text-2xl sm:text-3xl text-gelwo-sage mb-2 block font-mono font-bold">08</span>
            <h4 className="font-bold text-sm sm:text-base font-heading mb-1.5">Our Future</h4>
            <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray">Expanding AI automation and renewable microgrids across East Africa.</p>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
