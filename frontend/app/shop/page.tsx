"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchApi, getStoredUser } from "@/lib/api";
import { Order, OrderStatus } from "@/lib/types";

const STATUS_COLORS: Record<OrderStatus, string> = {
  DRAFT: "bg-neutral-100 text-neutral-600",
  OPEN: "bg-teal-50 text-teal-700 border border-teal-200",
  ASSIGNED: "bg-blue-50 text-blue-700 border border-blue-200",
  IN_PRODUCTION: "bg-amber-50 text-amber-700 border border-amber-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  CANCELLED: "bg-red-50 text-red-600 border border-red-200",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  DRAFT: "Draft",
  OPEN: "🟢 Accepting Bids",
  ASSIGNED: "🔵 Dressmaker Assigned",
  IN_PRODUCTION: "🟡 In Production",
  COMPLETED: "✅ Completed",
  CANCELLED: "❌ Cancelled",
};

export default function ShopDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { name } = getStoredUser();

  useEffect(() => {
    fetchApi<Order[]>("/orders/my-orders")
      .then(setOrders)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const totalBudget = orders.reduce((s, o) => s + o.target_budget_lkr, 0);
  const openCount = orders.filter((o) => o.status === "OPEN").length;
  const activeCount = orders.filter(
    (o) => o.status === "ASSIGNED" || o.status === "IN_PRODUCTION"
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Shop Portal
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Welcome back, <strong>{name || "Shop Owner"}</strong>
          </p>
        </div>
        <Link
          href="/shop/new-order"
          className="px-5 py-2.5 bg-teal-600 text-white font-semibold text-sm rounded-xl hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20 transition-all self-start sm:self-auto"
        >
          + Post New Batch Order
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="text-2xl font-extrabold text-neutral-900">
            {orders.length}
          </div>
          <div className="text-xs text-neutral-500 mt-0.5 font-medium">
            Total Orders Posted
          </div>
        </div>
        <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200 shadow-sm">
          <div className="text-2xl font-extrabold text-teal-700">{openCount}</div>
          <div className="text-xs text-teal-600 mt-0.5 font-medium">
            Awaiting Bids
          </div>
        </div>
        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm">
          <div className="text-2xl font-extrabold text-amber-700">
            {activeCount}
          </div>
          <div className="text-xs text-amber-600 mt-0.5 font-medium">
            Active Production
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm">
          <div className="text-2xl font-extrabold text-neutral-900">
            Rs {totalBudget.toLocaleString()}
          </div>
          <div className="text-xs text-neutral-500 mt-0.5 font-medium">
            Total Budget Allocated
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <h2 className="font-bold text-neutral-800 text-sm">Your Garment Batches</h2>
          <span className="text-xs text-neutral-400">{orders.length} orders</span>
        </div>

        {loading && (
          <div className="px-6 py-16 text-center text-neutral-400 text-sm">
            Loading your orders…
          </div>
        )}

        {error && (
          <div className="px-6 py-8 text-center text-red-500 text-sm">{error}</div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="text-4xl mb-3">🧵</div>
            <p className="font-semibold text-neutral-700">No batch orders yet</p>
            <p className="text-xs text-neutral-400 mt-1">
              Create your first garment manufacturing order to get bids from dressmakers.
            </p>
            <Link
              href="/shop/new-order"
              className="inline-block mt-4 px-5 py-2 bg-teal-600 text-white text-xs font-semibold rounded-xl hover:bg-teal-700 transition-all"
            >
              Post First Order
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="divide-y divide-neutral-100">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/shop/orders/${order.id}`}
                className="flex items-start sm:items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-neutral-800 group-hover:text-teal-600 transition-colors truncate">
                      {order.title}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status]}`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-1 text-xs text-neutral-400">
                    <span>{order.quantity} pieces</span>
                    <span>Rs {order.target_budget_lkr.toLocaleString()}</span>
                    <span>{order.location_district}</span>
                    {order.bids_count !== undefined && (
                      <span className="font-semibold text-teal-600">
                        {order.bids_count} bid{order.bids_count !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-neutral-400 group-hover:text-teal-600 ml-4 transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
