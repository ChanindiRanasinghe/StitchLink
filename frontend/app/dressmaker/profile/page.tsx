"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { User } from "@/lib/types";

export default function DressmakerProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    fetchApi<User>("/auth/me")
      .then((u) => {
        setProfile(u);
        setDisplayName(u.dressmaker_profile?.display_name || "");
        setBio(u.dressmaker_profile?.bio || "");
        setExperienceYears(u.dressmaker_profile?.experience_years || 0);
        setCity(u.dressmaker_profile?.city || "");
        setPhoneNumber(u.phone_number || "");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-neutral-400 text-sm">
        Loading profile…
      </div>
    );
  if (error)
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-red-500 text-sm">
        {error}
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <a
        href="/dressmaker"
        className="text-xs text-neutral-500 hover:text-teal-600 font-medium transition-colors"
      >
        ← Back to Workspace
      </a>

      <h1 className="text-2xl font-extrabold text-neutral-900 mt-4 mb-1">
        Your Tailor Profile
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Shops see this profile when reviewing your bids. A complete profile wins more contracts.
      </p>

      {/* Profile completeness */}
      <div className="mb-8 p-4 bg-teal-50 rounded-2xl border border-teal-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-teal-800">Profile Completeness</span>
          <span className="text-xs font-extrabold text-teal-700">
            {[displayName, bio, city, phoneNumber].filter(Boolean).length * 25}%
          </span>
        </div>
        <div className="w-full bg-teal-200/50 rounded-full h-2">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all"
            style={{
              width: `${[displayName, bio, city, phoneNumber].filter(Boolean).length * 25}%`,
            }}
          />
        </div>
        <p className="text-[11px] text-teal-600 mt-1.5">
          Complete your profile to get 3× more bid acceptances
        </p>
      </div>

      {saved && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
          ✅ Profile updated successfully!
        </div>
      )}

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8">
        {/* Avatar section */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-neutral-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-md shadow-teal-500/20">
            {profile?.full_name?.charAt(0) || "T"}
          </div>
          <div>
            <div className="font-bold text-neutral-900">{profile?.full_name}</div>
            <div className="text-xs text-neutral-500">{profile?.email}</div>
            <div className="mt-1 text-[11px] bg-teal-100 text-teal-700 font-bold px-2 py-0.5 rounded-full inline-block">
              🧵 Solo Dressmaker
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Business Display Name *
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Menike Premium Tailoring"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Operating District
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              >
                {[
                  "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Galle",
                  "Matara", "Kurunegala", "Ratnapura", "Kegalle", "Badulla",
                  "Anuradhapura", "Polonnaruwa", "Trincomalee", "Batticaloa", "Jaffna",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Years of Experience
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={experienceYears}
                onChange={(e) => setExperienceYears(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              WhatsApp / Phone
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+94 7X XXX XXXX"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Sewing Machinery & Specializations
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your machines, specialties, and typical garments. e.g: Juki DDL-8700 high-speed lockstitch, Pegasus 4-thread overlock, expert in formal shirts, frocks, and linen garments..."
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600"
            />
          </div>

          {/* Specialization Badges */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-2">
              Garment Specializations (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Linen Frocks", "Formal Shirts", "Batik Wear", "School Uniforms",
                "Children's Wear", "Blouses", "Evening Gowns", "Embroidery",
                "Hand Finishing", "Industrial Overlock", "Pressing & Finishing",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-neutral-200 text-neutral-600 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 cursor-pointer transition-all"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSaved(true)}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 mt-2"
          >
            Save Profile Changes
          </button>
        </div>
      </div>
    </div>
  );
}
