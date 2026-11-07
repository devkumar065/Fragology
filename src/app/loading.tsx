import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-brand-deep">
      <Container size="narrow" className="text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border border-gold-primary/20 border-t-gold-primary animate-spin" />
          <span className="absolute font-serif text-lg text-gold-primary font-light">
            F
          </span>
        </div>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-muted">
          Distilling Essence...
        </p>
      </Container>
    </div>
  );
}
