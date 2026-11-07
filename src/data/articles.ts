import { Article } from "@/types/article";

export const ARTICLES_DATA: Article[] = [
  {
    id: "the-secrets-of-orris-root",
    slug: "the-secrets-of-orris-root",
    title: "The Secrets of Orris Root: Liquid Gold of Florence",
    subtitle: "Why the rhizome of the iris flower takes five years to yield its sacred butter.",
    category: "Ingredients & Inspiration",
    publishedDate: "October 14, 2026",
    readTime: "5 min read",
    author: "Maison Editorial Desk",
    excerpt:
      "Perfumery's most coveted botanical extract is not a petal, but a root that must dry in silence for three years before distillation.",
    featured: true,
    content: {
      leadParagraph:
        "In the rolling hills surrounding Florence, the pale purple blooms of Iris pallida appear for only a few fleeting weeks each spring. Yet master perfumers disregard the blossoms entirely. The true treasure lies underground.",
      sections: [
        {
          heading: "The Ritual of Maturation",
          body: [
            "Unlike floral absolutes distilled immediately upon harvest, orris rhizomes possess virtually no scent when fresh from the earth. The irones—the molecular compounds responsible for the root's signature powdery, velvety, and violet-like aroma—develop only through slow oxidative dehydration.",
            "The roots are cleaned by hand, peeled, and dried in dark, climate-controlled storerooms for three to five years before they can be pulverized and steam-distilled into orris butter.",
          ],
          quote: "Orris does not merely smell like luxury; it behaves like time itself given liquid form.",
        },
        {
          heading: "The Role in High Perfumery",
          body: [
            "Because it requires several tons of mature rhizomes to yield a single kilogram of pure butter, orris butter remains among the most precious materials in fine fragrance compounding.",
            "In Fragology extraits, orris acts as an incomparable bridge: it softens harsh leathery facets, lends creamy weight to aldehydes, and fixes fleeting heart accords to the skin for remarkable longevity.",
          ],
        },
      ],
    },
  },
  {
    id: "the-architecture-of-sillage",
    slug: "the-architecture-of-sillage",
    title: "The Architecture of Sillage: Understanding Projection and Longevity",
    subtitle: "A technical exploration of molecular vapor pressure and lingering sensory memory.",
    category: "Fragrance Education",
    publishedDate: "September 28, 2026",
    readTime: "7 min read",
    author: "Olfactive Research Group",
    excerpt:
      "Sillage is the French word for the wake left by a boat across calm water. In fragrance, it describes the invisible trail you leave behind.",
    content: {
      leadParagraph:
        "The difference between an ordinary cologne and a monumental extrait de parfum lies not simply in oil concentration, but in vapor kinetics. How molecules leave the skin and disperse through the surrounding room is an exacting physics.",
      sections: [
        {
          heading: "Vapor Pressure and Molecular Weights",
          body: [
            "Top notes—such as the zesty monoterpenes in bergamot or pink pepper—possess high vapor pressure. They volatilize rapidly at body temperature, creating immediate sensory impact within the first fifteen minutes.",
            "Base notes like labdanum, synthetic ambergris accords, and sesquiterpenes in sandalwood possess massive molecular structures and low vapor pressure. They anchor to the epidermal lipid layer, releasing their aura steadily over twelve to twenty-four hours.",
          ],
        },
        {
          heading: "The Philosophy of Restraint",
          body: [
            "True luxury sillage does not overpower an elevator or announce itself before you enter a salon. It creates an aura: an invitation to step closer, noticeable primarily when you move or when a warm breeze passes through the room.",
          ],
          quote: "A distinguished fragrance whispers intimately rather than shouting in the crowd.",
        },
      ],
    },
  },
  {
    id: "layering-niche-perfumes",
    slug: "layering-niche-perfumes",
    title: "The High Art of Olfactive Layering",
    subtitle: "Guiding principles for creating bespoke harmonious combinations without cacophony.",
    category: "Scent Guides",
    publishedDate: "August 19, 2026",
    readTime: "6 min read",
    author: "Bespoke Concierge",
    excerpt:
      "Layering is not about spraying two perfumes indiscriminately. It is a mindful dialogue between complementary accords.",
    content: {
      leadParagraph:
        "In Middle Eastern fragrance traditions, perfumery is inherently layered: heavy oils of oud and amber are applied to pulse points first, followed by an alcohol mist of damask rose or orange blossom to lift the composition into the air.",
      sections: [
        {
          heading: "The Golden Rule: Heavy to Light",
          body: [
            "Always apply the heaviest, most resinous fragrance first (woody, leathery, or amber extraits). Allow the base to settle onto skin for sixty seconds before misting a fresher, lighter floral or citrus creation over top.",
            "This ensures the heavier molecules do not smother the sparkling top notes of the lighter fragrance.",
          ],
        },
        {
          heading: "Contrasting vs. Harmonizing",
          body: [
            "You can choose to harmonize (pairing two woody scents like Santal Nocturne with Velvet Essence to deepen cedarwood facets) or contrast (pairing a crisp citrus like Solaris Citron over an opulent amber base like Golden Reverie).",
          ],
        },
      ],
    },
  },
  {
    id: "rediscovering-modern-chypres",
    slug: "rediscovering-modern-chypres",
    title: "The Return of Chypres: Rediscovering Modern Complexity",
    subtitle: "Tracing the contrast between sparkling bergamot and earthy moss.",
    category: "Fragrance Notes",
    publishedDate: "July 30, 2026",
    readTime: "4 min read",
    author: "Maison Editorial Desk",
    excerpt:
      "Chypre fragrances represent perfumery's most intellectual structure: a deliberate tension between sunlight and shadowy soil.",
    content: {
      leadParagraph:
        "Named after the island of Cyprus, the classical chypre accord is defined by a sharp contrast: radiant citrus on top, a floral heart (often rose or jasmine), and an earthy base of oakmoss, patchouli, and labdanum.",
      sections: [
        {
          heading: "A Tension of Light and Shadow",
          body: [
            "What makes a chypre unique is that it avoids comfort. It is dry, architectural, and intellectually stimulating. Modern extraits replace historical heavy animalics with mineral ambers and sparkling pink peppercorn.",
          ],
        },
      ],
    },
  },
  {
    id: "night-rituals-and-scent",
    slug: "night-rituals-and-scent",
    title: "Night Rituals: How Fragrance Shapes Memory and Rest",
    subtitle: "The cognitive impact of nocturnal fragrance application on peace and dream recall.",
    category: "Lifestyle",
    publishedDate: "June 12, 2026",
    readTime: "5 min read",
    author: "Wellness & Olfaction Laboratory",
    excerpt:
      "Wearing perfume solely for oneself at bedtime transforms the fragrance into a private sanctuary.",
    content: {
      leadParagraph:
        "While society conditions us to wear fragrance when departing for work or evening engagements, one of the most rewarding rituals is wearing an extrait to sleep. Free from outside distractions, your senses observe the slow drydown in complete serenity.",
      sections: [
        {
          heading: "The Limbic Connection",
          body: [
            "The olfactory bulb is directly hardwired to the hippocampus and amygdala. Applying a consistent calming accord—such as sandalwood, iris, or bourbon vanilla—each night conditions the brain to transition seamlessly into restorative rest.",
          ],
        },
      ],
    },
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES_DATA.find((a) => a.slug === slug || a.id === slug);
}
