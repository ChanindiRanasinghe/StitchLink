"use client";

export default function TestimonialsSection() {
  const reviews = [
    {
      quote:
        "StitchLink transformed how we source bulk frock orders for our retail stores. The AI category check saved us from ordering errors three times already!",
      name: "Dilini Fernando",
      role: "Founder, Urban Attire Boutique",
      location: "Colombo 03",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote:
        "As a home-based seamstress, finding consistent shop buyers used to be difficult. With StitchLink's AI pricing tool, I get fair rates for my stitching work.",
      name: "Nisansala Ranasinghe",
      role: "Solo Dressmaker (15 yrs exp)",
      location: "Kandy",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote:
        "The production risk alert notified us when a dressmaker hit a capacity bottleneck, allowing us to adjust deadlines seamlessly without disappointing customers.",
      name: "Mohamed Rilwan",
      role: "Operations Lead, LinenCraft Ltd",
      location: "Galle",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6C4AB6]">
            Community Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937]">
            Trusted by Shops & Dressmakers Nationwide
          </h2>
          <p className="text-base text-[#6B7280]">
            Hear how StitchLink is modernizing garment sourcing and empowering independent dressmakers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#F9FAFB] rounded-2xl p-6 border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm text-[#1F2937] italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-200/60">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#6C4AB6]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1F2937]">{rev.name}</h4>
                  <p className="text-xs text-[#6B7280]">{rev.role} • {rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
