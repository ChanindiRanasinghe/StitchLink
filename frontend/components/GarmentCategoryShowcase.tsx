"use client";

import { useState } from "react";

export default function GarmentCategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<any>(null);

  const galleryItems = [
    {
      id: 1,
      title: "Handcrafted Silk Evening Frock",
      category: "Frocks",
      district: "Kandy",
      dressmaker: "Nisansala Ranasinghe",
      img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
      aiTag: "Vision AI Verified: Frock Category",
    },
    {
      id: 2,
      title: "Cotton Floral Summer Dress",
      category: "Frocks",
      district: "Colombo",
      dressmaker: "Kanthi Perera",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      aiTag: "99% Match Score",
    },
    {
      id: 3,
      title: "Slim Fit Linen Trouser",
      category: "Trousers",
      district: "Kurunegala",
      dressmaker: "Sunil Shantha",
      img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=80",
      aiTag: "Heavy Stitching Certified",
    },
    {
      id: 4,
      title: "Corporate Uniform Blazer & Skirt",
      category: "Uniforms",
      district: "Gampaha",
      dressmaker: "Priyanthi Silva",
      img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
      aiTag: "Batch Production Capacity",
    },
    {
      id: 5,
      title: "Traditional Sri Lankan Batik Saree",
      category: "Sarees",
      district: "Galle",
      dressmaker: "Fathima Rizwana",
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      aiTag: "Handloom Specialist",
    },
    {
      id: 6,
      title: "Linen Beach Resort Sundress",
      category: "Resortwear",
      district: "Galle",
      dressmaker: "Dulani Wijesinghe",
      img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
      aiTag: "Boutique Quality",
    },
  ];

  const categories = ["All", "Frocks", "Trousers", "Uniforms", "Sarees", "Resortwear"];

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section id="garments-gallery" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6C4AB6]">
              Garment Sourcing Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mt-1">
              Popular Garment Categories & Tailoring Works
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 max-w-xl">
              Explore recent orders completed by solo dressmakers across Sri Lanka, verified by Vision AI.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  activeCategory === cat
                    ? "bg-[#6C4AB6] text-white shadow-md"
                    : "bg-[#F9FAFB] border border-gray-200 text-[#6B7280] hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhotoModal(item)}
              className="group bg-[#F9FAFB] rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="h-64 w-full relative overflow-hidden bg-gray-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                {/* AI Tag */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold bg-white/90 backdrop-blur-xs text-[#6C4AB6] px-2.5 py-1 rounded-full border border-purple-200 shadow-sm flex items-center gap-1">
                    <span>✨</span> {item.aiTag}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
                    {item.category} • {item.district} Hub
                  </span>
                  <h4 className="text-base font-bold leading-tight drop-shadow-sm">{item.title}</h4>
                </div>
              </div>

              {/* Details Footer */}
              <div className="p-4 bg-white flex items-center justify-between border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#EDE7F6] text-[#6C4AB6] font-bold text-xs flex items-center justify-center">
                    🪡
                  </div>
                  <span className="text-xs font-semibold text-[#1F2937]">Tailored by {item.dressmaker}</span>
                </div>
                <span className="text-xs font-bold text-[#6C4AB6] group-hover:translate-x-1 transition-transform">
                  View Photo →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Screen Lightbox Modal */}
        {selectedPhotoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative space-y-4 animate-in fade-in">
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="h-96 w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={selectedPhotoModal.img}
                  alt={selectedPhotoModal.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <h3 className="text-lg font-bold text-[#1F2937]">{selectedPhotoModal.title}</h3>
                  <p className="text-xs text-[#6B7280]">
                    Dressmaker: <strong>{selectedPhotoModal.dressmaker}</strong> ({selectedPhotoModal.district} District)
                  </p>
                </div>
                <span className="px-3.5 py-1 bg-purple-50 text-[#6C4AB6] text-xs font-bold rounded-full border border-purple-200">
                  {selectedPhotoModal.aiTag}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
