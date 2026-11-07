"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Order } from "@/types/order";

export default function CheckoutConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "FRG-20261107-8491";

  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch("/api/orders/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderNumber,
            // When arriving directly from checkout, the server-side store will allow viewing
            email: "client@fragology.com",
          }),
        });
        const data = await res.json();
        if (data.success && data.order) {
          setOrder(data.order);
        }
      } catch {
        // Ignore
      }
    }

    loadOrder();
  }, [orderNumber]);

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-16 sm:py-20 bg-radial-dark min-h-[85vh]">
      <Container size="tight">
        <div className="bg-brand-rich border border-border-subtle p-8 sm:p-12 rounded-xs shadow-2xl relative text-center space-y-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent" />

          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-champagne">
            <CheckCircle2 size={32} />
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium block">
              Atelier Commission Authenticated
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide">
              Thank You for Your Patronage
            </h1>
            <p className="text-xs sm:text-sm text-neutral-muted max-w-md mx-auto font-light leading-relaxed">
              Your flacon commission has been recorded and authorized. A formal receipt and packaging manifesto have been transmitted to your email.
            </p>
          </div>

          {/* Reference Badge */}
          <div className="bg-brand-espresso border border-gold-primary/30 p-5 rounded-xs inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mx-auto">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-muted block">
                Commission Reference
              </span>
              <span className="font-serif text-xl sm:text-2xl text-gold-champagne tracking-wider font-medium">
                {orderNumber}
              </span>
            </div>
            <button
              onClick={copyOrderNumber}
              className="px-3 py-1.5 bg-brand-deep border border-border-subtle hover:border-gold-primary text-neutral-ivory text-xs flex items-center space-x-1.5 rounded-xs transition-colors"
              aria-label="Copy order reference"
            >
              {copied ? <Check size={13} className="text-gold-primary" /> : <Copy size={13} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Milestone Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left border-y border-border-subtle/50 py-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-gold-muted font-sans flex items-center space-x-1.5">
                <ShieldCheck size={13} />
                <span>Status</span>
              </span>
              <p className="text-xs text-neutral-ivory font-serif">
                {order?.paymentStatus === "paid" ? "Payment Authenticated" : "Processing Settlement"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-gold-muted font-sans flex items-center space-x-1.5">
                <Truck size={13} />
                <span>Courier Service</span>
              </span>
              <p className="text-xs text-neutral-ivory font-serif">
                {order?.shippingCarrier || "DHL Express White-Glove"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-gold-muted font-sans flex items-center space-x-1.5">
                <Package size={13} />
                <span>Estimated Arrival</span>
              </span>
              <p className="text-xs text-neutral-ivory font-serif">
                {order?.estimatedDelivery || "3 – 5 Business Days"}
              </p>
            </div>
          </div>

          {/* Exterior Vial Testing Assurance */}
          <div className="bg-brand-espresso/60 border border-border-subtle/40 p-4 rounded-xs text-xs text-neutral-muted leading-relaxed font-light text-left">
            <p className="font-serif text-neutral-ivory mb-1">
              Maison Risk-Free Olfactory Guarantee:
            </p>
            Each architectural flacon is delivered in a sealed presentation box accompanied by a complimentary 2ml exterior discovery vial. Please sample the 2ml vial prior to unsealing the master flacon. If you are not captivated, return the unopened flacon within 14 days for a full refund.
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/order-tracking?order=${orderNumber}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-gold-primary text-brand-deep text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors flex items-center justify-center space-x-2"
            >
              <span>Track Consignment</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/my-account"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-espresso border border-border-subtle text-neutral-ivory text-xs uppercase tracking-[0.2em] hover:border-gold-primary transition-colors flex items-center justify-center space-x-2"
            >
              <span>View Account Portal</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
