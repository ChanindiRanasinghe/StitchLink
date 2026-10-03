"use client";

import { Language, translations } from "@/lib/translations";

interface HeroSectionProps {
  onOpenAuth: (mode: "login" | "register", role?: "shop" | "dressmaker" | "admin") => void;
  lang?: Language;
}

export default function HeroSection({ onOpenAuth, lang = "en" }: HeroSectionProps) {
  const t = translations[lang] || translations.en;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EDE7F6]/40 via-white to-[#F9FAFB] pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#6C4AB6]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#2A9D8F]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* AI Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full ai-badge text-xs font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-[#2A9D8F] animate-pulse"></span>
              <span>{t.heroPill}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] tracking-tight leading-[1.15]">
              {t.heroTitlePrefix} <br />
              <span className="text-[#6C4AB6] bg-clip-text text-transparent bg-gradient-to-r from-[#6C4AB6] to-[#2A9D8F]">
                {t.heroTitleSuffix}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#6B7280] leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={() => onOpenAuth("register", "shop")}
                className="bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white font-semibold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
              >
                {t.findDressmaker}
                <svg className="w-5 h-5 stroke-current group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

              <button
                onClick={() => onOpenAuth("register", "dressmaker")}
                className="bg-white hover:bg-gray-50 text-[#1F2937] border-2 border-gray-200 hover:border-[#6C4AB6] font-semibold text-base px-8 py-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                {t.joinAsDressmaker}
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200/80 w-full max-w-lg">
              <div>
                <p className="text-2xl font-bold text-[#1F2937]">1,200+</p>
                <p className="text-xs text-[#6B7280] font-medium">{t.statDressmakers}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1F2937]">98.4%</p>
                <p className="text-xs text-[#6B7280] font-medium">{t.statAccuracy}</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2A9D8F]">450+</p>
                <p className="text-xs text-[#6B7280] font-medium">{t.statShops}</p>
              </div>
            </div>

          </div>

          {/* Right Hero Graphic & AI Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Preview Card */}
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 space-y-5">
                
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=120&q=80"
                      alt="Order Sample"
                      className="w-12 h-12 rounded-xl object-cover border border-purple-200"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[#1F2937]">Silk Frock Garment Order</h4>
                      <p className="text-xs text-[#6B7280]">Urban Threads Shop • Colombo 07</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Order
                  </span>
                </div>

                {/* AI Recommendation Spotlight */}
                <div className="bg-gradient-to-br from-[#EDE7F6]/60 to-white rounded-xl p-4 border border-[#6C4AB6]/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C4AB6]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      AI Recommended Dressmaker
                    </span>
                    <span className="text-xs font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2 py-0.5 rounded-full">
                      98% Match
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                      alt="Nisansala"
                      className="w-10 h-10 rounded-full object-cover border border-[#6C4AB6]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#1F2937] truncate">Nisansala Ranasinghe</p>
                      <p className="text-[11px] text-[#6B7280]">Expert Dressmaker • Kandy (12 km)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="bg-white/80 p-2 rounded-lg border border-gray-100">
                      <span className="text-[#6B7280] block">Suggested Quote</span>
                      <span className="font-bold text-[#1F2937]">LKR 4,500 / unit</span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-gray-100">
                      <span className="text-[#6B7280] block">Capacity Risk</span>
                      <span className="font-bold text-emerald-600">Low (92% Avail.)</span>
                    </div>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-[#1F2937]">Production Progress</span>
                    <span className="font-bold text-[#6C4AB6]">65%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#6C4AB6] to-[#2A9D8F] h-full w-[65%] rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-[#6B7280] flex justify-between">
                    <span>Pattern Cutting Done</span>
                    <span>Deadline: Oct 12, 2026</span>
                  </p>
                </div>

              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#2A9D8F]/10 flex items-center justify-center text-[#2A9D8F]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1F2937]">Verified Quality</p>
                  <p className="text-[10px] text-[#6B7280]">Zero Category Mismatches</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
