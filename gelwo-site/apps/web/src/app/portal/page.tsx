'use client';

/**
 * /portal — GELWO Customer Portal
 * Complete self-service client dashboard, quotation manager, and official documents center (Invoices, Receipts, Delivery Notes).
 * Powered by Supabase & GELWO Poster Color System.
 */

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { useApp } from '@/context/AppContext';
import {
  fetchUserQuotations,
  updateQuotationStatus,
  QuotationRecord,
  fetchOfficialDocuments,
  OfficialDocument
} from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser, FiFileText, FiDollarSign, FiFolder, FiCheckCircle,
  FiDownload, FiMessageSquare, FiLifeBuoy, FiLock, FiMail,
  FiBriefcase, FiPhone, FiLogOut, FiPlus, FiClock, FiShield,
  FiCheck, FiTruck, FiPackage
} from 'react-icons/fi';

export default function CustomerPortalPage() {
  const { currentUser, loginUser, registerUser, logoutUser, triggerQuotationModal } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'quotations' | 'documents' | 'projects'>('dashboard');
  const [quotations, setQuotations] = useState<QuotationRecord[]>([]);
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      const [quotes, docs] = await Promise.all([
        fetchUserQuotations(currentUser?.email),
        fetchOfficialDocuments(currentUser?.email),
      ]);
      setQuotations(quotes);
      setDocuments(docs);
      setLoadingData(false);
    }
    loadData();
  }, [currentUser]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    const res = await loginUser(email, password);
    setAuthLoading(false);
    if (res.error) {
      setAuthError(res.error);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    const res = await registerUser({
      email,
      password,
      fullName,
      companyName,
      phone,
      role: 'customer',
    });
    setAuthLoading(false);
    if (res.error) {
      setAuthError(res.error);
    }
  };

  const handleStatusChange = async (quoteId: string, status: QuotationRecord['status']) => {
    await updateQuotationStatus(quoteId, status);
    const quotes = await fetchUserQuotations(currentUser?.email);
    setQuotations(quotes);
    setActionSuccess(`Quotation ${status === 'Approved' ? 'Accepted' : 'Updated'} Successfully!`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const downloadQuotationPDF = (q: QuotationRecord) => {
    const text = `
======================================================================
GELWO TECHNOLOGIES LIMITED — OFFICIAL QUOTATION
Reference: ${q.refNumber}
Date: ${new Date(q.createdAt).toLocaleDateString()}
Client: ${q.customerName} (${q.organization || 'Corporate Client'})
Email: ${q.customerEmail}
======================================================================
SERVICE DIVISION: ${q.serviceCategory}
SUB-SERVICE:      ${q.subCategory || 'General Service Scope'}
SCOPE / SCALE:    ${q.scopeSize}
CLIENT TYPE:      ${q.clientType}
STATUS:           ${q.status}

TOTAL ESTIMATE:   ${q.estimatedCost}
======================================================================
GELWO Technologies Ltd • Building Tomorrow's Solutions Today
Nairobi HQ • Nakuru • Mombasa • info@gelwo.co.ke • www.gelwo.co.ke
======================================================================
    `;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${q.refNumber}_Quotation.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadDocumentPDF = (doc: OfficialDocument) => {
    const text = `
======================================================================
GELWO TECHNOLOGIES LIMITED — OFFICIAL ${doc.docType.toUpperCase().replace('_', ' ')}
Document Number: ${doc.docNumber}
Issue Date: ${new Date(doc.issueDate).toLocaleDateString()}
Status: ${doc.status}
----------------------------------------------------------------------
CLIENT RECIPIENT:
Customer Name: ${doc.customerName}
Organization:  ${doc.organization || 'Institutional Client'}
Email:         ${doc.customerEmail}
${doc.deliveryAddress ? `Delivery Loc:  ${doc.deliveryAddress}\n` : ''}${doc.refQuoteNumber ? `Quotation Ref: ${doc.refQuoteNumber}\n` : ''}----------------------------------------------------------------------
ITEMIZED PARTICULARS:
${doc.items
  .map(
    (it, i) =>
      `${i + 1}. ${it.description.padEnd(45)} | Qty: ${it.quantity.toString().padEnd(4)} | Unit: KES ${it.unitPrice.toLocaleString().padEnd(10)} | Total: KES ${it.total.toLocaleString()}`
  )
  .join('\n')}
----------------------------------------------------------------------
SUBTOTAL:     KES ${doc.subtotal.toLocaleString()}
${doc.vatAmount > 0 ? `VAT (16%):     KES ${doc.vatAmount.toLocaleString()}\n` : ''}TOTAL AMOUNT: KES ${doc.totalAmount.toLocaleString()}
----------------------------------------------------------------------
Notes: ${doc.notes || 'Official GELWO certified document.'}
======================================================================
GELWO Technologies Ltd • Reg. No. BN4-9GFKDG7 • Tax PIN: P052125735W
AGPO: NT/PPD/2025/DGY/8251 • IFMIS: 1013123
Nairobi HQ • Nakuru • Mombasa • info@gelwo.co.ke • www.gelwo.co.ke
======================================================================
    `;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.docNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-midnight dark:text-gelwo-ivory relative selection:bg-gelwo-purple selection:text-gelwo-ivory transition-colors duration-300">
      <Header />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── NOT LOGGED IN: Authentication Gateway ────────────────────────── */}
        {!currentUser ? (
          <div className="max-w-md mx-auto my-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-3xl border border-gelwo-purple/30 shadow-2xl space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-gelwo-purple to-gelwo-sage flex items-center justify-center text-gelwo-ivory shadow-gelwo-purple">
                  <FiShield className="text-2xl" />
                </div>
                <span className="text-xs font-mono font-bold text-gelwo-purple uppercase tracking-widest block">
                  CUSTOMER PORTAL GATEWAY
                </span>
                <h2 className="text-2xl font-extrabold font-heading uppercase">
                  {authMode === 'login' ? 'Client Secure Login' : 'Register New Account'}
                </h2>
                <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                  Access official quotations, invoices, receipts &amp; delivery notes
                </p>
              </div>

              {/* Toggle Switch */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-gelwo-blush dark:bg-gelwo-royal rounded-xl border border-gelwo-gray dark:border-gelwo-purple/20 text-xs font-bold font-mono">
                <button
                  onClick={() => { setAuthMode('login'); setAuthError(null); }}
                  className={`py-2 rounded-lg transition-all ${authMode === 'login' ? 'bg-gelwo-purple text-gelwo-ivory shadow' : 'text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setAuthError(null); }}
                  className={`py-2 rounded-lg transition-all ${authMode === 'register' ? 'bg-gelwo-purple text-gelwo-ivory shadow' : 'text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
                >
                  Register
                </button>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium">
                  {authError}
                </div>
              )}

              {/* SIGN IN FORM */}
              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-1">Corporate Email / Username</label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-3.5 text-gelwo-purple" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@institution.go.ke"
                        className="w-full bg-transparent border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-1">Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-3.5 text-gelwo-purple" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-transparent border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 btn-primary rounded-xl text-xs uppercase font-bold tracking-wider mt-2"
                  >
                    {authLoading ? 'Authenticating...' : 'Sign In To Dashboard'}
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray">
                      Demo client credentials work instantly. Try with any email.
                    </span>
                  </div>
                </form>
              ) : (
                /* REGISTER FORM */
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-1">Full Representative Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-3.5 text-gelwo-purple" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Eng. John Doe"
                        className="w-full bg-transparent border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-1">Organization / Ministry</label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-3.5 top-3.5 text-gelwo-purple" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="County Ministry of Health"
                        className="w-full bg-transparent border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-1">Official Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-3.5 text-gelwo-purple" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@organization.com"
                        className="w-full bg-transparent border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-1">Phone Number</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-3.5 text-gelwo-purple" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+254 700 000 000"
                        className="w-full bg-transparent border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-gelwo-midnight/70 dark:text-gelwo-gray mb-1">Create Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-3.5 top-3.5 text-gelwo-purple" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-transparent border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:border-gelwo-purple"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 btn-primary rounded-xl text-xs uppercase font-bold tracking-wider mt-3"
                  >
                    {authLoading ? 'Creating Account...' : 'Complete Registration'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        ) : (
          /* ── LOGGED IN: Customer Dashboard ───────────────────────────────── */
          <div className="space-y-8">
            {/* Top Profile Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/30">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gelwo-purple to-gelwo-sage flex items-center justify-center text-gelwo-ivory text-2xl font-bold font-heading shadow-gelwo-purple">
                  {currentUser.fullName?.charAt(0) || 'C'}
                </div>
                <div>
                  <span className="text-xs font-mono text-gelwo-purple font-bold uppercase tracking-wider block">
                    VERIFIED CLIENT PLATFORM
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
                    {currentUser.fullName}
                  </h1>
                  <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                    {currentUser.companyName} • Ref: <span className="font-mono text-gelwo-sage font-bold">GLW-ACC-{(currentUser.id || '99').slice(-6).toUpperCase()}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => triggerQuotationModal()}
                  className="px-4 py-2.5 btn-primary rounded-xl text-xs flex items-center space-x-2 font-bold"
                >
                  <FiPlus />
                  <span>Request New Quote</span>
                </button>
                <button
                  onClick={logoutUser}
                  className="p-2.5 rounded-xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/30 text-gelwo-midnight dark:text-gelwo-gray hover:text-red-500 transition-colors"
                  title="Sign Out"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-gelwo-purple/20 text-center">
                <span className="text-3xl font-extrabold font-mono text-gelwo-purple block">{quotations.length}</span>
                <span className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray font-bold uppercase tracking-wider mt-1 block">Quotations</span>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-gelwo-purple/20 text-center">
                <span className="text-3xl font-extrabold font-mono text-gelwo-sage block">
                  {documents.length}
                </span>
                <span className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray font-bold uppercase tracking-wider mt-1 block">Official Documents</span>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-gelwo-purple/20 text-center">
                <span className="text-3xl font-extrabold font-mono text-blue-500 block">
                  {quotations.filter((q) => q.status === 'Approved').length}
                </span>
                <span className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray font-bold uppercase tracking-wider mt-1 block">Approved Projects</span>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-gelwo-purple/20 text-center">
                <span className="text-3xl font-extrabold font-mono text-emerald-500 block">100%</span>
                <span className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray font-bold uppercase tracking-wider mt-1 block">SLA Compliance</span>
              </div>
            </div>

            {actionSuccess && (
              <div className="p-4 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-mono font-bold rounded-2xl border border-emerald-500/40 text-center animate-pulse">
                ✓ {actionSuccess}
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gelwo-gray dark:border-gelwo-royal pb-4 text-xs font-mono font-bold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-5 py-2.5 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-gelwo-purple text-gelwo-ivory' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
              >
                Dashboard Overview
              </button>
              <button
                onClick={() => setActiveTab('quotations')}
                className={`px-5 py-2.5 rounded-xl transition-all ${activeTab === 'quotations' ? 'bg-gelwo-purple text-gelwo-ivory' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
              >
                Official Quotations ({quotations.length})
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-5 py-2.5 rounded-xl transition-all ${activeTab === 'documents' ? 'bg-gelwo-purple text-gelwo-ivory' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
              >
                Invoices, Receipts &amp; Delivery Notes ({documents.length})
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-5 py-2.5 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-gelwo-purple text-gelwo-ivory' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
              >
                Active Projects Track
              </button>
            </div>

            {/* TAB CONTENT: Quotations List */}
            {(activeTab === 'quotations' || activeTab === 'dashboard') && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold font-heading uppercase">
                    Your Official Quotations &amp; Proposals
                  </h3>
                  <button
                    onClick={() => triggerQuotationModal()}
                    className="text-xs text-gelwo-purple font-mono font-bold hover:underline"
                  >
                    + Generate New Estimate
                  </button>
                </div>

                {loadingData ? (
                  <p className="text-xs font-mono text-center py-8">Loading quotations from Supabase...</p>
                ) : quotations.length === 0 ? (
                  <div className="glass-card p-12 rounded-3xl text-center space-y-4">
                    <FiFileText className="text-4xl text-gelwo-purple mx-auto" />
                    <p className="text-sm font-semibold">No quotations generated yet.</p>
                    <button
                      onClick={() => triggerQuotationModal()}
                      className="px-6 py-3 btn-primary rounded-xl text-xs uppercase"
                    >
                      Create Your First Quotation
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {quotations.map((q) => (
                      <div
                        key={q.id}
                        className="glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/30 space-y-6"
                      >
                        <div className="flex flex-wrap justify-between items-start gap-4 border-b border-gelwo-gray dark:border-gelwo-royal pb-4">
                          <div>
                            <span className="text-xs font-mono text-gelwo-purple font-bold block">{q.refNumber}</span>
                            <h4 className="text-xl font-bold font-heading mt-0.5">{q.serviceCategory}</h4>
                            <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                              {q.organization || currentUser.companyName} • Scope: <strong>{q.scopeSize}</strong>
                            </p>
                          </div>

                          <div className="text-right">
                            <span
                              className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${
                                q.status === 'Approved'
                                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40'
                                  : q.status === 'Under Review'
                                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/40'
                                  : 'bg-gelwo-purple/20 text-gelwo-purple border-gelwo-purple/40'
                              }`}
                            >
                              ● {q.status}
                            </span>
                            <span className="text-xs text-gelwo-midnight/50 dark:text-gelwo-gray block font-mono mt-1">
                              {new Date(q.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Breakdown Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                          <div className="p-3 bg-gelwo-blush dark:bg-gelwo-royal rounded-xl">
                            <span className="text-gelwo-midnight/50 dark:text-gelwo-gray block text-[10px]">CLIENT TYPE</span>
                            <span className="font-bold text-gelwo-midnight dark:text-gelwo-ivory">{q.clientType}</span>
                          </div>
                          <div className="p-3 bg-gelwo-blush dark:bg-gelwo-royal rounded-xl">
                            <span className="text-gelwo-midnight/50 dark:text-gelwo-gray block text-[10px]">SUB-SERVICE</span>
                            <span className="font-bold text-gelwo-midnight dark:text-gelwo-ivory">{q.subCategory || 'Standard Deployment'}</span>
                          </div>
                          <div className="p-3 bg-gelwo-blush dark:bg-gelwo-royal rounded-xl">
                            <span className="text-gelwo-midnight/50 dark:text-gelwo-gray block text-[10px]">DELIVERY WINDOW</span>
                            <span className="font-bold text-gelwo-sage">3 - 14 Days</span>
                          </div>
                          <div className="p-3 bg-gelwo-blush dark:bg-gelwo-royal rounded-xl">
                            <span className="text-gelwo-midnight/50 dark:text-gelwo-gray block text-[10px]">TOTAL ESTIMATE</span>
                            <span className="font-bold text-gelwo-purple text-sm">{q.estimatedCost}</span>
                          </div>
                        </div>

                        {/* Action Triggers */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            onClick={() => downloadQuotationPDF(q)}
                            className="px-4 py-2.5 rounded-xl btn-secondary text-xs font-bold flex items-center space-x-2"
                          >
                            <FiDownload />
                            <span>Download Official PDF</span>
                          </button>

                          {q.status !== 'Approved' && (
                            <button
                              onClick={() => handleStatusChange(q.id, 'Approved')}
                              className="px-5 py-2.5 rounded-xl btn-primary text-xs font-bold"
                            >
                              ✓ Accept &amp; Commission Project
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Invoices, Receipts & Delivery Notes */}
            {activeTab === 'documents' && (
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/30 space-y-6">
                <div className="flex justify-between items-center border-b border-gelwo-gray dark:border-gelwo-royal pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-heading uppercase">
                      Official Invoices, Receipts &amp; Delivery Notes
                    </h3>
                    <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray mt-0.5">
                      Issued directly by GELWO Finance and Logistics Desk.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-gelwo-sage">{documents.length} Available</span>
                </div>

                {documents.length === 0 ? (
                  <p className="text-xs font-mono text-center py-8 text-gelwo-midnight/60 dark:text-gelwo-gray">
                    No official documents have been issued to your account yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-5 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 space-y-4"
                      >
                        <div className="flex flex-wrap justify-between items-start gap-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="px-2.5 py-0.5 rounded bg-gelwo-purple/15 text-gelwo-purple font-mono font-bold text-[11px] uppercase">
                                {doc.docType.replace('_', ' ')}
                              </span>
                              <span className="text-xs font-mono font-bold text-gelwo-sage">
                                {doc.docNumber}
                              </span>
                            </div>
                            <h4 className="font-bold text-base font-heading mt-1">{doc.organization || doc.customerName}</h4>
                            <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray">
                              Date: {new Date(doc.issueDate).toLocaleDateString()} {doc.deliveryAddress ? `• Delivery: ${doc.deliveryAddress}` : ''}
                            </p>
                          </div>

                          <div className="text-right">
                            <span className="text-lg font-bold font-mono text-gelwo-purple block">
                              KES {doc.totalAmount.toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 font-mono font-bold text-[10px]">
                              {doc.status}
                            </span>
                          </div>
                        </div>

                        {/* Line items preview */}
                        <div className="border-t border-gelwo-gray/60 dark:border-gelwo-royal/60 pt-3 text-xs space-y-1.5 font-mono">
                          {doc.items.map((it, i) => (
                            <div key={i} className="flex justify-between text-gelwo-midnight/80 dark:text-gelwo-gray">
                              <span>• {it.description} (x{it.quantity})</span>
                              <span>KES {it.total.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => downloadDocumentPDF(doc)}
                            className="px-4 py-2 rounded-xl btn-primary text-xs font-bold font-mono flex items-center space-x-1.5"
                          >
                            <FiDownload />
                            <span>Download Official {doc.docType.toUpperCase().replace('_', ' ')}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Active Projects */}
            {activeTab === 'projects' && (
              <div className="glass-card p-8 rounded-3xl border border-gelwo-purple/30 space-y-6">
                <h3 className="text-xl font-bold font-heading uppercase">Active Project Milestones</h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm">Enterprise Hospital Management System Deployment</h4>
                      <span className="text-xs font-mono font-bold text-gelwo-sage">75% Completed</span>
                    </div>
                    <div className="w-full bg-gelwo-gray dark:bg-gelwo-midnight h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-gelwo-purple to-gelwo-sage h-full w-3/4" />
                    </div>
                    <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                      Phase 3: Database migration &amp; staff biometric hardware synchronization in progress.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
