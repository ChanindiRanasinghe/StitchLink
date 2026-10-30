import Link from "next/link";

const stats = [
  { value: "450+", label: "Verified tailors", accent: "text-teal-600" },
  { value: "35k+", label: "Pieces stitched", accent: "text-emerald-600" },
  { value: "18", label: "Districts covered", accent: "text-slate-900" },
  { value: "4.9/5", label: "Satisfaction rate", accent: "text-amber-500" },
];

const categories = [
  { title: "Linen & Resort Frocks", count: "24 batches open", tag: "High demand", desc: "Lightweight dressmaking with premium finishing and neat pocket detailing." },
  { title: "Casual & Mandarin Shirts", count: "18 batches open", tag: "Volume work", desc: "Retail-ready shirts for boutiques, uniforms, and hospitality collections." },
  { title: "Handmade Batik Apparel", count: "14 batches open", tag: "Artisan craft", desc: "Hand-loom textures, batik finishes, and detail-rich fashion pieces." },
  { title: "Uniforms & Schoolwear", count: "11 batches open", tag: "Steady bulk", desc: "Reliable, repeatable production for schools, uniforms, and staffwear." },
];

const steps = [
  {
    step: "01",
    title: "Post your batch order",
    text: "Describe the garment style, quantity, budget, district, and the finishing details you care about most.",
  },
  {
    step: "02",
    title: "Compare tailored quotes",
    text: "Review verified dressmakers, sample turnaround time, pricing, and experience before awarding work.",
  },
  {
    step: "03",
    title: "Track production with confidence",
    text: "Monitor progress and approve each batch with transparent communication and a smoother payment flow.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.18),_transparent_60%)]" />

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-200 bg-white/80 text-[11px] font-semibold tracking-[0.14em] text-teal-700 uppercase shadow-sm backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
          Sri Lanka’s garment network
        </div>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="max-w-xl text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl xl:text-7xl">
              Factory-grade sewing,
              <span className="block bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                without the factory overhead.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              StitchLink connects boutique stores and emerging fashion brands with vetted Sri Lankan dressmakers for flexible, transparent batch production.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop/new-order"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Post a batch order
              </Link>
              <Link
                href="/dressmaker/browse"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700"
              >
                Explore live jobs
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Verified dressmakers
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500" />
                Transparent bidding
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                On-time delivery
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-5 top-10 h-24 w-24 rounded-full bg-teal-200/60 blur-3xl" />
            <div className="absolute -right-5 bottom-10 h-24 w-24 rounded-full bg-cyan-200/60 blur-3xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 p-5 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] backdrop-blur-sm">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Live feed</p>
                    <h2 className="mt-2 text-xl font-bold text-slate-900">Open garment batches</h2>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">8 active</span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    { title: "80 Linen Summer Frocks", price: "Rs 42,500", status: "Open" },
                    { title: "120 Mandarin Shirts", price: "Rs 96,000", status: "Open" },
                    { title: "80 Batik Wrap Sets", price: "Rs 76,000", status: "Reviewing" },
                  ].map((job) => (
                    <div key={job.title} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{job.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{job.price}</p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${job.status === "Open" ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
              <div className={`text-3xl font-black tracking-tight ${stat.accent}`}>{stat.value}</div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative border-y border-slate-200 bg-slate-50/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">How it works</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900 sm:text-4xl">
              Smarter production for modern fashion businesses
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-sm font-black text-white shadow-md shadow-teal-500/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Popular categories</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-900 sm:text-4xl">What brands are ordering right now</h2>
          </div>
          <Link href="/dressmaker/browse" className="inline-flex items-center text-sm font-semibold text-teal-700 transition hover:text-teal-800">
            View live orders <span className="ml-2">→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.title} className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl">
              <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-700">
                {cat.tag}
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{cat.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{cat.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-medium text-slate-700">
                <span>{cat.count}</span>
                <span className="text-xl text-teal-600 transition group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 p-8 shadow-[0_35px_80px_-35px_rgba(13,148,136,0.75)] sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">Built for growth</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
                Ready to scale your next collection with trusted local makers?
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-100">
                Register free
              </Link>
              <Link href="/dressmaker/browse" className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore the feed
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
