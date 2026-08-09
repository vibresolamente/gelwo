'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiDownload, FiCheckCircle, FiShield, FiFileText, FiX } from 'react-icons/fi';

export const TestimonialsAndCertifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const testimonials = [
    {
      name: 'Dr. Peter Mwangi',
      role: 'Director of Medical Services',
      institution: 'County Referral Hospital',
      quote: 'GELWO Technologies delivered our complete 400+ camera CCTV grid and redundant fiber backbone ahead of schedule. Their technical precision and post-commissioning support are outstanding.',
      rating: 5,
    },
    {
      name: 'Eng. Sarah Omondi',
      role: 'Head of Infrastructure',
      institution: 'Ministry of Water & Energy',
      quote: 'The 750kW Solar Microgrid installed by GELWO at the Nakuru headquarters has cut our energy costs by 68%. The AI telemetry monitoring gives us 24/7 visibility into solar power generation.',
      rating: 5,
    },
    {
      name: 'Grace Chebet',
      role: 'Procurement Manager',
      institution: 'Regional Agricultural SACCO',
      quote: 'From bulk maize procurement to poultry house automation, GELWO general supplies division has consistently delivered certified quality products with KRA tax compliance.',
      rating: 5,
    },
  ];

  const certifications = [
    { title: 'National Construction Authority (NCA)', category: 'NCA 1 / 2 / 3 Accredited', desc: 'Certified for major civil building, electrical, and mechanical engineering contracts across Kenya.' },
    { title: 'AGPO Registered Enterprise', category: 'Government Procurement', desc: 'Fully qualified under Access to Government Procurement Opportunities (Youth, Women & PWDs).' },
    { title: 'KRA Tax Compliance Certificate', category: 'Compliance', desc: 'Active KRA Tax Compliance Certificate verifying 100% tax status & PIN registration.' },
    { title: 'Certificate of Incorporation', category: 'Corporate Governance', desc: 'Officially registered corporate entity under the Companies Act of Kenya.' },
    { title: 'Unified County Business Permits', category: 'Municipal Permits', desc: 'Operational permits across Nairobi City County, Nakuru, Mombasa, and regional hubs.' },
  ];

  return (
    <section className="py-24 relative z-10 bg-[#0A0F1D] overflow-hidden border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Testimonials */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 font-mono">
            Client Endorsements
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 font-heading">
            Institutional <span className="text-gradient-cyan">Testimonials</span>
          </h2>
        </div>

        {/* Testimonials Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-cyan-500/20 relative flex flex-col justify-between"
            >
              <div>
                {/* Quote Mark Icon */}
                <div className="text-4xl text-cyan-400 font-serif leading-none mb-4">“</div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              <div>
                <div className="flex text-yellow-400 space-x-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="fill-current text-sm" />
                  ))}
                </div>
                <h4 className="font-bold text-white font-heading text-sm">{t.name}</h4>
                <p className="text-xs text-cyan-400">{t.role}</p>
                <p className="text-[11px] text-slate-400">{t.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Header: Certifications */}
        <div id="certifications" className="text-center max-w-3xl mx-auto mb-16 pt-8 border-t border-slate-800">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 font-mono">
            Regulatory Trust & Compliance
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 font-heading">
            Government <span className="text-gradient-cyan">Certifications</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            GELWO maintains all mandatory government registrations for public tenders and corporate procurement.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="glass-card p-6 rounded-3xl border border-cyan-500/20 hover:border-cyan-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl">
                    <FiShield />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    {c.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-heading mb-2">{c.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">{c.desc}</p>
              </div>

              <button
                onClick={() => setSelectedCert(c.title)}
                className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors flex items-center justify-center space-x-2"
              >
                <FiFileText />
                <span>View Public Document</span>
              </button>
            </motion.div>
          ))}

          {/* Official Company Profile Download Card */}
          <div className="glass-card p-6 rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-br from-blue-950/40 via-cyan-950/20 to-purple-950/30 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-black flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                <FiDownload />
              </div>
              <h3 className="text-lg font-bold text-white font-heading mb-2">GELWO Official Corporate Profile</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Download the complete official dossier detailing company history, certificates, financial capacity, and project references.
              </p>
            </div>

            <button
              onClick={() => alert('Downloading GELWO_Technologies_Official_Profile_2026.pdf')}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold rounded-xl text-white text-xs hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center space-x-2"
            >
              <FiDownload />
              <span>Download Company Profile (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9900] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#0A0F1D] border border-cyan-500/40 rounded-3xl p-8 shadow-2xl text-white text-center relative"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900"
              >
                <FiX />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-500/40">
                <FiCheckCircle />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">{selectedCert}</h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">Status: Active & Verified • Republic of Kenya</p>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-6">
                This certification is registered in the GELWO Corporate ERP system and available for government tender submission.
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-3 bg-cyan-500 text-black font-bold rounded-xl text-xs"
              >
                Close Verification
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
