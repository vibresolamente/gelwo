/**
 * GET /api/projects/[slug]
 *
 * Blueprint Section 18-20: Project detail endpoint.
 */

import { NextResponse } from 'next/server';
import { PROJECTS_SEED } from '../route';

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const { prisma } = await import('@/lib/prisma');
    const db = prisma as any;
    const project = await db.project.findUnique({
      where: { slug },
    });

    if (!project) {
      const seed = PROJECTS_SEED.find((p) => p.slug === slug);
      if (!seed) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      return NextResponse.json({ project: seed });
    }

    return NextResponse.json({ project });
  } catch {
    const seed = PROJECTS_SEED.find((p) => p.slug === slug);
    if (!seed) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ project: seed });
  }
}
