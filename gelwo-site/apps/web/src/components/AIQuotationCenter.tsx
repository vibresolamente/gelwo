'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  FiCpu, FiCheck, FiArrowRight, FiArrowLeft, FiDollarSign,
  FiClock, FiShield, FiFileText, FiX, FiSend, FiCheckCircle
} from 'react-icons/fi';

export const AIQuotationCenter: React.FC = () => {
  const { isQuotationOpen, setIsQuotationOpen, activeQuotationCategory } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(activeQuotationCategory || 'ICT & Security');
  const [scopeSize, setScopeSize] = useState<'Small' | 'Medium' | 'Enterprise' | 'Government Megaproject'>('Medium');
  const [timeline, setTimeline] = useState<'Immediate (< 2 Weeks)' | 'Standard (1 Month)' | 'Multi-Phase (> 3 Months)'>('Standard (1 Month)');
  const [location, setLocation] = useState<string>('Nairobi HQ');
  const [clientType, setClientType] = useState<'Government / County' | 'Private Corporate' | 'Hospital / School' | 'NGO / Individual'>('Government / County');

  // Contact details for step 4
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'ICT & Security',
    'Solar Energy',
    'Electrical Engineering',
    'General Supplies',
    'Branding & Media',
    'Consultancy',
    'Environmental Services',
    'Cereals & Commodities',
    'Poultry Infrastructure',
    'Commercial Cleaning',
    'Civil Construction',
    'Community Development',
  ];

  // Dynamic AI Cost calculation simulation engine
  const calculateCostEstimate = () => {
    let base = 250000;
    if (selectedService.includes('Solar')) base = 850000;
    if (selectedService.includes('Construction')) base = 3500000;
    if (selectedService.includes('ICT')) base = 480000;
    if (selectedService.includes('Supplies')) base = 650000;
    if (selectedService.includes('Cleaning')) base = 180000;

    let multiplier = 1;
    if (scopeSize === 'Small') multiplier = 0.5;
    if (scopeSize === 'Medium') multiplier = 1.0;
    if (scopeSize === 'Enterprise') multiplier = 2.4;
    if (scopeSize === 'Government Megaproject') multiplier = 6.5;

    const est = Math.round(base * multiplier);
    return `KSh ${est.toLocaleString()}`;
  };

  const calculateComplexityScore = () => {
    if (scopeSize === 'Small') return 'Low (Score: 2/10)';
    if (scopeSize === 'Medium') return 'Moderate (Score: 5/10)';
    if (scopeSize === 'Enterprise') return 'High (Score: 8/10)';
    return 'Critical Enterprise (Score: 9.8/10)';
  };

  const calculateRiskLevel = () => {
    if (scopeSize === 'Government Megaproject') return 'Managed High Risk (ISO Audited)';
    return 'Low Risk (GELWO Standard Warranty)';
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="quotation" className="py-24 relative z-10 bg-[#0A0F1D] border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 font-mono bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/30">
            <FiCpu className="text-cyan-400 animate-spin" />
            <span>Instant Quote Calculator</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 font-heading">
            Get a <span className="text-gradient-cyan">Quick Quote</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Tell us what you need and get an instant quotation.
          </p>
        </div>

        {/* Wizard Main Glass Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl relative">
          {/* Progress Bar Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs font-bold font-mono text-cyan-400 mb-2">
              <span className={step >= 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>1. Service</span>
              <span className={step >= 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>2. Requirements</span>
              <span className={step >= 3 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>3. Review</span>
              <span className={step >= 4 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>4. Quote</span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Select Service Category */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-xl font-bold text-white font-heading mb-4">
                Which GELWO service division do you require a quotation for?
              </h3>
              <p className="text-xs text-slate-400 mb-6">Select your primary area of inquiry to calibrate AI calculation formulas.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {services.map((svc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedService(svc)}
                    className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                      selectedService === svc
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/20'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span>{svc}</span>
                      {selectedService === svc && <FiCheck className="text-cyan-400 text-base" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl flex items-center space-x-2 shadow-lg"
                >
                  <span>Next: Scope Parameters</span>
                  <FiArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Scope & Timeline Questions */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-bold text-white font-heading">
                Intelligent Scope & Delivery Calibration
              </h3>

              {/* Scope Size */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Project Scale & Size</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Small', 'Medium', 'Enterprise', 'Government Megaproject'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setScopeSize(s)}
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        scopeSize === s
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Type */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Organization / Client Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Government / County', 'Private Corporate', 'Hospital / School', 'NGO / Individual'] as const).map((ct) => (
                    <button
                      key={ct}
                      onClick={() => setClientType(ct)}
                      className={`p-3 rounded-xl border text-xs font-semibold ${
                        clientType === ct
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      {ct}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Location */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Project Deployment Location / County</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Nakuru County, Nairobi HQ, Eldoret Campus"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 bg-slate-900 border border-slate-800 text-slate-300 font-semibold rounded-xl flex items-center space-x-2"
                >
                  <FiArrowLeft />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl flex items-center space-x-2 shadow-lg"
                >
                  <span>Run AI Cost Analytics</span>
                  <FiArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Real-Time Dynamic Cost & Risk Output */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-cyan-400 font-mono uppercase">AI Calculated Estimate</span>
                  <h3 className="text-2xl font-bold text-white font-heading">{selectedService} Project</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">Estimated Investment</span>
                  <span className="text-3xl font-extrabold text-cyan-300 font-heading">{calculateCostEstimate()}</span>
                </div>
              </div>

              {/* Dynamic Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold mb-1">
                    <FiClock />
                    <span>Estimated Timeline</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{timeline}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold mb-1">
                    <FiCpu />
                    <span>Complexity Index</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{calculateComplexityScore()}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
                    <FiShield />
                    <span>Risk & Quality Grade</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{calculateRiskLevel()}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
                💡 <strong>AI Recommendation:</strong> Based on historical procurement data for {location}, combining {selectedService} with GELWO Warranty Support reduces long-term maintenance costs by 22%.
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 bg-slate-900 border border-slate-800 text-slate-300 font-semibold rounded-xl flex items-center space-x-2"
                >
                  <FiArrowLeft />
                  <span>Adjust Questions</span>
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl flex items-center space-x-2 shadow-lg"
                >
                  <span>Generate Official PDF Proposal</span>
                  <FiArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Official Lead Capture & Instant Quotation Dispatch */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmitQuote} className="space-y-4">
                  <div className="border-b border-slate-800 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white font-heading">
                      Generate Official Quotation Dossier
                    </h3>
                    <p className="text-xs text-slate-400">
                      Enter your details to receive an instant PDF estimate and direct follow-up from a GELWO Senior Technical Lead.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Eng. John Doe"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Official Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john.doe@ministry.go.ke"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+254 712 345 678"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Organization / Department</label>
                      <input
                        type="text"
                        required
                        placeholder="County Department of Health"
                        value={contactOrg}
                        onChange={(e) => setContactOrg(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3.5 bg-slate-900 border border-slate-800 text-slate-300 font-semibold rounded-xl"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white font-bold rounded-xl flex items-center space-x-2 shadow-lg hover:scale-105 transition-all"
                    >
                      <FiSend />
                      <span>Submit & Download Instant Proposal</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-4xl mx-auto border border-emerald-500/40 animate-bounce">
                    <FiCheckCircle />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">Quotation Generated Successfully!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Thank you, <strong>{contactName}</strong>. Reference ID <strong>#GELWO-QUOTE-2026-889</strong> has been sent to <strong>{contactEmail}</strong> and logged in GELWO ERP.
                  </p>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-cyan-300 max-w-md mx-auto">
                    Estimated Proposal Value: <strong>{calculateCostEstimate()}</strong>
                  </div>

                  <div className="pt-4 flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                      }}
                      className="px-6 py-3 bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                    >
                      Create Another Quotation
                    </button>
                    <a
                      href="https://wa.me/254700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-emerald-600 rounded-xl text-xs font-bold text-white hover:bg-emerald-500 flex items-center space-x-2"
                    >
                      <span>Discuss via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
