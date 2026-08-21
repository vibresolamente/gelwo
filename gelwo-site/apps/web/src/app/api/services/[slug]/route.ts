/**
 * GET /api/services/[slug]
 *
 * Blueprint Section 42: API Architecture
 * Returns a single service by slug, including full detail fields.
 */

import { NextResponse } from 'next/server';
import { SERVICES_SEED } from '../route';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const { prisma } = await import('@/lib/prisma');
    const db = prisma as any;
    const service = await db.service.findUnique({
      where: { slug },
      include: {
        gallery: { orderBy: { order: 'asc' } },
        category: true,
      },
    });

    if (!service) {
      // Try seed fallback
      const seed = SERVICES_SEED.find((s) => s.slug === slug);
      if (!seed) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      return NextResponse.json({ service: seed });
    }

    return NextResponse.json({ service });
  } catch {
    // DB unavailable — use seed data
    const seed = SERVICES_SEED.find((s) => s.slug === slug);
    if (!seed) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ service: seed });
  }
}
