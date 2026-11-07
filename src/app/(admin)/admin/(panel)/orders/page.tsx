"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Search,
  Download,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  FileText,
} from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import { getAllOrders, updateOrderStatus } from "@/lib/orders-store";
import { logAdminActivity } from "@/lib/admin/store";
import { Order, OrderStatus } from "@/types/order";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminModal } from "@/components/admin/AdminModal";

export default function OrdersManagementPage() {
  const { adminUser, hasPerm } = useAdminAuth();
  const [orders, setOrders] = useState<Order[]>(getAllOrders());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Quick Status Transition Modal
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [targetStatus, setTargetStatus] = useState<OrderStatus>("processing");
  const [transitionNote, setTransitionNote] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shippingCarrier, setShippingCarrier] = useState("DHL Express Luxury Network");

  // Packing Slip Preview Modal
  const [packingSlipOrder, setPackingSlipOrder] = useState<Order | null>(null);

  // Metrics
  const totalOrdersCount = orders.length;
  const pendingActionCount = orders.filter((o) => o.status === "confirmed" || o.status === "processing").length;
  const inTransitCount = orders.filter((o) => o.status === "shipped" || o.status === "out_for_delivery").length;
  const totalVolume = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (paymentFilter !== "all" && o.paymentStatus !== paymentFilter) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
      );
    });
  }, [orders, statusFilter, paymentFilter, searchQuery]);

  // Open Quick Transition
  const handleOpenStatusModal = (order: Order) => {
    setSelectedOrder(order);
    // Suggest next logical status
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
    setTransitionNote("");
    setTrackingNumber(order.trackingNumber || `TRK-FRG-${Math.floor(10000 + Math.random() * 90000)}-INT`);
    setShippingCarrier(order.shippingCarrier || "DHL Express Luxury Network");
    setStatusModalOpen(true);
  };

  // Commit Status Change
  const handleCommitStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || !selectedOrder) return;

    const note =
      transitionNote.trim() ||
      (targetStatus === "shipped"
        ? `Consignment handed to ${shippingCarrier} (Tracking: ${trackingNumber}).`
        : `Status updated to ${targetStatus} by atelier fulfillment.`);

    const updated = updateOrderStatus(
      selectedOrder.orderNumber,
      targetStatus,
      note,
      targetStatus === "shipped" ? "Charles de Gaulle International Hub" : "Maison Fragology Atelier"
    );

    if (updated) {
      if (targetStatus === "shipped") {
        updated.trackingNumber = trackingNumber;
        updated.shippingCarrier = shippingCarrier;
      }
      setOrders(getAllOrders());

      logAdminActivity({
        adminId: adminUser.id,
        adminEmail: adminUser.email,
        adminRole: adminUser.role,
        action: "order.update_status",
        module: "orders",
        recordReference: selectedOrder.orderNumber,
        changeSummary: `Transitioned order ${selectedOrder.orderNumber} status to ${targetStatus}.`,
      });

      showToast(`Order ${selectedOrder.orderNumber} marked as ${targetStatus.toUpperCase()}.`);
      setStatusModalOpen(false);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = [
      "Order Number",
      "Date",
      "Customer Name",
      "Customer Email",
      "Items Count",
      "Subtotal",
      "Discount",
      "Tax",
      "Total Amount",
      "Payment Status",
      "Payment Provider",
      "Fulfillment Status",
      "Tracking Number",
    ];

    const rows = filteredOrders.map((o) =>
      [
        o.orderNumber,
        `"${o.createdAt}"`,
        `"${o.customerName}"`,
        o.customerEmail,
        o.items.length,
        o.subtotal.toFixed(2),
        o.discountAmount.toFixed(2),
        o.taxAmount.toFixed(2),
        o.totalAmount.toFixed(2),
        o.paymentStatus,
        o.paymentProvider,
        o.status,
        `"${o.trackingNumber || ""}"`,
      ].join(",")
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fragology-orders-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Orders ledger CSV exported.");
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
            <ShoppingBag size={13} />
            <span>Atelier Fulfillment &amp; Consignments</span>
          </div>
          <h1 className="text-2xl font-serif text-[#F5F2EA] font-light tracking-wide">
            Patron Orders &amp; Commissions
          </h1>
          <p className="text-xs text-[#8E8271] mt-1">
            Manage high-touch concierge fulfillment, courier tracking, white-glove transit, and commission invoices.
          </p>
        </div>

        {hasPerm("orders", "export") && (
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center space-x-2 px-3 py-2 border border-[#2A241E] hover:border-[#C8A45D]/50 text-xs text-[#EDE8D0] rounded transition-colors self-start sm:self-auto"
          >
            <Download size={14} className="text-[#C8A45D]" />
            <span>Export Orders CSV</span>
          </button>
        )}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Total Commissions
          </span>
          <span className="text-2xl font-serif text-[#F5F2EA] mt-1 block">
            {totalOrdersCount}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Recorded in store ledger
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Action Required
          </span>
          <span className="text-2xl font-serif text-amber-400 mt-1 block">
            {pendingActionCount}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            Confirmed or in hand-bottling
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            In White-Glove Transit
          </span>
          <span className="text-2xl font-serif text-[#C8A45D] mt-1 block">
            {inTransitCount}
          </span>
          <span className="text-[11px] text-[#8E8271] mt-0.5 block">
            En route with courier liaison
          </span>
        </div>

        <div className="bg-[#14120F] border border-[#2A241E] p-4 rounded">
          <span className="text-[10px] uppercase font-mono text-[#8E8271] tracking-wider block">
            Paid Commission Volume
          </span>
          <span className="text-2xl font-serif text-[#EDE8D0] mt-1 block">
            ${totalVolume.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-emerald-400 mt-0.5 block">
            100% server verified
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-[#14120F] p-4 rounded border border-[#2A241E]">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8271]" />
          <input
            type="text"
            placeholder="Search order #, patron name, or email..."
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
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-[#8E8271] uppercase tracking-wider">Payment:</span>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-1.5 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#14120F] border border-[#2A241E] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2A241E] bg-[#0D0B09]/80 text-[10px] uppercase tracking-wider font-mono text-[#8E8271]">
                <th className="py-3.5 px-4 font-medium">Order Number</th>
                <th className="py-3.5 px-4 font-medium">Patron / Client</th>
                <th className="py-3.5 px-4 font-medium">Flacons Commissioned</th>
                <th className="py-3.5 px-4 font-medium">Payment Settlement</th>
                <th className="py-3.5 px-4 font-medium text-center">Fulfillment Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Investment Total</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A241E]/60 text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#8E8271]">
                    No patron orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#1A1612]/50 transition-colors">
                    {/* Order Number */}
                    <td className="py-4 px-4 font-mono">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-[#C8A45D] hover:underline font-medium block"
                      >
                        {order.orderNumber}
                      </Link>
                      <span className="text-[10px] text-[#665D4F] block mt-0.5">
                        {new Date(order.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>

                    {/* Patron */}
                    <td className="py-4 px-4">
                      <span className="font-serif text-[#F5F2EA] font-medium block">
                        {order.customerName}
                      </span>
                      <span className="text-[11px] text-[#8E8271] block">
                        {order.customerEmail}
                      </span>
                    </td>

                    {/* Flacons */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="text-[#EDE8D0] block">
                          {order.items[0]?.productName} ({order.items[0]?.variantSize})
                        </span>
                        {order.items.length > 1 && (
                          <span className="text-[10px] text-[#C8A45D] font-mono">
                            +{order.items.length - 1} additional fragrance flacons
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Payment */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <StatusBadge
                          status={order.paymentStatus}
                          tone={order.paymentStatus === "paid" ? "success" : "warning"}
                        />
                        <span className="text-[10px] font-mono text-[#8E8271] uppercase">
                          {order.paymentProvider.replace("_", " ")}
                        </span>
                      </div>
                    </td>

                    {/* Fulfillment Status */}
                    <td className="py-4 px-4 text-center">
                      <StatusBadge status={order.status} />
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 text-right font-serif text-[#EDE8D0] text-sm">
                      ${order.totalAmount.toFixed(2)}
                      {order.couponCode && (
                        <span className="block text-[10px] font-mono text-[#C8A45D]">
                          {order.couponCode} applied
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setPackingSlipOrder(order)}
                          title="Print Atelier Slip"
                          className="p-1.5 text-[#8E8271] hover:text-[#C8A45D] rounded transition-colors"
                        >
                          <FileText size={14} />
                        </button>

                        {hasPerm("orders", "edit") && (
                          <button
                            onClick={() => handleOpenStatusModal(order)}
                            title="Update Fulfillment Status"
                            className="p-1.5 text-[#8E8271] hover:text-[#EDE8D0] rounded transition-colors"
                          >
                            <Truck size={14} />
                          </button>
                        )}

                        <Link
                          href={`/admin/orders/${order.id}`}
                          title="View Full Order Details"
                          className="p-1.5 text-[#8E8271] hover:text-[#C8A45D] rounded transition-colors"
                        >
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Status Update Modal */}
      <AdminModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        title={selectedOrder ? `Update Fulfillment: ${selectedOrder.orderNumber}` : "Update Order"}
        subtitle="Advance consignment state, record tracking reference, and notify patron."
        maxWidth="md"
      >
        {selectedOrder && (
          <form onSubmit={handleCommitStatusChange} className="space-y-4">
            <div className="bg-[#0D0B09] p-3 rounded border border-[#2A241E] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#8E8271]">Patron:</span>
                <span className="text-[#EDE8D0] font-serif">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8271]">Current Status:</span>
                <span className="font-mono text-[#C8A45D] capitalize">{selectedOrder.status}</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                New Target Fulfillment State *
              </label>
              <select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value as OrderStatus)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              >
                <option value="confirmed">Confirmed (Atelier Authorization)</option>
                <option value="processing">Processing (Maceration &amp; Bottling)</option>
                <option value="shipped">Shipped (Dispatched to Courier)</option>
                <option value="delivered">Delivered (Handed to Patron)</option>
                <option value="cancelled">Cancelled (Consignment Revoked)</option>
              </select>
            </div>

            {targetStatus === "shipped" && (
              <div className="space-y-3 p-3 bg-[#1A1612] border border-[#2A241E] rounded">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                    Courier Service Network *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingCarrier}
                    onChange={(e) => setShippingCarrier(e.target.value)}
                    className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                    Insured Tracking Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] font-mono focus:outline-hidden focus:border-[#C8A45D]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-mono text-[#8E8271] mb-1">
                Atelier Consignment Note / Milestone History
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Hand-poured flacons sealed with 24k gold leaf monogram and inspected."
                value={transitionNote}
                onChange={(e) => setTransitionNote(e.target.value)}
                className="w-full bg-[#0D0B09] border border-[#2A241E] rounded px-3 py-2 text-xs text-[#F5F2EA] focus:outline-hidden focus:border-[#C8A45D]"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#2A241E] mt-6">
              <button
                type="button"
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-2 border border-[#2A241E] hover:border-[#3D342A] text-xs text-[#B3A898] rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                Commit Status Transition
              </button>
            </div>
          </form>
        )}
      </AdminModal>

      {/* Printable Atelier Packing Slip Modal */}
      <AdminModal
        isOpen={Boolean(packingSlipOrder)}
        onClose={() => setPackingSlipOrder(null)}
        title="Atelier Commission Slip &amp; Certificate"
        subtitle="Official Maison Fragology consignment manifest and certification slip."
        maxWidth="lg"
      >
        {packingSlipOrder && (
          <div className="space-y-6">
            <div className="bg-[#FAF8F5] text-[#080706] p-8 rounded shadow-inner font-serif space-y-6">
              {/* Slip Header */}
              <div className="flex justify-between items-start border-b border-[#2A241E]/20 pb-4">
                <div>
                  <h2 className="text-xl tracking-[0.2em] uppercase font-light">FRAGOLOGY</h2>
                  <p className="text-[10px] uppercase tracking-widest text-stone-600 font-sans mt-0.5">
                    Haute Parfumerie &bull; Paris Atelier
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-stone-600">
                  <p className="font-semibold text-stone-900">{packingSlipOrder.orderNumber}</p>
                  <p>{new Date(packingSlipOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Patron & Destination */}
              <div className="grid grid-cols-2 gap-6 text-xs font-sans text-stone-700">
                <div>
                  <span className="text-[10px] uppercase font-mono text-stone-500 block mb-1">
                    Patron Consignee
                  </span>
                  <p className="font-serif text-sm font-semibold text-stone-900">
                    {packingSlipOrder.customerName}
                  </p>
                  <p>{packingSlipOrder.customerEmail}</p>
                  <p>{packingSlipOrder.customerPhone || "Private Registry"}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-stone-500 block mb-1">
                    Insured Destination
                  </span>
                  <p>{packingSlipOrder.shippingAddress.streetAddress1}</p>
                  {packingSlipOrder.shippingAddress.streetAddress2 && (
                    <p>{packingSlipOrder.shippingAddress.streetAddress2}</p>
                  )}
                  <p>
                    {packingSlipOrder.shippingAddress.city},{" "}
                    {packingSlipOrder.shippingAddress.stateProvince}{" "}
                    {packingSlipOrder.shippingAddress.postalCode}
                  </p>
                  <p>{packingSlipOrder.shippingAddress.country}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-stone-300 text-[10px] uppercase font-mono text-stone-500">
                    <th className="py-2">Flacon Essence</th>
                    <th className="py-2">Format</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {packingSlipOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 font-serif font-medium text-stone-900">
                        {item.productName}
                      </td>
                      <td className="py-2 font-mono text-stone-600">{item.variantSize}</td>
                      <td className="py-2 text-center font-mono">{item.quantity}</td>
                      <td className="py-2 text-right font-serif">
                        ${(item.priceNum * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="pt-3 border-t border-stone-300 flex justify-between items-baseline text-xs font-sans">
                <span className="uppercase tracking-widest text-[10px] text-stone-500 font-mono">
                  Insured Valuation
                </span>
                <span className="font-serif text-base font-bold text-stone-900">
                  ${packingSlipOrder.totalAmount.toFixed(2)} USD
                </span>
              </div>

              {/* Certification stamp */}
              <div className="border border-[#C8A45D]/40 p-3 rounded text-[10px] font-sans text-stone-600 flex items-center justify-between">
                <span>Certified hand-bottled &amp; inspected under polarized light at Maison Grasse Laboratory.</span>
                <span className="font-mono text-[#9C6B30] uppercase tracking-wider font-semibold">
                  Maison Sceau Certifié
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setPackingSlipOrder(null)}
                className="px-4 py-2 border border-[#2A241E] text-xs text-[#B3A898] rounded hover:border-[#3D342A]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#C8A45D] hover:bg-[#D4AF37] text-[#080706] text-xs uppercase tracking-wider font-medium rounded transition-colors"
              >
                Print Manifest
              </button>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
