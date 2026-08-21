'use client';

/**
 * TestimonialsAndCertifications Component — GELWO Poster Color System
 * Palette: Warm Ivory, Deep Purple, Sage Green, Midnight
 */

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
    <section className="py-24 relative z-10 bg-gelwo-blush/50 dark:bg-gelwo-midnight overflow-hidden border-t border-gelwo-gray dark:border-gelwo-royal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Testimonials */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gelwo-purple font-mono">
            CLIENT ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory mt-3 font-heading uppercase">
            Institutional <span className="text-gradient-champagne">Testimonials</span>
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
              className="glass-card p-8 rounded-3xl border border-gelwo-gray dark:border-gelwo-purple/20 relative flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl text-gelwo-purple font-serif leading-none mb-4">&ldquo;</div>
                <p className="text-xs sm:text-sm text-gelwo-midnight/70 dark:text-gelwo-gray italic leading-relaxed mb-6">
                  {t.quote}
                </p>
              </div>

              <div>
                <div className="flex text-gelwo-purple space-x-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiStar key={i} className="fill-current text-sm" />
                  ))}
                </div>
                <h4 className="font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading text-sm">{t.name}</h4>
                <p className="text-xs text-gelwo-sage">{t.role}</p>
                <p className="text-[11px] text-gelwo-midnight/50 dark:text-gelwo-gray">{t.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Header: Certifications */}
        <div id="certifications" className="text-center max-w-3xl mx-auto mb-16 pt-8 border-t border-gelwo-gray dark:border-gelwo-royal">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-gelwo-sage font-mono">
            REGULATORY TRUST & COMPLIANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory mt-3 font-heading uppercase">
            Government <span className="text-gradient-champagne">Certifications</span>
          </h2>
          <p className="text-gelwo-midnight/70 dark:text-gelwo-gray mt-4 text-sm sm:text-base">
            GELWO maintains all mandatory government registrations for public tenders and corporate procurement.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {certifications.map((c, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="glass-card p-6 rounded-3xl border border-gelwo-gray dark:border-gelwo-purple/20 hover:border-gelwo-purple/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gelwo-blush dark:bg-gelwo-midnight text-gelwo-purple border border-gelwo-purple/20 flex items-center justify-center text-xl">
                    <FiShield />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-sage border border-gelwo-gray dark:border-gelwo-royal">
                    {c.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gelwo-midnight dark:text-gelwo-ivory font-heading mb-2">{c.title}</h3>
                <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray leading-relaxed mb-6">{c.desc}</p>
              </div>

              <button
                onClick={() => setSelectedCert(c.title)}
                className="w-full py-2.5 rounded-xl btn-secondary text-xs flex items-center justify-center space-x-2"
              >
                <FiFileText />
                <span>View Public Document</span>
              </button>
            </motion.div>
          ))}

          {/* Official Company Profile Download Card */}
          <div className="glass-card p-6 rounded-3xl border-2 border-gelwo-purple/40 flex flex-col justify-between"
            style={{ background: 'linear-gradient(to bottom right, rgba(237,230,229,0.9), rgba(252,249,245,0.95))' }}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gelwo-purple text-gelwo-ivory flex items-center justify-center text-2xl font-bold mb-4 shadow-gelwo-purple">
                <FiDownload />
              </div>
              <h3 className="text-lg font-bold text-gelwo-midnight font-heading mb-2">GELWO Official Corporate Profile</h3>
              <p className="text-xs text-gelwo-midnight/70 leading-relaxed mb-6">
                Download the complete official dossier detailing company history, certificates, financial capacity, and project references.
              </p>
            </div>

            <button
              onClick={() => alert('Downloading GELWO_Technologies_Official_Profile_2026.pdf')}
              className="w-full py-3 btn-primary rounded-xl text-xs flex items-center justify-center space-x-2"
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
            className="fixed inset-0 z-[9900] bg-gelwo-midnight/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-gelwo-ivory dark:bg-gelwo-royal border border-gelwo-purple/30 rounded-3xl p-8 shadow-2xl text-gelwo-midnight dark:text-gelwo-ivory text-center relative"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple rounded-lg bg-gelwo-blush dark:bg-gelwo-midnight"
              >
                <FiX />
              </button>

              <div className="w-16 h-16 rounded-full bg-gelwo-sage/20 text-gelwo-sage flex items-center justify-center text-3xl mx-auto mb-4 border border-gelwo-sage/40">
                <FiCheckCircle />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">{selectedCert}</h3>
              <p className="text-xs text-gelwo-midnight/50 dark:text-gelwo-gray mb-6 font-mono">Status: Active & Verified • Republic of Kenya</p>

              <div className="p-4 rounded-2xl bg-gelwo-blush dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-royal text-xs text-gelwo-midnight/70 dark:text-gelwo-gray mb-6">
                This certification is registered in the GELWO Corporate ERP system and available for government tender submission.
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full py-3 btn-primary rounded-xl text-xs"
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
