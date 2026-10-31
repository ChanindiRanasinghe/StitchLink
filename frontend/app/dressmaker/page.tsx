"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchApi, getStoredUser } from "@/lib/api";
import { Bid } from "@/lib/types";

const BID_STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "⏳ Awaiting Shop Response", cls: "text-amber-700 bg-amber-50 border-amber-200" },
  ACCEPTED: { label: "✅ Accepted — Proceed to Stitch!", cls: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  REJECTED: { label: "❌ Not Selected", cls: "text-red-600 bg-red-50 border-red-200" },
  WITHDRAWN: { label: "Withdrawn", cls: "text-neutral-500 bg-neutral-100 border-neutral-200" },
};

export default function DressmakerDashboard() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { name } = getStoredUser();

  useEffect(() => {
    fetchApi<Bid[]>("/bids/my-bids")
      .then(setBids)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const acceptedBids = bids.filter((b) => b.status === "ACCEPTED");
  const pendingBids = bids.filter((b) => b.status === "PENDING");
  const totalEarnings = acceptedBids.reduce((s, b) => s + b.bid_amount_lkr, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Tailor Workspace
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Welcome, <strong>{name || "Dressmaker"}</strong> — manage your stitching contracts here
          </p>
        </div>
        <Link
          href="/dressmaker/browse"
          className="px-5 py-2.5 bg-teal-600 text-white font-semibold text-sm rounded-xl hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20 transition-all self-start sm:self-auto"
        >
          Browse Open Orders →
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="text-2xl font-extrabold text-neutral-900">{bids.length}</div>
          <div className="text-xs text-neutral-500 mt-0.5 font-medium">Total Bids Submitted</div>
        </div>
        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-2xl font-extrabold text-amber-700">{pendingBids.length}</div>
          <div className="text-xs text-amber-600 mt-0.5 font-medium">Awaiting Shop Decision</div>
        </div>
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-sm">
          <div className="text-2xl font-extrabold text-emerald-700">{acceptedBids.length}</div>
          <div className="text-xs text-emerald-600 mt-0.5 font-medium">Contracts Won</div>
        </div>
        <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 shadow-sm">
          <div className="text-xl font-extrabold text-teal-700">
            Rs {totalEarnings.toLocaleString()}
          </div>
          <div className="text-xs text-teal-600 mt-0.5 font-medium">Earnings Secured</div>
        </div>
      </div>

      {/* Priority: Active Jobs */}
      {acceptedBids.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Stitching Contracts ({acceptedBids.length})
          </h2>
          <div className="space-y-3">
            {acceptedBids.map((bid) => (
              <div
                key={bid.id}
                className="bg-white rounded-2xl border border-emerald-300 ring-1 ring-emerald-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-bold text-neutral-800">
                    Order #{bid.order_id}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1 flex flex-wrap gap-3">
                    <span>💰 Rs {bid.bid_amount_lkr.toLocaleString()} awarded</span>
                    <span>📅 {bid.delivery_days} day deadline</span>
                  </div>
                  {bid.proposal_notes && (
                    <p className="text-xs text-neutral-400 mt-1.5 italic line-clamp-1">
                      {bid.proposal_notes}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                    ✅ Accepted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Bids history */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="font-bold text-neutral-800 text-sm">All My Bid History</h2>
          <span className="text-xs text-neutral-400">{bids.length} bids</span>
        </div>

        {loading && (
          <div className="px-6 py-16 text-center text-neutral-400 text-sm">Loading bids…</div>
        )}
        {error && (
          <div className="px-6 py-8 text-center text-red-500 text-sm">{error}</div>
        )}

        {!loading && bids.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">🧵</div>
            <p className="font-semibold text-neutral-700">No bids submitted yet</p>
            <p className="text-xs text-neutral-400 mt-1">
              Browse open orders and submit your first quote to start winning contracts.
            </p>
            <Link
              href="/dressmaker/browse"
              className="inline-block mt-4 px-5 py-2 bg-teal-600 text-white text-xs font-semibold rounded-xl hover:bg-teal-700 transition-all"
            >
              Browse Orders Now
            </Link>
          </div>
        )}

        {!loading && bids.length > 0 && (
          <div className="divide-y divide-neutral-100">
            {bids.map((bid) => {
              const statusUI = BID_STATUS_LABELS[bid.status] || BID_STATUS_LABELS.PENDING;
              return (
                <div key={bid.id} className="px-6 py-4 flex items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-neutral-800">
                      Order #{bid.order_id}
                    </span>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-neutral-400">
                      <span>Rs {bid.bid_amount_lkr.toLocaleString()}</span>
                      <span>{bid.delivery_days} day delivery</span>
                      <span>
                        {bid.created_at
                          ? new Date(bid.created_at).toLocaleDateString("en-LK")
                          : ""}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusUI.cls}`}
                  >
                    {statusUI.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
