import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 border-t border-neutral-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-sm">
                SL
              </div>
              <span className="font-bold text-lg text-white">StitchLink</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              Empowering Sri Lankan boutique fashion houses and skilled solo dressmakers through direct batch manufacturing partnerships.
            </p>
            <div className="text-xs text-neutral-500">
              Colombo • Kandy • Galle • Kurunegala • Gampaha
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">For Fashion Brands</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop/new-order" className="hover:text-teal-400 transition-colors">
                  Post Garment Batch
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-teal-400 transition-colors">
                  Shop Dashboard
                </Link>
              </li>
              <li>
                <span className="text-neutral-500 text-xs">Quality Inspections & Escrow</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">For Dressmakers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dressmaker/browse" className="hover:text-teal-400 transition-colors">
                  Browse Active Contracts
                </Link>
              </li>
              <li>
                <Link href="/dressmaker" className="hover:text-teal-400 transition-colors">
                  Tailor Workspace
                </Link>
              </li>
              <li>
                <span className="text-neutral-500 text-xs">Guaranteed Timely Payouts</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Garment Categories</h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              <span className="bg-neutral-800 px-2.5 py-1 rounded-md text-neutral-300">Linen Frocks</span>
              <span className="bg-neutral-800 px-2.5 py-1 rounded-md text-neutral-300">Men's Shirts</span>
              <span className="bg-neutral-800 px-2.5 py-1 rounded-md text-neutral-300">Batik Wear</span>
              <span className="bg-neutral-800 px-2.5 py-1 rounded-md text-neutral-300">School Uniforms</span>
              <span className="bg-neutral-800 px-2.5 py-1 rounded-md text-neutral-300">Embroidery</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} StitchLink Sri Lanka. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer">Contact Support (+94 11 234 5678)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
