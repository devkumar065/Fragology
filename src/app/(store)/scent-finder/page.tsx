export default function ScentFinderPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <span className="text-xs font-mono uppercase tracking-[0.25em] text-stone-500">Interactive Diagnostic</span>
      <h1 className="font-serif text-4xl font-light text-stone-900 mt-2 mb-4">The Scent Finder Quiz</h1>
      <p className="text-stone-600 text-sm max-w-lg mx-auto mb-10 leading-relaxed">
        Answer four intuitive questions regarding your aesthetic inclinations, preferred environments, and moods to discover your signature fragrance.
      </p>

      <div className="bg-white border border-stone-200 p-8 rounded-sm text-left space-y-6">
        <div className="text-xs font-mono uppercase text-stone-400">Step 1 of 4</div>
        <h3 className="font-serif text-xl text-stone-900">Which environment brings you serenity?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["A secluded cedar cabin in the misty rain", "A Mediterranean sunlit citrus grove", "A dimly lit jazz club filled with warm spices", "A royal Parisian botanical greenhouse"].map((opt, i) => (
            <button key={i} className="p-4 border border-stone-200 rounded text-left text-xs hover:border-stone-800 hover:bg-stone-50 transition">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
