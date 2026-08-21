import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdStr = searchParams.get('userId');

    let projects;
    if (userIdStr) {
      const userId = parseInt(userIdStr, 10);
      projects = await prisma.$queryRaw`
        SELECT id, project_no as "projectNo", title, user_id as "userId", location, 
               progress, status, assigned_engineer as "assignedEngineer", created_at as "createdAt"
        FROM projects
        WHERE user_id = ${userId}
        ORDER BY id DESC
      `;
    } else {
      projects = await prisma.$queryRaw`
        SELECT p.id, p.project_no as "projectNo", p.title, p.user_id as "userId", p.location, 
               p.progress, p.status, p.assigned_engineer as "assignedEngineer", p.created_at as "createdAt",
               u.full_name as "customerName"
        FROM projects p
        LEFT JOIN users u ON p.user_id = u.id
        ORDER BY p.id DESC
      `;
    }

    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message, 
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.'
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, projectNo, title, userId, location, progress, status, assignedEngineer } = body;

    const parsedUserId = userId ? parseInt(userId, 10) : null;
    const parsedProgress = progress !== undefined ? parseInt(progress, 10) : 0;

    if (id) {
      // Update existing project
      await prisma.$executeRaw`
        UPDATE projects
        SET progress = ${parsedProgress}, status = ${status}, assigned_engineer = ${assignedEngineer}
        WHERE id = ${parseInt(id, 10)}
      `;

      const project: any[] = await prisma.$queryRaw`
        SELECT id, project_no as "projectNo", title, user_id as "userId", location, 
               progress, status, assigned_engineer as "assignedEngineer", created_at as "createdAt"
        FROM projects WHERE id = ${parseInt(id, 10)} LIMIT 1
      `;
      return NextResponse.json({ success: true, data: project[0] });
    } else {
      // Create new project
      if (!projectNo || !title) {
        return NextResponse.json({ success: false, error: 'projectNo and title are required for creation' }, { status: 400 });
      }

      await prisma.$executeRaw`
        INSERT INTO projects (project_no, title, user_id, location, progress, status, assigned_engineer)
        VALUES (${projectNo}, ${parsedUserId}, ${title}, ${location}, ${parsedProgress}, ${status || 'Planning'}, ${assignedEngineer})
      `;

      const project: any[] = await prisma.$queryRaw`
        SELECT id, project_no as "projectNo", title, user_id as "userId", location, 
               progress, status, assigned_engineer as "assignedEngineer", created_at as "createdAt"
        FROM projects WHERE project_no = ${projectNo} LIMIT 1
      `;
      return NextResponse.json({ success: true, data: project[0] });
    }
  } catch (error: any) {
    console.error('Projects POST error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message, 
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.'
    });
  }
}
