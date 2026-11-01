import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StitchLink | B2B Marketplace for Garment Sourcing & Solo Dressmakers",
  description:
    "Connect clothing businesses with skilled independent and home-based dressmakers for smarter garment sourcing, AI-driven quotations, and streamlined production management in Sri Lanka.",
  keywords: [
    "clothing marketplace",
    "dressmaker sourcing",
    "garment production",
    "B2B fashion",
    "Sri Lanka dressmakers",
    "AI quotation assistant",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-teal-500/20 selection:text-teal-900">
        {children}
      </body>
    </html>
  );
}
