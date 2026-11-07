import Link from "next/link";

export default function CollectionsPage() {
  const collections = [
    { slug: "oriental-amber", name: "Oriental & Amber", count: "8 Fragrances" },
    { slug: "fresh-aquatic", name: "Fresh & Aquatic", count: "6 Fragrances" },
    { slug: "woody-leathery", name: "Woody & Leathery", count: "10 Fragrances" },
    { slug: "floral-botanical", name: "Floral & Botanical", count: "7 Fragrances" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-mono">Curated Edits</span>
        <h1 className="font-serif text-4xl font-light text-stone-900 mt-2">Collections</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group block border border-stone-200 bg-white p-10 rounded-sm hover:border-stone-400 transition"
          >
            <div className="h-64 bg-stone-100 mb-6 flex items-center justify-center text-stone-400 font-mono text-xs uppercase tracking-widest">
              Collection Artwork
            </div>
            <h2 className="font-serif text-2xl text-stone-900 group-hover:underline">{col.name}</h2>
            <p className="text-xs text-stone-500 mt-1">{col.count}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
