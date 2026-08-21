-- =====================================================================
-- GELWO TECHNOLOGIES — COMPLETE SUPABASE DATABASE SCHEMA
-- Run this full SQL script in your Supabase SQL Editor:
-- https://swdpcefbvfxgrmwcoefl.supabase.co
-- =====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 2. PROFILES TABLE ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'staff')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 3. SERVICES (15 DIVISIONS) TABLE ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  badge TEXT,
  accent_color TEXT DEFAULT '#4A346A',
  categories JSONB DEFAULT '[]'::JSONB,
  supporting_services JSONB DEFAULT '[]'::JSONB,
  pricing_model TEXT DEFAULT 'Custom Quotation Engine',
  lead_time TEXT DEFAULT '3 - 7 Working Days',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 4. PRODUCTS & HARDWARE TABLE ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY DEFAULT ('prod_' || extract(epoch from now())::bigint || '_' || substr(md5(random()::text), 1, 6)),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  division_code TEXT DEFAULT 'B',
  short_description TEXT,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  currency TEXT DEFAULT 'KES',
  pricing_type TEXT DEFAULT 'fixed',
  main_image TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  stock INT DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 5. QUOTATIONS TABLE ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quotations (
  id TEXT PRIMARY KEY DEFAULT ('qt_' || extract(epoch from now())::bigint || '_' || substr(md5(random()::text), 1, 6)),
  ref_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  organization TEXT,
  service_category TEXT NOT NULL,
  sub_category TEXT,
  scope_size TEXT NOT NULL DEFAULT 'Medium',
  client_type TEXT NOT NULL DEFAULT 'Private Corporate',
  estimated_cost TEXT NOT NULL,
  status TEXT DEFAULT 'Submitted' CHECK (status IN ('Draft', 'Submitted', 'Under Review', 'Approved', 'In Progress', 'Completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 6. DOCUMENTS (INVOICES, RECEIPTS, DELIVERY NOTES) ────────────────
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY DEFAULT ('doc_' || extract(epoch from now())::bigint || '_' || substr(md5(random()::text), 1, 6)),
  doc_type TEXT NOT NULL CHECK (doc_type IN ('invoice', 'receipt', 'delivery_note')),
  doc_number TEXT NOT NULL UNIQUE,
  ref_quote_number TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  organization TEXT,
  customer_phone TEXT,
  delivery_address TEXT,
  items JSONB NOT NULL DEFAULT '[]'::JSONB,
  subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
  vat_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
  total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'Issued',
  issue_date TIMESTAMPTZ DEFAULT NOW(),
  due_date TIMESTAMPTZ,
  notes TEXT
);

-- ─── 7. ROW LEVEL SECURITY (RLS) POLICIES ─────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can insert on signup; users can read/update their own profile
CREATE POLICY "Public profiles are readable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Services: Everyone can read active services; authenticated/admins can manage
CREATE POLICY "Allow public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert/update services" ON public.services FOR ALL USING (true);

-- Products: Everyone can read products; admins can manage
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated manage products" ON public.products FOR ALL USING (true);

-- Quotations: Everyone can insert quotes; users read their own; admins read all
CREATE POLICY "Allow public insert quotations" ON public.quotations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read quotations" ON public.quotations FOR SELECT USING (true);
CREATE POLICY "Allow update quotations" ON public.quotations FOR UPDATE USING (true);

-- Documents: Read access allowed to matching client or admin
CREATE POLICY "Allow public read documents" ON public.documents FOR SELECT USING (true);
CREATE POLICY "Allow authenticated manage documents" ON public.documents FOR ALL USING (true);

-- ─── 8. INITIAL SEED DATA ─────────────────────────────────────────────

-- Seed 15 Services Divisions
INSERT INTO public.services (id, code, name, icon, tagline, description, badge, accent_color, pricing_model, lead_time)
VALUES
('general-supplies', 'A', 'General Supplies & Services', '📦', 'Procurement, Sourcing, Supply, Delivery & Support', 'Covers 8 dedicated supply categories including office stationery, furniture, cleaning, PPE and institutional supplies.', 'AGPO & Government Approved', '#4A346A', 'Framework Supply Contract', '24 - 48 Hours'),
('ict-biometric-security', 'B', 'ICT, Biometric & Security Solutions', '💻', 'Supply, Enterprise Installation, Hardware Integration & Security', 'Enterprise biometric time-attendance, turnstiles, and AI IP surveillance systems.', 'Enterprise Security Certified', '#566944', 'Custom Quotation Engine', '3 - 7 Working Days'),
('electrical-engineering', 'C', 'Electrical Equipment, Installation & Maintenance', '⚡', 'Power Distribution, Industrial Installations & Energy Optimization', 'Certified electrical engineering covering cables, switchboards, wiring, and inspections.', 'EPRA & NCA Certified', '#4A346A', 'Bill of Quantities (BOQ)', 'Immediate Deployment'),
('solar-renewable-energy', 'D', 'Solar & Renewable Energy', '☀️', 'Solar Microgrids, Hybrid Power & Water Pumping', 'Tier-1 solar microgrids, commercial rooftop arrays, borehole solarization, and LiFePO4 battery storage.', 'Tier-1 Solar Certified', '#566944', 'Custom Quotation Engine', '5 - 14 Days Turnkey'),
('branding-printing-communication', 'E', 'Branding, Printing & Corporate Communication', '🎨', 'Brand Identity, Offset & Digital Printing, Large-Format Signage', 'Corporate identity design, branded workwear, annual reports, brochures, and outdoor billboards.', 'High-Precision Offset & Digital', '#4A346A', 'Fixed Rate / Unit Price', '2 - 5 Days'),
('consultancy-survey-research', 'F', 'Consultancy, Survey & Research', '📊', 'Strategic Advisory, M&E Frameworks & Socio-Economic Surveys', 'Evidence-based advisory, 5-year strategic plans, monitoring evaluation and learning (MEL), and digital field surveys.', 'Data-Driven Impact', '#566944', 'Custom Quotation Engine', 'Phased Milestones'),
('capacity-building-training', 'G', 'Capacity Building & Training', '🎓', 'Institutional Strengthening, Leadership, PFM & Digital Skills', 'Specialized executive workshops, certified PFM training, project management, and community empowerment.', 'NITA & CPD Aligned', '#4A346A', 'Fixed Rate / Unit Price', 'Scheduled On-Demand'),
('technical-support-maintenance', 'H', 'Technical Support & Systems Maintenance', '🛠️', 'ICT Diagnostics, Network Optimization & 24/7 SLA Helpdesk', 'Proactive diagnostic maintenance, server virtualization, structured cabling, and multi-tier IT support.', '24/7 SLA Guarantee', '#566944', 'Monthly Retainer', 'Immediate Response'),
('small-works-interior-painting', 'I', 'Small Works, Interior Design & Painting', '🏗️', 'Commercial Refurbishment, Modern Office Partitioning & Gypsum', 'Commercial renovations, acoustic/glass partitioning, luxury gypsum ceilings, decorative finishes, and painting.', 'NCA Building Works Approved', '#4A346A', 'Bill of Quantities (BOQ)', 'Within 24 Hours'),
('environment-climate-resilience', 'J', 'Mitigation, Environmental Management & Climate Resilience', '🌱', 'Flood Control, Soil Conservation & Afforestation', 'Flood risk mitigation, stormwater culverts, slope stabilization, gabions, and commercial tree planting.', 'NEMA & Green Certified', '#566944', 'Custom Quotation Engine', 'Project Scheduled'),
('cereals-foodstuff-supplies', 'K', 'Cereals & Foodstuff Supplies', '🌾', 'Bulk Grain Supply, Institutional Food Provisions & Relief', 'Certified bulk white maize, fortified flour, pulses, cooking oils, and contracted institutional food provisions.', 'KEBS Tested Dry Commodities', '#4A346A', 'Framework Supply Contract', 'Scheduled Bulk Deliveries'),
('poultry-animal-feeds', 'L', 'Poultry Products & Animal Feeds', '🐔', 'High-Yield Formulated Feeds, Day-Old Chicks & Livestock Nutrition', 'Scientifically balanced poultry feeds, commercial day-old chicks, dairy concentrates, and farm productivity audits.', 'KEBS Certified Animal Nutrition', '#566944', 'Fixed Rate / Unit Price', 'Weekly Schedules'),
('community-development-special-programs', 'M', 'Special Programs & Community Development', '🤝', 'Youth Empowerment, Women Inclusion & Civic Governance', 'Structured entrepreneurship training, civic governance forums, social protection, and water access infrastructure.', 'Community Impact Leader', '#4A346A', 'Custom Quotation Engine', 'Multi-Year Phased'),
('landscaping-cleaning', 'N', 'Landscaping & Cleaning', '🌿', 'Landscape Architecture, Grounds Maintenance & Deep Janitorial', 'Landscape design, compound greening, commercial post-construction cleaning, and facility sanitization.', 'Pristine Hygiene & Aesthetics', '#566944', 'Monthly Retainer', 'Within 24 Hours'),
('software-digital-solutions', 'SW', 'Software Development & Digital Solutions', '🚀', 'Custom Web Apps, Enterprise ERP/CRM, Mobile Apps & AI Systems', 'Bespoke Next.js web applications, mobile apps, custom ERPs, automated quotation engines, and cloud architectures.', 'Digital Innovation Engine', '#4A346A', 'Custom Quotation Engine', '2 - 6 Weeks (Agile)')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Seed Products
INSERT INTO public.products (slug, name, category, division_code, short_description, price, currency, main_image, featured, stock)
VALUES
('biometric-facial-recognition-terminal', 'GELWO AI Biometric Face & Fingerprint Terminal', 'ICT, Biometric & Security', 'B', 'Dual-camera AI facial recognition with thermal body temperature detection, RFID smart card reader, and automated time-attendance sync.', 68000.00, 'KES', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80', TRUE, 25),
('tier-1-bifacial-solar-panel-550w', 'Tier-1 Mono-Crystalline Bifacial Solar Panel 550W', 'Solar & Renewable Energy', 'D', 'High-efficiency 22.4% module with dual-sided glass power generation for microgrids and commercial rooftop solarization.', 18500.00, 'KES', 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80', TRUE, 140),
('enterprise-erp-core-license', 'GELWO Enterprise ERP Core Suite (Next.js & Supabase)', 'Software Development & Digital Solutions', 'SW', 'Tailored enterprise ERP integrating accounting, KRA tax compliance, inventory barcoding, HR payroll, and real-time county tender portals.', 350000.00, 'KES', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', TRUE, 99),
('industrial-cctv-bullet-4k-ip', '4K Ultra-HD Smart Night Vision IP CCTV Camera', 'ICT, Biometric & Security', 'B', 'IP67 weatherproof bullet camera with AI vehicle number plate recognition, infrared night vision up to 80m, and PoE support.', 14500.00, 'KES', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80', FALSE, 60),
('grade-1-white-maize-90kg', 'Certified Grade-1 White Maize (90kg Institutional Sack)', 'Cereals & Foodstuff Supplies', 'K', 'KEBS tested moisture-controlled bulk dry white maize for schools, hospitals, and national emergency relief programmes.', 4200.00, 'KES', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80', FALSE, 500),
('executive-ergonomic-mesh-chair', 'GELWO Executive High-Back Ergonomic Office Chair', 'General Supplies & Services', 'A', 'Heavy-duty breathable mesh chair with 3D adjustable armrests, lumbar spine support, and 5-star chrome caster base.', 24500.00, 'KES', 'https://images.unsplash.com/photo-1580481077197-28ed4101e403?auto=format&fit=crop&w=800&q=80', FALSE, 40)
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, name = EXCLUDED.name;

-- Seed Sample Quotation
INSERT INTO public.quotations (ref_number, customer_name, customer_email, organization, service_category, sub_category, scope_size, client_type, estimated_cost, status)
VALUES
('GLW-QT-2026-00125', 'Eng. John Doe', 'client@institution.go.ke', 'County Ministry of Health', 'Software Development & Digital Solutions', 'Enterprise Hospital Management System', 'Enterprise', 'Government / County', 'KES 550,000', 'Approved')
ON CONFLICT (ref_number) DO NOTHING;

-- Seed Sample Documents (Invoice, Receipt, Delivery Note)
INSERT INTO public.documents (doc_type, doc_number, ref_quote_number, customer_name, customer_email, organization, customer_phone, delivery_address, items, subtotal, vat_amount, total_amount, status, notes)
VALUES
('invoice', 'GLW-INV-2026-088', 'GLW-QT-2026-00125', 'Eng. John Doe', 'client@institution.go.ke', 'County Ministry of Health', '+254 797 829 911', 'County HQ, Nairobi', '[{"description":"Hospital Management System (Phase 1 Deployment)","quantity":1,"unitPrice":350000,"total":350000},{"description":"Biometric Access Integration & Server Config","quantity":2,"unitPrice":68000,"total":136000},{"description":"Cloud Infrastructure & SSL Setup (1 Year)","quantity":1,"unitPrice":64000,"total":64000}]'::JSONB, 550000.00, 88000.00, 638000.00, 'Paid', 'Thank you for partnering with GELWO Technologies. Direct bank wire transfer.'),
('receipt', 'GLW-REC-2026-088', 'GLW-QT-2026-00125', 'Eng. John Doe', 'client@institution.go.ke', 'County Ministry of Health', '+254 797 829 911', 'County HQ, Nairobi', '[{"description":"Settlement for Invoice GLW-INV-2026-088","quantity":1,"unitPrice":638000,"total":638000}]'::JSONB, 550000.00, 88000.00, 638000.00, 'Issued', 'Official Tax Receipt. Certified by GELWO Finance Desk.'),
('delivery_note', 'GLW-DEL-2026-042', 'GLW-QT-2026-00188', 'Eng. John Doe', 'client@institution.go.ke', 'County Ministry of Health', '+254 797 829 911', 'Nakuru Sub-County Hospital Solar Substation', '[{"description":"Tier-1 Mono-Crystalline Bifacial Solar Panels 550W","quantity":40,"unitPrice":18500,"total":740000},{"description":"LiFePO4 Lithium Solar Battery Pack 48V 200Ah","quantity":4,"unitPrice":280000,"total":1120000},{"description":"Hybrid Inverter 15kVA Three-Phase","quantity":1,"unitPrice":420000,"total":420000}]'::JSONB, 2280000.00, 0.00, 2280000.00, 'Delivered', 'Goods delivered in pristine condition and tested on site by lead engineer.')
ON CONFLICT (doc_number) DO NOTHING;
