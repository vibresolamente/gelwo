import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdpcefbvfxgrmwcoefl.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZHBjZWZidmZ4Z3Jtd2NvZWZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMDYwNTgsImV4cCI6MjEwMjg4MjA1OH0.Ou3RBkN-QRrWHe8_ZBpd5iFTwjOKxztvaiYu68Xfgo0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─────────────────────────────────────────────────────────────────────────────
// 1. IDENTITY, RBAC & CUSTOMER CRM
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole =
  | 'super_admin'
  | 'finance'
  | 'sales'
  | 'inventory'
  | 'project_manager'
  | 'technician'
  | 'support'
  | 'content_manager'
  | 'customer'
  | 'staff'
  | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
  phone?: string;
  address?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. COMMERCE: PRODUCTS & INVENTORY
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductItem {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: string;
  divisionCode?: string;
  shortDescription: string;
  description?: string;
  price: number;
  costPrice: number;
  currency: string;
  pricingType?: 'fixed' | 'contact' | 'custom';
  mainImage: string;
  gallery?: string[];
  featured?: boolean;
  active?: boolean;
  stock: number;
  openingStock: number;
  purchases: number;
  sales: number;
  returns: number;
  damaged: number;
  reserved: number;
  availableStock: number;
  reorderLevel: number;
  supplier: string;
  warranty: string;
  deliveryTime: string;
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface ProductOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'M-PESA' | 'Bank Wire' | 'Card' | 'Invoice Credit';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  trackingStep: 'placed' | 'paid' | 'processing' | 'packed' | 'dispatched' | 'transit' | 'delivered';
  trackingHistory: {
    status: string;
    title: string;
    description: string;
    time: string;
    completed: boolean;
  }[];
  driverName?: string;
  driverPhone?: string;
  vehicleReg?: string;
  deliveryDate?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. SERVICES, QUOTATION ENGINE & PRICING ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export interface ServiceInventoryItem {
  id: string;
  serviceId: string;
  serviceName: string;
  type: 'material' | 'labour' | 'equipment' | 'digital_resource';
  name: string;
  unit: string;
  unitCost: number;
  availableQty: number;
  assignedQty: number;
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
  details?: Record<string, any>;
  modules?: string[];
  timelineDays?: number;
  basePrice?: number;
  materialCost?: number;
  labourCost?: number;
  transportCost?: number;
  discount?: number;
  tax?: number;
  estimatedCost: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. SERVICE SCHEDULING, PROJECTS & DAILY OPERATIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface ScheduledService {
  id: string;
  serviceCode: string;
  title: string;
  customerName: string;
  customerPhone: string;
  location: string;
  assignedStaff: string[];
  date: string;
  startTime: string;
  endTime: string;
  estimatedHours: number;
  actualHours?: number;
  materials: string[];
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed';
  delayReason?: string;
  reportUrl?: string;
  notes?: string;
  createdAt: string;
}

export interface ClientProject {
  id: string;
  projectNumber: string;
  title: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  valueKES: number;
  progressPercent: number;
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
  startDate: string;
  estimatedCompletion: string;
  currentMilestone: string;
  milestones: {
    name: string;
    status: 'completed' | 'current' | 'pending';
    date?: string;
  }[];
  team: {
    name: string;
    role: string;
    avatar: string;
  }[];
  files: {
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
  messages: {
    id: string;
    sender: string;
    isClient: boolean;
    text: string;
    time: string;
    attachment?: string;
  }[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. HUMAN RESOURCES: STAFF, PAYROLL, LEAVE, RECRUITMENT & SEPARATION
// ─────────────────────────────────────────────────────────────────────────────

export interface StaffEmployee {
  id: string;
  employeeNumber: string;
  fullName: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  kraPin: string;
  nssfNumber: string;
  shaNumber: string;
  contractType: 'Permanent' | 'Contract' | 'Probation' | 'Internship';
  basicSalary: number;
  allowances: number;
  bankName: string;
  bankAccount: string;
  emergencyContact: string;
  startDate: string;
  status: 'Active' | 'On Leave' | 'Off Duty' | 'Separated';
  offDay: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  leaveBalance: number;
}

export interface PayrollRecord {
  id: string;
  payrollMonth: string; // e.g. "August 2026"
  employeeId: string;
  employeeName: string;
  basicSalary: number;
  allowances: number;
  overtime: number;
  bonuses: number;
  grossPay: number;
  paye: number;
  shaShif: number; // 2.75% of Gross
  nssf: number; // Tier I + II statutory
  otherDeductions: number;
  netPay: number;
  paymentStatus: 'Paid' | 'Pending' | 'Processing';
  generatedDate: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'Annual Leave' | 'Sick Leave' | 'Family / Maternity' | 'Study Leave' | 'Compassionate';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  reviewedBy?: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salaryRange: string;
  status: 'Open' | 'Interviewing' | 'Closed';
  applicantsCount: number;
  shortlistedCount: number;
  interviewCount: number;
  offersCount: number;
  hiredCount: number;
}

export interface JobApplicant {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  experience: string;
  stage: 'Applied' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: string;
}

export interface EmployeeSeparation {
  id: string;
  employeeId: string;
  employeeName: string;
  reason: 'Resignation' | 'Retirement' | 'Contract End' | 'Termination';
  noticeDate: string;
  lastWorkingDay: string;
  clearanceAssetReturned: boolean;
  clearanceFinanceSettled: boolean;
  clearanceITDeactivated: boolean;
  status: 'Initiated' | 'In Clearance' | 'Finalized' | 'Archived';
  notes: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. OFFICIAL DOCUMENTS & COMPLIANCE
// ─────────────────────────────────────────────────────────────────────────────

export interface DocumentLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface OfficialDocument {
  id: string;
  docType:
    | 'invoice'
    | 'receipt'
    | 'delivery_note'
    | 'quotation'
    | 'etims_report'
    | 'service_report'
    | 'contract'
    | 'compliance_cert';
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
  status: 'Issued' | 'Paid' | 'Dispatched' | 'Delivered' | 'Pending' | 'Verified';
  issueDate: string;
  dueDate?: string;
  notes?: string;
  publishedToCustomer: boolean;
  pdfDownloadUrl?: string;
}

export interface ETimsReportRecord {
  id: string;
  reportNumber: string;
  reportType: 'Sales by Invoice' | 'Sales by Item' | 'Purchase Report' | 'Tax Summary';
  period: string;
  totalSalesKES: number;
  totalVatKES: number;
  generatedBy: string;
  generatedAt: string;
  status: 'Verified' | 'Pending Submission';
  publishedToCustomer: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORAGE KEYS
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_USERS_KEY = 'gelwo_users_db_v2';
const STORAGE_PRODUCTS_KEY = 'gelwo_products_db_v2';
const STORAGE_ORDERS_KEY = 'gelwo_orders_db_v2';
const STORAGE_QUOTES_KEY = 'gelwo_quotes_db_v2';
const STORAGE_SCHEDULE_KEY = 'gelwo_schedule_db_v2';
const STORAGE_PROJECTS_KEY = 'gelwo_projects_db_v2';
const STORAGE_STAFF_KEY = 'gelwo_staff_db_v2';
const STORAGE_PAYROLL_KEY = 'gelwo_payroll_db_v2';
const STORAGE_LEAVE_KEY = 'gelwo_leave_db_v2';
const STORAGE_JOBS_KEY = 'gelwo_jobs_db_v2';
const STORAGE_APPLICANTS_KEY = 'gelwo_applicants_db_v2';
const STORAGE_SEPARATIONS_KEY = 'gelwo_separations_db_v2';
const STORAGE_DOCS_KEY = 'gelwo_documents_db_v2';
const STORAGE_ETIMS_KEY = 'gelwo_etims_db_v2';
const STORAGE_CURRENT_USER = 'gelwo_current_user_v2';

const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('supabase.co') &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 20
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────────────────────────────────────

export const SEED_PRODUCTS: ProductItem[] = [
  {
    id: 'prod_1',
    sku: 'GEL-ICT-00042',
    slug: 'biometric-facial-recognition-terminal',
    name: 'GELWO AI Biometric Face & Fingerprint Terminal',
    category: 'ICT Equipment',
    divisionCode: 'B',
    shortDescription: 'Dual-camera AI facial recognition with thermal detection and time-attendance sync.',
    description: 'High-speed industrial biometric terminal with 0.2s recognition, anti-spoofing algorithm, 50,000 face capacity, PoE, and KRA/ERP automated payroll integration.',
    price: 68000,
    costPrice: 42000,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    featured: true,
    active: true,
    stock: 25,
    openingStock: 30,
    purchases: 10,
    sales: 12,
    returns: 1,
    damaged: 0,
    reserved: 4,
    availableStock: 25,
    reorderLevel: 10,
    supplier: 'Hikvision & Dahua Kenya Ltd',
    warranty: '2 Years Manufacturer Warranty',
    deliveryTime: '1-2 Business Days across Kenya',
    specifications: {
      'Face Capacity': '50,000',
      'Card Reader': 'Mifare / RFID 13.56MHz',
      'Connectivity': 'TCP/IP, Wi-Fi, RS485, Wiegand',
      'Display': '7-inch IPS Touch Screen',
    },
    rating: 4.9,
    reviewCount: 38,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_2',
    sku: 'GEL-SOL-00108',
    slug: 'tier-1-bifacial-solar-panel-550w',
    name: 'Tier-1 Mono-Crystalline Bifacial Solar Panel 550W',
    category: 'Solar',
    divisionCode: 'D',
    shortDescription: 'High-efficiency 22.4% module with dual-sided glass power generation.',
    description: 'Tier-1 certified high-performance solar panel for commercial rooftop solarization, off-grid hospitals, schools, and institutional microgrids.',
    price: 18500,
    costPrice: 13000,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    featured: true,
    active: true,
    stock: 140,
    openingStock: 200,
    purchases: 100,
    sales: 140,
    returns: 0,
    damaged: 2,
    reserved: 18,
    availableStock: 140,
    reorderLevel: 30,
    supplier: 'JA Solar & Longi Solar East Africa',
    warranty: '25 Years Linear Power Output',
    deliveryTime: '2-4 Business Days',
    specifications: {
      'Rated Power': '550W',
      'Cell Type': 'N-Type Monocrystalline',
      'Efficiency': '22.4%',
      'Weight': '28.5 kg',
    },
    rating: 4.8,
    reviewCount: 42,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_3',
    sku: 'GEL-SW-00012',
    slug: 'enterprise-erp-core-license',
    name: 'GELWO Enterprise ERP Core Suite (Next.js & Supabase)',
    category: 'Software Development',
    divisionCode: 'SW',
    shortDescription: 'Tailored enterprise ERP integrating finance, eTIMS, inventory, HR payroll, and portal.',
    description: 'Full-stack cloud-native enterprise business management system featuring real-time KRA eTIMS integration, M-Pesa automated reconciliation, CRM, and customer portal.',
    price: 350000,
    costPrice: 80000,
    currency: 'KES',
    pricingType: 'custom',
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    active: true,
    stock: 99,
    openingStock: 100,
    purchases: 0,
    sales: 15,
    returns: 0,
    damaged: 0,
    reserved: 5,
    availableStock: 94,
    reorderLevel: 5,
    supplier: 'GELWO Tech Labs Nairobi',
    warranty: '1 Year SLA & Free Upgrades',
    deliveryTime: 'Immediate Digital Provisioning',
    specifications: {
      'Deployment': 'Cloud / Hybrid / On-Premise',
      'Database': 'PostgreSQL / Supabase Enterprise',
      'Compliance': 'KRA eTIMS, SHA/SHIF, NSSF Ready',
      'Users': 'Unlimited Concurrent Users',
    },
    rating: 5.0,
    reviewCount: 19,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_4',
    sku: 'GEL-CCTV-00094',
    slug: 'industrial-cctv-bullet-4k-ip',
    name: '4K Ultra-HD Smart Night Vision IP CCTV Camera',
    category: 'ICT Equipment',
    divisionCode: 'B',
    shortDescription: 'IP67 weatherproof bullet camera with vehicle license plate recognition.',
    description: 'High-definition 4K optical zoom security camera with active deterrence strobe lights, two-way audio, and deep learning perimeter protection.',
    price: 14500,
    costPrice: 9200,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
    featured: false,
    active: true,
    stock: 60,
    openingStock: 80,
    purchases: 40,
    sales: 55,
    returns: 0,
    damaged: 1,
    reserved: 4,
    availableStock: 60,
    reorderLevel: 15,
    supplier: 'Dahua Technologies Kenya',
    warranty: '3 Years Full Warranty',
    deliveryTime: '1-2 Days',
    specifications: {
      'Resolution': '3840 x 2160 (8MP 4K)',
      'Night Vision': 'ColorVu up to 50 meters',
      'Housing': 'Metal IP67 Weatherproof',
    },
    rating: 4.7,
    reviewCount: 26,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod_5',
    sku: 'GEL-STAT-00210',
    slug: 'executive-ergonomic-mesh-chair',
    name: 'GELWO Executive High-Back Ergonomic Office Chair',
    category: 'Office Stationery',
    divisionCode: 'A',
    shortDescription: 'Heavy-duty breathable mesh chair with 3D lumbar support and chrome base.',
    description: 'Premium executive office chair engineered for posture health, 135-degree recline mechanism, padded armrests, and certified Class-4 gas lift.',
    price: 24500,
    costPrice: 15500,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: 'https://images.unsplash.com/photo-1580481077197-28ed4101e403?auto=format&fit=crop&w=800&q=80',
    featured: false,
    active: true,
    stock: 40,
    openingStock: 50,
    purchases: 20,
    sales: 28,
    returns: 0,
    damaged: 0,
    reserved: 2,
    availableStock: 40,
    reorderLevel: 10,
    supplier: 'GELWO Furniture & Stationery Supplies',
    warranty: '2 Years Mechanism Warranty',
    deliveryTime: 'Same Day in Nairobi / 48h Upcountry',
    specifications: {
      'Material': 'High-tensile Nylon Mesh',
      'Weight Capacity': '180 kg',
      'Mechanism': 'Multi-lock Sync Tilt',
    },
    rating: 4.8,
    reviewCount: 15,
    createdAt: new Date().toISOString(),
  },
];

export const SEED_ORDERS: ProductOrder[] = [
  {
    id: 'ord_1',
    orderNumber: 'GL-2026-00142',
    customerId: 'cust_101',
    customerName: 'Eng. John Doe',
    customerEmail: 'client@institution.go.ke',
    customerPhone: '+254 797 829 911',
    deliveryAddress: 'County HQ, Annex 4, Nairobi',
    items: [
      {
        productId: 'prod_1',
        productName: 'GELWO AI Biometric Face & Fingerprint Terminal',
        price: 68000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      },
    ],
    subtotal: 136000,
    tax: 21760,
    shipping: 2500,
    total: 160260,
    paymentMethod: 'M-PESA',
    paymentStatus: 'Paid',
    trackingStep: 'transit',
    driverName: 'Harrison Mwangi (Driver)',
    driverPhone: '+254 712 345 678',
    vehicleReg: 'KDF 492X (GELWO Van 02)',
    deliveryDate: '26 Aug 2026, 16:30',
    trackingHistory: [
      { status: 'Order Placed', title: 'Order Confirmed', description: 'Order GL-2026-00142 placed on portal', time: 'Today 08:30 AM', completed: true },
      { status: 'Payment Confirmed', title: 'M-Pesa Verified', description: 'KES 160,260 received via Till 908122', time: 'Today 08:32 AM', completed: true },
      { status: 'Processing', title: 'Warehouse Allocated', description: 'Items verified in Nairobi Central Depot', time: 'Today 10:15 AM', completed: true },
      { status: 'Packed', title: 'Quality Packaged', description: 'Security seals & warranty docs attached', time: 'Today 11:45 AM', completed: true },
      { status: 'Dispatched', title: 'Handed to Logistics', description: 'Van KDF 492X departed Nairobi Hub', time: 'Today 01:20 PM', completed: true },
      { status: 'In Transit', title: 'Out for Delivery', description: 'Driver Harrison is 12 mins from destination', time: 'Today 02:45 PM', completed: true },
      { status: 'Delivered', title: 'Pending Handover', description: 'Customer signature on delivery note', time: 'Est. 04:30 PM', completed: false },
    ],
    createdAt: new Date().toISOString(),
  },
];

export const SEED_PROJECTS: ClientProject[] = [
  {
    id: 'proj_1',
    projectNumber: 'GL-PROJ-0021',
    title: 'Website & Enterprise Digital Platform',
    clientName: 'Eng. John Doe',
    clientEmail: 'client@institution.go.ke',
    serviceType: 'Software Development & Digital Solutions',
    valueKES: 750000,
    progressPercent: 82,
    status: 'On Track',
    startDate: '01 Aug 2026',
    estimatedCompletion: '28 Aug 2026',
    currentMilestone: 'Integration Testing & KRA Compliance Review',
    milestones: [
      { name: '1. Requirements & Architecture Blueprint', status: 'completed', date: '04 Aug 2026' },
      { name: '2. UI/UX Prototype & Customer Portal Design', status: 'completed', date: '10 Aug 2026' },
      { name: '3. Full-Stack Development & Database Setup', status: 'completed', date: '20 Aug 2026' },
      { name: '4. Testing, Security Audit & eTIMS Verification', status: 'current', date: '25 Aug 2026' },
      { name: '5. Production Deployment & Staff Handover', status: 'pending', date: '28 Aug 2026' },
      { name: '6. Annual Maintenance & SLA Support', status: 'pending', date: 'Ongoing' },
    ],
    team: [
      { name: 'Griffin (Lead Architect)', role: 'Systems & Lead Dev', avatar: 'JG' },
      { name: 'Warren (Senior Tech)', role: 'Frontend & UI Specialist', avatar: 'WK' },
      { name: 'Esther (QA Lead)', role: 'Security & Quality Assurance', avatar: 'EN' },
    ],
    files: [
      { name: 'GELWO_Contract_Agreed.pdf', type: 'PDF', size: '2.4 MB', url: '#' },
      { name: 'Technical_Requirements_Spec.pdf', type: 'PDF', size: '4.1 MB', url: '#' },
      { name: 'Quotation_GLW-QT-2026-00125.pdf', type: 'PDF', size: '1.2 MB', url: '#' },
      { name: 'Official_Invoice_GLW-INV-088.pdf', type: 'PDF', size: '1.1 MB', url: '#' },
    ],
    messages: [
      { id: 'm1', sender: 'Eng. John Doe', isClient: true, text: 'Hello GELWO Team, can we confirm if the eTIMS automated sales reporting module is ready for inspection?', time: 'Yesterday 14:15' },
      { id: 'm2', sender: 'GELWO Engineering Desk', isClient: false, text: 'Yes Engineer! The KRA eTIMS validation endpoint is running in staging and generated the test report successfully.', time: 'Yesterday 15:30' },
    ],
  },
];

export const SEED_SCHEDULE: ScheduledService[] = [
  {
    id: 'sch_1',
    serviceCode: 'SRV-00218',
    title: 'Hospital Biometric & Server Maintenance',
    customerName: 'County Health Directorate',
    customerPhone: '+254 797 829 911',
    location: 'Nairobi Level 5 Hospital',
    assignedStaff: ['John Griffin', 'Technician Evans'],
    date: '2026-08-26',
    startTime: '09:00',
    endTime: '14:00',
    estimatedHours: 5,
    actualHours: 4.5,
    materials: ['Cat6 Shielded Cable (50m)', 'RJ45 Connectors (20pcs)', 'Network Fluke Tester'],
    status: 'In Progress',
    notes: 'Firmware upgrade and biometric sync calibration underway.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sch_2',
    serviceCode: 'SRV-00219',
    title: 'Commercial Solar PV Inverter Calibration (50kW)',
    customerName: 'Osho Chemicals Ltd',
    customerPhone: '+254 722 000 111',
    location: 'Industrial Area, Nairobi',
    assignedStaff: ['Engineer Alex', 'Technician Dennis'],
    date: '2026-08-27',
    startTime: '08:30',
    endTime: '15:30',
    estimatedHours: 7,
    materials: ['MC4 Connectors', 'DC Circuit Breakers 1000V', 'Multimeter'],
    status: 'Scheduled',
    createdAt: new Date().toISOString(),
  },
];

export const SEED_STAFF: StaffEmployee[] = [
  {
    id: 'emp_1',
    employeeNumber: 'GLW-EMP-001',
    fullName: 'John Griffin',
    department: 'Technology & Engineering',
    position: 'Chief Systems Architect',
    phone: '+254 797 829 911',
    email: 'griffin@gelwo.co.ke',
    kraPin: 'A014892341M',
    nssfNumber: 'NSSF-782019',
    shaNumber: 'SHA-8840129',
    contractType: 'Permanent',
    basicSalary: 180000,
    allowances: 35000,
    bankName: 'KCB Bank Kenya',
    bankAccount: '1289401928',
    emergencyContact: 'Mary W. (+254 711 223 344)',
    startDate: '2023-01-15',
    status: 'Active',
    offDay: 'Sunday',
    leaveBalance: 18,
  },
  {
    id: 'emp_2',
    employeeNumber: 'GLW-EMP-002',
    fullName: 'Warren Kariuki',
    department: 'Operations & Procurement',
    position: 'Senior Operations Officer',
    phone: '+254 722 456 789',
    email: 'warren@gelwo.co.ke',
    kraPin: 'A019842104K',
    nssfNumber: 'NSSF-904128',
    shaNumber: 'SHA-4109283',
    contractType: 'Permanent',
    basicSalary: 120000,
    allowances: 20000,
    bankName: 'Equity Bank',
    bankAccount: '0180293849102',
    emergencyContact: 'David K. (+254 733 998 877)',
    startDate: '2023-06-01',
    status: 'Active',
    offDay: 'Monday',
    leaveBalance: 21,
  },
  {
    id: 'emp_3',
    employeeNumber: 'GLW-EMP-003',
    fullName: 'Evans Omondi',
    department: 'Technical & Field Services',
    position: 'Lead Solar & Biometrics Technician',
    phone: '+254 714 889 001',
    email: 'evans@gelwo.co.ke',
    kraPin: 'A023491823Z',
    nssfNumber: 'NSSF-671920',
    shaNumber: 'SHA-9081234',
    contractType: 'Permanent',
    basicSalary: 75000,
    allowances: 15000,
    bankName: 'Co-operative Bank',
    bankAccount: '01129482019400',
    emergencyContact: 'Grace O. (+254 700 112 233)',
    startDate: '2024-02-10',
    status: 'Active',
    offDay: 'Wednesday',
    leaveBalance: 14,
  },
];

export const SEED_PAYROLL: PayrollRecord[] = [
  {
    id: 'pay_1',
    payrollMonth: 'August 2026',
    employeeId: 'emp_1',
    employeeName: 'John Griffin',
    basicSalary: 180000,
    allowances: 35000,
    overtime: 0,
    bonuses: 10000,
    grossPay: 225000,
    paye: 54750,
    shaShif: 6187.5, // 2.75% of Gross
    nssf: 2160, // Statutory cap
    otherDeductions: 0,
    netPay: 161902.5,
    paymentStatus: 'Paid',
    generatedDate: '2026-08-25',
  },
  {
    id: 'pay_2',
    payrollMonth: 'August 2026',
    employeeId: 'emp_2',
    employeeName: 'Warren Kariuki',
    basicSalary: 120000,
    allowances: 20000,
    overtime: 5000,
    bonuses: 0,
    grossPay: 145000,
    paye: 31250,
    shaShif: 3987.5,
    nssf: 2160,
    otherDeductions: 0,
    netPay: 107602.5,
    paymentStatus: 'Paid',
    generatedDate: '2026-08-25',
  },
];

export const SEED_LEAVE: LeaveRequest[] = [
  {
    id: 'lv_1',
    employeeId: 'emp_3',
    employeeName: 'Evans Omondi',
    leaveType: 'Annual Leave',
    startDate: '2026-09-02',
    endDate: '2026-09-06',
    days: 5,
    reason: 'Family visit and rest after major hospital deployment.',
    status: 'Pending',
    appliedDate: '2026-08-24',
  },
];

export const SEED_DOCUMENTS: OfficialDocument[] = [
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
      { description: 'Hospital Digital Platform (Phase 1 Deployment)', quantity: 1, unitPrice: 350000, total: 350000 },
      { description: 'Biometric Access Terminal & Server Sync (2 units)', quantity: 2, unitPrice: 68000, total: 136000 },
      { description: 'Cloud Infrastructure & KRA eTIMS Setup', quantity: 1, unitPrice: 64000, total: 64000 },
    ],
    subtotal: 550000,
    vatAmount: 88000,
    totalAmount: 638000,
    status: 'Paid',
    issueDate: '2026-08-22',
    dueDate: '2026-09-22',
    notes: 'Official Tax Invoice under KRA eTIMS validation framework.',
    publishedToCustomer: true,
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
      { description: 'Settlement for Tax Invoice GLW-INV-2026-088', quantity: 1, unitPrice: 638000, total: 638000 },
    ],
    subtotal: 550000,
    vatAmount: 88000,
    totalAmount: 638000,
    status: 'Verified',
    issueDate: '2026-08-23',
    notes: 'Full settlement received via KCB Corporate Wire. Certified by GELWO Finance Desk.',
    publishedToCustomer: true,
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
    issueDate: '2026-08-25',
    notes: 'Goods delivered in good condition and inspected on site by site engineer.',
    publishedToCustomer: true,
  },
  {
    id: 'doc_4',
    docType: 'etims_report',
    docNumber: 'GL-RPT-2026-00821',
    customerName: 'Eng. John Doe',
    customerEmail: 'client@institution.go.ke',
    organization: 'County Ministry of Health',
    items: [
      { description: 'eTIMS Monthly Compliance Summary (August 2026)', quantity: 1, unitPrice: 0, total: 0 },
    ],
    subtotal: 0,
    vatAmount: 0,
    totalAmount: 0,
    status: 'Verified',
    issueDate: '2026-08-26',
    notes: 'Verified Electronic Tax Invoice Management System (eTIMS) report published by GELWO Admin.',
    publishedToCustomer: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATA HELPER METHODS (LOCAL PERSISTENCE & SUPABASE SYNC)
// ─────────────────────────────────────────────────────────────────────────────

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

export async function createOrUpdateProduct(product: Partial<ProductItem> & { name: string; price: number }): Promise<ProductItem> {
  const products = await fetchPublicProducts();
  let updated: ProductItem;
  if (product.id) {
    const existing = products.find((p) => p.id === product.id) || SEED_PRODUCTS[0];
    updated = {
      ...existing,
      ...product,
      id: product.id,
      availableStock: (product.openingStock ?? existing.openingStock) + (product.purchases ?? existing.purchases) - (product.sales ?? existing.sales) - (product.damaged ?? existing.damaged) - (product.reserved ?? existing.reserved),
    } as ProductItem;
    const nextList = products.map((p) => (p.id === product.id ? updated : p));
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(nextList));
  } else {
    const sku = product.sku || `GEL-${Date.now().toString().slice(-5)}`;
    const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const stock = Number(product.stock || 50);
    updated = {
      id: `prod_${Date.now()}`,
      sku,
      slug,
      name: product.name,
      category: product.category || 'ICT Equipment',
      divisionCode: product.divisionCode || 'B',
      shortDescription: product.shortDescription || 'Certified official product from GELWO.',
      description: product.description || '',
      price: Number(product.price),
      costPrice: Number(product.costPrice || product.price * 0.65),
      currency: 'KES',
      pricingType: product.pricingType || 'fixed',
      mainImage: product.mainImage || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      featured: Boolean(product.featured),
      active: true,
      stock,
      openingStock: stock,
      purchases: 0,
      sales: 0,
      returns: 0,
      damaged: 0,
      reserved: 0,
      availableStock: stock,
      reorderLevel: 10,
      supplier: product.supplier || 'GELWO Verified Partner',
      warranty: product.warranty || '1 Year Warranty',
      deliveryTime: product.deliveryTime || '2-3 Business Days',
      specifications: product.specifications || {},
      rating: 4.8,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
    };
    products.unshift(updated);
    localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(products));
  }
  return updated;
}

export async function deleteProductItem(id: string): Promise<boolean> {
  const products = await fetchPublicProducts();
  const filtered = products.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
}

// ── Orders ───────────────────────────────────────────────────────────────────

export async function fetchCustomerOrders(email?: string): Promise<ProductOrder[]> {
  if (typeof window === 'undefined') return SEED_ORDERS;
  const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
  let orders: ProductOrder[] = SEED_ORDERS;
  if (!raw) {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(SEED_ORDERS));
  } else {
    try {
      orders = JSON.parse(raw);
    } catch {
      orders = SEED_ORDERS;
    }
  }
  if (email) {
    return orders.filter((o) => !o.customerEmail || o.customerEmail.toLowerCase() === email.toLowerCase());
  }
  return orders;
}

export async function createProductOrder(order: Omit<ProductOrder, 'id' | 'orderNumber' | 'createdAt'>): Promise<ProductOrder> {
  const orderNumber = `GL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const newOrder: ProductOrder = {
    ...order,
    id: `ord_${Date.now()}`,
    orderNumber,
    createdAt: new Date().toISOString(),
  };
  const orders = await fetchCustomerOrders();
  orders.unshift(newOrder);
  localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
  return newOrder;
}

export async function updateOrderStatus(orderId: string, step: ProductOrder['trackingStep']): Promise<boolean> {
  const orders = await fetchCustomerOrders();
  const updated = orders.map((o) => (o.id === orderId ? { ...o, trackingStep: step } : o));
  localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  return true;
}

// ── Quotations ───────────────────────────────────────────────────────────────

export async function fetchUserQuotations(email?: string): Promise<QuotationRecord[]> {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(STORAGE_QUOTES_KEY);
  if (!raw) {
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
  try {
    const list: QuotationRecord[] = JSON.parse(raw);
    if (email) {
      return list.filter((q) => !q.customerEmail || q.customerEmail.toLowerCase() === email.toLowerCase());
    }
    return list;
  } catch {
    return [];
  }
}

export async function saveQuotation(quote: Omit<QuotationRecord, 'id' | 'refNumber' | 'createdAt' | 'status'>): Promise<{ quotation: QuotationRecord | null; error: string | null }> {
  const refNumber = `GLW-QT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const newQuotation: QuotationRecord = {
    ...quote,
    id: `qt_${Date.now()}`,
    refNumber,
    status: 'Submitted',
    createdAt: new Date().toISOString(),
  };
  const list = await fetchUserQuotations();
  list.unshift(newQuotation);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(list));
  }
  return { quotation: newQuotation, error: null };
}

export async function updateQuotationStatus(id: string, status: QuotationRecord['status']): Promise<boolean> {
  const list = await fetchUserQuotations();
  const updated = list.map((q) => (q.id === id ? { ...q, status } : q));
  localStorage.setItem(STORAGE_QUOTES_KEY, JSON.stringify(updated));
  return true;
}

// ── Projects Workspace ───────────────────────────────────────────────────────

export async function fetchClientProjects(email?: string): Promise<ClientProject[]> {
  if (typeof window === 'undefined') return SEED_PROJECTS;
  const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
  let projects: ClientProject[] = SEED_PROJECTS;
  if (!raw) {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(SEED_PROJECTS));
  } else {
    try {
      projects = JSON.parse(raw);
    } catch {
      projects = SEED_PROJECTS;
    }
  }
  if (email) {
    return projects.filter((p) => !p.clientEmail || p.clientEmail.toLowerCase() === email.toLowerCase());
  }
  return projects;
}

export async function addProjectMessage(projectId: string, message: { text: string; sender: string; isClient: boolean }): Promise<boolean> {
  const projects = await fetchClientProjects();
  const next = projects.map((p) => {
    if (p.id === projectId) {
      return {
        ...p,
        messages: [
          ...p.messages,
          {
            id: `msg_${Date.now()}`,
            sender: message.sender,
            isClient: message.isClient,
            text: message.text,
            time: 'Just now',
          },
        ],
      };
    }
    return p;
  });
  localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(next));
  return true;
}

// ── Schedule & Daily Operations ─────────────────────────────────────────────

export async function fetchScheduledServices(): Promise<ScheduledService[]> {
  if (typeof window === 'undefined') return SEED_SCHEDULE;
  const raw = localStorage.getItem(STORAGE_SCHEDULE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_SCHEDULE_KEY, JSON.stringify(SEED_SCHEDULE));
    return SEED_SCHEDULE;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SEED_SCHEDULE;
  }
}

export async function createScheduledService(service: Omit<ScheduledService, 'id' | 'createdAt'>): Promise<ScheduledService> {
  const newService: ScheduledService = {
    ...service,
    id: `sch_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const list = await fetchScheduledServices();
  list.unshift(newService);
  localStorage.setItem(STORAGE_SCHEDULE_KEY, JSON.stringify(list));
  return newService;
}

export async function updateServiceStatus(id: string, status: ScheduledService['status'], notes?: string): Promise<boolean> {
  const list = await fetchScheduledServices();
  const updated = list.map((s) => (s.id === id ? { ...s, status, notes: notes || s.notes } : s));
  localStorage.setItem(STORAGE_SCHEDULE_KEY, JSON.stringify(updated));
  return true;
}

// ── Staff & HR ───────────────────────────────────────────────────────────────

export async function fetchStaffDirectory(): Promise<StaffEmployee[]> {
  if (typeof window === 'undefined') return SEED_STAFF;
  const raw = localStorage.getItem(STORAGE_STAFF_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_STAFF_KEY, JSON.stringify(SEED_STAFF));
    return SEED_STAFF;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SEED_STAFF;
  }
}

export async function createStaffEmployee(staff: Omit<StaffEmployee, 'id' | 'employeeNumber'>): Promise<StaffEmployee> {
  const employeeNumber = `GLW-EMP-00${Math.floor(10 + Math.random() * 90)}`;
  const newStaff: StaffEmployee = {
    ...staff,
    id: `emp_${Date.now()}`,
    employeeNumber,
  };
  const list = await fetchStaffDirectory();
  list.unshift(newStaff);
  localStorage.setItem(STORAGE_STAFF_KEY, JSON.stringify(list));
  return newStaff;
}

export async function fetchPayrollRecords(): Promise<PayrollRecord[]> {
  if (typeof window === 'undefined') return SEED_PAYROLL;
  const raw = localStorage.getItem(STORAGE_PAYROLL_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_PAYROLL_KEY, JSON.stringify(SEED_PAYROLL));
    return SEED_PAYROLL;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SEED_PAYROLL;
  }
}

export async function generateMonthlyPayroll(month: string): Promise<PayrollRecord[]> {
  const staffList = await fetchStaffDirectory();
  const payrollList: PayrollRecord[] = staffList.map((emp) => {
    const gross = emp.basicSalary + emp.allowances;
    const paye = gross > 100000 ? gross * 0.25 : gross * 0.18;
    const sha = gross * 0.0275; // 2.75% SHIF
    const nssf = 2160; // Standard Tier I & II cap
    const net = gross - paye - sha - nssf;
    return {
      id: `pay_${emp.id}_${Date.now()}`,
      payrollMonth: month,
      employeeId: emp.id,
      employeeName: emp.fullName,
      basicSalary: emp.basicSalary,
      allowances: emp.allowances,
      overtime: 0,
      bonuses: 0,
      grossPay: gross,
      paye,
      shaShif: sha,
      nssf,
      otherDeductions: 0,
      netPay: net,
      paymentStatus: 'Paid',
      generatedDate: new Date().toISOString().split('T')[0],
    };
  });
  localStorage.setItem(STORAGE_PAYROLL_KEY, JSON.stringify(payrollList));
  return payrollList;
}

export async function fetchLeaveRequests(): Promise<LeaveRequest[]> {
  if (typeof window === 'undefined') return SEED_LEAVE;
  const raw = localStorage.getItem(STORAGE_LEAVE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_LEAVE_KEY, JSON.stringify(SEED_LEAVE));
    return SEED_LEAVE;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return SEED_LEAVE;
  }
}

export async function submitLeaveRequest(req: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>): Promise<LeaveRequest> {
  const newReq: LeaveRequest = {
    ...req,
    id: `lv_${Date.now()}`,
    status: 'Pending',
    appliedDate: new Date().toISOString().split('T')[0],
  };
  const list = await fetchLeaveRequests();
  list.unshift(newReq);
  localStorage.setItem(STORAGE_LEAVE_KEY, JSON.stringify(list));
  return newReq;
}

export async function updateLeaveStatus(id: string, status: 'Approved' | 'Rejected', reviewer: string): Promise<boolean> {
  const list = await fetchLeaveRequests();
  const updated = list.map((l) => (l.id === id ? { ...l, status, reviewedBy: reviewer } : l));
  localStorage.setItem(STORAGE_LEAVE_KEY, JSON.stringify(updated));
  return true;
}

// ── Official Universal Document Center ───────────────────────────────────────

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
    return docs.filter((d) => (!d.customerEmail || d.customerEmail.toLowerCase() === email.toLowerCase()) && d.publishedToCustomer !== false);
  }
  return docs;
}

export async function createOfficialDocument(doc: Omit<OfficialDocument, 'id' | 'docNumber' | 'issueDate'>): Promise<OfficialDocument> {
  const prefixMap: Record<string, string> = {
    invoice: 'GLW-INV',
    receipt: 'GLW-REC',
    delivery_note: 'GLW-DEL',
    quotation: 'GLW-QT',
    etims_report: 'GL-ETIMS',
    service_report: 'GL-SRV-RPT',
    contract: 'GL-CTR',
    compliance_cert: 'GL-KRA-TCC',
  };
  const prefix = prefixMap[doc.docType] || 'GLW-DOC';
  const docNumber = `${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newDoc: OfficialDocument = {
    ...doc,
    id: `doc_${Date.now()}`,
    docNumber,
    issueDate: new Date().toISOString().split('T')[0],
    publishedToCustomer: doc.publishedToCustomer ?? true,
  };

  const docs = await fetchOfficialDocuments();
  docs.unshift(newDoc);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_DOCS_KEY, JSON.stringify(docs));
  }
  return newDoc;
}

export async function toggleDocumentPublish(id: string, published: boolean): Promise<boolean> {
  const docs = await fetchOfficialDocuments();
  const updated = docs.map((d) => (d.id === id ? { ...d, publishedToCustomer: published } : d));
  localStorage.setItem(STORAGE_DOCS_KEY, JSON.stringify(updated));
  return true;
}

// ── Auth Local Store ─────────────────────────────────────────────────────────

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

export async function signInUser(email: string, password?: string): Promise<{ user: UserProfile | null; error: string | null }> {
  const profile: UserProfile = {
    id: `usr_${Date.now()}`,
    email,
    fullName: email.includes('admin') ? 'GELWO Administrator (Command Center)' : 'Eng. John Doe',
    companyName: 'Institutional Enterprise Client',
    phone: '+254 797 829 911',
    address: 'Nairobi, Kenya',
    role: email.includes('admin') ? 'super_admin' : 'customer',
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(profile));
  }
  return { user: profile, error: null };
}

export async function signUpUser(data: {
  email: string;
  password?: string;
  fullName: string;
  companyName?: string;
  phone?: string;
  role?: UserRole;
}): Promise<{ user: UserProfile | null; error: string | null }> {
  const profile: UserProfile = {
    id: `usr_${Date.now()}`,
    email: data.email,
    fullName: data.fullName,
    companyName: data.companyName || 'Institutional Client',
    phone: data.phone || '+254 700 000 000',
    role: data.role || (data.email.includes('admin') ? 'super_admin' : 'customer'),
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(profile));
  }
  return { user: profile, error: null };
}

export function signOutLocalUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_CURRENT_USER);
  }
}
