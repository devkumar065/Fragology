export default function MyAccountPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl font-light text-stone-900 mb-8">My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-stone-200 bg-white p-6 rounded-sm space-y-3">
          <h3 className="font-serif text-lg text-stone-900">Account Details</h3>
          <p className="text-xs text-stone-600">Dev Kumar</p>
          <p className="text-xs text-stone-600">dev@fragology.com</p>
          <button className="text-xs uppercase tracking-wider text-stone-900 underline pt-2">Edit Profile</button>
        </div>
        <div className="border border-stone-200 bg-white p-6 rounded-sm space-y-3">
          <h3 className="font-serif text-lg text-stone-900">Recent Orders</h3>
          <p className="text-xs text-stone-500">You have no active orders placed yet.</p>
        </div>
        <div className="border border-stone-200 bg-white p-6 rounded-sm space-y-3">
          <h3 className="font-serif text-lg text-stone-900">Saved Addresses</h3>
          <p className="text-xs text-stone-500">No primary shipping address set.</p>
        </div>
      </div>
    </div>
  );
}
