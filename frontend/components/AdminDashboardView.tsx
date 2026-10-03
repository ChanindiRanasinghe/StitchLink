"use client";

import { useState } from "react";

export default function AdminDashboardView({ onLogout }: { onLogout: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const usersList = [
    { name: "Urban Threads Boutique", role: "Clothing Shop", location: "Colombo 07", verified: true, status: "Active", date: "2026-08-12" },
    { name: "Nisansala Ranasinghe", role: "Dressmaker", location: "Kandy", verified: true, status: "Active", date: "2026-08-15" },
    { name: "Kanthi Perera", role: "Dressmaker", location: "Colombo 05", verified: true, status: "Active", date: "2026-08-20" },
    { name: "Lanka School Apparels", role: "Clothing Shop", location: "Kandy", verified: false, status: "Pending Verification", date: "2026-09-01" },
    { name: "Galle Linen Craft", role: "Clothing Shop", location: "Galle", verified: true, status: "Active", date: "2026-09-10" },
  ];

  const filteredUsers = usersList.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6C4AB6] flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <h2 className="text-base font-bold">StitchLink Admin</h2>
              <span className="text-[10px] text-purple-300 uppercase tracking-wider">System Control</span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            <div className="px-3.5 py-2.5 rounded-xl bg-purple-900/60 text-purple-200">
              📊 Admin Analytics & Dashboard
            </div>
            <div className="px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white">
              👥 User & Role Management
            </div>
            <div className="px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white">
              ✔️ Pending Verifications
            </div>
            <div className="px-3.5 py-2.5 rounded-xl text-slate-400 hover:text-white">
              🤖 AI Engine Health & Logs
            </div>
          </nav>
        </div>

        <button
          onClick={onLogout}
          className="text-left text-xs font-bold text-rose-400 hover:text-rose-300 pt-4 border-t border-slate-800"
        >
          ← Exit Admin Session
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1F2937]">Platform Executive Control</h1>
            <p className="text-xs text-[#6B7280]">Real-time marketplace monitoring across Sri Lanka.</p>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            ● AI Engine Online
          </span>
        </div>

        {/* Executive Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] font-bold text-[#6B7280]">Total Users</span>
            <p className="text-2xl font-extrabold text-[#1F2937]">1,650</p>
            <span className="text-[11px] text-emerald-600 font-semibold">+14% this month</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] font-bold text-[#6B7280]">Active Clothing Shops</span>
            <p className="text-2xl font-extrabold text-[#6C4AB6]">450 Shops</p>
            <span className="text-[11px] text-purple-600 font-semibold">Colombo, Kandy, Galle</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] font-bold text-[#6B7280]">Solo Dressmakers</span>
            <p className="text-2xl font-extrabold text-[#2A9D8F]">1,200 Artisans</p>
            <span className="text-[11px] text-teal-600 font-semibold">Verified profiles</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs">
            <span className="text-[11px] font-bold text-[#6B7280]">Pending Verification</span>
            <p className="text-2xl font-extrabold text-amber-500">18 Applications</p>
            <span className="text-[11px] text-amber-600 font-semibold">Requires document check</span>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-[#1F2937]">User Management Directory</h3>
            <input
              type="text"
              placeholder="Search user, role, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#6C4AB6] w-full sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F2937]">
              <thead className="bg-[#F9FAFB] border-y border-gray-200 uppercase text-[10px] font-bold text-[#6B7280]">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Reg. Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50/80">
                    <td className="py-3.5 px-4 font-bold">{u.name}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === "Dressmaker" ? "bg-teal-50 text-teal-700" : "bg-purple-50 text-purple-700"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{u.location}</td>
                    <td className="py-3.5 px-4">
                      {u.verified ? (
                        <span className="text-emerald-600 font-bold">✓ Verified</span>
                      ) : (
                        <span className="text-amber-600 font-bold">⏳ Pending</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold">{u.status}</td>
                    <td className="py-3.5 px-4 text-[#6B7280]">{u.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-[#6C4AB6] font-bold hover:underline">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

    </div>
  );
}
