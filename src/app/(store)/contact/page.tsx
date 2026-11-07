export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-light text-stone-900 mb-2">Concierge & Inquiries</h1>
      <p className="text-sm text-stone-600 mb-8">
        Our fragrance advisors are at your disposal for consultations, bespoke orders, and client assistance.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">Full Name</label>
          <input type="text" className="w-full border border-stone-300 p-3 text-sm rounded-sm bg-white" placeholder="Lord Byron" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">Email Address</label>
          <input type="email" className="w-full border border-stone-300 p-3 text-sm rounded-sm bg-white" placeholder="byron@fragology.com" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">Subject</label>
          <input type="text" className="w-full border border-stone-300 p-3 text-sm rounded-sm bg-white" placeholder="Product Inquiry / Bespoke Order" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">Message</label>
          <textarea rows={5} className="w-full border border-stone-300 p-3 text-sm rounded-sm bg-white" placeholder="How may we assist your olfactive journey?" />
        </div>
        <button type="submit" className="px-8 py-3 bg-stone-950 text-stone-50 text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-stone-800 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}
