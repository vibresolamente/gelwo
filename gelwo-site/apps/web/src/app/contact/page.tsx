'use client';

/**
 * /contact — GELWO Smart Project Initiation & Contact Hub
 * Styled with GELWO Poster Color System & responsive across all devices.
 */

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheckCircle, FiPhoneCall, FiMail, FiMapPin, FiCpu } from 'react-icons/fi';

export default function ContactPage() {
  const [lookingFor, setLookingFor] = useState<string>('Software');
  const [businessType, setBusinessType] = useState('');
  const [problemToSolve, setProblemToSolve] = useState('');
  const [userCount, setUserCount] = useState('10 - 50 Users');
  const [needMobile, setNeedMobile] = useState(true);
  const [needPayments, setNeedPayments] = useState(true);
  const [needReports, setNeedReports] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Software',
    'Website',
    'Mobile App',
    'Business System',
    'AI Solution',
    'Solar Microgrid',
    'ICT Infrastructure',
    'General Supplies',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-midnight dark:text-gelwo-ivory relative selection:bg-gelwo-purple selection:text-gelwo-ivory transition-colors duration-300">
      <Header />

      {/* Hero Header */}
      <section className="pt-36 pb-12 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-mono text-gelwo-purple font-bold uppercase tracking-[0.3em] bg-gelwo-blush dark:bg-gelwo-royal px-4 py-1.5 rounded-full border border-gelwo-purple/30">
          Smart Contact &amp; Project Initiation
        </span>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading uppercase mt-4">
          LET'S BUILD <span className="text-gradient-purple dark:text-gradient-light">SOMETHING.</span>
        </h1>
        <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-sm sm:text-base max-w-xl mx-auto mt-3">
          Select your requirements below and our smart engine will calibrate a custom project brief.
        </p>
      </section>

      {/* SMART CONTACT FORM */}
      <section className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-6 sm:p-10 md:p-12 rounded-3xl border border-gelwo-purple/30 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Question 1: What are you looking for? */}
              <div>
                <label className="block text-xs sm:text-sm font-bold font-heading uppercase tracking-wider mb-4 text-gelwo-purple">
                  What are you looking for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setLookingFor(cat)}
                      className={`p-3 sm:p-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        lookingFor === cat
                          ? 'bg-gelwo-purple text-gelwo-ivory border-gelwo-purple font-extrabold shadow-gelwo-purple'
                          : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/80 dark:text-gelwo-gray border-gelwo-gray dark:border-gelwo-purple/20 hover:border-gelwo-purple'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Questions Based on Selection */}
              <motion.div key={lookingFor} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 border-t border-gelwo-gray dark:border-gelwo-royal">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold text-gelwo-purple uppercase mb-2">What type of business / institution?</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hotel, Health Clinic, Enterprise, Sacco"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-gelwo-purple uppercase mb-2">How many active users / locations?</label>
                    <select
                      value={userCount}
                      onChange={(e) => setUserCount(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-gelwo-purple"
                    >
                      <option>1 - 10 Users</option>
                      <option>10 - 50 Users</option>
                      <option>50 - 200 Users</option>
                      <option>Enterprise (200+ Users)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-gelwo-purple uppercase mb-2">What main problem are you trying to solve?</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your current bottleneck, project scope, or goal..."
                    value={problemToSolve}
                    onChange={(e) => setProblemToSolve(e.target.value)}
                    className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-gelwo-purple"
                  />
                </div>

                {/* Feature Toggles */}
                <div>
                  <label className="block text-xs font-mono font-bold text-gelwo-purple uppercase mb-3">Which features do you need?</label>
                  <div className="flex flex-wrap gap-2.5 sm:gap-4 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setNeedMobile(!needMobile)}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl border ${needMobile ? 'bg-gelwo-purple/20 border-gelwo-purple text-gelwo-purple dark:text-gelwo-ivory' : 'bg-gelwo-blush dark:bg-gelwo-royal border-gelwo-gray dark:border-gelwo-purple/20 text-gelwo-midnight/60 dark:text-gelwo-gray'}`}
                    >
                      📱 Mobile Access: {needMobile ? 'YES' : 'NO'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNeedPayments(!needPayments)}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl border ${needPayments ? 'bg-gelwo-sage/20 border-gelwo-sage text-gelwo-sage' : 'bg-gelwo-blush dark:bg-gelwo-royal border-gelwo-gray dark:border-gelwo-purple/20 text-gelwo-midnight/60 dark:text-gelwo-gray'}`}
                    >
                      💳 Payment Integration: {needPayments ? 'YES' : 'NO'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNeedReports(!needReports)}
                      className={`px-3.5 sm:px-4 py-2 rounded-xl border ${needReports ? 'bg-gelwo-purple/20 border-gelwo-purple text-gelwo-purple dark:text-gelwo-ivory' : 'bg-gelwo-blush dark:bg-gelwo-royal border-gelwo-gray dark:border-gelwo-purple/20 text-gelwo-midnight/60 dark:text-gelwo-gray'}`}
                    >
                      📊 Analytics &amp; Reports: {needReports ? 'YES' : 'NO'}
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gelwo-gray dark:border-gelwo-royal">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gelwo-midnight/70 dark:text-gelwo-gray">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gelwo-midnight/70 dark:text-gelwo-gray">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-gelwo-midnight/70 dark:text-gelwo-gray">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="px-8 sm:px-10 py-3.5 sm:py-4 btn-primary text-xs sm:text-sm uppercase rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center space-x-2 mx-auto w-full sm:w-auto"
                >
                  <FiSend />
                  <span>GENERATE REQUEST →</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-4xl mx-auto border border-emerald-500/40">
                <FiCheckCircle />
              </div>
              <h3 className="text-2xl font-bold font-heading uppercase">REQUEST GENERATED SUCCESSFULLY!</h3>
              <p className="text-gelwo-midnight/70 dark:text-gelwo-gray text-xs sm:text-sm max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Your request for <strong>{lookingFor}</strong> has been received and dispatched to GELWO Technical Sales.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 btn-secondary rounded-xl text-xs font-semibold"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
