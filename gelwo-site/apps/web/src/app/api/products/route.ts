/**
 * GET /api/products
 * GET /api/products?featured=true
 * Returns all active products. Falls back to seed data when DB unavailable.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdpcefbvfxgrmwcoefl.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const PRODUCTS_SEED = [
  {
    id: '1',
    sku: 'GELWO-SW-001',
    slug: 'gelwo-erp-platform',
    name: 'GELWO ERP Platform',
    category: 'Software',
    shortDescription: 'A complete enterprise resource planning platform built for African businesses.',
    description: 'GELWO ERP is a fully integrated business management platform covering procurement, inventory, HR, finance, projects, and customer relationships — all in a single, real-time dashboard designed for East African business operations.',
    price: 0,
    currency: 'KES',
    pricingType: 'contact',
    mainImage: '/futuristic_bg.jpg',
    gallery: [],
    videos: [],
    features: [
      'Multi-department workflow management',
      'Real-time financial reporting',
      'Inventory & stock management',
      'HR & payroll processing',
      'Customer relationship management',
      'Multi-branch / multi-company support',
    ],
    specifications: {
      'Platform': 'Web + Mobile',
      'Database': 'PostgreSQL',
      'Hosting': 'Cloud / On-Premise',
      'Users': 'Unlimited',
      'Support': '24/7 SLA',
    },
    availability: 'available',
    stock: 999,
    featured: true,
    active: true,
    seoTitle: 'GELWO ERP Platform | Business Management Software Kenya',
    seoDescription: 'Complete ERP software for Kenyan businesses. Manage inventory, HR, finance, and customers in one platform.',
  },
  {
    id: '2',
    sku: 'GELWO-AI-002',
    slug: 'gelwo-ai-assistant',
    name: 'GELWO AI Business Assistant',
    category: 'AI Products',
    shortDescription: 'An AI-powered business assistant that handles quotes, customer support, and analytics.',
    description: 'The GELWO AI Business Assistant integrates directly with your business systems to automate quotation generation, handle customer enquiries 24/7, and provide intelligent business analytics — all powered by a custom-trained large language model.',
    price: 0,
    currency: 'KES',
    pricingType: 'contact',
    mainImage: '/futuristic_bg.jpg',
    gallery: [],
    videos: [],
    features: [
      'Automated quotation generation',
      '24/7 customer support chatbot',
      'Business analytics & insights',
      'Multi-channel integration',
      'Custom knowledge base training',
      'Voice & text interface',
    ],
    specifications: {
      'Model': 'Custom LLM (RAG)',
      'Languages': 'English, Swahili',
      'Integration': 'API / Widget',
      'Uptime': '99.9%',
      'Response time': '<2 seconds',
    },
    availability: 'available',
    stock: 999,
    featured: true,
    active: true,
    seoTitle: 'GELWO AI Business Assistant | AI Automation Kenya',
    seoDescription: 'AI-powered business assistant for Kenyan businesses. Automate quotes, customer support, and analytics.',
  },
  {
    id: '3',
    sku: 'GELWO-ICT-003',
    slug: 'commercial-cctv-system',
    name: 'Commercial CCTV Security System',
    category: 'Security Hardware',
    shortDescription: 'Enterprise-grade CCTV systems with remote monitoring, AI analytics, and 24/7 recording.',
    description: 'GELWO supplies and installs commercial-grade CCTV security systems featuring AI-powered motion detection, remote access monitoring, high-resolution recording, and central management dashboards for multi-site businesses.',
    price: 85000,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: '/futuristic_bg.jpg',
    gallery: [],
    videos: [],
    features: [
      '4K Ultra HD recording',
      'AI motion detection & alerts',
      'Remote mobile monitoring',
      'Night vision up to 50m',
      'Cloud & local storage',
      '30-day recording retention',
    ],
    specifications: {
      'Resolution': '4K (3840×2160)',
      'Cameras': '8 channel starter',
      'Storage': '4TB HDD included',
      'Night Vision': '50m IR range',
      'Warranty': '2 years',
    },
    availability: 'available',
    stock: 45,
    featured: false,
    active: true,
    seoTitle: 'Commercial CCTV Systems Kenya | GELWO Technologies',
    seoDescription: 'Enterprise CCTV security systems with AI analytics, 4K recording, and remote monitoring. Supplied and installed in Kenya.',
  },
  {
    id: '4',
    sku: 'GELWO-SOL-004',
    slug: 'commercial-solar-kit',
    name: 'Commercial Solar Power System',
    category: 'Solar Energy',
    shortDescription: '50kW commercial solar kit with battery backup, inverter, and remote monitoring.',
    description: 'A complete 50kW commercial solar energy system designed for medium-to-large businesses. Includes premium solar panels, lithium battery storage, grid-tie inverter, and remote SCADA monitoring — reducing electricity costs by up to 80%.',
    price: 2500000,
    currency: 'KES',
    pricingType: 'fixed',
    mainImage: '/futuristic_bg.jpg',
    gallery: [],
    videos: [],
    features: [
      '50kW solar panel array',
      '100kWh lithium battery storage',
      'Grid-tie & off-grid capable',
      'Remote SCADA monitoring',
      'Automatic grid failover',
      '25-year panel warranty',
    ],
    specifications: {
      'Capacity': '50kW peak',
      'Storage': '100kWh lithium',
      'Panels': 'Tier-1 monocrystalline',
      'Inverter': 'Hybrid grid-tie',
      'Monitoring': 'Remote SCADA',
      'Warranty': '25 years (panels)',
    },
    availability: 'available',
    stock: 10,
    featured: true,
    active: true,
    seoTitle: 'Commercial Solar Power Systems Kenya | GELWO',
    seoDescription: '50kW commercial solar kits with battery backup and remote monitoring. Reduce electricity costs by 80% in Kenya.',
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featuredOnly = searchParams.get('featured') === 'true';

  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (featuredOnly) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      const fallback = featuredOnly ? PRODUCTS_SEED.filter((p) => p.featured) : PRODUCTS_SEED;
      return NextResponse.json({ products: fallback });
    }

    return NextResponse.json({ products: data });
  } catch {
    const fallback = featuredOnly ? PRODUCTS_SEED.filter((p) => p.featured) : PRODUCTS_SEED;
    return NextResponse.json({ products: fallback });
  }
}
