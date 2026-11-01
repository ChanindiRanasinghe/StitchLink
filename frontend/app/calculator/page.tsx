"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface GarmentPreset {
  id: string;
  name: string;
  icon: string;
  baseLaborLkr: number;
  fabricMetersPerPiece: number;
  typicalFabric: string;
  fabricCostPerMeter: number;
  trimsCostPerPiece: number;
  stitchingHoursPerPiece: number;
  complexity: "Standard" | "Moderate" | "Intricate";
}

const GARMENT_PRESETS: GarmentPreset[] = [
  {
    id: "frock",
    name: "Linen Summer Frock",
    icon: "👗",
    baseLaborLkr: 650,
    fabricMetersPerPiece: 2.4,
    typicalFabric: "100% Pure Washed Linen",
    fabricCostPerMeter: 950,
    trimsCostPerPiece: 120,
    stitchingHoursPerPiece: 2.2,
    complexity: "Moderate",
  },
  {
    id: "shirt",
    name: "Formal Men's / Women's Shirt",
    icon: "👔",
    baseLaborLkr: 480,
    fabricMetersPerPiece: 1.8,
    typicalFabric: "Cotton Oxford / Poplin",
    fabricCostPerMeter: 680,
    trimsCostPerPiece: 90,
    stitchingHoursPerPiece: 1.8,
    complexity: "Moderate",
  },
  {
    id: "uniform",
    name: "School / Work Uniform",
    icon: "🏫",
    baseLaborLkr: 380,
    fabricMetersPerPiece: 2.0,
    typicalFabric: "Poly-Cotton Drill",
    fabricCostPerMeter: 480,
    trimsCostPerPiece: 60,
    stitchingHoursPerPiece: 1.4,
    complexity: "Standard",
  },
  {
    id: "blouse",
    name: "Boutique Cotton Blouse",
    icon: "👚",
    baseLaborLkr: 520,
    fabricMetersPerPiece: 1.5,
    typicalFabric: "Cotton Cambric / Voile",
    fabricCostPerMeter: 620,
    trimsCostPerPiece: 80,
    stitchingHoursPerPiece: 1.6,
    complexity: "Standard",
  },
  {
    id: "trouser",
    name: "Chino / Linen Trouser",
    icon: "👖",
    baseLaborLkr: 600,
    fabricMetersPerPiece: 1.6,
    typicalFabric: "Linen Cotton Blend",
    fabricCostPerMeter: 780,
    trimsCostPerPiece: 110,
    stitchingHoursPerPiece: 2.0,
    complexity: "Moderate",
  },
  {
    id: "batik",
    name: "Traditional Batik / Saree",
    icon: "🥻",
    baseLaborLkr: 950,
    fabricMetersPerPiece: 5.5,
    typicalFabric: "Handmade Sri Lankan Batik Silk",
    fabricCostPerMeter: 1400,
    trimsCostPerPiece: 180,
    stitchingHoursPerPiece: 3.5,
    complexity: "Intricate",
  },
];

const FABRIC_OPTIONS = [
  { name: "Pure Washed Linen", pricePerMeter: 950 },
  { name: "Cotton Poplin / Oxford", pricePerMeter: 680 },
  { name: "Viscose Rayon", pricePerMeter: 580 },
  { name: "Poly-Cotton Blend", pricePerMeter: 480 },
  { name: "Raw Mulberry Silk", pricePerMeter: 1650 },
  { name: "Handloom Cotton", pricePerMeter: 820 },
];

export default function CalculatorPage() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("frock");
  const [quantity, setQuantity] = useState<number>(50);
  const [turnaroundDays, setTurnaroundDays] = useState<number>(10);
  const [fabricSourcedBy, setFabricSourcedBy] = useState<"SHOP" | "TAILOR">("SHOP");
  const [selectedFabricName, setSelectedFabricName] = useState<string>("Pure Washed Linen");
  const [customFabricPrice, setCustomFabricPrice] = useState<number>(950);

  // Optional Finishes
  const [hasLining, setHasLining] = useState(false);
  const [hasPockets, setHasPockets] = useState(true);
  const [hasFrenchSeams, setHasFrenchSeams] = useState(false);
  const [hasEmbroidery, setHasEmbroidery] = useState(false);

  const currentPreset = useMemo(
    () => GARMENT_PRESETS.find((p) => p.id === selectedPresetId) || GARMENT_PRESETS[0],
    [selectedPresetId]
  );

  // Calculations
  const calculations = useMemo(() => {
    // 1. Labor adjustment
    let laborPerPiece = currentPreset.baseLaborLkr;

    if (hasLining) laborPerPiece += 120;
    if (hasPockets) laborPerPiece += 50;
    if (hasFrenchSeams) laborPerPiece += 80;
    if (hasEmbroidery) laborPerPiece += 180;

    // Quantity volume scale discount (up to 15% discount for 200+ pieces)
    const volumeDiscountMultiplier = Math.max(0.85, 1 - (quantity / 500) * 0.15);
    laborPerPiece = Math.round(laborPerPiece * volumeDiscountMultiplier);

    // Rush fee if under 7 days
    let rushMultiplier = 1.0;
    if (turnaroundDays < 5) rushMultiplier = 1.25;
    else if (turnaroundDays < 8) rushMultiplier = 1.12;

    laborPerPiece = Math.round(laborPerPiece * rushMultiplier);

    // 2. Fabric requirements
    const cuttingWastageRate = 1.05; // 5% pattern cutting wastage
    const totalFabricMeters = Math.round(quantity * currentPreset.fabricMetersPerPiece * cuttingWastageRate * 10) / 10;
    const fabricCostPerPiece = fabricSourcedBy === "TAILOR" ? Math.round(currentPreset.fabricMetersPerPiece * customFabricPrice) : 0;
    const totalFabricCost = fabricSourcedBy === "TAILOR" ? Math.round(totalFabricMeters * customFabricPrice) : 0;

    // 3. Trims and Notions
    const trimsCostPerPiece = currentPreset.trimsCostPerPiece + (hasLining ? 40 : 0);
    const totalTrimsCost = trimsCostPerPiece * quantity;

    // 4. Totals
    const totalLaborCost = laborPerPiece * quantity;
    const totalOrderCost = totalLaborCost + totalFabricCost + totalTrimsCost;
    const costPerPieceTotal = Math.round(totalOrderCost / quantity);

    // Total machine hours needed
    const totalMachineHours = Math.round(quantity * currentPreset.stitchingHoursPerPiece);

    return {
      laborPerPiece,
      totalLaborCost,
      totalFabricMeters,
      fabricCostPerPiece,
      totalFabricCost,
      trimsCostPerPiece,
      totalTrimsCost,
      totalOrderCost,
      costPerPieceTotal,
      totalMachineHours,
      rushMultiplier,
      volumeDiscountPct: Math.round((1 - volumeDiscountMultiplier) * 100),
    };
  }, [
    currentPreset,
    quantity,
    turnaroundDays,
    fabricSourcedBy,
    customFabricPrice,
    hasLining,
    hasPockets,
    hasFrenchSeams,
    hasEmbroidery,
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 glass-header border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C4AB6] to-[#2A9D8F] flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                SL
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                StitchLink <span className="text-[#6C4AB6] font-semibold text-xs ml-1">AI Costing Calculator</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/explore"
              className="text-xs font-semibold text-slate-600 hover:text-[#6C4AB6] px-3 py-1.5 rounded-lg transition-colors"
            >
              🗺️ Map Explore
            </Link>
            <Link
              href="/dressmaker/browse"
              className="text-xs font-semibold text-slate-600 hover:text-[#6C4AB6] px-3 py-1.5 rounded-lg transition-colors"
            >
              Contract Feed
            </Link>
            <Link
              href={`/shop/new-order?budget=${calculations.totalOrderCost}&quantity=${quantity}`}
              className="bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
            >
              Post with this Budget →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Title & Description */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ai-badge text-xs font-bold uppercase tracking-wider mb-2">
              <span>🧮</span> Sri Lanka Market Rate Estimator
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Quotation & Fabric Cost Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Calculate realistic fabric meterage, trims, and competitive stitching labor rates in LKR benchmarked against verified Sri Lankan solo dressmakers.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6C4AB6] flex items-center justify-center font-bold text-lg">
              SL
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Benchmark Standard</span>
              <span className="text-xs font-extrabold text-slate-800">Sri Lanka Garment Market 2026</span>
            </div>
          </div>
        </div>

        {/* Layout Grid: Controls Left, Breakdown Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Garment Category */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6C4AB6] uppercase tracking-wider">
                  Step 1 • Garment Style
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  Select clothing category
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GARMENT_PRESETS.map((preset) => {
                  const isSelected = preset.id === selectedPresetId;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-[#6C4AB6] bg-purple-50/70 shadow-sm ring-2 ring-[#6C4AB6]/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <span className="text-2xl block mb-2">{preset.icon}</span>
                      <div>
                        <span className="text-xs font-extrabold text-slate-900 block leading-tight">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
                          Base ~Rs {preset.baseLaborLkr}/pc
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Batch Volume & Urgency Sliders */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6C4AB6] uppercase tracking-wider">
                  Step 2 • Volume & Timeline
                </span>
                {calculations.volumeDiscountPct > 0 && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {calculations.volumeDiscountPct}% Volume Discount Applied
                  </span>
                )}
              </div>

              {/* Quantity Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Batch Size (Garments)
                  </label>
                  <span className="text-sm font-extrabold text-[#6C4AB6] bg-purple-50 px-3 py-1 rounded-lg border border-purple-100">
                    {quantity} pieces
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-[#6C4AB6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                  <span>10 pcs (Sampling)</span>
                  <span>100 pcs (Boutique)</span>
                  <span>250 pcs (Brand Run)</span>
                  <span>500 pcs (Volume Batch)</span>
                </div>
              </div>

              {/* Turnaround Days Slider */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Required Turnaround Time
                  </label>
                  <span
                    className={`text-sm font-extrabold px-3 py-1 rounded-lg border ${
                      turnaroundDays < 6
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {turnaroundDays} Calendar Days
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={turnaroundDays}
                  onChange={(e) => setTurnaroundDays(Number(e.target.value))}
                  className="w-full accent-[#6C4AB6] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                  <span className="text-amber-600 font-bold">3 Days (Urgent Rush)</span>
                  <span>10 Days (Standard)</span>
                  <span>20 Days (Comfortable)</span>
                  <span>30 Days (Flexible)</span>
                </div>
              </div>
            </div>

            {/* Step 3: Fabric & Trims Logistics */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <span className="text-xs font-bold text-[#6C4AB6] uppercase tracking-wider block">
                Step 3 • Fabric Supply Model
              </span>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFabricSourcedBy("SHOP")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    fabricSourcedBy === "SHOP"
                      ? "border-[#2A9D8F] bg-teal-50/70 shadow-xs ring-2 ring-[#2A9D8F]/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-xl block mb-1">🏪</span>
                  <span className="text-xs font-bold text-slate-900 block">Shop Supplies Fabric</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    You provide fabric rolls; tailor quotes labor & trims only.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFabricSourcedBy("TAILOR")}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    fabricSourcedBy === "TAILOR"
                      ? "border-[#2A9D8F] bg-teal-50/70 shadow-xs ring-2 ring-[#2A9D8F]/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-xl block mb-1">🧶</span>
                  <span className="text-xs font-bold text-slate-900 block">Dressmaker Sources Fabric</span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Tailor procures fabric locally and includes it in quote.
                  </span>
                </button>
              </div>

              {fabricSourcedBy === "TAILOR" && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Select Fabric Type
                      </label>
                      <select
                        value={selectedFabricName}
                        onChange={(e) => {
                          const f = FABRIC_OPTIONS.find((opt) => opt.name === e.target.value);
                          setSelectedFabricName(e.target.value);
                          if (f) setCustomFabricPrice(f.pricePerMeter);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                      >
                        {FABRIC_OPTIONS.map((f) => (
                          <option key={f.name} value={f.name}>
                            {f.name} (Rs {f.pricePerMeter}/m)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Estimated Price (LKR / meter)
                      </label>
                      <input
                        type="number"
                        min="100"
                        max="5000"
                        step="50"
                        value={customFabricPrice}
                        onChange={(e) => setCustomFabricPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Finishing Add-ons */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold text-[#6C4AB6] uppercase tracking-wider block">
                Step 4 • Finishing Specifications
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setHasPockets(!hasPockets)}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                    hasPockets
                      ? "border-[#6C4AB6] bg-purple-50 text-[#6C4AB6]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-base mb-0.5">📦</span>
                  In-seam Pockets
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">+Rs 50</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasLining(!hasLining)}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                    hasLining
                      ? "border-[#6C4AB6] bg-purple-50 text-[#6C4AB6]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-base mb-0.5">🪡</span>
                  Full Inner Lining
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">+Rs 120</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasFrenchSeams(!hasFrenchSeams)}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                    hasFrenchSeams
                      ? "border-[#6C4AB6] bg-purple-50 text-[#6C4AB6]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-base mb-0.5">✨</span>
                  French Seams
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">+Rs 80</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHasEmbroidery(!hasEmbroidery)}
                  className={`p-3 rounded-xl border text-center transition-all text-xs font-bold ${
                    hasEmbroidery
                      ? "border-[#6C4AB6] bg-purple-50 text-[#6C4AB6]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <span className="block text-base mb-0.5">🌺</span>
                  Embroidery Work
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">+Rs 180</span>
                </button>
              </div>
            </div>

          </div>

          {/* Quotation Summary Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-7 space-y-6 sticky top-24">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Estimated Order Value
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-1">
                    Rs {calculations.totalOrderCost.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#2A9D8F] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 block mb-1">
                    Per Piece
                  </span>
                  <span className="text-lg font-extrabold text-[#2A9D8F]">
                    Rs {calculations.costPerPieceTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Order Scope Snapshot */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Garment Style:</span>
                  <span className="text-slate-900 font-bold">{currentPreset.name}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Batch Quantity:</span>
                  <span className="text-slate-900 font-bold">{quantity} garments</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Fabric Required:</span>
                  <span className="text-slate-900 font-bold">~{calculations.totalFabricMeters} meters</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-600">
                  <span>Machine Hours:</span>
                  <span className="text-slate-900 font-bold">~{calculations.totalMachineHours} stitching hrs</span>
                </div>
              </div>

              {/* Cost Itemization Breakdown */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Detailed Itemization (LKR)
                </span>

                {/* 1. Labor */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6C4AB6]"></span>
                    <span className="font-semibold text-slate-700">Stitching Labor</span>
                    <span className="text-[10px] text-slate-400">(@ Rs {calculations.laborPerPiece}/pc)</span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    Rs {calculations.totalLaborCost.toLocaleString()}
                  </span>
                </div>

                {/* 2. Fabric */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2A9D8F]"></span>
                    <span className="font-semibold text-slate-700">Fabric Sourcing</span>
                    <span className="text-[10px] text-slate-400">
                      ({fabricSourcedBy === "TAILOR" ? `${calculations.totalFabricMeters}m` : "Provided by Shop"})
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    {fabricSourcedBy === "TAILOR" ? `Rs ${calculations.totalFabricCost.toLocaleString()}` : "Rs 0 (Shop Supplies)"}
                  </span>
                </div>

                {/* 3. Trims & Notions */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span className="font-semibold text-slate-700">Trims, Thread & Packing</span>
                    <span className="text-[10px] text-slate-400">(@ Rs {calculations.trimsCostPerPiece}/pc)</span>
                  </div>
                  <span className="font-extrabold text-slate-900">
                    Rs {calculations.totalTrimsCost.toLocaleString()}
                  </span>
                </div>

                {/* Proportional Visual Bar */}
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 mt-2">
                  <div
                    style={{
                      width: `${(calculations.totalLaborCost / calculations.totalOrderCost) * 100}%`,
                    }}
                    className="bg-[#6C4AB6] h-full"
                    title="Labor"
                  />
                  {calculations.totalFabricCost > 0 && (
                    <div
                      style={{
                        width: `${(calculations.totalFabricCost / calculations.totalOrderCost) * 100}%`,
                      }}
                      className="bg-[#2A9D8F] h-full"
                      title="Fabric"
                    />
                  )}
                  <div
                    style={{
                      width: `${(calculations.totalTrimsCost / calculations.totalOrderCost) * 100}%`,
                    }}
                    className="bg-amber-400 h-full"
                    title="Trims"
                  />
                </div>
              </div>

              {/* AI Capacity & Feasibility Alert */}
              <div
                className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                  turnaroundDays < 6
                    ? "bg-amber-50/70 border-amber-200 text-amber-800"
                    : "bg-purple-50/70 border-purple-200 text-[#6C4AB6]"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <span>{turnaroundDays < 6 ? "⚠️" : "💡"}</span>
                  <span>AI Production Feasibility Check</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {turnaroundDays < 6
                    ? `Short timeline of ${turnaroundDays} days detected. A 25% overtime incentive has been included to attract top-rated dressmakers.`
                    : `Optimal timeline! For ${quantity} pieces (${calculations.totalMachineHours} hours), 1 to 2 solo dressmakers can fulfill this comfortably without overtime.`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <Link
                  href={`/shop/new-order?title=${encodeURIComponent(currentPreset.name)}&quantity=${quantity}&budget=${calculations.totalOrderCost}`}
                  className="w-full py-3.5 rounded-xl bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Create Order with this Budget (Rs {calculations.totalOrderCost.toLocaleString()})
                </Link>

                <Link
                  href="/explore"
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-[#2A9D8F] text-slate-700 hover:text-[#2A9D8F] font-bold text-xs text-center transition-all block"
                >
                  🗺️ Find Nearby Tailors for this Batch
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
