"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Save,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Layout,
  Layers,
  Megaphone,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getCmsHomepage,
  updateCmsHomepage,
  getCmsBanners,
  createCmsBanner,
  updateCmsBanner,
  deleteCmsBanner,
} from "@/lib/admin/store";
import { CmsHomepageData, CmsBanner } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function ContentManagementPage() {
  const { adminUser, hasPerm } = useAdminAuth();

  // Active Tab: "homepage" or "banners"
  const [activeTab, setActiveTab] = useState<"homepage" | "banners">("homepage");

  // Homepage Form State
  const [homepageData, setHomepageData] = useState<CmsHomepageData>(getCmsHomepage());
  const [banners, setBanners] = useState<CmsBanner[]>(getCmsBanners());

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Banner Modal
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<CmsBanner | null>(null);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerEyebrow, setBannerEyebrow] = useState("");
  const [bannerCtaLabel, setBannerCtaLabel] = useState("");
  const [bannerCtaUrl, setBannerCtaUrl] = useState("");
  const [bannerPlacement, setBannerPlacement] = useState<CmsBanner["placement"]>("announcement_bar");
  const [bannerActive, setBannerActive] = useState(true);

  // Save Homepage Changes
  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !hasPerm("content", "edit")) return;

    const updated = updateCmsHomepage(homepageData, adminUser);
    setHomepageData(updated);
    showToast("Storefront homepage & narrative content synchronized successfully.");
  };

  // Open Banner Modal
  const handleOpenCreateBanner = () => {
    setEditingBanner(null);
    setBannerTitle("");
    setBannerEyebrow("");
    setBannerCtaLabel("Acquire Flacon");
    setBannerCtaUrl("/shop");
    setBannerPlacement("announcement_bar");
    setBannerActive(true);
    setBannerModalOpen(true);
  };

  const handleOpenEditBanner = (b: CmsBanner) => {
    setEditingBanner(b);
    setBannerTitle(b.title);
    setBannerEyebrow(b.eyebrow || "");
    setBannerCtaLabel(b.ctaLabel || "Acquire Flacon");
    setBannerCtaUrl(b.ctaUrl || "/shop");
    setBannerPlacement(b.placement);
    setBannerActive(b.isActive);
    setBannerModalOpen(true);
  };

  // Save Banner
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;
    if (!bannerTitle.trim()) {
      showToast("Please provide a banner title.", "error");
      return;
    }

    if (editingBanner) {
      const updated = updateCmsBanner(
        editingBanner.id,
        {
          title: bannerTitle.trim(),
          eyebrow: bannerEyebrow.trim(),
          ctaLabel: bannerCtaLabel.trim(),
          ctaUrl: bannerCtaUrl.trim(),
          placement: bannerPlacement,
          isActive: bannerActive,
        },
        adminUser
      );
      if (updated) {
        setBanners(getCmsBanners());
        showToast(`Banner "${updated.title}" updated.`);
      }
    } else {
      const created = createCmsBanner(
        {
          title: bannerTitle.trim(),
          eyebrow: bannerEyebrow.trim(),
          ctaLabel: bannerCtaLabel.trim(),
          ctaUrl: bannerCtaUrl.trim(),
          placement: bannerPlacement,
          isActive: bannerActive,
        },
        adminUser
      );
      setBanners(getCmsBanners());
      showToast(`Banner "${created.title}" published.`);
    }

    setBannerModalOpen(false);
  };

  // Delete Banner
  const handleDeleteBanner = (b: CmsBanner) => {
    if (!adminUser || !hasPerm("content", "delete")) return;
    if (confirm(`Remove banner "${b.title}"?`)) {
      const success = deleteCmsBanner(b.id, adminUser);
      if (success) {
        setBanners(getCmsBanners());
        showToast(`Banner "${b.title}" removed.`);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div
          className={`fixed top-20 right-8 z-50 flex items-center space-x-3 px-4 py-3 rounded border text-xs shadow-xl animate-fade-in ${
            toastMessage.type === "success"
              ? "bg-[#14120F] border-[#C8A45D]/40 text-[#EDE8D0]"
              : "bg-red-950/90 border-red-500/50 text-red-200"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 size={16} className="text-[#C8A45D] shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-red-400 shrink-0" />
          )}
          <span className="font-serif tracking-wide">{toastMessage.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A241E]">
        <div>
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#C8A45D] font-mono mb-1">
            <Layout size={13} />
            <span>Storefront Publishing &amp; Editorial</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            CMS &amp; Editorial Content Management
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Control homepage hero typography, announcement banners, brand storytelling, and promotional ribbons.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center space-x-1.5 px-3 py-2 border border-[#2A241E] hover:border-[#C8A45D]/50 text-xs text-[#EDE8D0] rounded transition-colors"
          >
            <span>Preview Storefront</span>
            <ExternalLink size={13} className="text-[#C8A45D]" />
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2A241E] space-x-6">
        <button
          onClick={() => setActiveTab("homepage")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "homepage"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <FileText size={13} />
          <span>Homepage Typography &amp; Story</span>
        </button>
        <button
          onClick={() => setActiveTab("banners")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "banners"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Megaphone size={13} />
          <span>Promotional Banners ({banners.length})</span>
        </button>
      </div>

      {activeTab === "homepage" ? (
        <form onSubmit={handleSaveHomepage} className="space-y-6">
          {/* 1. Global Announcement Strip */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <Megaphone size={13} />
              <span>Global Announcement Bar Ribbon</span>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Announcement Message (Displayed across header banner)
              </label>
              <input
                type="text"
                required
                value={homepageData.announcementText}
                onChange={(e) =>
                  setHomepageData({ ...homepageData, announcementText: e.target.value })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          {/* 2. Hero Section */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <Layers size={13} strokeWidth={1.5} />
              <span>Homepage Hero Section Copy</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Hero Eyebrow Moniker
                </label>
                <input
                  type="text"
                  required
                  value={homepageData.heroEyebrow}
                  onChange={(e) =>
                    setHomepageData({ ...homepageData, heroEyebrow: e.target.value })
                  }
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Primary CTA Button Label
                </label>
                <input
                  type="text"
                  required
                  value={homepageData.heroCtaText}
                  onChange={(e) =>
                    setHomepageData({ ...homepageData, heroCtaText: e.target.value })
                  }
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                required
                value={homepageData.heroHeading}
                onChange={(e) =>
                  setHomepageData({ ...homepageData, heroHeading: e.target.value })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-serif focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Hero Poetic Description
              </label>
              <textarea
                rows={3}
                required
                value={homepageData.heroDescription}
                onChange={(e) =>
                  setHomepageData({ ...homepageData, heroDescription: e.target.value })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          {/* 3. Brand Story & Craftsmanship Manifesto */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <FileText size={13} />
              <span>Brand Story &amp; Craftsmanship Manifesto</span>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Story Heading
              </label>
              <input
                type="text"
                required
                value={homepageData.brandStoryHeading}
                onChange={(e) =>
                  setHomepageData({ ...homepageData, brandStoryHeading: e.target.value })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-serif focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Manifesto Narrative Body
              </label>
              <textarea
                rows={4}
                required
                value={homepageData.brandStoryText}
                onChange={(e) =>
                  setHomepageData({ ...homepageData, brandStoryText: e.target.value })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          {/* Save Button */}
          {hasPerm("content", "edit") && (
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors shadow-lg"
              >
                <Save size={15} />
                <span>Save &amp; Publish Storefront Content</span>
              </button>
            </div>
          )}
        </form>
      ) : (
        /* Banners Tab */
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#8E8271]">
              Promotional ribbons, hero banners, and seasonal campaign allocations.
            </span>
            {hasPerm("content", "create") && (
              <button
                onClick={handleOpenCreateBanner}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <Plus size={14} />
                <span>Create Banner</span>
              </button>
            )}
          </div>

          <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                  <th className="py-3.5 px-4 font-medium">Banner Title &amp; Eyebrow</th>
                  <th className="py-3.5 px-4 font-medium">Placement Hub</th>
                  <th className="py-3.5 px-4 font-medium">CTA Label &amp; URL</th>
                  <th className="py-3.5 px-4 font-medium text-center">Status</th>
                  <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A241E]/60">
                {banners.map((b) => (
                  <tr key={b.id} className="hover:bg-[#1A1612]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-serif text-[#F5F2EA] font-medium block">
                        {b.title}
                      </span>
                      {b.eyebrow && (
                        <span className="text-[10px] text-[#C8A45D] font-mono">
                          {b.eyebrow}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[#8E8271] capitalize">
                      {b.placement.replace("_", " ")}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[#EDE8D0] block">{b.ctaLabel || "&mdash;"}</span>
                      <span className="text-[10px] text-[#665D4F] font-mono">{b.ctaUrl || "/"}</span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge
                        status={b.isActive ? "active" : "inactive"}
                        tone={b.isActive ? "success" : "neutral"}
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {hasPerm("content", "edit") && (
                          <button
                            onClick={() => handleOpenEditBanner(b)}
                            className="p-1.5 text-[#8E8271] hover:text-[#EDE8D0] rounded transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}

                        {hasPerm("content", "delete") && (
                          <button
                            onClick={() => handleDeleteBanner(b)}
                            className="p-1.5 text-[#8E8271] hover:text-red-400 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Banner Modal */}
      <AdminModal
        isOpen={bannerModalOpen}
        onClose={() => setBannerModalOpen(false)}
        title={editingBanner ? `Edit Banner: ${editingBanner.title}` : "Create Promotional Banner"}
        subtitle="Configure headline, placement destination, and client action URL."
        maxWidth="md"
      >
        <form onSubmit={handleSaveBanner} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Banner Headline *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Winter Solstice Extrait Allocation"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              placeholder="e.g. Limited Seasonal Allocation"
              value={bannerEyebrow}
              onChange={(e) => setBannerEyebrow(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={bannerCtaLabel}
                onChange={(e) => setBannerCtaLabel(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                CTA Target URL
              </label>
              <input
                type="text"
                value={bannerCtaUrl}
                onChange={(e) => setBannerCtaUrl(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Placement Hub
            </label>
            <select
              value={bannerPlacement}
              onChange={(e) => setBannerPlacement(e.target.value as CmsBanner["placement"])}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            >
              <option value="announcement_bar">Top Announcement Bar</option>
              <option value="hero">Homepage Hero Banner</option>
              <option value="collection_header">Collection Catalog Header</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="bannerActive"
              checked={bannerActive}
              onChange={(e) => setBannerActive(e.target.checked)}
              className="rounded border-[#2A241E] bg-[#0D0B09] text-[#C8A45D] focus:ring-[#C8A45D]"
            />
            <label htmlFor="bannerActive" className="text-xs text-[#F5F2EA] cursor-pointer">
              Active / Visible on Storefront
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
            <button
              type="button"
              onClick={() => setBannerModalOpen(false)}
              className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
            >
              {editingBanner ? "Save Changes" : "Publish Banner"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
