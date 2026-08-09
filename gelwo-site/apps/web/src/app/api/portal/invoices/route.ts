import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdStr = searchParams.get('userId');

    let invoices;
    if (userIdStr) {
      const userId = parseInt(userIdStr, 10);
      invoices = await prisma.$queryRaw`
        SELECT id, invoice_no as "invoiceNo", user_id as "userId", description, 
               amount, status, due_date as "dueDate", created_at as "createdAt"
        FROM invoices
        WHERE user_id = ${userId}
        ORDER BY id DESC
      `;
    } else {
      invoices = await prisma.$queryRaw`
        SELECT i.id, i.invoice_no as "invoiceNo", i.user_id as "userId", i.description, 
               i.amount, i.status, i.due_date as "dueDate", i.created_at as "createdAt",
               u.full_name as "customerName"
        FROM invoices i
        LEFT JOIN users u ON i.user_id = u.id
        ORDER BY i.id DESC
      `;
    }

    return NextResponse.json({ success: true, data: invoices });
  } catch (error: any) {
    console.error('Invoices GET error:', error);
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
    const { id, invoiceNo, userId, description, amount, status, dueDate } = body;

    const parsedUserId = userId ? parseInt(userId, 10) : null;
    const parsedAmount = amount ? parseFloat(amount) : 0.00;

    if (id) {
      // Update existing invoice status
      await prisma.$executeRaw`
        UPDATE invoices
        SET status = ${status}
        WHERE id = ${parseInt(id, 10)}
      `;

      const invoice: any[] = await prisma.$queryRaw`
        SELECT id, invoice_no as "invoiceNo", user_id as "userId", description, 
               amount, status, due_date as "dueDate", created_at as "createdAt"
        FROM invoices WHERE id = ${parseInt(id, 10)} LIMIT 1
      `;
      return NextResponse.json({ success: true, data: invoice[0] });
    } else {
      // Create new invoice
      if (!invoiceNo || !description) {
        return NextResponse.json({ success: false, error: 'invoiceNo and description are required for creation' }, { status: 400 });
      }

      const finalDueDate = dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days default

      await prisma.$executeRaw`
        INSERT INTO invoices (invoice_no, user_id, description, amount, status, due_date)
        VALUES (${invoiceNo}, ${parsedUserId}, ${description}, ${parsedAmount}, ${status || 'pending'}, ${finalDueDate})
      `;

      const invoice: any[] = await prisma.$queryRaw`
        SELECT id, invoice_no as "invoiceNo", user_id as "userId", description, 
               amount, status, due_date as "dueDate", created_at as "createdAt"
        FROM invoices WHERE invoice_no = ${invoiceNo} LIMIT 1
      `;
      return NextResponse.json({ success: true, data: invoice[0] });
    }
  } catch (error: any) {
    console.error('Invoices POST error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message, 
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.'
    });
  }
}
