import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdpcefbvfxgrmwcoefl.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZHBjZWZidmZ4Z3Jtd2NvZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDYwNTgsImV4cCI6MjEwMjg4MjA1OH0.Ou3RBkN-QRrWHe8_ZBpd5iFTwjOKxztvaiYu68Xfgo0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
  phone?: string;
  role: 'customer' | 'admin' | 'staff';
  createdAt: string;
}

export interface QuotationRecord {
  id: string;
  refNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  organization?: string;
  serviceCategory: string;
  subCategory?: string;
  scopeSize: string;
  clientType: string;
  estimatedCost: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'In Progress' | 'Completed';
  createdAt: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  divisionCode?: string;
  shortDescription: string;
  price: number;
  currency: string;
  pricingType?: 'fixed' | 'contact' | 'custom';
  mainImage: string;
  featured?: boolean;
  stock?: number;
  createdAt: string;
}

export interface DocumentLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface OfficialDocument {
  id: string;
  docType: 'invoice' | 'receipt' | 'delivery_note';
  docNumber: string;
  refQuoteNumber?: string;
  customerName: string;
  customerEmail: string;
  organization?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  items: DocumentLineItem[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
  status: 'Issued' | 'Paid' | 'Dispatched' | 'Delivered' | 'Pending';
  issueDate: string;
  dueDate?: string;
  notes?: string;
}

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const STORAGE_USERS_KEY = 'gelwo_users_db';
const STORAGE_QUOTES_KEY = 'gelwo_quotes_db';
const STORAGE_PRODUCTS_KEY = 'gelwo_products_db';
const STORAGE_DOCS_KEY = 'gelwo_documents_db';
const STORAGE_CURRENT_USER = 'gelwo_current_user';

const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('supabase.co') &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 20
  );
};

// ─── Initial Seed Products ────────────────────────────────────────────────────
const SEED_PRODUCTS: ProductItem[] = [
  {
    id: 'prod_1',
    slug: 'biometric-facial-recognition-terminal',
    name: 'GELWO AI Biometric Face & Fingerprint Terminal',
    category: 'ICT, Biometric & Security',
    divisionCode: 'B',
    shortDescription: 'Dual-camera AI facial recognition with thermal body temperature detection, RFID smart card reader, and automated time-attendance sync.',
    price: 68000,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stock: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_2',
    slug: 'tier-1-bifacial-solar-panel-550w',
    name: 'Tier-1 Mono-Crystalline Bifacial Solar Panel 550W',
    category: 'Solar & Renewable Energy',
    divisionCode: 'D',
    shortDescription: 'High-efficiency 22.4% module with dual-sided glass power generation for microgrids and commercial rooftop solarization.',
    price: 18500,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stock: 140,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_3',
    slug: 'enterprise-erp-core-license',
    name: 'GELWO Enterprise ERP Core Suite (Next.js & Supabase)',
    category: 'Software Development & Digital Solutions',
    divisionCode: 'SW',
    shortDescription: 'Tailored enterprise ERP integrating accounting, KRA tax compliance, inventory barcoding, HR payroll, and real-time county tender portals.',
    price: 350000,
    currency: 'KES',
    pricingType: 'custom',
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    stock: 99,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_4',
    slug: 'industrial-cctv-bullet-4k-ip',
    name: '4K Ultra-HD Smart Night Vision IP CCTV Camera',
    category: 'ICT, Biometric & Security',
    divisionCode: 'B',
    shortDescription: 'IP67 weatherproof bullet camera with AI vehicle number plate recognition, infrared night vision up to 80m, and PoE support.',
    price: 14500,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stock: 60,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_5',
    slug: 'grade-1-white-maize-90kg',
    name: 'Certified Grade-1 White Maize (90kg Institutional Sack)',
    category: 'Cereals & Foodstuff Supplies',
    divisionCode: 'K',
    shortDescription: 'KEBS tested moisture-controlled bulk dry white maize for schools, hospitals, and national emergency relief programmes.',
    price: 4200,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stock: 500,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_6',
    slug: 'executive-ergonomic-mesh-chair',
    name: 'GELWO Executive High-Back Ergonomic Office Chair',
    category: 'General Supplies & Services',
    divisionCode: 'A',
    shortDescription: 'Heavy-duty breathable mesh chair with 3D adjustable armrests, lumbar spine support, and 5-star chrome caster base.',
    price: 24500,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1580481077197-28ed4101e403?auto=format&fit=crop&w=800&q=80',
    featured: false,
    stock: 40,
    createdAt: new Date().toISOString(),
  },
];

// ─── Initial Seed Documents ───────────────────────────────────────────────────
const SEED_DOCUMENTS: OfficialDocument[] = [
  {
    id: 'doc_1',
    docType: 'invoice',
    docNumber: 'GLW-INV-2026-088',
    refQuoteNumber: 'GLW-QT-2026-00125',
    customerName: 'Eng. John Doe',
    customerEmail: 'client@institution.go.ke',
    organization: 'County Ministry of Health',
    customerPhone: '+254 797 829 911',
    deliveryAddress: 'County HQ, Nairobi',
    items: [
      { description: 'Hospital Management System (Phase 1 Deployment)', quantity: 1, unitPrice: 350000, total: 350000 },
      { description: 'Biometric Access Integration & Server Config', quantity: 2, unitPrice: 68000, total: 136000 },
      { description: 'Cloud Infrastructure & SSL Setup (1 Year)', quantity: 1, unitPrice: 64000, total: 64000 },
    ],
    subtotal: 550000,
    vatAmount: 88000,
    totalAmount: 638000,
    status: 'Paid',
    issueDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    notes: 'Thank you for partnering with GELWO Technologies. Payment processed via direct bank wire.',
  },
  {
    id: 'doc_2',
    docType: 'receipt',
    docNumber: 'GLW-REC-2026-088',
    refQuoteNumber: 'GLW-QT-2026-00125',
    customerName: 'Eng. John Doe',
    customerEmail: 'client@institution.go.ke',
    organization: 'County Ministry of Health',
    customerPhone: '+254 797 829 911',
    items: [
      { description: 'Settlement for Invoice GLW-INV-2026-088', quantity: 1, unitPrice: 638000, total: 638000 },
    ],
    subtotal: 550000,
    vatAmount: 88000,
    totalAmount: 638000,
    status: 'Issued',
    issueDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Official Tax Receipt. Certified by GELWO Finance Desk.',
  },
  {
    id: 'doc_3',
    docType: 'delivery_note',
    docNumber: 'GLW-DEL-2026-042',
    refQuoteNumber: 'GLW-QT-2026-00188',
    customerName: 'Eng. John Doe',
    customerEmail: 'client@institution.go.ke',
    organization: 'County Ministry of Health',
    customerPhone: '+254 797 829 911',
    deliveryAddress: 'Nakuru Sub-County Hospital Solar Substation',
    items: [
      { description: 'Tier-1 Mono-Crystalline Bifacial Solar Panels 550W', quantity: 40, unitPrice: 18500, total: 740000 },
      { description: 'LiFePO4 Lithium Solar Battery Pack 48V 200Ah', quantity: 4, unitPrice: 280000, total: 1120000 },
      { description: 'Hybrid Inverter 15kVA Three-Phase', quantity: 1, unitPrice: 420000, total: 420000 },
    ],
    subtotal: 2280000,
    vatAmount: 0,
    totalAmount: 2280000,
    status: 'Delivered',
    issueDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    notes: 'Goods delivered in good condition and inspected on site by site engineer.',
  },
];

// ─── Auth Helpers ─────────────────────────────────────────────────────────────

export async function signUpUser(data: {
  email: string;
  password?: string;
  fullName: string;
  companyName?: string;
  phone?: string;
  role?: 'customer' | 'admin';
}): Promise<{ user: UserProfile | null; error: string | null }> {
  try {
    if (isSupabaseConfigured()) {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password || 'TemporaryPass123!',
        options: {
          data: {
            full_name: data.fullName,
            company_name: data.companyName,
            phone: data.phone,
            role: data.role || 'customer',
          },
        },
      });

      if (error) return { user: null, error: error.message };

      const userProfile: UserProfile = {
        id: authData.user?.id || `usr_${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        companyName: data.companyName,
        phone: data.phone,
        role: data.role || 'customer',
        createdAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(userProfile));
      }
      return { user: userProfile, error: null };
    }

    // Local / Demo Fallback Mode
    if (typeof window !== 'undefined') {
      const existingUsers: UserProfile[] = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      const found = existingUsers.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
      if (found) {
        return { user: null, error: 'An account with this email already exists. Please log in.' };
      }

      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        companyName: data.companyName || 'Corporate Client',
        phone: data.phone || '+254 700 000 000',
        role: data.role || (data.email.includes('admin') ? 'admin' : 'customer'),
        createdAt: new Date().toISOString(),
      };

      existingUsers.push(newUser);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(existingUsers));
      localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(newUser));
      return { user: newUser, error: null };
    }

    return { user: null, error: 'Window context missing' };
  } catch (err: any) {
    return { user: null, error: err.message || 'Signup failed' };
  }
}

export async function signInUser(
  email: string,
  password?: string
): Promise<{ user: UserProfile | null; error: string | null }> {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || '',
      });
      if (error) return { user: null, error: error.message };

      const userProfile: UserProfile = {
        id: data.user?.id || `usr_${Date.now()}`,
        email: data.user?.email || email,
        fullName: data.user?.user_metadata?.full_name || 'Client',
        companyName: data.user?.user_metadata?.company_name || 'Corporate Entity',
        phone: data.user?.user_metadata?.phone,
        role: data.user?.user_metadata?.role || (email.includes('admin') ? 'admin' : 'customer'),
        createdAt: new Date().toISOString(),
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(userProfile));
      }
      return { user: userProfile, error: null };
    }

    // Local / Demo Fallback Mode
    if (typeof window !== 'undefined') {
      const existingUsers: UserProfile[] = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '[]');
      let user = existingUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        user = {
          id: `usr_${Date.now()}`,
          email,
          fullName: email.includes('admin') ? 'GELWO Administrator' : 'Eng. Client',
          companyName: 'Institutional Client',
          role: email.includes('admin') ? 'admin' : 'customer',
          createdAt: new Date().toISOString(),
        };
        existingUsers.push(user);
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(existingUsers));
      }

      localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(user));
      return { user, error: null };
    }

    return { user: null, error: 'Context unavailable' };
  } catch (err: any) {
    return { user: null, error: err.message || 'Login failed' };
  }
}

export function getCurrentLocalUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_CURRENT_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function signOutLocalUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_CURRENT_USER);
  }
  if (isSupabaseConfigured()) {
    supabase.auth.signOut();
  }
}

// ─── Products API Helpers ─────────────────────────────────────────────────────

export async function fetchPublicProducts(): Promise<ProductItem[]> {
  if (typeof window === 'undefined') return SEED_PRODUCTS;

  const raw = localStorage.getItem(STORAGE_PRODUCTS_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(SEED_PRODUCTS));
    return SEED_PRODUCTS;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return SEED_PRODUCTS;
  }
}

export async function createOrUpdateProduct(product: Omit<ProductItem, 'id' | 'createdAt'> & { id?: string }): Promise<ProductItem> {
  const products = await fetchPublicProducts();
  let updatedProduct: ProductItem;

  if (product.id) {
    updatedProduct = {
      ...product,
      id: product.id,
      createdAt: new Date().toISOString(),
    };
    const nextList = products.map((p) => (p.id === product.id ? updatedProduct : p));
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(nextList));
  } else {
    updatedProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    products.unshift(updatedProduct);
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  }

  return updatedProduct;
}

export async function deleteProductItem(id: string): Promise<boolean> {
  const products = await fetchPublicProducts();
  const filtered = products.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
}

// ─── Quotations Helpers ───────────────────────────────────────────────────────

export async function saveQuotation(quote: Omit<QuotationRecord, 'id' | 'refNumber' | 'createdAt' | 'status'>): Promise<{ quotation: QuotationRecord | null; error: string | null }> {
  const refNumber = `GLW-QT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const newQuotation: QuotationRecord = {
    ...quote,
    id: `qt_${Date.now()}`,
    refNumber,
    status: 'Submitted',
    createdAt: new Date().toISOString(),
  };

  try {
    if (isSupabaseConfigured()) {
      await supabase.from('quotations').insert([newQuotation]);
    }
  } catch (e) {
    console.warn('Supabase sync notice:', e);
  }

  if (typeof window !== 'undefined') {
    const existingQuotes: QuotationRecord[] = JSON.parse(localStorage.getItem(STORAGE_QUOTES_KEY) || '[]');
    existingQuotes.unshift(newQuotation);
    localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(existingQuotes));
  }

  return { quotation: newQuotation, error: null };
}

export async function fetchUserQuotations(email?: string): Promise<QuotationRecord[]> {
  if (typeof window === 'undefined') return [];

  const localQuotes: QuotationRecord[] = JSON.parse(localStorage.getItem(STORAGE_QUOTES_KEY) || '[]');
  if (localQuotes.length === 0) {
    const defaultSeed: QuotationRecord[] = [
      {
        id: 'qt_seed_1',
        refNumber: 'GLW-QT-2026-00125',
        customerName: 'Eng. John Doe',
        customerEmail: email || 'client@institution.go.ke',
        organization: 'County Ministry of Health',
        serviceCategory: 'Software Development & Digital Solutions',
        subCategory: 'Enterprise Hospital Management System',
        scopeSize: 'Enterprise',
        clientType: 'Government / County',
        estimatedCost: 'KES 550,000',
        status: 'Approved',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(defaultSeed));
    return defaultSeed;
  }

  if (email) {
    return localQuotes.filter((q) => !q.customerEmail || q.customerEmail.toLowerCase() === email.toLowerCase());
  }

  return localQuotes;
}

export async function updateQuotationStatus(id: string, status: QuotationRecord['status']): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const localQuotes: QuotationRecord[] = JSON.parse(localStorage.getItem(STORAGE_QUOTES_KEY) || '[]');
  const updated = localQuotes.map((q) => (q.id === id ? { ...q, status } : q));
  localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(updated));
  return true;
}

// ─── Documents (Invoices, Receipts, Delivery Notes) ───────────────────────────

export async function fetchOfficialDocuments(email?: string): Promise<OfficialDocument[]> {
  if (typeof window === 'undefined') return SEED_DOCUMENTS;

  const raw = localStorage.getItem(STORAGE_DOCS_KEY);
  let docs: OfficialDocument[] = SEED_DOCUMENTS;

  if (!raw) {
    localStorage.setItem(STORAGE_DOCS_KEY, JSON.stringify(SEED_DOCUMENTS));
  } else {
    try {
      docs = JSON.parse(raw);
    } catch {
      docs = SEED_DOCUMENTS;
    }
  }

  if (email) {
    return docs.filter((d) => !d.customerEmail || d.customerEmail.toLowerCase() === email.toLowerCase());
  }
  return docs;
}

export async function createOfficialDocument(doc: Omit<OfficialDocument, 'id' | 'docNumber' | 'issueDate'>): Promise<OfficialDocument> {
  const prefix = doc.docType === 'invoice' ? 'GLW-INV' : doc.docType === 'receipt' ? 'GLW-REC' : 'GLW-DEL';
  const docNumber = `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newDoc: OfficialDocument = {
    ...doc,
    id: `doc_${Date.now()}`,
    docNumber,
    issueDate: new Date().toISOString(),
  };

  const docs = await fetchOfficialDocuments();
  docs.unshift(newDoc);

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_DOCS_KEY, JSON.stringify(docs));
  }

  return newDoc;
}
