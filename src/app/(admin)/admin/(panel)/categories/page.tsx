"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} from "@/lib/admin/store";
import { ProductCategory } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function CategoriesPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const [categories, setCategories] = useState<ProductCategory[]>(getAdminCategories());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isActive, setIsActive] = useState(true);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setDisplayOrder(categories.length + 1);
    setIsActive(true);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (cat: ProductCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description);
    setDisplayOrder(cat.displayOrder);
    setIsActive(cat.isActive);
    setIsModalOpen(true);
  };

  // Auto-slugify
  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  // Save (Create or Update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;
    if (!name.trim()) {
      showToast("Please enter a category name.", "error");
      return;
    }

    if (editingCategory) {
      const updated = updateAdminCategory(
        editingCategory.id,
        {
          name: name.trim(),
          slug: slug.trim() || editingCategory.slug,
          description: description.trim(),
          displayOrder,
          isActive,
        },
        adminUser
      );

      if (updated) {
        setCategories(getAdminCategories());
        showToast(`Category "${updated.name}" updated successfully.`);
      }
    } else {
      const created = createAdminCategory(
        {
          name: name.trim(),
          slug: slug.trim() || `cat-${Date.now()}`,
          description: description.trim(),
          displayOrder,
          isActive,
          productCount: 0,
        },
        adminUser
      );
      setCategories(getAdminCategories());
      showToast(`Category "${created.name}" created successfully.`);
    }

    setIsModalOpen(false);
  };

  // Toggle Category Active Status
  const handleToggleActive = (cat: ProductCategory) => {
    if (!adminUser || !hasPerm("categories", "edit")) return;
    const updated = updateAdminCategory(
      cat.id,
      { isActive: !cat.isActive },
      adminUser
    );
    if (updated) {
      setCategories(getAdminCategories());
      showToast(
        `Category "${cat.name}" is now ${updated.isActive ? "Active in Store" : "Hidden"}.`
      );
    }
  };

  // Delete Category
  const handleDelete = (cat: ProductCategory) => {
    if (!adminUser || !hasPerm("categories", "delete")) return;
    if (confirm(`Are you certain you wish to remove the "${cat.name}" category?`)) {
      const result = deleteAdminCategory(cat.id, adminUser);
      if (result.success) {
        setCategories(getAdminCategories());
        showToast(`Category "${cat.name}" removed from catalog.`);
      } else {
        showToast(result.error || "Could not delete category.", "error");
      }
    }
  };

  // Filtered List
  const filteredCategories = useMemo(() => {
    return categories
      .filter((c) => {
        if (statusFilter === "active") return c.isActive;
        if (statusFilter === "inactive") return !c.isActive;
        return true;
      })
      .filter((c) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [categories, statusFilter, searchQuery]);

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
            <Layers size={13} />
            <span>Olfactive Architecture</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Fragrance Categories &amp; Families
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Organize olfactive families, botanical classification tiers, and customer navigation taxonomies.
          </p>
        </div>

        {hasPerm("categories", "create") && (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
          <input
            type="text"
            placeholder="Search olfactive family or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D] transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
            className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
          >
            <option value="all">All ({categories.length})</option>
            <option value="active">Active Only</option>
            <option value="inactive">Hidden / Draft</option>
          </select>
        </div>
      </div>

      {/* Categories Cards / Table */}
      <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                <th className="py-3.5 px-4 font-medium w-16">Order</th>
                <th className="py-3.5 px-4 font-medium">Family Name &amp; Slug</th>
                <th className="py-3.5 px-4 font-medium">Botanical &amp; Scent Profile</th>
                <th className="py-3.5 px-4 font-medium text-center">Flacons Assigned</th>
                <th className="py-3.5 px-4 font-medium text-center">Store Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A241E]/60 text-xs">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8E8271]">
                    No olfactive categories found matching your query.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-[#1A1612]/50 transition-colors group"
                  >
                    {/* Order */}
                    <td className="py-4 px-4 font-mono text-[#C8A45D] font-medium">
                      #{cat.displayOrder}
                    </td>

                    {/* Name & Slug */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-[#F5F2EA] font-medium text-sm">
                          {cat.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-[#665D4F] block mt-0.5">
                        /{cat.slug}
                      </span>
                    </td>

                    {/* Profile */}
                    <td className="py-4 px-4 max-w-md">
                      <p className="text-[#B3A898] text-[11px] line-clamp-2">
                        {cat.description}
                      </p>
                    </td>

                    {/* Count */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-[#1E1914] text-[#C8A45D] border border-[#2A241E]">
                        {cat.productCount || 0} flacons
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleActive(cat)}
                        disabled={!hasPerm("categories", "edit")}
                        title="Click to toggle visibility"
                        className="inline-flex items-center cursor-pointer transition-opacity hover:opacity-80"
                      >
                        <StatusBadge
                          status={cat.isActive ? "active" : "inactive"}
                          tone={cat.isActive ? "success" : "neutral"}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/shop?family=${encodeURIComponent(cat.name)}`}
                          target="_blank"
                          title="View on Storefront"
                          className="p-1.5 text-[#8E8271] hover:text-[#C8A45D] rounded transition-colors"
                        >
                          <ExternalLink size={14} />
                        </Link>

                        {hasPerm("categories", "edit") && (
                          <button
                            onClick={() => handleOpenEdit(cat)}
                            title="Edit Category"
                            className="p-1.5 text-[#8E8271] hover:text-[#F5F2EA] rounded transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}

                        {hasPerm("categories", "delete") && (
                          <button
                            onClick={() => handleDelete(cat)}
                            title="Delete Category"
                            className="p-1.5 text-[#8E8271] hover:text-red-400 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? `Edit Category: ${editingCategory.name}` : "Create Olfactive Category"}
        subtitle="Configure fragrance family classification, notes taxonomy, and store placement."
        maxWidth="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Category / Family Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Amber Gourmand"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              URL Slug *
            </label>
            <div className="flex items-center">
              <span className="bg-[#1A1612] border border-r-0 border-[#2A241E] px-3 py-2 text-xs text-[#665D4F] font-mono rounded-l">
                /shop?family=
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
              Botanical &amp; Scent Profile Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe dominant accords, botanical origin, and sensory aura..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Display Order Sort Weight
              </label>
              <input
                type="number"
                min={1}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Store Visibility
              </label>
              <label className="flex items-center space-x-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded border-[#2A241E] bg-[#0D0B09] text-[#C8A45D] focus:ring-[#C8A45D]"
                />
                <span className="text-xs text-[#F5F2EA]">
                  {isActive ? "Visible in Storefront" : "Hidden in Storefront"}
                </span>
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
              {editingCategory ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
