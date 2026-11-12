"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Gem,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Star,
  Package,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminCollections,
  createAdminCollection,
  updateAdminCollection,
  deleteAdminCollection,
  getAdminProducts,
} from "@/lib/admin/store";
import { ProductCollectionAdmin } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function CollectionsPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const [collections, setCollections] = useState<ProductCollectionAdmin[]>(getAdminCollections());
  const allProducts = useMemo(() => getAdminProducts(), []);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "featured">("all");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<ProductCollectionAdmin | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState<number>(1);

  // Open Create
  const handleOpenCreate = () => {
    setEditingCollection(null);
    setName("");
    setSlug("");
    setSubtitle("");
    setDescription("");
    setSelectedProductIds([]);
    setIsFeatured(false);
    setIsActive(true);
    setDisplayOrder(collections.length + 1);
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (col: ProductCollectionAdmin) => {
    setEditingCollection(col);
    setName(col.name);
    setSlug(col.slug);
    setSubtitle(col.subtitle || "");
    setDescription(col.description);
    setSelectedProductIds(col.productIds || []);
    setIsFeatured(col.isFeatured);
    setIsActive(col.isActive);
    setDisplayOrder(col.displayOrder);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCollection) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  // Toggle Product in Collection
  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;
    if (!name.trim()) {
      showToast("Please enter a collection name.", "error");
      return;
    }

    if (editingCollection) {
      const updated = updateAdminCollection(
        editingCollection.id,
        {
          name: name.trim(),
          slug: slug.trim() || editingCollection.slug,
          subtitle: subtitle.trim(),
          description: description.trim(),
          productIds: selectedProductIds,
          productCount: selectedProductIds.length,
          isFeatured,
          isActive,
          displayOrder,
        },
        adminUser
      );

      if (updated) {
        setCollections(getAdminCollections());
        showToast(`Collection "${updated.name}" updated successfully.`);
      }
    } else {
      const created = createAdminCollection(
        {
          name: name.trim(),
          slug: slug.trim() || `col-${Date.now()}`,
          subtitle: subtitle.trim(),
          description: description.trim(),
          productIds: selectedProductIds,
          productCount: selectedProductIds.length,
          isFeatured,
          isActive,
          displayOrder,
        },
        adminUser
      );
      setCollections(getAdminCollections());
      showToast(`Collection "${created.name}" curated successfully.`);
    }

    setIsModalOpen(false);
  };

  // Delete
  const handleDelete = (col: ProductCollectionAdmin) => {
    if (!adminUser || !hasPerm("collections", "delete")) return;
    if (confirm(`Are you certain you wish to remove the "${col.name}" collection?`)) {
      const success = deleteAdminCollection(col.id, adminUser);
      if (success) {
        setCollections(getAdminCollections());
        showToast(`Collection "${col.name}" removed.`);
      }
    }
  };

  // Filter
  const filteredCollections = useMemo(() => {
    return collections
      .filter((c) => {
        if (statusFilter === "active") return c.isActive;
        if (statusFilter === "featured") return c.isFeatured;
        return true;
      })
      .filter((c) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          (c.subtitle && c.subtitle.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [collections, statusFilter, searchQuery]);

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
            <Gem size={13} strokeWidth={1.5} />
            <span>Maison Curations</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Product Collections &amp; Anthologies
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Curate thematic fragrance suites, seasonal extraits, and signature collector anthologies.
          </p>
        </div>

        {hasPerm("collections", "create") && (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>Create Collection</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
          <input
            type="text"
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "featured")}
            className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
          >
            <option value="all">All ({collections.length})</option>
            <option value="active">Active Only</option>
            <option value="featured">Featured Curations</option>
          </select>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollections.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[#8E8271] bg-[#14120F] border border-[#2A241E] rounded">
            No collections found matching your criteria.
          </div>
        ) : (
          filteredCollections.map((col) => (
            <div
              key={col.id}
              className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden flex flex-col justify-between hover:border-[#C8A45D]/40 transition-colors group"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#C8A45D] uppercase tracking-wider">
                      #{col.displayOrder} &bull; /{col.slug}
                    </span>
                    <h2 className="font-serif text-lg text-[#F5F2EA] font-light mt-0.5 group-hover:text-[#C8A45D] transition-colors">
                      {col.name}
                    </h2>
                    {col.subtitle && (
                      <p className="text-[11px] text-[#8E8271] italic mt-0.5">{col.subtitle}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end space-y-1 shrink-0">
                    {col.isFeatured && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#C8A45D]/15 text-[#C8A45D] border border-[#C8A45D]/30">
                        <Star size={10} className="fill-[#C8A45D]" />
                        <span>Featured</span>
                      </span>
                    )}
                    <StatusBadge
                      status={col.isActive ? "active" : "inactive"}
                      tone={col.isActive ? "success" : "neutral"}
                    />
                  </div>
                </div>

                <p className="text-xs text-[#B3A898] line-clamp-3 leading-relaxed">
                  {col.description}
                </p>

                {/* Assigned products summary */}
                <div className="pt-2 border-t border-[#2A241E]/60 flex items-center justify-between text-[11px] text-[#8E8271]">
                  <div className="flex items-center space-x-1.5">
                    <Package size={13} className="text-[#C8A45D]" />
                    <span>{col.productCount || col.productIds.length} Flacons Curated</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#665D4F]">
                    Updated Nov 2026
                  </span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-5 py-3 bg-[#0D0B09]/80 border-t border-[#2A241E] flex items-center justify-between">
                <Link
                  href={`/collections/${col.slug}`}
                  target="_blank"
                  className="inline-flex items-center space-x-1.5 text-[11px] text-[#C8A45D] hover:underline"
                >
                  <span>View in Store</span>
                  <ExternalLink size={12} />
                </Link>

                <div className="flex items-center space-x-1">
                  {hasPerm("collections", "edit") && (
                    <button
                      onClick={() => handleOpenEdit(col)}
                      className="p-1.5 text-[#8E8271] hover:text-[#F5F2EA] rounded transition-colors"
                      title="Edit Collection"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}

                  {hasPerm("collections", "delete") && (
                    <button
                      onClick={() => handleDelete(col)}
                      className="p-1.5 text-[#8E8271] hover:text-red-400 rounded transition-colors"
                      title="Delete Collection"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCollection ? `Edit Collection: ${editingCollection.name}` : "Curate New Collection"}
        subtitle="Manage anthology narrative, featured status, and curated fragrances."
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Collection Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Nocturnal Harvest Series"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Subtitle / Poetic Moniker
              </label>
              <input
                type="text"
                placeholder="e.g. The Rare Winter Distillations"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="bg-[#1A1612] border border-r-0 border-[#2A241E] px-3 py-2 text-xs text-[#665D4F] font-mono rounded-l">
                /collections/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded-r px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Curatorial Narrative &amp; Story
            </label>
            <textarea
              rows={3}
              placeholder="The philosophy, maceration notes, and heritage of this anthology..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          {/* Product Multi-Select */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1.5">
              Curate Flacons into this Anthology ({selectedProductIds.length} selected)
            </label>
            <div className="max-h-48 overflow-y-auto bg-[#0D0B09] border border-[#2A241E] rounded divide-y divide-[#2A241E]/50 p-2">
              {allProducts.map((prod) => {
                const isSelected = selectedProductIds.includes(prod.id);
                return (
                  <label
                    key={prod.id}
                    className="flex items-center justify-between py-2 px-2 hover:bg-[#1A1612] cursor-pointer rounded transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleProductSelection(prod.id)}
                        className="rounded border-[#2A241E] bg-[#14120F] text-[#C8A45D] focus:ring-[#C8A45D]"
                      />
                      <div>
                        <span className="text-xs text-[#F5F2EA] font-serif block">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-[#8E8271]">
                          {prod.family} &bull; {prod.concentration}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#C8A45D]">
                      {prod.price}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Display Order Sort
              </label>
              <input
                type="number"
                min={1}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-[#2A241E] bg-[#0D0B09] text-[#C8A45D] focus:ring-[#C8A45D]"
              />
              <label htmlFor="isFeatured" className="text-xs text-[#F5F2EA] cursor-pointer">
                Feature on Homepage
              </label>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-[#2A241E] bg-[#0D0B09] text-[#C8A45D] focus:ring-[#C8A45D]"
              />
              <label htmlFor="isActive" className="text-xs text-[#F5F2EA] cursor-pointer">
                Active in Store
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
            >
              {editingCollection ? "Save Changes" : "Create Collection"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
