"use client";

import { useState } from "react";
import { Language, translations } from "@/lib/translations";

export default function HowItWorksSection({ lang = "en" }: { lang?: Language }) {
  const [activeTab, setActiveTab] = useState<"shops" | "dressmakers">("shops");
  const t = translations[lang] || translations.en;

  const shopSteps = [
    {
      step: "01",
      title: lang === "si" ? "ඇණවුම සකස් කරන්න" : lang === "ta" ? "கட்டளை உருவாக்கல்" : "Create Garment Order Request",
      desc: lang === "si" ? "ඇඳුම් මාදිලිය (Frock, Trouser), ප්‍රමාණය සහ අයවැය ඇතුළත් කරන්න." : lang === "ta" ? "ஆடை வகை, அளவு மற்றும் வரவுசெலவுத் திட்டத்தைக் குறிப்பிடவும்." : "Specify garment category (Frock, Trouser, Shirt, Uniform), quantity, budget, and reference images.",
      tag: "AI Validation",
    },
    {
      step: "02",
      title: lang === "si" ? "AI මිල ගණන් සහ ගැලපීම්" : lang === "ta" ? "AI விலை மற்றும் பொருத்தம்" : "Receive AI Quotations & Matching",
      desc: lang === "si" ? "ස්ථානය, හැකියාව සහ ධාරිතාව අනුව සුදුසුම මසා නිමකරන්නන් සොයාගන්න." : lang === "ta" ? "இருப்பிடம் மற்றும் திறன்களின் அடிப்படையில் தையல்காரர்களைப் பெறுங்கள்." : "Get intelligent dressmaker recommendations based on proximity, skills, and capacity.",
      tag: "Intelligent Matching",
    },
    {
      step: "03",
      title: lang === "si" ? "ඇණවුම භාරගන්න" : lang === "ta" ? "கட்டளை உறுதிப்படுத்தல்" : "Accept & Manage Orders",
      desc: lang === "si" ? "මිල ගණන් සසඳා බලා පහසුවෙන් ඇණවුම භාරදෙන්න." : lang === "ta" ? "விலைகளை ஒப்பிட்டு கட்டளையை உறுதிப்படுத்தவும்." : "Compare quotes, review portfolios, accept terms, and initiate secure milestone orders.",
      tag: "Milestone Management",
    },
    {
      step: "04",
      title: lang === "si" ? "නිෂ්පාදන ප්‍රගතිය නිරීක්ෂණය" : lang === "ta" ? "உற்பத்தி கண்காணிப்பு" : "Track Production & AI Risk Alerts",
      desc: lang === "si" ? "මසන ප්‍රගතිය සජීවීව නිරීක්ෂණය කර ප්‍රමාදයන් වළක්වා ගන්න." : lang === "ta" ? "நேரலை உற்பத்தி நிலையைக் கண்காணிக்கவும்." : "Monitor real-time stitching progress and receive early warning delay alerts.",
      tag: "Risk Analytics",
    },
  ];

  const dressmakerSteps = [
    {
      step: "01",
      title: lang === "si" ? "ප්‍රෝෆයිලය සාදන්න" : lang === "ta" ? "சுயவிவரம் உருவாக்குங்கள்" : "Create Portfolio & Profile",
      desc: lang === "si" ? "ඔබේ මැහුම් කුසලතා සහ පෙර මසන ලද ඇඳුම් ඡායාරූප එක්කරන්න." : lang === "ta" ? "உங்கள் தையல் திறன்களையும் புகைப்படங்களையும் பதிவேற்றுங்கள்." : "Highlight your specialized sewing skills, past garment photos, and weekly capacity.",
      tag: "Verified Badge",
    },
    {
      step: "02",
      title: lang === "si" ? "ආසන්න ඇණවුම් සොයාගන්න" : lang === "ta" ? "கட்டளைகளைக் கண்டறியவும்" : "Discover Nearby Garment Orders",
      desc: lang === "si" ? "ඔබේ ප්‍රදේශයේ ඇඳුම් සාප්පු වලින් ලැබෙන ඇණවුම් පරීක්ෂා කරන්න." : lang === "ta" ? "உங்கள் பகுதி கடைகளின் கட்டளைகளைப் பார்வையிடவும்." : "Browse order requests from local clothing shops matched to your skill level.",
      tag: "Location Matching",
    },
    {
      step: "03",
      title: lang === "si" ? "AI මිල ගණන් සහායෙන් Quote ඉදිරිපත් කරන්න" : lang === "ta" ? "AI விலை மேற்கோள் சமர்ப்பிப்பு" : "Submit Quotes with AI Pricing Assistant",
      desc: lang === "si" ? "AI මගින් තීරණය කරන සාධාරණ මිල ගණන් (LKR) ලබාගන්න." : lang === "ta" ? "AI பரிந்துரைக்கும் சிறந்த விலைகளை (LKR) பெறுங்கள்." : "Receive smart price range suggestions (LKR) based on market demand and difficulty.",
      tag: "Pricing Assistant",
    },
    {
      step: "04",
      title: lang === "si" ? "ධාරිතාව කළමනාකරණය" : lang === "ta" ? "திறன் மேலாண்மை" : "Manage Capacity & Build Reputation",
      desc: lang === "si" ? "නිසි කලට ඇඳුම් භාරදී හොඳම සමාලෝචන ලබාගන්න." : lang === "ta" ? "சரியான நேரத்தில் விநியோகித்து நல்ல மதிப்பீடுகளைப் பெறுங்கள்." : "Update availability calendars, deliver top-quality garments, and earn top ratings.",
      tag: "Capacity Prediction",
    },
  ];

  const steps = activeTab === "shops" ? shopSteps : dressmakerSteps;

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6C4AB6]">
            Seamless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            {t.howItWorksTitle}
          </h2>
          <p className="text-base text-[#6B7280]">
            {t.howItWorksSub}
          </p>

          {/* Toggle Pills */}
          <div className="inline-flex p-1.5 bg-[#EDE7F6]/60 rounded-xl border border-[#6C4AB6]/10 mt-4">
            <button
              onClick={() => setActiveTab("shops")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "shops"
                  ? "bg-[#6C4AB6] text-white shadow-sm"
                  : "text-[#1F2937] hover:text-[#6C4AB6]"
              }`}
            >
              {t.tabForShops}
            </button>
            <button
              onClick={() => setActiveTab("dressmakers")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "dressmakers"
                  ? "bg-[#6C4AB6] text-white shadow-sm"
                  : "text-[#1F2937] hover:text-[#6C4AB6]"
              }`}
            >
              {t.tabForDressmakers}
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F9FAFB] rounded-2xl p-6 border border-gray-100 relative group hover:border-[#6C4AB6]/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-[#6C4AB6]/40 group-hover:text-[#6C4AB6] transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-bold text-[#2A9D8F] bg-[#2A9D8F]/10 px-2.5 py-1 rounded-full border border-[#2A9D8F]/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-2">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-6 border-t border-gray-200/50 mt-6 flex items-center justify-between text-xs font-semibold text-[#6C4AB6]">
                <span>Step {idx + 1} of 4</span>
                <svg className="w-4 h-4 stroke-current group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
