"use client";

import React, { useState, useMemo } from "react";
import {
  Tag,
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminCoupons,
  createAdminCoupon,
  updateAdminCoupon,
  toggleCouponStatus,
  deleteAdminCoupon,
} from "@/lib/admin/store";
import { Coupon } from "@/types/coupon";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function CouponsManagementPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const [coupons, setCoupons] = useState<Coupon[]>(getAdminCoupons());

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form Fields
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [minOrderValue, setMinOrderValue] = useState<number>(0);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(undefined);
  const [isActive, setIsActive] = useState(true);
  const [expiresAt, setExpiresAt] = useState<string>("");

  // Open Create
  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setCode("");
    setDescription("");
    setDiscountType("percentage");
    setDiscountValue(10);
    setMinOrderValue(0);
    setMaxDiscount(undefined);
    setIsActive(true);
    setExpiresAt("");
    setIsModalOpen(true);
  };

  // Open Edit
  const handleOpenEdit = (c: Coupon) => {
    setEditingCoupon(c);
    setCode(c.code);
    setDescription(c.description);
    setDiscountType(c.discountType);
    setDiscountValue(c.discountValue);
    setMinOrderValue(c.minOrderValue || 0);
    setMaxDiscount(c.maxDiscount);
    setIsActive(c.isActive);
    setExpiresAt(c.expiresAt || "");
    setIsModalOpen(true);
  };

  // Copy Code
  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    showToast(`Courtesy code "${codeText}" copied to clipboard.`);
  };

  // Save Coupon
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;
    if (!code.trim()) {
      showToast("Please specify a privilege code.", "error");
      return;
    }

    const payload: Coupon = {
      code: code.trim().toUpperCase(),
      description: description.trim(),
      discountType,
      discountValue,
      minOrderValue: minOrderValue > 0 ? minOrderValue : 0,
      maxDiscount: maxDiscount && maxDiscount > 0 ? maxDiscount : undefined,
      isActive,
      expiresAt: expiresAt || undefined,
    };

    if (editingCoupon) {
      const updated = updateAdminCoupon(editingCoupon.code, payload, adminUser);
      if (updated) {
        setCoupons(getAdminCoupons());
        showToast(`Privilege courtesy code "${updated.code}" updated.`);
      }
    } else {
      const created = createAdminCoupon(payload, adminUser);
      setCoupons(getAdminCoupons());
      showToast(`Privilege courtesy code "${created.code}" created.`);
    }

    setIsModalOpen(false);
  };

  // Toggle Active
  const handleToggle = (c: Coupon) => {
    if (!adminUser || !hasPerm("coupons", "edit")) return;
    const updated = toggleCouponStatus(c.code, adminUser);
    if (updated) {
      setCoupons(getAdminCoupons());
      showToast(`Code "${c.code}" is now ${updated.isActive ? "ACTIVE" : "INACTIVE"}.`);
    }
  };

  // Delete
  const handleDelete = (c: Coupon) => {
    if (!adminUser || !hasPerm("coupons", "delete")) return;
    if (confirm(`Revoke courtesy code "${c.code}"?`)) {
      const success = deleteAdminCoupon(c.code, adminUser);
      if (success) {
        setCoupons(getAdminCoupons());
        showToast(`Courtesy code "${c.code}" revoked.`);
      }
    }
  };

  // Filtered List
  const filteredCoupons = useMemo(() => {
    return coupons.filter((c) => {
      if (statusFilter === "active") return c.isActive;
      if (statusFilter === "inactive") return !c.isActive;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        c.code.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
  }, [coupons, statusFilter, searchQuery]);

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
            <Tag size={13} />
            <span>Maison Privilege &amp; Courtesy</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Promotional Coupons &amp; Courtesy Codes
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Manage private invitation discounts, seasonal gift privileges, and server-validated checkout promotions.
          </p>
        </div>

        {hasPerm("coupons", "create") && (
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>New Courtesy Code</span>
          </button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
          <input
            type="text"
            placeholder="Search code or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
            className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
          >
            <option value="all">All Codes ({coupons.length})</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                <th className="py-3.5 px-4 font-medium">Privilege Code</th>
                <th className="py-3.5 px-4 font-medium">Courtesy Description</th>
                <th className="py-3.5 px-4 font-medium text-center">Discount Value</th>
                <th className="py-3.5 px-4 font-medium text-center">Minimum Commission</th>
                <th className="py-3.5 px-4 font-medium text-center">Max Cap Limit</th>
                <th className="py-3.5 px-4 font-medium text-center">Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A241E]/60 text-xs">
              {filteredCoupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8E8271]">
                    No promotional courtesy codes found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCoupons.map((c) => (
                  <tr key={c.code} className="hover:bg-[#1A1612]/50 transition-colors">
                    {/* Code */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[#C8A45D] font-bold text-sm tracking-wider">
                          {c.code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(c.code)}
                          title="Copy Code"
                          className="p-1 text-[#8E8271] hover:text-[#EDE8D0] rounded transition-colors"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-4 px-4 max-w-sm">
                      <p className="text-[#EDE8D0] text-xs line-clamp-2">
                        {c.description}
                      </p>
                      {c.expiresAt && (
                        <span className="text-[10px] text-[#8E8271] font-mono block mt-0.5">
                          Expires: {new Date(c.expiresAt).toLocaleDateString()}
                        </span>
                      )}
                    </td>

                    {/* Value */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#1E1914] text-[#EDE8D0] border border-[#2A241E]">
                        {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `$${c.discountValue} OFF`}
                      </span>
                    </td>

                    {/* Min Order */}
                    <td className="py-4 px-4 text-center font-mono text-[#8E8271]">
                      {c.minOrderValue && c.minOrderValue > 0 ? `$${c.minOrderValue.toFixed(2)}` : "None"}
                    </td>

                    {/* Max Discount */}
                    <td className="py-4 px-4 text-center font-mono text-[#8E8271]">
                      {c.maxDiscount ? `$${c.maxDiscount.toFixed(2)}` : "Unlimited"}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggle(c)}
                        disabled={!hasPerm("coupons", "edit")}
                        title="Click to toggle status"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <StatusBadge
                          status={c.isActive ? "active" : "inactive"}
                          tone={c.isActive ? "success" : "neutral"}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {hasPerm("coupons", "edit") && (
                          <button
                            onClick={() => handleOpenEdit(c)}
                            title="Edit Code"
                            className="p-1.5 text-[#8E8271] hover:text-[#EDE8D0] rounded transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}

                        {hasPerm("coupons", "delete") && (
                          <button
                            onClick={() => handleDelete(c)}
                            title="Delete Code"
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

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCoupon ? `Edit Code: ${editingCoupon.code}` : "Create Privilege Courtesy Code"}
        subtitle="Configure discount rate, commission thresholds, and checkout validation parameters."
        maxWidth="md"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Privilege Code (Uppercase) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. MAISON25"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-sm text-[#F5F2EA] font-mono tracking-wider focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Courtesy Description / Client Moniker *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Private Invitation: 25% courtesy on commissions over $300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as "percentage" | "fixed")}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="percentage">Percentage Rate (%)</option>
                <option value="fixed">Fixed Currency Credit ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Discount Value *
              </label>
              <input
                type="number"
                min={1}
                required
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Min Commission Order ($)
              </label>
              <input
                type="number"
                min={0}
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Max Discount Cap ($)
              </label>
              <input
                type="number"
                min={0}
                value={maxDiscount !== undefined ? maxDiscount : ""}
                onChange={(e) => setMaxDiscount(e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="Unlimited"
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="couponActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded border-[#2A241E] bg-[#0D0B09] text-[#C8A45D] focus:ring-[#C8A45D]"
            />
            <label htmlFor="couponActive" className="text-xs text-[#F5F2EA] cursor-pointer">
              Active for Checkout Validation
            </label>
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
              {editingCoupon ? "Save Changes" : "Create Courtesy Code"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
