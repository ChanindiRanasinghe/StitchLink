"use client";

import { useState } from "react";

export default function CapacityManagementView() {
  const [weeklyCapacity, setWeeklyCapacity] = useState(75);

  const upcomingWorkload = [
    { order: "Silk Frock Batch (50 units)", shop: "Urban Threads Boutique", deadline: "Oct 22, 2026", status: "In Production", load: "40% Workload" },
    { order: "School Uniform Blouses (120 units)", shop: "Lanka School Apparels", deadline: "Nov 05, 2026", status: "Scheduled", load: "35% Workload" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">Workload & Capacity Management</h2>
          <p className="text-xs text-[#6B7280]">Manage your weekly sewing machine availability and avoid overcommitment risks.</p>
        </div>
        <div className="bg-teal-50 border border-teal-100 p-3 rounded-xl text-right">
          <span className="text-[10px] font-bold text-[#2A9D8F] uppercase">Current Weekly Capacity</span>
          <p className="text-xl font-extrabold text-[#1F2937]">{weeklyCapacity}% Filled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Capacity Prediction Box & Meter */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-[#1F2937]">Weekly Machine Output Capacity</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Optimal Workload
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span>Used Capacity (38 hrs / week)</span>
              <span className="text-[#2A9D8F]">{weeklyCapacity}%</span>
            </div>
            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#2A9D8F] to-[#6C4AB6] h-full w-[75%] rounded-full"></div>
            </div>
            <p className="text-[11px] text-[#6B7280]">25% remaining capacity (~12 hours available for new quotes this week).</p>
          </div>

          {/* AI Capacity Prediction Alert */}
          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 space-y-1">
            <span className="text-xs font-bold text-[#6C4AB6] flex items-center gap-1">
              🤖 AI Capacity Forecast:
            </span>
            <p className="text-xs text-[#1F2937] leading-relaxed">
              Based on your historical stitching speed (4 frocks/day), accepting 1 more batch of 30 units will push your capacity to 95%, triggering delay alerts. We recommend accepting orders with deadlines after Nov 08.
            </p>
          </div>
        </div>

        {/* Workload Schedule */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#1F2937]">Active Order Schedule</h3>

          <div className="space-y-3">
            {upcomingWorkload.map((w, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F9FAFB] border border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1F2937]">{w.order}</h4>
                  <p className="text-[11px] text-[#6B7280]">{w.shop} • Deadline: {w.deadline}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#6C4AB6] block">{w.load}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{w.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
