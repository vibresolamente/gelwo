-- ============================================================
-- GELWO TECHNOLOGIES — VERCEL POSTGRES DATABASE SCHEMA
-- Run this in Vercel Storage -> Postgres -> Query Editor
-- ============================================================

-- 1. CUSTOMERS & USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  account_no VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL DEFAULT 'pbkdf2_sha256$260000$mockpass$123456',
  phone VARCHAR(25),
  company VARCHAR(100),
  role VARCHAR(20) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. QUOTATIONS TABLE
CREATE TABLE IF NOT EXISTS quotations (
  id SERIAL PRIMARY KEY,
  quote_no VARCHAR(30) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  service_name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  scope TEXT,
  amount NUMERIC(12,2) DEFAULT 0.00,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  project_no VARCHAR(30) UNIQUE NOT NULL,
  title VARCHAR(150) NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  location VARCHAR(100),
  progress INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'Planning',
  assigned_engineer VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  invoice_no VARCHAR(30) UNIQUE NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
