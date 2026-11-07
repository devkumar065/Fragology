"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-2xl font-serif font-semibold mb-2">Something went wrong</h2>
      <p className="text-stone-600 mb-6">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-stone-900 text-stone-50 text-sm tracking-wide rounded-sm hover:bg-stone-800 transition"
      >
        Try Again
      </button>
    </div>
  );
}
