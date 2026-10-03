"use client";

import { Language, translations } from "@/lib/translations";

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function UserGuideModal({ isOpen, onClose, lang }: UserGuideModalProps) {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative space-y-5 animate-in fade-in zoom-in-95">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#2A9D8F] flex items-center justify-center font-bold text-xl">
            💡
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1F2937]">
              {lang === "si" ? "ස්ටිච්ලින්ක් භාවිතා කරන්නේ කෙසේද?" : lang === "ta" ? "ஸ்டிச்லின்க் பயன்படுத்துவது எப்படி?" : "How to Use StitchLink"}
            </h3>
            <p className="text-xs text-[#6B7280]">
              {lang === "si" ? "සරල පියවර 3 කින් ආරම්භ කරන්න" : lang === "ta" ? "3 எளிய படிகளில் தொடங்குங்கள்" : "Simple 3-step beginner guide"}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-[#1F2937]">
          
          <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100 space-y-1">
            <h4 className="font-bold text-[#6C4AB6] flex items-center gap-1.5">
              <span>🏢</span> {lang === "si" ? "1. ඇඳුම් සාප්පු සඳහා (For Shops)" : lang === "ta" ? "1. கடைகளுக்கு" : "1. For Clothing Shops"}
            </h4>
            <p className="text-[#6B7280] leading-relaxed">
              {lang === "si"
                ? "නව ඇණවුමක් (Frock, Trouser, Shirt) ඇතුළත් කරන්න. අපගේ AI පද්ධතිය මගින් ගැලපෙන ආසන්නතම මසා නිමකරන්නන් සොයා දෙනු ඇත."
                : lang === "ta"
                ? "புதிய கட்டளையை உள்ளிடுங்கள். AI முறைமை சிறந்த தையல்காரர்களைக் கண்டறியும்."
                : "Create an order request with quantity & category. AI automatically matches verified local dressmakers with zero category errors."}
            </p>
          </div>

          <div className="p-3.5 bg-teal-50 rounded-xl border border-teal-100 space-y-1">
            <h4 className="font-bold text-[#2A9D8F] flex items-center gap-1.5">
              <span>🪡</span> {lang === "si" ? "2. මසා නිමකරන්නන් සඳහා (For Dressmakers)" : lang === "ta" ? "2. தையல்காரர்களுக்கு" : "2. For Solo Dressmakers"}
            </h4>
            <p className="text-[#6B7280] leading-relaxed">
              {lang === "si"
                ? "ඔබගේ ඇඳුම් ඡායාරූප (Portfolio) එක්කරන්න. සාප්පු වලින් ලැබෙන ඇණවුම් සඳහා AI මිල ගණන් සහාය ඇතිව quotation ඉදිරිපත් කරන්න."
                : lang === "ta"
                ? "உங்கள் ஆடை புகைப்படங்களை பதிவேற்றுங்கள். AI விலை வழிகாட்டலுடன் மேற்கோள்களை அனுப்புங்கள்."
                : "Showcase your portfolio photos. Receive matched shop orders and use the AI Pricing Assistant to submit fair LKR quotes."}
            </p>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
            <h4 className="font-bold text-emerald-700 flex items-center gap-1.5">
              <span>🌐</span> {lang === "si" ? "3. භාෂාව මාරු කිරීම (Language Switcher)" : lang === "ta" ? "3. மொழி மாற்றம்" : "3. Language Switcher"}
            </h4>
            <p className="text-[#6B7280] leading-relaxed">
              {lang === "si"
                ? "ඉහළ ඇති භාෂා තේරීමෙන් (English, සිංහල, தமிழ்) ඕනෑම වේලාවක ඔබේ මව් භාෂාවට මාරු විය හැක."
                : lang === "ta"
                ? "மேலே உள்ள மொழித் தேர்வில் உங்கள் மொழியை எப்போது வேண்டுமானாலும் மாற்றலாம்."
                : "Toggle between English, Sinhala (සිංහල), and Tamil (தமிழ்) anytime from the top bar or footer."}
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#6C4AB6] text-white font-bold py-2.5 rounded-xl text-xs shadow-sm"
        >
          {lang === "si" ? "තේරුම් ගතිමි / ඉදිරියට යන්න" : lang === "ta" ? "புரிந்தது" : "Got it, continue"}
        </button>

      </div>
    </div>
  );
}
