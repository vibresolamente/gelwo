'use client';

/**
 * WhyChooseUs Component — GELWO Poster Color System
 * Palette: Warm Ivory (#FCF9F5), Deep Purple (#4A346A), Sage (#566944), Midnight (#131322)
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiShield, FiClock, FiArrowRight } from 'react-icons/fi';
import { useApp } from '@/context/AppContext';

export const WhyChooseUs: React.FC = () => {
  const { triggerQuotationModal } = useApp();

  const points = [
    {
      title: 'Certified Engineering Team',
      desc: 'NCA certified structural engineers, full-stack software architects, and solar SCADA specialists.',
      icon: FiUsers,
    },
    {
      title: 'Uncompromising Quality',
      desc: 'SLA-backed systems, Tier-1 solar equipment, and high-concurrency software architectures.',
      icon: FiCheckCircle,
    },
    {
      title: 'Full Regulatory Compliance',
      desc: 'AGPO certified, KRA tax compliant, and registered with IFMIS for seamless government tenders.',
      icon: FiShield,
    },
    {
      title: 'Timely Execution',
      desc: 'Rigorous project management guaranteeing on-time handover across all 12 regional county hubs.',
      icon: FiClock,
    },
  ];

  return (
    <section className="py-24 relative z-10 bg-gelwo-ivory dark:bg-gelwo-midnight border-t border-gelwo-gray dark:border-gelwo-royal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.3em] font-bold text-gelwo-purple font-mono block mb-2"
            >
              ENGINEERING EXCELLENCE
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory font-heading uppercase"
            >
              Why Partner With <span className="text-gradient-champagne">GELWO</span>?
            </motion.h2>

            <p className="mt-4 text-gelwo-midnight/70 dark:text-gelwo-gray text-sm sm:text-base max-w-xl leading-relaxed">
              We unite software engineering, clean energy, ICT security, and structural construction under one roof — offering institutional clarity and unified SLA support.
            </p>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-6 rounded-2xl border border-gelwo-gray dark:border-gelwo-purple/20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gelwo-blush dark:bg-gelwo-midnight text-gelwo-purple border border-gelwo-purple/20 flex items-center justify-center text-lg mb-4">
                      <Icon />
                    </div>
                    <h4 className="text-sm font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-1">{pt.title}</h4>
                    <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed">{pt.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Highlight Banner */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-gelwo-purple/30 space-y-6"
              style={{ background: 'linear-gradient(to bottom, rgba(237,230,229,0.8), rgba(252,249,245,0.9))' }}
            >
              <span className="px-3 py-1 rounded-full bg-gelwo-purple/10 text-gelwo-purple text-xs font-mono font-bold uppercase">
                INSTITUTIONAL SLA GUARANTEE
              </span>

              <h3 className="text-2xl font-extrabold text-gelwo-midnight font-heading uppercase leading-tight">
                Single Point of Contact for All Engineering &amp; Software Needs
              </h3>

              <p className="text-xs text-gelwo-midnight/70 leading-relaxed">
                Eliminate vendor friction. GELWO handles everything from software architecture to physical CCTV deployment, solar installation, and civil works.
              </p>

              <button
                onClick={() => triggerQuotationModal()}
                className="w-full py-4 btn-primary rounded-xl text-xs uppercase flex items-center justify-center space-x-2"
              >
                <span>[ CONSULT WITH OUR SPECIALISTS ]</span>
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
