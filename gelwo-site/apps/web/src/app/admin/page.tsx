'use client';

/**
 * /admin — GELWO Administrative Operations & CMS Control Suite
 * Features:
 * 1. Modify Prices & Settings for all 15 Service Divisions
 * 2. Add / Edit Products with pictures & prices (Live on frontend)
 * 3. Generate Customized Invoices, Receipts, & Delivery Notes (Downloadable by customers)
 * 4. Quotations Approval Desk
 * 5. Hidden from public site navigation for security.
 */

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { GELWO_CATALOGUE, ServiceDivision } from '@/data/servicesCatalogue';
import {
  fetchUserQuotations,
  updateQuotationStatus,
  QuotationRecord,
  fetchPublicProducts,
  createOrUpdateProduct,
  deleteProductItem,
  ProductItem,
  createOfficialDocument,
  fetchOfficialDocuments,
  OfficialDocument,
  DocumentLineItem
} from '@/lib/supabase';
import { motion } from 'framer-motion';
import {
  FiSettings, FiGrid, FiLayers, FiBox, FiCpu, FiGlobe,
  FiFileText, FiUsers, FiBarChart2, FiCheck, FiSave, FiEye,
  FiClock, FiShield, FiLock, FiPlus, FiTrash2, FiDownload,
  FiDollarSign, FiTag, FiShoppingBag, FiTruck
} from 'react-icons/fi';

export default function AdminCMSPage() {
  const [activeMainTab, setActiveMainTab] = useState<'products' | 'services' | 'documents' | 'quotations'>('products');
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  // ─── 1. Products Management State ───────────────────────────────────────────
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('ICT, Biometric & Security');
  const [newProdPrice, setNewProdPrice] = useState<number>(15000);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80');
  const [newProdStock, setNewProdStock] = useState<number>(50);

  // ─── 2. Services Management State ───────────────────────────────────────────
  const [catalogueData, setCatalogueData] = useState<ServiceDivision[]>(GELWO_CATALOGUE);
  const [selectedDivisionId, setSelectedDivisionId] = useState<string>(GELWO_CATALOGUE[0].id);
  const currentDivision = catalogueData.find((d) => d.id === selectedDivisionId) || catalogueData[0];
  const [editName, setEditName] = useState(currentDivision.name);
  const [editTagline, setEditTagline] = useState(currentDivision.tagline);
  const [editDescription, setEditDescription] = useState(currentDivision.description);
  const [editPricing, setEditPricing] = useState(currentDivision.pricingModel);
  const [editLeadTime, setEditLeadTime] = useState(currentDivision.leadTime);

  // ─── 3. Documents Generator State ───────────────────────────────────────────
  const [documents, setDocuments] = useState<OfficialDocument[]>([]);
  const [docType, setDocType] = useState<'invoice' | 'receipt' | 'delivery_note'>('invoice');
  const [docClientName, setDocClientName] = useState('');
  const [docClientEmail, setDocClientEmail] = useState('');
  const [docOrg, setDocOrg] = useState('');
  const [docRefQuote, setDocRefQuote] = useState('');
  const [docDeliveryAddress, setDocDeliveryAddress] = useState('');
  const [docItems, setDocItems] = useState<DocumentLineItem[]>([
    { description: 'Standard Equipment Provision / Engineering Service', quantity: 1, unitPrice: 150000, total: 150000 },
  ]);
  const [docNotes, setDocNotes] = useState('Certified and issued by GELWO Technologies Administration Desk.');

  // ─── 4. Quotations State ───────────────────────────────────────────────────
  const [quotations, setQuotations] = useState<QuotationRecord[]>([]);

  useEffect(() => {
    async function initData() {
      const [prods, docs, quotes] = await Promise.all([
        fetchPublicProducts(),
        fetchOfficialDocuments(),
        fetchUserQuotations(),
      ]);
      setProducts(prods);
      setDocuments(docs);
      setQuotations(quotes);
    }
    initData();
  }, []);

  useEffect(() => {
    const div = catalogueData.find((d) => d.id === selectedDivisionId);
    if (div) {
      setEditName(div.name);
      setEditTagline(div.tagline);
      setEditDescription(div.description);
      setEditPricing(div.pricingModel);
      setEditLeadTime(div.leadTime);
    }
  }, [selectedDivisionId, catalogueData]);

  const notifySuccess = (msg: string) => {
    setSavedSuccess(msg);
    setTimeout(() => setSavedSuccess(null), 3500);
  };

  // ── Handlers: Products ──────────────────────────────────────────────────────
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newP = await createOrUpdateProduct({
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      name: newProdName,
      category: newProdCategory,
      shortDescription: newProdDesc || 'Official certified product from GELWO Technologies catalogue.',
      price: Number(newProdPrice),
      currency: 'KES',
      pricingType: 'fixed',
      mainImage: newProdImage,
      stock: Number(newProdStock),
      featured: true,
    });
    const updated = await fetchPublicProducts();
    setProducts(updated);
    setNewProdName('');
    setNewProdDesc('');
    notifySuccess(`Product "${newP.name}" added live to public frontend!`);
  };

  const handleUpdateProductPrice = async (p: ProductItem, newPrice: number) => {
    await createOrUpdateProduct({ ...p, price: newPrice });
    const updated = await fetchPublicProducts();
    setProducts(updated);
    notifySuccess(`Updated price for ${p.name} to KES ${newPrice.toLocaleString()}`);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProductItem(id);
    const updated = await fetchPublicProducts();
    setProducts(updated);
    notifySuccess('Product removed from catalog.');
  };

  // ── Handlers: Services ──────────────────────────────────────────────────────
  const handlePublishDivision = (e: React.FormEvent) => {
    e.preventDefault();
    setCatalogueData((prev) =>
      prev.map((d) =>
        d.id === selectedDivisionId
          ? {
              ...d,
              name: editName,
              tagline: editTagline,
              description: editDescription,
              pricingModel: editPricing as any,
              leadTime: editLeadTime,
            }
          : d
      )
    );
    notifySuccess(`Division ${currentDivision.code} settings updated live.`);
  };

  // ── Handlers: Documents ─────────────────────────────────────────────────────
  const addLineItem = () => {
    setDocItems([...docItems, { description: '', quantity: 1, unitPrice: 0, total: 0 }]);
  };

  const updateLineItem = (index: number, field: keyof DocumentLineItem, value: any) => {
    const next = [...docItems];
    (next[index] as any)[field] = value;
    if (field === 'quantity' || field === 'unitPrice') {
      next[index].total = Number(next[index].quantity) * Number(next[index].unitPrice);
    }
    setDocItems(next);
  };

  const removeLineItem = (index: number) => {
    if (docItems.length > 1) {
      setDocItems(docItems.filter((_, i) => i !== index));
    }
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    const subtotal = docItems.reduce((acc, curr) => acc + curr.total, 0);
    const vatAmount = docType === 'invoice' ? Math.round(subtotal * 0.16) : 0;
    const totalAmount = subtotal + vatAmount;

    const newDoc = await createOfficialDocument({
      docType,
      refQuoteNumber: docRefQuote || undefined,
      customerName: docClientName || 'Corporate Client',
      customerEmail: docClientEmail || 'client@institution.go.ke',
      organization: docOrg || 'County Ministry / Enterprise Entity',
      deliveryAddress: docDeliveryAddress || undefined,
      items: docItems,
      subtotal,
      vatAmount,
      totalAmount,
      status: docType === 'receipt' ? 'Paid' : docType === 'delivery_note' ? 'Delivered' : 'Issued',
      notes: docNotes,
    });

    const docs = await fetchOfficialDocuments();
    setDocuments(docs);
    notifySuccess(`Generated ${docType.toUpperCase()} ${newDoc.docNumber} — Available in Customer Portal!`);
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
        {/* Top Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-gelwo-purple font-bold uppercase tracking-wider">
                ADMINISTRATIVE OPERATIONS &amp; COMMERCE DESK
              </span>
              <span className="px-2 py-0.5 rounded bg-gelwo-royal dark:bg-gelwo-blush text-gelwo-purple text-[10px] font-mono font-bold">
                Private Route
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-heading uppercase mt-1">
              CENTRAL <span className="text-gradient-purple dark:text-gradient-light">CONTROL PANEL</span>
            </h1>
            <p className="text-xs sm:text-sm text-gelwo-midnight/70 dark:text-gelwo-gray mt-1">
              Modify product/service prices, upload products live to frontend, and generate customer Invoices &amp; Delivery Notes.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
              ● Supabase Cloud Active
            </span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 mb-6 bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-mono font-bold rounded-2xl border border-emerald-500/40 text-center animate-pulse">
            ✓ {savedSuccess}
          </div>
        )}

        {/* Top Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gelwo-gray dark:border-gelwo-royal pb-4 mb-8 text-xs font-mono font-bold">
          <button
            onClick={() => setActiveMainTab('products')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${activeMainTab === 'products' ? 'bg-gelwo-purple text-gelwo-ivory shadow' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
          >
            <FiShoppingBag />
            <span>Manage Products &amp; Prices ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveMainTab('documents')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${activeMainTab === 'documents' ? 'bg-gelwo-purple text-gelwo-ivory shadow' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
          >
            <FiFileText />
            <span>Generate Invoices / Receipts / Delivery Notes</span>
          </button>
          <button
            onClick={() => setActiveMainTab('services')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${activeMainTab === 'services' ? 'bg-gelwo-purple text-gelwo-ivory shadow' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
          >
            <FiGrid />
            <span>15-Division Service CMS</span>
          </button>
          <button
            onClick={() => setActiveMainTab('quotations')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 ${activeMainTab === 'quotations' ? 'bg-gelwo-purple text-gelwo-ivory shadow' : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'}`}
          >
            <FiClock />
            <span>Customer Quotes Desk ({quotations.length})</span>
          </button>
        </div>

        {/* ── TAB 1: PRODUCTS & PRICING MANAGER ─────────────────────────────── */}
        {activeMainTab === 'products' && (
          <div className="space-y-8">
            {/* Add New Product Form */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/30 space-y-6">
              <div className="border-b border-gelwo-gray dark:border-gelwo-royal pb-4">
                <span className="text-xs font-mono text-gelwo-purple uppercase">PRODUCT PUBLISHING ENGINE</span>
                <h3 className="text-xl font-bold font-heading">Add New Product (Appears Live on /products)</h3>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Product Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5kW Hybrid Solar Inverter with MPPT"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Category / Division</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    >
                      <option value="ICT, Biometric & Security">ICT, Biometric &amp; Security</option>
                      <option value="Solar & Renewable Energy">Solar &amp; Renewable Energy</option>
                      <option value="Software Development & Digital Solutions">Software Development &amp; Digital Solutions</option>
                      <option value="General Supplies & Services">General Supplies &amp; Services</option>
                      <option value="Electrical Equipment">Electrical Equipment</option>
                      <option value="Branding & Printing">Branding &amp; Printing</option>
                      <option value="Cereals & Foodstuff Supplies">Cereals &amp; Foodstuff Supplies</option>
                      <option value="Poultry Products & Feeds">Poultry Products &amp; Feeds</option>
                      <option value="Landscaping & Cleaning">Landscaping &amp; Cleaning</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Selling Price (KES)</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple font-mono"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Product Picture URL</label>
                    <input
                      type="text"
                      required
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder="https://... or /image.jpg"
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-bold text-gelwo-purple mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Key specifications, warranty details, and institutional application..."
                    className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3.5 btn-primary rounded-xl text-xs uppercase font-extrabold flex items-center space-x-2"
                  >
                    <FiPlus />
                    <span>[ PUBLISH PRODUCT TO FRONTEND ]</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live Products Inventory Table */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/30 space-y-4">
              <div className="flex justify-between items-center border-b border-gelwo-gray dark:border-gelwo-royal pb-4">
                <h3 className="text-xl font-bold font-heading">Active Catalogue Products &amp; Prices</h3>
                <span className="text-xs font-mono font-bold text-gelwo-sage">{products.length} Products Active</span>
              </div>

              <div className="space-y-3">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gelwo-midnight flex-shrink-0">
                        <img src={prod.mainImage} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gelwo-purple/15 text-gelwo-purple font-bold">
                          {prod.category}
                        </span>
                        <h4 className="font-bold text-sm font-heading mt-0.5">{prod.name}</h4>
                        <p className="text-xs text-gelwo-midnight/60 dark:text-gelwo-gray line-clamp-1">{prod.shortDescription}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-[10px] text-gelwo-midnight/50 dark:text-gelwo-gray block uppercase">Price (KES)</span>
                        <input
                          type="number"
                          defaultValue={prod.price}
                          onBlur={(e) => handleUpdateProductPrice(prod, Number(e.target.value))}
                          className="w-28 bg-gelwo-ivory dark:bg-gelwo-midnight border border-gelwo-gray dark:border-gelwo-purple/30 rounded-lg px-2 py-1 text-xs font-mono font-bold text-gelwo-purple text-right"
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Product"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: INVOICES, RECEIPTS & DELIVERY NOTES GENERATOR ───────────── */}
        {activeMainTab === 'documents' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Document Creation Form */}
            <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/30 space-y-6">
              <div className="border-b border-gelwo-gray dark:border-gelwo-royal pb-4">
                <span className="text-xs font-mono text-gelwo-purple uppercase">COMMERCIAL BILLING &amp; DISPATCH</span>
                <h3 className="text-xl font-bold font-heading">Generate Official Document</h3>
              </div>

              <form onSubmit={handleCreateDocument} className="space-y-4 text-xs">
                {/* Doc Type Selector */}
                <div>
                  <label className="block uppercase font-bold text-gelwo-purple mb-1">Document Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['invoice', 'receipt', 'delivery_note'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setDocType(type)}
                        className={`py-2.5 px-3 rounded-xl font-bold uppercase transition-all ${
                          docType === type
                            ? 'bg-gelwo-purple text-gelwo-ivory shadow'
                            : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/70 dark:text-gelwo-gray'
                        }`}
                      >
                        {type.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Customer / Representative Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Eng. John Doe"
                      value={docClientName}
                      onChange={(e) => setDocClientName(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Customer Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="client@institution.go.ke"
                      value={docClientEmail}
                      onChange={(e) => setDocClientEmail(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Organization / Ministry</label>
                    <input
                      type="text"
                      placeholder="County Ministry of Health"
                      value={docOrg}
                      onChange={(e) => setDocOrg(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Reference Quotation # (Optional)</label>
                    <input
                      type="text"
                      placeholder="GLW-QT-2026-00125"
                      value={docRefQuote}
                      onChange={(e) => setDocRefQuote(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple font-mono"
                    />
                  </div>
                </div>

                {docType === 'delivery_note' && (
                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Site Delivery Address</label>
                    <input
                      type="text"
                      placeholder="Nakuru Sub-County Hospital Solar Substation"
                      value={docDeliveryAddress}
                      onChange={(e) => setDocDeliveryAddress(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>
                )}

                {/* Line Items */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="block uppercase font-bold text-gelwo-purple">Itemized Particulars</label>
                    <button
                      type="button"
                      onClick={addLineItem}
                      className="text-xs text-gelwo-sage font-bold font-mono hover:underline"
                    >
                      + Add Item Line
                    </button>
                  </div>

                  {docItems.map((item, idx) => (
                    <div key={idx} className="p-3 bg-gelwo-blush dark:bg-gelwo-royal rounded-xl space-y-2 border border-gelwo-gray dark:border-gelwo-purple/10">
                      <input
                        type="text"
                        required
                        placeholder="Item Description"
                        value={item.description}
                        onChange={(e) => updateLineItem(idx, 'description', e.target.value)}
                        className="w-full bg-transparent border-b border-gelwo-gray dark:border-gelwo-purple/30 pb-1 text-xs focus:outline-none"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-[10px] text-gelwo-midnight/50 dark:text-gelwo-gray">Qty</span>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(idx, 'quantity', Number(e.target.value))}
                            className="w-full bg-transparent font-mono"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] text-gelwo-midnight/50 dark:text-gelwo-gray">Unit Price</span>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(idx, 'unitPrice', Number(e.target.value))}
                            className="w-full bg-transparent font-mono"
                          />
                        </div>
                        <div className="text-right flex items-end justify-end space-x-2">
                          <span className="font-mono font-bold text-gelwo-purple text-xs">
                            KES {item.total.toLocaleString()}
                          </span>
                          {docItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeLineItem(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 btn-primary rounded-xl text-xs uppercase font-extrabold"
                  >
                    [ GENERATE &amp; DISPATCH {docType.toUpperCase().replace('_', ' ')} ]
                  </button>
                </div>
              </form>
            </div>

            {/* Generated Documents List */}
            <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-3xl border border-gelwo-purple/30 space-y-4">
              <div className="flex justify-between items-center border-b border-gelwo-gray dark:border-gelwo-royal pb-4">
                <h3 className="text-xl font-bold font-heading">Issued Documents Registry</h3>
                <span className="text-xs font-mono font-bold text-gelwo-sage">{documents.length} Dispatched</span>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 rounded-2xl bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-gelwo-purple/15 text-gelwo-purple font-mono font-bold text-[10px] uppercase">
                          {doc.docType.replace('_', ' ')}
                        </span>
                        <h4 className="font-bold text-sm font-heading mt-1">{doc.docNumber}</h4>
                        <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                          {doc.customerName} ({doc.organization || 'Client'}) • {doc.customerEmail}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-gelwo-purple block">
                          KES {doc.totalAmount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gelwo-midnight/50 dark:text-gelwo-gray block font-mono">
                          {new Date(doc.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => downloadDocumentPDF(doc)}
                        className="px-4 py-2 rounded-xl btn-secondary text-xs font-bold font-mono flex items-center space-x-1.5"
                      >
                        <FiDownload />
                        <span>Download Official Copy</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: 15-DIVISION SERVICES CMS ───────────────────────────────── */}
        {activeMainTab === 'services' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 glass-card p-6 rounded-3xl border border-gelwo-purple/30 space-y-4">
              <span className="text-xs font-mono font-bold text-gelwo-purple uppercase tracking-wider block">
                SELECT SERVICE DIVISION
              </span>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 text-xs font-mono font-bold">
                {catalogueData.map((div) => (
                  <button
                    key={div.id}
                    onClick={() => setSelectedDivisionId(div.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl transition-all flex items-center justify-between ${
                      selectedDivisionId === div.id
                        ? 'bg-gelwo-purple text-gelwo-ivory shadow-gelwo-purple'
                        : 'bg-gelwo-blush dark:bg-gelwo-royal text-gelwo-midnight/80 dark:text-gelwo-gray'
                    }`}
                  >
                    <span className="truncate pr-2">
                      {div.code}. {div.icon} {div.name}
                    </span>
                    {selectedDivisionId === div.id && <FiCheck className="text-gelwo-ivory flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 glass-card p-8 rounded-3xl border border-gelwo-purple/30 space-y-6">
              <div className="border-b border-gelwo-gray dark:border-gelwo-royal pb-4">
                <span className="text-xs font-mono text-gelwo-purple uppercase">DIVISION {currentDivision.code} EDITOR</span>
                <h3 className="text-2xl font-bold font-heading">
                  {currentDivision.icon} {currentDivision.name}
                </h3>
              </div>

              <form onSubmit={handlePublishDivision} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase font-bold text-gelwo-purple mb-1">Division Title</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Pricing Model</label>
                    <select
                      value={editPricing}
                      onChange={(e) => setEditPricing(e.target.value as any)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    >
                      <option value="Custom Quotation Engine">Custom Quotation Engine</option>
                      <option value="Bill of Quantities (BOQ)">Bill of Quantities (BOQ)</option>
                      <option value="Fixed Rate / Unit Price">Fixed Rate / Unit Price</option>
                      <option value="Framework Supply Contract">Framework Supply Contract</option>
                      <option value="Monthly Retainer">Monthly Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase font-bold text-gelwo-purple mb-1">Standard Delivery / Lead Time</label>
                    <input
                      type="text"
                      value={editLeadTime}
                      onChange={(e) => setEditLeadTime(e.target.value)}
                      className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-bold text-gelwo-purple mb-1">Overview Description</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-xl px-4 py-3 focus:outline-none focus:border-gelwo-purple"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 btn-primary rounded-xl text-xs uppercase font-extrabold"
                  >
                    [ SAVE DIVISION SETTINGS ]
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── TAB 4: QUOTATIONS DESK ────────────────────────────────────────── */}
        {activeMainTab === 'quotations' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-heading uppercase">
              Customer Quotations &amp; Scope Inquiries
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {quotations.map((q) => (
                <div
                  key={q.id}
                  className="glass-card p-6 rounded-2xl border border-gelwo-purple/30 flex flex-wrap justify-between items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs font-bold text-gelwo-purple">{q.refNumber}</span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-gelwo-purple/20 text-gelwo-purple">
                        {q.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-base font-heading">{q.serviceCategory}</h4>
                    <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray">
                      Client: <strong>{q.customerName}</strong> ({q.customerEmail}) • Org: {q.organization || 'N/A'} • Est: <span className="font-bold text-gelwo-purple">{q.estimatedCost}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={async () => {
                        await updateQuotationStatus(q.id, 'Approved');
                        const updated = await fetchUserQuotations();
                        setQuotations(updated);
                        notifySuccess(`Quotation ${q.refNumber} Approved!`);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-600 border border-emerald-500/40 text-xs font-bold font-mono"
                    >
                      ✓ Approve Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
