"use client";

import { useState } from "react";
import QuotationsView from "./QuotationsView";
import OrderProgressView from "./OrderProgressView";
import MapDiscoveryView from "./MapDiscoveryView";
import MessagingView from "./MessagingView";
import NotificationsView from "./NotificationsView";

export default function ShopDashboardView({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "marketplace" | "map" | "create_order" | "quotations" | "orders" | "messages" | "notifications">("overview");
  const [showCategoryMismatchWarning, setShowCategoryMismatchWarning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Frock");
  const [orderTitle, setOrderTitle] = useState("Summer Cotton Frock Batch");
  const [selectedImageModal, setSelectedImageModal] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState("All");

  const dressmakers = [
    {
      id: 1,
      name: "Nisansala Ranasinghe",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
      location: "Kandy (12 km away)",
      skills: ["Pattern Cutting", "Embroidery", "Silk Finishing"],
      categories: ["Frock", "Saree", "Blouse"],
      rating: 4.9,
      completedOrders: 34,
      aiMatch: 98,
      verified: true,
      availability: "75% Available",
      portfolio: [
        { title: "Floral Summer Cotton Frock", category: "Frock", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" },
        { title: "Kandy Silk Evening Dress", category: "Frock", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80" },
        { title: "Traditional Handloom Saree", category: "Saree", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80" },
      ],
    },
    {
      id: 2,
      name: "Kanthi Perera",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
      location: "Colombo 05 (4 km away)",
      skills: ["Industrial Sewing", "Heavy Fabric", "Uniforms"],
      categories: ["Uniform", "Trouser", "Shirt"],
      rating: 4.8,
      completedOrders: 52,
      aiMatch: 94,
      verified: true,
      availability: "60% Available",
      portfolio: [
        { title: "Corporate Uniform Blazer", category: "Uniform", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80" },
        { title: "Slim Fit Formal Trousers", category: "Trouser", img: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=80" },
        { title: "School Linen Uniform Shirt", category: "Shirt", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80" },
      ],
    },
  ];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "Frock" && orderTitle.toLowerCase().includes("trouser")) {
      setShowCategoryMismatchWarning(true);
    } else {
      setShowCategoryMismatchWarning(false);
    }
  };

  const filteredDressmakers = dressmakers.filter((d) =>
    filterCategory === "All" ? true : d.categories.includes(filterCategory)
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6C4AB6] text-white flex items-center justify-center font-bold">
              🪡
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1F2937]">StitchLink</h2>
              <span className="text-[10px] font-bold text-[#6C4AB6] uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">
                Shop Portal
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "overview" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>📊</span> Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "marketplace" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>🔍</span> Dressmaker Marketplace
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "map" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>🗺️</span> Map Discovery
            </button>
            <button
              onClick={() => setActiveTab("create_order")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "create_order" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>➕</span> Create Order Request
            </button>
            <button
              onClick={() => setActiveTab("quotations")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "quotations" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>📄</span> Received Quotations
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "orders" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>📦</span> Active Production Timeline
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "messages" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>💬</span> Messages & Chat
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "notifications" ? "bg-[#6C4AB6] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>🔔</span> Notifications & AI Alerts
            </button>
          </nav>
        </div>

        {/* User Profile */}
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Urban Threads"
              className="w-9 h-9 rounded-full object-cover border border-purple-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1F2937] truncate">Urban Threads Boutique</p>
              <p className="text-[10px] text-[#6B7280]">Colombo 07 • Verified</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 p-2 rounded-lg"
          >
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        
        {/* Render Tab Views */}
        {activeTab === "quotations" && <QuotationsView />}
        {activeTab === "orders" && <OrderProgressView />}
        {activeTab === "map" && <MapDiscoveryView />}
        {activeTab === "messages" && <MessagingView />}
        {activeTab === "notifications" && <NotificationsView />}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <div>
                <h1 className="text-2xl font-extrabold text-[#1F2937]">Clothing Shop Dashboard</h1>
                <p className="text-xs text-[#6B7280]">Welcome back! You have 3 active production orders & 4 new quotations.</p>
              </div>
              <button
                onClick={() => setActiveTab("create_order")}
                className="bg-[#6C4AB6] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:bg-[#5A3DA0] transition-colors"
              >
                + New Garment Order Request
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div onClick={() => setActiveTab("orders")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs cursor-pointer hover:border-purple-300">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase">Active Orders</span>
                <p className="text-2xl font-extrabold text-[#1F2937]">3 Orders</p>
                <span className="text-[11px] text-emerald-600 font-semibold">On track (65% avg)</span>
              </div>
              <div onClick={() => setActiveTab("quotations")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs cursor-pointer hover:border-purple-300">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase">Quotations Received</span>
                <p className="text-2xl font-extrabold text-[#6C4AB6]">3 Pending</p>
                <span className="text-[11px] text-[#6C4AB6] font-semibold">AI price match: High</span>
              </div>
              <div onClick={() => setActiveTab("notifications")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs cursor-pointer hover:border-amber-300">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase">Risk Alerts</span>
                <p className="text-2xl font-extrabold text-amber-500">1 Medium Risk</p>
                <span className="text-[11px] text-amber-600 font-semibold">Deadline pressure</span>
              </div>
              <div onClick={() => setActiveTab("marketplace")} className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs cursor-pointer hover:border-teal-300">
                <span className="text-[11px] font-bold text-[#6B7280] uppercase">Connected Dressmakers</span>
                <p className="text-2xl font-extrabold text-[#2A9D8F]">12 Artisans</p>
                <span className="text-[11px] text-[#2A9D8F] font-semibold">Avg rating ★ 4.9</span>
              </div>
            </div>

            {/* AI Recommended Dressmakers */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1F2937]">AI Recommended Dressmakers</h3>
                <button onClick={() => setActiveTab("marketplace")} className="text-xs font-bold text-[#6C4AB6]">
                  View Marketplace →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dressmakers.map((dm) => (
                  <div key={dm.id} className="p-4 rounded-xl border border-gray-100 bg-[#F9FAFB] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={dm.avatar} alt={dm.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#6C4AB6]" />
                      <div>
                        <h4 className="text-sm font-bold text-[#1F2937]">{dm.name}</h4>
                        <p className="text-xs text-[#6B7280]">{dm.location}</p>
                        <span className="text-[11px] text-amber-600 font-semibold">★ {dm.rating} Rating</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2A9D8F] bg-teal-50 px-2.5 py-1 rounded-full">
                      {dm.aiMatch}% AI Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === "marketplace" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1F2937]">Dressmaker Marketplace Directory</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dressmakers.map((dm) => (
                <div key={dm.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={dm.avatar} alt={dm.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#6C4AB6]" />
                    <div>
                      <h4 className="text-base font-bold text-[#1F2937]">{dm.name}</h4>
                      <p className="text-xs text-[#6B7280]">{dm.location}</p>
                      <span className="text-xs font-bold text-amber-500">★ {dm.rating} Rating</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab("create_order")} className="w-full bg-[#6C4AB6] text-white py-2 rounded-xl text-xs font-bold">
                    Request Quotation
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Order Request Form */}
        {activeTab === "create_order" && (
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs space-y-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-[#1F2937]">Create New Garment Order Request</h2>
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Order request posted!"); setActiveTab("overview"); }}>
              <div>
                <label className="block text-xs font-bold mb-1">Order Title</label>
                <input type="text" value={orderTitle} onChange={(e) => setOrderTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Garment Category</label>
                  <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm">
                    <option value="Frock">Frock / Dress</option>
                    <option value="Trouser">Trouser / Pants</option>
                    <option value="Shirt">Formal Shirt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Quantity</label>
                  <input type="number" defaultValue={50} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#6C4AB6] text-white font-bold py-3 rounded-xl shadow-md text-sm">
                Submit Order Request
              </button>
            </form>
          </div>
        )}

      </main>

    </div>
  );
}
