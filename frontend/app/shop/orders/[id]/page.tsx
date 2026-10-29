"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { Order, Bid, BidStatus } from "@/lib/types";

const BID_STATUS_UI: Record<BidStatus, { label: string; cls: string }> = {
  PENDING: { label: "Awaiting Decision", cls: "bg-amber-50 text-amber-700 border border-amber-200" },
  ACCEPTED: { label: "✅ Accepted", cls: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  REJECTED: { label: "❌ Rejected", cls: "bg-red-50 text-red-600 border border-red-200" },
  WITHDRAWN: { label: "Withdrawn", cls: "bg-neutral-100 text-neutral-500" },
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingBid, setAcceptingBid] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [ord, bidList] = await Promise.all([
        fetchApi<Order>(`/orders/${orderId}`),
        fetchApi<Bid[]>(`/bids/order/${orderId}`),
      ]);
      setOrder(ord);
      setBids(bidList);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) loadData();
  }, [orderId]);

  const handleAcceptBid = async (bidId: number) => {
    setAcceptingBid(bidId);
    setSuccessMsg(null);
    try {
      await fetchApi(`/bids/${bidId}/accept`, { method: "PATCH" });
      setSuccessMsg("Bid accepted! The dressmaker has been notified.");
      await loadData();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setAcceptingBid(null);
    }
  };

  if (loading)
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-neutral-400 text-sm">
        Loading order details…
      </div>
    );

  if (!order)
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-red-500 text-sm">
        {error || "Order not found."}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <a href="/shop" className="text-xs text-neutral-500 hover:text-teal-600 font-medium transition-colors">
        ← Back to Dashboard
      </a>

      {successMsg && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium">
          {successMsg}
        </div>
      )}
      {error && !successMsg && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Order header */}
      <div className="mt-6 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
              {order.title}
            </h1>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-neutral-500">
              <span className="font-medium text-neutral-700">📦 {order.quantity} pieces</span>
              <span>💰 Rs {order.target_budget_lkr?.toLocaleString()}</span>
              <span>📍 {order.location_district}</span>
              {order.deadline && (
                <span>📅 Due {new Date(order.deadline).toLocaleDateString("en-LK")}</span>
              )}
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${
              order.status === "OPEN"
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : order.status === "ASSIGNED"
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : order.status === "COMPLETED"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {order.status?.replace(/_/g, " ")}
          </span>
        </div>

        {order.description && (
          <div className="mt-6 pt-6 border-t border-neutral-100">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
              Garment Specifications
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed">{order.description}</p>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <dt className="text-neutral-400 font-medium">Category</dt>
            <dd className="font-semibold text-neutral-800 mt-0.5">
              {order.category?.replace(/_/g, " ")}
            </dd>
          </div>
          <div>
            <dt className="text-neutral-400 font-medium">Fabric Supply</dt>
            <dd className="font-semibold text-neutral-800 mt-0.5">
              {order.fabric_provided === "SHOP_PROVIDES" ? "Shop Provides Fabric" : "Tailor Sources Fabric"}
            </dd>
          </div>
          <div>
            <dt className="text-neutral-400 font-medium">Price Per Piece</dt>
            <dd className="font-semibold text-teal-700 mt-0.5">
              Rs {order.target_budget_lkr && order.quantity ? Math.round(order.target_budget_lkr / order.quantity).toLocaleString() : "—"}
            </dd>
          </div>
        </div>
      </div>

      {/* Bids Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-neutral-900 text-lg">
            Bids Received{" "}
            <span className="text-sm font-normal text-neutral-400">
              ({bids.length})
            </span>
          </h2>
          {order.status === "OPEN" && (
            <span className="text-xs text-teal-600 font-semibold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              🟢 Accepting bids
            </span>
          )}
        </div>

        {bids.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-10 text-center">
            <div className="text-3xl mb-2">⏳</div>
            <p className="text-sm font-semibold text-neutral-700">No bids yet</p>
            <p className="text-xs text-neutral-400 mt-1">
              Dressmakers are reviewing your specs. Bids usually arrive within a few hours.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bids.map((bid) => (
              <div
                key={bid.id}
                className={`bg-white rounded-2xl border shadow-sm p-6 transition-all ${
                  bid.status === "ACCEPTED"
                    ? "border-emerald-300 ring-1 ring-emerald-200"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-neutral-900">
                        {bid.dressmaker?.full_name || `Dressmaker #${bid.dressmaker_id}`}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${BID_STATUS_UI[bid.status].cls}`}
                      >
                        {BID_STATUS_UI[bid.status].label}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-neutral-500">
                      <span>
                        💰 <strong className="text-neutral-800">Rs {bid.bid_amount_lkr.toLocaleString()}</strong> total
                      </span>
                      <span>
                        📅 <strong className="text-neutral-800">{bid.delivery_days} days</strong> delivery
                      </span>
                      <span>
                        Per piece:{" "}
                        <strong className="text-teal-600">
                          Rs {order.quantity ? Math.round(bid.bid_amount_lkr / order.quantity).toLocaleString() : "—"}
                        </strong>
                      </span>
                    </div>

                    {bid.sample_offered && (
                      <div className="mt-3 text-xs text-neutral-600 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                        <strong className="text-blue-800">Sample offer:</strong> {bid.sample_offered}
                      </div>
                    )}
                    {bid.proposal_notes && (
                      <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                        {bid.proposal_notes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {order.status === "OPEN" && bid.status === "PENDING" && (
                      <button
                        onClick={() => handleAcceptBid(bid.id)}
                        disabled={acceptingBid === bid.id}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm disabled:opacity-50"
                      >
                        {acceptingBid === bid.id ? "Accepting..." : "Accept This Bid ✓"}
                      </button>
                    )}
                    <span className="text-[11px] text-neutral-400">
                      {bid.created_at
                        ? new Date(bid.created_at).toLocaleDateString("en-LK")
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
