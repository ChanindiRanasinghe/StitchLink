"use client";

import { useState } from "react";

export default function MessagingView() {
  const [activeThread, setActiveThread] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Nisansala Ranasinghe", text: "Ayubowan! I checked your silk frock order request. The pattern cutting will take 2 days.", time: "10:30 AM", isMe: false },
    { id: 2, sender: "Urban Threads Shop", text: "Great! Can we confirm delivery by Oct 22?", time: "10:35 AM", isMe: true },
    { id: 3, sender: "Nisansala Ranasinghe", text: "Yes, Oct 22 is completely fine. I'll send sample photos once pattern cutting is done.", time: "10:40 AM", isMe: false },
  ]);

  const [inputMsg, setInputMsg] = useState("");

  const threads = [
    {
      id: 1,
      name: "Nisansala Ranasinghe",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      role: "Solo Dressmaker • Kandy",
      lastMsg: "Yes, Oct 22 is completely fine...",
      time: "10:40 AM",
      unread: 0,
      order: "Order #SL-9912 (Silk Frock Batch)",
    },
    {
      id: 2,
      name: "Kanthi Perera",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
      role: "Dressmaker • Colombo",
      lastMsg: "I sent the revised quote for school uniforms.",
      time: "Yesterday",
      unread: 1,
      order: "Order #SL-8842 (School Uniforms)",
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "Urban Threads Shop", text: inputMsg, time: "Just now", isMe: true },
    ]);
    setInputMsg("");
  };

  const currentThread = threads.find((t) => t.id === activeThread) || threads[0];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden h-[600px] grid grid-cols-1 md:grid-cols-12">
      
      {/* Threads Sidebar */}
      <div className="md:col-span-4 border-r border-gray-200 p-4 space-y-4 flex flex-col bg-[#F9FAFB]">
        <h3 className="text-base font-bold text-[#1F2937]">Messages & Orders</h3>
        
        <div className="space-y-2 flex-1 overflow-y-auto">
          {threads.map((t) => (
            <div
              key={t.id}
              onClick={() => setActiveThread(t.id)}
              className={`p-3.5 rounded-xl cursor-pointer transition-all flex items-center gap-3 border ${
                activeThread === t.id
                  ? "bg-white border-[#6C4AB6] shadow-xs"
                  : "bg-transparent border-transparent hover:bg-white/60"
              }`}
            >
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#6C4AB6]" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-[#1F2937] truncate">{t.name}</h4>
                  <span className="text-[10px] text-gray-400">{t.time}</span>
                </div>
                <p className="text-[11px] text-[#6B7280] truncate">{t.lastMsg}</p>
                <span className="text-[9px] font-bold text-[#6C4AB6]">{t.order}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Conversation Feed */}
      <div className="md:col-span-8 flex flex-col justify-between p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <img src={currentThread.avatar} alt={currentThread.name} className="w-10 h-10 rounded-full object-cover border-2 border-[#6C4AB6]" />
            <div>
              <h3 className="text-sm font-bold text-[#1F2937]">{currentThread.name}</h3>
              <p className="text-xs text-[#6B7280]">{currentThread.role} • <strong className="text-[#6C4AB6]">{currentThread.order}</strong></p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            ● Active Order Thread
          </span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-3.5 rounded-2xl max-w-[80%] space-y-1 text-xs ${
                m.isMe
                  ? "bg-[#6C4AB6] text-white ml-auto rounded-br-xs shadow-xs"
                  : "bg-gray-100 text-[#1F2937] mr-auto rounded-bl-xs"
              }`}
            >
              <p className="leading-relaxed">{m.text}</p>
              <span className={`text-[9px] block text-right ${m.isMe ? "text-purple-200" : "text-gray-400"}`}>
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="flex gap-2 pt-3 border-t border-gray-100">
          <input
            type="text"
            placeholder="Write a message to dressmaker..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#6C4AB6]"
          />
          <button
            type="submit"
            className="bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white px-5 py-3 rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            Send Message
          </button>
        </form>

      </div>

    </div>
  );
}
