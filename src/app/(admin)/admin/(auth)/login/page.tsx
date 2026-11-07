export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 p-6">
      <div className="w-full max-w-md bg-stone-900 border border-stone-800 p-8 rounded-lg text-stone-100 shadow-xl">
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-stone-400">Fragology</span>
          <h1 className="text-2xl font-serif mt-1 font-light tracking-wide">Admin Portal</h1>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-stone-800 border border-stone-700 p-2.5 text-xs rounded text-stone-100 focus:outline-none focus:border-stone-500"
              placeholder="admin@fragology.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-stone-800 border border-stone-700 p-2.5 text-xs rounded text-stone-100 focus:outline-none focus:border-stone-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-stone-100 text-stone-900 font-medium text-xs uppercase tracking-[0.2em] rounded hover:bg-white transition"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
