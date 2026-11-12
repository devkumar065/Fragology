"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Crown,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminCustomers,
  toggleCustomerStatus,
  addCustomerNote,
} from "@/lib/admin/store";
import { AdminCustomer } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function CustomersPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const [customers, setCustomers] = useState<AdminCustomer[]>(getAdminCustomers());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Bespoke Note Modal
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [newNote, setNewNote] = useState("");

  // Metrics
  const totalPatrons = customers.length;
  const vipCount = customers.filter(
    (c) => c.tier === "maison_circle" || c.tier === "connoisseur" || c.tier === "vip"
  ).length;
  const totalLifetimeSpend = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgLtv = totalPatrons > 0 ? totalLifetimeSpend / totalPatrons : 0;

  // Filtered List
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (tierFilter !== "all" && c.tier !== tierFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone && c.phone.toLowerCase().includes(q))
      );
    });
  }, [customers, tierFilter, statusFilter, searchQuery]);

  // Toggle Account Standing (Active vs Suspended)
  const handleToggleStanding = (customer: AdminCustomer) => {
    if (!adminUser || !hasPerm("customers", "manage")) return;
    const confirmMsg =
      customer.status === "active"
        ? `Are you certain you wish to suspend patron access for "${customer.fullName}"?`
        : `Restore active standing for patron "${customer.fullName}"?`;

    if (confirm(confirmMsg)) {
      const updated = toggleCustomerStatus(customer.id, adminUser);
      if (updated) {
        setCustomers(getAdminCustomers());
        showToast(
          `Patron standing for "${customer.fullName}" updated to ${updated.status.toUpperCase()}.`
        );
      }
    }
  };

  // Open Note Modal
  const handleOpenNoteModal = (customer: AdminCustomer) => {
    setSelectedCustomer(customer);
    setNewNote("");
    setNoteModalOpen(true);
  };

  // Save Note
  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !selectedCustomer || !newNote.trim()) return;

    const updated = addCustomerNote(selectedCustomer.id, newNote.trim(), adminUser);
    if (updated) {
      setCustomers(getAdminCustomers());
      showToast(`Bespoke atelier note added to patron ${selectedCustomer.fullName}.`);
      setNoteModalOpen(false);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ["Patron ID", "Full Name", "Email", "Phone", "Tier", "Total Spent (INR)", "Orders Count", "Status", "Joined Date"];
    const rows = filteredCustomers.map((c) =>
      [
        c.id,
        `"${c.fullName}"`,
        c.email,
        `"${c.phone || ""}"`,
        c.tier,
        c.totalSpent.toFixed(2),
        c.ordersCount,
        c.status,
        `"${c.createdAt}"`,
      ].join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fragology-patrons-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Patron directory CSV exported.");
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
            <Users size={13} />
            <span>Clientele &amp; Connoisseur Registry</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Patron Management &amp; Profiles
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Maintain high net worth clientele accounts, private concierge notes, lifetime value (LTV), and order history.
          </p>
        </div>

        {hasPerm("customers", "export") && (
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center space-x-2 px-3 py-2 border border-[#2A241E] hover:border-[#C8A45D]/50 text-xs text-[#EDE8D0] rounded transition-colors self-start sm:self-auto"
          >
            <Download size={14} className="text-[#C8A45D]" />
            <span>Export Patrons CSV</span>
          </button>
        )}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Registered Patrons
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#F5F2EA] mt-1 block">
            {totalPatrons}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Verified customer accounts
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            VIP &amp; Maison Circle
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#C8A45D] mt-1 block">
            {vipCount}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Private liaison tier clients
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Cumulative Patron Spend
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#EDE8D0] mt-1 block">
            ₹{totalLifetimeSpend.toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] text-emerald-400 mt-0.5 block">
            Haute parfumerie acquisitions
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Average Patron LTV
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#C8A45D] mt-1 block">
            ₹{Math.round(avgLtv).toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Per authenticated account
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
          <input
            type="text"
            placeholder="Search patron name, email, or telephone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Tier:</span>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            >
              <option value="all">All Tiers</option>
              <option value="maison_circle">Maison Circle</option>
              <option value="connoisseur">Connoisseur</option>
              <option value="vip">VIP Patron</option>
              <option value="patron">Standard Patron</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Standing:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            >
              <option value="all">All Standings</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patrons Table */}
      <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                <th className="py-3.5 px-4 font-medium">Patron Identity</th>
                <th className="py-3.5 px-4 font-medium">Contact Reference</th>
                <th className="py-3.5 px-4 font-medium">Maison Standing Tier</th>
                <th className="py-3.5 px-4 font-medium text-center">Commissions</th>
                <th className="py-3.5 px-4 font-medium text-right">Lifetime Investment</th>
                <th className="py-3.5 px-4 font-medium text-center">Account Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A241E]/60 text-xs">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8E8271]">
                    No patrons found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const initials = cust.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr key={cust.id} className="hover:bg-[#1A1612]/50 transition-colors">
                      {/* Patron */}
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-[#2A241E] border border-[#C8A45D]/40 flex items-center justify-center font-serif text-[#C8A45D] text-xs shrink-0 font-medium">
                            {initials}
                          </div>
                          <div>
                            <Link
                              href={`/admin/customers/${cust.id}`}
                              className="font-serif text-[#F5F2EA] font-medium text-sm hover:text-[#C8A45D] transition-colors block"
                            >
                              {cust.fullName}
                            </Link>
                            <span className="font-mono text-[10px] text-[#665D4F]">
                              Client #{cust.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-4">
                        <span className="text-[#EDE8D0] block">{cust.email}</span>
                        <span className="font-mono text-[10px] text-[#8E8271] block">
                          {cust.phone || "Private Telephone"}
                        </span>
                      </td>

                      {/* Tier */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono capitalize ${
                            cust.tier === "maison_circle"
                              ? "bg-[#C8A45D]/15 text-[#C8A45D] border border-[#C8A45D]/40"
                              : cust.tier === "connoisseur"
                              ? "bg-purple-950/40 text-purple-300 border border-purple-500/30"
                              : cust.tier === "vip"
                              ? "bg-amber-950/40 text-amber-300 border border-amber-500/30"
                              : "bg-[#1E1914] text-[#8E8271] border border-[#2A241E]"
                          }`}
                        >
                          {cust.tier === "maison_circle" && <Crown size={11} />}
                          <span>{cust.tier.replace("_", " ")}</span>
                        </span>
                      </td>

                      {/* Commissions */}
                      <td className="py-4 px-4 text-center font-numbers font-medium text-[#F5F2EA]">
                        {cust.ordersCount} orders
                      </td>

                      {/* Spend */}
                      <td className="py-4 px-4 text-right font-numbers font-semibold text-[#C8A45D] text-sm">
                        ₹{cust.totalSpent.toLocaleString("en-IN")}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <StatusBadge
                          status={cust.status}
                          tone={cust.status === "active" ? "success" : "danger"}
                        />
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => handleOpenNoteModal(cust)}
                            title="Add Bespoke Note"
                            className="p-1.5 text-[#8E8271] hover:text-[#C8A45D] rounded transition-colors"
                          >
                            <MessageSquare size={14} />
                          </button>

                          {hasPerm("customers", "manage") && (
                            <button
                              onClick={() => handleToggleStanding(cust)}
                              title={cust.status === "active" ? "Suspend Account" : "Activate Account"}
                              className={`p-1.5 rounded transition-colors ${
                                cust.status === "active"
                                  ? "text-[#8E8271] hover:text-red-400"
                                  : "text-red-400 hover:text-emerald-400"
                              }`}
                            >
                              {cust.status === "active" ? (
                                <ShieldAlert size={14} />
                              ) : (
                                <ShieldCheck size={14} />
                              )}
                            </button>
                          )}

                          <Link
                            href={`/admin/customers/${cust.id}`}
                            title="View Patron Profile"
                            className="p-1.5 text-[#8E8271] hover:text-[#C8A45D] rounded transition-colors"
                          >
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Bespoke Note Modal */}
      <AdminModal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        title={selectedCustomer ? `Concierge Note: ${selectedCustomer.fullName}` : "Add Note"}
        subtitle="Record sensory preferences, bespoke formulation requests, or private liaison instructions."
        maxWidth="md"
      >
        {selectedCustomer && (
          <form onSubmit={handleSaveNote} className="space-y-4">
            <div className="bg-[#0D0B09] p-3 rounded border border-[#2A241E] text-xs flex items-center justify-between">
              <div>
                <span className="text-[#8E8271] block text-[10px] uppercase font-mono">Patron</span>
                <span className="font-serif text-[#F5F2EA]">{selectedCustomer.fullName}</span>
              </div>
              <div className="text-right">
                <span className="text-[#8E8271] block text-[10px] uppercase font-mono">Tier</span>
                <span className="font-mono text-[#C8A45D] capitalize">{selectedCustomer.tier.replace("_", " ")}</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Bespoke Atelier Note *
              </label>
              <textarea
                rows={4}
                required
                placeholder="e.g. Patron prefers extra dry woody dry-down with aged Mysore sandalwood. Always provide wax-sealed certificate."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
              <button
                type="button"
                onClick={() => setNoteModalOpen(false)}
                className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                Save Concierge Note
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
