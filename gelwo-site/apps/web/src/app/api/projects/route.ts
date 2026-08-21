/**
 * GET /api/projects
 *
 * Blueprint Section 17-20 & 42: Portfolio and case studies API.
 * Returns past projects across GELWO's divisions.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const PROJECTS_SEED = [
  {
    id: '1',
    slug: 'enterprise-management-system',
    title: 'Enterprise ERP System',
    client: 'Multi-Branch Commercial Corporation',
    category: 'Software & ERP',
    shortDesc: 'Centralized cloud ERP integrating inventory, multi-store POS, HR, and automated M-Pesa & card billing across 12 county hubs.',
    fullDesc: 'GELWO engineered an end-to-end Enterprise Resource Planning system for a major commercial enterprise operating across 12 regional hubs in Kenya. The platform integrated procurement, warehouse management, HR payroll, and real-time M-Pesa billing.',
    heroImage: '/futuristic_bg.jpg',
    gallery: [],
    metrics: [
      { label: 'Efficiency Increase', value: '40%' },
      { label: 'Reconciliation Loss', value: '0%' },
      { label: 'Active Users', value: '500+' },
      { label: 'Regional Hubs Sync', value: '12' },
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'M-Pesa API', 'Docker'],
    testimonial: {
      quote: 'GELWO transformed our multi-branch operation from manual reconciliation chaos to a unified real-time dashboard.',
      author: 'Managing Director',
      company: 'Commercial Corp Ltd',
    },
    featured: true,
  },
  {
    id: '2',
    slug: 'commercial-solar-microgrid',
    title: '150kW Commercial Solar Microgrid',
    client: 'Nakuru Manufacturing Plant',
    category: 'Clean Energy',
    shortDesc: '150kW rooftop solar installation with 300kWh lithium battery energy storage system (BESS) and SCADA telemetry.',
    fullDesc: 'GELWO Clean Energy designed and installed a 150kW grid-hybrid solar microgrid for an industrial manufacturing facility in Nakuru. The system guarantees uninterrupted power supply while reducing monthly grid electricity costs.',
    heroImage: '/futuristic_bg.jpg',
    gallery: [],
    metrics: [
      { label: 'Bill Reduction', value: '75%' },
      { label: 'Battery Capacity', value: '300 kWh' },
      { label: 'Solar Output', value: '150 kW' },
      { label: 'Payback Period', value: '3.2 Years' },
    ],
    technologies: ['Tier-1 Monocrystalline', 'Lithium Iron Phosphate', 'SCADA Cloud Telemetry'],
    testimonial: {
      quote: 'Our power bill dropped by 75% in the first month. The GELWO SCADA dashboard gives us complete control.',
      author: 'Operations Director',
      company: 'Industrial Plant',
    },
    featured: true,
  },
  {
    id: '3',
    slug: 'hotel-management-platform',
    title: 'Hotel Management Platform',
    client: 'Luxury Resort Group',
    category: 'Software',
    shortDesc: 'Online room booking system with real-time availability calendar, staff task allocation, and automated guest notifications.',
    fullDesc: 'A complete hospitality management ecosystem incorporating guest web reservations, POS bar & restaurant billing, room service dispatch, and automated WhatsApp booking confirmations.',
    heroImage: '/futuristic_bg.jpg',
    gallery: [],
    metrics: [
      { label: 'Direct Booking Sync', value: '100%' },
      { label: 'Revenue Growth', value: '2.5x' },
      { label: 'Guest Check-in Time', value: '<2 mins' },
    ],
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Stripe', 'Twilio WhatsApp'],
    testimonial: {
      quote: 'GELWO provided a seamless booking portal that doubled our direct web reservations in 90 days.',
      author: 'General Manager',
      company: 'Resort & Spa',
    },
    featured: true,
  },
  {
    id: '4',
    slug: 'institutional-cctv-access-control',
    title: 'Institutional CCTV & Biometric Control',
    client: 'Nairobi Campus & Administrative Complex',
    category: 'ICT & Security',
    shortDesc: '64-camera 4K CCTV deployment with facial recognition turnstiles and central security command room.',
    fullDesc: 'GELWO ICT & Security Division executed a full security infrastructure overhaul for an educational campus in Nairobi — installing high-density fiber backbones, 4K CCTV cameras with AI perimeter detection, and biometric turnstiles.',
    heroImage: '/futuristic_bg.jpg',
    gallery: [],
    metrics: [
      { label: 'Cameras Deployed', value: '64 Units' },
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Daily Passages', value: '5,000+' },
    ],
    technologies: ['Hikvision IP 4K', 'ZKTeco Turnstiles', 'Fiber Backbone', 'AI Motion Detection'],
    testimonial: {
      quote: 'Campus security is now completely centralized. The automated biometric access logs directly into our HR portal.',
      author: 'Chief Security Officer',
      company: 'Educational Institution',
    },
    featured: false,
  },
];

export async function GET() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const db = prisma as any;
    const projects = await db.project.findMany({
      orderBy: { featured: 'desc' },
    });
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ projects: PROJECTS_SEED });
  }
}
