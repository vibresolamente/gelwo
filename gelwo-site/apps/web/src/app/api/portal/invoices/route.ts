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
      .from('documents')
      .select('id, doc_number, doc_type, customer_name, customer_email, organization, total_amount, status, issue_date, created_at')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Invoices GET error:', error);
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
    const { id, docNumber, userId, customerName, customerEmail, organization, items, subtotal, vatAmount, totalAmount, status, dueDate, docType, notes } = body;

    if (id) {
      // Update existing document status
      const { data, error } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    } else {
      // Create new document
      if (!docNumber || !customerName) {
        return NextResponse.json({ success: false, error: 'docNumber and customerName are required' }, { status: 400 });
      }

      const { data, error } = await supabase
        .from('documents')
        .insert([{
          doc_number: docNumber,
          doc_type: docType || 'invoice',
          user_id: userId || null,
          customer_name: customerName,
          customer_email: customerEmail || null,
          organization: organization || null,
          items: items || [],
          subtotal: subtotal || 0,
          vat_amount: vatAmount || 0,
          total_amount: totalAmount || 0,
          status: status || 'Issued',
          due_date: dueDate || null,
          notes: notes || null,
        }])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }
  } catch (error: any) {
    console.error('Invoices POST error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.',
    });
  }
}
