"use client";

import React, { useState, useMemo } from "react";
import {
  Settings,
  CreditCard,
  Truck,
  Percent,
  Users,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  Download,
  Plus,
  Search,
  Building,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getStoreSettings,
  updateStoreSettings,
  getStaffMembers,
  inviteStaffMember,
  updateStaffRole,
  toggleStaffStatus,
  getAuditLogs,
} from "@/lib/admin/store";
import {
  AdminMember,
  AdminRole,
  AuditLogEntry,
  StoreGeneralSettings,
  StorePaymentSettings,
  StoreShippingSettings,
  StoreTaxSettings,
} from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function SettingsManagementPage() {
  const { adminUser, hasPerm } = useAdminAuth();

  // Active Tab: "general" | "payments" | "shipping" | "tax" | "staff" | "audit"
  const [activeTab, setActiveTab] = useState<
    "general" | "payments" | "shipping" | "tax" | "staff" | "audit"
  >("general");

  // Settings State
  const initialSettings = useMemo(() => getStoreSettings(), []);
  const [general, setGeneral] = useState<StoreGeneralSettings>(initialSettings.general);
  const [payment, setPayment] = useState<StorePaymentSettings>(initialSettings.payment);
  const [shipping, setShipping] = useState<StoreShippingSettings>(initialSettings.shipping);
  const [tax, setTax] = useState<StoreTaxSettings>(initialSettings.tax);

  // Staff State
  const [staff, setStaff] = useState<AdminMember[]>(getStaffMembers());
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<AdminRole>("product_manager");
  const [invitePhone, setInvitePhone] = useState("");

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(getAuditLogs(undefined, 100));
  const [auditSearch, setAuditSearch] = useState("");
  const [auditModuleFilter, setAuditModuleFilter] = useState<string>("all");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Save General
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !hasPerm("settings", "manage")) return;
    updateStoreSettings("general", general, adminUser);
    showToast("General atelier configuration updated.");
  };

  // Save Payments
  const handleSavePayments = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !hasPerm("settings", "manage")) return;
    updateStoreSettings("payment", payment, adminUser);
    showToast("Payment gateway parameters updated.");
  };

  // Save Shipping
  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !hasPerm("settings", "manage")) return;
    updateStoreSettings("shipping", shipping, adminUser);
    showToast("White-glove shipping configuration updated.");
  };

  // Save Tax
  const handleSaveTax = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !hasPerm("settings", "manage")) return;
    updateStoreSettings("tax", tax, adminUser);
    showToast("Customs excise & duty rates updated.");
  };

  // Invite Staff
  const handleInviteStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !hasPerm("settings", "manage")) return;
    if (!inviteName.trim() || !inviteEmail.trim()) {
      showToast("Please enter staff member name and email.", "error");
      return;
    }

    inviteStaffMember(
      {
        fullName: inviteName.trim(),
        email: inviteEmail.trim().toLowerCase(),
        role: inviteRole,
        phone: invitePhone.trim() || undefined,
      },
      adminUser
    );

    setStaff(getStaffMembers());
    showToast(`Staff invitation dispatched to ${inviteEmail}.`);
    setInviteModalOpen(false);
  };

  // Update Staff Role
  const handleRoleChange = (memberId: string, newRole: AdminRole) => {
    if (!adminUser || !hasPerm("settings", "manage")) return;
    const updated = updateStaffRole(memberId, newRole, adminUser);
    if (updated) {
      setStaff(getStaffMembers());
      showToast(`Role for ${updated.fullName} changed to ${newRole.toUpperCase()}.`);
    }
  };

  // Toggle Staff Status
  const handleToggleStaffStatus = (memberId: string) => {
    if (!adminUser || !hasPerm("settings", "manage")) return;
    const updated = toggleStaffStatus(memberId, adminUser);
    if (updated) {
      setStaff(getStaffMembers());
      showToast(`Staff member standing updated to ${updated.status.toUpperCase()}.`);
    }
  };

  // Filtered Audit Logs
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter((l) => {
      if (auditModuleFilter !== "all" && l.module !== auditModuleFilter) return false;
      if (!auditSearch.trim()) return true;
      const q = auditSearch.toLowerCase();
      return (
        l.action.toLowerCase().includes(q) ||
        l.adminEmail.toLowerCase().includes(q) ||
        l.changeSummary.toLowerCase().includes(q) ||
        l.recordReference.toLowerCase().includes(q)
      );
    });
  }, [auditLogs, auditModuleFilter, auditSearch]);

  // Export Audit CSV
  const handleExportAuditCsv = () => {
    const headers = ["Timestamp", "Admin Email", "Role", "Module", "Action", "Record Reference", "Summary"];
    const rows = filteredAuditLogs.map((l) =>
      [
        `"${l.createdAt}"`,
        l.adminEmail,
        l.adminRole,
        l.module,
        l.action,
        `"${l.recordReference}"`,
        `"${l.changeSummary.replace(/"/g, '""')}"`,
      ].join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fragology-audit-log-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit activity ledger CSV exported.");
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
            <Settings size={13} />
            <span>Operational Architecture &amp; Governance</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Maison Settings &amp; Store Operations
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Configure payment settlement gateways, white-glove logistics, role permissions, and examine immutable audit logs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2A241E] space-x-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono whitespace-nowrap transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "general"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Building size={13} />
          <span>General</span>
        </button>

        <button
          onClick={() => setActiveTab("payments")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono whitespace-nowrap transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "payments"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <CreditCard size={13} />
          <span>Payment Gateways</span>
        </button>

        <button
          onClick={() => setActiveTab("shipping")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono whitespace-nowrap transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "shipping"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Truck size={13} />
          <span>Shipping &amp; Courier</span>
        </button>

        <button
          onClick={() => setActiveTab("tax")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono whitespace-nowrap transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "tax"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Percent size={13} />
          <span>Tax &amp; Duties</span>
        </button>

        <button
          onClick={() => setActiveTab("staff")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono whitespace-nowrap transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "staff"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Users size={13} />
          <span>Staff &amp; RBAC ({staff.length})</span>
        </button>

        <button
          onClick={() => {
            setAuditLogs(getAuditLogs(undefined, 100));
            setActiveTab("audit");
          }}
          className={`pb-3 text-xs uppercase tracking-wider font-mono whitespace-nowrap transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "audit"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Shield size={13} />
          <span>Security Audit Trail</span>
        </button>
      </div>

      {/* Tab 1: General */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveGeneral} className="bg-[#14120F] border border-[#2A241E] rounded p-6 space-y-6">
          <div className="border-b border-[#2A241E] pb-3">
            <h2 className="font-serif text-[#F5F2EA] text-base font-light">
              General Maison Parameters
            </h2>
            <p className="text-xs text-[#8E8271] mt-0.5">
              Brand identification, concierge contact routes, and primary currency display.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Maison Brand Name
              </label>
              <input
                type="text"
                required
                value={general.brandName}
                onChange={(e) => setGeneral({ ...general, brandName: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Poetic Tagline
              </label>
              <input
                type="text"
                required
                value={general.brandTagline}
                onChange={(e) => setGeneral({ ...general, brandTagline: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Concierge Contact Email
              </label>
              <input
                type="email"
                required
                value={general.storeEmail}
                onChange={(e) => setGeneral({ ...general, storeEmail: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Private Concierge Telephone
              </label>
              <input
                type="text"
                required
                value={general.conciergePhone}
                onChange={(e) => setGeneral({ ...general, conciergePhone: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Primary Currency
              </label>
              <input
                type="text"
                required
                value={general.primaryCurrency}
                onChange={(e) => setGeneral({ ...general, primaryCurrency: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Atelier Master Timezone
              </label>
              <select
                value={general.timezone}
                onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="Europe/Paris">Europe/Paris (GMT+1 / GMT+2)</option>
                <option value="America/New_York">America/New_York (EST / EDT)</option>
                <option value="Europe/London">Europe/London (GMT / BST)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>
          </div>

          {hasPerm("settings", "manage") && (
            <div className="flex justify-end pt-4 border-t border-[#2A241E]">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <Save size={14} />
                <span>Save General Settings</span>
              </button>
            </div>
          )}
        </form>
      )}

      {/* Tab 2: Payments */}
      {activeTab === "payments" && (
        <form onSubmit={handleSavePayments} className="bg-[#14120F] border border-[#2A241E] rounded p-6 space-y-6">
          <div className="border-b border-[#2A241E] pb-3">
            <h2 className="font-serif text-[#F5F2EA] text-base font-light">
              Payment Settlement Gateways
            </h2>
            <p className="text-xs text-[#8E8271] mt-0.5">
              Manage Stripe, Razorpay, and private concierge wire transfers.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-[#0D0B09] border border-[#2A241E] rounded flex items-center justify-between">
              <div>
                <span className="font-serif text-[#F5F2EA] text-sm block">Stripe Settlement</span>
                <span className="text-[11px] text-[#8E8271]">
                  Apple Pay, Visa, Mastercard, American Express
                </span>
              </div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={payment.stripeLiveMode}
                  onChange={(e) => setPayment({ ...payment, stripeLiveMode: e.target.checked })}
                  className="rounded border-[#2A241E] bg-[#14120F] text-[#C8A45D] focus:ring-[#C8A45D]"
                />
                <span className="text-xs font-mono text-[#C8A45D]">
                  {payment.stripeLiveMode ? "Live Production Mode" : "Sandbox Test Mode"}
                </span>
              </label>
            </div>

            <div className="p-4 bg-[#0D0B09] border border-[#2A241E] rounded flex items-center justify-between">
              <div>
                <span className="font-serif text-[#F5F2EA] text-sm block">Razorpay Gateway</span>
                <span className="text-[11px] text-[#8E8271]">
                  International multi-currency settlement &amp; direct banking
                </span>
              </div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={payment.razorpayLiveMode}
                  onChange={(e) => setPayment({ ...payment, razorpayLiveMode: e.target.checked })}
                  className="rounded border-[#2A241E] bg-[#14120F] text-[#C8A45D] focus:ring-[#C8A45D]"
                />
                <span className="text-xs font-mono text-[#C8A45D]">
                  {payment.razorpayLiveMode ? "Live Production Mode" : "Sandbox Test Mode"}
                </span>
              </label>
            </div>

            <div className="p-4 bg-[#0D0B09] border border-[#2A241E] rounded space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-serif text-[#F5F2EA] text-sm block">Concierge Bank Wire</span>
                  <span className="text-[11px] text-[#8E8271]">
                    Private liaison bank wiring for high-net-worth orders
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={payment.allowConciergeWire}
                  onChange={(e) => setPayment({ ...payment, allowConciergeWire: e.target.checked })}
                  className="rounded border-[#2A241E] bg-[#14120F] text-[#C8A45D] focus:ring-[#C8A45D]"
                />
              </div>

              {payment.allowConciergeWire && (
                <div className="pt-2 border-t border-[#2A241E] w-full sm:w-64">
                  <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                    Minimum Wire Order Amount ($)
                  </label>
                  <input
                    type="number"
                    value={payment.wireMinimumAmount}
                    onChange={(e) =>
                      setPayment({ ...payment, wireMinimumAmount: parseFloat(e.target.value) || 1000 })
                    }
                    className="w-full bg-[#14120F] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
                  />
                </div>
              )}
            </div>
          </div>

          {hasPerm("settings", "manage") && (
            <div className="flex justify-end pt-4 border-t border-[#2A241E]">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <Save size={14} />
                <span>Save Payment Settings</span>
              </button>
            </div>
          )}
        </form>
      )}

      {/* Tab 3: Shipping */}
      {activeTab === "shipping" && (
        <form onSubmit={handleSaveShipping} className="bg-[#14120F] border border-[#2A241E] rounded p-6 space-y-6">
          <div className="border-b border-[#2A241E] pb-3">
            <h2 className="font-serif text-[#F5F2EA] text-base font-light">
              White-Glove Shipping &amp; Logistics
            </h2>
            <p className="text-xs text-[#8E8271] mt-0.5">
              Complimentary courier threshold, origin hubs, and flat courier rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Complimentary Courier Threshold ($)
              </label>
              <input
                type="number"
                required
                value={shipping.complimentaryThreshold}
                onChange={(e) =>
                  setShipping({ ...shipping, complimentaryThreshold: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
              <span className="text-[10px] text-[#8E8271] mt-1 block">Orders above this threshold receive free insured shipping.</span>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Standard Insured Flat Rate ($)
              </label>
              <input
                type="number"
                required
                value={shipping.standardInsuredRate}
                onChange={(e) =>
                  setShipping({ ...shipping, standardInsuredRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Primary Courier Partner
              </label>
              <input
                type="text"
                required
                value={shipping.defaultCarrier}
                onChange={(e) => setShipping({ ...shipping, defaultCarrier: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Atelier Origin Hub
              </label>
              <input
                type="text"
                required
                value={shipping.originHub}
                onChange={(e) => setShipping({ ...shipping, originHub: e.target.value })}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>
          </div>

          {hasPerm("settings", "manage") && (
            <div className="flex justify-end pt-4 border-t border-[#2A241E]">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <Save size={14} />
                <span>Save Logistics Settings</span>
              </button>
            </div>
          )}
        </form>
      )}

      {/* Tab 4: Tax & Duties */}
      {activeTab === "tax" && (
        <form onSubmit={handleSaveTax} className="bg-[#14120F] border border-[#2A241E] rounded p-6 space-y-6">
          <div className="border-b border-[#2A241E] pb-3">
            <h2 className="font-serif text-[#F5F2EA] text-base font-light">
              Customs, Excise &amp; Duties
            </h2>
            <p className="text-xs text-[#8E8271] mt-0.5">
              Configure luxury excise tax rates applied to alcohol-based fragrance distillations.
            </p>
          </div>

          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Standard Excise Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={tax.defaultExciseRate}
                onChange={(e) =>
                  setTax({ ...tax, defaultExciseRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="taxReceipt"
                checked={tax.requireTaxReceipts}
                onChange={(e) => setTax({ ...tax, requireTaxReceipts: e.target.checked })}
                className="rounded border-[#2A241E] bg-[#0D0B09] text-[#C8A45D] focus:ring-[#C8A45D]"
              />
              <label htmlFor="taxReceipt" className="text-xs text-[#F5F2EA] cursor-pointer">
                Generate formal customs &amp; tax declaration receipts with each invoice
              </label>
            </div>
          </div>

          {hasPerm("settings", "manage") && (
            <div className="flex justify-end pt-4 border-t border-[#2A241E]">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <Save size={14} />
                <span>Save Tax Settings</span>
              </button>
            </div>
          )}
        </form>
      )}

      {/* Tab 5: Staff & RBAC */}
      {activeTab === "staff" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-[#F5F2EA] text-base font-light">
                Staff Directory &amp; Role Assignments
              </h2>
              <p className="text-xs text-[#8E8271]">
                Manage team clearances across 7 role-based permission tiers.
              </p>
            </div>

            {hasPerm("settings", "manage") && (
              <button
                onClick={() => setInviteModalOpen(true)}
                className="inline-flex items-center space-x-2 px-3 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <Plus size={14} />
                <span>Invite Staff</span>
              </button>
            )}
          </div>

          <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                    <th className="py-3.5 px-4 font-medium">Staff Member</th>
                    <th className="py-3.5 px-4 font-medium">Role Assignment</th>
                    <th className="py-3.5 px-4 font-medium text-center">Standing</th>
                    <th className="py-3.5 px-4 font-medium">Last Login</th>
                    <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A241E]/60">
                  {staff.map((m) => (
                    <tr key={m.id} className="hover:bg-[#1A1612]/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-serif text-[#F5F2EA] font-medium text-sm block">
                          {m.fullName}
                        </span>
                        <span className="text-[#8E8271] text-xs font-mono">{m.email}</span>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          disabled={!hasPerm("settings", "manage") || m.id === adminUser?.id}
                          value={m.role}
                          onChange={(e) => handleRoleChange(m.id, e.target.value as AdminRole)}
                          className="bg-[#0D0B09] border border-[#2A241E] rounded px-2.5 py-1 text-xs text-[#C8A45D] font-mono focus:outline-hidden focus:border-[#C8A45D] disabled:opacity-60"
                        >
                          <option value="super_admin">Super Admin</option>
                          <option value="product_manager">Product Manager</option>
                          <option value="inventory_manager">Inventory Manager</option>
                          <option value="order_manager">Order Manager</option>
                          <option value="customer_support">Customer Support</option>
                          <option value="marketing_manager">Marketing Manager</option>
                          <option value="content_manager">Content Manager</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <StatusBadge
                          status={m.status}
                          tone={m.status === "active" ? "success" : "danger"}
                        />
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-[#8E8271]">
                        {m.lastLoginAt
                          ? `${new Date(m.lastLoginAt).toLocaleDateString()} ${new Date(m.lastLoginAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                          : "Active Session"}
                      </td>

                      <td className="py-4 px-4 text-right">
                        {hasPerm("settings", "manage") && m.id !== adminUser?.id && (
                          <button
                            onClick={() => handleToggleStaffStatus(m.id)}
                            className="text-[11px] font-mono text-[#8E8271] hover:text-[#EDE8D0] underline"
                          >
                            {m.status === "active" ? "Suspend" : "Activate"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invite Modal */}
          <AdminModal
            isOpen={inviteModalOpen}
            onClose={() => setInviteModalOpen(false)}
            title="Invite Staff Member"
            subtitle="Grant administrative access and assign operational domain permissions."
            maxWidth="md"
          >
            <form onSubmit={handleInviteStaff} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laurent Beaumarchais"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="laurent@fragology.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Initial Role Assignment
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as AdminRole)}
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
                >
                  <option value="super_admin">Super Admin (Unrestricted)</option>
                  <option value="product_manager">Product Manager (Catalog &amp; Formulations)</option>
                  <option value="inventory_manager">Inventory Manager (Cellar Reserves)</option>
                  <option value="order_manager">Order Manager (Commissions &amp; Shipping)</option>
                  <option value="customer_support">Customer Support (Clientele &amp; Inquiries)</option>
                  <option value="marketing_manager">Marketing Manager (Dispatches &amp; Promos)</option>
                  <option value="content_manager">Content Manager (Storefront Editorial)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Telephone (Optional)
                </label>
                <input
                  type="text"
                  placeholder="+33 1 42 68 55 00"
                  value={invitePhone}
                  onChange={(e) => setInvitePhone(e.target.value)}
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
                >
                  Dispatch Invitation
                </button>
              </div>
            </form>
          </AdminModal>
        </div>
      )}

      {/* Tab 6: Security Audit Trail */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
              <input
                type="text"
                placeholder="Search action or staff email..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <select
                value={auditModuleFilter}
                onChange={(e) => setAuditModuleFilter(e.target.value)}
                className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="all">All Modules</option>
                <option value="products">Products</option>
                <option value="inventory">Inventory</option>
                <option value="orders">Orders</option>
                <option value="categories">Categories</option>
                <option value="collections">Collections</option>
                <option value="coupons">Coupons</option>
                <option value="reviews">Reviews</option>
                <option value="content">Content</option>
                <option value="marketing">Marketing</option>
                <option value="settings">Settings</option>
              </select>

              <button
                onClick={handleExportAuditCsv}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-[#2A241E] hover:border-[#C8A45D]/50 text-xs text-[#EDE8D0] rounded transition-colors whitespace-nowrap"
              >
                <Download size={13} className="text-[#C8A45D]" />
                <span>Export Audit CSV</span>
              </button>
            </div>
          </div>

          <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                    <th className="py-3.5 px-4 font-medium">Timestamp (UTC)</th>
                    <th className="py-3.5 px-4 font-medium">Staff Actor</th>
                    <th className="py-3.5 px-4 font-medium">Module &amp; Action</th>
                    <th className="py-3.5 px-4 font-medium">Record Reference</th>
                    <th className="py-3.5 px-4 font-medium">Change Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A241E]/60 font-mono text-[11px]">
                  {filteredAuditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-[#8E8271] font-sans text-xs">
                        No audit events match your filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#1A1612]/50 transition-colors">
                        <td className="py-3.5 px-4 text-[#8E8271]">
                          {new Date(log.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-[#F5F2EA] block">{log.adminEmail}</span>
                          <span className="text-[10px] text-[#C8A45D] uppercase">{log.adminRole}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-[#1E1914] text-[#C8A45D] border border-[#2A241E] text-[10px] uppercase">
                            {log.module}
                          </span>
                          <span className="text-[#8E8271] block mt-0.5 text-[10px]">{log.action}</span>
                        </td>

                        <td className="py-3.5 px-4 text-[#EDE8D0]">
                          {log.recordReference}
                        </td>

                        <td className="py-3.5 px-4 font-sans text-xs text-[#B3A898] max-w-md">
                          {log.changeSummary}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
