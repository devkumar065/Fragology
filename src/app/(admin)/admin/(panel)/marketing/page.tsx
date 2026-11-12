"use client";

import React, { useState, useMemo } from "react";
import {
  Send,
  Plus,
  Mail,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getMarketingSubscribers,
  getMarketingCampaigns,
  createMarketingCampaign,
  updateCampaignStatus,
} from "@/lib/admin/store";
import { MarketingSubscriber, MarketingCampaign } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function MarketingManagementPage() {
  const { adminUser, hasPerm } = useAdminAuth();

  // Active Tab: "campaigns" or "subscribers"
  const [activeTab, setActiveTab] = useState<"campaigns" | "subscribers">("campaigns");

  const [subscribers] = useState<MarketingSubscriber[]>(getMarketingSubscribers());
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(getMarketingCampaigns());

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Create Campaign Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campName, setCampName] = useState("");
  const [campSubject, setCampSubject] = useState("");
  const [campPreview, setCampPreview] = useState("");
  const [campAudience, setCampAudience] = useState<MarketingCampaign["targetAudience"]>("all_subscribers");
  const [campBody, setCampBody] = useState("");

  // Metrics
  const totalSubscribersCount = subscribers.filter((s) => s.consentStatus === "subscribed").length;
  const activeCampaignsCount = campaigns.filter((c) => c.status === "sent" || c.status === "scheduled").length;
  const totalDispatches = campaigns.filter((c) => c.status === "sent").length;
  const avgOpenRate = 67.1; // Luxury private circulation rate

  // Filtered Subscribers
  const filteredSubscribers = useMemo(() => {
    if (!searchQuery.trim()) return subscribers;
    const q = searchQuery.toLowerCase();
    return subscribers.filter(
      (s) => s.email.toLowerCase().includes(q) || s.source.toLowerCase().includes(q)
    );
  }, [subscribers, searchQuery]);

  // Filtered Campaigns
  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return campaigns;
    const q = searchQuery.toLowerCase();
    return campaigns.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.targetAudience.toLowerCase().includes(q)
    );
  }, [campaigns, searchQuery]);

  // Open Create Campaign Modal
  const handleOpenCreateCampaign = () => {
    setCampName("");
    setCampSubject("");
    setCampPreview("");
    setCampAudience("all_subscribers");
    setCampBody("");
    setIsModalOpen(true);
  };

  // Submit Campaign
  const handleSaveCampaign = (e: React.FormEvent, executeSend = false) => {
    e.preventDefault();
    if (!adminUser) return;
    if (!campName.trim() || !campSubject.trim()) {
      showToast("Please provide campaign name and subject line.", "error");
      return;
    }

    const created = createMarketingCampaign(
      {
        name: campName.trim(),
        subject: campSubject.trim(),
        previewText: campPreview.trim(),
        contentBody: campBody.trim(),
        targetAudience: campAudience,
        recipientCount: campAudience === "vip_patrons" ? 120 : totalSubscribersCount,
        createdBy: adminUser.email,
      },
      adminUser
    );

    if (executeSend) {
      updateCampaignStatus(created.id, "sent", adminUser);
      showToast(`Campaign "${created.name}" dispatched to patrons immediately.`);
    } else {
      showToast(`Campaign draft "${created.name}" created.`);
    }

    setCampaigns(getMarketingCampaigns());
    setIsModalOpen(false);
  };

  // Dispatch Draft Now
  const handleDispatchNow = (camp: MarketingCampaign) => {
    if (!adminUser || !hasPerm("marketing", "manage")) return;
    if (confirm(`Authorize immediate dispatch of "${camp.name}" to ${camp.recipientCount} patrons?`)) {
      updateCampaignStatus(camp.id, "sent", adminUser);
      setCampaigns(getMarketingCampaigns());
      showToast(`Campaign "${camp.name}" dispatched successfully.`);
    }
  };

  // CSV Export for Subscribers
  const handleExportSubscribers = () => {
    const headers = ["Subscriber ID", "Email Address", "Opt-In Source", "Consent Status", "Subscription Date"];
    const rows = filteredSubscribers.map((s) =>
      [s.id, s.email, s.source, s.consentStatus, `"${s.subscribedAt}"`].join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fragology-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Subscribers list exported.");
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
            <Mail size={13} />
            <span>Patron Correspondence &amp; Dispatches</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Marketing Dispatches &amp; Subscribers
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Curate bespoke email invitations, seasonal harvest announcements, and manage GDPR-compliant subscriber consents.
          </p>
        </div>

        {hasPerm("marketing", "create") && (
          <button
            onClick={handleOpenCreateCampaign}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus size={15} />
            <span>Draft Dispatch</span>
          </button>
        )}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Subscribed Patrons
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#F5F2EA] mt-1 block">
            {totalSubscribersCount.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Verified opt-in consent
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Circulated Dispatches
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#C8A45D] mt-1 block">
            {totalDispatches}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Delivered to inboxes
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Average Open Rate
          </span>
          <span className="text-2xl font-numbers font-semibold text-emerald-400 mt-1 block">
            {avgOpenRate}%
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Haute parfumerie standard
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Active Campaigns
          </span>
          <span className="text-2xl font-numbers font-semibold text-amber-400 mt-1 block">
            {activeCampaignsCount}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Sent &amp; scheduled dispatches
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2A241E] space-x-6">
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "campaigns"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Send size={13} />
          <span>Dispatch Campaigns ({campaigns.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`pb-3 text-xs uppercase tracking-wider font-mono transition-colors border-b-2 -mb-px flex items-center space-x-1.5 ${
            activeTab === "subscribers"
              ? "border-[#C8A45D] text-[#C8A45D]"
              : "border-transparent text-[#8E8271] hover:text-[#EDE8D0]"
          }`}
        >
          <Users size={13} />
          <span>Opt-In Patrons ({subscribers.length})</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
          <input
            type="text"
            placeholder={activeTab === "campaigns" ? "Search campaigns..." : "Search subscriber email..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D]"
          />
        </div>

        {activeTab === "subscribers" && hasPerm("marketing", "export") && (
          <button
            onClick={handleExportSubscribers}
            className="inline-flex items-center space-x-2 px-3 py-1.5 border border-[#2A241E] hover:border-[#C8A45D]/50 text-xs text-[#EDE8D0] rounded transition-colors"
          >
            <Download size={13} className="text-[#C8A45D]" />
            <span>Export Subscribers</span>
          </button>
        )}
      </div>

      {activeTab === "campaigns" ? (
        /* Campaigns Table */
        <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                  <th className="py-3.5 px-4 font-medium">Campaign Dispatch</th>
                  <th className="py-3.5 px-4 font-medium">Target Audience</th>
                  <th className="py-3.5 px-4 font-medium text-center">Recipients</th>
                  <th className="py-3.5 px-4 font-medium text-center">Open Rate</th>
                  <th className="py-3.5 px-4 font-medium text-center">Status</th>
                  <th className="py-3.5 px-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A241E]/60">
                {filteredCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-[#1A1612]/50 transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-serif text-[#F5F2EA] font-medium text-sm block">
                        {camp.name}
                      </span>
                      <span className="text-[#8E8271] text-xs block truncate max-w-md">
                        &ldquo;{camp.subject}&rdquo;
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span className="capitalize font-mono text-[11px] text-[#C8A45D]">
                        {camp.targetAudience.replace("_", " ")}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center font-mono text-[#EDE8D0]">
                      {camp.recipientCount.toLocaleString()} patrons
                    </td>

                    <td className="py-4 px-4 text-center font-mono">
                      {camp.openCount ? (
                        <span className="text-emerald-400">
                          {((camp.openCount / camp.recipientCount) * 100).toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-[#665D4F]">&mdash;</span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <StatusBadge
                        status={camp.status}
                        tone={camp.status === "sent" ? "success" : camp.status === "scheduled" ? "warning" : "neutral"}
                      />
                    </td>

                    <td className="py-4 px-4 text-right">
                      {hasPerm("marketing", "manage") && camp.status === "draft" ? (
                        <button
                          onClick={() => handleDispatchNow(camp)}
                          className="px-3 py-1.5 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-[11px] font-medium uppercase tracking-wider rounded transition-colors"
                        >
                          Dispatch Now
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-[#665D4F]">
                          {camp.sentAt ? `Dispatched ${new Date(camp.sentAt).toLocaleDateString()}` : "Completed"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Subscribers Table */
        <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                  <th className="py-3.5 px-4 font-medium">Patron Email Address</th>
                  <th className="py-3.5 px-4 font-medium">Opt-In Source Channel</th>
                  <th className="py-3.5 px-4 font-medium text-center">Consent Standing</th>
                  <th className="py-3.5 px-4 font-medium text-right">Subscription Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A241E]/60">
                {filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#1A1612]/50 transition-colors">
                    <td className="py-3.5 px-4 font-serif text-[#F5F2EA] font-medium">
                      {sub.email}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#8E8271] capitalize">
                      {sub.source.replace(/_/g, " ")}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge
                        status={sub.consentStatus}
                        tone={sub.consentStatus === "subscribed" ? "success" : "neutral"}
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-[11px] text-[#665D4F]">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Compose Atelier Dispatch"
        subtitle="Author private curatorial dispatch for circulating to authenticated fragrance patrons."
        maxWidth="lg"
      >
        <form onSubmit={(e) => handleSaveCampaign(e, false)} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Internal Campaign Moniker *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Winter Solstice Extrait Harvest Invitation"
              value={campName}
              onChange={(e) => setCampName(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Dispatch Subject Line *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Private Invitation: The 2026 Winter Distillation is Sealed"
                value={campSubject}
                onChange={(e) => setCampSubject(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Target Patron Audience
              </label>
              <select
                value={campAudience}
                onChange={(e) => setCampAudience(e.target.value as MarketingCampaign["targetAudience"])}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="all_subscribers">All Opted-In Patrons</option>
                <option value="vip_patrons">VIP &amp; Maison Circle Only</option>
                <option value="inactive_clients">Inactive Patrons (Re-engagement)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Preview Subheading Text
            </label>
            <input
              type="text"
              placeholder="e.g. Discover rare botanical extraits matured in Grasse cellars."
              value={campPreview}
              onChange={(e) => setCampPreview(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Editorial Dispatch Body
            </label>
            <textarea
              rows={5}
              placeholder="Chers Patrons, We have completed the final distillation of our winter extrait series..."
              value={campBody}
              onChange={(e) => setCampBody(e.target.value)}
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
              className="px-4 py-2 border border-[#C8A45D]/40 hover:bg-[#1E1914] text-xs text-[#EDE8D0] rounded transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={(e) => handleSaveCampaign(e, true)}
              className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
            >
              Dispatch Now
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
