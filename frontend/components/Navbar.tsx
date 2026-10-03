"use client";

import { useState } from "react";
import { Language, translations } from "@/lib/translations";

interface NavbarProps {
  onOpenAuth: (mode: "login" | "register", role?: "shop" | "dressmaker" | "admin") => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenGuide: () => void;
}

export default function Navbar({
  onOpenAuth,
  currentLang,
  onLanguageChange,
  onOpenGuide,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  const navLinks = [
    { name: t.navMarketplace, href: "#marketplace" },
    { name: t.navHowItWorks, href: "#how-it-works" },
    { name: t.navAiFeatures, href: t.navAiFeatures },
    { name: t.navBenefits, href: "#benefits" },
    { name: t.navTestimonials, href: "#testimonials" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C4AB6] to-[#4A2E80] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#1F2937] tracking-tight group-hover:text-[#6C4AB6] transition-colors">
              {t.brandName}
            </span>
            <span className="text-[10px] font-semibold text-[#2A9D8F] tracking-widest uppercase">
              {t.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-sm font-medium text-[#6B7280] hover:text-[#6C4AB6] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Quick Beginner Guide Button */}
          <button
            onClick={onOpenGuide}
            className="px-3 py-1.5 rounded-lg bg-teal-50 text-[#2A9D8F] hover:bg-teal-100 text-xs font-bold border border-teal-200 flex items-center gap-1.5 transition-colors"
          >
            <span>💡</span> Guide / උපකාර
          </button>

          {/* Language Selector Pill */}
          <div className="relative flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => onLanguageChange("en")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLang === "en" ? "bg-white text-[#6C4AB6] shadow-xs" : "text-[#6B7280]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange("si")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLang === "si" ? "bg-white text-[#6C4AB6] shadow-xs" : "text-[#6B7280]"
              }`}
            >
              සිං
            </button>
            <button
              onClick={() => onLanguageChange("ta")}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLang === "ta" ? "bg-white text-[#6C4AB6] shadow-xs" : "text-[#6B7280]"
              }`}
            >
              த
            </button>
          </div>

          <button
            onClick={() => onOpenAuth("login")}
            className="text-xs font-bold text-[#1F2937] hover:text-[#6C4AB6] px-3.5 py-2 rounded-lg transition-colors"
          >
            {t.login}
          </button>

          <button
            onClick={() => onOpenAuth("register", "shop")}
            className="bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            {t.joinStitchLink}
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenGuide}
            className="p-1.5 bg-teal-50 text-[#2A9D8F] rounded-lg text-xs font-bold border border-teal-200"
          >
            💡
          </button>
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
            <button
              onClick={() => onLanguageChange("en")}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${currentLang === "en" ? "bg-white text-[#6C4AB6]" : "text-gray-500"}`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange("si")}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${currentLang === "si" ? "bg-white text-[#6C4AB6]" : "text-gray-500"}`}
            >
              සිං
            </button>
            <button
              onClick={() => onLanguageChange("ta")}
              className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${currentLang === "ta" ? "bg-white text-[#6C4AB6]" : "text-gray-500"}`}
            >
              த
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1F2937] hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-6 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#1F2937] py-2 border-b border-gray-50"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth("login");
              }}
              className="w-full text-center py-2.5 font-bold text-[#6C4AB6] border border-[#6C4AB6] rounded-xl text-xs"
            >
              {t.login}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth("register", "shop");
              }}
              className="w-full text-center py-2.5 font-bold text-white bg-[#6C4AB6] rounded-xl text-xs"
            >
              {t.joinStitchLink}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
