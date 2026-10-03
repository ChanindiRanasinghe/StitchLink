"use client";

import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
  initialRole?: "shop" | "dressmaker" | "admin";
  onLoginSuccess: (user: { name: string; role: "shop" | "dressmaker" | "admin" }) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
  initialRole = "shop",
  onLoginSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [role, setRole] = useState<"shop" | "dressmaker" | "admin">(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Colombo");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (role === "admin") {
      // Admin Security Check
      if (adminPasscode === "stitchadmin" || email.toLowerCase().includes("admin")) {
        onLoginSuccess({
          name: "System Administrator",
          role: "admin",
        });
        onClose();
      } else {
        setErrorMsg("Invalid Admin Passcode! Use passcode 'stitchadmin' or click Quick Admin Demo.");
      }
      return;
    }

    onLoginSuccess({
      name: name || (role === "shop" ? "Urban Threads Boutique" : "Nisansala Ranasinghe"),
      role: role,
    });
    onClose();
  };

  const handleDemoLogin = (demoRole: "shop" | "dressmaker" | "admin") => {
    if (demoRole === "shop") {
      onLoginSuccess({ name: "Urban Threads Boutique", role: "shop" });
    } else if (demoRole === "dressmaker") {
      onLoginSuccess({ name: "Nisansala Ranasinghe (Dressmaker)", role: "dressmaker" });
    } else if (demoRole === "admin") {
      onLoginSuccess({ name: "System Executive Administrator", role: "admin" });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-6">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-2 font-bold text-xl ${
            role === "admin" ? "bg-slate-900 text-purple-400" : "bg-[#EDE7F6] text-[#6C4AB6]"
          }`}>
            {role === "admin" ? "🔒" : "🪡"}
          </div>
          <h3 className="text-xl font-bold text-[#1F2937]">
            {role === "admin"
              ? "StitchLink Admin Portal"
              : mode === "login"
              ? "Welcome Back to StitchLink"
              : "Create Your Account"}
          </h3>
          <p className="text-xs text-[#6B7280]">
            {role === "admin"
              ? "Restricted Access • Authorized Administrators Only"
              : "Connect with Sri Lanka's B2B garment marketplace"}
          </p>
        </div>

        {/* Public Role Selector (Shop vs Dressmaker) */}
        {role !== "admin" ? (
          <div className="grid grid-cols-2 gap-2 bg-[#F9FAFB] p-1 rounded-xl border border-gray-100 mb-6">
            <button
              type="button"
              onClick={() => setRole("shop")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                role === "shop"
                  ? "bg-[#6C4AB6] text-white shadow-xs"
                  : "text-[#6B7280] hover:text-[#1F2937]"
              }`}
            >
              🏢 Clothing Shop
            </button>
            <button
              type="button"
              onClick={() => setRole("dressmaker")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                role === "dressmaker"
                  ? "bg-[#6C4AB6] text-white shadow-xs"
                  : "text-[#6B7280] hover:text-[#1F2937]"
              }`}
            >
              🪡 Solo Dressmaker
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 text-white p-3 rounded-xl mb-6 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
              Protected Administrative Console
            </span>
            <p className="text-xs text-slate-300">Enter your system passcode to access platform analytics & user management.</p>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && role !== "admin" && (
            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-1">
                {role === "shop" ? "Business Name" : "Full Name"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === "shop" ? "e.g. Urban Threads Boutique" : "e.g. Nisansala Ranasinghe"}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1">
              {role === "admin" ? "Admin Username / Email" : "Email Address"}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "admin" ? "admin@stitchlink.lk" : "name@company.com"}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
            />
          </div>

          {role === "admin" ? (
            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-1">Admin Passcode (Default: stitchadmin)</label>
              <input
                type="password"
                required
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder="stitchadmin"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
            </div>
          )}

          {mode === "register" && role !== "admin" && (
            <div>
              <label className="block text-xs font-bold text-[#1F2937] mb-1">District</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] bg-white"
              >
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Gampaha">Gampaha</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className={`w-full font-bold text-sm py-3 rounded-xl shadow-md transition-all mt-2 ${
              role === "admin"
                ? "bg-slate-900 hover:bg-slate-800 text-white"
                : "bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white"
            }`}
          >
            {role === "admin" ? "Authorize Admin Session" : mode === "login" ? "Log In to Account" : "Register Account"}
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center space-y-2">
          <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
            🚀 Quick Demo One-Click Sign In
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin("shop")}
              className="bg-purple-50 hover:bg-purple-100 text-[#6C4AB6] text-[11px] font-bold py-2 px-2 rounded-lg border border-purple-200 flex items-center justify-center gap-1"
            >
              🏢 Shop Portal
            </button>
            <button
              onClick={() => handleDemoLogin("dressmaker")}
              className="bg-teal-50 hover:bg-teal-100 text-[#2A9D8F] text-[11px] font-bold py-2 px-2 rounded-lg border border-teal-200 flex items-center justify-center gap-1"
            >
              🪡 Dressmaker Portal
            </button>
          </div>
        </div>

        {/* Dedicated Admin Portal Switcher */}
        <div className="mt-4 pt-3 border-t border-gray-100 text-center flex items-center justify-between text-xs text-[#6B7280]">
          {role !== "admin" ? (
            <button
              onClick={() => {
                setRole("admin");
                setErrorMsg("");
              }}
              className="text-slate-700 font-bold hover:text-slate-900 flex items-center gap-1 mx-auto"
            >
              🔑 System Admin Portal Login
            </button>
          ) : (
            <button
              onClick={() => {
                setRole("shop");
                setErrorMsg("");
              }}
              className="text-[#6C4AB6] font-bold hover:underline mx-auto"
            >
              ← Back to Shop / Dressmaker Portal
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
