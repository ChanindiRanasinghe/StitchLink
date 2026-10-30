import Link from "next/link";

const currentYear = 2026;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-sm font-black text-white">
                SL
              </div>
              <span className="text-lg font-black text-white">StitchLink</span>
            </div>
            <p className="max-w-xs text-sm leading-7 text-slate-400">
              Connecting boutique stores with skilled local dressmakers for transparent, flexible stitch production across Sri Lanka.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">For brands</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/shop/new-order" className="transition hover:text-teal-300">Post a batch order</Link></li>
              <li><Link href="/shop" className="transition hover:text-teal-300">Shop dashboard</Link></li>
              <li><span>Quality checks & reviews</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">For makers</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/dressmaker/browse" className="transition hover:text-teal-300">Browse open jobs</Link></li>
              <li><Link href="/dressmaker" className="transition hover:text-teal-300">Tailor workspace</Link></li>
              <li><span>Guaranteed production visibility</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">Categories</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-800 px-2.5 py-1.5 text-slate-300">Linen frocks</span>
              <span className="rounded-full bg-slate-800 px-2.5 py-1.5 text-slate-300">Shirts</span>
              <span className="rounded-full bg-slate-800 px-2.5 py-1.5 text-slate-300">Batik</span>
              <span className="rounded-full bg-slate-800 px-2.5 py-1.5 text-slate-300">Schoolwear</span>
              <span className="rounded-full bg-slate-800 px-2.5 py-1.5 text-slate-300">Uniforms</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} StitchLink Sri Lanka.</p>
          <div className="flex flex-wrap gap-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
