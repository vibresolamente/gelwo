'use client';

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
    id: 'cctv-security',
    title: 'CCTV & Security Systems',
    desc: 'Advanced surveillance and security solutions for your safety.',
    icon: FiShield,
    iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 'solar-energy',
    title: 'Solar Energy Solutions',
    desc: 'Reliable solar systems for homes, businesses & institutions.',
    icon: FiSun,
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 'electrical',
    title: 'Electrical Installations',
    desc: 'Professional electrical services & maintenance.',
    icon: FiZap,
    iconBg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  {
    id: 'supplies',
    title: 'General Supplies',
    desc: 'Quality products and equipment for all sectors.',
    icon: FiPackage,
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
];

export const quickCategories = [
  { label: 'Branding & Printing', icon: FiPrinter },
  { label: 'ICT Solutions', icon: FiCpu },
  { label: 'Construction', icon: FiHardDrive },
  { label: 'Cleaning Services', icon: FiCheckCircle },
  { label: 'Consultancy', icon: FiHelpCircle },
  { label: 'Training', icon: FiBookOpen },
  { label: 'Agriculture', icon: FiSun },
  { label: 'Drone Services', icon: FiCpu },
  { label: 'Facility Mgmt.', icon: FiTruck },
  { label: 'And More...', icon: FiArrowRight },
];

export const comprehensiveServices = [
  {
    id: 'cctv-full',
    title: 'CCTV & Security Systems',
    category: 'ICT & Security',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80',
    desc: 'HD IP Cameras, Biometric Access, Perimeter Fencing & Central Control Room setup.',
  },
  {
    id: 'solar-full',
    title: 'Solar Energy Solutions',
    category: 'Energy',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&q=80',
    desc: 'Photovoltaic arrays, Hybrid Lithium storage, Solar borehole water pumps.',
  },
  {
    id: 'elec-full',
    title: 'Electrical Installations',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    desc: 'High voltage grid connections, switchgear panels, backup generator ATS systems.',
  },
  {
    id: 'ict-full',
    title: 'ICT Solutions',
    category: 'ICT & Security',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    desc: 'Structured fiber cabling, server infrastructure, cloud & network security.',
  },
  {
    id: 'branding-full',
    title: 'Branding & Printing',
    category: 'Supplies',
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&q=80',
    desc: '3D illuminated signage, vehicle wraps, corporate collateral & apparel.',
  },
  {
    id: 'const-full',
    title: 'Construction Services',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=600&q=80',
    desc: 'NCA registered building, roofing, civil engineering & stormwater drainage.',
  },
  {
    id: 'clean-full',
    title: 'Cleaning Services',
    category: 'Supplies',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
    desc: 'Post-construction deep clean, high-rise window facade, hospital fumigation.',
  },
  {
    id: 'drone-full',
    title: 'Drone Services',
    category: 'ICT & Security',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&q=80',
    desc: 'Aerial land mapping, thermal security inspection & agricultural spraying.',
  },
];

export const ServicesSection: React.FC = () => {
  const { triggerQuotationModal } = useApp();
  const [activeTab, setActiveTab] = useState('All Services');
  const [selectedServiceModal, setSelectedServiceModal] = useState<any>(null);

  const filterTabs = ['All Services', 'ICT & Security', 'Energy', 'Engineering', 'Supplies', 'Consultancy', 'Training'];

  const filteredServices = activeTab === 'All Services'
    ? comprehensiveServices
    : comprehensiveServices.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="py-20 bg-[#070B19] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Core Services Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Our Core Services
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Comprehensive solutions tailored to meet your needs
          </p>
        </div>

        {/* 4 Core Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {coreServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-[#0E1528] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 border ${svc.iconBg}`}>
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading mb-2 group-hover:text-cyan-400 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {svc.desc}
                  </p>
                </div>
                <button
                  onClick={() => triggerQuotationModal(svc.title)}
                  className="text-xs font-bold text-cyan-400 hover:text-white flex items-center space-x-1.5 transition-colors"
                >
                  <span>Learn More</span>
                  <FiArrowRight />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* 10 Quick Service Icon Badges */}
        <div className="p-4 rounded-2xl bg-[#0B1020] border border-slate-800/80 mb-20 overflow-x-auto">
          <div className="flex items-center justify-between min-w-max space-x-4">
            {quickCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => triggerQuotationModal(cat.label)}
                  className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 text-xs font-semibold cursor-pointer transition-all"
                >
                  <Icon className="text-cyan-400 text-sm" />
                  <span>{cat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comprehensive Services Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 pt-8 border-t border-slate-800/60">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            Comprehensive Services
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            End-to-end solutions designed to empower your business and community.
          </p>
        </div>

        {/* Service Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-[#0E1528] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Comprehensive Services Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((svc) => (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden bg-[#0E1528] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                  {svc.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-heading mb-2 group-hover:text-cyan-400 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {svc.desc}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedServiceModal(svc)}
                  className="w-full py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-cyan-400 hover:text-white font-semibold text-xs transition-all"
                >
                  View Details & Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Services CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => triggerQuotationModal()}
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
          >
            Explore All Services →
          </button>
        </div>
      </div>

      {/* Modal for Service Details */}
      <AnimatePresence>
        {selectedServiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedServiceModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0A0F1D] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-white relative"
            >
              <button
                onClick={() => setSelectedServiceModal(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900"
              >
                <FiX className="text-lg" />
              </button>
              <h3 className="text-xl font-bold font-heading text-cyan-400 mb-2">
                {selectedServiceModal.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4">{selectedServiceModal.desc}</p>
              <img
                src={selectedServiceModal.image}
                alt={selectedServiceModal.title}
                className="w-full h-48 object-cover rounded-xl mb-4 border border-slate-800"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const title = selectedServiceModal.title;
                    setSelectedServiceModal(null);
                    triggerQuotationModal(title);
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-500"
                >
                  Request Instant Quote
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

