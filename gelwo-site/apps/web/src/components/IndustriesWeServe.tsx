'use client';

/**
 * IndustriesWeServe Component — GELWO Poster Color System
 * Light section: Gradient 03 (Light Premium) background
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiHeart, FiBook, FiBriefcase, FiFeather, FiGlobe, FiUsers } from 'react-icons/fi';

export const IndustriesWeServe: React.FC = () => {
  const industries = [
    { title: 'Government & County', desc: 'National ministries, state departments, county executive offices & judiciary complexes.', icon: FiHome },
    { title: 'Hospitals & Health', desc: 'Referral hospitals, specialized medical centers, diagnostic labs & health logistics.', icon: FiHeart },
    { title: 'Schools & Universities', desc: 'Public universities, TVET colleges, academies & smart interactive e-learning halls.', icon: FiBook },
    { title: 'Commercial Enterprises', desc: 'Multi-branch retail corporations, financial institutions, hotels & commercial plazas.', icon: FiBriefcase },
    { title: 'Agriculture & Milling', desc: 'Large scale farming cooperatives, grain silos, poultry units & irrigation boards.', icon: FiFeather },
    { title: 'NGOs & Aid Bodies', desc: 'International humanitarian bodies, community empowerment trusts & global development projects.', icon: FiGlobe },
    { title: 'Communities & SACCOs', desc: 'Local community water schemes, youth SACCOs & rural electrification projects.', icon: FiUsers },
  ];

  return (
    <section id="industries" className="py-24 relative z-10 bg-gelwo-ivory dark:bg-gelwo-midnight border-t border-gelwo-gray dark:border-gelwo-royal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gelwo-sage font-mono">
            SECTOR-SPECIFIC ENGINEERING
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory mt-3 font-heading uppercase">
            INDUSTRIES WE <span className="text-gradient-champagne">SERVE.</span>
          </h2>
          <p className="text-gelwo-midnight/70 dark:text-gelwo-gray mt-4 text-sm sm:text-base leading-relaxed">
            GELWO delivers custom engineered solutions tailored to the strict compliance and operational demands of every sector.
          </p>
        </div>

        {/* Sector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const IconComp = ind.icon;
            const isGreen = idx % 2 === 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card p-6 rounded-3xl border border-gelwo-gray dark:border-gelwo-purple/20 hover:border-gelwo-purple/40 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gelwo-blush dark:bg-gelwo-midnight ${isGreen ? 'text-gelwo-sage border-gelwo-sage/20' : 'text-gelwo-purple border-gelwo-purple/20'} border flex items-center justify-center text-2xl mb-5 group-hover:bg-gelwo-purple group-hover:text-gelwo-ivory transition-colors`}>
                  <IconComp />
                </div>
                <h3 className="text-lg font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-2 group-hover:text-gelwo-purple transition-colors">{ind.title}</h3>
                <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed">{ind.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
