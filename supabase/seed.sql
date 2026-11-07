-- ==============================================================================
-- FRAGOLOGY — Phase 4 Database Seed Data
-- Authoritative Products, Variants, Stock, and Maison Coupons
-- ==============================================================================

-- Clean existing data for idempotency in local testing
TRUNCATE TABLE public.order_items, public.orders, public.cart_items, public.carts, public.wishlists, public.product_variants, public.products, public.coupons CASCADE;

-- ------------------------------------------------------------------------------
-- 1. Insert Canonical Products
-- ------------------------------------------------------------------------------
INSERT INTO public.products (id, slug, name, subtitle, family, concentration, base_price_num, base_price_display, badge, description, top_notes, heart_notes, base_notes, accent_color, in_stock)
VALUES
(
  'golden-reverie',
  'golden-reverie',
  'Golden Reverie',
  'Luminous Amber & Persian Saffron',
  'Oriental',
  'Extrait de Parfum (30%)',
  240.00,
  '$240',
  'Bestseller',
  'A radiant contemplation of warm amber resins, saffron threads, and aged Bourbon vanilla.',
  'Persian Saffron, Calabrian Bergamot Zest, Pink Pepper',
  'Golden Amber, Heliotrope, Cardamom Pods',
  'Bourbon Vanilla, Labdanum Resin, Benzoin Tears',
  '#C8A45D',
  TRUE
),
(
  'velvet-essence',
  'velvet-essence',
  'Velvet Essence',
  'Florentine Leather & Atlas Cedar',
  'Woody',
  'Extrait de Parfum (30%)',
  260.00,
  '$260',
  'Limited Edition',
  'A profound journey through hand-burnished calfskin leather, smoked Atlas cedar, and roasted tonka.',
  'Bitter Orange Peel, Clary Sage, Smoked Nutmeg',
  'Florentine Leather Accord, Atlas Cedarwood, Violet Leaf',
  'Roasted Tonka Bean, Birch Tar, Dark Ambergris',
  '#AE8847',
  TRUE
),
(
  'amber-dusk',
  'amber-dusk',
  'Amber Dusk',
  'Smoky Incense & Resinous Labdanum',
  'Oriental',
  'Eau de Parfum (20%)',
  195.00,
  '$195',
  NULL,
  'The golden tranquility of twilight caught between burning embers and cool desert stone.',
  'Olibanum Incense, Cardamom Seed, Mandarin Zest',
  'Spanish Labdanum, Honeyed Myrrh, Cistus Flower',
  'Golden Benzoin, Styrax Resin, Bourbon Patchouli',
  '#C8A45D',
  TRUE
),
(
  'midnight-bloom',
  'midnight-bloom',
  'Midnight Bloom',
  'Night-Blooming Jasmine & Cashmere Woods',
  'Floral',
  'Eau de Parfum (20%)',
  210.00,
  '$210',
  'New',
  'Intoxicating white florals harvested by moonlight when their indolic beauty peaks.',
  'Neroli Petals, Green Pear, Pink Grapefruit',
  'Night Jasmine Sambac, Grasse Tuberose, Gardenia Milk',
  'Cashmere Wood, Sheer Musk, Clean Cedar',
  '#E2C78D',
  TRUE
),
(
  'santale-nocturne',
  'santale-nocturne',
  'Santal Nocturne',
  'Australian Sandalwood & Spiced Cardamom',
  'Woody',
  'Extrait de Parfum (30%)',
  255.00,
  '$255',
  'Bestseller',
  'Sacred creamy sandalwood wrapped in cool Guatemalan cardamom and powdered iris root.',
  'Guatemalan Cardamom, Violet Leaf, Carrot Seed',
  'Australian Sandalwood, Florentine Orris Butter, Papyrus',
  'Cedarwood Chips, White Musk, Virginian Amber',
  '#80633B',
  TRUE
),
(
  'solaris-citron',
  'solaris-citron',
  'Solaris Citron',
  'Calabrian Bergamot & Sunlit Neroli',
  'Fresh',
  'Eau de Parfum (20%)',
  185.00,
  '$185',
  NULL,
  'Luminous Mediterranean citrus groves warmed by midday sunlight over coastal cliffs.',
  'Calabrian Bergamot, Amalfi Lemon, Bitter Petitgrain',
  'Orange Blossom Absolute, Sea Salt Mist, Rosemary',
  'Sunlit Driftwood, White Amber, Ambrette Seed',
  '#E2C78D',
  TRUE
),
(
  'fleur-de-soie',
  'fleur-de-soie',
  'Fleur de Soie',
  'Grasse Rose Centifolia & Silk Petals',
  'Floral',
  'Eau de Parfum (20%)',
  220.00,
  '$220',
  NULL,
  'The delicate touch of pure silk against skin, infused with dewy May rose petals.',
  'Lychee Flesh, Dewy Peony, Italian Mandarin',
  'Grasse Rose Centifolia, Damask Rose Otto, Magnolia',
  'White Cashmeran, Powdery Musk, Honey Amber',
  '#C8A45D',
  TRUE
),
(
  'vetiver-celeste',
  'vetiver-celeste',
  'Vétiver Céleste',
  'Haitian Vetiver & Smoked Cypress',
  'Woody',
  'Eau de Parfum (20%)',
  225.00,
  '$225',
  NULL,
  'Earthy refinement elevated to the heavens. Sun-dried roots distilled with sharp cypress.',
  'Pink Peppercorn, Juniper Berry, Bitter Grapefruit',
  'Haitian Vetiver Root, Italian Cypress, Clary Sage',
  'Smoked Birch, Indonesian Patchouli, Dry Amber',
  '#AE8847',
  TRUE
);

-- ------------------------------------------------------------------------------
-- 2. Insert Product Variants
-- ------------------------------------------------------------------------------
INSERT INTO public.product_variants (product_id, size, volume_display, price_num, price_display, sku, stock_quantity)
VALUES
-- Golden Reverie
('golden-reverie', '30ml', '30ml Travel Flacon', 110.00, '$110', 'FRG-GOLD-30', 50),
('golden-reverie', '50ml', '50ml Presentation Flacon', 165.00, '$165', 'FRG-GOLD-50', 75),
('golden-reverie', '100ml', '100ml Architectural Flacon', 240.00, '$240', 'FRG-GOLD-100', 100),

-- Velvet Essence
('velvet-essence', '30ml', '30ml Travel Flacon', 120.00, '$120', 'FRG-VELV-30', 40),
('velvet-essence', '50ml', '50ml Presentation Flacon', 180.00, '$180', 'FRG-VELV-50', 60),
('velvet-essence', '100ml', '100ml Architectural Flacon', 260.00, '$260', 'FRG-VELV-100', 80),

-- Amber Dusk
('amber-dusk', '30ml', '30ml Travel Flacon', 90.00, '$90', 'FRG-AMBR-30', 60),
('amber-dusk', '50ml', '50ml Presentation Flacon', 135.00, '$135', 'FRG-AMBR-50', 80),
('amber-dusk', '100ml', '100ml Architectural Flacon', 195.00, '$195', 'FRG-AMBR-100', 95),

-- Midnight Bloom
('midnight-bloom', '30ml', '30ml Travel Flacon', 95.00, '$95', 'FRG-MIDN-30', 55),
('midnight-bloom', '50ml', '50ml Presentation Flacon', 145.00, '$145', 'FRG-MIDN-50', 70),
('midnight-bloom', '100ml', '100ml Architectural Flacon', 210.00, '$210', 'FRG-MIDN-100', 85),

-- Santal Nocturne
('santale-nocturne', '30ml', '30ml Travel Flacon', 115.00, '$115', 'FRG-SANT-30', 45),
('santale-nocturne', '50ml', '50ml Presentation Flacon', 175.00, '$175', 'FRG-SANT-50', 65),
('santale-nocturne', '100ml', '100ml Architectural Flacon', 255.00, '$255', 'FRG-SANT-100', 85),

-- Solaris Citron
('solaris-citron', '30ml', '30ml Travel Flacon', 85.00, '$85', 'FRG-SOLA-30', 60),
('solaris-citron', '50ml', '50ml Presentation Flacon', 125.00, '$125', 'FRG-SOLA-50', 80),
('solaris-citron', '100ml', '100ml Architectural Flacon', 185.00, '$185', 'FRG-SOLA-100', 100),

-- Fleur de Soie
('fleur-de-soie', '30ml', '30ml Travel Flacon', 100.00, '$100', 'FRG-FLEU-30', 50),
('fleur-de-soie', '50ml', '50ml Presentation Flacon', 150.00, '$150', 'FRG-FLEU-50', 70),
('fleur-de-soie', '100ml', '100ml Architectural Flacon', 220.00, '$220', 'FRG-FLEU-100', 90),

-- Vétiver Céleste
('vetiver-celeste', '30ml', '30ml Travel Flacon', 100.00, '$100', 'FRG-VETI-30', 50),
('vetiver-celeste', '50ml', '50ml Presentation Flacon', 150.00, '$150', 'FRG-VETI-50', 70),
('vetiver-celeste', '100ml', '100ml Architectural Flacon', 225.00, '$225', 'FRG-VETI-100', 90);

-- ------------------------------------------------------------------------------
-- 3. Insert Maison Promotional Coupons
-- ------------------------------------------------------------------------------
INSERT INTO public.coupons (code, description, discount_type, discount_value, min_order_value, max_discount, usage_limit, is_active)
VALUES
('FRAGOLOGY10', 'Maison Privilège: 10% complimentary courtesy across all orders', 'percentage', 10.00, 0, NULL, 500, TRUE),
('MAISON20', 'Haute Parfumerie Invitation: 20% privilege on orders exceeding $300', 'percentage', 20.00, 300.00, 150.00, 200, TRUE),
('WELCOME50', 'New Client Courtesy: $50 credit for orders exceeding $250', 'fixed', 50.00, 250.00, 50.00, 100, TRUE);
