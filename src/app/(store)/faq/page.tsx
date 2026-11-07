export default function FAQPage() {
  const faqs = [
    { q: "What is the concentration of your fragrances?", a: "All Fragology mainline perfumes are formulated as Extrait de Parfum with an oil concentration of 25% to 32%, ensuring exceptional longevity and projection." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 70 countries worldwide via temperature-controlled courier networks." },
    { q: "Are Fragology creations cruelty-free and vegan?", a: "Yes, 100% of our products are cruelty-free, and we utilize ethical, lab-synthesized accords for notes historically derived from fauna (e.g. Ambergris, Musk, Civet)." },
    { q: "Can I sample before purchasing a full flacon?", a: "Our Discovery Set includes 5 x 2ml atomizers along with a voucher creditable towards your first 100ml purchase." },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-light text-stone-900 mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="border border-stone-200 bg-white p-6 rounded-sm">
            <h3 className="font-serif text-lg text-stone-900 mb-2">{f.q}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
