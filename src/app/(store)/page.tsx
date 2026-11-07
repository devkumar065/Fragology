import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-stone-900 text-stone-50 overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent z-10" />
        <div className="relative z-20 max-w-4xl text-center space-y-6">
          <span className="text-xs tracking-[0.3em] uppercase text-stone-300 font-mono">Artisanal Perfumery</span>
          <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide leading-tight">
            The Architecture of Scent
          </h1>
          <p className="text-stone-300 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Discover rare extracts, harmonious accords, and niche olfactory creations designed to define your aura.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-stone-50 text-stone-950 text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-200 transition"
            >
              Explore Collection
            </Link>
            <Link
              href="/scent-finder"
              className="px-8 py-3.5 border border-stone-400 text-stone-100 text-xs uppercase tracking-[0.2em] font-medium hover:bg-white/10 transition"
            >
              Take Scent Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Teaser */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-mono">Curated Selection</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900">Iconic Fragrances</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Santal Mirage", notes: "Cardamom, Papyrus, Sandalwood", price: "$240" },
            { name: "Velvet Amber", notes: "Bourbon Vanilla, Labdanum, Cedar", price: "$280" },
            { name: "Bergamot Nocturne", notes: "Calabrian Bergamot, Black Tea, Fig", price: "$220" },
          ].map((item, idx) => (
            <div key={idx} className="group border border-stone-200 p-8 rounded-sm hover:shadow-md transition bg-white">
              <div className="h-64 bg-stone-100 mb-6 flex items-center justify-center text-stone-400 text-sm font-mono uppercase tracking-widest">
                Fragrance Bottle
              </div>
              <h3 className="font-serif text-xl text-stone-900 mb-1">{item.name}</h3>
              <p className="text-xs text-stone-500 mb-3">{item.notes}</p>
              <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                <span className="text-sm font-medium text-stone-800">{item.price}</span>
                <Link href="/shop" className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 underline">
                  Discover
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
