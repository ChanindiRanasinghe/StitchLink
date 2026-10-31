"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { Order, GarmentCategory } from "@/lib/types";

const CATEGORIES: { value: GarmentCategory; label: string; icon: string }[] = [
  { value: "SHIRTS", label: "Shirts & Tops", icon: "👔" },
  { value: "FROCKS_DRESSES", label: "Frocks & Dresses", icon: "👗" },
  { value: "TROUSERS_PANTS", label: "Trousers & Pants", icon: "👖" },
  { value: "BLOUSES", label: "Blouses", icon: "👚" },
  { value: "SCHOOL_UNIFORMS", label: "School Uniforms", icon: "🏫" },
  { value: "BATIK_WEAR", label: "Batik Wear", icon: "🌺" },
  { value: "TRADITIONAL_SAREES", label: "Traditional Sarees", icon: "🥻" },
  { value: "CHILDRENS_WEAR", label: "Children's Wear", icon: "🧒" },
  { value: "OTHER", label: "Other Garments", icon: "✂️" },
];

const SRI_LANKA_DISTRICTS = [
  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
  "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
  "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
  "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
  "Monaragala", "Ratnapura", "Kegalle",
];

export default function NewOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1 – Basic info
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GarmentCategory>("SHIRTS");
  const [quantity, setQuantity] = useState(50);
  const [description, setDescription] = useState("");

  // Step 2 – Budget, logistics & deadline
  const [budget, setBudget] = useState(25000);
  const [fabricProvided, setFabricProvided] = useState("SHOP_PROVIDES");
  const [district, setDistrict] = useState("Colombo");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const payload = {
        title,
        description: description || null,
        category,
        quantity,
        target_budget_lkr: budget,
        deadline: deadline ? new Date(deadline).toISOString() : null,
        fabric_provided: fabricProvided,
        location_district: district,
      };
      const order = await fetchApi<Order>("/orders/", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      router.push(`/shop/orders/${order.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/shop" className="text-xs text-neutral-500 hover:text-teal-600 font-medium transition-colors">
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-2">
          Post a Garment Batch Order
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Describe your stitching requirements and receive bids from verified Sri Lankan tailors.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s
                  ? "bg-teal-600 text-white"
                  : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {s}
            </div>
            <span className={`text-xs font-medium hidden sm:inline-block ${step >= s ? "text-teal-700" : "text-neutral-400"}`}>
              {s === 1 ? "Garment Details" : "Budget & Logistics"}
            </span>
            {s < 2 && <div className="w-8 h-px bg-neutral-200 ml-1" />}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Order Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 80 Linen Summer Frocks with Pockets"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Garment Category *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      category === cat.value
                        ? "border-teal-500 bg-teal-50 shadow-sm"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <span className="text-xl block mb-1">{cat.icon}</span>
                    <span className="text-[11px] font-semibold text-neutral-700 leading-tight">
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Batch Quantity (pieces) *
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="flex-1 accent-teal-600"
                />
                <span className="w-20 text-center py-1.5 px-3 bg-teal-50 border border-teal-200 text-teal-800 text-sm font-bold rounded-lg">
                  {quantity}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Garment Specifications & Notes
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe fabric type, patterns, finishes, size breakdown (S/M/L/XL counts), button types, lining requirements..."
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>

            <button
              type="button"
              disabled={!title || !category}
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all disabled:opacity-40 shadow-md shadow-teal-600/20"
            >
              Continue to Budget & Logistics →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Total Budget (LKR) *
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={5000}
                  max={500000}
                  step={5000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="flex-1 accent-teal-600"
                />
                <span className="w-28 text-center py-1.5 px-3 bg-teal-50 border border-teal-200 text-teal-800 text-sm font-bold rounded-lg">
                  Rs {budget.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Per piece estimate: Rs {Math.round(budget / quantity).toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-2">
                Fabric Supply Model *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFabricProvided("SHOP_PROVIDES")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    fabricProvided === "SHOP_PROVIDES"
                      ? "border-teal-500 bg-teal-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <span className="text-lg block mb-1">🏪</span>
                  <span className="text-xs font-bold text-neutral-800">Shop Provides</span>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    We supply fabric rolls and patterns
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setFabricProvided("DRESSMAKER_SOURCES")}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    fabricProvided === "DRESSMAKER_SOURCES"
                      ? "border-teal-500 bg-teal-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <span className="text-lg block mb-1">🧶</span>
                  <span className="text-xs font-bold text-neutral-800">Dressmaker Sources</span>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Tailor acquires fabric locally
                  </p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Preferred District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                >
                  {SRI_LANKA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Delivery Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-sm">
              <h3 className="font-bold text-neutral-800 mb-2 text-xs uppercase tracking-wider">
                Order Summary
              </h3>
              <dl className="space-y-1 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <dt>Garment</dt>
                  <dd className="font-semibold text-neutral-900">{title}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Quantity</dt>
                  <dd className="font-semibold">{quantity} pieces</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Budget</dt>
                  <dd className="font-semibold text-teal-700">
                    Rs {budget.toLocaleString()} total
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Location</dt>
                  <dd className="font-semibold">{district}</dd>
                </div>
              </dl>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-sm hover:bg-neutral-50 transition-all"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading || !budget}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all disabled:opacity-50 shadow-md shadow-teal-600/20"
              >
                {loading ? "Publishing..." : "Publish Order & Accept Bids 🚀"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
