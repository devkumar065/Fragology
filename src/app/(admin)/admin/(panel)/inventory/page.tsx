"use client";

import React, { useState, useMemo } from "react";
import {
  Boxes,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  History,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminProducts,
  getInventoryMovements,
  adjustInventoryStock,
} from "@/lib/admin/store";
import { InventoryMovement } from "@/lib/admin/types";
import { ProductVariant } from "@/types/product";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

interface InventorySkuRow {
  productId: string;
  productName: string;
  family: string;
  variantSize: "30ml" | "50ml" | "100ml";
  sku: string;
  stock: number;
  price: string;
  lowStockThreshold: number;
}

export default function InventoryPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const products = useMemo(() => getAdminProducts(), []);
  const [movements, setMovements] = useState<InventoryMovement[]>(getInventoryMovements());

  // Local stock overrides map so adjustments reflect instantly in the table
  const [stockOverrides, setStockOverrides] = useState<Record<string, number>>({});

  // Active view tab: "inventory" or "movements"
  const [activeTab, setActiveTab] = useState<"catalog" | "ledger">("catalog");

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out">("all");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Stock Adjustment Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetRow, setTargetRow] = useState<InventorySkuRow | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [reason, setReason] = useState<InventoryMovement["reason"]>("restock");
  const [notes, setNotes] = useState("");

  // Flattened inventory SKUs list
  const inventoryRows: InventorySkuRow[] = useMemo(() => {
    const rows: InventorySkuRow[] = [];
    products.forEach((p) => {
      p.variants.forEach((v: ProductVariant) => {
        const key = `${p.id}:${v.size}`;
        // Base seed quantity if not adjusted
        const defaultQty = v.size === "100ml" ? 85 : v.size === "50ml" ? 42 : 18;
        const currentQty = stockOverrides[key] !== undefined ? stockOverrides[key] : defaultQty;

        rows.push({
          productId: p.id,
          productName: p.name,
          family: p.family,
          variantSize: v.size,
          sku: `FRG-${p.slug.slice(0, 4).toUpperCase()}-${v.size.replace("ml", "")}`,
          stock: currentQty,
          price: v.price,
          lowStockThreshold: 25,
        });
      });
    });
    return rows;
  }, [products, stockOverrides]);

  // Overall metric stats
  const totalSkus = inventoryRows.length;
  const totalUnits = inventoryRows.reduce((sum, r) => sum + r.stock, 0);
  const lowStockRows = inventoryRows.filter((r) => r.stock > 0 && r.stock <= r.lowStockThreshold);
  const outOfStockRows = inventoryRows.filter((r) => r.stock === 0);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return inventoryRows
      .filter((r) => {
        if (stockFilter === "low") return r.stock > 0 && r.stock <= r.lowStockThreshold;
        if (stockFilter === "out") return r.stock === 0;
        return true;
      })
      .filter((r) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          r.productName.toLowerCase().includes(q) ||
          r.sku.toLowerCase().includes(q) ||
          r.family.toLowerCase().includes(q)
        );
      });
  }, [inventoryRows, stockFilter, searchQuery]);

  // Open Adjustment Modal
  const handleOpenAdjust = (row: InventorySkuRow) => {
    setTargetRow(row);
    setNewQuantity(row.stock);
    setReason("restock");
    setNotes("");
    setIsModalOpen(true);
  };

  // Submit Adjustment
  const handleSaveAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !targetRow) return;

    const res = adjustInventoryStock(
      targetRow.productId,
      targetRow.variantSize,
      newQuantity,
      reason,
      notes.trim() || `Manual stock update via Atelier Ops console`,
      adminUser
    );

    if (res.success && res.movement) {
      const key = `${targetRow.productId}:${targetRow.variantSize}`;
      setStockOverrides((prev) => ({ ...prev, [key]: newQuantity }));
      setMovements(getInventoryMovements());
      showToast(
        `Stock for ${targetRow.productName} (${targetRow.variantSize}) updated to ${newQuantity} units.`
      );
      setIsModalOpen(false);
    } else {
      showToast(res.error || "Failed to adjust stock", "error");
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ["SKU", "Product Name", "Family", "Variant Size", "Available Stock", "Unit Price", "Status"];
    const rows = filteredRows.map((r) => {
      const status = r.stock === 0 ? "Out of Stock" : r.stock <= r.lowStockThreshold ? "Low Stock" : "Healthy";
      return [r.sku, `"${r.productName}"`, r.family, r.variantSize, r.stock, `"${r.price}"`, status].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fragology-inventory-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Inventory ledger CSV exported successfully.");
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
            <Boxes size={13} />
            <span>Cellar &amp; Reserve Inventory</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Inventory &amp; Stock Control
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Track maceration cellar reserves, real-time flacon SKU counts, and historical batch movements.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          {hasPerm("inventory", "export") && (
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center space-x-2 px-3 py-2 border border-[#2A241E] hover:border-[#C8A45D]/50 text-xs text-[#EDE8D0] rounded transition-colors"
            >
              <Download size={14} className="text-[#C8A45D]" />
              <span>Export CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Monitored SKUs
          </span>
          <span className="text-2xl font-serif text-[#F5F2EA] mt-1 block">
            {totalSkus}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Across 30ml, 50ml, 100ml flacons
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Total Cellar Units
          </span>
          <span className="text-2xl font-serif text-[#C8A45D] mt-1 block">
            {totalUnits.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Stored under dark cellar conditions
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Low Allocation SKUs
          </span>
          <span className="text-2xl font-serif text-amber-400 mt-1 block">
            {lowStockRows.length}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            &le; 25 units remaining
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Exhausted / Depleted
          </span>
          <span className="text-2xl font-serif text-red-400 mt-1 block">
            {outOfStockRows.length}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Requires harvest distillation
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2A241E] space-x-6">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono transition-colors border-b-2 -mb-px ${
            activeTab === "catalog"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          Flacon SKU Balances ({inventoryRows.length})
        </button>
        <button
          onClick={() => setActiveTab("ledger")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "ledger"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <History size={13} />
          <span>Movement Audit Ledger ({movements.length})</span>
        </button>
      </div>

      {activeTab === "catalog" ? (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
              <input
                type="text"
                placeholder="Search SKU or fragrance name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Level:</span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as "all" | "low" | "out")}
                className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="all">All SKUs ({inventoryRows.length})</option>
                <option value="low">Low Allocation (&le; 25)</option>
                <option value="out">Exhausted (0)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                    <th className="py-3.5 px-4 font-medium">SKU Reference</th>
                    <th className="py-3.5 px-4 font-medium">Fragrance &amp; Family</th>
                    <th className="py-3.5 px-4 font-medium">Variant Format</th>
                    <th className="py-3.5 px-4 font-medium text-center">Available Reserve</th>
                    <th className="py-3.5 px-4 font-medium text-center">Health Status</th>
                    <th className="py-3.5 px-4 font-medium text-right">Maison Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A241E]/60 text-xs">
                  {filteredRows.map((row) => {
                    const isLow = row.stock > 0 && row.stock <= row.lowStockThreshold;
                    const isOut = row.stock === 0;

                    return (
                      <tr key={`${row.productId}:${row.variantSize}`} className="hover:bg-[#1A1612]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[#C8A45D]">
                          {row.sku}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-serif text-[#F5F2EA] font-medium block">
                            {row.productName}
                          </span>
                          <span className="text-[10px] text-[#8E8271]">
                            {row.family} Family &bull; {row.price}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#B3A898]">
                          {row.variantSize} Flacon
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`font-mono font-medium text-sm ${
                              isOut ? "text-red-400" : isLow ? "text-amber-400" : "text-[#F5F2EA]"
                            }`}
                          >
                            {row.stock} units
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <StatusBadge
                            status={isOut ? "Depleted" : isLow ? "Low Allocation" : "Cellar Stock"}
                            tone={isOut ? "danger" : isLow ? "warning" : "success"}
                          />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {hasPerm("inventory", "edit") ? (
                            <button
                              onClick={() => handleOpenAdjust(row)}
                              className="px-3 py-1.5 bg-[#1E1914] hover:bg-[#2A241E] border border-[#2A241E] hover:border-[#C8A45D]/50 text-[11px] text-[#EDE8D0] rounded transition-colors"
                            >
                              Adjust Stock
                            </button>
                          ) : (
                            <span className="text-[11px] text-[#665D4F]">View Only</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Ledger View */
        <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                  <th className="py-3.5 px-4 font-medium">Timestamp (UTC)</th>
                  <th className="py-3.5 px-4 font-medium">SKU &amp; Product</th>
                  <th className="py-3.5 px-4 font-medium text-center">Previous &rarr; New</th>
                  <th className="py-3.5 px-4 font-medium text-center">Net Delta</th>
                  <th className="py-3.5 px-4 font-medium">Reason Code</th>
                  <th className="py-3.5 px-4 font-medium">Admin &amp; Atelier Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A241E]/60 text-xs">
                {movements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#8E8271]">
                      No recorded stock adjustments in this session.
                    </td>
                  </tr>
                ) : (
                  movements.map((m) => (
                    <tr key={m.id} className="hover:bg-[#1A1612]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#8E8271]">
                        {new Date(m.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-serif text-[#F5F2EA] font-medium block">
                          {m.productName} ({m.variantSize})
                        </span>
                        <span className="font-mono text-[10px] text-[#C8A45D]">
                          {m.sku}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-[#8E8271]">
                        {m.previousQuantity} &rarr; <span className="text-[#F5F2EA]">{m.newQuantity}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center font-mono text-xs font-medium px-2 py-0.5 rounded ${
                            m.changeAmount > 0
                              ? "bg-emerald-950/40 text-emerald-300 border border-emerald-500/30"
                              : "bg-red-950/40 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {m.changeAmount > 0 ? `+${m.changeAmount}` : m.changeAmount}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="capitalize font-mono text-[11px] text-[#B3A898]">
                          {m.reason.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="text-[#EDE8D0] text-xs">{m.notes || "&mdash;"}</p>
                        <span className="text-[10px] text-[#665D4F] font-mono block">
                          By: {m.adminEmail || "Atelier System"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Adjustment Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={targetRow ? `Adjust Stock: ${targetRow.productName}` : "Adjust Inventory"}
        subtitle="Record formal atelier stock modification, distillation intake, or damage write-off."
        maxWidth="md"
      >
        {targetRow && (
          <form onSubmit={handleSaveAdjustment} className="space-y-4">
            <div className="bg-[#0D0B09] p-3 rounded border border-[#2A241E] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#8E8271] block text-[10px] uppercase font-mono">Format SKU</span>
                <span className="font-mono text-[#C8A45D] font-medium">{targetRow.sku} ({targetRow.variantSize})</span>
              </div>
              <div className="text-right">
                <span className="text-[#8E8271] block text-[10px] uppercase font-mono">Current Balance</span>
                <span className="font-mono text-[#F5F2EA] font-medium text-sm">{targetRow.stock} units</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                New Target Quantity in Cellar *
              </label>
              <input
                type="number"
                min={0}
                required
                value={newQuantity}
                onChange={(e) => setNewQuantity(parseInt(e.target.value, 10) || 0)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-sm text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
              <span className="text-[10px] text-[#8E8271] mt-1 block">
                Net Change: {newQuantity - targetRow.stock > 0 ? `+${newQuantity - targetRow.stock}` : newQuantity - targetRow.stock} units
              </span>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Reason Code *
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as InventoryMovement["reason"])}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="restock">Distillation Intake / Batch Restock</option>
                <option value="manual_audit">Physical Cellar Audit Correction</option>
                <option value="damaged">Damaged Flacon / Broken Seal Write-off</option>
                <option value="promotional_allocation">VIP Sample / Press Allocation</option>
                <option value="returned">Client Return Inspection Passed</option>
                <option value="order_fulfillment">Manual Order Allocation</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Internal Atelier Reference / Batch Notes
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Batch 2026-H from Grasse lab, 20 units added after sealed wax inspection."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
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
                Commit Adjustment
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
