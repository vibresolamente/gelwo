'use client';

/**
 * ServicesSection Component — GELWO Poster Color System
 * Warm Ivory + Blush backgrounds, Purple primary accent, Sage secondary accent
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  FiShield, FiSun, FiZap, FiPackage, FiPrinter, FiCpu,
  FiHardDrive, FiCheckCircle, FiHelpCircle, FiBookOpen,
  FiTruck, FiArrowRight, FiX
} from 'react-icons/fi';

export const coreServices = [
  {
    id: 'software-development',
    title: 'Software Development & Systems',
    desc: 'Custom web apps, mobile applications, and enterprise microservices built for scale.',
    icon: FiCpu,
    iconColor: 'text-gelwo-purple',
    iconBorder: 'border-gelwo-purple/30',
  },
  {
    id: 'business-systems',
    title: 'Business Systems & ERP',
    desc: 'Integrated inventory, HR, procurement, finance & POS multi-branch dashboards.',
    icon: FiZap,
    iconColor: 'text-gelwo-sage',
    iconBorder: 'border-gelwo-sage/30',
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions & Automation',
    desc: 'AI chatbots, RAG knowledge bases, process automation & quotation assistants.',
    icon: FiCpu,
    iconColor: 'text-gelwo-purple',
    iconBorder: 'border-gelwo-purple/30',
  },
  {
    id: 'ict-infrastructure',
    title: 'ICT & Security Infrastructure',
    desc: '4K CCTV surveillance, biometric access turnstiles, fiber optic backbones & servers.',
    icon: FiShield,
    iconColor: 'text-gelwo-sage',
    iconBorder: 'border-gelwo-sage/30',
  },
];

export const comprehensiveServices = [
  {
    id: 'software-dev-full',
    title: 'Software Development & Systems',
    category: 'Technology',
    desc: 'Full-stack custom software solutions designed around your exact workflow logic.',
    deliverables: ['Custom Web Portals', 'Mobile Apps (iOS & Android)', 'API Architecture', 'Database Optimization'],
    tech: ['React', 'Next.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'erp-full',
    title: 'Business Systems & ERP',
    category: 'Enterprise',
    desc: 'Connected ERP platforms eliminating data silos across your multi-branch operations.',
    deliverables: ['Stock Telemetry', 'M-Pesa API Billing', 'HR & Payroll Portals', 'Financial Auditing'],
    tech: ['NestJS', 'PostgreSQL', 'Redis', 'Tailwind'],
  },
  {
    id: 'ai-full',
    title: 'AI Solutions & Automation',
    category: 'AI Layer',
    desc: 'Custom AI avatars, instant RAG document analysis, and automated customer service.',
    deliverables: ['Automated Quote Engine', 'Knowledge Base Training', 'Customer Support AI', 'Predictive Analytics'],
    tech: ['Python', 'Custom LLM', 'Vector DB', 'Next.js'],
  },
  {
    id: 'solar-full',
    title: 'Solar Microgrids & Clean Energy',
    category: 'Clean Energy',
    desc: 'Commercial rooftop solar microgrids with lithium battery backup and SCADA telemetry.',
    deliverables: ['10kW-1MW Solar Arrays', 'Lithium BESS Banks', 'SCADA Cloud Dashboards', 'Grid Failover'],
    tech: ['Monocrystalline', 'Lithium LiFePO4', 'SCADA'],
  },
  {
    id: 'ict-full',
    title: 'ICT & Security Infrastructure',
    category: 'Infrastructure',
    desc: 'Enterprise security grids with 4K camera networks and biometric access controls.',
    deliverables: ['4K CCTV Networks', 'Biometric Turnstiles', 'Fiber Structured Cabling', 'Server Racks'],
    tech: ['Hikvision 4K', 'ZKTeco', 'Fiber Optic'],
  },
  {
    id: 'civil-full',
    title: 'Civil Construction & Engineering',
    category: 'NCA Accredited',
    desc: 'Institutional-grade structural construction, site planning, and commercial remodeling.',
    deliverables: ['Structural Works', 'Site Surveying', 'Remodeling', 'BOQ Costing'],
    tech: ['NCA Accredited', 'Structural Eng.'],
  },
];

export const ServicesSection: React.FC = () => {
  const { triggerQuotationModal, addToCart } = useApp();
  const [selectedService, setSelectedService] = useState<typeof comprehensiveServices[0] | null>(null);

  return (
    <section id="services" className="py-24 bg-gelwo-blush/50 dark:bg-gelwo-midnight relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gelwo-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-gelwo-ivory dark:bg-gelwo-royal border border-gelwo-purple/30 text-gelwo-purple text-xs font-mono font-bold uppercase tracking-widest inline-block">
            GELWO SERVICE DIVISIONS
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory font-heading uppercase leading-tight">
            WHAT WE <span className="text-gradient-champagne">DO.</span>
          </h2>
          <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-base sm:text-lg leading-relaxed">
            Multi-sector engineering, software architecture, and infrastructure solutions built for institutional quality and operation clarity.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {coreServices.map((svc) => {
            const IconComp = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => {
                  const match = comprehensiveServices.find((s) => s.title.includes(svc.title.split(' ')[0]));
                  if (match) setSelectedService(match);
                }}
                className="glass-card p-8 rounded-3xl cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gelwo-blush dark:bg-gelwo-midnight ${svc.iconColor} flex items-center justify-center text-xl mb-6 border ${svc.iconBorder}`}>
                    <IconComp />
                  </div>
                  <h3 className="text-xl font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-2 group-hover:text-gelwo-purple transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-gelwo-purple group-hover:translate-x-1 transition-transform font-heading">
                  <span>Explore Division</span>
                  <FiArrowRight />
                </div>
              </div>
            );
          })}
        </div>

        {/* Comprehensive Division Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comprehensiveServices.map((service) => (
            <div
              key={service.id}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gelwo-purple bg-gelwo-blush dark:bg-gelwo-midnight px-3 py-1 rounded-full border border-gelwo-purple/30">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-2 group-hover:text-gelwo-purple transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed mb-6">
                  {service.desc}
                </p>

                {/* Deliverables preview */}
                <ul className="space-y-2 mb-6 border-t border-gelwo-gray dark:border-gelwo-royal pt-4">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs text-gelwo-midnight/80 dark:text-gelwo-gray">
                      <span className="w-1.5 h-1.5 rounded-full bg-gelwo-purple" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setSelectedService(service)}
                  className="flex-1 py-2.5 rounded-xl btn-secondary text-xs"
                >
                  View Details
                </button>
                <button
                  onClick={() => triggerQuotationModal(service.title)}
                  className="flex-1 py-2.5 rounded-xl btn-primary text-xs"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail View */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-gelwo-midnight/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gelwo-ivory dark:bg-gelwo-royal border border-gelwo-purple/30 rounded-3xl p-8 max-w-2xl w-full text-left space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple rounded-xl bg-gelwo-blush dark:bg-gelwo-midnight"
              >
                <FiX className="text-xl" />
              </button>

              <span className="text-xs font-mono font-bold text-gelwo-purple uppercase tracking-widest block">
                {selectedService.category} DIVISION
              </span>

              <h3 className="text-3xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory font-heading uppercase">
                {selectedService.title}
              </h3>

              <p className="text-sm text-gelwo-midnight/70 dark:text-gelwo-gray leading-relaxed">
                {selectedService.desc}
              </p>

              <div>
                <h4 className="text-xs font-bold text-gelwo-purple uppercase tracking-wider mb-3 font-heading">
                  Key Scope &amp; Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-gelwo-blush dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-royal text-xs text-gelwo-midnight/80 dark:text-gelwo-gray">
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gelwo-sage uppercase tracking-wider mb-3 font-heading">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.tech.map((t, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-gelwo-blush dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-royal text-xs font-mono text-gelwo-sage">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    triggerQuotationModal(title);
                  }}
                  className="w-full py-4 btn-primary rounded-xl text-xs uppercase"
                >
                  [ REQUEST INSTANT QUOTATION ]
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
