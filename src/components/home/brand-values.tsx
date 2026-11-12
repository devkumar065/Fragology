import React from "react";
import { Compass, Gem, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionFadeIn } from "@/components/ui/motion-reveal";

export function BrandValues() {
  const values = [
    {
      icon: <Compass size={22} className="text-gold-primary" strokeWidth={1.25} />,
      title: "Thoughtful Composition",
      copy: "Every fragrance begins with a carefully considered creative direction.",
    },
    {
      icon: <Gem size={22} className="text-gold-primary" strokeWidth={1.25} />,
      title: "Distinctive Character",
      copy: "Expressions of fragrance created to complement individual style.",
    },
    {
      icon: <Clock size={22} className="text-gold-primary" strokeWidth={1.25} />,
      title: "Timeless Expression",
      copy: "An appreciation for elegance that goes beyond passing trends.",
    },
  ];

  return (
    <section
      id="values"
      aria-label="Brand Values and Craftsmanship"
      className="py-20 sm:py-28 bg-brand-deep border-b border-border-subtle"
    >
      <Container size="wide">
        <MotionFadeIn direction="up">
          <SectionHeading
            eyebrow="OUR PHILOSOPHY"
            heading="CRAFTED WITH INTENTION"
            description="Principles guiding our olfactory compositions, formulations, and presentation."
            className="mb-14 sm:mb-20 text-center"
          />
        </MotionFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map((val, idx) => (
            <MotionFadeIn
              key={val.title}
              delay={idx * 0.15}
              direction="up"
              className={`flex flex-col items-center text-center space-y-4 p-8 border border-border-subtle bg-surface-card rounded-xs transition-colors duration-300 hover:border-gold-primary/60 shadow-luxury-card ${
                idx === 1 ? "md:border-gold-primary/50" : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-primary/30 bg-brand-deep shadow-gold-subtle transition-transform duration-300 hover:scale-105">
                {val.icon}
              </div>
              <h3 className="font-serif text-2xl font-light text-neutral-ivory tracking-wide">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light max-w-xs">
                {val.copy}
              </p>
            </MotionFadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default BrandValues;
