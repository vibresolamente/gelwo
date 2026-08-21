/**
 * GET /api/products/[slug]
 *
 * Blueprint Section 42: single product detail endpoint.
 */

import { NextResponse } from 'next/server';
import { PRODUCTS_SEED } from '../route';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const { prisma } = await import('@/lib/prisma');
    const db = prisma as any;
    const product = await db.product.findUnique({
      where: { slug },
      include: { gallery: { orderBy: { order: 'asc' } } },
    });

    if (!product) {
      const seed = PRODUCTS_SEED.find((p) => p.slug === slug);
      if (!seed) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      return NextResponse.json({ product: seed });
    }

    return NextResponse.json({ product });
  } catch {
    const seed = PRODUCTS_SEED.find((p) => p.slug === slug);
    if (!seed) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ product: seed });
  }
}
