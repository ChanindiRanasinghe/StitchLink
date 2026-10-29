import { Order, GarmentCategory, OrderStatus } from "@/lib/types";
import Link from "next/link";

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

const STATUS_BADGES: Record<OrderStatus, string> = {
  DRAFT: "bg-neutral-100 text-neutral-600",
  OPEN: "bg-teal-50 text-teal-700 border border-teal-200",
  ASSIGNED: "bg-blue-50 text-blue-700 border border-blue-200",
  IN_PRODUCTION: "bg-amber-50 text-amber-700 border border-amber-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  CANCELLED: "bg-red-50 text-red-600 border border-red-200",
};

interface OrderCardProps {
  order: Order;
  /** If true, show a link to shop order management view */
  isShopView?: boolean;
  /** Provide a custom CTA button instead of default */
  cta?: React.ReactNode;
}

export default function OrderCard({ order, isShopView = false, cta }: OrderCardProps) {
  const icon = CATEGORY_ICONS[order.category] || "✂️";
  const statusCls = STATUS_BADGES[order.status] || STATUS_BADGES.DRAFT;
  const perPiece = order.quantity ? Math.round(order.target_budget_lkr / order.quantity) : 0;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 hover:border-teal-400/60 hover:shadow-md transition-all p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-neutral-900 leading-tight line-clamp-2">
            {order.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusCls}`}>
              {order.status?.replace(/_/g, " ")}
            </span>
            <span className="text-[11px] text-neutral-400">
              {order.category?.replace(/_/g, " ")} · {order.location_district}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {order.description && (
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-3">
          {order.description}
        </p>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4 mt-auto pt-4 border-t border-neutral-100">
        <div>
          <dt className="text-neutral-400">Quantity</dt>
          <dd className="font-bold text-neutral-900">{order.quantity} pcs</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Budget</dt>
          <dd className="font-bold text-teal-700">Rs {order.target_budget_lkr?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="text-neutral-400">Per Piece</dt>
          <dd className="font-bold text-neutral-700">Rs {perPiece.toLocaleString()}</dd>
        </div>
        {order.deadline && (
          <div>
            <dt className="text-neutral-400">Deadline</dt>
            <dd className="font-bold text-neutral-700">
              {new Date(order.deadline).toLocaleDateString("en-LK", {
                day: "numeric",
                month: "short",
              })}
            </dd>
          </div>
        )}
      </div>

      {/* CTA */}
      {cta ? (
        cta
      ) : isShopView ? (
        <Link
          href={`/shop/orders/${order.id}`}
          className="block text-center py-2 text-xs font-bold rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-all mt-1"
        >
          Manage Order & Bids ({order.bids_count ?? 0}) →
        </Link>
      ) : (
        <div className="flex items-center justify-between mt-1 text-xs text-neutral-400">
          <span>🏪 {order.fabric_provided === "SHOP_PROVIDES" ? "Fabric Provided" : "Tailor Sources"}</span>
          <span className="font-semibold">{order.bids_count ?? 0} bids</span>
        </div>
      )}
    </div>
  );
}
