export default function CheckoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-light text-stone-900 mb-8">Secure Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-stone-900">Shipping Information</h2>
          <input type="text" placeholder="Full Name" className="w-full border p-3 text-xs rounded-sm" />
          <input type="email" placeholder="Email Address" className="w-full border p-3 text-xs rounded-sm" />
          <input type="text" placeholder="Street Address" className="w-full border p-3 text-xs rounded-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="City" className="border p-3 text-xs rounded-sm" />
            <input type="text" placeholder="Postal Code" className="border p-3 text-xs rounded-sm" />
          </div>
        </div>
        <div className="border border-stone-200 bg-white p-6 rounded-sm space-y-4">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-stone-900">Order Summary</h2>
          <div className="flex justify-between text-xs text-stone-600">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between text-xs text-stone-600">
            <span>Complimentary Shipping</span>
            <span>$0.00</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-sm font-medium text-stone-900">
            <span>Total</span>
            <span>$0.00</span>
          </div>
          <button className="w-full py-3.5 bg-stone-900 text-stone-50 text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-stone-800 transition mt-4">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
