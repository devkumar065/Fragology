import Link from "next/link";

interface CollectionSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionDetailPage({ params }: CollectionSlugPageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-xs text-stone-500 uppercase tracking-widest mb-6">
        <Link href="/collections" className="hover:underline">Collections</Link> / <span>{title}</span>
      </div>

      <h1 className="font-serif text-4xl text-stone-900 font-light mb-4">{title}</h1>
      <p className="text-stone-600 max-w-xl text-sm leading-relaxed mb-12">
        A focused ensemble exploring the distinct nuances and characteristics of the {title} family.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Link key={i} href={`/products/${slug}-perfume-${i}`} className="border border-stone-200 p-6 bg-white hover:border-stone-400 transition">
            <div className="h-56 bg-stone-100 mb-4 flex items-center justify-center text-stone-400 text-xs font-mono uppercase">
              Item {i}
            </div>
            <h3 className="font-serif text-base text-stone-900">{title} Edition #{i}</h3>
            <p className="text-xs text-stone-500 mt-1">$250.00</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
