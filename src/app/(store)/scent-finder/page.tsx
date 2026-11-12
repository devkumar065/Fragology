"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/product/product-card";
import { PRODUCTS_CATALOG } from "@/data/products";
import { Product } from "@/types/product";

interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: Array<{
    label: string;
    description: string;
    value: string;
  }>;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: "family",
    question: "Which fragrance family do you instinctively gravitate toward?",
    subtitle: "Select the primary aromatic foundation you feel most connected with.",
    options: [
      { label: "Floral", description: "Luminous petals, blooming jasmine, and dewy botanical accords.", value: "Floral" },
      { label: "Woody", description: "Sacred sandalwood, smoky cedar, and grounded roots.", value: "Woody" },
      { label: "Oriental", description: "Opulent amber resins, bourbon vanilla, and warm spices.", value: "Oriental" },
      { label: "Fresh", description: "Crisp Calabrian bergamot, coastal citrus, and marine salt air.", value: "Fresh" },
      { label: "No Preference", description: "Curious to discover any family that resonates with your character.", value: "any" },
    ],
  },
  {
    id: "character",
    question: "Which scent character appeals most to your taste?",
    subtitle: "The dominant tactile texture you appreciate on your skin.",
    options: [
      { label: "Sweet", description: "Warm gourmand nuances of wild honey, tonka bean, and almond.", value: "Sweet" },
      { label: "Fresh", description: "Invigorating citrus, green leaves, and crystalline air.", value: "Fresh" },
      { label: "Spicy", description: "Golden saffron threads, cardamom pods, and crushed peppercorn.", value: "Spicy" },
      { label: "Musky", description: "Intimate skin-scents, velvet leather, and cashmeran.", value: "Musky" },
      { label: "Balanced", description: "Harmonious equilibrium with no single overwhelming facet.", value: "Balanced" },
    ],
  },
  {
    id: "occasion",
    question: "When do you envision wearing this signature composition?",
    subtitle: "The setting where this fragrance will leave its most meaningful presence.",
    options: [
      { label: "Everyday", description: "A comfortable, versatile signature for daily rituals.", value: "Everyday" },
      { label: "Work", description: "Poised, professional, and discreet for focused environments.", value: "Work" },
      { label: "Evening", description: "Nocturnal depth and magnetic warmth for twilight gatherings.", value: "Evening" },
      { label: "Special Occasions", description: "Monumental presence for galas, weddings, and milestones.", value: "Special Occasions" },
      { label: "Any Occasion", description: "A chameleon fragrance that adapts seamlessly to any hour.", value: "any" },
    ],
  },
  {
    id: "intensity",
    question: "What sillage intensity matches your personal style?",
    subtitle: "How close or far your olfactory aura should travel.",
    options: [
      { label: "Light", description: "An intimate skin-scent perceptible only upon close embrace.", value: "Light" },
      { label: "Moderate", description: "A polite, noticeable trail that moves gracefully with your step.", value: "Moderate" },
      { label: "Intense", description: "A commanding, rich concentration with enduring projection.", value: "Intense" },
      { label: "No Preference", description: "Open to whatever intensity naturally suits the composition.", value: "any" },
    ],
  },
  {
    id: "mood",
    question: "Which fragrance mood best describes your aura?",
    subtitle: "The emotional ambiance you wish to project to the world.",
    options: [
      { label: "Elegant", description: "Aristocratic, classic, and effortlessly dignified.", value: "Elegant" },
      { label: "Mysterious", description: "Enigmatic, smoky, and compellingly intriguing.", value: "Mysterious" },
      { label: "Energetic", description: "Luminous, vibrant, and radiantly optimistic.", value: "Energetic" },
      { label: "Romantic", description: "Sensual, tender, and deeply poetic.", value: "Romantic" },
      { label: "Minimal", description: "Clean, architectural, and serene.", value: "Minimal" },
    ],
  },
];

interface RecommendationResult {
  product: Product;
  matchScore: number;
  matchReasons: string[];
}

export default function ScentFinderPage() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[currentStep];

  const handleSelectOption = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) return;

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateRecommendations();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Deterministic Client-Side Recommendation Algorithm
  const calculateRecommendations = () => {
    const scoredProducts: RecommendationResult[] = PRODUCTS_CATALOG.map((product) => {
      let score = 0;
      const reasons: string[] = [];

      // 1. Family Match (Weight: 35)
      if (answers.family && answers.family !== "any") {
        if (product.family === answers.family) {
          score += 35;
          reasons.push(`Perfect match for your preferred ${product.family} olfactive family.`);
        } else if (product.family === "Unisex") {
          score += 20;
          reasons.push("Versatile unisex composition that harmonizes across families.");
        }
      } else {
        score += 20;
      }

      // 2. Character Match (Weight: 20)
      if (answers.character && product.character === answers.character) {
        score += 20;
        reasons.push(`Reflects your desired ${product.character} character profile.`);
      }

      // 3. Occasion Match (Weight: 15)
      if (answers.occasion && answers.occasion !== "any") {
        if (product.occasion === answers.occasion) {
          score += 15;
          reasons.push(`Engineered specifically for ${product.occasion.toLowerCase()} wear.`);
        }
      } else {
        score += 10;
      }

      // 4. Intensity Match (Weight: 15)
      if (answers.intensity && answers.intensity !== "any") {
        if (product.intensity === answers.intensity) {
          score += 15;
          reasons.push(`Possesses your preferred ${product.intensity.toLowerCase()} sillage intensity.`);
        }
      } else {
        score += 10;
      }

      // 5. Mood Match (Weight: 15)
      if (answers.mood && product.mood === answers.mood) {
        score += 15;
        reasons.push(`Evokes an undeniably ${product.mood.toLowerCase()} sensory atmosphere.`);
      }

      return {
        product,
        matchScore: score,
        matchReasons: reasons.slice(0, 3), // Top 3 reasons
      };
    });

    // Sort descending by match score and take top 3
    scoredProducts.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(scoredProducts.slice(0, 3));
    setShowResults(true);
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentStep(0);
    setAnswers({});
    setRecommendations([]);
    setShowResults(false);
  };

  return (
    <div className="py-12 sm:py-20 bg-brand-deep min-h-screen">
      <Container size="default">
        {!started ? (
          /* Intro Screen */
          <div className="max-w-2xl mx-auto text-center space-y-6 py-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-primary/30 bg-brand-espresso/80 text-gold-champagne shadow-gold-subtle">
              <Compass size={28} strokeWidth={1.5} />
            </div>

            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium block">
              DIAGNOSTIC CONSULTATION
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-neutral-ivory tracking-wide leading-tight">
              FIND YOUR SIGNATURE SCENT
            </h1>

            <p className="text-sm sm:text-base text-neutral-muted font-light leading-relaxed max-w-lg mx-auto">
              Discover fragrance profiles that reflect your preferences and personal style. Answer five intuitive questions to match with our master extrait formulations.
            </p>

            <div className="pt-6">
              <Button variant="primary" size="lg" onClick={() => setStarted(true)}>
                START THE EXPERIENCE
              </Button>
            </div>

            <p className="text-[11px] font-mono uppercase tracking-widest text-neutral-muted/60 pt-4">
              5 Questions • 2 Minutes • Deterministic Olfactory Matching
            </p>
          </div>
        ) : !showResults ? (
          /* Active Quiz Question Screen */
          <div className="max-w-2xl mx-auto space-y-8 py-6">
            {/* Progress Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-muted font-mono uppercase tracking-wider">
                <span className="text-gold-champagne">
                  Question {currentStep + 1} of {QUESTIONS.length}
                </span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Completed</span>
              </div>
              <div className="h-1 w-full bg-brand-rich rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold-primary to-gold-champagne transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                {/* Question Text */}
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-neutral-ivory leading-tight">
                    {currentQuestion.question}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-muted font-light">
                    {currentQuestion.subtitle}
                  </p>
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.value;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleSelectOption(opt.value)}
                        className={`w-full p-5 text-left border rounded-xs transition-all flex items-start justify-between space-x-4 ${
                          isSelected
                            ? "border-gold-primary bg-gold-primary/10 text-neutral-ivory shadow-gold-subtle"
                            : "border-border-subtle bg-brand-rich/60 text-neutral-soft hover:border-gold-primary/50 hover:bg-brand-rich"
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-serif text-lg text-neutral-ivory font-light block">
                            {opt.label}
                          </span>
                          <span className="text-xs text-neutral-muted font-light leading-relaxed block">
                            {opt.description}
                          </span>
                        </div>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-1 transition-colors ${
                            isSelected
                              ? "border-gold-primary bg-gold-primary text-brand-deep"
                              : "border-border-subtle bg-brand-deep"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={2.5} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="inline-flex items-center space-x-1 text-xs uppercase tracking-widest text-neutral-muted hover:text-neutral-ivory disabled:opacity-20"
              >
                <ArrowLeft size={14} />
                <span>Previous</span>
              </button>

              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                <span>{currentStep === QUESTIONS.length - 1 ? "Discover Results" : "Next Question"}</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Button>
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="space-y-12 py-6">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-champagne">
                <CheckCircle2 size={24} />
              </div>

              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-gold-champagne font-medium block">
                DIAGNOSTIC CURATION
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-ivory">
                Your Recommended Formulations
              </h2>

              <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
                Based on your selected preferences ({answers.family || "Any"} family, {answers.character} character, {answers.occasion} wear), our client-side matching engine identified these top creations.
              </p>

              <div className="p-3 bg-brand-espresso/60 border border-border-subtle text-[11px] text-neutral-muted max-w-lg mx-auto">
                <span className="text-gold-primary">Diagnostic Note:</span> Matches are computed deterministically from our artisanal olfactive formulation matrix.
              </div>
            </div>

            {/* Recommended Products Grid with Reasons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map((rec, idx) => (
                <div key={rec.product.id} className="space-y-4">
                  {/* Match Score Badge */}
                  <div className="flex items-center justify-between text-xs px-2">
                    <span className="font-mono text-gold-champagne text-[11px]">
                      Match Priority #{idx + 1}
                    </span>
                    <span className="font-mono text-xs text-neutral-ivory bg-gold-primary/10 border border-gold-primary/30 px-2 py-0.5 rounded-xs">
                      {rec.matchScore}% Resonance
                    </span>
                  </div>

                  <ProductCard product={rec.product} />

                  {/* Why this matches you */}
                  <div className="p-4 border border-border-subtle bg-brand-rich/70 rounded-xs space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold-champagne block">
                      Why This Flacon Resonates:
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-muted font-light">
                      {rec.matchReasons.map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start space-x-1.5">
                          <span className="text-gold-primary mt-0.5">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Restart Consultation Button */}
            <div className="pt-8 text-center border-t border-border-subtle">
              <Button variant="secondary" size="md" onClick={handleRestart}>
                <RotateCcw size={14} className="mr-2" />
                Retake Scent Diagnostic
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
