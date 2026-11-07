import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const formattedTitle = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
      <div className="text-xs text-stone-500 uppercase tracking-widest mb-8">
        <Link href="/shop" className="hover:underline">Shop</Link> / <span>{formattedTitle}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="h-[500px] bg-stone-100 rounded-sm flex items-center justify-center text-stone-400 font-mono text-sm tracking-widest uppercase">
          {formattedTitle} Image
        </div>
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500">Extrait de Parfum • 100ml</span>
          <h1 className="font-serif text-4xl text-stone-900 font-light">{formattedTitle}</h1>
          <p className="text-2xl font-light text-stone-800">$260.00</p>
          
          <div className="border-t border-b border-stone-200 py-4 space-y-2">
            <div className="text-xs font-medium uppercase tracking-wider text-stone-700">Fragrance Pyramid</div>
            <p className="text-xs text-stone-600"><strong className="text-stone-900">Top:</strong> Bergamot, Pink Pepper</p>
            <p className="text-xs text-stone-600"><strong className="text-stone-900">Heart:</strong> Iris, Jasmine Sambac</p>
            <p className="text-xs text-stone-600"><strong className="text-stone-900">Base:</strong> Ambergris, Sandalwood, White Musk</p>
          </div>

          <p className="text-sm text-stone-600 leading-relaxed">
            An enveloping olfactive composition evoking serene landscapes and refined intimacy. Formulated with maximum oil concentration for enduring longevity and projection.
          </p>

          <div className="pt-4 space-y-3">
            <button className="w-full py-4 bg-stone-950 text-stone-50 text-xs font-medium uppercase tracking-[0.2em] hover:bg-stone-800 transition">
              Add to Shopping Cart
            </button>
            <button className="w-full py-3.5 border border-stone-300 text-stone-900 text-xs font-medium uppercase tracking-[0.2em] hover:bg-stone-100 transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
