'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion } from 'framer-motion';
import { FiBookOpen } from 'react-icons/fi';

export default function InsightsPage() {
  const articles = [
    {
      title: 'Building Resilient Off-Grid Solar Microgrids in East Africa',
      category: 'Clean Energy',
      date: 'August 2026',
      readTime: '6 min read',
      excerpt: 'How GELWO combines IoT telemetry sensors and hybrid solar inverters to power rural commercial operations.',
    },
    {
      title: 'The AI Presenter & RAG Layer in Modern Enterprise Web Apps',
      category: 'Artificial Intelligence',
      date: 'July 2026',
      readTime: '8 min read',
      excerpt: 'Architecting dynamic conversational lead generation engines using Next.js and vector search databases.',
    },
    {
      title: 'KRA ETIMS & Cloud ERP System Integrations for Multi-Branch Logistics',
      category: 'Software Architecture',
      date: 'June 2026',
      readTime: '5 min read',
      excerpt: 'Ensuring zero-downtime tax compliance and automated invoice synchronization across 47 Kenyan counties.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-cyan-400 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30 mb-4">
          <FiBookOpen />
          <span>Research & Insights</span>
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-heading uppercase">
          GELWO <span className="text-gradient-cyan">INSIGHTS</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4">
          Industry reports, whitepapers, and technical case studies on digital transformation and infrastructure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-left">
          {articles.map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-cyan-400 mb-3">
                  <span>{item.category}</span>
                  <span className="text-slate-500">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-3">{item.title}</h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-6">{item.excerpt}</p>
              </div>
              <button className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-bold font-mono hover:bg-cyan-500 hover:text-black">
                READ ARTICLE →
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
