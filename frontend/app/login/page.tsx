"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchApi, setAuthToken } from "@/lib/api";
import { AuthResponse } from "@/lib/types";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await fetchApi<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setAuthToken(data.access_token, data.role, data.full_name);

      if (data.role === "SHOP") {
        window.location.href = "/shop";
      } else {
        window.location.href = "/dressmaker";
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: "SHOP" | "DRESSMAKER") => {
    if (role === "SHOP") {
      setEmail("colombo_threads@stitchlink.lk");
      setPassword("password123");
    } else {
      setEmail("shanthi.tailor@stitchlink.lk");
      setPassword("password123");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/50">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white font-extrabold flex items-center justify-center mx-auto text-xl shadow-md shadow-teal-600/30 mb-3">
            SL
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900">Welcome Back</h2>
          <p className="text-sm text-neutral-500 mt-1">
            Sign in to access your StitchLink workspace
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. fashion@shop.lk"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to StitchLink"}
          </button>
        </form>

        {/* Quick Demo Credentials Fill */}
        <div className="mt-6 pt-6 border-t border-neutral-100">
          <p className="text-[11px] font-semibold text-neutral-400 text-center uppercase tracking-wider mb-2">
            Instant Test Login
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("SHOP")}
              className="py-1.5 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-700 hover:bg-neutral-50 font-medium transition-colors"
            >
              🏢 Demo Shop
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("DRESSMAKER")}
              className="py-1.5 px-3 rounded-lg border border-neutral-200 text-xs text-neutral-700 hover:bg-neutral-50 font-medium transition-colors"
            >
              🧵 Demo Tailor
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-teal-600 hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
