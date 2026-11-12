"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  Check,
} from "lucide-react";
import { DataTable, Column } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";
import { RoleGuard } from "@/components/admin/RoleGuard";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getAdminCategories,
} from "@/lib/admin/store";
import { Product, FragranceFamilyType } from "@/types/product";

export default function ProductsManagementPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>(getAdminProducts());
  const categories = useMemo(() => getAdminCategories(), []);

  // Modal State for Create / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [family, setFamily] = useState<FragranceFamilyType>("Oriental");
  const [concentration, setConcentration] = useState<"Extrait de Parfum (30%)" | "Eau de Parfum (20%)">("Extrait de Parfum (30%)");
  const [priceNum, setPriceNum] = useState(240);
  const [description, setDescription] = useState("");
  const [topNotes, setTopNotes] = useState("");
  const [heartNotes, setHeartNotes] = useState("");
  const [baseNotes, setBaseNotes] = useState("");
  const [badge, setBadge] = useState<string>("Bestseller");
  const [inStock, setInStock] = useState(true);

  // Success message
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setName("");
    setSlug("");
    setSubtitle("");
    setFamily("Oriental");
    setConcentration("Extrait de Parfum (30%)");
    setPriceNum(240);
    setDescription("");
    setTopNotes("");
    setHeartNotes("");
    setBaseNotes("");
    setBadge("New");
    setInStock(true);
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setSlug(prod.slug);
    setSubtitle(prod.subtitle || "");
    setFamily(prod.family);
    setConcentration(prod.concentration);
    setPriceNum(prod.priceNum);
    setDescription(prod.description);
    setTopNotes(prod.notes.top);
    setHeartNotes(prod.notes.heart);
    setBaseNotes(prod.notes.base);
    setBadge(prod.badge || "");
    setInStock(prod.inStock);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    const baseProductPayload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitle,
      family,
      concentration,
      price: `₹${priceNum.toLocaleString("en-IN")}`,
      priceNum,
      volume: "100ml Extrait",
      badge: (badge as "Bestseller" | "Limited Edition" | "New") || null,
      description,
      story: {
        inspiration: `Crafted at the Paris atelier celebrating authentic ${family} notes.`,
        personality: "Magnetic, elegant, and timeless.",
        recommendedOccasions: "Evenings and high formal celebrations.",
      },
      notes: {
        top: topNotes || "Calabrian Bergamot, Saffron",
        heart: heartNotes || "Golden Amber, Damascena Rose",
        base: baseNotes || "Bourbon Vanilla, Mysore Sandalwood",
      },
      accordTags: [family.toLowerCase(), "extrait", "artisanal"],
      collections: ["signature-collection"],
      character: "Balanced" as const,
      occasion: "Evening" as const,
      intensity: "Intense" as const,
      mood: "Elegant" as const,
      inStock,
      accentColor: "#C8A45D",
      variants: [
        { size: "30ml" as const, volumeDisplay: "30ml Travel Flacon", price: `₹${Math.round(priceNum * 0.45).toLocaleString("en-IN")}`, priceNum: Math.round(priceNum * 0.45) },
        { size: "50ml" as const, volumeDisplay: "50ml Presentation Flacon", price: `₹${Math.round(priceNum * 0.7).toLocaleString("en-IN")}`, priceNum: Math.round(priceNum * 0.7) },
        { size: "100ml" as const, volumeDisplay: "100ml Architectural Flacon", price: `₹${priceNum.toLocaleString("en-IN")}`, priceNum },
      ],
    };

    if (editingProduct) {
      updateAdminProduct(editingProduct.id, baseProductPayload, adminUser);
      showToast(`Updated "${name}" flacon configuration.`);
    } else {
      createAdminProduct(baseProductPayload, adminUser);
      showToast(`Added new flacon "${name}" to authoritative catalog.`);
    }

    setProducts(getAdminProducts());
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (!adminUser) return;
    if (confirm(`Confirm permanent removal of "${prodName}" from active catalog?`)) {
      deleteAdminProduct(id, adminUser);
      setProducts(getAdminProducts());
      showToast(`Deleted "${prodName}".`);
    }
  };

  const handleDuplicate = (prod: Product) => {
    if (!adminUser) return;
    const duplicatedPayload = {
      ...prod,
      name: `${prod.name} (Copy)`,
      slug: `${prod.slug}-copy-${Date.now().toString().slice(-4)}`,
    };
    createAdminProduct(duplicatedPayload, adminUser);
    setProducts(getAdminProducts());
    showToast(`Duplicated "${prod.name}".`);
  };

  const columns: Column<Record<string, unknown>>[] = [
    {
      key: "name",
      header: "Flacon & Notes",
      sortable: true,
      render: (row) => {
        const p = row as unknown as Product;
        return (
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-12 bg-brand-espresso border border-border-subtle rounded-xs flex flex-col items-center justify-center p-1 relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, rgba(23,17,12,0.9) 0%, rgba(8,7,6,0.95) 100%)`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full mb-0.5"
                style={{ backgroundColor: p.accentColor || "#C8A45D" }}
              />
              <span className="font-serif text-[8px] text-gold-champagne tracking-wider uppercase truncate">
                {p.name.slice(0, 4)}
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-sm text-neutral-ivory font-normal">{p.name}</span>
                {p.badge && (
                  <span className="text-[9px] uppercase tracking-wider font-mono text-gold-champagne bg-gold-primary/10 border border-gold-primary/30 px-1.5 py-0.5 rounded-xs">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-muted truncate max-w-xs font-light">
                {p.notes.top} &bull; {p.notes.heart}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      key: "family",
      header: "Olfactive Family",
      sortable: true,
      render: (row) => {
        const p = row as unknown as Product;
        return (
          <span className="text-xs uppercase tracking-wider font-mono text-neutral-soft">
            {p.family}
          </span>
        );
      },
    },
    {
      key: "concentration",
      header: "Concentration",
      render: (row) => {
        const p = row as unknown as Product;
        return (
          <span className="text-[11px] text-neutral-muted font-light">
            {p.concentration}
          </span>
        );
      },
    },
    {
      key: "price",
      header: "Grand Flacon Price",
      sortable: true,
      render: (row) => {
        const p = row as unknown as Product;
        return (
          <span className="font-numbers text-gold-champagne font-semibold">
            {p.price}
          </span>
        );
      },
    },
    {
      key: "inStock",
      header: "Atelier Stock",
      sortable: true,
      render: (row) => {
        const p = row as unknown as Product;
        return (
          <StatusBadge
            status={p.inStock ? "Healthy Stock" : "Allocated Out"}
            size="sm"
          />
        );
      },
    },
  ];

  return (
    <RoleGuard module="products">
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border-subtle pb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold-primary block">
              Atelier Catalog Registry
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide mt-1">
              Products Management
            </h1>
            <p className="text-xs text-neutral-muted font-light mt-1">
              Curate architectural flacons, olfactive formulations, and variant allocations.
            </p>
          </div>

          {hasPerm("products", "create") && (
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.18em] font-medium hover:bg-gold-champagne flex items-center space-x-2 rounded-xs transition-colors shadow-gold-subtle"
            >
              <Plus size={14} />
              <span>Catalog New Flacon</span>
            </button>
          )}
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={products as unknown as Record<string, unknown>[]}
          searchKeys={["name", "family", "description", "slug"]}
          searchPlaceholder="Search flacons by name, family, notes..."
          exportFilename="fragology_products_catalog"
          filterOptions={[
            {
              label: "Family",
              key: "family",
              options: categories.map((c) => ({ label: c.name, value: c.name })),
            },
          ]}
          renderActions={(row) => {
            const p = row as unknown as Product;
            return (
              <div className="flex items-center justify-end space-x-2">
                <Link
                  href={`/products/${p.slug}`}
                  target="_blank"
                  className="p-1.5 text-neutral-muted hover:text-gold-champagne"
                  title="View live product page"
                >
                  <Eye size={14} />
                </Link>

                {hasPerm("products", "edit") && (
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 text-neutral-muted hover:text-neutral-ivory"
                    title="Edit flacon details"
                  >
                    <Edit size={14} />
                  </button>
                )}

                {hasPerm("products", "create") && (
                  <button
                    onClick={() => handleDuplicate(p)}
                    className="p-1.5 text-neutral-muted hover:text-gold-champagne"
                    title="Duplicate flacon"
                  >
                    <Copy size={14} />
                  </button>
                )}

                {hasPerm("products", "delete") && (
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="p-1.5 text-neutral-muted hover:text-red-400"
                    title="Delete product"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            );
          }}
        />

        {/* Modal: Add or Edit Flacon */}
        <AdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingProduct ? `Edit ${editingProduct.name}` : "Catalog New Fragrance Flacon"}
          subtitle="All modifications are authoritatively recorded in administrative audit logs."
          maxWidth="xl"
        >
          <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Flacon Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Imperial Ambré"
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Slug Reference
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. imperial-ambre"
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Artisanal Subtitle
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Aged Bourbon Vanilla & Smoked Incense"
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Olfactive Family
                </label>
                <select
                  value={family}
                  onChange={(e) => setFamily(e.target.value as FragranceFamilyType)}
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                >
                  <option value="Oriental">Oriental</option>
                  <option value="Woody">Woody</option>
                  <option value="Floral">Floral</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Extraction Concentration
                </label>
                <select
                  value={concentration}
                  onChange={(e) => setConcentration(e.target.value as "Extrait de Parfum (30%)" | "Eau de Parfum (20%)")}
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                >
                  <option value="Extrait de Parfum (30%)">Extrait de Parfum (30%)</option>
                  <option value="Eau de Parfum (20%)">Eau de Parfum (20%)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  100ml Flacon Price (INR ₹) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={priceNum}
                  onChange={(e) => setPriceNum(Number(e.target.value))}
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory font-mono focus:outline-hidden focus:border-gold-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Atelier Status Badge
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                >
                  <option value="">None</option>
                  <option value="Bestseller">Bestseller</option>
                  <option value="Limited Edition">Limited Edition</option>
                  <option value="New">New Release</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Full Olfactory Monograph &amp; Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the aromatic sillage, evocative inspiration, and skin development..."
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Top Notes (Opening)
                </label>
                <input
                  type="text"
                  value={topNotes}
                  onChange={(e) => setTopNotes(e.target.value)}
                  placeholder="e.g. Saffron, Calabrian Bergamot"
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Heart Notes (Core)
                </label>
                <input
                  type="text"
                  value={heartNotes}
                  onChange={(e) => setHeartNotes(e.target.value)}
                  placeholder="e.g. Golden Amber, Bourbon Vanilla"
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider text-neutral-muted mb-1.5">
                  Base Notes (Enduring Sillage)
                </label>
                <input
                  type="text"
                  value={baseNotes}
                  onChange={(e) => setBaseNotes(e.target.value)}
                  placeholder="e.g. Smoked Cedar, Benzoin Resin, Black Ambergris"
                  className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="accent-gold-primary"
                />
                <span className="text-neutral-ivory text-xs">
                  Available for Immediate Atelier Allocation (In Stock)
                </span>
              </label>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-border-subtle text-neutral-muted hover:text-neutral-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gold-primary text-brand-deep uppercase tracking-wider font-medium hover:bg-gold-champagne shadow-gold-subtle"
                >
                  {editingProduct ? "Save Changes" : "Create Flacon"}
                </button>
              </div>
            </div>
          </form>
        </AdminModal>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-brand-espresso border border-gold-primary text-neutral-ivory px-4 py-2.5 rounded-xs shadow-gold-glow flex items-center space-x-2 text-xs">
            <Check size={14} className="text-gold-primary" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
