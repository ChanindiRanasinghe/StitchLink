import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F9FAFB] text-[#1F2937] font-sans">
        {children}
      </body>
    </html>
  );
}

