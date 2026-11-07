"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Order, OrderStatus } from "@/types/order";

export default function OrderTrackingPage() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get("order") || "";

  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [email, setEmail] = useState("client@fragology.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  // Auto-search if query param present
  useEffect(() => {
    if (initialOrder) {
      handleTrackOrder(initialOrder, "client@fragology.com");
    }
  }, [initialOrder]);

  const handleTrackOrder = async (orderRef: string, billingEmail: string) => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: orderRef.trim(),
          email: billingEmail.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Consignment not found matching details.");
      }

      setOrder(data.order);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to locate consignment.";
      setError(msg);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) {
      setError("Please provide both order reference code and billing email.");
      return;
    }
    handleTrackOrder(orderNumber, email);
  };

  const steps: Array<{ status: OrderStatus; label: string; description: string }> = [
    {
      status: "confirmed",
      label: "Order Authenticated",
      description: "Payment captured & commission registered at Paris atelier",
    },
    {
      status: "processing",
      label: "Atelier Hand-Pouring",
      description: "Sealed in presentation box with exterior test vial",
    },
    {
      status: "shipped",
      label: "In Insured Transit",
      description: "Temperature-controlled air cargo with DHL Luxury Network",
    },
    {
      status: "out_for_delivery",
      label: "Out for Courier Delivery",
      description: "White-glove courier dispatch to destination address",
    },
    {
      status: "delivered",
      label: "Delivered & Signed",
      description: "Signed confirmation received by client concierge",
    },
  ];

  const getStepState = (stepIndex: number, currentStatus?: OrderStatus) => {
    const statusMap: Record<OrderStatus, number> = {
      pending: 0,
      confirmed: 1,
      processing: 2,
      shipped: 3,
      out_for_delivery: 4,
      delivered: 5,
      cancelled: -1,
    };

    const currentOrderLevel = currentStatus ? statusMap[currentStatus] || 1 : 1;
    const thisStepLevel = stepIndex + 1;

    if (currentOrderLevel > thisStepLevel) return "completed";
    if (currentOrderLevel === thisStepLevel) return "active";
    return "upcoming";
  };

  return (
    <div className="py-14 sm:py-18 bg-radial-dark min-h-[90vh]">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium block">
            Maison Logistics &bull; Atelier Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide">
            Track Your Consignment
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted font-light leading-relaxed">
            Enter your commission reference code and billing email to inspect live courier telemetry, transit milestones, and chain-of-custody signatures.
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-xl mx-auto bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs shadow-2xl mb-12">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                Commission Order Reference *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. FRG-20261107-8491"
                className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory font-mono uppercase focus:outline-hidden focus:border-gold-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                Billing / Client Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@fragology.com"
                className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne disabled:opacity-50 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Search size={15} />
              <span>{loading ? "Querying Atelier Telemetry..." : "Locate Consignment"}</span>
            </button>
          </form>

          {/* Quick Demo Pre-fill */}
          <div className="mt-4 pt-4 border-t border-border-subtle/40 flex items-center justify-between text-[11px] text-neutral-muted">
            <span>Demo Consignment:</span>
            <button
              type="button"
              onClick={() => {
                setOrderNumber("FRG-20261107-8491");
                setEmail("client@fragology.com");
                handleTrackOrder("FRG-20261107-8491", "client@fragology.com");
              }}
              className="text-gold-champagne hover:underline font-mono"
            >
              Load FRG-20261107-8491
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-950/40 border border-red-500/40 rounded-xs flex items-center space-x-2 text-red-200 text-xs">
              <AlertCircle size={14} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Tracking Results */}
        {order && (
          <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-300">
            {/* Top Overview Strip */}
            <div className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs grid grid-cols-1 sm:grid-cols-4 gap-6 text-xs">
              <div>
                <span className="text-neutral-muted uppercase tracking-wider block text-[10px]">
                  Consignment Ref
                </span>
                <span className="font-serif text-base text-gold-champagne font-medium mt-0.5 block">
                  {order.orderNumber}
                </span>
              </div>

              <div>
                <span className="text-neutral-muted uppercase tracking-wider block text-[10px]">
                  Carrier &amp; Airway Bill
                </span>
                <span className="font-mono text-neutral-ivory mt-0.5 block">
                  {order.trackingNumber || "TRK-98412-US"}
                </span>
                <span className="text-[10px] text-gold-muted">{order.shippingCarrier}</span>
              </div>

              <div>
                <span className="text-neutral-muted uppercase tracking-wider block text-[10px]">
                  Estimated Delivery
                </span>
                <span className="text-neutral-ivory font-serif text-base mt-0.5 block">
                  {order.estimatedDelivery || "In Transit"}
                </span>
              </div>

              <div>
                <span className="text-neutral-muted uppercase tracking-wider block text-[10px]">
                  Consignee Destination
                </span>
                <span className="text-neutral-ivory truncate mt-0.5 block">
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="bg-brand-rich border border-border-subtle p-6 sm:p-10 rounded-xs space-y-8">
              <h2 className="font-serif text-xl font-light text-neutral-ivory tracking-wide uppercase border-b border-border-subtle/50 pb-4">
                Chain of Custody Milestones
              </h2>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-5 before:w-0.5 before:bg-border-subtle">
                {steps.map((step, idx) => {
                  const state = getStepState(idx, order.status);
                  return (
                    <div key={step.status} className="relative flex items-start space-x-6 sm:space-x-8 pl-1">
                      {/* Circle Icon */}
                      <div
                        className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full shrink-0 flex items-center justify-center border z-10 transition-colors ${
                          state === "completed"
                            ? "bg-gold-primary border-gold-primary text-brand-deep"
                            : state === "active"
                            ? "bg-brand-espresso border-gold-primary text-gold-champagne ring-4 ring-gold-primary/20"
                            : "bg-brand-deep border-border-subtle text-neutral-muted"
                        }`}
                      >
                        {state === "completed" ? (
                          <CheckCircle2 size={16} />
                        ) : state === "active" ? (
                          <Clock size={16} className="animate-spin text-gold-primary" />
                        ) : (
                          <span className="text-[10px] font-mono">{idx + 1}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <h3
                            className={`font-serif text-base font-light tracking-wide ${
                              state === "upcoming" ? "text-neutral-muted" : "text-neutral-ivory"
                            }`}
                          >
                            {step.label}
                          </h3>
                          {state === "active" && (
                            <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-gold-primary/20 text-gold-champagne border border-gold-primary/40 rounded-xs">
                              Current Milestone
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-muted font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Consignment Items */}
            <div className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-4">
              <h2 className="font-serif text-lg font-light text-neutral-ivory tracking-wide uppercase border-b border-border-subtle/50 pb-3">
                Consignment Contents ({order.items.length} Flacons)
              </h2>

              <div className="divide-y divide-border-subtle/40">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3.5 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-serif text-neutral-ivory text-sm">{item.productName}</p>
                      <p className="text-neutral-muted text-[11px]">
                        {item.variantSize} &bull; {item.volumeDisplay} &bull; Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-serif text-gold-champagne text-sm">
                      ${((item.unitPrice ?? item.priceNum) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
