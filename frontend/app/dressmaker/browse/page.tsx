"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { Order, GarmentCategory } from "@/lib/types";

const CATEGORY_ICONS: Partial<Record<GarmentCategory, string>> = {
  SHIRTS: "👔",
  FROCKS_DRESSES: "👗",
  TROUSERS_PANTS: "👖",
  BLOUSES: "👚",
  SCHOOL_UNIFORMS: "🏫",
  BATIK_WEAR: "🌺",
  TRADITIONAL_SAREES: "🥻",
  CHILDRENS_WEAR: "🧒",
  OTHER: "✂️",
};

const SRI_LANKA_DISTRICTS = [
  "All Districts", "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale",
  "Galle", "Matara", "Kurunegala", "Ratnapura", "Kegalle", "Badulla",
  "Anuradhapura", "Polonnaruwa", "Trincomalee", "Batticaloa", "Jaffna",
];

export default function DressmakerBrowsePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [districtFilter, setDistrictFilter] = useState("All Districts");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [bidding, setBidding] = useState<number | null>(null);
  const [bidSuccess, setBidSuccess] = useState<number | null>(null);

  // Bid form state
  const [activeBidOrder, setActiveBidOrder] = useState<Order | null>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [bidDays, setBidDays] = useState(14);
  const [bidSample, setBidSample] = useState("");
  const [bidNotes, setBidNotes] = useState("");
  const [bidError, setBidError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (districtFilter !== "All Districts") params.set("district", districtFilter);
    if (categoryFilter) params.set("category", categoryFilter);

    fetchApi<Order[]>(`/orders/?${params.toString()}`)
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [districtFilter, categoryFilter]);

  const handleBidSubmit = async () => {
    if (!activeBidOrder) return;
    setBidding(activeBidOrder.id);
    setBidError(null);
    try {
      await fetchApi("/bids/", {
        method: "POST",
        body: JSON.stringify({
          order_id: activeBidOrder.id,
          bid_amount_lkr: bidAmount,
          delivery_days: bidDays,
          sample_offered: bidSample || null,
          proposal_notes: bidNotes || null,
        }),
      });
      setBidSuccess(activeBidOrder.id);
      setActiveBidOrder(null);
    } catch (e: any) {
      setBidError(e.message);
    } finally {
      setBidding(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
          Live Garment Contract Feed
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Browse open batch orders from Sri Lankan clothing brands and submit your quote.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-neutral-300 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
        >
          {SRI_LANKA_DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-neutral-300 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 bg-white"
        >
          <option value="">All Categories</option>
          <option value="SHIRTS">Shirts & Tops</option>
          <option value="FROCKS_DRESSES">Frocks & Dresses</option>
          <option value="BATIK_WEAR">Batik Wear</option>
          <option value="SCHOOL_UNIFORMS">School Uniforms</option>
          <option value="BLOUSES">Blouses</option>
          <option value="TRADITIONAL_SAREES">Traditional Sarees</option>
        </select>

        <div className="ml-auto text-xs text-neutral-400 font-medium self-center">
          {loading ? "Loading..." : `${orders.length} open orders`}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="text-center py-20 text-neutral-400">
          <div className="text-4xl mb-3">🧵</div>
          <p className="font-semibold text-neutral-600">No open orders in this area</p>
          <p className="text-xs mt-1">Try changing the district or category filter.</p>
        </div>
      )}

      {/* Order Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-neutral-200 hover:border-teal-400/60 hover:shadow-md transition-all p-5 flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-xl flex-shrink-0">
                {CATEGORY_ICONS[order.category] || "✂️"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-neutral-900 leading-tight line-clamp-2">
                  {order.title}
                </h3>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {order.category?.replace(/_/g, " ")} · {order.location_district}
                </span>
              </div>
            </div>

            {order.description && (
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed line-clamp-2">
                {order.description}
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-neutral-400">Batch Size</dt>
                <dd className="font-bold text-neutral-900">{order.quantity} pcs</dd>
              </div>
              <div>
                <dt className="text-neutral-400">Shop Budget</dt>
                <dd className="font-bold text-teal-700">
                  Rs {order.target_budget_lkr?.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-400">Per Piece</dt>
                <dd className="font-bold text-neutral-700">
                  Rs {order.quantity ? Math.round(order.target_budget_lkr / order.quantity).toLocaleString() : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-400">Deadline</dt>
                <dd className="font-bold text-neutral-700">
                  {order.deadline
                    ? new Date(order.deadline).toLocaleDateString("en-LK", {
                        day: "numeric",
                        month: "short",
                      })
                    : "Flexible"}
                </dd>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-neutral-400 font-medium">
              🏪 Fabric: {order.fabric_provided === "SHOP_PROVIDES" ? "Shop will provide" : "Tailor to source"}
            </div>

            <div className="mt-4 flex gap-2">
              {bidSuccess === order.id ? (
                <div className="flex-1 py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200">
                  ✅ Bid Submitted!
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActiveBidOrder(order);
                    setBidAmount(Math.round(order.target_budget_lkr * 0.9));
                    setBidDays(14);
                    setBidError(null);
                  }}
                  className="flex-1 py-2 text-xs font-bold rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-sm"
                >
                  Submit Quote →
                </button>
              )}
              <span className="px-3 py-2 text-[11px] text-neutral-400 font-semibold bg-neutral-50 rounded-xl border border-neutral-200">
                {order.bids_count ?? 0} bids
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bid Modal */}
      {activeBidOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setActiveBidOrder(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 text-lg"
            >
              ✕
            </button>

            <h2 className="text-lg font-extrabold text-neutral-900 mb-1">
              Submit Your Quote
            </h2>
            <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
              <strong className="text-neutral-700">{activeBidOrder.title}</strong> — {activeBidOrder.quantity} pieces
            </p>

            {bidError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                {bidError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Your Total Quote (LKR) *
                </label>
                <input
                  type="number"
                  min={1}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  Per piece: Rs {activeBidOrder.quantity ? Math.round(bidAmount / activeBidOrder.quantity).toLocaleString() : "—"}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Estimated Delivery (days) *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={3}
                    max={60}
                    value={bidDays}
                    onChange={(e) => setBidDays(Number(e.target.value))}
                    className="flex-1 accent-teal-600"
                  />
                  <span className="w-16 text-center py-1 px-2 bg-teal-50 border border-teal-200 text-teal-800 text-sm font-bold rounded-lg">
                    {bidDays}d
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Sample Offer (Optional)
                </label>
                <input
                  type="text"
                  value={bidSample}
                  onChange={(e) => setBidSample(e.target.value)}
                  placeholder="e.g. 1 sample piece within 24 hours"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Machinery & Notes
                </label>
                <textarea
                  rows={2}
                  value={bidNotes}
                  onChange={(e) => setBidNotes(e.target.value)}
                  placeholder="e.g. Juki industrial machine, specializing in this fabric type, 8+ years experience..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveBidOrder(null)}
                  className="flex-1 py-2.5 border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-xl hover:bg-neutral-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBidSubmit}
                  disabled={bidding === activeBidOrder.id || !bidAmount}
                  className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50 shadow-md shadow-teal-600/20"
                >
                  {bidding === activeBidOrder.id ? "Submitting..." : "Send My Quote 🚀"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
