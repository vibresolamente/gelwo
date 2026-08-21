import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://swdpcefbvfxgrmwcoefl.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('profiles')
      .select('id, account_no, full_name, email, phone, company_name, role, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.error('Error fetching users from database:', error);
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
    const { action, firstName, lastName, fullName, email, password, phone, company, accountNo } = body;

    if (action === 'register') {
      if (!email || !password || !firstName || !lastName) {
        return NextResponse.json({ success: false, error: 'Missing required registration fields' }, { status: 400 });
      }

      // Check if user already exists
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json({ success: false, error: 'User with this email already exists' }, { status: 400 });
      }

      const finalAccountNo = accountNo || 'GEL-' + Math.floor(10000 + Math.random() * 90000);
      const finalFullName = fullName || `${firstName} ${lastName}`;

      const { data: newUser, error } = await supabase
        .from('profiles')
        .insert([{
          account_no: finalAccountNo,
          full_name: finalFullName,
          email,
          phone: phone || null,
          company_name: company || null,
          role: 'customer',
        }])
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, data: newUser });

    } else if (action === 'login') {
      if (!email) {
        return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
      }

      const { data: users, error } = await supabase
        .from('profiles')
        .select('id, account_no, full_name, email, phone, company_name, role')
        .eq('email', email)
        .limit(1);

      if (error) throw error;
      if (!users || users.length === 0) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 401 });
      }

      return NextResponse.json({ success: true, data: users[0] });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Auth API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.',
    });
  }
}
