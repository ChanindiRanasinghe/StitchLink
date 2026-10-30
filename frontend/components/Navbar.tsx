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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-500 text-base font-black text-white shadow-lg shadow-teal-500/30 transition-transform group-hover:scale-105">
            SL
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-[-0.06em] text-slate-900">Stitch<span className="text-teal-600">Link</span></span>
            <span className="hidden rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-700 sm:inline-block">
              Sri Lanka
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link href="/dressmaker/browse" className="transition hover:text-teal-700">Live job feed</Link>
          <Link href="/shop" className="transition hover:text-teal-700">For shops</Link>
          <Link href="/dressmaker" className="transition hover:text-teal-700">For dressmakers</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user.role ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs font-medium text-slate-500 sm:inline-block">
                Hi, <strong className="text-slate-800">{user.name || "User"}</strong>
              </span>
              {user.role === "SHOP" ? (
                <Link href="/shop" className="rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800">
                  Shop portal
                </Link>
              ) : (
                <Link href="/dressmaker" className="rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-teal-700">
                  Tailor hub
                </Link>
              )}
              <button onClick={handleLogout} className="text-xs font-medium text-slate-500 transition hover:text-red-600">
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="rounded-xl px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:text-teal-700">
                Sign in
              </Link>
              <Link href="/register" className="rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700">
                Get started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
