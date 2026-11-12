"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  AlertCircle,
  MapPin,
  ExternalLink,
  RotateCcw,
  User,
  CreditCard,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import { getOrder, updateOrderStatus } from "@/lib/orders-store";
import { logAdminActivity } from "@/lib/admin/store";
import { Order, OrderStatus } from "@/types/order";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function OrderDetailPage() {
  const params = useParams();
  const { adminUser, hasPerm } = useAdminAuth();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const initialOrder = useMemo(() => (id ? getOrder(id) : undefined), [id]);
  const [order, setOrder] = useState<Order | undefined>(initialOrder);

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Status Change Modal
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<OrderStatus>("processing");
  const [statusNote, setStatusNote] = useState("");
  const [carrier, setCarrier] = useState(order?.shippingCarrier || "DHL Express Luxury Network");
  const [tracking, setTracking] = useState(order?.trackingNumber || "");

  // Refund Modal
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState<number>(order?.totalAmount || 0);
  const [refundReason, setRefundReason] = useState("");

  if (!order) {
    return (
      <div className="py-16 text-center space-y-4">
        <h2 className="text-xl font-serif text-[#F5F2EA]">Commission Not Found</h2>
        <p className="text-xs text-[#8E8271]">
          The commission record with identifier &ldquo;{id}&rdquo; could not be retrieved from the store ledger.
        </p>
        <Link
          href="/admin/orders"
          className="inline-flex items-center space-x-2 text-xs text-[#C8A45D] hover:underline uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>Return to Orders</span>
        </Link>
      </div>
    );
  }

  // Handle Advance Status
  const handleOpenStatusModal = () => {
    const nextStatus: OrderStatus =
      order.status === "pending"
        ? "confirmed"
        : order.status === "confirmed"
        ? "processing"
        : order.status === "processing"
        ? "shipped"
        : order.status === "shipped"
        ? "delivered"
        : order.status;

    setTargetStatus(nextStatus);
    setStatusNote("");
    setCarrier(order.shippingCarrier || "DHL Express Luxury Network");
    setTracking(order.trackingNumber || `TRK-FRG-${Math.floor(10000 + Math.random() * 90000)}-INT`);
    setIsStatusModalOpen(true);
  };

  const handleCommitStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    const note =
      statusNote.trim() ||
      (targetStatus === "shipped"
        ? `Consignment handed to ${carrier} (Tracking: ${tracking}).`
        : `Status transitioned to ${targetStatus} by atelier fulfillment.`);

    const updated = updateOrderStatus(order.orderNumber, targetStatus, note);
    if (updated) {
      if (targetStatus === "shipped") {
        updated.shippingCarrier = carrier;
        updated.trackingNumber = tracking;
      }
      setOrder({ ...updated });

      logAdminActivity({
        adminId: adminUser.id,
        adminEmail: adminUser.email,
        adminRole: adminUser.role,
        action: "order.update_status",
        module: "orders",
        recordReference: order.orderNumber,
        changeSummary: `Updated order ${order.orderNumber} fulfillment status to ${targetStatus}.`,
      });

      showToast(`Order status updated to ${targetStatus.toUpperCase()}.`);
      setIsStatusModalOpen(false);
    }
  };

  // Handle Refund
  const handleCommitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    const note = `Atelier refund issued: ₹${refundAmount.toLocaleString("en-IN")}. Reason: ${refundReason.trim() || "Patron request."}`;
    const updated = updateOrderStatus(order.orderNumber, "cancelled", note);
    if (updated) {
      updated.paymentStatus = "refunded";
      setOrder({ ...updated });

      logAdminActivity({
        adminId: adminUser.id,
        adminEmail: adminUser.email,
        adminRole: adminUser.role,
        action: "order.refund",
        module: "orders",
        recordReference: order.orderNumber,
        changeSummary: `Issued refund of ₹${refundAmount.toLocaleString("en-IN")} for ${order.orderNumber}.`,
      });

      showToast(`Refund processed for ${order.orderNumber}.`);
      setIsRefundModalOpen(false);
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

      {/* Back Link & Header */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#8E8271] hover:text-[#C8A45D] transition-colors mb-3"
        >
          <ArrowLeft size={13} />
          <span>Back to All Orders</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2A241E]">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-serif text-[#F5F2EA] font-light">
                {order.orderNumber}
              </h1>
              <StatusBadge status={order.status} />
              <StatusBadge
                status={order.paymentStatus}
                tone={order.paymentStatus === "paid" ? "success" : "warning"}
              />
            </div>
            <p className="text-xs text-[#8E8271] mt-1 font-mono">
              Commissioned on {new Date(order.createdAt).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                timeZoneName: "short",
              })}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {hasPerm("orders", "edit") && order.status !== "cancelled" && (
              <button
                onClick={handleOpenStatusModal}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                <Truck size={14} />
                <span>Advance Fulfillment</span>
              </button>
            )}

            {hasPerm("orders", "manage") && order.paymentStatus === "paid" && (
              <button
                onClick={() => {
                  setRefundAmount(order.totalAmount);
                  setRefundReason("");
                  setIsRefundModalOpen(true);
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-2 border border-red-500/40 hover:bg-red-950/30 text-xs text-red-300 rounded transition-colors"
              >
                <RotateCcw size={14} />
                <span>Issue Refund</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Items & Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Flacons in Order */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
            <div className="p-4 border-b border-[#2A241E] flex items-center justify-between">
              <span className="font-serif text-[#F5F2EA] text-sm font-medium">
                Commissioned Fragrance Flacons (<span className="font-numbers font-medium">{order.items.length}</span>)
              </span>
              <span className="font-mono text-[10px] text-[#C8A45D] uppercase">
                Artisanal Distillations
              </span>
            </div>

            <div className="divide-y divide-[#2A241E]/60">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-serif text-[#F5F2EA] text-sm font-medium block">
                      {item.productName}
                    </span>
                    <span className="text-xs text-[#8E8271] block">
                      {item.volumeDisplay || `${item.variantSize} Flacon`} &bull; {item.concentration || "Extrait de Parfum"}
                    </span>
                    <span className="font-numbers text-[10px] text-[#8E8271]">
                      Unit: ₹{item.priceNum.toLocaleString("en-IN")} &times; {item.quantity}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-numbers font-semibold text-[#EDE8D0] text-sm block">
                      ₹{(item.priceNum * item.quantity).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-sans">
                      Includes 2ml sample vial
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="bg-[#0D0B09]/80 p-4 border-t border-[#2A241E] space-y-2 text-xs">
              <div className="flex justify-between text-[#8E8271]">
                <span>Flacon Subtotal</span>
                <span className="font-numbers font-medium text-[#EDE8D0]">₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-[#C8A45D]">
                  <span>Privilege Courtesy ({order.couponCode || "Discount"})</span>
                  <span className="font-numbers font-medium">-₹{order.discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-[#8E8271]">
                <span>Insured White-Glove Courier</span>
                <span className="font-numbers font-medium text-[#EDE8D0]">
                  {order.shippingFee === 0 ? "Complimentary" : `₹${order.shippingFee.toLocaleString("en-IN")}`}
                </span>
              </div>

              <div className="flex justify-between text-[#8E8271]">
                <span>Excise Tax &amp; Customs Duties (8%)</span>
                <span className="font-numbers font-medium text-[#EDE8D0]">₹{order.taxAmount.toLocaleString("en-IN")}</span>
              </div>

              <div className="pt-2 border-t border-[#2A241E] flex justify-between items-baseline">
                <span className="text-xs uppercase font-mono tracking-wider text-[#F5F2EA] font-medium">
                  Total Commission Investment
                </span>
                <span className="font-numbers text-lg text-[#C8A45D] font-semibold">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Consignment Timeline / History */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-4">
            <h2 className="font-serif text-[#F5F2EA] text-sm font-medium border-b border-[#2A241E] pb-3">
              Consignment Fulfillment Timeline
            </h2>

            <div className="space-y-4">
              {order.statusHistory && order.statusHistory.length > 0 ? (
                order.statusHistory.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs">
                    <div className="mt-0.5 shrink-0 w-2 h-2 rounded-full bg-[#C8A45D]" />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#C8A45D] uppercase font-medium">
                          {step.status}
                        </span>
                        <span className="font-mono text-[10px] text-[#665D4F]">
                          {step.timestamp}
                        </span>
                      </div>
                      <p className="text-[#EDE8D0]">{step.note}</p>
                      {step.location && (
                        <span className="text-[10px] text-[#8E8271] flex items-center space-x-1 mt-0.5">
                          <MapPin size={10} />
                          <span>{step.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#8E8271]">Initial order confirmation registered.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Patron & Courier Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Patron Identification */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <User size={13} />
              <span>Patron Information</span>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-serif text-[#F5F2EA] font-medium text-sm">{order.customerName}</p>
              <p className="text-[#8E8271]">{order.customerEmail}</p>
              <p className="text-[#8E8271] font-mono">{order.customerPhone || "Phone Private"}</p>
            </div>
          </div>

          {/* Insured Destination */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <MapPin size={13} />
              <span>Delivery Destination</span>
            </div>

            <div className="text-xs text-[#EDE8D0] space-y-0.5">
              <p>{order.shippingAddress.streetAddress1}</p>
              {order.shippingAddress.streetAddress2 && (
                <p>{order.shippingAddress.streetAddress2}</p>
              )}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.stateProvince}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="font-medium text-[#F5F2EA] pt-1">
                {order.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Courier & Tracking */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <Truck size={13} />
              <span>Transit &amp; Courier Reference</span>
            </div>

            <div className="text-xs space-y-2">
              <div>
                <span className="text-[10px] text-[#8E8271] uppercase font-mono block">Carrier</span>
                <span className="text-[#EDE8D0] font-medium">
                  {order.shippingCarrier || "DHL Express Luxury Network"}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#8E8271] uppercase font-mono block">Tracking Reference</span>
                <span className="font-mono text-[#C8A45D]">
                  {order.trackingNumber || "Pending dispatch assignment"}
                </span>
              </div>

              {order.trackingNumber && (
                <Link
                  href={`/tracking?order=${order.orderNumber}`}
                  target="_blank"
                  className="inline-flex items-center space-x-1 text-[11px] text-[#C8A45D] hover:underline pt-1"
                >
                  <span>Open Client Tracking Screen</span>
                  <ExternalLink size={12} />
                </Link>
              )}
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="bg-[#14120F] border border-[#2A241E] rounded p-5 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A45D] uppercase tracking-wider border-b border-[#2A241E] pb-2">
              <CreditCard size={13} />
              <span>Settlement Details</span>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#8E8271]">Provider</span>
                <span className="font-mono text-[#EDE8D0] uppercase">
                  {order.paymentProvider.replace("_", " ")}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#8E8271]">Payment Status</span>
                <StatusBadge
                  status={order.paymentStatus}
                  tone={order.paymentStatus === "paid" ? "success" : "warning"}
                />
              </div>

              {order.paymentReference && (
                <div>
                  <span className="text-[10px] text-[#8E8271] uppercase font-mono block">Gateway Intent ID</span>
                  <span className="font-mono text-[10px] text-[#665D4F] break-all">
                    {order.paymentReference}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Advance Status Modal */}
      <AdminModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title={`Advance Fulfillment: ${order.orderNumber}`}
        subtitle="Transition consignment state, update courier dispatch tracking, and notify patron."
        maxWidth="md"
      >
        <form onSubmit={handleCommitStatus} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Next Consignment State *
            </label>
            <select
              value={targetStatus}
              onChange={(e) => setTargetStatus(e.target.value as OrderStatus)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            >
              <option value="confirmed">Confirmed (Atelier Authorization)</option>
              <option value="processing">Processing (Hand Bottling &amp; Wax Seal)</option>
              <option value="shipped">Shipped (Dispatched via Courier)</option>
              <option value="delivered">Delivered (Handed to Patron)</option>
              <option value="cancelled">Cancelled (Revoked)</option>
            </select>
          </div>

          {targetStatus === "shipped" && (
            <div className="space-y-3 p-3 bg-[#1A1612] border border-[#2A241E] rounded">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Courier Liaison Network *
                </label>
                <input
                  type="text"
                  required
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                  Insured Tracking Code *
                </label>
                <input
                  type="text"
                  required
                  value={tracking}
                  onChange={(e) => setTracking(e.target.value)}
                  className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Atelier Log Note
            </label>
            <textarea
              rows={3}
              placeholder="Record quality inspection results, wax seal batch, or handling notes..."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
            <button
              type="button"
              onClick={() => setIsStatusModalOpen(false)}
              className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
            >
              Commit Status
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Refund Modal */}
      <AdminModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        title={`Issue Refund: ${order.orderNumber}`}
        subtitle="Reverse payment transaction and record client cancellation notice."
        maxWidth="md"
      >
        <form onSubmit={handleCommitRefund} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Refund Amount (INR) *
            </label>
            <input
              type="number"
              step="1"
              max={order.totalAmount}
              required
              value={refundAmount}
              onChange={(e) => setRefundAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-sm text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
            />
            <span className="text-[10px] text-[#8E8271] mt-1 block">
              Max reversible: ₹{order.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
              Atelier Refund Reason *
            </label>
            <textarea
              rows={3}
              required
              placeholder="e.g. Patron cancellation prior to distillation maceration completion."
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
            <button
              type="button"
              onClick={() => setIsRefundModalOpen(false)}
              className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-wider font-medium rounded transition-colors"
            >
              Execute Refund
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
