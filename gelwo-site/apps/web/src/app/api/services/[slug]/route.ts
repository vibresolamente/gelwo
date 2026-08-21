/**
 * GET /api/services/[slug]
 * Returns a single service by slug.
 */

import { NextResponse } from 'next/server';
import { SERVICES_SEED } from '../route';
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
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const seed = SERVICES_SEED.find((s) => s.slug === slug);
      if (!seed) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      return NextResponse.json({ service: seed });
    }

    return NextResponse.json({ service: data });
  } catch {
    const seed = SERVICES_SEED.find((s) => s.slug === slug);
    if (!seed) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json({ service: seed });
  }
}
