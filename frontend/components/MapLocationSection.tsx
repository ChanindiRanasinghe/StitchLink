"use client";

import { useState } from "react";

export default function MapLocationSection() {
  const [selectedHub, setSelectedHub] = useState("Colombo");

  const hubs = [
    { name: "Colombo", dressmakers: 420, avgRating: 4.9, popular: "Dresses, Suits & Uniforms" },
    { name: "Kandy", dressmakers: 210, avgRating: 4.8, popular: "Batik & Traditional Sarees" },
    { name: "Galle", dressmakers: 180, avgRating: 4.9, popular: "Resortwear & Linen" },
    { name: "Kurunegala", dressmakers: 145, avgRating: 4.7, popular: "Casualwear & Trousers" },
    { name: "Gampaha", dressmakers: 290, avgRating: 4.8, popular: "Frocks & Kidswear" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C4AB6]">
              Geographic Discovery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
              Location-Based Sourcing Across Sri Lanka
            </h2>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Find dressmakers near your shop to reduce garment transport costs, speed up sample fitting, and foster direct relationships with local seamstresses.
            </p>

            <div className="space-y-3 pt-2">
              {hubs.map((h) => (
                <div
                  key={h.name}
                  onClick={() => setSelectedHub(h.name)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedHub === h.name
                      ? "bg-[#EDE7F6]/60 border-[#6C4AB6] shadow-sm"
                      : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6C4AB6]/10 text-[#6C4AB6] flex items-center justify-center font-bold text-xs">
                      📍
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1F2937]">{h.name} Region</h4>
                      <p className="text-xs text-[#6B7280]">Popular: {h.popular}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#6C4AB6] block">{h.dressmakers} Dressmakers</span>
                    <span className="text-[11px] text-amber-600 font-semibold">★ {h.avgRating} Rating</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map Graphical Component */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold text-[#1F2937]">Map View: {selectedHub} Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-[#6C4AB6] text-white text-xs font-semibold rounded-lg">
                  Map View
                </button>
                <button className="px-3 py-1 bg-gray-100 text-[#6B7280] text-xs font-semibold rounded-lg hover:bg-gray-200">
                  List View
                </button>
              </div>
            </div>

            {/* Simulated Interactive Map canvas */}
            <div className="w-full h-80 bg-slate-900 rounded-xl relative overflow-hidden flex items-center justify-center">
              
              {/* Map Grid Background pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6C4AB6_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Map Pins */}
              <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                <div className="bg-[#6C4AB6] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform">
                  <span>🪡 Colombo Central</span>
                  <span className="bg-[#2A9D8F] text-white px-1 rounded">98%</span>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 group cursor-pointer">
                <div className="bg-[#2A9D8F] text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform">
                  <span>🪡 Kandy Apparel</span>
                  <span className="bg-white text-[#1F2937] px-1 rounded">95%</span>
                </div>
              </div>

              <div className="absolute bottom-1/4 right-1/3 group cursor-pointer">
                <div className="bg-purple-700 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1 group-hover:scale-110 transition-transform">
                  <span>🪡 Galle Seamstress</span>
                  <span className="bg-emerald-400 text-slate-900 px-1 rounded">99%</span>
                </div>
              </div>

              {/* Center Map Legend Overlay */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 text-[11px] text-[#1F2937] space-y-1 shadow-md">
                <p className="font-bold">📍 Active Search Radius: 15 km</p>
                <p className="text-[#6B7280]">Showing 48 Verified Dressmakers near {selectedHub}</p>
              </div>

            </div>

            <div className="flex items-center justify-between text-xs text-[#6B7280] pt-2">
              <span>💡 Tip: Click pins to view portfolio, capacity calendar & place sample requests.</span>
              <span className="font-bold text-[#6C4AB6]">Explore Full Map →</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
