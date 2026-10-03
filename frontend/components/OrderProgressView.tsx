"use client";

import { useState } from "react";

export default function OrderProgressView() {
  const [messages, setMessages] = useState([
    { sender: "Urban Threads Shop", text: "Hi Nisansala! How is the silk frock pattern cutting progressing?", time: "10:30 AM" },
    { sender: "Nisansala Ranasinghe", text: "Hello! Pattern cutting is 100% finished. We are starting overlock stitching today.", time: "11:15 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { sender: "Urban Threads Shop", text: newMessage, time: "Just now" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="space-y-8">
      {/* Order Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-[#6C4AB6]">
              Order #SL-8842
            </span>
            <span className="text-xs text-[#6B7280]">Target Deadline: Oct 25, 2026</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1F2937] mt-1">Summer Cotton & Silk Frock Batch (50 units)</h2>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 self-start sm:self-auto">
          ● Status: In Production (65% Completed)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Timeline & Progress Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Progress Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-[#1F2937]">Production Stage Progress</h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#1F2937]">Overall Batch Completion</span>
                <span className="text-[#6C4AB6]">65%</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-[#6C4AB6] to-[#2A9D8F] h-full w-[65%] rounded-full"></div>
              </div>
            </div>

            {/* Stages */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-[#1F2937]">Fabric Inspection & Washing</h4>
                  <p className="text-[11px] text-[#6B7280]">Completed on Oct 02, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-[#1F2937]">Pattern Precision Cutting</h4>
                  <p className="text-[11px] text-[#6B7280]">Completed on Oct 05, 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#6C4AB6] text-white flex items-center justify-center font-bold text-xs animate-pulse">
                  ⚡
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-[#6C4AB6]">Overlock Stitching & Assembly</h4>
                  <p className="text-[11px] text-[#6B7280]">Currently in progress (32 of 50 units stitched)</p>
                </div>
              </div>

              <div className="flex items-center gap-4 opacity-50">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-[#1F2937]">Final Quality Inspection & Packaging</h4>
                  <p className="text-[11px] text-[#6B7280]">Upcoming stage</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Production Risk Widget */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <span>🤖</span> AI Production Risk Advisory: Medium Risk
              </span>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                Risk Factors Detected
              </span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Dressmaker Nisansala R. has 2 overlapping orders ending on Oct 24. Recommendation: Maintain daily check-ins to ensure deadline buffers remain clear.
            </p>
          </div>

        </div>

        {/* Right Chat & Order Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Real-Time Chat Widget */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 flex flex-col justify-between h-96">
            <div className="border-b pb-3 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                alt="Nisansala"
                className="w-9 h-9 rounded-full object-cover border border-[#6C4AB6]"
              />
              <div>
                <h4 className="text-xs font-bold text-[#1F2937]">Direct Messaging Thread</h4>
                <p className="text-[10px] text-emerald-600 font-semibold">● Nisansala Ranasinghe Online</p>
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl max-w-[85%] space-y-1 ${
                    m.sender === "Urban Threads Shop"
                      ? "bg-[#EDE7F6] text-[#1F2937] ml-auto border border-purple-100"
                      : "bg-gray-100 text-[#1F2937] mr-auto"
                  }`}
                >
                  <p className="font-semibold text-[11px] text-[#6C4AB6]">{m.sender}</p>
                  <p>{m.text}</p>
                  <span className="text-[9px] text-gray-400 block text-right">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-gray-100">
              <input
                type="text"
                placeholder="Type a message or inquiry..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#6C4AB6]"
              />
              <button
                type="submit"
                className="bg-[#6C4AB6] hover:bg-[#5A3DA0] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs"
              >
                Send
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
