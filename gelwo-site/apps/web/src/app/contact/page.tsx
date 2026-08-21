'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheckCircle, FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
  const [lookingFor, setLookingFor] = useState<string>('Software');
  const [businessType, setBusinessType] = useState('');
  const [problemToSolve, setProblemToSolve] = useState('');
  const [userCount, setUserCount] = useState('10 - 50 Users');
  const [needMobile, setNeedMobile] = useState(true);
  const [needPayments, setNeedPayments] = useState(true);
  const [needReports, setNeedReports] = useState(true);
  const [budget, setBudget] = useState('KSh 500,000 - 1,500,000');
  const [timeline, setTimeline] = useState('1 Month');

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
    'Product',
    'Something else',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#0A0F1D] text-white relative selection:bg-cyan-500 selection:text-black">
      <Header />

      {/* Hero Header */}
      <section className="pt-36 pb-12 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-[0.3em] bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30">
          Smart Contact & Project Initiation
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mt-4 font-heading uppercase">
          LET'S BUILD <span className="text-gradient-cyan">SOMETHING.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-3">
          Select your requirements below and our smart engine will calibrate a custom project brief.
        </p>
      </section>

      {/* SMART CONTACT FORM matching txt Sections 25 & 26 */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1: What are you looking for? */}
              <div>
                <label className="block text-sm font-bold font-heading text-white uppercase tracking-wider mb-4">
                  What are you looking for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setLookingFor(cat)}
                      className={`p-3.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        lookingFor === cat
                          ? 'bg-cyan-500 text-black border-cyan-400 font-extrabold shadow-lg shadow-cyan-500/20'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Questions Based on Selection */}
              <motion.div key={lookingFor} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 border-t border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold text-cyan-400 uppercase mb-2">What type of business?</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hotel, Health Clinic, Retailer, Hospital"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-cyan-400 uppercase mb-2">How many active users?</label>
                    <select
                      value={userCount}
                      onChange={(e) => setUserCount(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                    >
                      <option>1 - 10 Users</option>
                      <option>10 - 50 Users</option>
                      <option>50 - 200 Users</option>
                      <option>Enterprise (200+ Users)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-cyan-400 uppercase mb-2">What main problem are you trying to solve?</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your current bottleneck or goal..."
                    value={problemToSolve}
                    onChange={(e) => setProblemToSolve(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Feature Toggles */}
                <div>
                  <label className="block text-xs font-mono font-bold text-cyan-400 uppercase mb-3">Which features do you need?</label>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setNeedMobile(!needMobile)}
                      className={`px-4 py-2 rounded-xl border ${needMobile ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      📱 Mobile Access: {needMobile ? 'YES' : 'NO'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNeedPayments(!needPayments)}
                      className={`px-4 py-2 rounded-xl border ${needPayments ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      💳 Payment Integration: {needPayments ? 'YES' : 'NO'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setNeedReports(!needReports)}
                      className={`px-4 py-2 rounded-xl border ${needReports ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                      📊 Advanced Reports: {needReports ? 'YES' : 'NO'}
                    </button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <label className="block text-xs text-slate-400 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Button matching txt Section 26 */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white font-extrabold text-sm uppercase rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center space-x-2 mx-auto"
                >
                  <FiSend />
                  <span>GENERATE REQUEST →</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-4xl mx-auto border border-emerald-500/40">
                <FiCheckCircle />
              </div>
              <h3 className="text-2xl font-bold text-white font-heading">REQUEST GENERATED SUCCESSFULLY!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <strong>{name}</strong>. Your request for <strong>{lookingFor}</strong> has been assigned reference <strong>#GELWO-REQ-2026-904</strong> and dispatched to GELWO Technical Sales.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-slate-800 text-cyan-400 rounded-xl text-xs font-semibold"
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
