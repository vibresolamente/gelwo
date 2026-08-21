/**
 * GET /api/projects/[slug]
 * Returns a single project by slug.
 */

import { NextResponse } from 'next/server';
import { PROJECTS_SEED } from '../route';
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
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      const seed = PROJECTS_SEED.find((p) => p.slug === slug);
      if (!seed) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ project: seed });
    }

    return NextResponse.json({ project: data });
  } catch {
    const seed = PROJECTS_SEED.find((p) => p.slug === slug);
    if (!seed) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ project: seed });
  }
}
