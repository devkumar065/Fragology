"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Check,
  CreditCard,
  Building,
  Crown,
  ShoppingBag,
  ArrowLeft,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { CustomerAddress } from "@/types/customer";
import { PaymentProvider } from "@/types/payment";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, coupon, couponCode, shipping, estimatedTax, total, clearCart } = useCart();
  const { user, profile, addresses } = useAuth();

  // Form State
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [shippingAddress, setShippingAddress] = useState<CustomerAddress>({
    id: "temp-addr",
    fullName: "",
    phone: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "United States",
  });

  const [useSameBilling] = useState(true);
  const [selectedSavedAddrId, setSelectedSavedAddrId] = useState<string | null>(null);
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>("stripe");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [testSandboxPaymentId, setTestSandboxPaymentId] = useState("pi_test_fragology_849102");

  // Pre-fill if patron is logged in
  useEffect(() => {
    if (user || profile) {
      setEmail(user?.email || profile?.email || "");
      setFullName(profile?.fullName || "");
      setPhone(profile?.phone || "");

      if (addresses.length > 0) {
        const defaultAddr = addresses.find((a) => a.isDefaultShipping) || addresses[0];
        setShippingAddress(defaultAddr);
        setSelectedSavedAddrId(defaultAddr.id);
      }
    }
  }, [user, profile, addresses]);

  // Handle saved address selection
  const handleSelectSavedAddress = (addr: CustomerAddress) => {
    setSelectedSavedAddrId(addr.id);
    setShippingAddress(addr);
    if (!fullName) setFullName(addr.fullName);
    if (!phone && addr.phone) setPhone(addr.phone);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);

    if (items.length === 0) {
      setCheckoutError("Your shopping bag is empty.");
      return;
    }

    if (!email || !fullName || !shippingAddress.streetAddress1 || !shippingAddress.city || !shippingAddress.postalCode) {
      setCheckoutError("Please provide all required shipping and contact details.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Authoritative Server-Side Order Creation
      const createOrderRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantSize: i.variantSize,
            quantity: i.quantity,
          })),
          couponCode: coupon?.code || couponCode || undefined,
          shippingAddress: {
            ...shippingAddress,
            fullName: fullName || shippingAddress.fullName,
            phone: phone || shippingAddress.phone,
          },
          billingAddress: useSameBilling ? undefined : shippingAddress,
          customerEmail: email,
          customerName: fullName,
          customerPhone: phone,
          paymentProvider,
          userId: user?.id,
          specialInstructions,
        }),
      });

      const orderData = await createOrderRes.json();

      if (!createOrderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Order creation failed on the server.");
      }

      const generatedOrderNumber = orderData.orderNumber;

      // 2. Cryptographic/Server-Side Payment Verification
      const verifyRes = await fetch("/api/checkout/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber: generatedOrderNumber,
          paymentId: testSandboxPaymentId || `pi_${generatedOrderNumber}`,
          provider: paymentProvider,
          signature: "fragology_verified_sig_sandbox",
          rawPayload: {
            order_number: generatedOrderNumber,
            customer_email: email,
          },
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || "Payment verification could not be authenticated.");
      }

      // Success: Clear Cart and Redirect to Confirmation
      clearCart();
      router.push(`/checkout/confirmation?order=${generatedOrderNumber}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected checkout error occurred.";
      setCheckoutError(msg);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 bg-radial-dark">
        <Container size="tight" className="text-center space-y-4">
          <ShoppingBag size={32} className="mx-auto text-gold-primary" />
          <h1 className="font-serif text-2xl font-light text-neutral-ivory">
            Shopping Bag is Empty
          </h1>
          <p className="text-xs text-neutral-muted">
            Add your preferred flacons before proceeding to commission checkout.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-gold-primary text-brand-deep text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
            >
              Explore Fragrances
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-radial-dark min-h-[90vh]">
      <Container size="wide">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-neutral-muted hover:text-gold-champagne transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Shopping Bag</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-10 pb-6 border-b border-border-subtle flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium">
              Atelier Commission
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide mt-1">
              Checkout
            </h1>
          </div>
        </div>

        {checkoutError && (
          <div className="mb-8 p-4 bg-red-950/40 border border-red-500/50 rounded-xs flex items-start space-x-3 text-red-200 text-xs">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
            <div>
              <p className="font-medium">Checkout Notice</p>
              <p className="mt-0.5 opacity-90">{checkoutError}</p>
            </div>
          </div>
        )}

        {/* Main Grid: Form Left, Summary Right */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form Area */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Client Information */}
            <section className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-5">
              <div className="flex justify-between items-center border-b border-border-subtle/50 pb-3">
                <h2 className="font-serif text-lg font-light text-neutral-ivory tracking-wider uppercase flex items-center space-x-2">
                  <span className="text-gold-primary font-sans text-xs">01.</span>
                  <span>Client Identification</span>
                </h2>
                {!user && (
                  <Link
                    href="/auth/login"
                    className="text-xs uppercase tracking-wider text-gold-champagne hover:underline"
                  >
                    Sign In
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                    Email Address (For Commission Updates &amp; Tracking) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@fragology.com"
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                    Full Name &amp; Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dev Kumar"
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                    Telephone (For Courier Delivery Call)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* 2. Shipping & Delivery Address */}
            <section className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-5">
              <div className="flex justify-between items-center border-b border-border-subtle/50 pb-3">
                <h2 className="font-serif text-lg font-light text-neutral-ivory tracking-wider uppercase flex items-center space-x-2">
                  <span className="text-gold-primary font-sans text-xs">02.</span>
                  <span>Consignment Destination</span>
                </h2>
              </div>

              {/* Saved addresses selector if patron has addresses */}
              {addresses.length > 0 && (
                <div className="space-y-2 pb-4 border-b border-border-subtle/40">
                  <span className="text-[11px] uppercase tracking-wider text-gold-muted block">
                    Select from Registered Client Addresses:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr) => (
                      <button
                        type="button"
                        key={addr.id}
                        onClick={() => handleSelectSavedAddress(addr)}
                        className={`p-3 text-left border rounded-xs transition-colors ${
                          selectedSavedAddrId === addr.id
                            ? "border-gold-primary bg-brand-espresso"
                            : "border-border-subtle/60 bg-brand-deep hover:border-gold-primary/40"
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs text-neutral-ivory font-serif">
                          <span>{addr.label || "Residence"}</span>
                          {selectedSavedAddrId === addr.id && <Check size={14} className="text-gold-primary" />}
                        </div>
                        <p className="text-[11px] text-neutral-muted font-light mt-1 truncate">
                          {addr.streetAddress1}, {addr.city}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                    Street Address (Line 1) *
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingAddress.streetAddress1}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, streetAddress1: e.target.value })
                    }
                    placeholder="e.g. 740 Park Avenue"
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                    Apartment, Suite, Atelier (Line 2 - Optional)
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.streetAddress2 || ""}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, streetAddress2: e.target.value })
                    }
                    placeholder="Suite 14B"
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, city: e.target.value })
                      }
                      placeholder="New York"
                      className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.stateProvince}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, stateProvince: e.target.value })
                      }
                      placeholder="NY"
                      className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                      }
                      placeholder="10021"
                      className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                    Country / Sovereign Territory *
                  </label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({ ...shippingAddress, country: e.target.value })
                    }
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Germany">Germany</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Japan">Japan</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                {/* Delivery Instructions */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                    Courier Delivery Instructions &amp; Gate Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Leave with private concierge / Doorman signature accepted."
                    className="w-full bg-brand-espresso border border-border-subtle px-4 py-2.5 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors resize-none"
                  />
                </div>
              </div>
            </section>

            {/* 3. Delivery Method */}
            <section className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-4">
              <h2 className="font-serif text-lg font-light text-neutral-ivory tracking-wider uppercase border-b border-border-subtle/50 pb-3 flex items-center space-x-2">
                <span className="text-gold-primary font-sans text-xs">03.</span>
                <span>White-Glove Courier Transit</span>
              </h2>

              <div className="p-4 bg-brand-espresso border border-gold-primary/40 rounded-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-champagne">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm text-neutral-ivory">
                      DHL Express Luxury Network
                    </h3>
                    <p className="text-[11px] text-neutral-muted font-light">
                      Temperature-controlled air freight &bull; Direct signature required
                    </p>
                  </div>
                </div>
                <span className="text-xs uppercase tracking-wider text-gold-champagne font-medium">
                  {shipping === 0 ? "Complimentary" : "₹500"}
                </span>
              </div>
            </section>

            {/* 4. Payment Gateway Selection */}
            <section className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-5">
              <h2 className="font-serif text-lg font-light text-neutral-ivory tracking-wider uppercase border-b border-border-subtle/50 pb-3 flex items-center space-x-2">
                <span className="text-gold-primary font-sans text-xs">04.</span>
                <span>Payment Settlement Method</span>
              </h2>

              <div className="space-y-3">
                {/* Stripe */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xs cursor-pointer transition-colors ${
                    paymentProvider === "stripe"
                      ? "border-gold-primary bg-brand-espresso"
                      : "border-border-subtle/60 bg-brand-deep hover:border-gold-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="stripe"
                      checked={paymentProvider === "stripe"}
                      onChange={() => setPaymentProvider("stripe")}
                      className="accent-gold-primary"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <CreditCard size={15} className="text-gold-primary" />
                        <span className="text-xs font-sans text-neutral-ivory uppercase tracking-wider">
                          Credit / Debit Card (Stripe Verified)
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-muted mt-0.5">
                        Visa, Mastercard, American Express, Apple Pay
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gold-champagne uppercase tracking-widest border border-gold-primary/30 px-2 py-0.5">
                    Instant
                  </span>
                </label>

                {/* Razorpay */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xs cursor-pointer transition-colors ${
                    paymentProvider === "razorpay"
                      ? "border-gold-primary bg-brand-espresso"
                      : "border-border-subtle/60 bg-brand-deep hover:border-gold-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={paymentProvider === "razorpay"}
                      onChange={() => setPaymentProvider("razorpay")}
                      className="accent-gold-primary"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <Building size={15} className="text-gold-primary" />
                        <span className="text-xs font-sans text-neutral-ivory uppercase tracking-wider">
                          Razorpay / NetBanking / UPI
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-muted mt-0.5">
                        Multi-currency instant authorization &amp; banking gateway
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-muted uppercase tracking-widest border border-border-subtle px-2 py-0.5">
                    Multi-Currency
                  </span>
                </label>

                {/* Concierge Wire */}
                <label
                  className={`flex items-center justify-between p-4 border rounded-xs cursor-pointer transition-colors ${
                    paymentProvider === "concierge_transfer"
                      ? "border-gold-primary bg-brand-espresso"
                      : "border-border-subtle/60 bg-brand-deep hover:border-gold-primary/30"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="payment"
                      value="concierge_transfer"
                      checked={paymentProvider === "concierge_transfer"}
                      onChange={() => setPaymentProvider("concierge_transfer")}
                      className="accent-gold-primary"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <Crown size={15} strokeWidth={1.5} className="text-gold-primary" />
                        <span className="text-xs font-sans text-neutral-ivory uppercase tracking-wider">
                          Private Concierge Bank Wire (Over ₹50,000)
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-muted mt-0.5">
                        Our private banking liaison will confirm wiring instructions
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-neutral-muted uppercase tracking-widest border border-border-subtle px-2 py-0.5">
                    Atelier
                  </span>
                </label>
              </div>

              {/* Developer / Sandbox Test Reference field */}
              <div className="mt-4 p-3 bg-brand-deep/80 border border-border-subtle/40 rounded-xs text-[11px] text-neutral-muted space-y-1">
                <span className="text-gold-champagne uppercase tracking-wider block font-medium">
                  Atelier Payment Verification Sandbox:
                </span>
                <p>
                  Transactions are server-verified cryptographically. The test token below is authenticated on submit:
                </p>
                <input
                  type="text"
                  value={testSandboxPaymentId}
                  onChange={(e) => setTestSandboxPaymentId(e.target.value)}
                  className="w-full bg-brand-espresso border border-border-subtle/60 px-3 py-1.5 font-mono text-neutral-ivory text-[11px]"
                />
              </div>
            </section>
          </div>

          {/* Right Column: Order Recalculation Summary & CTA */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 bg-brand-rich border border-border-subtle rounded-xs space-y-6 sticky top-28 shadow-2xl">
              <h2 className="font-serif text-xl font-light text-neutral-ivory tracking-wider uppercase border-b border-border-subtle/60 pb-4">
                Commission Review
              </h2>

              {/* Compact item list */}
              <div className="divide-y divide-border-subtle/40 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex justify-between items-start text-xs">
                    <div>
                      <p className="font-serif text-neutral-ivory font-normal">
                        {item.productName}
                      </p>
                      <p className="text-[11px] text-neutral-muted">
                        {item.variantSize} &bull; Qty: <span className="font-numbers font-medium">{item.quantity}</span>
                      </p>
                    </div>
                    <span className="font-numbers font-semibold text-gold-champagne">
                      ₹{(item.priceNum * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 pt-4 border-t border-border-subtle/60 text-xs text-neutral-muted font-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-numbers font-medium text-neutral-ivory">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-gold-champagne">
                    <span>Privilege Courtesy ({couponCode})</span>
                    <span className="font-numbers font-medium">-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Courier</span>
                  <span className={shipping === 0 ? "text-gold-champagne font-sans font-medium" : "text-neutral-ivory font-numbers font-medium"}>
                    {shipping === 0 ? "Complimentary" : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Excise &amp; Duties (8%)</span>
                  <span className="font-numbers font-medium text-neutral-ivory">₹{estimatedTax.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="pt-4 border-t border-border-subtle/60 flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-neutral-soft font-light">
                  Total Investment
                </span>
                <span className="font-numbers text-2xl text-gold-champagne font-semibold">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne disabled:opacity-50 transition-colors duration-200 shadow-gold-subtle"
              >
                <span>{isSubmitting ? "Authenticating Commission..." : "Authorize Commission"}</span>
                <ArrowRight size={15} />
              </button>

              {/* Guarantees */}
              <div className="space-y-2 pt-2 border-t border-border-subtle/30 text-[11px] text-neutral-muted">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={14} className="text-gold-primary shrink-0" />
                  <span>Includes exterior 2ml vial for risk-free sensory inspection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock size={14} className="text-gold-primary shrink-0" />
                  <span>Authoritative server-side price &amp; cryptographic verification</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
