import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 bg-brand-deep text-center">
      <Container size="narrow" className="space-y-6">
        <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-gold-primary">
          Code 404 • Scent Vaporized
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-neutral-ivory tracking-wide">
          The Scent Trail Ends Here
        </h1>
        <p className="text-xs sm:text-sm text-neutral-muted max-w-md mx-auto leading-relaxed font-light">
          The flacon or monograph you are seeking has evaporated or never existed in our current archives.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary">Return to Maison</Button>
          </Link>
          <Link href="/shop">
            <Button variant="secondary">Browse Collection</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
