import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: "GELWO Technologies | Building Tomorrow's Solutions Today",
  description: 'East Africa’s premier corporate leader in ICT & Security, Solar Energy Microgrids, Electrical Engineering, General Supplies, Construction, and AI Quotation Systems.',
  keywords: 'GELWO Technologies, ICT Kenya, Solar Energy Kenya, Government Tenders AGPO, Civil Construction, AI Quotation Engine, Nakuru Solar, Nairobi ICT',
  authors: [{ name: 'GELWO Technologies Technical Division' }],
  openGraph: {
    title: 'GELWO Technologies | Digital Headquarters',
    description: 'Transforming Businesses, Institutions and Communities Through Technology, Innovation and Excellence.',
    type: 'website',
    url: 'https://gelwo.co.ke',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-[#0A0F1D] text-slate-100 antialiased font-sans selection:bg-cyan-500 selection:text-black">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
