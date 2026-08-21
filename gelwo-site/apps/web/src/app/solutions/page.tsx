'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { FiCpu, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function SolutionsPage() {
  const { triggerQuotationModal } = useApp();

  const solutions = [
    {
      title: 'BUSINESS AUTOMATION',
      desc: 'Replace disconnected processes with one connected system.',
      icon: '⚡',
      details: 'Automate manual paperwork, approvals, inventory sync, and multi-branch operations with automated triggers.',
    },
    {
      title: 'DIGITAL TRANSFORMATION',
      desc: 'Modernize legacy infrastructure into cloud-native digital environments.',
      icon: '🚀',
      details: 'Transition from paper-based or obsolete systems to secure, encrypted Next.js & PostgreSQL web platforms.',
    },
    {
      title: 'CUSTOMER MANAGEMENT (CRM)',
      desc: 'Centralize customer communications, quotes, leads, and support tickets.',
      icon: '👥',
      details: 'Full lead lifecycle tracking, WhatsApp API integrations, automated email quotes, and service SLA tracking.',
    },
    {
      title: 'INVENTORY & SUPPLY CHAIN',
      desc: 'Real-time stock control, multi-warehouse tracking, and automated re-ordering.',
      icon: '📦',
      details: 'Barcode scanning, supplier portal integrations, stock audit trails, and automatic low-stock alerts.',
    },
    {
      title: 'FINANCIAL & INVOICING SYSTEMS',
      desc: 'Automated billing, receipting, tax compliance (ETIMS), and financial reports.',
      icon: '💳',
      details: 'M-Pesa Express API, card gateway integration, instant PDF invoice generation, and revenue analytics.',
    },
    {
      title: 'AI INTEGRATION & AVATARS',
      desc: 'Embed conversational AI assistants and automated quotation engines directly into your platform.',
      icon: '🤖',
      details: 'Custom RAG knowledge bases trained on your corporate documentation for 24/7 customer support.',
    },
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
            <FiCpu className="text-cyan-400" />
            <span>Problem-Solving Architecture</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white mt-6 font-heading tracking-tight uppercase"
          >
            BUSINESS <span className="text-gradient-cyan">SOLUTIONS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            What business problem can GELWO solve for your organization today?
          </motion.p>
        </div>
      </section>

      {/* Solutions Grid matching txt Section 18 */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-cyan-500/30 flex flex-col justify-between hover:border-cyan-400 transition-all shadow-xl group"
            >
              <div>
                <span className="text-4xl mb-4 block">{sol.icon}</span>
                <h3 className="text-2xl font-extrabold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors uppercase">
                  {sol.title}
                </h3>
                <p className="text-cyan-300 font-semibold text-sm mb-3">{sol.desc}</p>
                <p className="text-slate-300 text-xs leading-relaxed mb-6">{sol.details}</p>
              </div>

              <button
                onClick={() => triggerQuotationModal(sol.title)}
                className="w-full py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs uppercase tracking-wider hover:bg-cyan-500 hover:text-black transition-all flex items-center justify-center space-x-2"
              >
                <span>[ EXPLORE SOLUTION ] →</span>
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
