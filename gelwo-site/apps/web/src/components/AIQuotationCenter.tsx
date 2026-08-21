'use client';

/**
 * AIQuotationCenter Component — GELWO Poster Color System
 * Connects directly to the 15-Division Catalogue (A-N + Software) and Supabase database.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { GELWO_CATALOGUE } from '@/data/servicesCatalogue';
import { saveQuotation } from '@/lib/supabase';
import {
  FiCpu, FiCheck, FiArrowRight, FiArrowLeft, FiDollarSign,
  FiClock, FiShield, FiFileText, FiX, FiCheckCircle, FiTag
} from 'react-icons/fi';

export const AIQuotationCenter: React.FC = () => {
  const { isQuotationOpen, setIsQuotationOpen, activeQuotationCategory, currentUser } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>(
    GELWO_CATALOGUE[0].id
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [scopeSize, setScopeSize] = useState<'Small' | 'Medium' | 'Enterprise' | 'Government Megaproject'>('Medium');
  const [timeline, setTimeline] = useState<'Immediate (< 2 Weeks)' | 'Standard (1 Month)' | 'Multi-Phase (> 3 Months)'>('Standard (1 Month)');
  const [clientType, setClientType] = useState<'Government / County' | 'Private Corporate' | 'Hospital / School' | 'NGO / Individual'>('Private Corporate');

  const [contactName, setContactName] = useState(currentUser?.fullName || '');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [contactOrg, setContactOrg] = useState(currentUser?.companyName || '');
  const [generatedRef, setGeneratedRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (activeQuotationCategory) {
      const match = GELWO_CATALOGUE.find(
        (d) =>
          d.name.toLowerCase().includes(activeQuotationCategory.toLowerCase()) ||
          d.id.toLowerCase().includes(activeQuotationCategory.toLowerCase())
      );
      if (match) {
        setSelectedDivisionId(match.id);
        if (match.categories.length > 0) {
          setSelectedSubCategory(match.categories[0].title);
        }
      }
    }
  }, [activeQuotationCategory]);

  const currentDivision = GELWO_CATALOGUE.find((d) => d.id === selectedDivisionId) || GELWO_CATALOGUE[0];

  useEffect(() => {
    if (currentDivision.categories.length > 0 && !selectedSubCategory) {
      setSelectedSubCategory(currentDivision.categories[0].title);
    }
  }, [currentDivision, selectedSubCategory]);

  const calculateCostEstimate = () => {
    let base = 350000;
    const id = currentDivision.id;

    if (id === 'software-digital-solutions') base = 450000;
    else if (id === 'solar-renewable-energy') base = 1800000;
    else if (id === 'small-works-interior-painting') base = 1200000;
    else if (id === 'ict-biometric-security') base = 650000;
    else if (id === 'electrical-engineering') base = 750000;
    else if (id === 'general-supplies') base = 250000;
    else if (id === 'branding-printing-communication') base = 180000;
    else if (id === 'consultancy-survey-research') base = 850000;
    else if (id === 'capacity-building-training') base = 300000;
    else if (id === 'technical-support-maintenance') base = 150000;
    else if (id === 'environment-climate-resilience') base = 1400000;
    else if (id === 'cereals-foodstuff-supplies') base = 950000;
    else if (id === 'poultry-animal-feeds') base = 400000;
    else if (id === 'community-development-special-programs') base = 600000;
    else if (id === 'landscaping-cleaning') base = 200000;

    let multiplier = 1;
    if (scopeSize === 'Small') multiplier = 0.6;
    if (scopeSize === 'Medium') multiplier = 1.0;
    if (scopeSize === 'Enterprise') multiplier = 2.4;
    if (scopeSize === 'Government Megaproject') multiplier = 5.5;

    const est = Math.round(base * multiplier);
    return `KES ${est.toLocaleString()}`;
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cost = calculateCostEstimate();
    const res = await saveQuotation({
      customerName: contactName,
      customerEmail: contactEmail,
      customerPhone: contactPhone,
      organization: contactOrg,
      serviceCategory: `${currentDivision.code}. ${currentDivision.name}`,
      subCategory: selectedSubCategory,
      scopeSize,
      clientType,
      estimatedCost: cost,
    });

    setIsSubmitting(false);
    if (res.quotation) {
      setGeneratedRef(res.quotation.refNumber);
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setIsQuotationOpen(false);
  };

  if (!isQuotationOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[7000] flex items-center justify-center p-2.5 sm:p-4 bg-gelwo-midnight/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-purple/40 rounded-3xl p-4 sm:p-8 md:p-10 max-w-3xl w-full text-left space-y-5 sm:space-y-6 relative max-h-[92vh] overflow-y-auto shadow-2xl"
        >
          {/* Close Trigger */}
          <button
            onClick={resetForm}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-gelwo-midnight/50 dark:text-gelwo-gray hover:text-gelwo-purple rounded-xl bg-gelwo-blush dark:bg-gelwo-royal transition-colors"
          >
            <FiX className="text-lg sm:text-xl" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-3 pr-8">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-gelwo-purple to-gelwo-sage flex items-center justify-center text-gelwo-ivory text-xl sm:text-2xl font-bold shadow-gelwo-purple flex-shrink-0">
              {currentDivision.icon}
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-gelwo-purple uppercase tracking-widest block">
                GELWO 15-DIVISION AI QUOTATION ENGINE
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl font-extrabold font-heading uppercase leading-tight">
                INSTANT ENTERPRISE COST CALCULATOR
              </h3>
            </div>
          </div>

          {/* Stepper Indicator */}
          {!isSubmitted && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-y border-gelwo-gray dark:border-gelwo-royal py-2.5 text-[11px] sm:text-xs font-mono text-center">
              <span className={step === 1 ? 'text-gelwo-purple font-bold bg-gelwo-purple/10 sm:bg-transparent rounded py-1 sm:py-0' : 'text-gelwo-midnight/40 dark:text-gelwo-gray py-1 sm:py-0'}>
                01. Division ({currentDivision.code})
              </span>
              <span className={step === 2 ? 'text-gelwo-purple font-bold bg-gelwo-purple/10 sm:bg-transparent rounded py-1 sm:py-0' : 'text-gelwo-midnight/40 dark:text-gelwo-gray py-1 sm:py-0'}>
                02. Scope &amp; Scale
              </span>
              <span className={step === 3 ? 'text-gelwo-purple font-bold bg-gelwo-purple/10 sm:bg-transparent rounded py-1 sm:py-0' : 'text-gelwo-midnight/40 dark:text-gelwo-gray py-1 sm:py-0'}>
                03. AI Estimate
              </span>
              <span className={step === 4 ? 'text-gelwo-purple font-bold bg-gelwo-purple/10 sm:bg-transparent rounded py-1 sm:py-0' : 'text-gelwo-midnight/40 dark:text-gelwo-gray py-1 sm:py-0'}>
                04. Submit Quote
              </span>
            </div>
          )}

          {/* STEP 1: Service Division & Subcategory */}
          {step === 1 && !isSubmitted && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold font-heading uppercase">
                Select from GELWO's 15 Corporate Divisions:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1">
                {GELWO_CATALOGUE.map((div) => (
                  <button
                    key={div.id}
                    type="button"
                    onClick={() => {
                      setSelectedDivisionId(div.id);
                      if (div.categories.length > 0) {
                        setSelectedSubCategory(div.categories[0].title);
                      }
                    }}
                    className={`p-3 rounded-xl text-xs font-bold text-left border transition-all flex items-center space-x-2 ${
                      selectedDivisionId === div.id
                        ? 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-purple border-gelwo-purple shadow'
                        : 'bg-transparent text-gelwo-midnight/70 dark:text-gelwo-gray border-gelwo-gray dark:border-gelwo-royal hover:border-gelwo-purple/40'
                    }`}
                  >
                    <span className="text-lg">{div.icon}</span>
                    <span className="truncate">
                      {div.code}. {div.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Subcategories selector */}
              {currentDivision.categories.length > 0 && (
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase text-gelwo-purple mb-2">
                    Select Target Operational Subcategory:
                  </label>
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                  >
                    {currentDivision.categories.map((cat, idx) => (
                      <option key={idx} value={cat.title}>
                        {cat.title} ({cat.items.length} items)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 btn-primary rounded-2xl text-xs uppercase font-extrabold flex items-center justify-center space-x-2 mt-4"
              >
                <span>Continue to Scope &amp; Scale</span>
                <FiArrowRight />
              </button>
            </div>
          )}

          {/* STEP 2: Scope & Timeline */}
          {step === 2 && !isSubmitted && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold font-heading uppercase mb-3">
                  Project Scale &amp; Capacity Scope:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {(['Small', 'Medium', 'Enterprise', 'Government Megaproject'] as const).map((sc) => (
                    <button
                      key={sc}
                      type="button"
                      onClick={() => setScopeSize(sc)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        scopeSize === sc
                          ? 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-purple border-gelwo-purple'
                          : 'bg-transparent text-gelwo-midnight/70 dark:text-gelwo-gray border-gelwo-gray dark:border-gelwo-royal hover:border-gelwo-purple/50'
                      }`}
                    >
                      {sc}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold font-heading uppercase mb-3">
                  Client &amp; Institutional Classification:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {(['Government / County', 'Private Corporate', 'Hospital / School', 'NGO / Individual'] as const).map((cl) => (
                    <button
                      key={cl}
                      type="button"
                      onClick={() => setClientType(cl)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        clientType === cl
                          ? 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-sage border-gelwo-sage'
                          : 'bg-transparent text-gelwo-midnight/70 dark:text-gelwo-gray border-gelwo-gray dark:border-gelwo-royal hover:border-gelwo-sage/50'
                      }`}
                    >
                      {cl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 btn-secondary rounded-2xl text-xs uppercase"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 btn-primary rounded-2xl text-xs uppercase flex items-center justify-center space-x-2 font-extrabold"
                >
                  <span>Calculate AI Estimate</span>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AI Calculation Preview */}
          {step === 3 && !isSubmitted && (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-3xl border border-gelwo-purple/30 text-center space-y-4">
                <span className="text-xs font-mono font-bold text-gelwo-purple uppercase tracking-wider">
                  AI CALIBRATED COST ESTIMATE
                </span>
                <div className="text-4xl sm:text-5xl font-extrabold text-gelwo-midnight dark:text-gelwo-ivory font-heading">
                  {calculateCostEstimate()}
                </div>
                <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                  Calibrated for {currentDivision.pricingModel}. Lead time: {currentDivision.leadTime}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-xs font-mono space-y-1.5 text-gelwo-midnight/80 dark:text-gelwo-gray">
                <p>• Division: <strong className="text-gelwo-midnight dark:text-gelwo-ivory">{currentDivision.code}. {currentDivision.name}</strong></p>
                <p>• Subcategory: <strong className="text-gelwo-purple">{selectedSubCategory || 'All Scope Items'}</strong></p>
                <p>• Scale &amp; Client: <strong className="text-gelwo-sage">{scopeSize} ({clientType})</strong></p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 btn-secondary rounded-2xl text-xs uppercase"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-4 btn-primary rounded-2xl text-xs uppercase flex items-center justify-center space-x-2 font-extrabold"
                >
                  <span>Proceed to Official Quote</span>
                  <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Submit Contact Information */}
          {step === 4 && !isSubmitted && (
            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <h4 className="text-sm font-bold font-heading uppercase">
                Recipient Details for Official PDF Quotation:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Full Representative Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="bg-transparent border border-gelwo-gray dark:border-gelwo-royal rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                />
                <input
                  type="email"
                  required
                  placeholder="Official Email Address"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="bg-transparent border border-gelwo-gray dark:border-gelwo-royal rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="bg-transparent border border-gelwo-gray dark:border-gelwo-royal rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                />
                <input
                  type="text"
                  placeholder="Ministry / Corporate Organization"
                  value={contactOrg}
                  onChange={(e) => setContactOrg(e.target.value)}
                  className="bg-transparent border border-gelwo-gray dark:border-gelwo-royal rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 btn-secondary rounded-2xl text-xs uppercase"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 btn-primary rounded-2xl text-xs uppercase font-extrabold"
                >
                  {isSubmitting ? 'Saving to Database...' : '[ GENERATE OFFICIAL QUOTATION ]'}
                </button>
              </div>
            </form>
          )}

          {/* SUBMITTED SUCCESS STATE */}
          {isSubmitted && (
            <div className="text-center py-8 space-y-4">
              <FiCheckCircle className="text-5xl text-gelwo-sage mx-auto" />
              <h3 className="text-2xl font-bold font-heading uppercase">
                Official Quotation Submitted
              </h3>
              <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray max-w-md mx-auto leading-relaxed">
                Ref: <strong className="text-gelwo-purple">{generatedRef}</strong>. Your quotation has been securely saved to the GELWO portal. You can view, track, and download it from the <strong>Customer Portal</strong> at any time.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <a
                  href="/portal"
                  className="py-3 px-6 btn-primary rounded-xl text-xs uppercase font-bold"
                >
                  Go to Customer Portal
                </a>
                <button
                  onClick={resetForm}
                  className="py-3 px-6 btn-secondary rounded-xl text-xs uppercase font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
