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

-- 5. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(30) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, dispatched, delivered, cancelled
  total_amount NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDER_ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES public.products(id) ON DELETE SET NULL,
  quantity INT DEFAULT 1,
  unit_price NUMERIC(12,2),
  total_price NUMERIC(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participants JSONB,
  linked_entity_id UUID,
  linked_entity_type VARCHAR(30),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID,
  recipient_id UUID,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- 9. SUPPORT_TICKETS TABLE
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'open', -- open, in_progress, resolved, closed
  priority VARCHAR(10) DEFAULT 'medium', -- low, medium, high, urgent
  customer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ ACCESS POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Allow public read access to users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert to users" ON public.users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to quotations" ON public.quotations FOR SELECT USING (true);
CREATE POLICY "Allow public insert to quotations" ON public.quotations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to invoices" ON public.invoices FOR SELECT USING (true);

CREATE POLICY "Allow public read access to orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert to orders" ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to order_items" ON public.order_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert to order_items" ON public.order_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to conversations" ON public.conversations FOR SELECT USING (true);
CREATE POLICY "Allow public insert to conversations" ON public.conversations FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert to messages" ON public.messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to support_tickets" ON public.support_tickets FOR SELECT USING (true);
CREATE POLICY "Allow public insert to support_tickets" ON public.support_tickets FOR INSERT WITH CHECK (true);

-- REAL‑TIME NOTIFICATIONS (pg_notify)
CREATE OR REPLACE FUNCTION notify_new_message() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('new_message', json_build_object('id', NEW.id, 'conversation_id', NEW.conversation_id)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_new_message AFTER INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION notify_new_message();

CREATE OR REPLACE FUNCTION notify_order_status() RETURNS trigger AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    PERFORM pg_notify('order_status', json_build_object('id', NEW.id, 'status', NEW.status)::text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_order_status AFTER UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION notify_order_status();


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
