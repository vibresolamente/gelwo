'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiMapPin, FiCheck, FiArrowRight, FiPlay, FiStar } from 'react-icons/fi';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Government' | 'Education' | 'Health' | 'Energy' | 'ICT' | 'Construction';
  location: string;
  year: string;
  summary: string;
  stats: string;
  client: string;
  beforeAfterAvailable?: boolean;
}

const projectsList: ProjectItem[] = [
  {
    id: 'p1',
    title: 'County Headquarters Solar Microgrid & Energy Bank',
    category: 'Energy',
    location: 'Nakuru County',
    year: '2025',
    summary: 'Design, supply and installation of a 750kW hybrid photovoltaic system with 1.2MWh lithium energy storage powering county administrative buildings.',
    stats: '750kW PV • 1.2MWh Battery',
    client: 'Nakuru County Executive',
    beforeAfterAvailable: true,
  },
  {
    id: 'p2',
    title: 'National Referral Hospital Fiber Backbone & CCTV Grid',
    category: 'Health',
    location: 'Nairobi',
    year: '2024',
    summary: 'Turnkey ICT cabling, 400+ high-definition IP camera installation, biometric access controls, and redundant server room infrastructure.',
    stats: '400+ Cameras • 10Gbps Core Network',
    client: 'Ministry of Health',
    beforeAfterAvailable: true,
  },
  {
    id: 'p3',
    title: 'University Campus Digital Data Center & Solar Roof',
    category: 'Education',
    location: 'Eldoret',
    year: '2025',
    summary: 'Combined high-performance server rack assembly, smart interactive displays for 32 lecture halls, and 300kW rooftop solar grid.',
    stats: '32 Smart Halls • 300kW Solar',
    client: 'Public University Senate',
  },
  {
    id: 'p4',
    title: 'Judiciary Complex Structural Expansion & General Supplies',
    category: 'Government',
    location: 'Mombasa',
    year: '2024',
    summary: 'Civil engineering structural upgrades, NCA-certified concrete works, courtroom furniture procurement, and janitorial sanitization.',
    stats: 'NCA 1 Certified • Complete Furnishing',
    client: 'State Law Office',
  },
  {
    id: 'p5',
    title: 'Community Solar Borehole & Agricultural Irrigation Network',
    category: 'Energy',
    location: 'Turkana County',
    year: '2025',
    summary: 'Drilling of 3 high-yield boreholes, installation of solar pumps, elevated 50,000L water storage tanks, and community farming distribution.',
    stats: '3 Boreholes • 50,000L Capacity',
    client: 'Regional Development Authority',
  },
  {
    id: 'p6',
    title: 'Regional Police Command Center Security Matrix',
    category: 'ICT',
    location: 'Kisumu',
    year: '2024',
    summary: 'Command wall monitor matrix, encrypted radio repeater towers, and automated emergency alert dispatching system.',
    stats: 'Video Wall • Encrypted Repeaters',
    client: 'National Police Service',
  }
];

export const FeaturedProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Government', 'Education', 'Health', 'Energy', 'ICT'];

  const filteredProjects = activeFilter === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 relative z-10 bg-[#0A0F1D]/95 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 font-mono">
            Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 font-heading">
            Featured <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Explore our executed portfolio across key government agencies, public universities, referral hospitals, and community infrastructure.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-3xl p-6 border border-cyan-500/20 flex flex-col justify-between hover:border-cyan-400/60"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center font-mono">
                      <FiMapPin className="mr-1 text-cyan-400" />
                      {project.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white font-heading mb-3 leading-snug">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Stats Tag */}
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-cyan-300 mb-6 font-mono">
                    ⚡ Key Metric: {project.stats}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-400">Client: {project.client}</span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-2 rounded-xl bg-slate-900 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                  >
                    <FiArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0A0F1D] border border-cyan-500/40 rounded-3xl p-8 shadow-2xl text-white relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900"
              >
                ✕
              </button>

              <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">
                {selectedProject.category} Case Study
              </span>
              <h3 className="text-2xl font-bold font-heading mt-1 mb-4">{selectedProject.title}</h3>

              <div className="flex space-x-4 text-xs text-slate-400 mb-6 font-mono">
                <span>📍 {selectedProject.location}</span>
                <span>📅 Completed {selectedProject.year}</span>
                <span>🏛 Client: {selectedProject.client}</span>
              </div>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {selectedProject.summary}
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">Technical Implementation Results</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div>✔ On-time Delivery Guarantee</div>
                  <div>✔ KRA & Government Compliant</div>
                  <div>✔ 24/7 Remote Telemetry</div>
                  <div>✔ High Energy Efficiency</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold rounded-xl text-white"
              >
                Close Project Dossier
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
