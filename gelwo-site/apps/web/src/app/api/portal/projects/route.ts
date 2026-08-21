import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdpcefbvfxgrmwcoefl.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = supabase
      .from('projects')
      .select('id, project_no, title, user_id, location, progress, status, assigned_engineer, created_at')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Projects GET error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.',
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, projectNo, title, userId, location, progress, status, assignedEngineer } = body;

    if (id) {
      // Update existing project
      const { data, error } = await supabase
        .from('projects')
        .update({
          progress: progress ?? 0,
          status: status || 'Planning',
          assigned_engineer: assignedEngineer || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    } else {
      // Create new project
      if (!projectNo || !title) {
        return NextResponse.json({ success: false, error: 'projectNo and title are required for creation' }, { status: 400 });
      }

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          project_no: projectNo,
          title,
          user_id: userId || null,
          location: location || null,
          progress: progress ?? 0,
          status: status || 'Planning',
          assigned_engineer: assignedEngineer || null,
        }])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }
  } catch (error: any) {
    console.error('Projects POST error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.',
    });
  }
}
