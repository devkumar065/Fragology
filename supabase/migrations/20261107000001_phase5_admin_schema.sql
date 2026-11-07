-- ==============================================================================
-- FRAGOLOGY — Phase 5 Admin Dashboard, Staff RBAC, Audit Logs & Store Operations
-- Supabase PostgreSQL Migration
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Admin Memberships & Role-Based Access Control (RBAC)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (
    role IN (
      'super_admin',
      'product_manager',
      'inventory_manager',
      'order_manager',
      'customer_support',
      'marketing_manager',
      'content_manager'
    )
  ),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  avatar_url TEXT,
  phone TEXT,
  invited_by UUID REFERENCES public.admin_memberships(id),
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. Immutable Administrative Activity / Audit Logs
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  admin_role TEXT NOT NULL,
  action TEXT NOT NULL, -- e.g. 'product.create', 'order.status_update', 'inventory.adjust'
  module TEXT NOT NULL, -- 'products', 'orders', 'inventory', 'customers', 'settings', etc.
  record_reference TEXT NOT NULL, -- e.g. 'FRG-20261107-8491', 'prod-golden-reverie'
  change_summary TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for speedy audit queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_module ON public.admin_activity_logs(module);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.admin_activity_logs(created_at DESC);

-- ------------------------------------------------------------------------------
-- 3. Inventory Movements Ledger
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_size TEXT NOT NULL,
  previous_quantity INTEGER NOT NULL,
  change_amount INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reason TEXT NOT NULL CHECK (
    reason IN (
      'restock',
      'order_fulfillment',
      'order_cancellation',
      'damaged',
      'returned',
      'manual_audit',
      'promotional_allocation'
    )
  ),
  admin_id TEXT,
  admin_email TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inv_mov_product ON public.inventory_movements(product_id);

-- ------------------------------------------------------------------------------
-- 4. Product Categories Taxonomy
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. Customer Product Reviews & Moderation
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderated_by TEXT,
  moderated_at TIMESTAMPTZ,
  moderation_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.product_reviews(product_id, status);

-- ------------------------------------------------------------------------------
-- 6. Marketing Subscribers & Campaigns
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.marketing_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'website_newsletter',
  consent_status TEXT NOT NULL DEFAULT 'subscribed' CHECK (consent_status IN ('subscribed', 'unsubscribed')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  preview_text TEXT,
  content_body TEXT NOT NULL,
  target_audience TEXT DEFAULT 'all_subscribers',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
  scheduled_for TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  recipient_count INTEGER DEFAULT 0,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. CMS Content: Homepage Sections & Promotional Banners
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cms_homepage_sections (
  id TEXT PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  updated_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cms_promotional_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  eyebrow TEXT,
  cta_label TEXT,
  cta_url TEXT,
  desktop_image_url TEXT,
  mobile_image_url TEXT,
  placement TEXT DEFAULT 'announcement_bar',
  is_active BOOLEAN DEFAULT TRUE,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. Admin Notification Center
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (
    type IN (
      'new_order',
      'payment_alert',
      'low_stock',
      'out_of_stock',
      'refund_request',
      'new_review',
      'contact_enquiry'
    )
  ),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_notif_unread ON public.admin_notifications(is_read, created_at DESC);

-- ------------------------------------------------------------------------------
-- 9. Comprehensive Store Settings Key-Value Store
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.store_settings (
  key TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('general', 'payment', 'shipping', 'tax', 'notification', 'security')),
  value JSONB NOT NULL,
  updated_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. Row-Level Security (RLS) for Admin Infrastructure
-- ------------------------------------------------------------------------------
ALTER TABLE public.admin_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_promotional_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Helper function: check if caller is an active admin
CREATE OR REPLACE FUNCTION public.is_active_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_memberships
    WHERE user_id = auth.uid() AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public can read approved reviews and active categories
CREATE POLICY "Public read approved reviews" ON public.product_reviews
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Public read active categories" ON public.product_categories
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read active banners" ON public.cms_promotional_banners
  FOR SELECT USING (is_active = TRUE);

-- Admin full access policies
CREATE POLICY "Admin manage all admin memberships" ON public.admin_memberships
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage audit logs" ON public.admin_activity_logs
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage inventory movements" ON public.inventory_movements
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage categories" ON public.product_categories
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage reviews" ON public.product_reviews
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage subscribers" ON public.marketing_subscribers
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage campaigns" ON public.marketing_campaigns
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage cms" ON public.cms_homepage_sections
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage banners" ON public.cms_promotional_banners
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage notifications" ON public.admin_notifications
  FOR ALL USING (public.is_active_admin());

CREATE POLICY "Admin manage settings" ON public.store_settings
  FOR ALL USING (public.is_active_admin());
