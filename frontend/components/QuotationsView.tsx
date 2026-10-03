"use client";

import { useState } from "react";

export default function QuotationsView() {
  const [selectedQuotations, setSelectedQuotations] = useState<number[]>([1, 2]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const quotes = [
    {
      id: 1,
      dressmaker: "Nisansala Ranasinghe",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      location: "Kandy (12 km away)",
      rating: 4.9,
      completedOrders: 34,
      proposedPrice: "LKR 4,800",
      totalPrice: "LKR 240,000",
      estimatedDays: "12 Days (Oct 22)",
      skills: ["Pattern Cutting", "Silk Finishing"],
      aiInsight: "Fair Market Rate (within LKR 4,500 - 5,200 range)",
      aiMatch: "98% AI Match",
      notes: "Can provide custom silk lining and deliver 2 days prior to deadline.",
      sampleImg: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      dressmaker: "Kanthi Perera",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      location: "Colombo 05 (4 km away)",
      rating: 4.8,
      completedOrders: 52,
      proposedPrice: "LKR 4,500",
      totalPrice: "LKR 225,000",
      estimatedDays: "10 Days (Oct 20)",
      skills: ["Industrial Sewing", "Speed Stitching"],
      aiInsight: "Lowest Price Offer (saves LKR 15,000 total)",
      aiMatch: "94% AI Match",
      notes: "High speed output. Standard cotton thread finishing.",
      sampleImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      dressmaker: "Fathima Rizwana",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      location: "Galle (8 km away)",
      rating: 4.9,
      completedOrders: 28,
      proposedPrice: "LKR 5,100",
      totalPrice: "LKR 255,000",
      estimatedDays: "14 Days (Oct 24)",
      skills: ["Hand Stitching", "Embroidery"],
      aiInsight: "Premium Finishing Offer",
      aiMatch: "91% AI Match",
      notes: "Includes hand embroidery detailing on sleeves.",
      sampleImg: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const toggleSelect = (id: number) => {
    if (selectedQuotations.includes(id)) {
      setSelectedQuotations(selectedQuotations.filter((qId) => qId !== id));
    } else {
      if (selectedQuotations.length < 3) {
        setSelectedQuotations([...selectedQuotations, id]);
      }
    }
  };

  const comparedItems = quotes.filter((q) => selectedQuotations.includes(q.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">Quotations Comparison & Management</h2>
          <p className="text-xs text-[#6B7280]">
            Review proposals for Order #SL-9912 (&quot;Summer Cotton Frock Batch - 50 units&quot;). Select up to 3 quotes for side-by-side comparison.
          </p>
        </div>
        <button
          onClick={() => setCompareModalOpen(true)}
          disabled={selectedQuotations.length < 2}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            selectedQuotations.length >= 2
              ? "bg-[#6C4AB6] text-white hover:bg-[#5A3DA0]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Compare Selected ({selectedQuotations.length})
        </button>
      </div>

      {/* Quote Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((q) => {
          const isSelected = selectedQuotations.includes(q.id);
          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-6 border transition-all shadow-xs flex flex-col justify-between space-y-4 ${
                isSelected ? "border-[#6C4AB6] ring-2 ring-[#6C4AB6]/20" : "border-gray-100"
              }`}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelect(q.id)}
                  className="w-4 h-4 text-[#6C4AB6] rounded cursor-pointer"
                />
                <span className="text-xs font-bold text-[#2A9D8F] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                  {q.aiMatch}
                </span>
              </div>

              {/* Dressmaker Details */}
              <div className="flex items-center gap-3">
                <img src={q.avatar} alt={q.dressmaker} className="w-12 h-12 rounded-full object-cover border-2 border-[#6C4AB6]" />
                <div>
                  <h4 className="text-sm font-bold text-[#1F2937]">{q.dressmaker}</h4>
                  <p className="text-xs text-[#6B7280]">{q.location}</p>
                  <span className="text-[11px] text-amber-600 font-semibold">★ {q.rating} ({q.completedOrders} orders)</span>
                </div>
              </div>

              {/* Price & Delivery */}
              <div className="bg-[#F9FAFB] p-3.5 rounded-xl border border-gray-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#6B7280]">Proposed Unit Price</span>
                  <span className="text-base font-extrabold text-[#1F2937]">{q.proposedPrice}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#6B7280]">Total Batch Cost</span>
                  <span className="font-bold text-[#6C4AB6]">{q.totalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-gray-200/50">
                  <span className="text-[#6B7280]">Estimated Delivery</span>
                  <span className="font-bold text-emerald-600">{q.estimatedDays}</span>
                </div>
              </div>

              {/* AI Insight Badge */}
              <div className="bg-purple-50 p-2.5 rounded-lg border border-purple-100 text-[11px] text-[#6C4AB6] font-semibold flex items-center gap-1.5">
                <span>✨ AI Pricing Insight:</span>
                <span>{q.aiInsight}</span>
              </div>

              <p className="text-xs text-[#6B7280] italic">&ldquo;{q.notes}&rdquo;</p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => alert(`Quotation from ${q.dressmaker} accepted! Order initiated.`)}
                  className="bg-[#2A9D8F] hover:bg-[#228479] text-white py-2 rounded-xl text-xs font-bold shadow-xs"
                >
                  Accept Quote
                </button>
                <button
                  onClick={() => alert(`Quotation rejected.`)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold"
                >
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Comparison Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-gray-100 relative space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1F2937]">Side-by-Side Quotation Comparison</h3>
                <p className="text-xs text-[#6B7280]">Comparing {comparedItems.length} dressmaker proposals for Order #SL-9912</p>
              </div>
              <button onClick={() => setCompareModalOpen(false)} className="text-gray-400 text-lg">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparedItems.map((item) => (
                <div key={item.id} className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={item.avatar} alt={item.dressmaker} className="w-12 h-12 rounded-full object-cover border-2 border-[#6C4AB6]" />
                    <div>
                      <h4 className="text-sm font-bold text-[#1F2937]">{item.dressmaker}</h4>
                      <p className="text-xs text-[#6B7280]">{item.location} • ★ {item.rating}</p>
                    </div>
                  </div>

                  <table className="w-full text-xs text-[#1F2937] divide-y divide-gray-200">
                    <tbody>
                      <tr className="py-2"><td className="font-bold py-1.5">Proposed Price:</td><td className="text-right font-extrabold text-[#6C4AB6]">{item.proposedPrice} / unit</td></tr>
                      <tr className="py-2"><td className="font-bold py-1.5">Total (50 units):</td><td className="text-right font-bold">{item.totalPrice}</td></tr>
                      <tr className="py-2"><td className="font-bold py-1.5">Estimated Time:</td><td className="text-right text-emerald-600 font-bold">{item.estimatedDays}</td></tr>
                      <tr className="py-2"><td className="font-bold py-1.5">AI Match Rating:</td><td className="text-right text-[#2A9D8F] font-bold">{item.aiMatch}</td></tr>
                    </tbody>
                  </table>

                  <button
                    onClick={() => {
                      alert(`Quote from ${item.dressmaker} accepted!`);
                      setCompareModalOpen(false);
                    }}
                    className="w-full bg-[#2A9D8F] text-white py-2.5 rounded-xl font-bold text-xs shadow-sm"
                  >
                    Accept {item.dressmaker}&apos;s Proposal
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
