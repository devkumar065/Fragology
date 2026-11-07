import React from "react";
import { Sparkles, Compass, Feather } from "lucide-react";
import { Container } from "@/components/ui/container";

export function BenefitsStrip() {
  const benefits = [
    {
      icon: <Sparkles size={20} className="text-gold-primary" strokeWidth={1.5} />,
      title: "Carefully Composed Fragrances",
      description:
        "Every formulation balances rare botanical absolutes and disciplined olfactory harmony.",
    },
    {
      icon: <Compass size={20} className="text-gold-primary" strokeWidth={1.5} />,
      title: "Distinctive Scent Profiles",
      description:
        "Unique aromatic expressions sculpted to complement individual character and personal aura.",
    },
    {
      icon: <Feather size={20} className="text-gold-primary" strokeWidth={1.5} />,
      title: "Crafted for Lasting Impressions",
      description:
        "Enduring sillage and depth designed to leave an indelible, elegant sensory memory.",
    },
  ];

  return (
    <section
      id="benefits"
      aria-label="Brand Benefits"
      className="py-12 sm:py-16 bg-brand-rich border-b border-border-subtle"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`flex flex-col items-center text-center space-y-3 px-4 ${
                index < benefits.length - 1
                  ? "md:border-r md:border-border-subtle/60"
                  : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-primary/30 bg-brand-deep/80 shadow-gold-subtle">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-neutral-ivory tracking-wide">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light max-w-xs">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default BenefitsStrip;
