import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-100/60 to-transparent pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          Sri Lanka's 1st Decentralized Garment Manufacturing Network
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          Bridge Your Clothing Brand With{" "}
          <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">
            Expert Solo Dressmakers
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          StitchLink enables fashion boutiques to post batch production orders, receive competitive bids from verified local tailors, inspect samples, and scale manufacturing without factory overheads.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop/new-order"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-600 text-white font-semibold text-base shadow-lg shadow-teal-600/30 hover:bg-teal-700 hover:-translate-y-0.5 transition-all"
          >
            Post a Batch Order (For Shops)
          </Link>
          <Link
            href="/dressmaker/browse"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-neutral-300 text-neutral-800 font-semibold text-base shadow-sm hover:bg-neutral-50 hover:border-neutral-400 hover:-translate-y-0.5 transition-all"
          >
            Find Sewing Work (For Tailors)
          </Link>
        </div>

        {/* Live Marketplace Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white/70 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm text-left">
            <div className="text-3xl font-extrabold text-neutral-900">450+</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Verified Solo Tailors</div>
          </div>
          <div className="p-6 bg-white/70 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm text-left">
            <div className="text-3xl font-extrabold text-teal-600">35,000+</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Pieces Stitched</div>
          </div>
          <div className="p-6 bg-white/70 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm text-left">
            <div className="text-3xl font-extrabold text-neutral-900">18</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Districts Covered</div>
          </div>
          <div className="p-6 bg-white/70 backdrop-blur-sm border border-neutral-200/80 rounded-2xl shadow-sm text-left">
            <div className="text-3xl font-extrabold text-emerald-600">4.9 / 5</div>
            <div className="text-xs font-medium text-neutral-500 mt-1">Quality Satisfaction</div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-neutral-100/70 py-20 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">How It Operates</h2>
            <p className="text-3xl font-extrabold text-neutral-900">Transparent, Guaranteed Batch Production</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Publish Order Spec</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Specify garment type (linen frocks, batik shirts, school uniforms), target quantity, delivery date, and whether fabric will be provided.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Review Quotes & Samples</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Home-based tailors submit piece-rate bids along with sample turnaround times. Inspect dressmaker machine profiles and ratings before awarding.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Inspect & Secure Payout</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Approve stitched samples, track production progress in real-time, and release payment smoothly once the full batch meets finishing standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-2">Specializations</h2>
            <p className="text-3xl font-extrabold text-neutral-900">Garment Categories in Demand</p>
          </div>
          <Link href="/dressmaker/browse" className="text-sm font-semibold text-teal-600 hover:text-teal-700 mt-2 md:mt-0">
            View all open batches →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Linen & Resort Frocks",
              count: "24 Batches Open",
              tag: "High Demand",
              desc: "A-line dresses, wrap frocks, pocket stitching with fine neat seam finishes.",
            },
            {
              title: "Casual & Mandarin Shirts",
              count: "18 Batches Open",
              tag: "Volume Orders",
              desc: "Collar bonding, pocket matching, precision buttonholing for retail shops.",
            },
            {
              title: "Handmade Batik Apparel",
              count: "14 Batches Open",
              tag: "Artisan Craft",
              desc: "Batik skirts, kimonos, tailored silk and handloom sarongs.",
            },
            {
              title: "Uniforms & Schoolwear",
              count: "11 Batches Open",
              tag: "Steady Bulk",
              desc: "Pleated skirts, short-sleeve boy shirts, sports tracksuits and badges.",
            },
          ].map((cat, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-neutral-200 hover:border-teal-500/50 hover:shadow-md transition-all group">
              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                {cat.tag}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 mt-3 group-hover:text-teal-600 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{cat.desc}</p>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-700">
                <span>{cat.count}</span>
                <span className="text-teal-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-700 rounded-3xl p-8 sm:p-14 text-white shadow-xl shadow-teal-700/15 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to manufacture your next collection in Sri Lanka?
            </h2>
            <p className="mt-3 text-teal-100 text-sm sm:text-base leading-relaxed">
              Join dozens of boutique stores and hundreds of independent dressmakers already collaborating on StitchLink.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/register"
              className="px-6 py-3.5 rounded-xl bg-white text-teal-800 font-bold text-sm text-center shadow-md hover:bg-neutral-100 transition-all"
            >
              Register Free Today
            </Link>
            <Link
              href="/dressmaker/browse"
              className="px-6 py-3.5 rounded-xl bg-teal-800/60 border border-teal-400/40 text-white font-semibold text-sm text-center hover:bg-teal-800 transition-all"
            >
              Explore Live Feed
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
