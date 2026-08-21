'use client';

/**
 * /services — GELWO Complete Service & Product Catalogue (15 Divisions: A–N + Software)
 * Built with the GELWO Poster Color System.
 */

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { GELWO_CATALOGUE, ServiceDivision } from '@/data/servicesCatalogue';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCpu, FiArrowRight, FiCheck, FiSearch, FiChevronDown,
  FiChevronUp, FiBox, FiShield, FiTag, FiClock
} from 'react-icons/fi';

export default function ServicesPage() {
  const { triggerQuotationModal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCodeFilter, setActiveCodeFilter] = useState<string>('ALL');
  const [expandedDivisionId, setExpandedDivisionId] = useState<string | null>(GELWO_CATALOGUE[0].id);

  const filteredDivisions = GELWO_CATALOGUE.filter((div) => {
    const matchesCode = activeCodeFilter === 'ALL' || div.code === activeCodeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      div.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      div.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      div.categories.some(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCode && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedDivisionId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-screen bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-midnight dark:text-gelwo-ivory relative selection:bg-gelwo-purple selection:text-gelwo-ivory transition-colors duration-300">
      <Header />

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-gelwo-purple bg-gelwo-blush dark:bg-gelwo-royal px-4 py-1.5 rounded-full border border-gelwo-purple/30 mb-6 font-bold"
          >
            <FiBox className="text-gelwo-purple" />
            <span>Complete 15-Division Enterprise Catalogue</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight uppercase leading-none"
          >
            OUR SERVICES &amp;{' '}
            <span className="text-gradient-purple dark:text-gradient-light">PRODUCTS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg text-gelwo-midnight/70 dark:text-gelwo-gray max-w-3xl mx-auto leading-relaxed"
          >
            Explore GELWO's comprehensive 14 official corporate divisions (A–N) plus our cutting-edge
            Software &amp; Digital Solutions division. Certified, scalable, and backed by automated quotations.
          </motion.p>

          {/* Search & Filter Bar */}
          <div className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-3.5 text-gelwo-purple text-lg" />
              <input
                type="text"
                placeholder="Search across all 15 divisions, subcategories, or product items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-2xl pl-12 pr-4 py-3.5 text-xs text-gelwo-midnight dark:text-gelwo-ivory placeholder-gelwo-midnight/50 dark:placeholder-gelwo-gray focus:outline-none focus:border-gelwo-purple"
              />
            </div>

            <button
              onClick={() => triggerQuotationModal()}
              className="px-6 py-3.5 btn-primary rounded-2xl text-xs uppercase font-extrabold whitespace-nowrap flex items-center justify-center space-x-2"
            >
              <FiCpu />
              <span>AI Cost Calculator</span>
            </button>
          </div>

          {/* Quick Division Code Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveCodeFilter('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                activeCodeFilter === 'ALL'
                  ? 'bg-gelwo-purple text-gelwo-ivory'
                  : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'
              }`}
            >
              ALL (15)
            </button>
            {GELWO_CATALOGUE.map((div) => (
              <button
                key={div.code}
                onClick={() => setActiveCodeFilter(div.code)}
                title={div.name}
                className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all ${
                  activeCodeFilter === div.code
                    ? 'bg-gelwo-purple text-gelwo-ivory shadow'
                    : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray hover:border-gelwo-purple/40'
                }`}
              >
                {div.code}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Divisions List ────────────────────────────────────────── */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredDivisions.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl text-center space-y-3">
            <p className="text-sm font-semibold">No services or products found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCodeFilter('ALL'); }}
              className="px-4 py-2 btn-secondary rounded-xl text-xs font-mono"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredDivisions.map((division, idx) => {
            const isExpanded = expandedDivisionId === division.id;

            return (
              <motion.div
                key={division.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`glass-card rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'border-gelwo-purple shadow-xl' : 'border-gelwo-gray dark:border-gelwo-purple/20'
                }`}
              >
                {/* Division Header Accordion Bar */}
                <div
                  onClick={() => toggleExpand(division.id)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-wrap items-center justify-between gap-4 hover:bg-gelwo-blush/40 dark:hover:bg-gelwo-royal/40 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-gelwo-purple to-gelwo-sage flex items-center justify-center text-3xl shadow-gelwo-purple flex-shrink-0">
                      {division.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded bg-gelwo-purple/15 text-gelwo-purple font-mono font-bold text-xs">
                          DIVISION {division.code}
                        </span>
                        {division.badge && (
                          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-gelwo-sage/20 text-gelwo-sage font-mono font-semibold text-[11px]">
                            ✓ {division.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-heading mt-1">
                        {division.name}
                      </h3>
                      <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray mt-0.5">
                        {division.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerQuotationModal(division.name);
                      }}
                      className="px-4 py-2.5 btn-primary rounded-xl text-xs uppercase font-extrabold flex items-center space-x-1.5 shadow"
                    >
                      <span>Quote Division</span>
                      <FiArrowRight />
                    </button>
                    <div className="p-2 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-purple">
                      {isExpanded ? <FiChevronUp className="text-xl" /> : <FiChevronDown className="text-xl" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Content View */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gelwo-gray dark:border-gelwo-royal p-6 sm:p-8 space-y-8 bg-gelwo-ivory/50 dark:bg-gelwo-midnight/50"
                    >
                      {/* Overview & Metadata Pills */}
                      <div className="space-y-4">
                        <p className="text-sm text-gelwo-midnight/80 dark:text-gelwo-gray leading-relaxed max-w-4xl">
                          {division.description}
                        </p>

                        <div className="flex flex-wrap gap-3 text-xs font-mono">
                          <span className="p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 flex items-center space-x-2">
                            <FiTag className="text-gelwo-purple" />
                            <span>Pricing: <strong className="text-gelwo-purple">{division.pricingModel}</strong></span>
                          </span>
                          <span className="p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 flex items-center space-x-2">
                            <FiClock className="text-gelwo-sage" />
                            <span>Lead Time: <strong className="text-gelwo-sage">{division.leadTime}</strong></span>
                          </span>
                        </div>
                      </div>

                      {/* Subcategory Grid */}
                      <div>
                        <h4 className="text-xs font-mono font-bold text-gelwo-purple uppercase tracking-wider mb-4">
                          PRODUCTS &amp; OPERATIONAL SCOPE ({division.categories.length} CATEGORIES)
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {division.categories.map((cat, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-5 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 space-y-3"
                            >
                              <h5 className="font-bold text-sm font-heading text-gelwo-midnight dark:text-gelwo-ivory">
                                {cat.title}
                              </h5>
                              <ul className="space-y-1.5 text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                                {cat.items.map((item, iIdx) => (
                                  <li key={iIdx} className="flex items-start space-x-2">
                                    <span className="text-gelwo-sage font-bold flex-shrink-0 mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Supporting Services if present */}
                      {division.supportingServices && (
                        <div>
                          <h4 className="text-xs font-mono font-bold text-gelwo-sage uppercase tracking-wider mb-3">
                            SUPPORTING SERVICES &amp; LOGISTICS
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {division.supportingServices.map((sup, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-3 py-1.5 rounded-xl bg-gelwo-sage/15 text-gelwo-sage border border-gelwo-sage/30 text-xs font-medium"
                              >
                                ✓ {sup}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* CTA footer in accordion */}
                      <div className="pt-4 flex flex-wrap justify-between items-center gap-4 border-t border-gelwo-gray dark:border-gelwo-royal">
                        <span className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray font-mono">
                          Official GELWO Specification • Reference Division {division.code}
                        </span>

                        <button
                          type="button"
                          onClick={() => triggerQuotationModal(division.name)}
                          className="px-6 py-3 btn-primary rounded-xl text-xs uppercase font-extrabold flex items-center space-x-2"
                        >
                          <span>Generate Instant PDF Quotation</span>
                          <FiArrowRight />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
