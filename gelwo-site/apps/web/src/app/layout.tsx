import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { TransitionManager } from '@/components/TransitionManager';

export const metadata: Metadata = {
  title: "GELWO Technologies | Building Tomorrow's Solutions Today",
  description:
    "East Africa's premier corporate leader in ICT & Security, Solar Energy Microgrids, Electrical Engineering, General Supplies, Construction, and AI Quotation Systems.",
  keywords:
    'GELWO Technologies, ICT Kenya, Solar Energy Kenya, Government Tenders AGPO, Civil Construction, AI Quotation Engine, Nakuru Solar, Nairobi ICT',
  authors: [{ name: 'GELWO Technologies Technical Division' }],
  themeColor: '#4A346A',
  openGraph: {
    title: 'GELWO Technologies | Digital Headquarters',
    description:
      'Transforming Businesses, Institutions and Communities Through Technology, Innovation and Excellence.',
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Google Fonts — Inter + Outfit (GELWO design system) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gelwo-ivory text-gelwo-midnight antialiased font-sans selection:bg-gelwo-purple selection:text-gelwo-ivory">
        <AppProvider>
          {/* TransitionManager: cinematic page transition system */}
          <TransitionManager>
            {children}
          </TransitionManager>
        </AppProvider>
      </body>
    </html>
  );
}
