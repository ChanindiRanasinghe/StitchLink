"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchDressmakers, Dressmaker } from "@/lib/api";

const SRI_LANKA_HUBS = [
  { id: "Colombo", name: "Colombo", count: 42, lat: 6.9271, lng: 79.8612, x: 28, y: 68 },
  { id: "Gampaha", name: "Gampaha", count: 28, lat: 7.0917, lng: 79.9999, x: 30, y: 62 },
  { id: "Kalutara", name: "Kalutara", count: 19, lat: 6.5854, lng: 79.9607, x: 30, y: 75 },
  { id: "Kandy", name: "Kandy", count: 35, lat: 7.2906, lng: 80.6337, x: 48, y: 55 },
  { id: "Galle", name: "Galle", count: 24, lat: 6.0535, lng: 80.2210, x: 36, y: 88 },
  { id: "Kurunegala", name: "Kurunegala", count: 22, lat: 7.4863, lng: 80.3623, x: 42, y: 48 },
  { id: "Matara", name: "Matara", count: 18, lat: 5.9549, lng: 80.5550, x: 44, y: 92 },
  { id: "Jaffna", name: "Jaffna", count: 15, lat: 9.6615, lng: 80.0255, x: 34, y: 12 },
];

const GARMENT_CATEGORIES = [
  "All Categories",
  "Frocks & Dresses",
  "Shirts & Tops",
  "School Uniforms",
  "Batik & Sarees",
  "Trousers & Pants",
];

const MACHINERY_FILTERS = [
  "All Machinery",
  "Juki Lockstitch",
  "4-Thread Overlock",
  "Buttonhole Industrial",
  "Embroidery Machine",
];

const FALLBACK_DRESSMAKERS: (Dressmaker & { machinery: string; pricePerPiece: number; avatar: string })[] = [
  {
    id: 101,
    name: "Menike Ranasinghe",
    district: "Colombo",
    distance_km: 3.2,
    skills: ["Linen Finishing", "French Seams", "Pattern Matching"],
    categories: ["Frock", "Blouse"],
    rating: 4.95,
    completed_orders: 58,
    verified: true,
    ai_match_score: 98,
    machinery: "Juki DDL-8700 & Pegasus Overlock",
    pricePerPiece: 550,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 102,
    name: "Kanthi & Sunil Tailors",
    district: "Colombo",
    distance_km: 5.8,
    skills: ["Collared Shirts", "Interlining Press", "High-speed Assembly"],
    categories: ["Shirt", "Uniform"],
    rating: 4.88,
    completed_orders: 84,
    verified: true,
    ai_match_score: 95,
    machinery: "Siruba Industrial 5-Thread & Buttonhole",
    pricePerPiece: 420,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 103,
    name: "Fathima Rizwana",
    district: "Galle",
    distance_km: 4.1,
    skills: ["Resort Frocks", "Batik Stitching", "Silk Blouses"],
    categories: ["Frock", "Batik Wear"],
    rating: 4.92,
    completed_orders: 41,
    verified: true,
    ai_match_score: 94,
    machinery: "Brother Lockstitch & Hemmer",
    pricePerPiece: 600,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 104,
    name: "Priyantha Kumara",
    district: "Kandy",
    distance_km: 8.5,
    skills: ["Pants & Trousers", "Piping", "Heavy Cotton"],
    categories: ["Trouser", "Uniform"],
    rating: 4.82,
    completed_orders: 67,
    verified: true,
    ai_match_score: 91,
    machinery: "Jack A4 Lockstitch & Overlock",
    pricePerPiece: 480,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 105,
    name: "Chithra Weerasinghe",
    district: "Gampaha",
    distance_km: 6.3,
    skills: ["Children's Wear", "Baby Frocks", "Fine Shirring"],
    categories: ["Frock", "Children's Wear"],
    rating: 4.9,
    completed_orders: 39,
    verified: true,
    ai_match_score: 93,
    machinery: "Juki HZL Industrial",
    pricePerPiece: 390,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
  },
];

export default function MapDiscoveryPage() {
  const [selectedHub, setSelectedHub] = useState("Colombo");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedMachine, setSelectedMachine] = useState("All Machinery");
  const [radius, setRadius] = useState(25);
  const [dressmakers, setDressmakers] = useState<any[]>(FALLBACK_DRESSMAKERS);
  const [selectedDm, setSelectedDm] = useState<any>(FALLBACK_DRESSMAKERS[0]);
  const [loading, setLoading] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteBatchSize, setQuoteBatchSize] = useState(50);
  const [quoteNotes, setQuoteNotes] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetchDressmakers(selectedHub);
        if (res && res.data && res.data.length > 0) {
          // Merge rich UI properties
          const merged = res.data.map((item, idx) => ({
            ...item,
            machinery: FALLBACK_DRESSMAKERS[idx % FALLBACK_DRESSMAKERS.length].machinery,
            pricePerPiece: FALLBACK_DRESSMAKERS[idx % FALLBACK_DRESSMAKERS.length].pricePerPiece,
            avatar: FALLBACK_DRESSMAKERS[idx % FALLBACK_DRESSMAKERS.length].avatar,
          }));
          setDressmakers(merged);
          setSelectedDm(merged[0]);
        } else {
          // Filter fallback by district
          const filtered = FALLBACK_DRESSMAKERS.filter(
            (d) => d.district.toLowerCase() === selectedHub.toLowerCase()
          );
          setDressmakers(filtered.length > 0 ? filtered : FALLBACK_DRESSMAKERS);
          setSelectedDm(filtered[0] || FALLBACK_DRESSMAKERS[0]);
        }
      } catch {
        const filtered = FALLBACK_DRESSMAKERS.filter(
          (d) => d.district.toLowerCase() === selectedHub.toLowerCase()
        );
        setDressmakers(filtered.length > 0 ? filtered : FALLBACK_DRESSMAKERS);
        setSelectedDm(filtered[0] || FALLBACK_DRESSMAKERS[0]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedHub]);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSent(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteSent(false);
      setQuoteNotes("");
    }, 2000);
  };

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
                StitchLink <span className="text-[#2A9D8F] font-semibold text-xs ml-1">Map Explore</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="text-xs font-semibold text-slate-600 hover:text-[#6C4AB6] px-3 py-1.5 rounded-lg transition-colors"
            >
              Shop Workspace
            </Link>
            <Link
              href="/dressmaker/browse"
              className="text-xs font-semibold text-slate-600 hover:text-[#6C4AB6] px-3 py-1.5 rounded-lg transition-colors"
            >
              Order Feed
            </Link>
            <Link
              href="/shop/new-order"
              className="bg-[#2A9D8F] hover:bg-[#228479] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
            >
              + Post Batch Order
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Title & Intro */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full ai-badge text-xs font-bold uppercase tracking-wider mb-2">
              <span>📍</span> Sri Lanka Garment Clusters
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Dressmaker Discovery Map
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Locate verified home-based and solo dressmakers near your boutique in Sri Lanka to cut transport lead times, verify machine setups, and inspect sample finishes.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-700">
              1,240+ Verified Tailors Across 25 Districts
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Hub Selector */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                District / Hub
              </label>
              <select
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]/20 focus:border-[#6C4AB6]"
              >
                {SRI_LANKA_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    📍 {hub.name} ({hub.count} Dressmakers)
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Garment Specialization
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]/20 focus:border-[#6C4AB6]"
              >
                {GARMENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Machinery Filter */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Machine Capability
              </label>
              <select
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]/20 focus:border-[#6C4AB6]"
              >
                {MACHINERY_FILTERS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Radius Slider */}
            <div className="w-full sm:w-auto flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 self-end">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Radius</span>
                <span className="text-xs font-extrabold text-[#6C4AB6]">{radius} km</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-24 accent-[#6C4AB6] cursor-pointer"
              />
            </div>
          </div>

          {/* Quick Hub Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">Popular:</span>
            {SRI_LANKA_HUBS.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedHub === hub.id
                    ? "bg-[#6C4AB6] text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {hub.name} ({hub.count})
              </button>
            ))}
          </div>
        </div>

        {/* Map Canvas + Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Map Visual */}
          <div className="lg:col-span-8 bg-slate-950 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden min-h-[540px] flex flex-col justify-between p-6">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6C4AB6_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none"></div>

            {/* Top Map Status Overlay */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="text-xs font-bold text-white">
                  Active Cluster: <span className="text-[#2A9D8F]">{selectedHub}</span>
                </span>
                <span className="text-[11px] text-slate-400">({dressmakers.length} nearby tailors)</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                Showing {selectedCategory} • Max {radius} km
              </span>
            </div>

            {/* Simulated Geographic Canvas with Sri Lanka Hub Nodes */}
            <div className="relative z-10 w-full flex-1 my-6 flex items-center justify-center min-h-[360px]">
              {/* Island Contour Silhouette */}
              <div className="w-[280px] h-[340px] border-2 border-dashed border-teal-500/20 rounded-[50%_50%_45%_55%/60%_60%_40%_40%] relative bg-gradient-to-b from-teal-500/5 via-purple-500/5 to-transparent flex items-center justify-center">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400/30 select-none">
                  Sri Lanka Island Garment Map
                </div>
              </div>

              {/* District Hub Hotspots */}
              {SRI_LANKA_HUBS.map((hub) => (
                <div
                  key={hub.id}
                  style={{ top: `${hub.y}%`, left: `${hub.x}%` }}
                  onClick={() => setSelectedHub(hub.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all ${
                    selectedHub === hub.id ? "z-30 scale-110" : "z-20 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border transition-all ${
                      selectedHub === hub.id
                        ? "bg-[#6C4AB6] text-white border-white ring-4 ring-[#6C4AB6]/30 font-extrabold text-xs"
                        : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500 text-[11px] font-semibold"
                    }`}
                  >
                    <span>📍</span>
                    <span>{hub.name}</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-white/20 font-bold">
                      {hub.count}
                    </span>
                  </div>
                </div>
              ))}

              {/* Individual Tailor Pins within Current Hub */}
              {dressmakers.map((dm, idx) => {
                const offsets = [
                  { top: "62%", left: "34%" },
                  { top: "68%", left: "26%" },
                  { top: "72%", left: "38%" },
                  { top: "58%", left: "42%" },
                  { top: "64%", left: "22%" },
                ];
                const pos = offsets[idx % offsets.length];
                const isSelected = selectedDm?.id === dm.id;

                return (
                  <div
                    key={dm.id}
                    style={{ top: pos.top, left: pos.left }}
                    onClick={() => setSelectedDm(dm)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all z-25 ${
                      isSelected ? "scale-125 z-40" : "hover:scale-110"
                    }`}
                  >
                    <div
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xl flex items-center gap-1.5 border transition-all ${
                        isSelected
                          ? "bg-[#2A9D8F] text-white border-white ring-2 ring-teal-400"
                          : "bg-white text-slate-900 border-slate-200 hover:border-teal-500"
                      }`}
                    >
                      <span>🪡</span>
                      <span>{dm.name.split(" ")[0]}</span>
                      <span className="bg-[#6C4AB6] text-white px-1.5 py-0.2 rounded text-[9px] font-extrabold">
                        {dm.ai_match_score}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Floating Legend */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6C4AB6]"></span> Hub Center
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F]"></span> Tailor Hotspot
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Verified Solo
                </span>
              </div>
              <span className="font-semibold text-slate-300">
                Click any pin to inspect tailor credentials
              </span>
            </div>
          </div>

          {/* Selected Dressmaker Full Profile Panel */}
          <div className="lg:col-span-4 space-y-4">
            {selectedDm ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5 animate-in fade-in duration-200">
                {/* Header with Avatar & Verified Badge */}
                <div className="flex items-start gap-4">
                  <img
                    src={selectedDm.avatar}
                    alt={selectedDm.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#6C4AB6] shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-extrabold text-base text-slate-900 truncate">
                        {selectedDm.name}
                      </h3>
                      {selectedDm.verified && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          VERIFIED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      📍 {selectedDm.district} • {selectedDm.distance_km} km away
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="font-bold text-amber-500">★ {selectedDm.rating}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-600">
                        {selectedDm.completed_orders} Batches Finished
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Match Spotlight Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#EDE7F6]/80 to-[#E6F4F1]/60 border border-purple-200/60 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#6C4AB6]">
                    <span>AI Proximity & Suitability</span>
                    <span className="text-[#2A9D8F] bg-white px-2 py-0.5 rounded-full shadow-xs">
                      {selectedDm.ai_match_score}% Match
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Optimized for rapid turnaround, fabric familiarity, and direct workshop pickup.
                  </p>
                </div>

                {/* Machine Setup Specs */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Machinery & Equipment
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                    <span className="text-base">⚙️</span>
                    <span>{selectedDm.machinery}</span>
                  </div>
                </div>

                {/* Garment Categories & Skills */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Specializations & Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDm.categories?.map((cat: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200"
                      >
                        {cat}
                      </span>
                    ))}
                    {selectedDm.skills?.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-[#6C4AB6] border border-purple-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price Benchmark */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard Labor Rate</span>
                    <span className="font-extrabold text-slate-900 text-sm">
                      Rs {selectedDm.pricePerPiece} <span className="text-[11px] font-normal text-slate-500">/ piece</span>
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                    Direct Factory Pricing
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full py-3 rounded-xl bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>💬</span> Request Direct Quote from {selectedDm.name.split(" ")[0]}
                  </button>
                  <Link
                    href={`/shop/new-order?preferred_dressmaker=${selectedDm.id}`}
                    className="w-full block text-center py-2.5 rounded-xl border border-slate-200 hover:border-[#2A9D8F] text-slate-700 hover:text-[#2A9D8F] font-bold text-xs transition-all"
                  >
                    Assign to New Batch Order →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
                <span className="text-4xl block">📍</span>
                <h4 className="text-sm font-bold text-slate-800">Select a Dressmaker Pin</h4>
                <p className="text-xs text-slate-500">
                  Click any pin on the map or select a hub above to inspect workshop machinery, ratings, and rates.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Direct Quote Modal */}
      {showQuoteModal && selectedDm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Request Quote from {selectedDm.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedDm.district} Cluster • Rating ★ {selectedDm.rating}
                </p>
              </div>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {quoteSent ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-sm font-bold text-slate-900">Quote Request Delivered!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {selectedDm.name} will receive a notification and reply via StitchLink in-app chat with sample availability.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendQuote} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Batch Quantity (pieces)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    value={quoteBatchSize}
                    onChange={(e) => setQuoteBatchSize(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                    required
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Estimated total labor: Rs {(quoteBatchSize * selectedDm.pricePerPiece).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Garment Specs & Special Notes
                  </label>
                  <textarea
                    rows={3}
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="e.g. 50 Linen Summer Frocks with pockets, fabric provided by shop, sample needed within 2 days..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                    required
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white text-xs font-bold shadow-md transition-colors"
                  >
                    Send Direct Request 🚀
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

