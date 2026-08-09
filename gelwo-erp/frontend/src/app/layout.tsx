import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GELWO Admin ERP Dashboard",
  description: "Enterprise ERP Dashboard for GELWO Technologies - CRM, Quotations, Sales, Projects, Analytics & AI Assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#070B19] text-white antialiased">
        {children}
      </body>
    </html>
  );
}

