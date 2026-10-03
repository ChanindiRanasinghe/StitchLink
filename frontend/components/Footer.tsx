"use client";

interface FooterProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  onOpenAdminAuth?: () => void;
}

export default function Footer({ currentLang, onLanguageChange, onOpenAdminAuth }: FooterProps) {
  return (
    <footer className="bg-[#1F2937] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6C4AB6] flex items-center justify-center text-white font-bold">
                🪡
              </div>
              <span className="text-xl font-bold tracking-tight">
                Stitch<span className="text-[#6C4AB6]">Link</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Sri Lanka&apos;s leading B2B clothing marketplace connecting apparel businesses with skilled solo and home-based dressmakers through AI matching and production risk analytics.
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="font-semibold text-emerald-400">● Platform Status: Operational</span>
              <span>• Colombo, Sri Lanka</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Marketplace</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#marketplace" className="hover:text-white transition-colors">Discover Dressmakers</a></li>
              <li><a href="#marketplace" className="hover:text-white transition-colors">Order Requests</a></li>
              <li><a href="#ai-features" className="hover:text-white transition-colors">AI Pricing Assistant</a></li>
              <li><a href="#ai-features" className="hover:text-white transition-colors">Category Validation</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Garment Categories</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><span>Frock & Dresses</span></li>
              <li><span>Trousers & Pants</span></li>
              <li><span>Formal Shirts</span></li>
              <li><span>School & Work Uniforms</span></li>
              <li><span>Traditional Sarees & Batik</span></li>
            </ul>
          </div>

          {/* Language & Regional */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">Language & Region</h4>
            <div className="space-y-2">
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 text-xs font-semibold text-white rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              >
                <option value="en">English (US/LK)</option>
                <option value="si">සිංහල (Sinhala)</option>
                <option value="ta">தமிழ் (Tamil)</option>
              </select>
              <p className="text-[11px] text-gray-400">
                Supports trilingual operations across Sri Lankan districts.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} StitchLink B2B Garment Marketplace. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            {onOpenAdminAuth && (
              <button
                onClick={onOpenAdminAuth}
                className="text-purple-400 font-bold hover:text-purple-300 flex items-center gap-1 border border-purple-900/60 bg-purple-950/40 px-2.5 py-1 rounded-md"
              >
                🔒 Admin Security Portal
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
