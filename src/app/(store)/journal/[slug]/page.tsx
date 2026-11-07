import Link from "next/link";

interface JournalSlugProps {
  params: Promise<{ slug: string }>;
}

export default async function JournalArticlePage({ params }: JournalSlugProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-xs text-stone-500 uppercase tracking-widest mb-6">
        <Link href="/journal" className="hover:underline">Journal</Link> / <span>{title}</span>
      </div>

      <h1 className="font-serif text-4xl md:text-5xl font-light text-stone-900 mb-4 leading-tight">{title}</h1>
      <p className="text-xs font-mono text-stone-500 uppercase tracking-widest mb-8">Published by Master Nose in Residence</p>

      <div className="h-72 bg-stone-100 rounded-sm mb-8 flex items-center justify-center text-stone-400 font-mono text-xs uppercase">
        Editorial Feature Photography
      </div>

      <div className="prose prose-stone text-stone-700 leading-relaxed space-y-4 text-sm md:text-base">
        <p>
          Olfactory composition is an intangible architecture built from volatility, vapor pressure, and harmonic chords. Unlike visual art or symphonies, scent engages the limbic brain directly, bypassing analytical cognition.
        </p>
        <p>
          In this monograph, we examine the molecular balance that transforms raw botanical distillates into a memorable, lingering signature.
        </p>
      </div>
    </article>
  );
}
