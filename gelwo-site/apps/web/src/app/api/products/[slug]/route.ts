/**
 * GET /api/products/[slug]
 * Returns a single product by slug.
 */

import { NextResponse } from 'next/server';
import { PRODUCTS_SEED } from '../route';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdpcefbvfxgrmwcoefl.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const seed = PRODUCTS_SEED.find((p) => p.slug === slug);
      if (!seed) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      return NextResponse.json({ product: seed });
    }

    return NextResponse.json({ product: data });
  } catch {
    const seed = PRODUCTS_SEED.find((p) => p.slug === slug);
    if (!seed) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ product: seed });
  }
}
