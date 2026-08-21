import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdStr = searchParams.get('userId');

    let quotations;
    if (userIdStr) {
      const userId = parseInt(userIdStr, 10);
      quotations = await prisma.$queryRaw`
        SELECT id, quote_no as "quoteNo", user_id as "userId", service_name as "serviceName", 
               location, scope, amount, status, created_at as "createdAt"
        FROM quotations
        WHERE user_id = ${userId}
        ORDER BY id DESC
      `;
    } else {
      quotations = await prisma.$queryRaw`
        SELECT q.id, q.quote_no as "quoteNo", q.user_id as "userId", q.service_name as "serviceName", 
               q.location, q.scope, q.amount, q.status, q.created_at as "createdAt",
               u.full_name as "customerName"
        FROM quotations q
        LEFT JOIN users u ON q.user_id = u.id
        ORDER BY q.id DESC
      `;
    }

    return NextResponse.json({ success: true, data: quotations });
  } catch (error: any) {
    console.error('Quotations GET error:', error);
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
    const { quoteNo, userId, serviceName, location, scope, amount, status } = body;

    if (!quoteNo || !serviceName) {
      return NextResponse.json({ success: false, error: 'quoteNo and serviceName are required' }, { status: 400 });
    }

    const parsedUserId = userId ? parseInt(userId, 10) : null;
    const parsedAmount = amount ? parseFloat(amount) : 0.00;

    await prisma.$executeRaw`
      INSERT INTO quotations (quote_no, user_id, service_name, location, scope, amount, status)
      VALUES (${quoteNo}, ${parsedUserId}, ${serviceName}, ${location}, ${scope}, ${parsedAmount}, ${status || 'pending'})
    `;

    // Retrieve inserted quotation
    const quotation: any[] = await prisma.$queryRaw`
      SELECT id, quote_no as "quoteNo", user_id as "userId", service_name as "serviceName", 
             location, scope, amount, status, created_at as "createdAt"
      FROM quotations WHERE quote_no = ${quoteNo} LIMIT 1
    `;

    return NextResponse.json({ success: true, data: quotation[0] });
  } catch (error: any) {
    console.error('Quotations POST error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message, 
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.'
    });
  }
}
