export default function OrderTrackingPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="font-serif text-3xl font-light text-stone-900 mb-4">Track Your Order</h1>
      <p className="text-sm text-stone-600 mb-8">
        Enter your order reference code and billing email address to check delivery transit status.
      </p>
      <form className="space-y-4 text-left">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">Order ID</label>
          <input type="text" placeholder="e.g. FRG-948102" className="w-full border p-3 text-xs rounded-sm" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-700 mb-1">Billing Email</label>
          <input type="email" placeholder="you@domain.com" className="w-full border p-3 text-xs rounded-sm" />
        </div>
        <button type="submit" className="w-full py-3 bg-stone-900 text-stone-50 text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-stone-800 transition">
          Locate Consignment
        </button>
      </form>
    </div>
  );
}
