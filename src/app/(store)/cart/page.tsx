import Link from "next/link";

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-light text-stone-900 mb-8">Shopping Bag</h1>
      <div className="border border-stone-200 bg-white p-12 text-center rounded-sm">
        <p className="text-sm text-stone-600 mb-6">Your fragrance bag is currently empty.</p>
        <Link
          href="/shop"
          className="inline-block px-8 py-3.5 bg-stone-900 text-stone-50 text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-stone-800 transition"
        >
          Explore Collection
        </Link>
      </div>
    </div>
  );
}
