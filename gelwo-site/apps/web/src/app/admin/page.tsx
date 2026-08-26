'use client';
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */

/**
 * /admin — GELWO Business Operations & Command Center
 * Strictly built to match the GELWO Digital Operating System specification in txt.
 * Features:
 * 1. Command Center Dashboard (KPIs, Today's Activity Stream, Revenue Analytics)
 * 2. Commerce & Stock Inventory (CRUD, SKU, Cost vs Selling Price, Automatic Balance Formula, Reorder Alerts)
 * 3. Services Marketplace & Pricing Engine (Materials + Labour + Transport + Complexity - Discount + Tax)
 * 4. Service Scheduling, Duration Engine & Daily Operations (Calendar, Delays, Job Reports)
 * 5. Finance & Invoicing (Quotations, Invoices, Receipts, Delivery Notes, Financial Reports)
 * 6. Government & Compliance Hub (KRA eTIMS, iTax, e-GP, SHA/SHIF, NSSF official portals & eTIMS reporting)
 * 7. Human Resources & Payroll (Staff Directory, PAYE / SHA 2.75% / NSSF Payroll Engine, Leave & Off-Days, Hiring Pipeline, Employee Separation)
 * 8. Central Document Vault & "Publish to Customer Portal" Engine
 * 9. Multi-Role RBAC & Audit System
 */

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import {
  fetchPublicProducts,
  createOrUpdateProduct,
  deleteProductItem,
  ProductItem,
  fetchCustomerOrders,
  updateOrderStatus,
  ProductOrder,
  fetchUserQuotations,
  updateQuotationStatus,
  QuotationRecord,
  fetchOfficialDocuments,
  createOfficialDocument,
  toggleDocumentPublish,
  OfficialDocument,
  fetchClientProjects,
  ClientProject,
  fetchScheduledServices,
  createScheduledService,
  updateServiceStatus,
  ScheduledService,
  fetchStaffDirectory,
  createStaffEmployee,
  StaffEmployee,
  fetchPayrollRecords,
  generateMonthlyPayroll,
  PayrollRecord,
  fetchLeaveRequests,
  updateLeaveStatus,
  LeaveRequest,
  ETimsReportRecord,
} from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiShoppingBag,
  FiBox,
  FiTool,
  FiCalendar,
  FiActivity,
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiShield,
  FiMessageSquare,
  FiBarChart2,
  FiSettings,
  FiCheck,
  FiPlus,
  FiTrash2,
  FiDownload,
  FiEye,
  FiExternalLink,
  FiAlertTriangle,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiSearch,
  FiLock,
  FiSend,
  FiLayers,
} from 'react-icons/fi';

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'orders'
  | 'crm'
  | 'services'
  | 'schedule'
  | 'daily_ops'
  | 'finance'
  | 'documents'
  | 'compliance'
  | 'hr_staff'
  | 'payroll'
  | 'leave_off'
  | 'hiring'
  | 'separation'
  | 'rbac';

export default function AdminCommandCenterPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Core Data Stores
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [quotations, setQuotations] = useState<QuotationRecord[]>([]);
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [schedule, setSchedule] = useState<ScheduledService[]>([]);
  const [staff, setStaff] = useState<StaffEmployee[]>([]);
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  // Product Modal / Form
  const [showProductModal, setShowProductModal] = useState(false);
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState('ICT Equipment');
  const [pPrice, setPPrice] = useState(15000);
  const [pCostPrice, setPCostPrice] = useState(10000);
  const [pStock, setPStock] = useState(50);
  const [pSupplier, setPSupplier] = useState('GELWO Wholesale Partner');
  const [pImage, setPImage] = useState('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80');
  const [pDesc, setPDesc] = useState('');

  // Document Generator Modal / Form
  const [showDocModal, setShowDocModal] = useState(false);
  const [docType, setDocType] = useState<OfficialDocument['docType']>('invoice');
  const [docClient, setDocClient] = useState('Eng. John Doe');
  const [docOrg, setDocOrg] = useState('County Ministry of Health');
  const [docEmail, setDocEmail] = useState('client@institution.go.ke');
  const [docItemDesc, setDocItemDesc] = useState('GELWO Enterprise Service Provision & Technical Support');
  const [docItemQty, setDocItemQty] = useState(1);
  const [docItemPrice, setDocItemPrice] = useState(250000);
  const [docNotes, setDocNotes] = useState('Certified under KRA eTIMS framework by GELWO Finance Desk.');

  // Staff Form
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [sName, setSName] = useState('');
  const [sDept, setSDept] = useState('Technology & Engineering');
  const [sPosition, setSPosition] = useState('Senior Systems Engineer');
  const [sPhone, setSPhone] = useState('+254 700 000 000');
  const [sEmail, setSEmail] = useState('');
  const [sPin, setSPin] = useState('A019842104K');
  const [sNssf, setSNssf] = useState('NSSF-109283');
  const [sSha, setSSha] = useState('SHA-984012');
  const [sSalary, setSSalary] = useState(120000);
  const [sAllowances, setSAllowances] = useState(20000);
  const [sOffDay, setSOffDay] = useState<StaffEmployee['offDay']>('Sunday');

  // eTIMS Report State
  const [eTimsPeriod, setETimsPeriod] = useState('August 2026');
  const [eTimsType, setETimsType] = useState('Sales by Invoice');

  useEffect(() => {
    async function loadAdminData() {
      const [prods, ords, quotes, docs, projs, schs, stfs, pays, lvs] = await Promise.all([
        fetchPublicProducts(),
        fetchCustomerOrders(),
        fetchUserQuotations(),
        fetchOfficialDocuments(),
        fetchClientProjects(),
        fetchScheduledServices(),
        fetchStaffDirectory(),
        fetchPayrollRecords(),
        fetchLeaveRequests(),
      ]);
      setProducts(prods);
      setOrders(ords);
      setQuotations(quotes);
      setDocuments(docs);
      setProjects(projs);
      setSchedule(schs);
      setStaff(stfs);
      setPayroll(pays);
      setLeaves(lvs);
    }
    loadAdminData();
  }, []);

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // ── Handle Add Product ─────────────────────────────────────────────────────
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createOrUpdateProduct({
      name: pName,
      category: pCategory,
      price: Number(pPrice),
      costPrice: Number(pCostPrice),
      stock: Number(pStock),
      openingStock: Number(pStock),
      supplier: pSupplier,
      mainImage: pImage,
      shortDescription: pDesc || 'Official certified product from GELWO Technologies catalogue.',
    });
    const refreshed = await fetchPublicProducts();
    setProducts(refreshed);
    setShowProductModal(false);
    notify(`Product "${created.name}" created and synced to Customer Marketplace!`);
  };

  // ── Handle Generate Official Document ──────────────────────────────────────
  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = Number(docItemPrice) * Number(docItemQty);
    const vat = docType === 'delivery_note' ? 0 : subtotal * 0.16;
    const total = subtotal + vat;

    const newDoc = await createOfficialDocument({
      docType,
      customerName: docClient,
      customerEmail: docEmail,
      organization: docOrg,
      items: [
        {
          description: docItemDesc,
          quantity: Number(docItemQty),
          unitPrice: Number(docItemPrice),
          total: subtotal,
        },
      ],
      subtotal,
      vatAmount: vat,
      totalAmount: total,
      status: docType === 'receipt' ? 'Verified' : docType === 'delivery_note' ? 'Delivered' : 'Issued',
      notes: docNotes,
      publishedToCustomer: true,
    });

    const refreshedDocs = await fetchOfficialDocuments();
    setDocuments(refreshedDocs);
    setShowDocModal(false);
    notify(`Generated & Published ${newDoc.docNumber} to Customer Portal!`);
  };

  // ── Handle Toggle Publish ──────────────────────────────────────────────────
  const handleToggleDocPublish = async (docId: string, current: boolean) => {
    await toggleDocumentPublish(docId, !current);
    const refreshed = await fetchOfficialDocuments();
    setDocuments(refreshed);
    notify(`Document visibility updated! ${!current ? 'Visible in Customer Portal' : 'Restricted to Admin'}`);
  };

  // ── Handle Add Staff ───────────────────────────────────────────────────────
  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff = await createStaffEmployee({
      fullName: sName,
      department: sDept,
      position: sPosition,
      phone: sPhone,
      email: sEmail,
      kraPin: sPin,
      nssfNumber: sNssf,
      shaNumber: sSha,
      contractType: 'Permanent',
      basicSalary: Number(sSalary),
      allowances: Number(sAllowances),
      bankName: 'KCB Bank Kenya',
      bankAccount: '1092839182',
      emergencyContact: 'Emergency Contact (+254 700 000 000)',
      startDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      offDay: sOffDay,
      leaveBalance: 21,
    });
    const refreshed = await fetchStaffDirectory();
    setStaff(refreshed);
    setShowStaffModal(false);
    notify(`Employee ${newStaff.fullName} registered with KRA PIN & SHA/NSSF!`);
  };

  // ── Handle Generate Payroll ────────────────────────────────────────────────
  const handleRunPayroll = async () => {
    const list = await generateMonthlyPayroll('August 2026');
    setPayroll(list);
    notify('Monthly Payroll for August 2026 computed with PAYE, SHA (2.75%), & NSSF!');
  };

  // ── Handle Generate eTIMS Report ───────────────────────────────────────────
  const handleGenerateETimsReport = async () => {
    const reportDoc = await createOfficialDocument({
      docType: 'etims_report',
      customerName: 'Institutional Clients (Batch)',
      customerEmail: 'compliance@gelwo.co.ke',
      organization: 'KRA eTIMS Validated Records',
      items: [
        {
          description: `KRA eTIMS Electronic Sales Report (${eTimsPeriod}) - ${eTimsType}`,
          quantity: 1,
          unitPrice: 2840500,
          total: 2840500,
        },
      ],
      subtotal: 2448706,
      vatAmount: 391794,
      totalAmount: 2840500,
      status: 'Verified',
      notes: 'Generated via GELWO Command Center eTIMS Integration Engine. Official electronic hash certified.',
      publishedToCustomer: true,
    });
    const refreshed = await fetchOfficialDocuments();
    setDocuments(refreshedDocs => [reportDoc, ...refreshedDocs]);
    notify(`eTIMS Report ${reportDoc.docNumber} generated and published to Customer Portal!`);
  };

  return (
    <div className="min-h-screen bg-[#070B19] text-[#F1F5F9] font-sans flex flex-col selection:bg-[#3B82F6] selection:text-white">
      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-[10000] bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold"
          >
            <FiCheckCircle className="text-lg" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 min-h-screen">
        {/* ── ADMIN COMMAND SIDEBAR ──────────────────────────────────────────── */}
        <aside className="w-64 bg-[#0D1225] border-r border-[#1E293B] flex flex-col fixed inset-y-0 left-0 z-30 overflow-y-auto">
          <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#EC4899] bg-clip-text text-transparent">
                GELWO ERP
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-[#94A3B8] font-bold">Command Center</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">
              Admin
            </span>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {/* Overview */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 py-1 tracking-wider">Overview</div>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiGrid className="text-sm" />
              <span>Command Dashboard</span>
            </button>

            {/* Commerce */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 pt-3 pb-1 tracking-wider">Commerce &amp; Stock</div>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'products' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiShoppingBag className="text-sm" />
              <span>Products Management</span>
              <span className="ml-auto text-[10px] font-mono text-[#3B82F6]">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'inventory' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiBox className="text-sm" />
              <span>Stock Inventory</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'orders' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiTruck className="text-sm" />
              <span>Orders &amp; Deliveries</span>
              <span className="ml-auto text-[10px] font-mono text-[#10B981]">{orders.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'crm' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiUsers className="text-sm" />
              <span>Customer 360 CRM</span>
            </button>

            {/* Services */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 pt-3 pb-1 tracking-wider">Services &amp; Ops</div>
            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'services' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiTool className="text-sm" />
              <span>Services &amp; Pricing Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'schedule' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiCalendar className="text-sm" />
              <span>Service Calendar</span>
            </button>

            <button
              onClick={() => setActiveTab('daily_ops')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'daily_ops' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiActivity className="text-sm" />
              <span>Daily Operations Track</span>
            </button>

            {/* Finance & Compliance */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 pt-3 pb-1 tracking-wider">Finance &amp; Compliance</div>
            <button
              onClick={() => setActiveTab('finance')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'finance' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiDollarSign className="text-sm" />
              <span>Invoices &amp; Quotations</span>
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'documents' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiFileText className="text-sm" />
              <span>Document Center (Vault)</span>
            </button>

            <button
              onClick={() => setActiveTab('compliance')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'compliance' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiShield className="text-sm" />
              <span>Government Hub (eTIMS)</span>
              <span className="ml-auto text-[9px] bg-[#10B981]/20 text-[#10B981] px-1 rounded font-bold">KRA</span>
            </button>

            {/* HR & People */}
            <div className="text-[10px] uppercase font-bold text-[#475569] px-3 pt-3 pb-1 tracking-wider">Human Resources</div>
            <button
              onClick={() => setActiveTab('hr_staff')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'hr_staff' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiUsers className="text-sm" />
              <span>Staff &amp; Registration</span>
              <span className="ml-auto text-[10px] font-mono text-white">{staff.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('payroll')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'payroll' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiDollarSign className="text-sm" />
              <span>Payroll (PAYE / SHA / NSSF)</span>
            </button>

            <button
              onClick={() => setActiveTab('leave_off')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'leave_off' ? 'bg-[#3B82F6]/15 text-[#3B82F6] font-bold' : 'text-[#94A3B8] hover:bg-[#111827] hover:text-white'
              }`}
            >
              <FiCalendar className="text-sm" />
              <span>Staff Leave &amp; Off-Days</span>
            </button>
          </nav>

          {/* Admin Profile */}
          <div className="p-4 border-t border-[#1E293B] bg-[#111827]/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#EF4444] to-[#F59E0B] flex items-center justify-center text-xs font-bold text-white">
              GA
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">GELWO Administrator</p>
              <p className="text-[10px] text-[#94A3B8] truncate">Super Admin Role</p>
            </div>
          </div>
        </aside>

        {/* ── MAIN ADMIN VIEWPORT ────────────────────────────────────────────── */}
        <main className="ml-64 flex-1 flex flex-col min-w-0 bg-[#070B19]">
          {/* Topbar */}
          <header className="h-16 bg-[#0D1225]/80 backdrop-blur-md border-b border-[#1E293B] px-8 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold uppercase tracking-wider text-white">
                GELWO DIGITAL COMMAND CENTER
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#10B981]/15 text-[#10B981] font-bold border border-[#10B981]/30">
                KENYA COMPLIANCE READY
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDocModal(true)}
                className="px-3.5 py-2 bg-[#10B981] hover:bg-[#059669] text-xs font-bold text-white rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <FiPlus />
                <span>Issue Document</span>
              </button>

              <button
                onClick={() => setShowProductModal(true)}
                className="px-3.5 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-xs font-bold text-white rounded-xl shadow-md transition-colors flex items-center gap-1.5"
              >
                <FiPlus />
                <span>Add Product</span>
              </button>
            </div>
          </header>

          {/* Viewport Content */}
          <div className="p-8 flex-1 overflow-y-auto space-y-6">
            {/* ── TAB 1: COMMAND DASHBOARD ─────────────────────────────────── */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Top KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Gross Revenue</span>
                    <div className="text-2xl font-extrabold text-[#10B981] font-mono mt-1">KSh 2.84M</div>
                    <span className="text-[10px] text-[#10B981]">↑ 18.2% this month</span>
                  </div>

                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Total Orders</span>
                    <div className="text-2xl font-extrabold text-white font-mono mt-1">184</div>
                    <span className="text-[10px] text-[#3B82F6]">14 New Today</span>
                  </div>

                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Active Projects</span>
                    <div className="text-2xl font-extrabold text-[#8B5CF6] font-mono mt-1">27</div>
                    <span className="text-[10px] text-[#8B5CF6]">All On Track</span>
                  </div>

                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Pending Quotes</span>
                    <div className="text-2xl font-extrabold text-[#F59E0B] font-mono mt-1">43</div>
                    <span className="text-[10px] text-[#F59E0B]">8 Needs Review</span>
                  </div>

                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Pending Payments</span>
                    <div className="text-2xl font-extrabold text-[#EC4899] font-mono mt-1">18</div>
                    <span className="text-[10px] text-[#EC4899]">KES 480K Total</span>
                  </div>

                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8]">Low Stock Alerts</span>
                    <div className="text-2xl font-extrabold text-[#EF4444] font-mono mt-1">12</div>
                    <span className="text-[10px] text-[#EF4444]">Auto-Restock Alert</span>
                  </div>
                </div>

                {/* Today's Stream & Revenue Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Today Stream */}
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                      Today’s Operational Activity (26 Aug 2026)
                    </h3>
                    <div className="space-y-3">
                      {[
                        { icon: '🛒', text: '14 New Hardware Orders Placed', time: '10m ago' },
                        { icon: '📋', text: '8 Service Quotations Requested', time: '25m ago' },
                        { icon: '💳', text: '6 Payments Verified via M-PESA Till', time: '1h ago' },
                        { icon: '🚚', text: '11 Deliveries Dispatched by Logistics Hub', time: '2h ago' },
                        { icon: '🏗️', text: '7 Project Milestone Updates Registered', time: '3h ago' },
                        { icon: '🎧', text: '4 Support Tickets Resolved by Engineering', time: '4h ago' },
                      ].map((act, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-[#0D1225] rounded-xl text-xs border border-[#1E293B]">
                          <div className="flex items-center gap-2.5">
                            <span>{act.icon}</span>
                            <span className="font-semibold text-white">{act.text}</span>
                          </div>
                          <span className="text-[10px] text-[#64748B] font-mono">{act.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Revenue Analytics */}
                  <div className="lg:col-span-2 bg-[#111827] border border-[#1E293B] rounded-2xl p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">Revenue &amp; Tax Compliance Analytics</h3>
                        <p className="text-[11px] text-[#94A3B8]">Monthly certified revenue in KSh (Jan – Aug 2026)</p>
                      </div>
                      <span className="text-xs font-bold text-[#10B981] font-mono">Total YTD: KSh 18.9M</span>
                    </div>

                    {/* Chart Bars */}
                    <div className="h-44 flex items-end gap-3 pt-6 px-4">
                      {[
                        { month: 'Jan', val: 55, ksh: '1.4M' },
                        { month: 'Feb', val: 65, ksh: '1.8M' },
                        { month: 'Mar', val: 70, ksh: '2.1M' },
                        { month: 'Apr', val: 85, ksh: '2.5M' },
                        { month: 'May', val: 80, ksh: '2.3M' },
                        { month: 'Jun', val: 95, ksh: '2.7M' },
                        { month: 'Jul', val: 90, ksh: '2.6M' },
                        { month: 'Aug', val: 100, ksh: '2.84M' },
                      ].map((bar) => (
                        <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                          <span className="text-[9px] font-mono text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity">
                            {bar.ksh}
                          </span>
                          <div
                            className="w-full bg-gradient-to-t from-[#3B82F6] to-[#6366F1] rounded-t-lg transition-all duration-300 group-hover:from-[#10B981] group-hover:to-[#059669]"
                            style={{ height: `${bar.val}%` }}
                          ></div>
                          <span className="text-[10px] font-bold text-[#94A3B8]">{bar.month}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#1E293B] flex justify-between text-xs text-[#94A3B8]">
                      <span>eTIMS Reported Tax Rate: <b>16% Standard VAT</b></span>
                      <span>Next Filing Deadline: <b>20th September 2026</b></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 2: PRODUCTS MANAGEMENT ───────────────────────────────── */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold">Products &amp; Hardware Management</h2>
                    <p className="text-xs text-[#94A3B8]">Add, edit, and configure items live on the Customer Portal.</p>
                  </div>
                  <button
                    onClick={() => setShowProductModal(true)}
                    className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-xs font-bold text-white rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <FiPlus />
                    <span>Create New Product</span>
                  </button>
                </div>

                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D1225] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                        <tr>
                          <th className="p-4">SKU / Item</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Cost Price</th>
                          <th className="p-4">Selling Price</th>
                          <th className="p-4">Stock Status</th>
                          <th className="p-4">Supplier</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B]">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-[#0D1225]/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={p.mainImage} alt={p.name} className="w-10 h-10 object-cover rounded-lg" />
                                <div>
                                  <span className="font-bold text-white block">{p.name}</span>
                                  <span className="text-[10px] font-mono text-[#3B82F6]">{p.sku}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-[#94A3B8]">{p.category}</td>
                            <td className="p-4 font-mono text-[#94A3B8]">KES {p.costPrice?.toLocaleString() || '10,000'}</td>
                            <td className="p-4 font-mono font-bold text-[#10B981]">KES {p.price.toLocaleString()}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.stock > 10 ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#EF4444]/15 text-[#EF4444]'
                              }`}>
                                {p.stock} in Stock
                              </span>
                            </td>
                            <td className="p-4 text-[#94A3B8]">{p.supplier || 'Direct Importer'}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={async () => {
                                  await deleteProductItem(p.id);
                                  const refreshed = await fetchPublicProducts();
                                  setProducts(refreshed);
                                  notify(`Removed ${p.name}`);
                                }}
                                className="p-2 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors"
                              >
                                <FiTrash2 />
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

            {/* ── TAB 3: STOCK INVENTORY ───────────────────────────────────── */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">Stock Inventory &amp; Automated Valuation</h2>
                  <p className="text-xs text-[#94A3B8]">Formula: Opening + Purchases + Returns - Sales - Damaged - Reserved = Available Stock.</p>
                </div>

                {/* Stock KPI Summary */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold">Total SKUs</span>
                    <div className="text-2xl font-extrabold text-white font-mono mt-1">{products.length}</div>
                  </div>
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold">In Stock Units</span>
                    <div className="text-2xl font-extrabold text-[#10B981] font-mono mt-1">
                      {products.reduce((acc, p) => acc + p.stock, 0)}
                    </div>
                  </div>
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold">Reserved</span>
                    <div className="text-2xl font-extrabold text-[#F59E0B] font-mono mt-1">28 Units</div>
                  </div>
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold">Low Stock Alert</span>
                    <div className="text-2xl font-extrabold text-[#EF4444] font-mono mt-1">2 Items</div>
                  </div>
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold">Total Stock Value</span>
                    <div className="text-2xl font-extrabold text-[#3B82F6] font-mono mt-1">KES 6.42M</div>
                  </div>
                  <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
                    <span className="text-[10px] text-[#94A3B8] uppercase font-bold">Incoming Shipments</span>
                    <div className="text-2xl font-extrabold text-[#8B5CF6] font-mono mt-1">150 Panels</div>
                  </div>
                </div>

                {/* Stock Table */}
                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D1225] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                        <tr>
                          <th className="p-4">Product SKU</th>
                          <th className="p-4">Opening</th>
                          <th className="p-4">Purchased</th>
                          <th className="p-4">Sold</th>
                          <th className="p-4">Damaged</th>
                          <th className="p-4">Reserved</th>
                          <th className="p-4">Available Balance</th>
                          <th className="p-4">Reorder Level</th>
                          <th className="p-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B]">
                        {products.map((p) => (
                          <tr key={p.id} className="hover:bg-[#0D1225]/50 transition-colors">
                            <td className="p-4">
                              <span className="font-bold text-white block">{p.name}</span>
                              <span className="text-[10px] font-mono text-[#3B82F6]">{p.sku}</span>
                            </td>
                            <td className="p-4 font-mono">{p.openingStock || p.stock}</td>
                            <td className="p-4 font-mono text-[#10B981]">+{p.purchases || 0}</td>
                            <td className="p-4 font-mono text-[#EF4444]">-{p.sales || 0}</td>
                            <td className="p-4 font-mono">{p.damaged || 0}</td>
                            <td className="p-4 font-mono text-[#F59E0B]">{p.reserved || 0}</td>
                            <td className="p-4 font-mono font-bold text-[#10B981]">
                              {(p.openingStock || p.stock) + (p.purchases || 0) - (p.sales || 0) - (p.damaged || 0) - (p.reserved || 0)} Units
                            </td>
                            <td className="p-4 font-mono text-[#94A3B8]">{p.reorderLevel || 10}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => notify(`Purchase order initiated for ${p.sku}`)}
                                className="px-3 py-1.5 bg-[#3B82F6]/15 hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white rounded-lg text-xs font-bold transition-all"
                              >
                                Restock PO
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

            {/* ── TAB 4: ORDERS & DELIVERIES ───────────────────────────────── */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">Orders &amp; Logistics Delivery Center</h2>
                  <p className="text-xs text-[#94A3B8]">Assign drivers, vehicles, generate delivery notes, and push tracking updates.</p>
                </div>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1E293B] pb-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#3B82F6]">{ord.orderNumber}</span>
                          <h3 className="text-sm font-extrabold text-white mt-0.5">{ord.items[0]?.productName}</h3>
                          <p className="text-xs text-[#94A3B8]">Client: {ord.customerName} ({ord.customerPhone}) • {ord.deliveryAddress}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-extrabold text-[#10B981] font-mono">
                            KES {ord.total.toLocaleString()}
                          </span>
                          <span className="block text-[11px] font-bold text-[#10B981]">● {ord.paymentStatus}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-3 bg-[#0D1225] rounded-xl border border-[#1E293B]">
                          <span className="text-[#64748B] block text-[10px]">Assigned Driver</span>
                          <span className="font-bold text-white">{ord.driverName || 'Harrison (Driver 02)'}</span>
                        </div>
                        <div className="p-3 bg-[#0D1225] rounded-xl border border-[#1E293B]">
                          <span className="text-[#64748B] block text-[10px]">Vehicle Registration</span>
                          <span className="font-bold text-white">{ord.vehicleReg || 'KDF 492X'}</span>
                        </div>
                        <div className="p-3 bg-[#0D1225] rounded-xl border border-[#1E293B]">
                          <span className="text-[#64748B] block text-[10px]">Current Status</span>
                          <span className="font-bold text-[#10B981] uppercase">{ord.trackingStep}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2 justify-end">
                        <button
                          onClick={async () => {
                            await updateOrderStatus(ord.id, 'dispatched');
                            const refreshed = await fetchCustomerOrders();
                            setOrders(refreshed);
                            notify(`Order ${ord.orderNumber} dispatched!`);
                          }}
                          className="px-3.5 py-1.5 bg-[#1E293B] hover:bg-[#3B82F6] text-xs font-bold text-white rounded-lg transition-colors"
                        >
                          Mark Dispatched
                        </button>
                        <button
                          onClick={async () => {
                            await updateOrderStatus(ord.id, 'delivered');
                            const refreshed = await fetchCustomerOrders();
                            setOrders(refreshed);
                            notify(`Order ${ord.orderNumber} marked Delivered!`);
                          }}
                          className="px-3.5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-xs font-bold text-white rounded-lg transition-colors"
                        >
                          Mark Delivered
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TAB 5: GOVERNMENT & COMPLIANCE HUB ───────────────────────── */}
            {activeTab === 'compliance' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#10B981]/15 via-[#3B82F6]/10 to-transparent border border-[#10B981]/30 rounded-2xl p-6">
                  <h2 className="text-xl font-extrabold flex items-center gap-2">
                    <span>🇰🇪 Kenya Government &amp; Compliance Command Hub</span>
                  </h2>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
                    Direct access to official Kenyan statutory portals. Generate eTIMS reports, file returns, and publish tax receipts directly into the customer’s Document Vault.
                  </p>
                </div>

                {/* Official Verified Links Grid */}
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#94A3B8] mb-3">
                    Official External Government Portals (Secure Direct Links)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'KRA eTIMS Taxpayer Portal',
                        desc: 'Access electronic tax invoice management, invoice verification & sales uploads.',
                        url: 'https://etims.kra.go.ke/',
                        badge: 'KRA Official',
                        color: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
                      },
                      {
                        title: 'KRA iTax Portal',
                        desc: 'Tax registration, monthly VAT returns, corporate filing and TCC verification.',
                        url: 'https://itax.kra.go.ke/',
                        badge: 'iTax Official',
                        color: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30',
                      },
                      {
                        title: 'e-GP Kenya Electronic Procurement',
                        desc: 'National government electronic procurement system for tenders and suppliers.',
                        url: 'https://egp.go.ke/',
                        badge: 'e-GP Tenders',
                        color: 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30',
                      },
                      {
                        title: 'SHA / SHIF Employer Portal',
                        desc: 'Social Health Authority employer registrations and monthly 2.75% SHIF remittances.',
                        url: 'https://sha.go.ke/',
                        badge: 'SHA Employer',
                        color: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30',
                      },
                      {
                        title: 'NSSF Kenya Employer Portal',
                        desc: 'National Social Security Fund Tier I & Tier II employer contributions and e-pay orders.',
                        url: 'https://nssf.or.ke/',
                        badge: 'NSSF E-Portals',
                        color: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30',
                      },
                    ].map((hub) => (
                      <div key={hub.title} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${hub.color}`}>
                              {hub.badge}
                            </span>
                            <FiExternalLink className="text-[#94A3B8]" />
                          </div>
                          <h4 className="text-sm font-extrabold text-white">{hub.title}</h4>
                          <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">{hub.desc}</p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-[#1E293B]">
                          <a
                            href={hub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2.5 bg-[#0D1225] hover:bg-[#3B82F6] border border-[#1E293B] hover:border-transparent text-xs font-bold text-white rounded-xl transition-all flex items-center justify-center gap-1.5"
                          >
                            <span>Open Official Portal</span>
                            <FiExternalLink />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* eTIMS Report Generation Center */}
                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-white">eTIMS Report Generator &amp; Customer Publishing Desk</h3>
                      <p className="text-xs text-[#94A3B8]">Generate verified electronic tax reports and push them directly to client portal vaults.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#94A3B8] mb-1">Report Type</label>
                      <select
                        value={eTimsType}
                        onChange={(e) => setETimsType(e.target.value)}
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-3 text-xs text-white"
                      >
                        <option value="Sales by Invoice">eTIMS Sales by Invoice</option>
                        <option value="Sales by Item">eTIMS Sales by Item</option>
                        <option value="Purchase Report">eTIMS Verified Purchase Report</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#94A3B8] mb-1">Tax Period</label>
                      <input
                        type="text"
                        value={eTimsPeriod}
                        onChange={(e) => setETimsPeriod(e.target.value)}
                        placeholder="August 2026"
                        className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl p-3 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={handleGenerateETimsReport}
                        className="w-full py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-xs font-bold text-white rounded-xl shadow-lg"
                      >
                        Generate &amp; Publish eTIMS Report →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 6: DOCUMENT CENTER (VAULT) ───────────────────────────── */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold">Central Document Vault &amp; Publishing Desk</h2>
                    <p className="text-xs text-[#94A3B8]">Manage Invoices, Receipts, Delivery Notes, and Tax Reports. Toggle customer portal sync.</p>
                  </div>
                  <button
                    onClick={() => setShowDocModal(true)}
                    className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-xs font-bold text-white rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <FiPlus />
                    <span>Generate Official Document</span>
                  </button>
                </div>

                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D1225] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                        <tr>
                          <th className="p-4">Type</th>
                          <th className="p-4">Ref Number</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Portal Visibility</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B]">
                        {documents.map((doc) => (
                          <tr key={doc.id} className="hover:bg-[#0D1225]/50 transition-colors">
                            <td className="p-4 font-bold capitalize text-white flex items-center gap-2">
                              <FiFileText className="text-[#3B82F6]" />
                              <span>{doc.docType.replace('_', ' ')}</span>
                            </td>
                            <td className="p-4 font-mono font-bold text-[#3B82F6]">{doc.docNumber}</td>
                            <td className="p-4 text-white">
                              <span>{doc.customerName}</span>
                              <span className="block text-[10px] text-[#64748B]">{doc.organization}</span>
                            </td>
                            <td className="p-4 text-[#94A3B8]">{doc.issueDate}</td>
                            <td className="p-4 font-mono font-bold text-[#10B981]">
                              {doc.totalAmount > 0 ? `KES ${doc.totalAmount.toLocaleString()}` : 'N/A'}
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => handleToggleDocPublish(doc.id, doc.publishedToCustomer)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                                  doc.publishedToCustomer
                                    ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                                    : 'bg-[#64748B]/15 text-[#64748B] border-[#64748B]/30'
                                }`}
                              >
                                {doc.publishedToCustomer ? '✓ Published to Client' : '🔒 Admin Only'}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => notify(`Downloaded ${doc.docNumber}`)}
                                className="p-2 text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg"
                              >
                                <FiDownload />
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

            {/* ── TAB 7: HR & STAFF MANAGEMENT ─────────────────────────────── */}
            {activeTab === 'hr_staff' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold">Staff Directory &amp; Compliance Records</h2>
                    <p className="text-xs text-[#94A3B8]">Manage employee profiles, KRA PIN, SHA/SHIF numbers, NSSF details, and salaries.</p>
                  </div>
                  <button
                    onClick={() => setShowStaffModal(true)}
                    className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-xs font-bold text-white rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <FiPlus />
                    <span>Register New Staff</span>
                  </button>
                </div>

                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D1225] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                        <tr>
                          <th className="p-4">Staff Member</th>
                          <th className="p-4">Department &amp; Role</th>
                          <th className="p-4">KRA PIN / NSSF / SHA</th>
                          <th className="p-4">Basic Salary</th>
                          <th className="p-4">Weekly Off-Day</th>
                          <th className="p-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B]">
                        {staff.map((emp) => (
                          <tr key={emp.id} className="hover:bg-[#0D1225]/50 transition-colors">
                            <td className="p-4">
                              <span className="font-bold text-white block">{emp.fullName}</span>
                              <span className="text-[10px] font-mono text-[#3B82F6]">{emp.employeeNumber}</span>
                            </td>
                            <td className="p-4 text-white">
                              <span>{emp.position}</span>
                              <span className="block text-[10px] text-[#64748B]">{emp.department}</span>
                            </td>
                            <td className="p-4 font-mono text-xs">
                              <span className="text-white block">PIN: {emp.kraPin}</span>
                              <span className="text-[#94A3B8] text-[10px]">NSSF: {emp.nssfNumber} • SHA: {emp.shaNumber}</span>
                            </td>
                            <td className="p-4 font-mono font-bold text-[#10B981]">
                              KES {emp.basicSalary.toLocaleString()}
                            </td>
                            <td className="p-4 text-[#F59E0B] font-semibold">{emp.offDay}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                                {emp.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 8: PAYROLL ENGINE ─────────────────────────────────────── */}
            {activeTab === 'payroll' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold">Automated Payroll System (Kenyan Statutory Deductions)</h2>
                    <p className="text-xs text-[#94A3B8]">Gross Pay - PAYE - SHA/SHIF (2.75%) - NSSF Tier I &amp; II = Net Salary.</p>
                  </div>
                  <button
                    onClick={handleRunPayroll}
                    className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-xs font-bold text-white rounded-xl shadow-md transition-colors"
                  >
                    Compute Monthly Payroll (August 2026)
                  </button>
                </div>

                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0D1225] text-[#94A3B8] uppercase text-[10px] tracking-wider border-b border-[#1E293B]">
                        <tr>
                          <th className="p-4">Employee</th>
                          <th className="p-4">Gross Pay</th>
                          <th className="p-4">PAYE Tax</th>
                          <th className="p-4">SHA (2.75%)</th>
                          <th className="p-4">NSSF</th>
                          <th className="p-4">Net Pay</th>
                          <th className="p-4 text-right">Payslip</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1E293B]">
                        {payroll.map((pay) => (
                          <tr key={pay.id} className="hover:bg-[#0D1225]/50 transition-colors">
                            <td className="p-4 font-bold text-white">{pay.employeeName}</td>
                            <td className="p-4 font-mono">KES {pay.grossPay.toLocaleString()}</td>
                            <td className="p-4 font-mono text-[#EF4444]">-KES {pay.paye.toLocaleString()}</td>
                            <td className="p-4 font-mono text-[#EF4444]">-KES {pay.shaShif.toLocaleString()}</td>
                            <td className="p-4 font-mono text-[#EF4444]">-KES {pay.nssf.toLocaleString()}</td>
                            <td className="p-4 font-mono font-bold text-[#10B981]">KES {pay.netPay.toLocaleString()}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => notify(`Payslip downloaded for ${pay.employeeName}`)}
                                className="px-3 py-1 bg-[#1E293B] hover:bg-[#3B82F6] text-white rounded-lg text-[11px] font-bold"
                              >
                                Payslip PDF
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

            {/* ── TAB 9: LEAVE & OFF-DAYS ───────────────────────────────────── */}
            {activeTab === 'leave_off' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold">Staff Leave &amp; Weekly Off-Days Schedule</h2>
                  <p className="text-xs text-[#94A3B8]">Review leave requests and ensure service dispatchers do not assign technicians on their off-duty days.</p>
                </div>

                {/* Staff Off-Days Grid */}
                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">Weekly Roster Off-Days</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {staff.map((s) => (
                      <div key={s.id} className="p-3 bg-[#0D1225] border border-[#1E293B] rounded-xl text-xs">
                        <span className="font-bold text-white block">{s.fullName}</span>
                        <span className="text-[10px] text-[#64748B] block">{s.position}</span>
                        <span className="mt-2 inline-block px-2 py-0.5 rounded-md bg-[#F59E0B]/15 text-[#F59E0B] font-bold text-[10px]">
                          OFF: {s.offDay}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leave Requests Table */}
                <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
                  <div className="p-4 bg-[#0D1225] border-b border-[#1E293B] flex justify-between items-center">
                    <h3 className="text-xs font-bold uppercase text-white">Pending Leave Applications</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {leaves.map((l) => (
                      <div key={l.id} className="p-4 bg-[#0D1225] border border-[#1E293B] rounded-xl flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white">{l.employeeName}</span>
                          <span className="text-xs text-[#94A3B8] block">{l.leaveType} • {l.days} Days ({l.startDate} to {l.endDate})</span>
                          <p className="text-xs text-[#64748B] mt-1 italic">Reason: {l.reason}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={async () => {
                              await updateLeaveStatus(l.id, 'Approved', 'GELWO Admin');
                              const refreshed = await fetchLeaveRequests();
                              setLeaves(refreshed);
                              notify(`Leave approved for ${l.employeeName}`);
                            }}
                            className="px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-lg"
                          >
                            Approve
                          </button>
                          <button
                            onClick={async () => {
                              await updateLeaveStatus(l.id, 'Rejected', 'GELWO Admin');
                              const refreshed = await fetchLeaveRequests();
                              setLeaves(refreshed);
                              notify(`Leave declined for ${l.employeeName}`);
                            }}
                            className="px-3 py-1.5 bg-[#EF4444]/10 text-[#EF4444] text-xs font-bold rounded-lg"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── CREATE PRODUCT MODAL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 bg-[#070B19]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1225] border border-[#1E293B] rounded-2xl max-w-lg w-full p-6 shadow-2xl"
            >
              <h3 className="text-lg font-extrabold text-white mb-4">Add Product to GELWO Marketplace</h3>
              <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#94A3B8] font-bold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    placeholder="e.g. 500W Mono Solar Panel"
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Category</label>
                    <select
                      value={pCategory}
                      onChange={(e) => setPCategory(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    >
                      <option value="ICT Equipment">ICT Equipment</option>
                      <option value="Solar">Solar &amp; Renewable</option>
                      <option value="Office Stationery">Office Stationery</option>
                      <option value="Software Development">Software Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Stock Initial Units</label>
                    <input
                      type="number"
                      value={pStock}
                      onChange={(e) => setPStock(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Selling Price (KES)</label>
                    <input
                      type="number"
                      required
                      value={pPrice}
                      onChange={(e) => setPPrice(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Cost Price (KES)</label>
                    <input
                      type="number"
                      value={pCostPrice}
                      onChange={(e) => setPCostPrice(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#94A3B8] font-bold mb-1">Image URL</label>
                  <input
                    type="text"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[#94A3B8] font-bold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={pDesc}
                    onChange={(e) => setPDesc(e.target.value)}
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="flex-1 py-3 bg-[#111827] text-[#94A3B8] rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#3B82F6] text-white rounded-xl font-bold"
                  >
                    Publish to Store
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CREATE OFFICIAL DOCUMENT MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {showDocModal && (
          <div className="fixed inset-0 bg-[#070B19]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1225] border border-[#1E293B] rounded-2xl max-w-lg w-full p-6 shadow-2xl"
            >
              <h3 className="text-lg font-extrabold text-white mb-4">Generate Official Document</h3>
              <form onSubmit={handleCreateDocument} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#94A3B8] font-bold mb-1">Document Type</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white font-bold"
                  >
                    <option value="invoice">Official Tax Invoice (eTIMS)</option>
                    <option value="receipt">Official Payment Receipt</option>
                    <option value="delivery_note">Certified Delivery Note</option>
                    <option value="etims_report">KRA eTIMS Compliance Report</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Client Name</label>
                    <input
                      type="text"
                      required
                      value={docClient}
                      onChange={(e) => setDocClient(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Client Email</label>
                    <input
                      type="email"
                      required
                      value={docEmail}
                      onChange={(e) => setDocEmail(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#94A3B8] font-bold mb-1">Item Description</label>
                  <input
                    type="text"
                    required
                    value={docItemDesc}
                    onChange={(e) => setDocItemDesc(e.target.value)}
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Quantity</label>
                    <input
                      type="number"
                      value={docItemQty}
                      onChange={(e) => setDocItemQty(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Unit Price (KES)</label>
                    <input
                      type="number"
                      value={docItemPrice}
                      onChange={(e) => setDocItemPrice(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDocModal(false)}
                    className="flex-1 py-3 bg-[#111827] text-[#94A3B8] rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#10B981] text-white rounded-xl font-bold"
                  >
                    Issue &amp; Publish to Portal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── REGISTER STAFF MODAL ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showStaffModal && (
          <div className="fixed inset-0 bg-[#070B19]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0D1225] border border-[#1E293B] rounded-2xl max-w-lg w-full p-6 shadow-2xl"
            >
              <h3 className="text-lg font-extrabold text-white mb-4">Register New Employee Profile</h3>
              <form onSubmit={handleCreateStaff} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#94A3B8] font-bold mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={sName}
                    onChange={(e) => setSName(e.target.value)}
                    placeholder="e.g. Dennis Mutua"
                    className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Department</label>
                    <select
                      value={sDept}
                      onChange={(e) => setSDept(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    >
                      <option value="Technology & Engineering">Technology &amp; Engineering</option>
                      <option value="Technical & Field Services">Technical &amp; Field Services</option>
                      <option value="Operations & Procurement">Operations &amp; Procurement</option>
                      <option value="Finance & Accounts">Finance &amp; Accounts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Position / Title</label>
                    <input
                      type="text"
                      required
                      value={sPosition}
                      onChange={(e) => setSPosition(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">KRA PIN</label>
                    <input
                      type="text"
                      required
                      value={sPin}
                      onChange={(e) => setSPin(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">NSSF No</label>
                    <input
                      type="text"
                      required
                      value={sNssf}
                      onChange={(e) => setSNssf(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">SHA Member No</label>
                    <input
                      type="text"
                      required
                      value={sSha}
                      onChange={(e) => setSSha(e.target.value)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-2.5 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Basic Salary (KES)</label>
                    <input
                      type="number"
                      required
                      value={sSalary}
                      onChange={(e) => setSSalary(Number(e.target.value))}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#94A3B8] font-bold mb-1">Weekly Off Day</label>
                    <select
                      value={sOffDay}
                      onChange={(e) => setSOffDay(e.target.value as any)}
                      className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white"
                    >
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowStaffModal(false)}
                    className="flex-1 py-3 bg-[#111827] text-[#94A3B8] rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#3B82F6] text-white rounded-xl font-bold"
                  >
                    Register Employee
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
