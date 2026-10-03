"use client";

import { useState } from "react";
import {
  getSuggestedPricing,
  validateCategory,
  PricingAssistantResponse,
  CategoryValidationResponse,
} from "@/lib/api";

export default function AIFeaturesSection() {
  // Live AI Pricing Assistant state
  const [pricingCategory, setPricingCategory] = useState("Frock");
  const [quantity, setQuantity] = useState<number>(50);
  const [deadlineDays, setDeadlineDays] = useState<number>(7);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingResult, setPricingResult] = useState<PricingAssistantResponse | null>(null);
  const [pricingError, setPricingError] = useState<string | null>(null);

  // Live AI Category Validation state
  const [orderTitle, setOrderTitle] = useState("Cotton Office Trouser Batch");
  const [selectedCat, setSelectedCat] = useState("Frock");
  const [validationLoading, setValidationLoading] = useState(false);
  const [validationResult, setValidationResult] = useState<CategoryValidationResponse | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCalculatePricing = async () => {
    setPricingLoading(true);
    setPricingError(null);
    try {
      const res = await getSuggestedPricing({
        category: pricingCategory,
        quantity: Number(quantity),
        deadline_days: Number(deadlineDays),
      });
      setPricingResult(res);
    } catch (err: any) {
      setPricingError("Unable to connect to backend API. Please ensure FastAPI is running on port 8000.");
    } finally {
      setPricingLoading(false);
    }
  };

  const handleValidateCategory = async () => {
    setValidationLoading(true);
    setValidationError(null);
    try {
      const res = await validateCategory({
        title: orderTitle,
        selected_category: selectedCat,
      });
      setValidationResult(res);
    } catch (err: any) {
      setValidationError("Unable to connect to backend API. Please ensure FastAPI is running on port 8000.");
    } finally {
      setValidationLoading(false);
    }
  };

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

        {/* --- LIVE AI TESTBENCH WIDGET --- */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-lg relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-5">
            <div>
              <span className="text-xs font-bold text-[#6C4AB6] bg-[#EDE7F6] px-3 py-1 rounded-full uppercase tracking-wider">
                Live AI API Testbench
              </span>
              <h3 className="text-xl font-bold text-[#1F2937] mt-2">
                Try the StitchLink AI Engine Live
              </h3>
            </div>
            <p className="text-xs text-[#6B7280] max-w-sm">
              Test real API requests sent directly to the FastAPI backend running at <code className="text-[#6C4AB6] bg-purple-50 px-1 py-0.5 rounded">http://localhost:8000</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 1. Live AI Pricing Assistant */}
            <div className="bg-[#FAF9FC] p-5 rounded-2xl border border-purple-50 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#6C4AB6] text-white flex items-center justify-center font-bold text-sm">
                  LKR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1F2937]">AI Price Range Estimator</h4>
                  <p className="text-xs text-[#6B7280]">Calculates market pricing based on batch volume & deadline</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] block mb-1">Category</label>
                  <select
                    value={pricingCategory}
                    onChange={(e) => setPricingCategory(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-[#6C4AB6]"
                  >
                    <option value="Frock">Frock</option>
                    <option value="Saree">Saree</option>
                    <option value="Uniform">Uniform</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] block mb-1">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-[#6C4AB6]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] block mb-1">Deadline (Days)</label>
                  <input
                    type="number"
                    value={deadlineDays}
                    onChange={(e) => setDeadlineDays(Number(e.target.value))}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-[#6C4AB6]"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculatePricing}
                disabled={pricingLoading}
                className="w-full py-2.5 bg-[#6C4AB6] hover:bg-[#5b3da0] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {pricingLoading ? "Calculating..." : "Calculate Price with AI"}
              </button>

              {pricingError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
                  {pricingError}
                </div>
              )}

              {pricingResult && (
                <div className="p-4 bg-white rounded-xl border border-purple-100 space-y-1 shadow-xs">
                  <div className="text-[11px] font-bold text-[#6B7280] uppercase">Suggested Price per Unit</div>
                  <div className="text-lg font-extrabold text-[#2A9D8F]">
                    LKR {pricingResult.suggested_price_min_lkr.toLocaleString()} - {pricingResult.suggested_price_max_lkr.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#6B7280]">{pricingResult.explanation}</p>
                </div>
              )}
            </div>

            {/* 2. Live Category Validation */}
            <div className="bg-[#FAF9FC] p-5 rounded-2xl border border-purple-50 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2A9D8F] text-white flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1F2937]">AI Category Validation Engine</h4>
                  <p className="text-xs text-[#6B7280]">Detects garment title vs category mismatch</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] block mb-1">Order Title</label>
                  <input
                    type="text"
                    value={orderTitle}
                    onChange={(e) => setOrderTitle(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-[#2A9D8F]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] block mb-1">Selected Category</label>
                  <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="w-full text-xs bg-white border border-gray-200 rounded-lg p-2 font-medium focus:ring-2 focus:ring-[#2A9D8F]"
                  >
                    <option value="Frock">Frock</option>
                    <option value="Trouser">Trouser</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Saree">Saree</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleValidateCategory}
                disabled={validationLoading}
                className="w-full py-2.5 bg-[#2A9D8F] hover:bg-[#238377] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {validationLoading ? "Validating..." : "Validate Category with AI"}
              </button>

              {validationError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
                  {validationError}
                </div>
              )}

              {validationResult && (
                <div
                  className={`p-4 rounded-xl border text-xs space-y-1 shadow-xs ${
                    validationResult.mismatch_detected
                      ? "bg-amber-50 border-amber-200 text-amber-900"
                      : "bg-emerald-50 border-emerald-200 text-emerald-900"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>{validationResult.mismatch_detected ? "⚠️ Mismatch Detected" : "✅ Validation Passed"}</span>
                    <span className="text-[10px] opacity-75">Confidence: {Math.round(validationResult.confidence_score * 100)}%</span>
                  </div>
                  <p>{validationResult.warning_message}</p>
                </div>
              )}
            </div>

          </div>
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
