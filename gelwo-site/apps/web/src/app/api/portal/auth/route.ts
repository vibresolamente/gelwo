import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.$queryRaw`
      SELECT id, account_no as "accountNo", first_name as "firstName", last_name as "lastName", 
             full_name as "fullName", email, phone, company, role, created_at as "createdAt"
      FROM users
      ORDER BY id DESC
    `;
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    console.error('Error fetching users from database:', error);
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
    const { action, firstName, lastName, fullName, email, password, phone, company, accountNo } = body;

    if (action === 'register') {
      if (!email || !password || !firstName || !lastName) {
        return NextResponse.json({ success: false, error: 'Missing required registration fields' }, { status: 400 });
      }

      // Check if user already exists
      const existing: any[] = await prisma.$queryRaw`
        SELECT id FROM users WHERE email = ${email} LIMIT 1
      `;
      if (existing.length > 0) {
        return NextResponse.json({ success: false, error: 'User with this email already exists' }, { status: 400 });
      }

      // Insert user
      const finalAccountNo = accountNo || 'GEL-' + Math.floor(10000 + Math.random() * 90000);
      const finalFullName = fullName || `${firstName} ${lastName}`;

      await prisma.$executeRaw`
        INSERT INTO users (account_no, first_name, last_name, full_name, email, password, phone, company, role)
        VALUES (${finalAccountNo}, ${firstName}, ${lastName}, ${finalFullName}, ${email}, ${password}, ${phone}, ${company}, 'customer')
      `;

      // Retrieve inserted user
      const users: any[] = await prisma.$queryRaw`
        SELECT id, account_no as "accountNo", first_name as "firstName", last_name as "lastName", 
               full_name as "fullName", email, phone, company, role 
        FROM users WHERE email = ${email} LIMIT 1
      `;

      return NextResponse.json({ success: true, data: users[0] });

    } else if (action === 'login') {
      if (!email || !password) {
        return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
      }

      const users: any[] = await prisma.$queryRaw`
        SELECT id, account_no as "accountNo", first_name as "firstName", last_name as "lastName", 
               full_name as "fullName", email, password, phone, company, role
        FROM users WHERE email = ${email} LIMIT 1
      `;

      if (users.length === 0 || users[0].password !== password) {
        return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
      }

      const { password: _, ...userWithoutPassword } = users[0];
      return NextResponse.json({ success: true, data: userWithoutPassword });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Auth API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message, 
      fallback: true,
      message: 'Database connection failed. Falling back to LocalStorage.'
    });
  }
}
