/**
 * GET /api/services
 * Returns all active services. Falls back to static seed data when DB unavailable.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdpcefbvfxgrmwcoefl.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export const SERVICES_SEED = [
  {
    id: '1',
    slug: 'software-development',
    name: 'Software Development & Systems',
    shortDescription: 'Build web applications, enterprise platforms, mobile apps, and custom software systems designed around your workflow.',
    longDescription: 'From internal business tools to customer-facing platforms, GELWO designs and builds software that fits the exact way your team works. We cover the full stack — from database architecture to polished user interfaces.',
    category: 'Technology',
    icon: '💻',
    heroImage: null,
    gallery: [],
    video: null,
    features: ['Custom Web Applications', 'Enterprise Platforms', 'Mobile Apps (iOS & Android)', 'API Development & Integration', 'Database Design & Optimization', 'Cloud-Native Architecture'],
    benefits: ['Eliminate manual bottlenecks', 'Integrate all your systems', 'Scale as your business grows', 'Full ownership of your software'],
    process: [
      { step: 1, title: 'Discovery', description: 'We understand your workflows and goals' },
      { step: 2, title: 'Design', description: 'UI/UX wireframes and system architecture' },
      { step: 3, title: 'Build', description: 'Agile development with regular demos' },
      { step: 4, title: 'Deploy', description: 'Launch, training and handover' },
      { step: 5, title: 'Support', description: 'Ongoing maintenance and upgrades' },
    ],
    pricingType: 'custom',
    active: true,
    featured: true,
    seoTitle: 'Software Development Kenya | GELWO Technologies',
    seoDescription: 'Custom software development, web apps, mobile apps and enterprise systems built in Kenya by GELWO Technologies.',
  },
  {
    id: '2',
    slug: 'business-systems',
    name: 'Business Systems & ERP',
    shortDescription: 'Integrated Enterprise Resource Planning, inventory management, HR, CRM, finance, and multi-department workflow systems.',
    longDescription: 'GELWO builds end-to-end business systems that connect every department. From procurement and inventory to HR and finance — all in one system your team can actually use.',
    category: 'Enterprise',
    icon: '⚙️',
    heroImage: null,
    gallery: [],
    video: null,
    features: ['ERP System Implementation', 'Inventory & Stock Management', 'CRM & Customer Tracking', 'HR & Payroll', 'Finance & Accounting', 'Multi-Branch Support'],
    benefits: ['Single source of truth across departments', 'Real-time reporting and analytics', 'Reduce operational costs', 'Eliminate data silos'],
    process: [
      { step: 1, title: 'Audit', description: 'Review your existing processes' },
      { step: 2, title: 'Map', description: 'Design unified workflows' },
      { step: 3, title: 'Configure', description: 'Build and configure the ERP' },
      { step: 4, title: 'Migrate', description: 'Move your existing data safely' },
      { step: 5, title: 'Train', description: 'Team onboarding and training' },
    ],
    pricingType: 'custom',
    active: true,
    featured: true,
    seoTitle: 'Business ERP Systems Kenya | GELWO Technologies',
    seoDescription: 'Enterprise Resource Planning and business management systems built for Kenyan businesses by GELWO Technologies.',
  },
  {
    id: '3',
    slug: 'ai-solutions',
    name: 'AI Solutions & Automation',
    shortDescription: 'AI avatars, custom RAG knowledge bases, automated quote assistants, intelligent customer support, and predictive analytics.',
    longDescription: 'We help businesses leverage artificial intelligence to automate repetitive work, enhance customer experiences, and make smarter decisions.',
    category: 'AI Layer',
    icon: '🤖',
    heroImage: null,
    gallery: [],
    video: null,
    features: ['AI Chatbots & Virtual Assistants', 'RAG Knowledge Base Systems', 'Automated Quotation Engines', 'Predictive Analytics', 'Process Automation (RPA)', 'AI-Powered Customer Support'],
    benefits: ['24/7 customer service without human agents', 'Faster quotation generation', 'Data-driven business insights', 'Reduce manual repetitive work'],
    process: [
      { step: 1, title: 'Discovery', description: 'Identify automation opportunities' },
      { step: 2, title: 'Data', description: 'Prepare and structure your data' },
      { step: 3, title: 'Build', description: 'Train and configure AI models' },
      { step: 4, title: 'Test', description: 'Validate accuracy and performance' },
      { step: 5, title: 'Deploy', description: 'Launch and monitor' },
    ],
    pricingType: 'custom',
    active: true,
    featured: true,
    seoTitle: 'AI Solutions Kenya | GELWO Technologies',
    seoDescription: 'AI chatbots, automation, RAG knowledge bases and predictive analytics solutions built in Kenya by GELWO Technologies.',
  },
  {
    id: '4',
    slug: 'ict-infrastructure',
    name: 'ICT & Security Infrastructure',
    shortDescription: 'High-speed fiber networks, biometric access control, commercial CCTV, server installations, and cloud architecture.',
    longDescription: 'GELWO designs and installs enterprise-grade ICT infrastructure. From fiber networks to CCTV systems, we build the digital backbone your business needs to operate securely and at scale.',
    category: 'Infrastructure',
    icon: '🌐',
    heroImage: null,
    gallery: [],
    video: null,
    features: ['Structured Cabling & Fiber Networks', 'Commercial CCTV Systems', 'Biometric Access Control', 'Server Room Installation', 'Cloud Architecture', 'Network Security'],
    benefits: ['Reliable, high-speed connectivity', '24/7 security monitoring', 'Scalable infrastructure', 'Reduced downtime'],
    process: [
      { step: 1, title: 'Site Survey', description: 'Assess existing infrastructure' },
      { step: 2, title: 'Design', description: 'Plan network and security layout' },
      { step: 3, title: 'Supply', description: 'Source certified equipment' },
      { step: 4, title: 'Install', description: 'Professional installation and testing' },
      { step: 5, title: 'Support', description: 'Ongoing maintenance SLA' },
    ],
    pricingType: 'custom',
    active: true,
    featured: false,
    seoTitle: 'ICT Infrastructure & Security Systems Kenya | GELWO',
    seoDescription: 'Fiber networks, CCTV, biometric access control and server installation services in Kenya by GELWO Technologies.',
  },
  {
    id: '5',
    slug: 'solar-energy',
    name: 'Solar Microgrids & Clean Energy',
    shortDescription: 'Commercial & industrial solar microgrids, battery backup systems, hybrid power plants, and off-grid institutional power.',
    longDescription: 'GELWO designs, supplies and installs commercial and industrial solar energy systems. From 10kW rooftop installations to 1MW+ microgrids — we provide reliable, cost-effective clean power.',
    category: 'Clean Energy',
    icon: '☀️',
    heroImage: null,
    gallery: [],
    video: null,
    features: ['Commercial Solar Installations', 'Industrial Microgrids', 'Battery Energy Storage', 'Hybrid Power Systems', 'Off-Grid Institutional Power', 'Solar Monitoring & SCADA'],
    benefits: ['Reduce electricity bills by up to 80%', 'Reliable power during grid outages', 'Government incentives available', 'Long-term ROI within 3-5 years'],
    process: [
      { step: 1, title: 'Energy Audit', description: 'Assess current energy consumption' },
      { step: 2, title: 'System Design', description: 'Engineer the optimal solar solution' },
      { step: 3, title: 'Supply', description: 'Source certified solar equipment' },
      { step: 4, title: 'Installation', description: 'Professional installation & commissioning' },
      { step: 5, title: 'Monitoring', description: 'Remote monitoring & maintenance' },
    ],
    pricingType: 'custom',
    active: true,
    featured: true,
    seoTitle: 'Solar Energy Systems Kenya | GELWO Technologies',
    seoDescription: 'Commercial and industrial solar microgrid installation, battery storage and off-grid power solutions in Kenya.',
  },
  {
    id: '6',
    slug: 'civil-construction',
    name: 'Civil Construction & Engineering',
    shortDescription: 'NCA certified structural construction, commercial remodeling, site planning, structural engineering, and infrastructure.',
    longDescription: "GELWO's NCA-certified construction division delivers institutional-grade construction projects — from commercial buildings to infrastructure installations.",
    category: 'NCA Accredited',
    icon: '🏗️',
    heroImage: null,
    gallery: [],
    video: null,
    features: ['Structural Construction', 'Commercial Renovation & Remodeling', 'Site Planning & Surveying', 'Structural Engineering', 'Infrastructure Installation', 'Project Management'],
    benefits: ['NCA certified for quality assurance', 'Timely project delivery', 'Competitive pricing', 'Full project management'],
    process: [
      { step: 1, title: 'Site Survey', description: 'Site assessment and feasibility' },
      { step: 2, title: 'Design', description: 'Architectural and structural design' },
      { step: 3, title: 'BOQ', description: 'Bill of quantities and costing' },
      { step: 4, title: 'Construction', description: 'Build phase with quality controls' },
      { step: 5, title: 'Handover', description: 'Inspection and project handover' },
    ],
    pricingType: 'custom',
    active: true,
    featured: false,
    seoTitle: 'Civil Construction & Engineering Kenya | GELWO',
    seoDescription: 'NCA certified commercial construction, structural engineering and civil works in Kenya by GELWO Technologies.',
  },
];

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ services: SERVICES_SEED });
    }
    return NextResponse.json({ services: data });
  } catch {
    return NextResponse.json({ services: SERVICES_SEED });
  }
}
