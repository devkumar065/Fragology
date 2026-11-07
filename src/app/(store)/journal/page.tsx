import Link from "next/link";

export default function JournalPage() {
  const articles = [
    { slug: "the-secrets-of-orris-root", title: "The Secrets of Orris Root: Liquid Gold of Florence", date: "October 14, 2026", category: "Ingredients" },
    { slug: "olfactive-memory-and-emotion", title: "Why Scent Evokes Emotion More Deeply Than Sight", date: "September 28, 2026", category: "Science" },
    { slug: "layering-niche-perfumes", title: "The High Art of Olfactive Layering", date: "August 19, 2026", category: "Guides" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-mono">The Gazette</span>
        <h1 className="font-serif text-4xl font-light text-stone-900 mt-2">Fragology Journal</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => (
          <Link key={art.slug} href={`/journal/${art.slug}`} className="group block border border-stone-200 bg-white p-6 rounded-sm hover:border-stone-400 transition">
            <div className="h-48 bg-stone-100 mb-4 flex items-center justify-center text-stone-400 text-xs font-mono uppercase">
              Article Image
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500">{art.category} • {art.date}</span>
            <h2 className="font-serif text-xl text-stone-900 group-hover:underline mt-2">{art.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
