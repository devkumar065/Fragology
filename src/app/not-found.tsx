import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <span className="text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">404 Error</span>
      <h2 className="text-3xl font-serif font-normal text-stone-900 mb-4">Page Not Found</h2>
      <p className="text-stone-600 max-w-md mb-8">
        The scent trail ends here. The page you are seeking does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="px-6 py-2.5 bg-stone-900 text-stone-50 text-sm tracking-wider uppercase rounded-sm hover:bg-stone-800 transition"
      >
        Return to Fragology
      </Link>
    </div>
  );
}
