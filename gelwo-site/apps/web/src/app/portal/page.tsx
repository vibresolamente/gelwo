'use client';

/**
 * /portal — GELWO Customer Digital Portal & Enterprise Workspace
 * Strictly built to match the GELWO Digital Ecosystem specification.
 * Features:
 * 1. Customer Dashboard with Quick Actions, Activity Counters, Active Project Milestones & Recent Orders
 * 2. Shop Marketplace with Category Filter, Stock Badges, Ratings & Detailed Product Modal
 * 3. Configurable Services Marketplace with Dynamic Quotation Engine
 * 4. Quotation -> Order -> Invoice -> Payment -> Delivery Pipeline
 * 5. Dual Tracking System (Product Parcel Logistics vs. Project Milestone Delivery)
 * 6. Dedicated Project Workspace (Timeline, Team, Files, Live Messages)
 * 7. Document Vault (Quotations, Invoices, Receipts, Delivery Notes, eTIMS Reports, Contracts)
 * 8. Threaded Communication Center & Help Desk
 * 9. Account & Security Management
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
  OfficialDocument,
  fetchPublicProducts,
  ProductItem,
  fetchCustomerOrders,
  createProductOrder,
  ProductOrder,
  fetchClientProjects,
  addProjectMessage,
  ClientProject,
  saveQuotation,
} from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiShoppingBag,
  FiTool,
  FiBox,
  FiFileText,
  FiCreditCard,
  FiTruck,
  FiLayers,
  FiMessageSquare,
  FiHeart,
  FiBell,
  FiUser,
  FiHelpCircle,
  FiDownload,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiSearch,
  FiChevronRight,
  FiPlus,
  FiX,
  FiEye,
  FiSend,
  FiPaperclip,
  FiShield,
  FiCpu,
  FiPhone,
  FiMail,
  FiMapPin,
  FiLock,
  FiLogOut,
  FiCheck,
  FiStar,
} from 'react-icons/fi';

type PortalTab =
  | 'dashboard'
  | 'shop'
  | 'services'
  | 'orders'
  | 'quotations'
  | 'invoices'
  | 'track'
  | 'projects'
  | 'messages'
  | 'documents'
  | 'wishlist'
  | 'account'
  | 'support';

export default function CustomerPortalPage() {
  const { currentUser, loginUser, registerUser, logoutUser, addToCart, triggerQuotationModal } = useApp();

  // Auth Overlay State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Navigation Tab
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Data Stores
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [quotations, setQuotations] = useState<QuotationRecord[]>([]);
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod_1', 'prod_2']);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [productQty, setProductQty] = useState(1);

  // Shop Filters
  const [shopCategory, setShopCategory] = useState<string>('All Products');
  const [shopSearch, setShopSearch] = useState('');

  // Service Configurator State
  const [cfgService, setCfgService] = useState('Website & Digital Platform');
  const [cfgScope, setCfgScope] = useState('Medium');
  const [cfgUsers, setCfgUsers] = useState('50');
  const [cfgDeadline, setCfgDeadline] = useState('2026-09-30');
  const [cfgFeatures, setCfgFeatures] = useState<{ [key: string]: boolean }>({
    'M-Pesa & Card Payments': true,
    'SMS Notifications': true,
    'Email Dispatch': true,
    'Admin Command Center': true,
    'Customer Self-Service Portal': true,
    'AI Quotation Engine': false,
    'Advanced Analytics': true,
    'KRA eTIMS Compliance': true,
  });

  // Tracking Search
  const [trackQuery, setTrackQuery] = useState('GL-2026-00142');
  const [trackMode, setTrackMode] = useState<'order' | 'project'>('order');

  // Project Discussion input
  const [chatMessage, setChatMessage] = useState('');

  // Document Vault filter
  const [docCategory, setDocCategory] = useState<string>('all');

  // Load Data
  useEffect(() => {
    async function loadAllData() {
      const [prods, ords, quotes, docs, projs] = await Promise.all([
        fetchPublicProducts(),
        fetchCustomerOrders(currentUser?.email),
        fetchUserQuotations(currentUser?.email),
        fetchOfficialDocuments(currentUser?.email),
        fetchClientProjects(currentUser?.email),
      ]);
      setProducts(prods);
      setOrders(ords);
      setQuotations(quotes);
      setDocuments(docs);
      setProjects(projs);
    }
    loadAllData();
  }, [currentUser]);

  const notifySuccess = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  // ── Auth Handlers ──────────────────────────────────────────────────────────
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    const res = await loginUser(email, password);
    setAuthLoading(false);
    if (res.error) setAuthError(res.error);
    else notifySuccess(`Welcome back, ${res.user?.fullName}!`);
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
    if (res.error) setAuthError(res.error);
    else notifySuccess(`Account created successfully! Welcome to GELWO, ${fullName}!`);
  };

  // ── Quotation Actions ──────────────────────────────────────────────────────
  const handleQuotationAction = async (quoteId: string, status: QuotationRecord['status']) => {
    await updateQuotationStatus(quoteId, status);
    const updated = await fetchUserQuotations(currentUser?.email);
    setQuotations(updated);
    notifySuccess(`Quotation status updated to: ${status}`);
  };

  const handleCreateQuotationFromConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeFeats = Object.keys(cfgFeatures).filter((k) => cfgFeatures[k]);
    const baseVal = cfgScope === 'Small' ? 120000 : cfgScope === 'Medium' ? 280000 : cfgScope === 'Large' ? 550000 : 950000;
    const featsCost = activeFeats.length * 35000;
    const est = baseVal + featsCost;

    const res = await saveQuotation({
      customerName: currentUser?.fullName || 'Eng. Client',
      customerEmail: currentUser?.email || 'client@gelwo.co.ke',
      customerPhone: currentUser?.phone || '+254 700 000 000',
      organization: currentUser?.companyName || 'Institutional Client',
      serviceCategory: 'Software Development & Digital Solutions',
      subCategory: cfgService,
      scopeSize: cfgScope,
      clientType: 'Corporate / Institutional',
      estimatedCost: `KES ${est.toLocaleString()}`,
      details: {
        users: cfgUsers,
        deadline: cfgDeadline,
        selectedFeatures: activeFeats,
      },
    });

    if (res.quotation) {
      const refreshed = await fetchUserQuotations(currentUser?.email);
      setQuotations(refreshed);
      notifySuccess(`Quotation ${res.quotation.refNumber} submitted! Estimated: KES ${est.toLocaleString()}`);
      setActiveTab('quotations');
    }
  };

  // ── Order / Buy Product ────────────────────────────────────────────────────
  const handleDirectBuy = async (product: ProductItem) => {
    const subtotal = product.price * productQty;
    const tax = subtotal * 0.16;
    const newOrd = await createProductOrder({
      customerId: currentUser?.id || 'cust_demo',
      customerName: currentUser?.fullName || 'Eng. Client',
      customerEmail: currentUser?.email || 'client@gelwo.co.ke',
      customerPhone: currentUser?.phone || '+254 797 829 911',
      deliveryAddress: currentUser?.address || 'Nairobi Central Office, Kenya',
      items: [
        {
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: productQty,
          image: product.mainImage,
        },
      ],
      subtotal,
      tax,
      shipping: 2000,
      total: subtotal + tax + 2000,
      paymentMethod: 'M-PESA',
      paymentStatus: 'Paid',
      trackingStep: 'processing',
      driverName: 'James Otieno (Logistics Driver)',
      driverPhone: '+254 711 998 877',
      vehicleReg: 'KDC 219B',
      deliveryDate: 'Within 48 Hours',
      trackingHistory: [
        { status: 'Placed', title: 'Order Placed', description: 'Order recorded on Customer Portal', time: 'Just now', completed: true },
        { status: 'Paid', title: 'Payment Confirmed', description: 'M-PESA transaction verified', time: 'Just now', completed: true },
        { status: 'Processing', title: 'Warehouse Packing', description: 'Item queued for dispatch', time: 'In progress', completed: true },
        { status: 'Dispatched', title: 'Transit Handover', description: 'Awaiting dispatch vehicle', time: 'Pending', completed: false },
        { status: 'Delivered', title: 'Final Handover', description: 'Delivery note sign-off', time: 'Pending', completed: false },
      ],
    });

    const refreshedOrders = await fetchCustomerOrders(currentUser?.email);
    setOrders(refreshedOrders);
    setSelectedProduct(null);
    notifySuccess(`Order ${newOrd.orderNumber} placed successfully! Tracking is live.`);
    setActiveTab('orders');
  };

  // ── Wishlist Toggle ────────────────────────────────────────────────────────
  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // ── Send Project Message ───────────────────────────────────────────────────
  const handleSendMessage = async (projectId: string) => {
    if (!chatMessage.trim()) return;
    await addProjectMessage(projectId, {
      text: chatMessage,
      sender: currentUser?.fullName || 'Eng. Client',
      isClient: true,
    });
    const refreshedProjs = await fetchClientProjects(currentUser?.email);
    setProjects(refreshedProjs);
    setChatMessage('');
    notifySuccess('Message sent to GELWO Project Manager!');
  };

  // ── Download Document PDF Simulator ────────────────────────────────────────
  const downloadDocument = (doc: OfficialDocument) => {
    const lines = [
      '=========================================================================',
      `GELWO TECHNOLOGIES LIMITED — OFFICIAL CERTIFIED DOCUMENT`,
      `DOCUMENT TYPE:   ${doc.docType.toUpperCase()}`,
      `DOCUMENT NO:     ${doc.docNumber}`,
      `ISSUE DATE:      ${doc.issueDate}`,
      `CLIENT:          ${doc.customerName} (${doc.organization || 'Corporate Client'})`,
      `EMAIL:           ${doc.customerEmail}`,
      `PHONE:           ${doc.customerPhone || 'N/A'}`,
      `STATUS:          ${doc.status}`,
      '=========================================================================',
      'LINE ITEMS BREAKDOWN:',
      ...doc.items.map((it, idx) => ` [${idx + 1}] ${it.description} — Qty: ${it.quantity} x KES ${it.unitPrice.toLocaleString()} = KES ${it.total.toLocaleString()}`),
      '-------------------------------------------------------------------------',
      `SUBTOTAL:        KES ${doc.subtotal.toLocaleString()}`,
      `VAT (16%):       KES ${doc.vatAmount.toLocaleString()}`,
      `TOTAL AMOUNT:    KES ${doc.totalAmount.toLocaleString()}`,
      '=========================================================================',
      `NOTES / COMPLIANCE: ${doc.notes || 'Official GELWO certified document.'}`,
      '=========================================================================',
      'GELWO Technologies Ltd • Building Tomorrow’s Solutions Today',
      'eTIMS Registered • Tax Compliant • info@gelwo.co.ke • www.gelwo.co.ke',
      '=========================================================================',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.docNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    notifySuccess(`Downloaded ${doc.docNumber}`);
  };

  const activeProject = projects[0];
  const recentOrder = orders[0];

  return (
    <div className="min-h-screen bg-[#070B19] text-[#F1F5F9] font-sans flex flex-col selection:bg-[#3B82F6] selection:text-white">
      {/* ── AUTH OVERLAY IF NOT LOGGED IN ───────────────────────────────────── */}
      {!currentUser && (
        <div className="fixed inset-0 bg-[#070B19]/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0D1225] border border-[#1E293B] rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 text-2xl font-extrabold bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                GELWO DIGITAL PORTAL
              </div>
              <p className="text-xs text-[#94A3B8] tracking-widest uppercase mt-1">Customer Self-Service Ecosystem</p>
            </div>

            <div className="flex bg-[#111827] rounded-xl p-1 mb-6 border border-[#1E293B]">
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'login' ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-lg' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'register' ? 'bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white shadow-lg' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl text-xs text-[#EF4444] flex items-center gap-2">
                <FiAlertCircle />
                <span>{authError}</span>
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#94A3B8] font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@institution.go.ke"
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#94A3B8] font-bold mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-4 py-3 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] rounded-xl text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  {authLoading ? <FiClock className="animate-spin" /> : <FiLock />}
                  <span>Sign In to Customer Workspace</span>
                </button>
                <div className="text-center text-[11px] text-[#64748B]">
                  Demo: Use <b>client@institution.go.ke</b> or register a new client profile.
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#94A3B8] font-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Eng. John Doe"
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-[#94A3B8] font-bold mb-1">Company / Entity</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ministry of Energy"
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#94A3B8] font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@organization.com"
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#94A3B8] font-bold mb-1">Phone Number (for SMS &amp; M-Pesa)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 797 829 911"
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#94A3B8] font-bold mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-xl text-xs font-extrabold uppercase tracking-wider text-white shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2 mt-2"
                >
                  <FiCheckCircle />
                  <span>Register &amp; Open Portal</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* ── TOAST NOTIFICATIONS ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {actionSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-[10000] bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold"
          >
            <FiCheckCircle className="text-lg" />
            <span>{actionSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 min-h-screen">
        {/* ── 1. CUSTOMER PORTAL SIDEBAR ────────────────────────────────────── */}
        <aside className="w-64 bg-[#0D1225] border-r border-[#1E293B] flex flex-col fixed inset-y-0 left-0 z-30 overflow-y-auto">
          <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                GELWO
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold">Customer Portal</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
              Live
            </span>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {/* Core Section */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 py-1.5 tracking-wider">Workspace</div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiHome className="text-sm" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('shop')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'shop' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiShoppingBag className="text-sm" />
              <span>Shop &amp; Products</span>
              <span className="ml-auto text-[10px] bg-[#3B82F6]/20 px-1.5 py-0.5 rounded-md font-mono text-[#3B82F6]">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'services' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiTool className="text-sm" />
              <span>Services Marketplace</span>
            </button>

            {/* Operations Section */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 pt-4 pb-1.5 tracking-wider">My Activities</div>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'orders' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiBox className="text-sm" />
              <span>My Orders</span>
              <span className="ml-auto text-[10px] bg-[#10B981]/20 px-1.5 py-0.5 rounded-md font-mono text-[#10B981]">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('quotations')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'quotations' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiFileText className="text-sm" />
              <span>My Quotations</span>
              <span className="ml-auto text-[10px] bg-[#F59E0B]/20 px-1.5 py-0.5 rounded-md font-mono text-[#F59E0B]">{quotations.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'invoices' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiCreditCard className="text-sm" />
              <span>My Invoices</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'track' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiTruck className="text-sm" />
              <span>Track Delivery</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'projects' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiLayers className="text-sm" />
              <span>My Projects</span>
              <span className="ml-auto text-[10px] bg-[#8B5CF6]/20 px-1.5 py-0.5 rounded-md font-mono text-[#8B5CF6]">{projects.length}</span>
            </button>

            {/* Document & Communication Section */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 pt-4 pb-1.5 tracking-wider">Vault &amp; Connect</div>
            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'documents' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiFileText className="text-sm" />
              <span>Document Vault</span>
              <span className="ml-auto text-[10px] bg-[#3B82F6]/20 px-1.5 py-0.5 rounded-md font-mono text-[#3B82F6]">{documents.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'messages' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiMessageSquare className="text-sm" />
              <span>Messages &amp; Desk</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'wishlist' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiHeart className="text-sm" />
              <span>Wishlist</span>
              <span className="ml-auto text-[10px] bg-[#EC4899]/20 px-1.5 py-0.5 rounded-md font-mono text-[#EC4899]">{wishlistIds.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'account' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiUser className="text-sm" />
              <span>My Account</span>
            </button>
          </nav>

          {/* User Footer Profile */}
          <div className="p-4 border-t border-[#1E293B] bg-[#111827]/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-xs font-bold">
                {currentUser?.fullName?.slice(0, 2).toUpperCase() || 'CL'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{currentUser?.fullName || 'Client'}</p>
                <p className="text-[10px] text-[#94A3B8] truncate">{currentUser?.companyName || 'Institutional Client'}</p>
              </div>
            </div>
            <button onClick={logoutUser} title="Sign Out" className="text-[#EF4444] hover:bg-[#EF4444]/10 p-2 rounded-lg transition-colors">
              <FiLogOut />
            </button>
          </div>
        </aside>

        {/* ── 2. MAIN PORTAL VIEWPORT ───────────────────────────────────────── */}
        <main className="ml-64 flex-1 flex flex-col min-w-0 bg-[#070B19]">
          {/* Topbar */}
          <header className="h-16 bg-[#0D1225]/80 backdrop-blur-md border-b border-[#1E293B] px-8 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="relative w-full">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search products, services, quotations, or projects..."
                  value={shopSearch}
                  onChange={(e) => setShopSearch(e.target.value)}
                  className="w-full bg-[#111827] border border-[#1E293B] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerQuotationModal()}
                className="px-3.5 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-lg hover:opacity-95 transition-opacity"
              >
                <FiCpu />
                <span>Instant AI Cost Estimate</span>
              </button>

              <button
                onClick={() => setActiveTab('shop')}
                className="p-2.5 bg-[#111827] border border-[#1E293B] rounded-xl text-[#94A3B8] hover:text-white relative"
              >
                <FiShoppingBag />
              </button>

              <div className="px-3 py-1.5 bg-[#111827] border border-[#1E293B] rounded-xl text-[11px] font-semibold text-[#94A3B8]">
                <span className="text-[#10B981] mr-1.5">●</span>
                <span>KRA eTIMS Active</span>
              </div>
            </div>
          </header>

          {/* Dynamic Content Panel */}
          <div className="p-8 flex-1 overflow-y-auto">
            {/* ── TAB 1: DASHBOARD ────────────────────────────────────────── */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Greeting & Welcome */}
                <div className="bg-gradient-to-r from-[#3B82F6]/15 via-[#6366F1]/10 to-transparent border border-[#3B82F6]/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-extrabold tracking-tight">
                        Good morning, {currentUser?.fullName || 'Griffin'} 👋
                      </h1>
                      <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
                        What would you like to accomplish with GELWO Technologies today? Track your orders, configure enterprise services, or review compliance documents.
                      </p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveTab('shop')}
                        className="px-4 py-2.5 bg-[#111827] hover:bg-[#3B82F6] border border-[#1E293B] hover:border-transparent rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <FiShoppingBag className="text-[#3B82F6]" />
                        <span>Shop Hardware</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('services')}
                        className="px-4 py-2.5 bg-[#111827] hover:bg-[#6366F1] border border-[#1E293B] hover:border-transparent rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <FiTool className="text-[#6366F1]" />
                        <span>Request Service</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('track')}
                        className="px-4 py-2.5 bg-[#111827] hover:bg-[#10B981] border border-[#1E293B] hover:border-transparent rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <FiTruck className="text-[#10B981]" />
                        <span>Track Delivery</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Activity Counters Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div
                    onClick={() => setActiveTab('orders')}
                    className="bg-[#111827] border border-[#1E293B] hover:border-[#3B82F6]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Active Orders</span>
                      <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] flex items-center justify-center text-sm font-bold">
                        <FiBox />
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold">{orders.length}</div>
                    <div className="text-[11px] text-[#10B981] mt-1 font-medium">1 Out for Delivery</div>
                  </div>

                  <div
                    onClick={() => setActiveTab('quotations')}
                    className="bg-[#111827] border border-[#1E293B] hover:border-[#F59E0B]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Quotations</span>
                      <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] flex items-center justify-center text-sm font-bold">
                        <FiFileText />
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold">{quotations.length}</div>
                    <div className="text-[11px] text-[#F59E0B] mt-1 font-medium">Approved &amp; Ready</div>
                  </div>

                  <div
                    onClick={() => setActiveTab('invoices')}
                    className="bg-[#111827] border border-[#1E293B] hover:border-[#10B981]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Invoices</span>
                      <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-sm font-bold">
                        <FiCreditCard />
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold">{documents.filter((d) => d.docType === 'invoice').length}</div>
                    <div className="text-[11px] text-[#10B981] mt-1 font-medium">1 Settled via M-Pesa</div>
                  </div>

                  <div
                    onClick={() => setActiveTab('projects')}
                    className="bg-[#111827] border border-[#1E293B] hover:border-[#8B5CF6]/50 rounded-2xl p-5 cursor-pointer transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">Active Projects</span>
                      <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center text-sm font-bold">
                        <FiLayers />
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold">{projects.length}</div>
                    <div className="text-[11px] text-[#8B5CF6] mt-1 font-medium">82% Overall Progress</div>
                  </div>
                </div>

                {/* Active Project Card & Recent Order Card Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Active Project Detail */}
                  <div className="lg:col-span-2 bg-[#111827] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                          <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Active Deployment Project</span>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30">
                          {activeProject?.status || 'On Track'}
                        </span>
                      </div>

                      <h2 className="text-lg font-extrabold text-white">
                        {activeProject?.title || 'Website & Digital Platform'}
                      </h2>
                      <p className="text-xs text-[#94A3B8] mt-1">
                        Contract Ref: {activeProject?.projectNumber || 'GL-PROJ-0021'} • Estimated Delivery: {activeProject?.estimatedCompletion || '28 Aug 2026'}
                      </p>

                      {/* Progress bar */}
                      <div className="mt-5">
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-[#94A3B8]">Overall Completion</span>
                          <span className="text-[#3B82F6]">{activeProject?.progressPercent || 82}%</span>
                        </div>
                        <div className="w-full bg-[#1E293B] h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] h-full rounded-full transition-all duration-500"
                            style={{ width: `${activeProject?.progressPercent || 82}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Milestones Stepper */}
                      <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {['Architecture', 'UI/UX Design', 'Development', 'Testing', 'eTIMS Review', 'Deployment'].map((step, idx) => (
                          <div key={step} className="text-center">
                            <div
                              className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1.5 ${
                                idx < 4
                                  ? 'bg-[#10B981] text-white shadow-md shadow-[#10B981]/30'
                                  : idx === 4
                                  ? 'bg-[#3B82F6] text-white ring-4 ring-[#3B82F6]/20'
                                  : 'bg-[#1E293B] text-[#64748B]'
                              }`}
                            >
                              {idx < 4 ? '✓' : idx + 1}
                            </div>
                            <span className="text-[10px] text-[#94A3B8] block leading-tight font-medium">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <div className="w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#111827]">
                            JG
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#111827]">
                            WK
                          </div>
                          <div className="w-7 h-7 rounded-full bg-[#10B981] flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#111827]">
                            EN
                          </div>
                        </div>
                        <span className="text-xs text-[#94A3B8]">3 Specialists Assigned</span>
                      </div>

                      <button
                        onClick={() => setActiveTab('projects')}
                        className="px-4 py-2 bg-[#1E293B] hover:bg-[#3B82F6] text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
                      >
                        <span>Open Workspace</span>
                        <FiChevronRight />
                      </button>
                    </div>
                  </div>

                  {/* Recent Order Summary */}
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Recent Hardware Order</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                          {recentOrder?.trackingStep === 'transit' ? '🚚 In Transit' : 'Processing'}
                        </span>
                      </div>

                      <div className="p-3 bg-[#0D1225] rounded-xl border border-[#1E293B] mb-4">
                        <p className="text-xs font-bold text-white truncate">{recentOrder?.items[0]?.productName || 'GELWO ICT Equipment'}</p>
                        <p className="text-xs text-[#10B981] font-mono font-bold mt-1">
                          KES {recentOrder?.total.toLocaleString() || '160,260'}
                        </p>
                      </div>

                      <div className="space-y-2 text-xs text-[#94A3B8]">
                        <div className="flex justify-between">
                          <span>Order Ref:</span>
                          <span className="font-mono text-white">{recentOrder?.orderNumber || 'GL-2026-00142'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Driver Assigned:</span>
                          <span className="text-white">{recentOrder?.driverName || 'Harrison (Van 02)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Address:</span>
                          <span className="text-white truncate max-w-[140px]">{recentOrder?.deliveryAddress || 'Nairobi County'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#1E293B]">
                      <button
                        onClick={() => setActiveTab('track')}
                        className="w-full py-2.5 bg-gradient-to-r from-[#10B981] to-[#059669] text-xs font-bold rounded-xl text-white flex items-center justify-center gap-1.5 shadow-lg"
                      >
                        <FiTruck />
                        <span>Live GPS Tracking</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 2: SHOP & PRODUCTS ─────────────────────────────────── */}
            {activeTab === 'shop' && (
              <div className="space-y-6">
                {/* Shop Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold">GELWO Digital Marketplace</h2>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Direct institutional hardware, Tier-1 solar systems, AI security terminals, and certified supplies.
                    </p>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'All Products',
                      'ICT Equipment',
                      'Solar',
                      'Office Stationery',
                      'Software Development',
                    ].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setShopCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          shopCategory === cat ? 'bg-[#3B82F6] text-white shadow-md' : 'bg-[#111827] text-[#94A3B8] hover:text-white border border-[#1E293B]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter((p) => (shopCategory === 'All Products' ? true : p.category === shopCategory))
                    .filter((p) => (!shopSearch ? true : p.name.toLowerCase().includes(shopSearch.toLowerCase()) || p.shortDescription.toLowerCase().includes(shopSearch.toLowerCase())))
                    .map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-[#111827] border border-[#1E293B] hover:border-[#3B82F6]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group"
                      >
                        {/* Image banner */}
                        <div className="h-48 relative overflow-hidden bg-[#0D1225]">
                          <img
                            src={prod.mainImage}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            onClick={() => toggleWishlist(prod.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0D1225]/80 backdrop-blur-sm flex items-center justify-center text-xs text-white hover:text-[#EC4899] transition-colors"
                          >
                            <FiHeart className={wishlistIds.includes(prod.id) ? 'fill-[#EC4899] text-[#EC4899]' : ''} />
                          </button>
                          <div className="absolute bottom-3 left-3 bg-[#0D1225]/90 px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#3B82F6] border border-[#1E293B]">
                            {prod.category}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between text-xs text-[#F59E0B] font-bold mb-1.5">
                              <div className="flex items-center gap-1">
                                <FiStar className="fill-[#F59E0B]" />
                                <span>{prod.rating}</span>
                                <span className="text-[#64748B] font-normal">({prod.reviewCount})</span>
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                prod.stock > 10 ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                              }`}>
                                {prod.stock > 10 ? '🟢 In Stock' : '⚠️ Low Stock'}
                              </span>
                            </div>

                            <h3 className="text-sm font-extrabold text-white line-clamp-1">{prod.name}</h3>
                            <p className="text-xs text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed">{prod.shortDescription}</p>
                          </div>

                          <div className="mt-5 pt-4 border-t border-[#1E293B] flex items-center justify-between">
                            <div>
                              <span className="text-[10px] uppercase text-[#64748B] font-bold block">Certified Price</span>
                              <span className="text-lg font-extrabold text-[#10B981] font-mono">
                                KES {prod.price.toLocaleString()}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedProduct(prod)}
                                className="p-2.5 bg-[#1E293B] hover:bg-[#3B82F6] text-white rounded-xl text-xs font-bold transition-colors"
                                title="View Specifications"
                              >
                                <FiEye />
                              </button>
                              <button
                                onClick={() => {
                                  addToCart({ id: prod.id, service: prod.name, details: prod.category, estimatedCost: `KES ${prod.price.toLocaleString()}` });
                                  notifySuccess(`Added ${prod.name} to Cart`);
                                }}
                                className="px-3.5 py-2.5 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ── TAB 3: SERVICES MARKETPLACE & CONFIGURATOR ──────────────── */}
            {activeTab === 'services' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full border border-[#3B82F6]/30">
                    Interactive Quotation Engine
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">Configurable Services Marketplace</h2>
                  <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto mt-2">
                    Build your custom technical solution. GELWO’s automated pricing algorithm analyzes materials, engineering labor, and timeline to generate an instant estimate.
                  </p>
                </div>

                <form onSubmit={handleCreateQuotationFromConfig} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8 space-y-6">
                  {/* Service Type Selection */}
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#94A3B8] mb-3">
                      1. Select Solution / Service Division
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        'Website & Digital Platform',
                        'Mobile Application (iOS/Android)',
                        'Enterprise ERP & KRA eTIMS System',
                        'Solar PV & Microgrid Installation',
                        'AI Biometrics & CCTV Surveillance',
                        'Network & Structured Cabling',
                        'Corporate Branding & Printing',
                        'Institutional Foodstuff Supplies',
                        'General Institutional Supplies',
                      ].map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setCfgService(srv)}
                          className={`p-3 rounded-xl text-xs font-bold text-left border transition-all ${
                            cfgService === srv
                              ? 'bg-[#3B82F6]/15 border-[#3B82F6] text-[#3B82F6] shadow-md'
                              : 'bg-[#0D1225] border-[#1E293B] text-[#94A3B8] hover:text-white'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scope & Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-[#94A3B8] mb-2">Project Scale</label>
                      <select
                        value={cfgScope}
                        onChange={(e) => setCfgScope(e.target.value)}
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                      >
                        <option value="Small">Small / Pilot Phase</option>
                        <option value="Medium">Medium / Standard Business</option>
                        <option value="Large">Large / Corporate Multi-Branch</option>
                        <option value="Enterprise">Enterprise / National Infrastructure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#94A3B8] mb-2">Concurrent Users / Capacity</label>
                      <input
                        type="number"
                        value={cfgUsers}
                        onChange={(e) => setCfgUsers(e.target.value)}
                        placeholder="e.g. 50"
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-[#94A3B8] mb-2">Required Delivery Deadline</label>
                      <input
                        type="date"
                        value={cfgDeadline}
                        onChange={(e) => setCfgDeadline(e.target.value)}
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                  </div>

                  {/* Feature Checkboxes */}
                  <div>
                    <label className="block text-xs uppercase font-bold text-[#94A3B8] mb-3">
                      2. Additional Modules &amp; Compliance Features
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.keys(cfgFeatures).map((feat) => (
                        <label
                          key={feat}
                          className="flex items-center gap-3 p-3 bg-[#0D1225] border border-[#1E293B] rounded-xl cursor-pointer hover:border-[#3B82F6]/50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={cfgFeatures[feat]}
                            onChange={(e) => setCfgFeatures({ ...cfgFeatures, [feat]: e.target.checked })}
                            className="w-4 h-4 rounded text-[#3B82F6] bg-[#111827] border-[#1E293B] focus:ring-0"
                          />
                          <span className="text-xs font-semibold text-white">{feat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Estimate Summary */}
                  <div className="p-6 bg-gradient-to-r from-[#3B82F6]/15 via-[#6366F1]/10 to-transparent border border-[#3B82F6]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#94A3B8] font-bold block">Estimated Project Cost Range</span>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981] font-mono mt-1">
                        {cfgScope === 'Small'
                          ? 'KES 180,000 – 250,000'
                          : cfgScope === 'Medium'
                          ? 'KES 380,000 – 520,000'
                          : cfgScope === 'Large'
                          ? 'KES 750,000 – 980,000'
                          : 'KES 1,450,000 – 2,200,000'}
                      </div>
                      <p className="text-[11px] text-[#94A3B8] mt-1">Includes SLA warranty, cloud setup, training, and certified tax documentation.</p>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3.5 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-xs font-extrabold uppercase tracking-wider text-white rounded-xl shadow-xl hover:opacity-95 transition-opacity whitespace-nowrap"
                    >
                      Request Formal Quotation →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── TAB 4: MY ORDERS ────────────────────────────────────────── */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold">My Orders</h2>
                    <p className="text-xs text-[#94A3B8]">Track your hardware deliveries and dispatch fulfillment status.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-4">
                        <div>
                          <span className="text-xs font-bold text-[#3B82F6] font-mono">{ord.orderNumber}</span>
                          <h3 className="text-sm font-extrabold text-white mt-0.5">{ord.items[0]?.productName}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-[#10B981] font-mono">
                            KES {ord.total.toLocaleString()}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                            {ord.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 pt-2">
                        {ord.trackingHistory.map((step, idx) => (
                          <div key={step.title} className="text-center p-2 rounded-xl bg-[#0D1225] border border-[#1E293B]">
                            <div
                              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[10px] font-bold mb-1 ${
                                step.completed ? 'bg-[#10B981] text-white' : 'bg-[#1E293B] text-[#64748B]'
                              }`}
                            >
                              {step.completed ? '✓' : idx + 1}
                            </div>
                            <p className="text-[10px] font-bold text-white truncate">{step.title}</p>
                            <span className="text-[8px] text-[#64748B] block truncate">{step.time}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 text-xs text-[#94A3B8]">
                        <span>Delivery Vehicle: <b className="text-white">{ord.vehicleReg || 'GELWO Van'}</b></span>
                        <button
                          onClick={() => {
                            setTrackQuery(ord.orderNumber);
                            setActiveTab('track');
                          }}
                          className="text-[#3B82F6] font-bold hover:underline"
                        >
                          View Full Tracking Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 5: MY QUOTATIONS ─────────────────────────────────────── */}
            {activeTab === 'quotations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold">My Quotations</h2>
                    <p className="text-xs text-[#94A3B8]">Review, accept, or download formal quotation proposals generated by the pricing engine.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                  >
                    <FiPlus />
                    <span>New Quotation Request</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {quotations.map((q) => (
                    <div key={q.id} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#3B82F6] font-mono">{q.refNumber}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#F59E0B]/15 text-[#F59E0B]">
                              {q.status}
                            </span>
                          </div>
                          <h3 className="text-base font-extrabold text-white mt-1">{q.subCategory || q.serviceCategory}</h3>
                          <p className="text-xs text-[#94A3B8]">Scope: {q.scopeSize} • Client: {q.organization || q.customerName}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] uppercase text-[#64748B] font-bold block">Estimated Value</span>
                          <span className="text-xl font-extrabold text-[#10B981] font-mono">{q.estimatedCost}</span>
                        </div>
                      </div>

                      <div className="p-4 bg-[#0D1225] rounded-xl border border-[#1E293B] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div>
                          <span className="text-[#64748B] block text-[10px]">Service Division</span>
                          <span className="font-semibold text-white">{q.serviceCategory}</span>
                        </div>
                        <div>
                          <span className="text-[#64748B] block text-[10px]">Requested Date</span>
                          <span className="font-semibold text-white">{new Date(q.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="text-[#64748B] block text-[10px]">Client Reference</span>
                          <span className="font-semibold text-white">{q.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-[#64748B] block text-[10px]">Tax &amp; Compliance</span>
                          <span className="font-semibold text-[#10B981]">eTIMS Compliant</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleQuotationAction(q.id, 'Approved')}
                            className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                          >
                            Accept Quotation
                          </button>
                          <button
                            onClick={() => handleQuotationAction(q.id, 'Under Review')}
                            className="px-4 py-2 bg-[#1E293B] hover:bg-[#3B82F6] text-xs font-bold text-white rounded-xl transition-colors"
                          >
                            Request Changes
                          </button>
                          <button
                            onClick={() => handleQuotationAction(q.id, 'Rejected')}
                            className="px-3 py-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-xs font-bold text-[#EF4444] rounded-xl transition-colors"
                          >
                            Decline
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            const blob = new Blob(
                              [
                                `GELWO TECHNOLOGIES LIMITED — OFFICIAL QUOTATION\nREF: ${q.refNumber}\nSERVICE: ${q.serviceCategory}\nSUB: ${q.subCategory}\nSCOPE: ${q.scopeSize}\nESTIMATE: ${q.estimatedCost}\nCLIENT: ${q.customerName} (${q.organization})\nSTATUS: ${q.status}`,
                              ],
                              { type: 'text/plain' }
                            );
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `Quotation_${q.refNumber}.txt`;
                            a.click();
                            notifySuccess(`Downloaded Quotation ${q.refNumber}`);
                          }}
                          className="px-4 py-2 bg-[#1E293B] hover:bg-[#3B82F6] text-xs font-bold text-white rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <FiDownload />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 6: MY INVOICES ───────────────────────────────────────── */}
            {activeTab === 'invoices' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">My Invoices &amp; Billing</h2>
                  <p className="text-xs text-[#94A3B8]">View issued invoices, make payments via M-Pesa or Bank, and retrieve certified receipts.</p>
                </div>

                <div className="space-y-4">
                  {documents
                    .filter((d) => d.docType === 'invoice')
                    .map((inv) => (
                      <div key={inv.id} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-4">
                          <div>
                            <span className="text-xs font-bold text-[#3B82F6] font-mono">{inv.docNumber}</span>
                            <h3 className="text-sm font-extrabold text-white mt-0.5">{inv.items[0]?.description}</h3>
                            <p className="text-xs text-[#94A3B8]">Issued: {inv.issueDate} • Due: {inv.dueDate || '30 Days'}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-extrabold text-[#10B981] font-mono">
                              KES {inv.totalAmount.toLocaleString()}
                            </span>
                            <span className="block text-[11px] font-bold text-[#10B981]">● {inv.status}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs text-[#94A3B8]">KRA eTIMS Validated • Electronic Tax Receipt Ready</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => downloadDocument(inv)}
                              className="px-4 py-2 bg-[#1E293B] hover:bg-[#3B82F6] text-xs font-bold text-white rounded-xl transition-colors flex items-center gap-1.5"
                            >
                              <FiDownload />
                              <span>Download Invoice</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ── TAB 7: TRACK DELIVERY ───────────────────────────────────── */}
            {activeTab === 'track' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-extrabold">Dual Tracking System</h2>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Kilimall-inspired parcel delivery tracking and engineering project milestone tracking.
                  </p>
                </div>

                {/* Track Search Bar */}
                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 flex gap-2">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                    <input
                      type="text"
                      placeholder="Enter Order Number (e.g. GL-2026-00142) or Project Number..."
                      value={trackQuery}
                      onChange={(e) => setTrackQuery(e.target.value)}
                      className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <button
                    onClick={() => notifySuccess(`Found tracking details for ${trackQuery}`)}
                    className="px-6 py-3 bg-[#3B82F6] text-xs font-bold rounded-xl text-white shadow-md hover:bg-[#2563EB]"
                  >
                    Track
                  </button>
                </div>

                {/* Tracking Selector Mode */}
                <div className="flex bg-[#111827] rounded-xl p-1 border border-[#1E293B]">
                  <button
                    onClick={() => setTrackMode('order')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      trackMode === 'order' ? 'bg-[#3B82F6] text-white shadow-md' : 'text-[#94A3B8]'
                    }`}
                  >
                    📦 Product Order Logistics
                  </button>
                  <button
                    onClick={() => setTrackMode('project')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                      trackMode === 'project' ? 'bg-[#8B5CF6] text-white shadow-md' : 'text-[#94A3B8]'
                    }`}
                  >
                    🏗️ Service / Project Milestones
                  </button>
                </div>

                {/* Tracking Display Card */}
                {trackMode === 'order' ? (
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#3B82F6]">ORDER #{trackQuery}</span>
                        <h3 className="text-base font-extrabold text-white mt-1">GELWO ICT &amp; Biometric Hardware</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                        🚚 Out For Delivery
                      </span>
                    </div>

                    {/* Stepper Timeline */}
                    <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#1E293B]">
                      {[
                        { title: 'Order Placed', desc: 'Order confirmed and registered in GELWO warehouse', time: '26 Aug, 08:30 AM', done: true },
                        { title: 'Payment Confirmed', desc: 'M-PESA / Wire transaction verified by Finance Desk', time: '26 Aug, 08:32 AM', done: true },
                        { title: 'Processing & Quality Assurance', desc: 'Hardware serialized and warranty registered', time: '26 Aug, 10:15 AM', done: true },
                        { title: 'Packed & Dispatched', desc: 'Departed Nairobi Distribution Hub via Van KDF 492X', time: '26 Aug, 01:20 PM', done: true },
                        { title: 'In Transit', desc: 'Driver Harrison is currently in transit to recipient address', time: 'Today 02:45 PM', done: true, current: true },
                        { title: 'Delivered', desc: 'Customer signature on Delivery Note DN-2026-00041', time: 'Estimated 04:30 PM', done: false },
                      ].map((st, i) => (
                        <div key={st.title} className="flex items-start gap-4 relative z-10">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              st.done
                                ? 'bg-[#10B981] text-white ring-4 ring-[#10B981]/20'
                                : st.current
                                ? 'bg-[#3B82F6] text-white ring-4 ring-[#3B82F6]/30'
                                : 'bg-[#1E293B] text-[#64748B]'
                            }`}
                          >
                            {st.done ? '✓' : i + 1}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{st.title}</p>
                            <p className="text-[11px] text-[#94A3B8] mt-0.5">{st.desc}</p>
                            <span className="text-[9px] text-[#64748B] font-mono mt-1 block">{st.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between border-b border-[#1E293B] pb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#8B5CF6]">PROJECT #GL-PROJ-0021</span>
                        <h3 className="text-base font-extrabold text-white mt-1">Enterprise Digital Platform</h3>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30">
                        82% Completed
                      </span>
                    </div>

                    <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#1E293B]">
                      {[
                        { title: '1. Requirements & Architecture', desc: 'System scope and architecture signed off', done: true },
                        { title: '2. UI/UX Design System', desc: 'High fidelity interactive prototypes approved', done: true },
                        { title: '3. Full-Stack Development', desc: 'Next.js, Supabase, and core API modules built', done: true },
                        { title: '4. Testing & Security Review', desc: 'Penetration testing and eTIMS validation', done: true, current: true },
                        { title: '5. Production Deployment', desc: 'Live server provisioning and domain setup', done: false },
                        { title: '6. Handover & SLA Support', desc: 'Staff training and final handover', done: false },
                      ].map((st, i) => (
                        <div key={st.title} className="flex items-start gap-4 relative z-10">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              st.done
                                ? 'bg-[#8B5CF6] text-white ring-4 ring-[#8B5CF6]/20'
                                : st.current
                                ? 'bg-[#3B82F6] text-white ring-4 ring-[#3B82F6]/30'
                                : 'bg-[#1E293B] text-[#64748B]'
                            }`}
                          >
                            {st.done ? '✓' : i + 1}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{st.title}</p>
                            <p className="text-[11px] text-[#94A3B8] mt-0.5">{st.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── TAB 8: MY PROJECTS WORKSPACE ────────────────────────────── */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">My Projects Workspace</h2>
                  <p className="text-xs text-[#94A3B8]">Dedicated workspace for engineering and software development projects with real-time files and messaging.</p>
                </div>

                {projects.map((proj) => (
                  <div key={proj.id} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-6">
                    {/* Top status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#3B82F6]">{proj.projectNumber}</span>
                        <h3 className="text-lg font-extrabold text-white">{proj.title}</h3>
                        <p className="text-xs text-[#94A3B8]">{proj.serviceType} • Value: KES {proj.valueKES.toLocaleString()}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#10B981]">Status: {proj.status}</span>
                          <span className="block text-[11px] text-[#94A3B8]">{proj.progressPercent}% Complete</span>
                        </div>
                        <div className="w-12 h-12 rounded-full border-4 border-[#3B82F6] flex items-center justify-center text-xs font-extrabold font-mono">
                          {proj.progressPercent}%
                        </div>
                      </div>
                    </div>

                    {/* Team & Files Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Team & Files */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider">Assigned GELWO Engineering Team</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {proj.team.map((m) => (
                            <div key={m.name} className="p-3 bg-[#0D1225] border border-[#1E293B] rounded-xl text-center">
                              <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-xs font-bold mb-1.5">
                                {m.avatar}
                              </div>
                              <p className="text-xs font-bold text-white truncate">{m.name}</p>
                              <span className="text-[10px] text-[#94A3B8] block truncate">{m.role}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider pt-2">Project Documents &amp; Files</h4>
                        <div className="space-y-2">
                          {proj.files.map((f) => (
                            <div key={f.name} className="flex items-center justify-between p-3 bg-[#0D1225] border border-[#1E293B] rounded-xl">
                              <div className="flex items-center gap-3">
                                <FiFileText className="text-[#3B82F6]" />
                                <div>
                                  <p className="text-xs font-bold text-white">{f.name}</p>
                                  <span className="text-[10px] text-[#64748B]">{f.size}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => notifySuccess(`Downloading ${f.name}`)}
                                className="p-2 bg-[#111827] hover:bg-[#3B82F6] text-white rounded-lg text-xs transition-colors"
                              >
                                <FiDownload />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Discussion Center */}
                      <div className="bg-[#0D1225] border border-[#1E293B] rounded-xl p-4 flex flex-col h-[320px]">
                        <h4 className="text-xs uppercase font-bold text-[#94A3B8] tracking-wider mb-3">Project Discussion Center</h4>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                          {proj.messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={`p-3 rounded-xl text-xs max-w-[85%] ${
                                msg.isClient
                                  ? 'ml-auto bg-gradient-to-r from-[#3B82F6] to-[#6366F1] text-white rounded-tr-none'
                                  : 'bg-[#111827] border border-[#1E293B] text-white rounded-tl-none'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 font-bold">
                                <span>{msg.sender}</span>
                                <span>{msg.time}</span>
                              </div>
                              <p className="leading-relaxed">{msg.text}</p>
                            </div>
                          ))}
                        </div>

                        <div className="pt-3 border-t border-[#1E293B] flex gap-2">
                          <input
                            type="text"
                            placeholder="Type a message or request to the project engineer..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(proj.id)}
                            className="flex-1 bg-[#111827] border border-[#1E293B] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#3B82F6]"
                          />
                          <button
                            onClick={() => handleSendMessage(proj.id)}
                            className="px-4 py-2 bg-[#3B82F6] text-white rounded-xl text-xs font-bold hover:bg-[#2563EB]"
                          >
                            <FiSend />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── TAB 9: MESSAGES & SUPPORT DESK ──────────────────────────── */}
            {activeTab === 'messages' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">Customer Communication &amp; Support Desk</h2>
                  <p className="text-xs text-[#94A3B8]">Direct line to GELWO Customer Support, Technical Engineers, and Billing Officers.</p>
                </div>

                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-4">
                  <div className="p-4 bg-[#0D1225] border border-[#1E293B] rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Emergency Engineering Hotline</h4>
                      <p className="text-xs text-[#94A3B8]">24/7 Service Support for Solar, Biometric, and Server Outages</p>
                    </div>
                    <a
                      href="tel:+254797829911"
                      className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <FiPhone />
                      <span>Call +254 797 829 911</span>
                    </a>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs uppercase font-bold text-[#94A3B8]">Send Support Ticket / Inquiry</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your inquiry, request, or support issue in detail..."
                      className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-4 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6]"
                    ></textarea>
                    <button
                      onClick={() => notifySuccess('Support ticket submitted! Ticket #GL-TKT-0892 created.')}
                      className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#6366F1] rounded-xl text-xs font-bold text-white shadow-md hover:opacity-90"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 10: DOCUMENT VAULT ──────────────────────────────────── */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold">My Document Vault</h2>
                    <p className="text-xs text-[#94A3B8]">All invoices, receipts, delivery notes, eTIMS compliance reports, and contracts in one certified repository.</p>
                  </div>

                  {/* Document Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    {['all', 'invoice', 'receipt', 'delivery_note', 'etims_report'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setDocCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          docCategory === cat ? 'bg-[#3B82F6] text-white' : 'bg-[#111827] text-[#94A3B8] border border-[#1E293B]'
                        }`}
                      >
                        {cat === 'all'
                          ? 'All Documents'
                          : cat === 'invoice'
                          ? 'Invoices'
                          : cat === 'receipt'
                          ? 'Receipts'
                          : cat === 'delivery_note'
                          ? 'Delivery Notes'
                          : 'eTIMS Reports'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Documents Table */}
                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D1225] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                        <tr>
                          <th className="p-4">Document Type</th>
                          <th className="p-4">Reference No</th>
                          <th className="p-4">Description</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B]">
                        {documents
                          .filter((d) => (docCategory === 'all' ? true : d.docType === docCategory))
                          .map((doc) => (
                            <tr key={doc.id} className="hover:bg-[#0D1225]/50 transition-colors">
                              <td className="p-4 font-bold capitalize text-white flex items-center gap-2">
                                <FiFileText className="text-[#3B82F6]" />
                                <span>{doc.docType.replace('_', ' ')}</span>
                              </td>
                              <td className="p-4 font-mono text-[#3B82F6] font-bold">{doc.docNumber}</td>
                              <td className="p-4 text-white max-w-[200px] truncate">{doc.items[0]?.description || 'Official Document'}</td>
                              <td className="p-4 text-[#94A3B8]">{doc.issueDate}</td>
                              <td className="p-4 font-mono font-bold text-[#10B981]">
                                {doc.totalAmount > 0 ? `KES ${doc.totalAmount.toLocaleString()}` : 'N/A'}
                              </td>
                              <td className="p-4">
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                                  {doc.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => downloadDocument(doc)}
                                  className="px-3 py-1.5 bg-[#1E293B] hover:bg-[#3B82F6] text-white rounded-lg font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                                >
                                  <FiDownload />
                                  <span>Download</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 11: WISHLIST ────────────────────────────────────────── */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">My Saved Hardware Wishlist</h2>
                  <p className="text-xs text-[#94A3B8]">Items bookmarked for future institutional procurement.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter((p) => wishlistIds.includes(p.id))
                    .map((p) => (
                      <div key={p.id} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 flex flex-col justify-between">
                        <div>
                          <img src={p.mainImage} alt={p.name} className="w-full h-36 object-cover rounded-xl mb-3" />
                          <h3 className="text-sm font-extrabold text-white">{p.name}</h3>
                          <p className="text-xs text-[#10B981] font-mono font-bold mt-1">KES {p.price.toLocaleString()}</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => {
                              addToCart({ id: p.id, service: p.name, details: p.category, estimatedCost: `KES ${p.price.toLocaleString()}` });
                              notifySuccess(`Added ${p.name} to Cart`);
                            }}
                            className="flex-1 py-2 bg-[#3B82F6] rounded-xl text-xs font-bold text-white text-center"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-2 bg-[#EF4444]/10 text-[#EF4444] rounded-xl text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ── TAB 12: MY ACCOUNT ──────────────────────────────────────── */}
            {activeTab === 'account' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">Customer Account &amp; Organization Profile</h2>
                  <p className="text-xs text-[#94A3B8]">Manage your corporate details, delivery locations, and security settings.</p>
                </div>

                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#94A3B8] mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.fullName || 'Eng. John Doe'}
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#94A3B8] mb-1">Organization / Ministry</label>
                      <input
                        type="text"
                        defaultValue={currentUser?.companyName || 'County Ministry of Health'}
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#94A3B8] mb-1">Email Address</label>
                      <input
                        type="email"
                        disabled
                        defaultValue={currentUser?.email || 'client@institution.go.ke'}
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-3 text-xs text-[#94A3B8] cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#94A3B8] mb-1">Official Phone</label>
                      <input
                        type="tel"
                        defaultValue={currentUser?.phone || '+254 797 829 911'}
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#94A3B8] mb-1">Default Delivery Address</label>
                    <input
                      type="text"
                      defaultValue={currentUser?.address || 'County HQ, Annex 4, Upper Hill, Nairobi'}
                      className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-3 text-xs text-white"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => notifySuccess('Profile settings updated successfully!')}
                      className="px-6 py-2.5 bg-[#3B82F6] text-xs font-bold text-white rounded-xl shadow-md"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── PRODUCT DETAIL MODAL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-[#070B19]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1225] border border-[#1E293B] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-2 bg-[#111827] text-[#94A3B8] hover:text-white rounded-full transition-colors"
              >
                <FiX />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProduct.mainImage}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-2xl border border-[#1E293B]"
                  />
                  <div className="mt-3 p-3 bg-[#111827] rounded-xl border border-[#1E293B] flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Stock Status:</span>
                    <span className="font-bold text-[#10B981]">🟢 In Stock ({selectedProduct.stock} units)</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#3B82F6] uppercase">{selectedProduct.category}</span>
                    <h2 className="text-xl font-extrabold text-white mt-1">{selectedProduct.name}</h2>
                    <p className="text-2xl font-extrabold text-[#10B981] font-mono mt-2">
                      KES {selectedProduct.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">{selectedProduct.description || selectedProduct.shortDescription}</p>

                    {/* Specs Table */}
                    <div className="mt-4 p-3 bg-[#111827] rounded-xl border border-[#1E293B] space-y-1.5 text-xs">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Official Specifications</span>
                      {Object.entries(selectedProduct.specifications || {}).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-[#94A3B8]">{k}:</span>
                          <span className="font-semibold text-white">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1E293B] flex items-center gap-3">
                    <div className="flex items-center border border-[#1E293B] rounded-xl bg-[#111827]">
                      <button
                        onClick={() => setProductQty((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-white font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold">{productQty}</span>
                      <button
                        onClick={() => setProductQty((q) => q + 1)}
                        className="px-3 py-2 text-white font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleDirectBuy(selectedProduct)}
                      className="flex-1 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-xs font-extrabold uppercase text-white rounded-xl shadow-lg"
                    >
                      Instant Buy &amp; Dispatch →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
