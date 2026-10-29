"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchApi, setAuthToken } from "@/lib/api";
import { AuthResponse } from "@/lib/types";

export default function RegisterPage() {
  const [role, setRole] = useState<"SHOP" | "DRESSMAKER">("SHOP");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("Colombo");

  // Shop specific fields
  const [businessName, setBusinessName] = useState("");
  const [businessReg, setBusinessReg] = useState("");
  const [address, setAddress] = useState("");

  // Dressmaker specific fields
  const [displayName, setDisplayName] = useState("");
  const [experienceYears, setExperienceYears] = useState(3);
  const [bio, setBio] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint = role === "SHOP" ? "/auth/register/shop" : "/auth/register/dressmaker";
      const payload =
        role === "SHOP"
          ? {
              email,
              password,
              full_name: fullName,
              phone_number: phoneNumber,
              business_name: businessName,
              business_registration_number: businessReg || null,
              address: address || null,
              city,
            }
          : {
              email,
              password,
              full_name: fullName,
              phone_number: phoneNumber,
              display_name: displayName || fullName,
              experience_years: Number(experienceYears),
              bio: bio || null,
              city,
            };

      const data = await fetchApi<AuthResponse>(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setAuthToken(data.access_token, data.role, data.full_name);

      if (data.role === "SHOP") {
        window.location.href = "/shop";
      } else {
        window.location.href = "/dressmaker";
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-xl shadow-neutral-200/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
            Create Your Account
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Choose your account role to get started
          </p>

          {/* Role selector tabs */}
          <div className="mt-6 p-1 bg-neutral-100 rounded-2xl flex max-w-sm mx-auto">
            <button
              type="button"
              onClick={() => setRole("SHOP")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                role === "SHOP"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              🏢 Clothing Boutique / Brand
            </button>
            <button
              type="button"
              onClick={() => setRole("DRESSMAKER")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                role === "DRESSMAKER"
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              🧵 Solo Dressmaker
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Full Contact Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Priyantha Silva"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.lk"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Password *
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
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+94 7X XXX XXXX"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              District / Operating City *
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            >
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kalutara">Kalutara</option>
              <option value="Kandy">Kandy</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Ratnapura">Ratnapura</option>
            </select>
          </div>

          {/* Conditional Role Fields */}
          {role === "SHOP" ? (
            <div className="space-y-4 pt-2 border-t border-neutral-100">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Brand / Retail Store Name *
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Lotus Wear Colombo"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    BR Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={businessReg}
                    onChange={(e) => setBusinessReg(e.target.value)}
                    placeholder="PV / W / XXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Store / Office Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 10 Havelock Rd"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2 border-t border-neutral-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Tailoring Business Display Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Menike Custom Stitches"
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Years of Sewing Experience
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Machinery & Sewing Specialization
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. Single needle lockstitch, 4-thread overlock, specializing in frocks and shirts..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Creating Account..." : `Complete ${role === "SHOP" ? "Shop" : "Tailor"} Registration`}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-teal-600 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
