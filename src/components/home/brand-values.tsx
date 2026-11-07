import React from "react";
import { Compass, Sparkles, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function BrandValues() {
  const values = [
    {
      icon: <Compass size={22} className="text-gold-primary" strokeWidth={1.5} />,
      title: "Thoughtful Composition",
      copy: "Every fragrance begins with a carefully considered creative direction.",
    },
    {
      icon: <Sparkles size={22} className="text-gold-primary" strokeWidth={1.5} />,
      title: "Distinctive Character",
      copy: "Expressions of fragrance created to complement individual style.",
    },
    {
      icon: <Clock size={22} className="text-gold-primary" strokeWidth={1.5} />,
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
        <SectionHeading
          eyebrow="OUR PHILOSOPHY"
          heading="CRAFTED WITH INTENTION"
          description="Principles guiding our olfactory compositions, formulations, and presentation."
          className="mb-14 sm:mb-20 text-center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {values.map((val, idx) => (
            <div
              key={val.title}
              className={`flex flex-col items-center text-center space-y-4 p-8 border border-border-subtle/50 bg-brand-rich/40 rounded-xs ${
                idx === 1 ? "md:border-gold-primary/40 bg-brand-rich/70" : ""
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-primary/30 bg-brand-deep shadow-gold-subtle">
                {val.icon}
              </div>
              <h3 className="font-serif text-2xl font-light text-neutral-ivory tracking-wide">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-muted leading-relaxed font-light max-w-xs">
                {val.copy}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default BrandValues;
