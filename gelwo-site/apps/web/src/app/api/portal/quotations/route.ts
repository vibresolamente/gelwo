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
      .from('quotations')
      .select('id, ref_number, user_id, customer_name, customer_email, service_category, sub_category, scope_size, client_type, estimated_cost, status, created_at')
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Quotations GET error:', error);
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
    const { quoteNo, userId, serviceName, location, scope, amount, status, customerName, customerEmail, serviceCategory, subCategory, scopeSize, clientType } = body;

    if (!quoteNo && !serviceCategory) {
      return NextResponse.json({ success: false, error: 'quoteNo or serviceCategory is required' }, { status: 400 });
    }

    const refNumber = quoteNo || `GLW-QT-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const { data, error } = await supabase
      .from('quotations')
      .insert([{
        ref_number: refNumber,
        user_id: userId || null,
        customer_name: customerName || 'Unknown',
        customer_email: customerEmail || null,
        service_category: serviceCategory || serviceName || 'General',
        sub_category: subCategory || null,
        scope_size: scopeSize || scope || 'Standard',
        client_type: clientType || 'Corporate',
        estimated_cost: amount ? `KES ${amount}` : 'TBD',
        status: status || 'Submitted',
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Quotations POST error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.',
    });
  }
}
