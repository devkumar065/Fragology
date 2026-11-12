"use client";

import React, { useState, useMemo } from "react";
import {
  Star,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trash2,
  ShieldCheck,
  Edit2,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import {
  getAdminReviews,
  moderateReview,
  deleteReview,
} from "@/lib/admin/store";
import { ProductReview } from "@/lib/admin/types";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function ReviewsManagementPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const [reviews, setReviews] = useState<ProductReview[]>(getAdminReviews());

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Moderation Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [targetReview, setTargetReview] = useState<ProductReview | null>(null);
  const [newStatus, setNewStatus] = useState<ProductReview["status"]>("approved");
  const [moderationNote, setModerationNote] = useState("");

  // Metrics
  const totalReviews = reviews.length;
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const avgRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 5.0;

  // Filtered List
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (ratingFilter !== "all" && r.rating.toString() !== ratingFilter) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        r.productName.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.customerEmail.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.comment.toLowerCase().includes(q)
      );
    });
  }, [reviews, statusFilter, ratingFilter, searchQuery]);

  // Quick Approve
  const handleQuickApprove = (rev: ProductReview) => {
    if (!adminUser || !hasPerm("reviews", "approve")) return;
    const updated = moderateReview(rev.id, "approved", "Directly approved via quick action.", adminUser);
    if (updated) {
      setReviews(getAdminReviews());
      showToast(`Review on "${rev.productName}" approved.`);
    }
  };

  // Quick Reject
  const handleQuickReject = (rev: ProductReview) => {
    if (!adminUser || !hasPerm("reviews", "approve")) return;
    const updated = moderateReview(rev.id, "rejected", "Rejected via quick action.", adminUser);
    if (updated) {
      setReviews(getAdminReviews());
      showToast(`Review on "${rev.productName}" rejected.`);
    }
  };

  // Open Full Moderation Modal
  const handleOpenModeration = (rev: ProductReview) => {
    setTargetReview(rev);
    setNewStatus(rev.status);
    setModerationNote(rev.moderationNote || "");
    setModalOpen(true);
  };

  // Commit Modal Moderation
  const handleSaveModeration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !targetReview) return;

    const updated = moderateReview(targetReview.id, newStatus, moderationNote.trim(), adminUser);
    if (updated) {
      setReviews(getAdminReviews());
      showToast(`Review status updated to ${newStatus.toUpperCase()}.`);
      setModalOpen(false);
    }
  };

  // Delete Review
  const handleDelete = (rev: ProductReview) => {
    if (!adminUser || !hasPerm("reviews", "delete")) return;
    if (confirm(`Are you certain you wish to permanently delete the review from "${rev.customerName}"?`)) {
      const success = deleteReview(rev.id, adminUser);
      if (success) {
        setReviews(getAdminReviews());
        showToast("Review record deleted.");
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
            <Star size={13} />
            <span>Scent Reviews &amp; Testimonials</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Patron Reviews &amp; Moderation
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Moderate client sensory evaluations, verified purchase feedback, and storefront display approvals.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Total Reviews
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#F5F2EA] mt-1 block">
            {totalReviews}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Client impressions submitted
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Pending Moderation
          </span>
          <span className="text-2xl font-numbers font-semibold text-amber-400 mt-1 block">
            {pendingCount}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Awaiting editorial review
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Approved on Storefront
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#C8A45D] mt-1 block">
            {approvedCount}
          </span>
          <span className="text-[11px] text-emerald-400 mt-0.5 block">
            Publicly visible
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Average Scent Rating
          </span>
          <span className="text-2xl font-numbers font-semibold text-[#EDE8D0] mt-1 block">
            {avgRating.toFixed(1)} / 5.0
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Sensory benchmark
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
          <input
            type="text"
            placeholder="Search flacon, patron, or feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0B09] border border-[#2A241E] rounded pl-9 pr-4 py-2 text-xs text-[#F5F2EA] placeholder-[#665D4F] focus:outline-hidden focus:border-[#C8A45D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            >
              <option value="all">All ({reviews.length})</option>
              <option value="pending">Pending ({pendingCount})</option>
              <option value="approved">Approved ({approvedCount})</option>
              <option value="rejected">Rejected</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Rating:</span>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            >
              <option value="all">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#8E8271] bg-[#14120F] border border-[#2A241E] rounded">
            No patron reviews match the current filter parameters.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-3 hover:border-[#C8A45D]/40 transition-colors"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A241E]/60 pb-3">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-[#F5F2EA] text-sm font-medium">
                      {rev.customerName}
                    </span>
                    {rev.isVerifiedPurchase && (
                      <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-400 font-mono">
                        <ShieldCheck size={12} />
                        <span>Verified Client</span>
                      </span>
                    )}
                    <span className="text-[10px] text-[#665D4F] font-mono">
                      &bull; {rev.customerEmail}
                    </span>
                  </div>

                  <span className="text-xs text-[#C8A45D] font-mono block mt-0.5">
                    Flacon: {rev.productName}
                  </span>
                </div>

                <div className="flex items-center space-x-3 self-start sm:self-auto">
                  {/* Stars */}
                  <div className="flex items-center space-x-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={13}
                        className={s <= rev.rating ? "text-[#C8A45D] fill-[#C8A45D]" : "text-[#2A241E]"}
                      />
                    ))}
                  </div>

                  <StatusBadge
                    status={rev.status}
                    tone={
                      rev.status === "approved"
                        ? "success"
                        : rev.status === "pending"
                        ? "warning"
                        : "danger"
                    }
                  />
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-1">
                <h2 className="font-serif text-[#F5F2EA] text-sm font-medium">
                  &ldquo;{rev.title}&rdquo;
                </h2>
                <p className="text-xs text-[#B3A898] leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Moderation Notes if present */}
              {rev.moderationNote && (
                <div className="p-2.5 bg-[#0D0B09] border border-[#2A241E] rounded text-[11px] text-[#8E8271] flex items-center justify-between">
                  <span>Note: {rev.moderationNote}</span>
                  <span className="font-mono text-[10px] text-[#665D4F]">
                    Moderated by {rev.moderatedBy}
                  </span>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="font-mono text-[10px] text-[#665D4F]">
                  Submitted on {new Date(rev.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center space-x-2">
                  {hasPerm("reviews", "approve") && rev.status !== "approved" && (
                    <button
                      onClick={() => handleQuickApprove(rev)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-[11px] rounded transition-colors"
                    >
                      <CheckCircle2 size={12} />
                      <span>Approve</span>
                    </button>
                  )}

                  {hasPerm("reviews", "approve") && rev.status !== "rejected" && (
                    <button
                      onClick={() => handleQuickReject(rev)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 bg-red-950/40 hover:bg-red-900/40 border border-red-500/40 text-red-300 text-[11px] rounded transition-colors"
                    >
                      <XCircle size={12} />
                      <span>Reject</span>
                    </button>
                  )}

                  {hasPerm("reviews", "edit") && (
                    <button
                      onClick={() => handleOpenModeration(rev)}
                      className="p-1.5 text-[#8E8271] hover:text-[#EDE8D0] rounded transition-colors"
                      title="Moderate & Add Note"
                    >
                      <Edit2 size={14} />
                    </button>
                  )}

                  {hasPerm("reviews", "delete") && (
                    <button
                      onClick={() => handleDelete(rev)}
                      className="p-1.5 text-[#8E8271] hover:text-red-400 rounded transition-colors"
                      title="Delete Review"
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

      {/* Moderation Modal */}
      <AdminModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={targetReview ? `Moderate Review on ${targetReview.productName}` : "Moderate Review"}
        subtitle="Approve or decline client impression and record editorial rationale."
        maxWidth="md"
      >
        {targetReview && (
          <form onSubmit={handleSaveModeration} className="space-y-4">
            <div className="bg-[#0D0B09] p-3 rounded border border-[#2A241E] text-xs space-y-1">
              <span className="text-[#8E8271]">Client: {targetReview.customerName}</span>
              <p className="font-serif text-[#F5F2EA] italic">&ldquo;{targetReview.title}&rdquo;</p>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Moderation Decision *
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as ProductReview["status"])}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="approved">Approved (Visible on Storefront)</option>
                <option value="pending">Pending (Held for Verification)</option>
                <option value="rejected">Rejected (Hidden)</option>
                <option value="flagged">Flagged (Investigate Policy Violation)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Editorial Moderation Note
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Verified client purchase from Mayfair boutique commission."
                value={moderationNote}
                onChange={(e) => setModerationNote(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                Save Decision
              </button>
            </div>
          </form>
        )}
      </AdminModal>
    </div>
  );
}
