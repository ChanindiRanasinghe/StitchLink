"use client";

import { useState } from "react";

export default function MapDiscoveryView() {
  const [selectedHub, setSelectedHub] = useState("Colombo");
  const [radius, setRadius] = useState(15);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDressmaker, setSelectedDressmaker] = useState<any>(null);

  const dressmakersOnMap = [
    {
      id: 1,
      name: "Nisansala Ranasinghe",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      district: "Kandy",
      distance: "12 km away",
      skills: ["Pattern Cutting", "Silk Frocks"],
      rating: 4.9,
      aiMatch: 98,
      position: { top: "35%", left: "42%" },
    },
    {
      id: 2,
      name: "Kanthi Perera",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      district: "Colombo",
      distance: "4 km away",
      skills: ["Uniforms", "Formal Trousers"],
      rating: 4.8,
      aiMatch: 94,
      position: { top: "55%", left: "30%" },
    },
    {
      id: 3,
      name: "Fathima Rizwana",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      district: "Galle",
      distance: "8 km away",
      skills: ["Linen Resortwear", "Sundresses"],
      rating: 4.9,
      aiMatch: 91,
      position: { top: "75%", left: "38%" },
    },
  ];

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
            className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold bg-white text-[#1F2937]"
          >
            <option value="Colombo">Colombo Hub</option>
            <option value="Kandy">Kandy Hub</option>
            <option value="Galle">Galle Hub</option>
            <option value="Kurunegala">Kurunegala Hub</option>
            <option value="Gampaha">Gampaha Hub</option>
          </select>
        </div>
      </div>

      {/* Map Interactive Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Map View */}
        <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-gray-800 h-[500px] relative overflow-hidden shadow-xl flex items-center justify-center p-4">
          
          {/* Map Radial Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6C4AB6_1px,transparent_1px)] [background-size:20px_20px]"></div>

          {/* Interactive Pins */}
          {dressmakersOnMap.map((dm) => (
            <div
              key={dm.id}
              style={{ top: dm.position.top, left: dm.position.left }}
              onClick={() => setSelectedDressmaker(dm)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="bg-[#6C4AB6] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white group-hover:scale-110 transition-transform">
                <img src={dm.avatar} alt={dm.name} className="w-5 h-5 rounded-full object-cover" />
                <span>🪡 {dm.name.split(" ")[0]}</span>
                <span className="bg-[#2A9D8F] text-white px-1.5 py-0.2 rounded text-[10px]">
                  {dm.aiMatch}%
                </span>
              </div>
            </div>
          ))}

          {/* Map Overlay Banner */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-gray-200 shadow-lg text-xs space-y-1">
            <span className="font-bold text-[#1F2937] block">📍 District Search: {selectedHub} ({radius} km radius)</span>
            <span className="text-[#6B7280]">Found 48 verified dressmakers ready for orders.</span>
          </div>
        </div>

        {/* Selected Dressmaker Info Card */}
        <div className="lg:col-span-4 space-y-4">
          {selectedDressmaker ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <img src={selectedDressmaker.avatar} alt={selectedDressmaker.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#6C4AB6]" />
                <div>
                  <h3 className="text-base font-bold text-[#1F2937]">{selectedDressmaker.name}</h3>
                  <p className="text-xs text-[#6B7280]">{selectedDressmaker.district} • {selectedDressmaker.distance}</p>
                  <span className="text-xs font-bold text-amber-500">★ {selectedDressmaker.rating} Rating</span>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 space-y-1 text-xs">
                <span className="font-bold text-[#6C4AB6]">AI Match Percentage</span>
                <p className="text-[#1F2937] font-extrabold text-sm">{selectedDressmaker.aiMatch}% Suitability Match</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#1F2937]">Skills & Machine Setup:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDressmaker.skills.map((s: string, idx: number) => (
                    <span key={idx} className="text-[10px] font-bold bg-gray-100 text-[#1F2937] px-2 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => alert(`Direct quote request sent to ${selectedDressmaker.name}!`)}
                className="w-full bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white py-3 rounded-xl font-bold text-xs shadow-md"
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
