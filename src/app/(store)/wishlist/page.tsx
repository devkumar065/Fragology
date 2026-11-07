import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-light text-stone-900 mb-8">Saved Fragrances</h1>
      <div className="border border-stone-200 bg-white p-12 text-center rounded-sm">
        <p className="text-sm text-stone-600 mb-4">You have not bookmarked any fragrances yet.</p>
        <Link href="/shop" className="text-xs uppercase tracking-wider text-stone-900 underline font-medium">
          Explore Fragology
        </Link>
      </div>
    </div>
  );
}
