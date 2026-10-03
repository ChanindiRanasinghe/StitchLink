"use client";

export default function AIFeaturesSection() {
  const aiFeatures = [
    {
      title: "Smart Dressmaker Matching",
      description: "Algorithms score and pair garment orders with nearby dressmakers based on sewing machine capability, fabric expertise, and workload.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      badge: "Match Accuracy",
    },
    {
      title: "AI Quotation & Pricing Assistant",
      description: "Generates recommended price ranges (LKR) considering batch size, garment complexity, required deadline, and market rates.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m0-6c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      badge: "Smart Pricing",
    },
    {
      title: "Category Relevance & Image AI",
      description: "Automatically scans order images and descriptions to flag category mismatches (e.g. Frock vs. Trouser) before quotation.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      badge: "Vision AI",
    },
    {
      title: "Capacity & Delay Prediction",
      description: "Predicts home dressmaker weekly machine output and alerts shops if a dressmaker is approaching burnout or delay risks.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      badge: "Predictive AI",
    },
    {
      title: "Production Risk Early Warnings",
      description: "Continuous monitoring flags orders with high delay likelihood, recommending split orders or timeline adjustments.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      badge: "Risk Prevention",
    },
    {
      title: "Demand & Trend Forecasting",
      description: "Provides clothing shops and dressmakers with seasonal demand forecasts for Sri Lankan festive seasons (Avurudu, Wedding Season).",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      badge: "Demand Insights",
    },
  ];

  return (
    <section id="ai-features" className="py-20 bg-gradient-to-b from-[#F9FAFB] via-[#EDE7F6]/30 to-[#F9FAFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ai-badge text-xs font-bold uppercase tracking-wider">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Intelligent B2B Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            AI-Powered Features for Smarter Garment Sourcing
          </h2>
          <p className="text-base text-[#6B7280]">
            StitchLink combines machine learning and vision AI to assist both shops and dressmakers at every step of the order lifecycle.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {aiFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 ai-card-glow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#EDE7F6] text-[#6C4AB6] flex items-center justify-center">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#6C4AB6] bg-[#EDE7F6]/80 px-3 py-1 rounded-full border border-[#6C4AB6]/20">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1F2937]">{feat.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{feat.description}</p>
              </div>

              <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#2A9D8F]">
                <span>AI Assistant Advisory</span>
                <span className="flex items-center gap-1">
                  Learn more
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Disclaimer Callout */}
        <div className="mt-12 bg-white rounded-xl p-4 border border-purple-100 flex items-center gap-3 text-xs text-[#6B7280] max-w-2xl mx-auto shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-[#6C4AB6]/10 text-[#6C4AB6] flex items-center justify-center flex-shrink-0 font-bold">
            i
          </div>
          <p>
            <strong className="text-[#1F2937]">Human-in-the-loop design:</strong> All AI outputs (pricing ranges, category detection, and risk alerts) serve as intelligent decision support tools. Users retain full control to override recommendations.
          </p>
        </div>

      </div>
    </section>
  );
}
