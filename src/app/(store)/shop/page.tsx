import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-mono">Catalog</span>
        <h1 className="font-serif text-4xl font-light text-stone-900 mt-2">All Fragrances</h1>
        <p className="text-stone-600 max-w-lg mx-auto text-sm mt-3">
          Explore our complete anthology of extrait de parfum and eau de parfum.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Link key={i} href={`/products/fragrance-${i}`} className="group block border border-stone-200 bg-white p-6 rounded-sm hover:border-stone-400 transition">
            <div className="h-60 bg-stone-100 rounded-sm mb-4 flex items-center justify-center text-stone-400 text-xs font-mono uppercase tracking-widest">
              Fragrance Preview {i}
            </div>
            <h3 className="font-serif text-lg text-stone-900 group-hover:underline">Fragrance Essence #{i}</h3>
            <p className="text-xs text-stone-500 mt-1">Oud, Rose, Saffron, Amber</p>
            <p className="text-sm font-medium text-stone-900 mt-3">$260.00</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
