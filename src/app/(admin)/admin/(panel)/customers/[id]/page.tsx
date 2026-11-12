"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminCustomerById,
  toggleCustomerStatus,
  addCustomerNote,
} from "@/lib/admin/store";
import { getOrdersForCustomer } from "@/lib/orders-store";
import { AdminCustomer } from "@/lib/admin/types";
import { Order } from "@/types/order";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function CustomerDetailPage() {
  const params = useParams();
  const { adminUser, hasPerm } = useAdminAuth();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const initialCustomer = useMemo(() => (id ? getAdminCustomerById(id) : undefined), [id]);
  const [customer, setCustomer] = useState<AdminCustomer | undefined>(initialCustomer);

  // Orders for this customer
  const customerOrders: Order[] = useMemo(() => {
    return customer ? getOrdersForCustomer(customer.email) : [];
  }, [customer]);

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Inline Note form
  const [noteText, setNoteText] = useState("");

  if (!customer) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-serif text-[#F5F2EA]">Patron Profile Not Found</h2>
        <p className="text-xs text-[#8E8271]">
          No client record exists with identifier &ldquo;{id}&rdquo;.
        </p>
        <Link
          href="/admin/customers"
          className="inline-flex items-center space-x-2 text-xs text-[#C8A45D] hover:underline uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>Return to Patrons Directory</span>
        </Link>
      </div>
    );
  }

  // Toggle Account Standing
  const handleToggleStanding = () => {
    if (!adminUser || !hasPerm("customers", "manage")) return;
    const confirmMsg =
      customer.status === "active"
        ? `Are you certain you wish to suspend patron access for "${customer.fullName}"?`
        : `Restore active standing for patron "${customer.fullName}"?`;

    if (confirm(confirmMsg)) {
      const updated = toggleCustomerStatus(customer.id, adminUser);
      if (updated) {
        setCustomer({ ...updated });
        showToast(`Patron standing updated to ${updated.status.toUpperCase()}.`);
      }
    }
  };

  // Add Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !noteText.trim()) return;

    const updated = addCustomerNote(customer.id, noteText.trim(), adminUser);
    if (updated) {
      setCustomer({ ...updated });
      setNoteText("");
      showToast("Bespoke concierge note added to patron dossier.");
    }
  };

  const initials = customer.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

      {/* Back Link & Header */}
      <div>
        <Link
          href="/admin/customers"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#8E8271] hover:text-[#C8A45D] transition-colors mb-3"
        >
          <ArrowLeft size={13} />
          <span>Back to All Patrons</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A241E]">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-[#1E1914] border border-[#C8A45D]/50 flex items-center justify-center font-serif text-[#C8A45D] text-xl font-light">
              {initials}
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-serif text-[#F5F2EA] font-light">
                  {customer.fullName}
                </h1>
                <span
                  className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-mono capitalize ${
                    customer.tier === "maison_circle"
                      ? "bg-[#C8A45D]/15 text-[#C8A45D] border border-[#C8A45D]/40"
                      : "bg-[#1E1914] text-[#8E8271] border border-[#2A241E]"
                  }`}
                >
                  {customer.tier === "maison_circle" && <Crown size={11} />}
                  <span>{customer.tier.replace("_", " ")}</span>
                </span>
                <StatusBadge
                  status={customer.status}
                  tone={customer.status === "active" ? "success" : "danger"}
                />
              </div>
              <p className="text-xs text-[#8E8271] mt-1 font-mono">
                Patron ID: #{customer.id} &bull; Member since {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {hasPerm("customers", "manage") && (
              <button
                onClick={handleToggleStanding}
                className={`inline-flex items-center space-x-2 px-3 py-2 border rounded text-xs transition-colors ${
                  customer.status === "active"
                    ? "border-red-500/40 text-red-300 hover:bg-red-950/30"
                    : "border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/30"
                }`}
              >
                {customer.status === "active" ? (
                  <>
                    <ShieldAlert size={14} />
                    <span>Suspend Standing</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} />
                    <span>Restore Standing</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Total Lifetime Spend
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#C8A45D] mt-1 block">
            ₹{customer.totalSpent.toLocaleString("en-IN")}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Across {customer.ordersCount} verified commissions
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Commissions Count
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#F5F2EA] mt-1 block">
            {customer.ordersCount}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Last commission on {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : "Recent"}
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Average Commission Value
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#EDE8D0] mt-1 block">
            ₹{customer.ordersCount > 0 ? Math.round(customer.totalSpent / customer.ordersCount).toLocaleString("en-IN") : "0"}
          </span>
          <span className="text-[11px] text-emerald-400 mt-0.5 block">
            High net worth patron average
          </span>
        </div>
      </div>

      {/* Main Grid: Details Left, Notes Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Contact, Destination & Order History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact & Destination Info */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-4">
            <h2 className="font-serif text-[#F5F2EA] text-sm font-medium border-b border-[#2A241E] pb-3">
              Patron Profile &amp; Delivery Destination
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#8E8271] uppercase flex items-center space-x-1">
                  <Mail size={11} />
                  <span>Email Address</span>
                </span>
                <p className="text-[#EDE8D0]">{customer.email}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#8E8271] uppercase flex items-center space-x-1">
                  <Phone size={11} />
                  <span>Telephone</span>
                </span>
                <p className="text-[#EDE8D0] font-mono">{customer.phone || "Private Registry"}</p>
              </div>

              <div className="sm:col-span-2 space-y-1 pt-2 border-t border-[#2A241E]/50">
                <span className="text-[10px] font-mono text-[#8E8271] uppercase flex items-center space-x-1">
                  <MapPin size={11} />
                  <span>Insured Residence / Atelier Destination</span>
                </span>
                <p className="text-[#EDE8D0] font-serif">
                  {customer.shippingAddressSummary || "Primary address on file with concierge."}
                </p>
              </div>
            </div>
          </div>

          {/* Commissions Placed by this Client */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
            <div className="p-4 border-b border-[#2A241E] flex items-center justify-between">
              <span className="font-serif text-[#F5F2EA] text-sm font-medium">
                Commission History ({customerOrders.length})
              </span>
              <span className="font-mono text-[10px] text-[#C8A45D] uppercase">
                Verified Orders
              </span>
            </div>

            <div className="divide-y divide-[#2A241E]/60">
              {customerOrders.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#8E8271]">
                  No past commissions recorded under this email address.
                </div>
              ) : (
                customerOrders.map((ord) => (
                  <div key={ord.id} className="p-4 flex items-center justify-between text-xs">
                    <div>
                      <Link
                        href={`/admin/orders/${ord.id}`}
                        className="font-mono text-[#C8A45D] hover:underline font-medium block"
                      >
                        {ord.orderNumber}
                      </Link>
                      <span className="text-[11px] text-[#8E8271]">
                        {ord.items.map((i) => i.productName).join(", ")}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <StatusBadge status={ord.status} />
                      <span className="font-numbers text-[#EDE8D0] text-sm font-semibold">
                        ₹{ord.totalAmount.toLocaleString("en-IN")}
                      </span>
                      <Link
                        href={`/admin/orders/${ord.id}`}
                        className="text-[#8E8271] hover:text-[#C8A45D]"
                      >
                        <ExternalLink size={13} />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Bespoke Concierge Notes */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <MessageSquare size={13} />
              <span>Bespoke Concierge Dossier</span>
            </div>

            {/* Existing Notes List */}
            <div className="space-y-3">
              {customer.notes && customer.notes.length > 0 ? (
                customer.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0D0B09] border border-[#2A241E] rounded text-xs space-y-1"
                  >
                    <p className="text-[#EDE8D0] leading-relaxed">{note}</p>
                    <span className="font-mono text-[10px] text-[#665D4F] block">
                      Atelier Record &bull; Entry #{idx + 1}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#8E8271] italic">
                  No private concierge notes on file for this patron.
                </p>
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="pt-3 border-t border-[#2A241E] space-y-3">
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                Add Bespoke Atelier Entry
              </label>
              <textarea
                rows={3}
                required
                placeholder="Log olfactory preferences, private tasting feedback, or courier instructions..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#1E1914] hover:bg-[#2A241E] border border-[#2A241E] hover:border-[#C8A45D]/50 text-xs text-[#EDE8D0] rounded transition-colors uppercase font-mono tracking-wider"
              >
                Save Entry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
