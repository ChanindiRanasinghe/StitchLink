"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStoredUser, clearAuthToken } from "@/lib/api";

export default function Navbar() {
  const [user, setUser] = useState<{ role: string | null; name: string | null }>({
    role: null,
    name: null,
  });

  useEffect(() => {
    const stored = getStoredUser();
    setUser({ role: stored.role, name: stored.name });
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    setUser({ role: null, name: null });
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            SL
          </div>
          <span className="font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-teal-600 transition-colors">
            Stitch<span className="text-teal-600">Link</span>
          </span>
          <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-medium border border-teal-200 hidden sm:inline-block">
            Sri Lanka B2B
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <Link href="/dressmaker/browse" className="hover:text-teal-600 transition-colors">
            Browse Garment Orders
          </Link>
          <Link href="/shop" className="hover:text-teal-600 transition-colors">
            For Clothing Shops
          </Link>
          <Link href="/dressmaker" className="hover:text-teal-600 transition-colors">
            For Solo Dressmakers
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user.role ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-500 hidden sm:inline-block">
                Hi, <strong className="text-neutral-800">{user.name || "Tailor"}</strong> ({user.role})
              </span>
              {user.role === "SHOP" ? (
                <Link
                  href="/shop"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-all shadow-sm"
                >
                  Shop Portal
                </Link>
              ) : (
                <Link
                  href="/dressmaker"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-sm"
                >
                  Tailor Hub
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-xs text-neutral-500 hover:text-red-600 font-medium transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-teal-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/25 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
