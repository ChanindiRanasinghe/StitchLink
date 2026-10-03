"use client";

import { useState, useEffect } from "react";
import { fetchDressmakers, Dressmaker } from "@/lib/api";

export default function MapDiscoveryView() {
  const [selectedHub, setSelectedHub] = useState("Colombo");
  const [radius, setRadius] = useState(15);
  const [dressmakers, setDressmakers] = useState<Dressmaker[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDressmaker, setSelectedDressmaker] = useState<Dressmaker | null>(null);

  useEffect(() => {
    async function loadDressmakers() {
      setLoading(true);
      try {
        const res = await fetchDressmakers(selectedHub);
        if (res && res.data) {
          setDressmakers(res.data);
          if (res.data.length > 0) {
            setSelectedDressmaker(res.data[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching dressmakers:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDressmakers();
  }, [selectedHub]);

  // Positions mapped for map pins UI simulation
  const getPinPosition = (index: number) => {
    const positions = [
      { top: "35%", left: "42%" },
      { top: "55%", left: "30%" },
      { top: "75%", left: "38%" },
      { top: "45%", left: "60%" },
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">Map-Based Dressmaker Discovery</h2>
          <p className="text-xs text-[#6B7280]">
            Locate verified solo dressmakers near your boutique in Sri Lanka to reduce transport costs and speed up fitting.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#F9FAFB] p-2 rounded-xl border border-gray-200 text-xs">
            <span className="font-bold text-[#1F2937]">Radius: {radius} km</span>
            <input
              type="range"
              min="5"
              max="50"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-24 accent-[#6C4AB6]"
            />
          </div>

          <select
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold bg-white text-[#1F2937] focus:ring-2 focus:ring-[#6C4AB6]"
          >
            <option value="Colombo">Colombo Hub</option>
            <option value="Kandy">Kandy Hub</option>
            <option value="Galle">Galle Hub</option>
          </select>
        </div>
      </div>

      {/* Map Interactive Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Map View */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-gray-800 h-[500px] relative overflow-hidden shadow-xl flex items-center justify-center p-4">
          
          {/* Map Radial Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6C4AB6_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {loading && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold z-30">
              Loading dressmakers from FastAPI API...
            </div>
          )}

          {/* Interactive Pins from API */}
          {dressmakers.map((dm, idx) => {
            const pos = getPinPosition(idx);
            return (
              <div
                key={dm.id}
                style={{ top: pos.top, left: pos.left }}
                onClick={() => setSelectedDressmaker(dm)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                <div className="bg-[#6C4AB6] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white group-hover:scale-110 transition-transform">
                  <span>🪡 {dm.name.split(" ")[0]}</span>
                  <span className="bg-[#2A9D8F] text-white px-1.5 py-0.2 rounded text-[10px]">
                    {dm.ai_match_score}%
                  </span>
                </div>
              </div>
            );
          })}

          {/* Map Overlay Banner */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-gray-200 shadow-lg text-xs space-y-1">
            <span className="font-bold text-[#1F2937] block">📍 District Search: {selectedHub} ({radius} km radius)</span>
            <span className="text-[#6B7280]">Found {dressmakers.length} verified dressmakers via backend API.</span>
          </div>
        </div>

        {/* Selected Dressmaker Info Card */}
        <div className="lg:col-span-4 space-y-4">
          {selectedDressmaker ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#6C4AB6]/10 text-[#6C4AB6] flex items-center justify-center font-bold text-lg border-2 border-[#6C4AB6]">
                  {selectedDressmaker.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1F2937]">{selectedDressmaker.name}</h3>
                  <p className="text-xs text-[#6B7280]">{selectedDressmaker.district} • {selectedDressmaker.distance_km} km away</p>
                  <span className="text-xs font-bold text-amber-500">★ {selectedDressmaker.rating} Rating ({selectedDressmaker.completed_orders} orders)</span>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 space-y-1 text-xs">
                <span className="font-bold text-[#6C4AB6]">AI Match Score</span>
                <p className="text-[#1F2937] font-extrabold text-sm">{selectedDressmaker.ai_match_score}% Suitability Match</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#1F2937]">Skills & Garment Categories:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDressmaker.skills.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-bold bg-purple-100 text-[#6C4AB6] px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                  {selectedDressmaker.categories.map((c, idx) => (
                    <span key={`cat-${idx}`} className="text-[10px] font-bold bg-teal-100 text-[#2A9D8F] px-2 py-0.5 rounded">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert(`Direct quote request sent to ${selectedDressmaker.name}!`)}
                className="w-full bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-colors"
              >
                Send Order Request to {selectedDressmaker.name.split(" ")[0]}
              </button>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center space-y-3">
              <span className="text-3xl block">📍</span>
              <h4 className="text-sm font-bold text-[#1F2937]">Click a map pin to view details</h4>
              <p className="text-xs text-[#6B7280]">Select any dressmaker pin on the map to view rating, distance, skills, and match percentage.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

