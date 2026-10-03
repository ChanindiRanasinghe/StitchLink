"use client";

import { useState } from "react";
import CapacityManagementView from "./CapacityManagementView";
import MessagingView from "./MessagingView";
import NotificationsView from "./NotificationsView";
import OrderProgressView from "./OrderProgressView";

export default function DressmakerDashboardView({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"available" | "quotations" | "orders" | "capacity" | "portfolio" | "messages" | "notifications">("available");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [proposedPrice, setProposedPrice] = useState("4,800");

  const availableOrders = [
    {
      id: "SL-9912",
      title: "Silk Frock Garment Order (50 units)",
      shop: "Urban Threads Boutique",
      location: "Colombo 07 (12 km away)",
      category: "Frock",
      quantity: 50,
      deadline: "Oct 22, 2026",
      aiMatch: "98% High Match",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      suggestedPrice: "LKR 4,500 – 5,200 / unit",
      explanation: "Based on 50 units of silk frock, 2-week deadline, and your historical speed of 4 units/day.",
    },
    {
      id: "SL-9915",
      title: "School Uniform Blouses & Skirts (120 units)",
      shop: "Lanka School Apparels",
      location: "Kandy (5 km away)",
      category: "Uniform",
      quantity: 120,
      deadline: "Nov 05, 2026",
      aiMatch: "94% Match",
      img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
      suggestedPrice: "LKR 1,800 – 2,200 / unit",
      explanation: "High quantity uniform batch with simple pattern cutting.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2A9D8F] text-white flex items-center justify-center font-bold">
              🪡
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1F2937]">StitchLink</h2>
              <span className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded">
                Dressmaker Portal
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("available")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "available" ? "bg-[#2A9D8F] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>📋</span> Available Orders
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "orders" ? "bg-[#2A9D8F] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>📦</span> Active Production Timeline
            </button>
            <button
              onClick={() => setActiveTab("capacity")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "capacity" ? "bg-[#2A9D8F] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>⚡</span> Capacity & Workload
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "messages" ? "bg-[#2A9D8F] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>💬</span> Messages & Chat
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "notifications" ? "bg-[#2A9D8F] text-white shadow-xs" : "text-[#6B7280] hover:bg-gray-100"
              }`}
            >
              <span>🔔</span> Notifications & Alerts
            </button>
          </nav>
        </div>

        {/* User Info */}
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
              alt="Nisansala"
              className="w-9 h-9 rounded-full object-cover border border-teal-300"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1F2937] truncate">Nisansala Ranasinghe</p>
              <p className="text-[10px] text-emerald-600 font-bold">★ 4.9 Rating • Kandy</p>
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

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        
        {/* Render Tab Views */}
        {activeTab === "capacity" && <CapacityManagementView />}
        {activeTab === "orders" && <OrderProgressView />}
        {activeTab === "messages" && <MessagingView />}
        {activeTab === "notifications" && <NotificationsView />}

        {/* Available Orders Section */}
        {activeTab === "available" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1F2937]">Matched Garment Orders</h3>
              <span className="text-xs text-[#6B7280]">Sorted by AI Suitability Score</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableOrders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="h-44 w-full relative bg-gray-100">
                    <img src={ord.img} alt={ord.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold text-white bg-[#2A9D8F] px-2.5 py-1 rounded-full shadow-md">
                        {ord.aiMatch}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold text-purple-200 tracking-wider">
                        {ord.category} • {ord.quantity} units
                      </span>
                      <h4 className="text-base font-bold leading-tight">{ord.title}</h4>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-xs text-[#6B7280]">{ord.shop} • {ord.location}</p>

                    <div className="bg-gradient-to-br from-[#EDE7F6]/50 to-white p-3.5 rounded-xl border border-[#6C4AB6]/20 space-y-1">
                      <span className="text-[11px] font-bold text-[#6C4AB6]">✨ AI Pricing Assistant Suggestion:</span>
                      <p className="text-sm font-extrabold text-[#1F2937]">{ord.suggestedPrice}</p>
                      <p className="text-[11px] text-[#6B7280] leading-tight">{ord.explanation}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-[#6B7280]">Deadline: <strong>{ord.deadline}</strong></span>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="bg-[#2A9D8F] hover:bg-[#228479] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
                      >
                        Submit Quotation Proposal
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quotation Submission Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-base font-bold text-[#1F2937]">Submit Quote: {selectedOrder.title}</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-400">✕</button>
              </div>

              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 space-y-1">
                <span className="text-[11px] font-bold text-[#6C4AB6]">AI Pricing Guidance</span>
                <p className="text-xs text-[#1F2937]">Recommended range: <strong>{selectedOrder.suggestedPrice}</strong></p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F2937] mb-1">Your Proposed Price Per Unit (LKR)</label>
                <input
                  type="text"
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:ring-2 focus:ring-[#2A9D8F]"
                />
              </div>

              <button
                onClick={() => {
                  alert("Quotation submitted to shop!");
                  setSelectedOrder(null);
                }}
                className="w-full bg-[#2A9D8F] hover:bg-[#228479] text-white font-bold py-3 rounded-xl shadow-md text-xs"
              >
                Confirm & Send Quotation
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
