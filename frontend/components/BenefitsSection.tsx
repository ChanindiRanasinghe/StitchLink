"use client";

export default function BenefitsSection() {
  const shopBenefits = [
    "Instant access to verified solo and home-based dressmakers across Sri Lanka",
    "Smart AI category validation prevents order misunderstandings before production",
    "Competitive quotation comparison with transparent pricing breakdown",
    "Real-time order timeline & production risk monitoring to avoid missed deadlines",
    "Direct communication channel with garment makers",
  ];

  const dressmakerBenefits = [
    "Zero marketing costs — showcase portfolio to active clothing shop buyers",
    "Fair AI pricing guidance (LKR) to ensure profitable quotation proposals",
    "Flexible workload management based on sewing capacity and weekly availability",
    "Build business reputation through verified ratings and review testimonials",
    "Work from home with predictable recurring order pipelines",
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2A9D8F]">
            Win-Win Marketplace Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            Empowering Shops & Solo Dressmakers
          </h2>
          <p className="text-base text-[#6B7280]">
            Designed specifically for Sri Lanka&apos;s apparel ecosystem to foster sustainable business growth and fair trade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Shop Card */}
          <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C4AB6]/5 rounded-bl-full pointer-events-none"></div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#6C4AB6] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  🏢
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F2937]">For Clothing Shops</h3>
                  <p className="text-xs text-[#6B7280]">Boutiques, Brands & Apparel Retailers</p>
                </div>
              </div>

              <ul className="space-y-4">
                {shopBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#1F2937]">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/60">
              <span className="text-xs font-bold text-[#6C4AB6]">Scale your garment sourcing with zero overhead →</span>
            </div>
          </div>

          {/* Dressmaker Card */}
          <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A9D8F]/5 rounded-bl-full pointer-events-none"></div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#2A9D8F] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  🪡
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F2937]">For Solo Dressmakers</h3>
                  <p className="text-xs text-[#6B7280]">Independent & Home-based Artisans</p>
                </div>
              </div>

              <ul className="space-y-4">
                {dressmakerBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#1F2937]">
                    <div className="w-5 h-5 rounded-full bg-purple-100 text-[#6C4AB6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/60">
              <span className="text-xs font-bold text-[#2A9D8F]">Turn your sewing talent into a booming business →</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
