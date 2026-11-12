import React from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScentFamilyCard } from "@/components/collections/scent-family-card";
import { SCENT_FAMILIES } from "@/data/scent-families";
import { MotionFadeIn } from "@/components/ui/motion-reveal";

export function ScentFamilies() {
  return (
    <section
      id="collections"
      aria-label="Fragrance Families"
      className="py-20 sm:py-28 bg-brand-rich/60 border-b border-border-subtle"
    >
      <Container size="wide">
        <MotionFadeIn direction="up">
          <SectionHeading
            eyebrow="OLFACITVE ANTHOLOGY"
            heading="FIND YOUR FRAGRANCE"
            description="Explore distinct fragrance families and discover the character that speaks to you."
            className="mb-14 sm:mb-20 text-center"
          />
        </MotionFadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SCENT_FAMILIES.map((family, idx) => (
            <MotionFadeIn key={family.id} delay={idx * 0.1} direction="up">
              <ScentFamilyCard family={family} />
            </MotionFadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ScentFamilies;
