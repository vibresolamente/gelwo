import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Nav from '@/app/dashboard/nav';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex bg-gray-900 text-white antialiased">
        <SessionProvider>
          <div className="flex w-full h-screen overflow-hidden">
            <Nav />
            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
