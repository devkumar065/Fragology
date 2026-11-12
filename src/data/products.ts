import { Product } from "@/types/product";

export const PRODUCTS_CATALOG: Product[] = [
  // 01. Afnan 9PM Elixir
  {
    id: "afnan-9pm-elixir",
    slug: "afnan-9pm-elixir",
    name: "Afnan 9PM Elixir",
    brand: "Afnan",
    subtitle: "Warm Spicy Amber & Smoked Leather",
    family: "Oriental",
    concentration: "Eau de Parfum",
    price: "₹4,840",
    priceNum: 4840,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A dense, warm and spicy amber-vanilla fragrance with aromatic lavender, a leathery heart and resinous depth. Evening parties, night-outs and winter wear ke liye suitable.",
    story: {
      inspiration:
        "Crafted for nocturnal charisma, balancing deep resins with electric spice and rich vanilla sillage.",
      personality:
        "Magnetic, opulent, and boldly assertive. Leaves a commanding trail in night air.",
      recommendedOccasions:
        "Evening parties, night-outs, and winter celebrations.",
    },
    notes: {
      top: "Nutmeg, Elemi, Cardamom",
      heart: "Pimento, Lavandin, Leather",
      base: "Ciste, Labdanum, Patchouli, Vanilla",
    },
    accordTags: ["warm spicy", "amber", "vanilla", "leather", "lavandin", "evening"],
    collections: ["middle-eastern", "signature-collection"],
    character: "Spicy",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#8C4A2F",
    ratingDemo: { score: 4.8, count: 84 },
    images: [
      "https://scentsesandco.com/cdn/shop/files/NewInBox_Afnan9PMElixirEDP.png?v=1758613135&width=1200",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/B9OOaX6snF-1201655_1.jpg",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/SxYVjmKXYW-1201655_2.jpg",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/D8weQo8rN4-1201655_3.jpg",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/Qd5D9V9JPp-1201655_4.jpg",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/Ob7Qy4QDGa-1201655_5.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Parfum Flacon", price: "₹4,840", priceNum: 4840 },
    ],
    productUrl: "https://www.tirabeauty.com/product/afnan-9-pm-elixir-eau-de-parfum-100-ml-13678370",
  },

  // 02. Afnan Turathi Electric
  {
    id: "afnan-turathi-electric",
    slug: "afnan-turathi-electric",
    name: "Afnan Turathi Electric",
    brand: "Afnan",
    subtitle: "Fresh Fruity Woody Citrus",
    family: "Fresh",
    concentration: "Eau de Parfum",
    price: "₹2,749",
    priceNum: 2749,
    volume: "90ml",
    badge: "New",
    description:
      "A bright, juicy citrus-fruity opening develops into crisp apple, cedarwood and orange blossom, settling into a smooth musky-amber base. Fresh daily-wear fragrance, particularly suitable for summer and office use.",
    story: {
      inspiration:
        "Electric Mediterranean currents intersecting with crisp orchard fruits, sunlit cedarwood and luminous ambroxan.",
      personality:
        "Vibrant, energetic, crisp, and undeniably charismatic.",
      recommendedOccasions:
        "Daily wear, office environments, and high-heat summer afternoons.",
    },
    notes: {
      top: "Bergamot, Pink Grapefruit, Pear, Mandarin Orange",
      heart: "Apple, Cedarwood, Orange Blossom",
      base: "Vanilla, Amber Dry, Musk, Ambroxan",
    },
    accordTags: ["fresh", "citrus", "fruity", "woody", "ambroxan", "summer"],
    collections: ["middle-eastern", "fresh-collection"],
    character: "Fresh",
    occasion: "Work",
    intensity: "Moderate",
    mood: "Energetic",
    inStock: true,
    accentColor: "#2F658C",
    ratingDemo: { score: 4.7, count: 52 },
    images: [
      "https://india.afnan.com/cdn/shop/files/TurathiElectric.png?v=1775225732&width=2000",
      "https://india.afnan.com/cdn/shop/files/TurathiElectric-1.png?v=1775225732&width=2000",
      "https://india.afnan.com/cdn/shop/files/TurathiElectric-2.png?v=1775225732&width=2000",
      "https://india.afnan.com/cdn/shop/files/TurathiElectric2048x20481.png?v=1775225734&width=2048",
      "https://india.afnan.com/cdn/shop/files/TurathiElectric2048x20482.png?v=1775225733&width=2048",
      "https://india.afnan.com/cdn/shop/files/TurathiElectric2048x20485.png?v=1775225733&width=2048",
      "https://india.afnan.com/cdn/shop/files/TurathiElectric2048x20486.png?v=1775225733&width=2048",
      "https://india.afnan.com/cdn/shop/files/TurathiElectric2048x20487.png?v=1775225734&width=2048",
    ],
    variants: [
      { size: "90ml", volumeDisplay: "90ml Eau de Parfum Flacon", price: "₹2,749", priceNum: 2749 },
    ],
    productUrl: "https://india.afnan.com/products/turathi-electric",
  },

  // 03. Afnan Supremacy Collector's Edition
  {
    id: "afnan-supremacy-collectors-edition",
    slug: "afnan-supremacy-collectors-edition",
    name: "Afnan Supremacy Collector's Edition",
    brand: "Afnan",
    subtitle: "Fruity Woody Smoky Chypre",
    family: "Woody",
    concentration: "Eau de Parfum",
    price: "₹3,799",
    priceNum: 3799,
    volume: "100ml",
    badge: "Limited Edition",
    description:
      "A bold fruity-woody chypre with juicy pineapple, smoky birch character and mossy amber depth. A standout choice for connoisseurs of Aventus-style fruity smoky compositions.",
    story: {
      inspiration:
        "The sovereign expression of royal pineapple and birch smoke over an ancient bed of damp oakmoss.",
      personality:
        "Commanding, regal, refined, and exceptionally long-lasting.",
      recommendedOccasions:
        "Office, boardroom meetings, special events, and signature evenings.",
    },
    notes: {
      top: "Pineapple, Bergamot, Apple",
      heart: "Orange Blossom, Amber, Birch",
      base: "Musk, Ambergris, Oakmoss",
    },
    accordTags: ["pineapple", "smoky", "birch", "oakmoss", "woody", "chypre"],
    collections: ["middle-eastern", "signature-collection"],
    character: "Balanced",
    occasion: "Special Occasions",
    intensity: "Intense",
    mood: "Elegant",
    inStock: true,
    accentColor: "#A67C38",
    ratingDemo: { score: 4.9, count: 110 },
    images: [
      "https://www.perfumenz.co.nz/cdn/shop/files/afnan-supremacy-collector_s-edition_1232x1232.png?v=1743027575",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Collector Flacon", price: "₹3,799", priceNum: 3799 },
    ],
    productUrl: "https://parfumly.in/perfume/afnan-supremacy-collectors-edition",
  },

  // 04. Lattafa Angham
  {
    id: "lattafa-angham",
    slug: "lattafa-angham",
    name: "Lattafa Angham",
    brand: "Lattafa",
    subtitle: "Creamy Vanilla Praline & Soft Floral Spice",
    family: "Floral",
    concentration: "Eau de Parfum",
    price: "₹4,000",
    priceNum: 4000,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A creamy, sweet fragrance combining citrus, ginger and soft spice with praline, lavender and cacao. The vanilla-amber musk base gives it a smooth gourmand character.",
    story: {
      inspiration:
        "Melodic harmony of sweet cacao and spiced lavender wrapped in warm praline silk.",
      personality:
        "Sensual, comforting, intimate, and sophisticated.",
      recommendedOccasions:
        "Daily wear, romantic dates, and cozy evenings.",
    },
    notes: {
      top: "Mandarin, Ginger, Pink Pepper",
      heart: "Praline, Lavender, Cacao",
      base: "Musk, Amber, Vanilla",
    },
    accordTags: ["praline", "cacao", "vanilla", "gourmand", "lavender", "dates"],
    collections: ["middle-eastern", "gourmand"],
    character: "Sweet",
    occasion: "Evening",
    intensity: "Moderate",
    mood: "Romantic",
    inStock: true,
    accentColor: "#C98E56",
    ratingDemo: { score: 4.8, count: 76 },
    images: [
      "https://www.lattafaindia.com/cdn/shop/files/Angham_Bottle.png?v=1752834606&width=919",
      "https://www.lattafaindia.com/cdn/shop/files/ANGHAM_2.png?v=1767692839&width=2000",
      "https://www.lattafaindia.com/cdn/shop/files/ANGHAM_3.png?v=1767692838&width=1859",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Parfum Flacon", price: "₹4,000", priceNum: 4000 },
    ],
    productUrl: "https://www.lattafaindia.com/products/angham",
  },

  // 05. Lattafa Eclaire
  {
    id: "lattafa-eclaire",
    slug: "lattafa-eclaire",
    name: "Lattafa Eclaire",
    brand: "Lattafa",
    subtitle: "Decadent Caramel Milk & Vanilla Praline",
    family: "Oriental",
    concentration: "Eau de Parfum",
    price: "₹4,000",
    priceNum: 4000,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A rich dessert-inspired gourmand fragrance featuring caramel, creamy milk and sugar, followed by honey and white florals. Vanilla, praline and musk create a sweet, cozy finish.",
    story: {
      inspiration:
        "Parisian patisserie artistry: warm condensed milk, golden caramel drizzle, and honeyed white blossoms.",
      personality:
        "Indulgent, playful, cozy, and irresistibly sweet.",
      recommendedOccasions:
        "Evening, intimate dates, and cooler sweater weather.",
    },
    notes: {
      top: "Caramel, Milk, Sugar",
      heart: "White Flowers, Honey",
      base: "Vanilla, Praline, Musk",
    },
    accordTags: ["caramel", "milk", "honey", "vanilla", "praline", "gourmand"],
    collections: ["middle-eastern", "gourmand"],
    character: "Sweet",
    occasion: "Evening",
    intensity: "Moderate",
    mood: "Romantic",
    inStock: true,
    accentColor: "#D49B4D",
    ratingDemo: { score: 4.9, count: 98 },
    images: [
      "https://www.lattafaindia.com/cdn/shop/files/eclair_Bottle.png?v=1752834630&width=919",
      "https://www.lattafaindia.com/cdn/shop/files/02_6a658daf-04de-4fba-9482-0a5103786893.png?v=1768822486&width=913",
      "https://www.lattafaindia.com/cdn/shop/files/03_7ee91b0b-cb5e-4c22-9877-1b7919bfc048.png?v=1768822486&width=913",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Parfum Flacon", price: "₹4,000", priceNum: 4000 },
    ],
    productUrl: "https://www.lattafaindia.com/products/eclaire",
  },

  // 06. Rasasi Hawas OG
  {
    id: "rasasi-hawas-og",
    slug: "rasasi-hawas-og",
    name: "Rasasi Hawas for Men",
    brand: "Rasasi",
    subtitle: "Iconic Aquatic Fruity Marine Accord",
    family: "Fresh",
    concentration: "Eau de Parfum",
    price: "₹2,899",
    priceNum: 2899,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A lively aquatic-fruity fragrance combining crisp fruits and citrus with aromatic spices and a smooth musky driftwood-amber base. A versatile fresh option for everyday use.",
    story: {
      inspiration:
        "The surging energy of ocean waves crashing against sun-drenched plum groves, spices and sun-bleached driftwood.",
      personality:
        "Dynamic, youthful, magnetic, and immensely compliment-gathering.",
      recommendedOccasions:
        "College, office, summer afternoons, and everyday signature wear.",
    },
    notes: {
      top: "Apple, Lemon, Cinnamon, Bergamot",
      heart: "Orange Blossom, Cardamom, Plum",
      base: "Ambergris, Driftwood, Musk",
    },
    accordTags: ["aquatic", "fruity", "marine", "plum", "driftwood", "summer"],
    collections: ["middle-eastern", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Intense",
    mood: "Energetic",
    inStock: true,
    accentColor: "#6B5B95",
    ratingDemo: { score: 4.8, count: 180 },
    images: [
      "https://silkperfumes.cl/cdn/shop/files/rasasi-hawas-hombre-edp-100ml-Silk-Perfumes.png?v=1757348735&width=1125",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Parfum Flacon", price: "₹2,899", priceNum: 2899 },
    ],
    productUrl: "https://parfumly.in/perfume/rasasi-hawas",
  },

  // 07. Rasasi Hawas Ice
  {
    id: "rasasi-hawas-ice",
    slug: "rasasi-hawas-ice",
    name: "Rasasi Hawas Ice",
    brand: "Rasasi",
    subtitle: "Glacial Citrus & Frosted Marine Accords",
    family: "Fresh",
    concentration: "Eau de Parfum",
    price: "₹3,449",
    priceNum: 3449,
    volume: "100ml",
    badge: "New",
    description:
      "A crisp, refreshing interpretation of the Hawas fragrance profile. Bright citrus and apple combine with aromatic fruit notes, followed by a clean musky-amber woody finish.",
    story: {
      inspiration:
        "An arctic frost infused through the legendary Hawas formula, introducing Italian bergamot, star anise and crystalline musk.",
      personality:
        "Ultra-crisp, invigorating, high-performance, and refreshing.",
      recommendedOccasions:
        "High-heat summer days, casual weekends, gym, and active lifestyle.",
    },
    notes: {
      top: "Apple, Italian Lemon, Sicilian Bergamot, Star Anise",
      heart: "Plum, Orange Blossom, Cardamom",
      base: "Musk, Amber, Driftwood, Moss",
    },
    accordTags: ["citrus", "aquatic", "ice", "bergamot", "star anise", "summer"],
    collections: ["middle-eastern", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Intense",
    mood: "Energetic",
    inStock: true,
    accentColor: "#4A90E2",
    ratingDemo: { score: 4.8, count: 92 },
    images: [
      "https://www.elmeira.in/cdn/shop/files/rasasi_hawas_ice_for_him.webp?v=1788893136&width=1946",
      "https://www.elmeira.in/cdn/shop/files/Rasasi_hawas_ice.jpg?v=1787154448&width=1946",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Frosted Flacon", price: "₹3,449", priceNum: 3449 },
    ],
    productUrl: "https://www.elmeira.in/hi/products/rasasi-hawas-ice-100ml-eau-de-parfum",
  },

  // 08. Rasasi Hawas Elixir
  {
    id: "rasasi-hawas-elixir",
    slug: "rasasi-hawas-elixir",
    name: "Rasasi Hawas Elixir",
    brand: "Rasasi",
    subtitle: "Dark Aromatic Sweet Lavender & Vanilla",
    family: "Oriental",
    concentration: "Eau de Parfum",
    price: "₹3,850",
    priceNum: 3850,
    volume: "100ml",
    badge: "New",
    description:
      "A richer and darker Hawas interpretation with a sweet aromatic character. Notes of soothing lavender and warm vanilla create a deep, nocturnal aura.",
    story: {
      inspiration:
        "The nocturnal soul of Hawas: concentrated aromatic sweetness crafted specifically for cooler nights and formal encounters.",
      personality:
        "Deep, mysterious, seductive, and warm.",
      recommendedOccasions:
        "Evening, night functions, and cooler weather.",
    },
    notes: {
      top: "Spiced Fruits, Cardamom",
      heart: "Lavender, Velvet Florals",
      base: "Bourbon Vanilla, Amber Resins",
    },
    accordTags: ["lavender", "vanilla", "sweet", "dark spicy", "elixir"],
    collections: ["middle-eastern"],
    character: "Spicy",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#6A3882",
    ratingDemo: { score: 4.6, count: 41 },
    images: [
      "https://souqscent.com/cdn/shop/files/Untitled_design_56_-Picsart-AiImageEnhancer_1200x1200.png?v=1771238123",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Elixir Flacon", price: "₹3,850", priceNum: 3850 },
    ],
    productUrl: "https://www.myntra.com/perfume/rasasi/rasasi-hawas-elixir-long-lasting-eau-de-parfum---100-ml/41218747/buy",
  },

  // 09. Rasasi Hawas Fire
  {
    id: "rasasi-hawas-fire",
    slug: "rasasi-hawas-fire",
    name: "Rasasi Hawas Fire",
    brand: "Rasasi",
    subtitle: "Amber Floral Green Aquatic Marine Accord",
    family: "Fresh",
    concentration: "Eau de Parfum",
    price: "₹3,300",
    priceNum: 3300,
    volume: "100ml",
    badge: null,
    description:
      "An aromatic amber-aquatic fragrance combining herbal clary sage with floral marine notes and a mineral amber base. It provides a deeper evening-oriented profile.",
    story: {
      inspiration:
        "The clash of elemental forces: oceanic waves surging over volcanic amber stone and wild sage.",
      personality:
        "Bold, charismatic, marine yet deeply resonant.",
      recommendedOccasions:
        "Evening social gatherings, cocktail events, and weekend dinners.",
    },
    notes: {
      top: "Clary Sage, Pink Peppercorn",
      heart: "Jasmine, Marine Accord",
      base: "Ambergris, Mineral Amber",
    },
    accordTags: ["clary sage", "jasmine", "marine", "ambergris", "aquatic"],
    collections: ["middle-eastern", "fresh-collection"],
    character: "Balanced",
    occasion: "Evening",
    intensity: "Moderate",
    mood: "Elegant",
    inStock: true,
    accentColor: "#C0392B",
    ratingDemo: { score: 4.5, count: 38 },
    images: [
      "https://nelooq.com/liveimages/nelooq_cms_products/779790074512Vuc4NDcL.SL1080.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Flacon", price: "₹3,300", priceNum: 3300 },
    ],
    productUrl: "https://parfumly.in/perfume/rasasi-hawas-fire",
  },

  // 10. Rayhaan Valhalla
  {
    id: "rayhaan-valhalla",
    slug: "rayhaan-valhalla",
    name: "Rayhaan Valhalla",
    brand: "Rayhaan",
    subtitle: "Boozy Raspberry Cognac & Praline Oak",
    family: "Oriental",
    concentration: "Eau de Parfum",
    price: "₹2,349",
    priceNum: 2349,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A rich boozy-fruity composition featuring raspberry and cognac with creamy tonka, Bulgarian rose and oakmoss. Praline and warm woods give it a deep, smooth finish.",
    story:
      {
        inspiration:
          "Norse celebration halls where aged cognac and wild raspberries are warmed beside roasted praline and oakwood fires.",
        personality:
          "Intoxicating, luxurious, warm, and decadently sweet.",
        recommendedOccasions:
          "Evening, winter nights, and celebration dinners.",
      },
    notes: {
      top: "Raspberry, Cognac, Liquor",
      heart: "Tonka Bean, Bulgarian Rose, Oakmoss",
      base: "Praline, Oak, Sandalwood",
    },
    accordTags: ["cognac", "raspberry", "praline", "tonka", "boozy", "gourmand"],
    collections: ["middle-eastern", "gourmand"],
    character: "Sweet",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#8E44AD",
    ratingDemo: { score: 4.8, count: 65 },
    images: [
      "https://rayhaanperfumes.me/cdn/shop/files/Valhalla2000x2000.jpg?v=1780999919",
      "https://rayhaanperfumes.me/cdn/shop/files/Screenshot2026-02-04at11.20.54AM.png?v=1770189663",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Parfum Flacon", price: "₹2,349", priceNum: 2349 },
    ],
    productUrl: "https://rayhaanperfumes.me/products/rayhaan-valhalla",
  },

  // 11. Ahmed Al Maghribi Leather EDP
  {
    id: "ahmed-al-maghribi-leather",
    slug: "ahmed-al-maghribi-leather",
    name: "Ahmed Al Maghribi Leather",
    brand: "Ahmed Al Maghribi",
    subtitle: "Saffron Spiced Florentine Leather",
    family: "Spicy",
    concentration: "Eau de Parfum",
    price: "₹3,150",
    priceNum: 3150,
    volume: "50ml",
    badge: null,
    description:
      "A bold leather-forward fragrance with saffron and thyme facets. Its assertive character makes it more suitable for evening wear, cooler weather and statement occasions.",
    story: {
      inspiration:
        "The ancient artisan leather souks scented with hand-picked saffron threads, thyme and rich amber resins.",
      personality:
        "Assertive, commanding, bespoke, and undeniably masculine.",
      recommendedOccasions:
        "Evening, statement wear, cooler weather, and formal gala nights.",
    },
    notes: {
      top: "Saffron, Thyme",
      heart: "Amber Accords, Jasmine",
      base: "Florentine Leather, Suede",
    },
    accordTags: ["leather", "saffron", "thyme", "amber", "spicy"],
    collections: ["middle-eastern"],
    character: "Spicy",
    occasion: "Special Occasions",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#593822",
    ratingDemo: { score: 4.7, count: 48 },
    images: [
      "https://i.ebayimg.com/images/g/Uz0AAOSwVd1lie3G/s-l1200.png",
    ],
    variants: [
      { size: "50ml", volumeDisplay: "50ml Eau de Parfum Flacon", price: "₹3,150", priceNum: 3150 },
    ],
    productUrl: "https://ahmedalmaghribi.co.in/products/leather-perfume",
  },

  // 12. Ahmed Al Maghribi Bin Shaikh
  {
    id: "ahmed-al-maghribi-bin-shaikh",
    slug: "ahmed-al-maghribi-bin-shaikh",
    name: "Ahmed Al Maghribi Bin Shaikh",
    brand: "Ahmed Al Maghribi",
    subtitle: "Royal Oriental Oud Rose & Incense Bakhoor",
    family: "Oriental",
    concentration: "Eau de Parfum",
    price: "₹7,000",
    priceNum: 7000,
    volume: "90ml",
    badge: "Bestseller",
    description:
      "A rich traditional Arabic-style perfume combining saffron, rose and incense with oud, amber resins and musk. Deep, sophisticated and formal fragrance profile.",
    story: {
      inspiration:
        "The ceremonial dignity of Arabian royalty: burning incense bakhoor, aged agarwood, and dewy Damask roses.",
      personality:
        "Regal, aristocratic, traditional, and eternal.",
      recommendedOccasions:
        "Formal evenings, weddings, grand celebrations, and festive banquets.",
    },
    notes: {
      top: "French Lavender, Saffron, Rose, Citrus, Oakmoss",
      heart: "Jasmine, Orchid, Sugar, Violet, Incense Bakhoor",
      base: "Patchouli, Agarwood, Ambroxan, White Musk, Amber Resins",
    },
    accordTags: ["oud", "bakhoor", "rose", "saffron", "oriental", "amber"],
    collections: ["middle-eastern", "signature-collection"],
    character: "Spicy",
    occasion: "Special Occasions",
    intensity: "Intense",
    mood: "Elegant",
    inStock: true,
    accentColor: "#B8860B",
    ratingDemo: { score: 4.9, count: 88 },
    images: [
      "https://ahmedalmaghribi.co.in/cdn/shop/files/bin-Shaikh-1.jpg?v=1770989013&width=1500",
      "https://ahmedalmaghribi.co.in/cdn/shop/files/Bin-shaikh-2-scaled.jpg?v=1770989014&width=2560",
      "https://ahmedalmaghribi.co.in/cdn/shop/files/bin-shaikh-3.jpg?v=1770989013&width=1500",
    ],
    variants: [
      { size: "90ml", volumeDisplay: "90ml Royal Presentation Flacon", price: "₹7,000", priceNum: 7000 },
    ],
    productUrl: "https://ahmedalmaghribi.co.in/products/bin-shaikh",
  },

  // 13. Naseem Lost In The Woods
  {
    id: "naseem-lost-in-the-woods",
    slug: "naseem-lost-in-the-woods",
    name: "Naseem Lost In The Woods",
    brand: "Naseem",
    subtitle: "Woody Earthy Aromatic Aqua Parfum",
    family: "Woody",
    concentration: "Aqua Parfum",
    price: "₹2,500",
    priceNum: 2500,
    volume: "75ml",
    badge: null,
    description:
      "An earthy woody fragrance combining bright citrus and pepper with aromatic florals, leather, woods and amber. Alcohol-free aqua parfum formulated for pure skin comfort.",
    story: {
      inspiration:
        "The deep solitude of pine and cedar canopies after a cleansing dawn downpour.",
      personality:
        "Grounded, serene, organic, and meditative.",
      recommendedOccasions:
        "Daytime, executive office, and quiet weekend contemplation.",
    },
    notes: {
      top: "Grapefruit, Bergamot, Italian Lemon, Pink Pepper, Incense, Ginger",
      heart: "Rose, Geranium, Jasmine, Neroli",
      base: "Leather, Patchouli, Musk, Vetiver, Sandalwood, Benzoin, Amber, Cedarwood",
    },
    accordTags: ["earthy", "cedarwood", "vetiver", "patchouli", "citrus", "woods"],
    collections: ["middle-eastern"],
    character: "Fresh",
    occasion: "Work",
    intensity: "Moderate",
    mood: "Minimal",
    inStock: true,
    accentColor: "#2E5339",
    ratingDemo: { score: 4.6, count: 39 },
    images: [
      "https://www.aarfragrances.com/public/uploads/all/6id1bjmiIVXoCNvu0vajI2NJh4nLbuHz6m1lVYxf.jpg",
    ],
    variants: [
      { size: "75ml", volumeDisplay: "75ml Aqua Parfum Flacon", price: "₹2,500", priceNum: 2500 },
    ],
    productUrl: "https://www.naseemperfume.in/products/lost-in-the-woods",
  },

  // 14. Naseem Night of Success
  {
    id: "naseem-night-of-success",
    slug: "naseem-night-of-success",
    name: "Naseem Night of Success",
    brand: "Naseem",
    subtitle: "Spicy Raspberry Plum Leather & Oud",
    family: "Oriental",
    concentration: "Aqua Parfum",
    price: "₹2,500",
    priceNum: 2500,
    volume: "75ml",
    badge: null,
    description:
      "A rich evening-oriented fragrance combining sweet fruity notes with spice, rose and leather. The oud, cedarwood, vetiver and amber base provides a deep traditional character.",
    story: {
      inspiration:
        "The triumphant toast of achievement: dark ripe plums, spiced raspberry liqueur, and burnished leather saddles.",
      personality:
        "Triumphant, dignified, bold, and luxurious.",
      recommendedOccasions:
        "Evening, formal occasions, and milestone celebrations.",
    },
    notes: {
      top: "Spicy Accord, Raspberry, Plum",
      heart: "Rose, Jasmine, Leather",
      base: "Oud, Cedarwood, Vetiver, Warm Amber, Musk",
    },
    accordTags: ["plum", "raspberry", "leather", "oud", "amber", "spicy"],
    collections: ["middle-eastern"],
    character: "Spicy",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#1B2A4A",
    ratingDemo: { score: 4.7, count: 44 },
    images: [
      "https://piscopoprofumeria.com/cdn/shop/files/NaseemNightofsuccess3.png?v=1728290711&width=1181",
    ],
    variants: [
      { size: "75ml", volumeDisplay: "75ml Aqua Parfum Flacon", price: "₹2,500", priceNum: 2500 },
    ],
    productUrl: "https://www.naseemperfume.in/products/night-of-success",
  },

  // 15. Armaf Yum Yum
  {
    id: "armaf-yum-yum",
    slug: "armaf-yum-yum",
    name: "Armaf Yum Yum",
    brand: "Armaf",
    subtitle: "Sweet Cherry Berry & Powdery Vanilla Gourmand",
    family: "Floral",
    concentration: "Eau de Parfum",
    price: "₹3,250",
    priceNum: 3250,
    volume: "100ml",
    badge: "New",
    description:
      "A playful sweet fruity opening featuring citrus, cherry and berries leads into rose, white florals and vanilla. Powdery notes, amber and musk create a soft gourmand finish.",
    story: {
      inspiration:
        "An exuberant fairground of glazed cherries, raspberry compote, and delicate powdery vanilla clouds.",
      personality:
        "Playful, charming, bubbly, and delectable.",
      recommendedOccasions:
        "Casual daytime wear, brunches, and fun romantic dates.",
    },
    notes: {
      top: "Bergamot, Orange, Sweet Cherry, Berry",
      heart: "Rose, White Florals, Vanilla",
      base: "Musk, Powdery Notes, Amber",
    },
    accordTags: ["cherry", "berry", "vanilla", "sweet", "powdery", "gourmand"],
    collections: ["middle-eastern", "gourmand"],
    character: "Sweet",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Romantic",
    inStock: true,
    accentColor: "#E84393",
    ratingDemo: { score: 4.6, count: 50 },
    images: [
      "https://perfumesbase.com/cdn/shop/files/Armaf-Yum-Yum-EDP-Spray-100ml.jpg?v=1759129453",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Parfum Flacon", price: "₹3,250", priceNum: 3250 },
    ],
    productUrl: "https://armafperfume.com/products/armaf-yum-yum-edp-100ml",
  },

  // 16. Khadlaj Karus Blu Spice
  {
    id: "khadlaj-karus-blu-spice",
    slug: "khadlaj-karus-blu-spice",
    name: "Khadlaj Karus Blu Spice",
    brand: "Khadlaj",
    subtitle: "Fresh Spicy Tea Bergamot & Guaiacwood",
    family: "Fresh",
    concentration: "Eau de Parfum",
    price: "₹2,099",
    priceNum: 2099,
    volume: "100ml",
    badge: null,
    description:
      "A fresh spicy-citrus composition combining tea and bergamot with ginger and neroli. Cinnamon and guaiacwood create a warm woody finish.",
    story: {
      inspiration:
        "Steeped black tea perfumed with sunlit Italian bergamot, zesty fresh ginger roots and exotic guaiacwood.",
      personality:
        "Zesty, crisp, intelligent, and revitalizing.",
      recommendedOccasions:
        "Daily wear, office meetings, and warm sunny mornings.",
    },
    notes: {
      top: "Tea, Bergamot",
      heart: "Neroli, Ginger",
      base: "Cinnamon, Guaiacwood",
    },
    accordTags: ["tea", "bergamot", "ginger", "cinnamon", "guaiacwood", "fresh spicy"],
    collections: ["middle-eastern", "fresh-collection"],
    character: "Fresh",
    occasion: "Work",
    intensity: "Moderate",
    mood: "Energetic",
    inStock: true,
    accentColor: "#2980B9",
    ratingDemo: { score: 4.7, count: 42 },
    images: [
      "https://images-cdn.ubuy.co.in/6957096827551f953f086686-khadlaj-perfumes-karus-blu-spice-eau-de.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Parfum Flacon", price: "₹2,099", priceNum: 2099 },
    ],
    productUrl: "https://khadlaj-perfumes.in/products/karus-blu-spice-100-ml-edp-spray",
  },

  // 17. Dior Sauvage Elixir
  {
    id: "dior-sauvage-elixir",
    slug: "dior-sauvage-elixir",
    name: "Dior Sauvage Elixir",
    brand: "Dior",
    subtitle: "Concentrated Spicy Woody Licorice & Amber",
    family: "Spicy",
    concentration: "Parfum / Elixir",
    price: "₹17,200",
    priceNum: 17200,
    volume: "60ml",
    badge: "Bestseller",
    description:
      "A highly concentrated spicy-aromatic fragrance with an intense spice opening, refined lavender heart and deep licorice-wood-amber base. Strong and distinctive fragrance profile.",
    story: {
      inspiration:
        "A red moon in nocturnal twilight: master perfumer Francois Demachy condensed the legendary Sauvage DNA into unprecedented potency and richness.",
      personality:
        "Powerfully magnetic, commanding, unforgettable, and masterfully refined.",
      recommendedOccasions:
        "Winter nights, high-stakes formal events, and special occasions.",
    },
    notes: {
      top: "Nutmeg, Cinnamon, Cardamom, Grapefruit",
      heart: "Lavender",
      base: "Licorice, Sandalwood, Amber, Patchouli, Haitian Vetiver",
    },
    accordTags: ["spicy", "licorice", "cardamom", "cinnamon", "lavender", "luxury"],
    collections: ["designer", "signature-collection"],
    character: "Spicy",
    occasion: "Special Occasions",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#102030",
    ratingDemo: { score: 5.0, count: 320 },
    images: [
      "https://beautycom.gr/images/detailed/55/92cbc7fbddb34d0b536e28a56b231624.png",
    ],
    variants: [
      { size: "60ml", volumeDisplay: "60ml Midnight Elixir Flacon", price: "₹17,200", priceNum: 17200 },
    ],
    productUrl: "https://sephora.in/product/dior-sauvage-elixir-fragrance-v-60ml",
  },

  // 18. Rabanne Phantom Parfum
  {
    id: "rabanne-phantom-parfum",
    slug: "rabanne-phantom-parfum",
    name: "Rabanne Phantom Parfum",
    brand: "Rabanne",
    subtitle: "Woody Aromatic Cardamom Lavender & Vanilla",
    family: "Woody",
    concentration: "Parfum",
    price: "₹7,920",
    priceNum: 7920,
    volume: "100ml",
    badge: null,
    description:
      "A modern aromatic woody fragrance combining cardamom and lavender with a smooth vanilla-vetiver finish. Its contemporary sweet character works well for dates, parties and evening wear.",
    story: {
      inspiration:
        "The electric pulse of midnight party energy: French lavender electrified with spicy cardamom and rich bourbon vanilla.",
      personality:
        "Futuristic, daring, seductive, and nightlife-ready.",
      recommendedOccasions:
        "Dates, parties, club nights, and evening celebrations.",
    },
    notes: {
      top: "Cardamom, Bergamot, Rhubarb",
      heart: "Lavender, Geranium, Cedarwood",
      base: "Vanilla, Vetiver, Tolu Balsam",
    },
    accordTags: ["cardamom", "lavender", "vanilla", "vetiver", "party", "modern"],
    collections: ["designer"],
    character: "Sweet",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Energetic",
    inStock: true,
    accentColor: "#2C3E50",
    ratingDemo: { score: 4.7, count: 104 },
    images: [
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e8e4a0PACOR00000254_1.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e8e4a0PACOR00000254_2.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e8e4a0PACOR00000254_3.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e8e4a0PACOR00000254_4.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e8e4a0PACOR00000254_5.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e8e4a0PACOR00000254_6.jpg",
      "https://images-static.nykaa.com/media/catalog/product/3/e/3e8e4a0PACOR00000254_7.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Robot Flacon", price: "₹7,920", priceNum: 7920 },
    ],
    productUrl: "https://www.nykaa.com/paco-rabanne-phantom-parfum/p/14518573",
  },

  // 19. Prada Paradoxe
  {
    id: "prada-paradoxe",
    slug: "prada-paradoxe",
    name: "Prada Paradoxe",
    brand: "Prada",
    subtitle: "Floral Amber Neroli & Bourbon Vanilla",
    family: "Floral",
    concentration: "Eau de Parfum",
    price: "₹12,020",
    priceNum: 12020,
    volume: "90ml",
    badge: "Bestseller",
    description:
      "A contemporary floral-amber fragrance with bright citrus and pear, followed by luminous white florals. Its warm amber, benzoin, vanilla and musk base creates an elegant finish.",
    story: {
      inspiration:
        "Reinventing floral sensuality through bio-converted Ambrofix and vibrant neroli buds, housed in the iconic Prada triangle silhouette.",
      personality:
        "Effortlessly chic, luminous, iconic, and multidimensional.",
      recommendedOccasions:
        "Daytime elegance, intimate dinners, and premier gala evenings.",
    },
    notes: {
      top: "Calabrian Bergamot, Tangerine, Pear",
      heart: "Neroli Essence, Orange Blossom, Jasmine Sambac",
      base: "Amber Accord, Ambrofix, Laos Benzoin, Bourbon Vanilla, White Musk",
    },
    accordTags: ["neroli", "pear", "bourbon vanilla", "amber", "white florals"],
    collections: ["designer", "signature-collection"],
    character: "Sweet",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Elegant",
    inStock: true,
    accentColor: "#DDA0DD",
    ratingDemo: { score: 4.9, count: 215 },
    images: [
      "https://www.perfumenz.co.nz/cdn/shop/products/prada-paradoxe_1554x1554.png?v=1675129290",
    ],
    variants: [
      { size: "90ml", volumeDisplay: "90ml Triangle Flacon", price: "₹12,020", priceNum: 12020 },
    ],
    productUrl: "https://www.nykaa.com/prada-paradoxe-eau-de-parfum/p/12059383",
  },

  // 20. Calvin Klein CK One Gold
  {
    id: "calvin-klein-ck-one-gold",
    slug: "calvin-klein-ck-one-gold",
    name: "Calvin Klein CK One Gold",
    brand: "Calvin Klein",
    subtitle: "Fresh Woody Unisex Fig & Neroli",
    family: "Fresh",
    concentration: "Eau de Toilette",
    price: "₹3,995",
    priceNum: 3995,
    volume: "100ml",
    badge: null,
    description:
      "A clean unisex fragrance with leafy fig and citrus, soft florals and a light woody base. Suitable for casual daytime wear and people who prefer fresh woody fragrances.",
    story: {
      inspiration:
        "A tribute to golden youth: leafy green fig trees bathed in warm sunshine with drips of molten gold.",
      personality:
        "Effortless, fresh, universally appealing, and uplifting.",
      recommendedOccasions:
        "Daily wear, casual hangouts, and warm spring/summer weather.",
    },
    notes: {
      top: "Bergamot, Fig, Sage",
      heart: "Neroli, Violet, Jasmine Sambac",
      base: "Guaiac Wood, Patchouli, Vetiver",
    },
    accordTags: ["fig", "neroli", "sage", "guaiac wood", "fresh", "unisex"],
    collections: ["designer", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Minimal",
    inStock: true,
    accentColor: "#D4AF37",
    ratingDemo: { score: 4.6, count: 62 },
    images: [
      "https://silkperfumes.cl/cdn/shop/products/ck-one-gold-edt-100ml.jpg?crop=center&height=1000&v=1707763758&width=1000",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Gold Dipped Flask", price: "₹3,995", priceNum: 3995 },
    ],
    productUrl: "https://luxury.tatacliq.com/calvin-klein-one-gold-eau-de-toilette--100-ml/p-mp000000012741323",
  },

  // 21. Calvin Klein CK MAN
  {
    id: "calvin-klein-ck-man",
    slug: "calvin-klein-ck-man",
    name: "Calvin Klein CK MAN",
    brand: "Calvin Klein",
    subtitle: "Aromatic Woody Rosemary & Sandalwood",
    family: "Woody",
    concentration: "Eau de Toilette",
    price: "₹3,450",
    priceNum: 3450,
    volume: "100ml",
    badge: null,
    description:
      "A clean aromatic-woody men's fragrance suited to everyday use. Blends crisp rosemary, subtle incense and creamy sandalwood for a composed masculine presence.",
    story: {
      inspiration:
        "Architectural minimalism meets masculine sophistication: clean black lines and understated herbal woodiness.",
      personality:
        "Tailored, professional, confident, and refined.",
      recommendedOccasions:
        "Executive office, business meetings, and polished daily wear.",
    },
    notes: {
      top: "Rosemary, Mandarin, Bergamot, Violet Leaf",
      heart: "Incense, Nutmeg, Bay Leaf, Spearmint",
      base: "Sandalwood, Cypress, Guaiac Wood, Amberwood",
    },
    accordTags: ["rosemary", "incense", "sandalwood", "woody", "aromatic"],
    collections: ["designer"],
    character: "Balanced",
    occasion: "Work",
    intensity: "Moderate",
    mood: "Minimal",
    inStock: true,
    accentColor: "#34495E",
    ratingDemo: { score: 4.5, count: 35 },
    images: [
      "https://abclive1.s3.amazonaws.com/b28ad673-9a16-4b11-9414-386b79347ae0/productimage/31655644851___L.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Toilette Flacon", price: "₹3,450", priceNum: 3450 },
    ],
    productUrl: "https://www.alwaystherepharmacy.ie/p/calvin-klein-man-eau-de-toilette-100ml/031655644851",
  },

  // 22. Calvin Klein CK IN2U Her
  {
    id: "calvin-klein-ck-in2u-her",
    slug: "calvin-klein-ck-in2u-her",
    name: "Calvin Klein CK IN2U Her",
    brand: "Calvin Klein",
    subtitle: "Fresh Citrus Floral Pink Grapefruit & Vanilla",
    family: "Fresh",
    concentration: "Eau de Toilette",
    price: "₹2,998",
    priceNum: 2998,
    volume: "100ml",
    badge: null,
    description:
      "A bright citrus-fruity opening with grapefruit and bergamot leads into a clean floral heart. Vanilla, cedar and amber create a soft finish suitable for everyday wear.",
    story: {
      inspiration:
        "Spontaneous youth connections and sunny freedom captured in an architectural white flask.",
      personality:
        "Breezy, flirtatious, cheerful, and crisp.",
      recommendedOccasions:
        "Daily wear, casual outings, beach days, and summer vacations.",
    },
    notes: {
      top: "Pink Grapefruit, Sicilian Bergamot, Red Currant Leaf",
      heart: "Cactus, Sugar Orchid",
      base: "Vanilla, Red Cedar, Amber",
    },
    accordTags: ["grapefruit", "sugar orchid", "cactus", "vanilla", "citrus"],
    collections: ["designer", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Energetic",
    inStock: true,
    accentColor: "#E67E22",
    ratingDemo: { score: 4.6, count: 54 },
    images: [
      "https://cdn.cimri.io/image/1200x1200/calvin-klein-ck-in2u-edt-100-ml-kadin-parfum_184523333.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Toilette Bottle", price: "₹2,998", priceNum: 2998 },
    ],
    productUrl: "https://www.kunchals.in/products/88300196845",
  },

  // 23. Davidoff Cool Water
  {
    id: "davidoff-cool-water",
    slug: "davidoff-cool-water",
    name: "Davidoff Cool Water",
    brand: "Davidoff",
    subtitle: "The Legendary Crisp Ocean Breeze & Mint",
    family: "Fresh",
    concentration: "Eau de Toilette",
    price: "₹5,025",
    priceNum: 5025,
    volume: "125ml",
    badge: "Bestseller",
    description:
      "A classic fresh aquatic aromatic fragrance featuring cooling mint and herbal facets, followed by floral-aromatic notes and a clean musky-amber finish.",
    story: {
      inspiration:
        "The dawn of modern aquatic perfumery by master perfumer Pierre Bourdon: pure Atlantic waves crashing against sea moss and peppermint.",
      personality:
        "Crisp, quintessential, legendary, and perpetually invigorating.",
      recommendedOccasions:
        "Summer heatwaves, gym workouts, boardroom freshness, and daily wear.",
    },
    notes: {
      top: "Mint, Lavender, Coriander, Rosemary",
      heart: "Geranium, Neroli, Jasmine, Sandalwood",
      base: "Cedarwood, Musk, Amber, Tobacco",
    },
    accordTags: ["aquatic", "mint", "lavender", "ocean", "fresh", "classic"],
    collections: ["designer", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Energetic",
    inStock: true,
    accentColor: "#1B4F72",
    ratingDemo: { score: 4.9, count: 420 },
    images: [
      "https://www.justmylook.com/cdn/shop/files/davidoff-cool-water-for-men-eau-de-toilette-125ml-p20031-56724_image.jpg?format=webp&v=1721322172&width=1404",
    ],
    variants: [
      { size: "125ml", volumeDisplay: "125ml Ocean Flacon", price: "₹5,025", priceNum: 5025 },
    ],
    productUrl: "https://www.nykaa.com/davidoff-cool-water-eau-de-toilette-for-men/p/17283",
  },

  // 24. Davidoff The Game
  {
    id: "davidoff-the-game",
    slug: "davidoff-the-game",
    name: "Davidoff The Game",
    brand: "Davidoff",
    subtitle: "Smooth Woody Aromatic Gin & Iris",
    family: "Woody",
    concentration: "Eau de Toilette",
    price: "₹2,997",
    priceNum: 2997,
    volume: "100ml",
    badge: null,
    description:
      "A smooth woody-aromatic fragrance opening with gin and juniper, developing through iris and precious woods before settling into a darker ebony-wood finish.",
    story: {
      inspiration:
        "A high-stakes midnight poker salon: frosted gin martinis, polished poker chips, and dark polished ebony tables.",
      personality:
        "Suave, calculated, charismatic, and elegant.",
      recommendedOccasions:
        "Evening gatherings, smart casual dates, and lounge parties.",
    },
    notes: {
      top: "Gin, Juniper Berries",
      heart: "Iris, Precious Woods",
      base: "Blackwood, Ebony Wood",
    },
    accordTags: ["gin", "juniper", "iris", "ebony wood", "woody"],
    collections: ["designer"],
    character: "Balanced",
    occasion: "Evening",
    intensity: "Moderate",
    mood: "Elegant",
    inStock: true,
    accentColor: "#17202A",
    ratingDemo: { score: 4.5, count: 48 },
    images: [
      "https://www.aromania.gr/image/data/MENS-PERFUMES/DAVIDOFF/3607341186805-1.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Casino Flacon", price: "₹2,997", priceNum: 2997 },
    ],
    productUrl: "https://sephora.in/product/davidoff-the-game-eau-de-toilette-v-100ml",
  },

  // 25. Zadig & Voltaire This Is Him
  {
    id: "zadig-voltaire-this-is-him",
    slug: "zadig-voltaire-this-is-him",
    name: "Zadig & Voltaire This Is Him!",
    brand: "Zadig & Voltaire",
    subtitle: "Dark Woody Oriental Incense Vanilla & Sandalwood",
    family: "Woody",
    concentration: "Eau de Toilette",
    price: "₹6,190",
    priceNum: 6190,
    volume: "100ml",
    badge: "Limited Edition",
    description:
      "A dark contemporary woody fragrance combining grapefruit and black pepper with incense and creamy vanilla. The sandalwood base adds warmth and depth.",
    story: {
      inspiration:
        "Parisian rock-and-roll nonchalance inside a chiseled black monolith flacon: curling incense smoke and raw Bourbon vanilla pods.",
      personality:
        "Rebellious, poetic, warm, and intensely addictive.",
      recommendedOccasions:
        "Concerts, intimate dinners, evening dates, and winter walks.",
    },
    notes: {
      top: "Grapefruit, Black Pepper",
      heart: "Incense, Bourbon Vanilla",
      base: "Sandalwood",
    },
    accordTags: ["incense", "vanilla", "black pepper", "sandalwood", "rock chic"],
    collections: ["designer"],
    character: "Spicy",
    occasion: "Evening",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#1C1C1C",
    ratingDemo: { score: 4.8, count: 72 },
    images: [
      "https://www.beautyjulia.com/fr/272912-large_default/zv-this-is-him-edt.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Monolith Flacon", price: "₹6,190", priceNum: 6190 },
    ],
    productUrl: "https://sephora.in/product/zadigandvoltaire-this-is-him-edt-v-100ml",
  },

  // 26. Dunhill Icon
  {
    id: "dunhill-icon",
    slug: "dunhill-icon",
    name: "Dunhill Icon",
    brand: "Dunhill",
    subtitle: "Polished Citrus Aromatic Neroli & Black Pepper",
    family: "Fresh",
    concentration: "Eau de Parfum",
    price: "₹7,055",
    priceNum: 7055,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A polished citrus-aromatic woody fragrance featuring neroli and bergamot, enhanced by black pepper and aromatic herbs. Housed in a heavy engine-turned metal cylinder.",
    story: {
      inspiration:
        "British motor heritage and bespoke Mayfair tailoring: master perfumer Carlos Benaïm's ode to modern gentlemanly dignity.",
      personality:
        "Distinguished, impeccably tailored, stately, and aristocratic.",
      recommendedOccasions:
        "Executive boardroom, formal daytime events, and bespoke occasions.",
    },
    notes: {
      top: "Neroli, Italian Bergamot, Black Pepper, Petitgrain",
      heart: "Lavender, Cardamom, Juniper Berries, Sage",
      base: "Iris, Leather, Agarwood, Oakmoss, Vetiver",
    },
    accordTags: ["neroli", "black pepper", "cardamom", "petitgrain", "woody", "british"],
    collections: ["designer", "signature-collection"],
    character: "Fresh",
    occasion: "Work",
    intensity: "Moderate",
    mood: "Elegant",
    inStock: true,
    accentColor: "#808080",
    ratingDemo: { score: 4.8, count: 118 },
    images: [
      "https://cdn2.jomashop.com/media/catalog/product/cache/fde19e4197824625333be074956e7640/d/u/dunhill-mens-icon-edp-spray-34-oz-100-ml-085715806017.jpg?height=546&width=546",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Engine-Turned Metal Flacon", price: "₹7,055", priceNum: 7055 },
    ],
    productUrl: "https://www.tatacliq.com/dunhill-icon-eau-de-parfum-100-ml-for-men-80601/p-mp000000010797811",
  },

  // 27. Bentley For Men Intense
  {
    id: "bentley-for-men-intense",
    slug: "bentley-for-men-intense",
    name: "Bentley For Men Intense",
    brand: "Bentley",
    subtitle: "Boozy Rum Cinnamon Leather & Smoky Woods",
    family: "Spicy",
    concentration: "Eau de Parfum",
    price: "₹4,463",
    priceNum: 4463,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A dense boozy-spicy woody fragrance built around rum, warm spices and leather. Incense and woods provide additional depth, making it particularly suitable for winter and evening wear.",
    story: {
      inspiration:
        "The cockpit of a grand tourer: hand-stitched leather upholstery, rich rum decanters, and burr walnut dashboard trim.",
      personality:
        "Deep, masculine, boozy, mature, and powerfully comforting.",
      recommendedOccasions:
        "Winter nights, fireside dinners, and black-tie events.",
    },
    notes: {
      top: "Black Pepper, Bay Leaf, Bergamot",
      heart: "Rum, Cinnamon, Clary Sage, African Geranium",
      base: "Leather, Incense, Cedarwood, Benzoin, Patchouli",
    },
    accordTags: ["rum", "leather", "cinnamon", "incense", "boozy", "winter"],
    collections: ["designer"],
    character: "Spicy",
    occasion: "Special Occasions",
    intensity: "Intense",
    mood: "Mysterious",
    inStock: true,
    accentColor: "#783F04",
    ratingDemo: { score: 4.8, count: 160 },
    images: [
      "https://e7cbb2c9-bb84-4880-8504-79f06f158221.svc.edge.scw.cloud/product/111353/detailsc.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Heavy Glass & Metal Flacon", price: "₹4,463", priceNum: 4463 },
    ],
    productUrl: "https://www.nykaa.com/bentley-for-men-intense-eau-de-parfum/p/24177",
  },

  // 28. Jaguar Classic Motion
  {
    id: "jaguar-classic-motion",
    slug: "jaguar-classic-motion",
    name: "Jaguar Classic Motion",
    brand: "Jaguar",
    subtitle: "Fresh Citrus Mint Birch & Sea Aromas",
    family: "Fresh",
    concentration: "Eau de Toilette",
    price: "₹1,845",
    priceNum: 1845,
    volume: "100ml",
    badge: null,
    description:
      "A bright fresh aromatic fragrance opening with citrus and mint, followed by pepper, coriander and lavender. Its dry-down combines woods, vetiver, musk and amber.",
    story: {
      inspiration:
        "High-velocity aerodynamics through coastal sea roads: cool ocean winds, crisp mint, and birch leaf vibrancy.",
      personality:
        "Sporty, invigorating, crisp, and everyday dependable.",
      recommendedOccasions:
        "Morning workouts, daily office wear, and summer road trips.",
    },
    notes: {
      top: "Bergamot, Lemon, Birch Leaves, Mint",
      heart: "Black Pepper, Coriander, Lavender, Sea Aromas",
      base: "Orris, Vetiver, Sandalwood, Patchouli, White Musk, Amber",
    },
    accordTags: ["citrus", "mint", "sea aromas", "birch leaves", "fresh aromatic"],
    collections: ["designer", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Energetic",
    inStock: true,
    accentColor: "#3498DB",
    ratingDemo: { score: 4.5, count: 52 },
    images: [
      "https://route2fashion.com/cdn/shop/products/jaguarclassicmotionformen.jpg?v=1672840966",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Chrome Accented Flacon", price: "₹1,845", priceNum: 1845 },
    ],
    productUrl: "https://www.myntra.com/perfume-and-body-mist/jaguar/jaguar-men-classic-motion-eau-de-toilette/1677394/buy",
  },

  // 29. David Beckham Classic Blue
  {
    id: "david-beckham-classic-blue",
    slug: "david-beckham-classic-blue",
    name: "David Beckham Classic Blue",
    brand: "David Beckham",
    subtitle: "Fresh Fruity Pineapple Grapefruit & Cashmere Wood",
    family: "Fresh",
    concentration: "Eau de Toilette",
    price: "₹1,725",
    priceNum: 1725,
    volume: "90ml",
    badge: null,
    description:
      "A fresh fruity-aromatic composition with pineapple and grapefruit, a green herbal heart and a soft cashmere-wood, patchouli and moss base. A relaxed everyday fragrance.",
    story: {
      inspiration:
        "Effortless masculine poise: crisp blue tailoring, sunlit grapefruit groves, and cashmere warmth.",
      personality:
        "Relaxed, modern, approachable, and breezy.",
      recommendedOccasions:
        "Daily wear, casual brunch, and relaxed sunny weekends.",
    },
    notes: {
      top: "Pineapple, Grapefruit, Violet Leaf",
      heart: "Geranium, Clary Sage, Apple",
      base: "Cashmere Wood, Patchouli, Moss",
    },
    accordTags: ["pineapple", "grapefruit", "cashmere wood", "patchouli", "fresh"],
    collections: ["designer", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Minimal",
    inStock: true,
    accentColor: "#2980B9",
    ratingDemo: { score: 4.4, count: 37 },
    images: [
      "https://i.pinimg.com/originals/87/4d/c4/874dc41cde96a65b73e01298b2d90961.jpg",
    ],
    variants: [
      { size: "90ml", volumeDisplay: "90ml Classic Flacon", price: "₹1,725", priceNum: 1725 },
    ],
    productUrl: "https://www.perfumenetwork.in/collections/david-beckham/products/classic-blue",
  },

  // 30. Guess Girl
  {
    id: "guess-girl",
    slug: "guess-girl",
    name: "Guess Girl",
    brand: "Guess",
    subtitle: "Fruity Floral Raspberry Orchid & Madagascar Vanilla",
    family: "Floral",
    concentration: "Eau de Toilette",
    price: "₹3,780",
    priceNum: 3780,
    volume: "100ml",
    badge: "Bestseller",
    description:
      "A playful fruity-floral perfume with juicy raspberry and melon, a delicate orchid-acacia floral heart, and a smooth vanilla-sandalwood base.",
    story: {
      inspiration:
        "Sunny California glamour: sweet raspberry nectar, Brazilian paradise orchids, and velvety vanilla blossoms.",
      personality:
        "Flirtatious, bubbly, sunny, and effervescent.",
      recommendedOccasions:
        "Daytime dates, warm sunny weekends, and casual celebrations.",
    },
    notes: {
      top: "Raspberry, Melon, Bergamot",
      heart: "Brazilian Paradise Orchid, Provencal Acacia, Lilies",
      base: "Australian Sandalwood, Madagascar Vanilla",
    },
    accordTags: ["raspberry", "melon", "orchid", "vanilla", "fruity floral"],
    collections: ["designer"],
    character: "Sweet",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Romantic",
    inStock: true,
    accentColor: "#FD79A8",
    ratingDemo: { score: 4.6, count: 68 },
    images: [
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/Tu2-5boUtM-952561_1.jpg",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/2c2xVfJnVy-952561_2.jpg",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/wGWwT1xwUx-952561_3.jpg",
      "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w%3A176/Eospr0mfWL-952561_4.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Ribbon Flacon", price: "₹3,780", priceNum: 3780 },
    ],
    productUrl: "https://www.nykaa.com/guess-girl-eau-de-toilette/p/13913000",
  },

  // 31. Tommy Hilfiger Tommy Now
  {
    id: "tommy-hilfiger-tommy-now",
    slug: "tommy-hilfiger-tommy-now",
    name: "Tommy Hilfiger Tommy Now",
    brand: "Tommy Hilfiger",
    subtitle: "Modern Fresh Spicy Bergamot Ginger & Amberwood",
    family: "Fresh",
    concentration: "Eau de Toilette",
    price: "₹4,640",
    priceNum: 4640,
    volume: "100ml",
    badge: null,
    description:
      "A modern fresh-spicy woody fragrance with a bright citrus-ginger impression and warm amberwood character. A casual everyday option.",
    story: {
      inspiration:
        "Instant street energy: classic collegiate Americana electrified with fresh ginger and bold amberwood.",
      personality:
        "Urban, spirited, dynamic, and effortlessly fresh.",
      recommendedOccasions:
        "Daily wear, university campus, and casual city outings.",
    },
    notes: {
      top: "Bergamot, Mandarin, Ginger",
      heart: "Geranium, Cardamom",
      base: "Amberwood, Moss, Sandalwood",
    },
    accordTags: ["bergamot", "ginger", "amberwood", "fresh spicy", "casual"],
    collections: ["designer", "fresh-collection"],
    character: "Fresh",
    occasion: "Everyday",
    intensity: "Moderate",
    mood: "Energetic",
    inStock: true,
    accentColor: "#C0392B",
    ratingDemo: { score: 4.5, count: 40 },
    images: [
      "https://www.perfumestudiomnl.com/cdn/shop/files/0482B799-6EC8-4477-BAC7-5A3A666A625F.jpg?v=1716536952&width=1445",
      "https://www.fresh-store.eu/105678-large_default/tommy-hilfiger-tommy-now-eau-de-toilette-for-men-100-ml.jpg",
    ],
    variants: [
      { size: "100ml", volumeDisplay: "100ml Eau de Toilette Flacon", price: "₹4,640", priceNum: 4640 },
    ],
    productUrl: "https://www.myntra.com/perfume/tommyhilfiger/tommy-hilfiger-men-tommy-now-eau-de-toilette-100-ml/10893344/buy",
  },
];

// Featured Fragrances for Homepage & Highlights
export const FEATURED_FRAGRANCES = PRODUCTS_CATALOG.filter((p) => p.badge === "Bestseller").slice(0, 4);

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS_CATALOG.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedProducts(currentSlug: string, count = 3): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return PRODUCTS_CATALOG.slice(0, count);

  return PRODUCTS_CATALOG.filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      // Prioritize same family or brand
      if (a.brand === current.brand && b.brand !== current.brand) return -1;
      if (b.brand === current.brand && a.brand !== current.brand) return 1;
      if (a.family === current.family && b.family !== current.family) return -1;
      if (b.family === current.family && a.family !== current.family) return 1;
      return 0;
    })
    .slice(0, count);
}

// Export alias for Storefront E-commerce & database synchronization
export const PRODUCTS = PRODUCTS_CATALOG;
