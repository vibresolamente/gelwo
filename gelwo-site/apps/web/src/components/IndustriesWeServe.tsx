'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiHeart, FiBook, FiBriefcase, FiFeather, FiGlobe, FiUsers } from 'react-icons/fi';

export const IndustriesWeServe: React.FC = () => {
  const industries = [
    { title: 'Government', desc: 'National ministries, state departments, county assemblies & judiciary complex infrastructure.', icon: FiHome, color: 'text-cyan-400' },
    { title: 'Hospitals & Health', desc: 'Level 4/5 referral hospitals, specialized medical centers & diagnostic labs.', icon: FiHeart, color: 'text-red-400' },
    { title: 'Schools & Universities', desc: 'Public universities, TVET colleges, secondary academies & smart e-learning halls.', icon: FiBook, color: 'text-yellow-400' },
    { title: 'Commercial Enterprises', desc: 'Financial institutions, corporate headquarters, logistics hubs & retail plazas.', icon: FiBriefcase, color: 'text-purple-400' },
    { title: 'Agriculture & Milling', desc: 'Large scale farming cooperatives, grain silos, poultry units & irrigation boards.', icon: FiFeather, color: 'text-emerald-400' },
    { title: 'NGOs & Aid Bodies', desc: 'International humanitarian bodies, community empowerment trusts & global donors.', icon: FiGlobe, color: 'text-blue-400' },
    { title: 'Communities & SACCOs', desc: 'Local community water schemes, youth SACCOs & rural electrification projects.', icon: FiUsers, color: 'text-amber-400' },
  ];

  return (
    <section id="industries" className="py-24 relative z-10 bg-[#0A0F1D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 font-mono">
            Diverse Sector Impact
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 font-heading">
            Industries We <span className="text-gradient-cyan">Serve</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            GELWO delivers custom engineered solutions tailored to the strict compliance and operational demands of every sector.
          </p>
        </div>

        {/* Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-cyan-500/20 hover:border-cyan-400 hover:scale-105 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-3xl mb-5 border border-slate-800 group-hover:bg-cyan-500 group-hover:text-black transition-colors ${ind.color}`}>
                  <IconComp />
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-2">{ind.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{ind.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
