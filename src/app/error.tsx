"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Fragology error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-brand-deep text-center">
      <Container size="narrow" className="space-y-6">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-primary">
          Exception Intercepted
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory">
          An Unexpected Disturbance Occurred
        </h2>
        <p className="text-xs sm:text-sm text-neutral-muted max-w-md mx-auto leading-relaxed font-light">
          {error.message ||
            "Our olfactory archives temporarily encountered an interruption. Please refresh or retry your inquiry."}
        </p>
        <div className="pt-2">
          <Button variant="secondary" onClick={() => reset()}>
            Retry Experience
          </Button>
        </div>
      </Container>
    </div>
  );
}
