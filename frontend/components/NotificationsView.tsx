"use client";

import { useState } from "react";

export default function NotificationsView() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Quotation Received",
      desc: "Nisansala Ranasinghe submitted a quote (LKR 4,800/unit) for Order #SL-9912.",
      category: "Quotation",
      time: "10 mins ago",
      read: false,
      badgeColor: "bg-purple-100 text-[#6C4AB6]",
    },
    {
      id: 2,
      title: "AI Production Risk Warning",
      desc: "Order #SL-8842 has hit 60% workload capacity. Recommended: Check progress.",
      category: "AI Risk Alert",
      time: "1 hour ago",
      read: false,
      badgeColor: "bg-amber-100 text-amber-900",
    },
    {
      id: 3,
      title: "Category Validation Passed",
      desc: "Vision AI confirmed 100% frock category accuracy for your reference sketch.",
      category: "Vision AI",
      time: "3 hours ago",
      read: true,
      badgeColor: "bg-teal-100 text-[#2A9D8F]",
    },
    {
      id: 4,
      title: "New Message from Dressmaker",
      desc: "Kanthi Perera sent a message: 'Pattern cutting completed for school uniforms.'",
      category: "Message",
      time: "Yesterday",
      read: true,
      badgeColor: "bg-blue-100 text-blue-800",
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">Notifications & AI Alerts</h2>
          <p className="text-xs text-[#6B7280]">Stay updated on quotations, order stages, messages, and AI risk detection.</p>
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-bold text-[#6C4AB6] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
              n.read ? "bg-white border-gray-100 opacity-80" : "bg-purple-50/40 border-purple-100 shadow-2xs"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${n.badgeColor}`}>
                  {n.category}
                </span>
                <h4 className="text-xs font-bold text-[#1F2937]">{n.title}</h4>
              </div>
              <p className="text-xs text-[#6B7280]">{n.desc}</p>
              <span className="text-[10px] text-gray-400 block">{n.time}</span>
            </div>

            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#6C4AB6] animate-pulse"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
