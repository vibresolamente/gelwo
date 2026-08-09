-- ============================================================
-- GELWO TECHNOLOGIES — SUPABASE DATABASE SCHEMA
-- Execute this SQL script in your Supabase SQL Editor
-- ============================================================

-- 1. CUSTOMER & ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  account_no VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(25),
  company VARCHAR(100),
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. QUOTATIONS TABLE
CREATE TABLE IF NOT EXISTS public.quotations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_no VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  service_name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  scope TEXT,
  amount NUMERIC(12,2) DEFAULT 0.00,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_no VARCHAR(30) UNIQUE NOT NULL,
  title VARCHAR(150) NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  location VARCHAR(100),
  progress INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'Planning', -- Planning, In Progress, Completed
  assigned_engineer VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. INVOICES TABLE
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_no VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, paid, overdue
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ ACCESS POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert to users" ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to quotations" ON public.quotations FOR SELECT USING (true);
CREATE POLICY "Allow public insert to quotations" ON public.quotations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to invoices" ON public.invoices FOR SELECT USING (true);
