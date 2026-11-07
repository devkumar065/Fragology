"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Check,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { useAuth } from "@/context/auth-context";
import { Order } from "@/types/order";

export default function MyAccountPage() {
  const {
    user,
    profile,
    addresses,
    isMockSession,
    signOut,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultShippingAddress,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "addresses" | "settings">("overview");

  // Profile Edit State
  const [profileName, setProfileName] = useState(profile?.fullName || "Lord Dev Kumar");
  const [profilePhone, setProfilePhone] = useState(profile?.phone || "+1 (555) 382-9481");
  const [preferredFamily, setPreferredFamily] = useState(profile?.preferredScentFamily || "Oriental");
  const [saveProfileSuccess, setSaveProfileSuccess] = useState(false);

  // Address Modal State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState("Home Residence");
  const [newAddrStreet1, setNewAddrStreet1] = useState("");
  const [newAddrStreet2, setNewAddrStreet2] = useState("");
  const [newAddrCity, setNewAddrCity] = useState("");
  const [newAddrState, setNewAddrState] = useState("");
  const [newAddrPostal, setNewAddrPostal] = useState("");
  const [newAddrCountry, setNewAddrCountry] = useState("United States");
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);

  // Mock Orders History for patron
  const sampleOrders: Order[] = [
    {
      id: "ord-demo-01",
      orderNumber: "FRG-20261107-8491",
      customerEmail: user?.email || "client@fragology.com",
      customerName: profile?.fullName || "Lord Dev Kumar",
      status: "shipped",
      paymentStatus: "paid",
      paymentProvider: "stripe",
      currency: "USD",
      subtotal: 760.0,
      discountAmount: 76.0,
      shippingFee: 0.0,
      taxAmount: 54.72,
      totalAmount: 738.72,
      couponCode: "FRAGOLOGY10",
      shippingAddress: {
        id: "addr-01",
        fullName: profile?.fullName || "Lord Dev Kumar",
        streetAddress1: "740 Park Avenue",
        streetAddress2: "Penthouse Suite 14B",
        city: "New York",
        stateProvince: "NY",
        postalCode: "10021",
        country: "United States",
      },
      items: [
        {
          id: "prod-1-100ml",
          productId: "prod-1",
          productSlug: "nocturne-ambre",
          productName: "Nocturne Ambré",
          variantSize: "100ml",
          volumeDisplay: "100ml Grand Flacon",
          concentration: "Extrait de Parfum (30%)",
          priceNum: 340.0,
          priceDisplay: "$340",
          quantity: 1,
        },
        {
          id: "prod-2-100ml",
          productId: "prod-2",
          productSlug: "oud-imperiale",
          productName: "Oud Impériale",
          variantSize: "100ml",
          volumeDisplay: "100ml Grand Flacon",
          concentration: "Extrait de Parfum (30%)",
          priceNum: 420.0,
          priceDisplay: "$420",
          quantity: 1,
        },
      ],
      shippingCarrier: "DHL Express Luxury Network",
      trackingNumber: "TRK-FRG-98412-US",
      estimatedDelivery: "November 11, 2026",
      createdAt: "2026-11-05T14:22:00Z",
    },
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      fullName: profileName,
      phone: profilePhone,
      preferredScentFamily: preferredFamily,
    });
    setSaveProfileSuccess(true);
    setTimeout(() => setSaveProfileSuccess(false), 3000);
  };

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAddress({
      label: newAddrLabel,
      fullName: profile?.fullName || "Maison Patron",
      phone: profile?.phone || "",
      streetAddress1: newAddrStreet1,
      streetAddress2: newAddrStreet2,
      city: newAddrCity,
      stateProvince: newAddrState,
      postalCode: newAddrPostal,
      country: newAddrCountry,
      isDefaultShipping: newAddrIsDefault,
      isDefaultBilling: false,
    });

    // Reset Form
    setShowAddressModal(false);
    setNewAddrStreet1("");
    setNewAddrStreet2("");
    setNewAddrCity("");
    setNewAddrState("");
    setNewAddrPostal("");
    setNewAddrIsDefault(false);
  };

  // If not authenticated, provide sleek invitation to sign in or use demo concierge
  if (!user && !isMockSession) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-20 bg-radial-dark">
        <Container size="tight" className="text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary">
            <User size={28} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium block">
            Client Authentication
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide">
            Private Client Concierge
          </h1>
          <p className="text-xs sm:text-sm text-neutral-muted max-w-md mx-auto font-light leading-relaxed">
            Please authenticate your credentials to access your commissioned flacon ledger, saved addresses, and private olfactory consultation records.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/login"
              className="px-8 py-3.5 bg-gold-primary text-brand-deep text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
            >
              Sign In to Account
            </Link>
            <Link
              href="/auth/signup"
              className="px-8 py-3.5 bg-brand-espresso border border-border-subtle text-neutral-ivory text-xs uppercase tracking-[0.2em] hover:border-gold-primary transition-colors"
            >
              Request Membership
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 bg-radial-dark min-h-[90vh]">
      <Container size="wide">
        {/* Welcome Header */}
        <div className="mb-10 pb-6 border-b border-border-subtle flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-gold-primary font-medium">
                Maison Privilège
              </span>
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-gold-primary/20 text-gold-champagne border border-gold-primary/40 rounded-xs">
                Haute Circle Patron
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide mt-1">
              {profile?.fullName || "Lord Dev Kumar"}
            </h1>
            <p className="text-xs text-neutral-muted font-mono mt-0.5">
              {user?.email || profile?.email || "client@fragology.com"}
            </p>
          </div>

          <button
            onClick={signOut}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-neutral-muted hover:text-red-400 transition-colors self-start sm:self-auto"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Layout: Left Sidebar Navigation, Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Tabs */}
          <aside className="lg:col-span-3">
            <nav className="bg-brand-rich border border-border-subtle rounded-xs divide-y divide-border-subtle/50 text-xs uppercase tracking-wider font-sans">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full p-4 flex items-center space-x-3 text-left transition-colors ${
                  activeTab === "overview"
                    ? "bg-brand-espresso text-gold-champagne border-l-2 border-gold-primary"
                    : "text-neutral-muted hover:text-neutral-ivory hover:bg-brand-deep"
                }`}
              >
                <User size={16} />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full p-4 flex items-center space-x-3 text-left transition-colors ${
                  activeTab === "orders"
                    ? "bg-brand-espresso text-gold-champagne border-l-2 border-gold-primary"
                    : "text-neutral-muted hover:text-neutral-ivory hover:bg-brand-deep"
                }`}
              >
                <Package size={16} />
                <span>Commissions &amp; Orders ({sampleOrders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full p-4 flex items-center space-x-3 text-left transition-colors ${
                  activeTab === "addresses"
                    ? "bg-brand-espresso text-gold-champagne border-l-2 border-gold-primary"
                    : "text-neutral-muted hover:text-neutral-ivory hover:bg-brand-deep"
                }`}
              >
                <MapPin size={16} />
                <span>Address Book ({addresses.length})</span>
              </button>

              <Link
                href="/wishlist"
                className="w-full p-4 flex items-center space-x-3 text-left text-neutral-muted hover:text-neutral-ivory hover:bg-brand-deep transition-colors"
              >
                <Heart size={16} />
                <span>Saved Fragrances</span>
              </Link>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full p-4 flex items-center space-x-3 text-left transition-colors ${
                  activeTab === "settings"
                    ? "bg-brand-espresso text-gold-champagne border-l-2 border-gold-primary"
                    : "text-neutral-muted hover:text-neutral-ivory hover:bg-brand-deep"
                }`}
              >
                <Settings size={16} />
                <span>Concierge Settings</span>
              </button>
            </nav>
          </aside>

          {/* Main Tab Panels */}
          <main className="lg:col-span-9 space-y-8">
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 bg-brand-rich border border-border-subtle rounded-xs space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-muted block">
                      Active Commissions
                    </span>
                    <span className="font-serif text-3xl text-gold-champagne font-light">
                      {sampleOrders.length}
                    </span>
                    <p className="text-[11px] text-neutral-muted font-light">
                      Latest in transit via DHL Express
                    </p>
                  </div>

                  <div className="p-6 bg-brand-rich border border-border-subtle rounded-xs space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-muted block">
                      Signature Profile
                    </span>
                    <span className="font-serif text-xl text-neutral-ivory font-light block">
                      {profile?.preferredScentFamily || "Oriental & Woody"}
                    </span>
                    <p className="text-[11px] text-gold-muted font-light">
                      High intensity &bull; Night formulation
                    </p>
                  </div>

                  <div className="p-6 bg-brand-rich border border-border-subtle rounded-xs space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-muted block">
                      Maison Privileges
                    </span>
                    <span className="font-serif text-xl text-gold-champagne font-light block">
                      Complimentary White-Glove
                    </span>
                    <p className="text-[11px] text-neutral-muted font-light">
                      Free engraving &amp; test vials included
                    </p>
                  </div>
                </div>

                {/* Recent Order Preview */}
                <div className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-5">
                  <div className="flex justify-between items-center border-b border-border-subtle/50 pb-3">
                    <h2 className="font-serif text-lg font-light text-neutral-ivory uppercase tracking-wider">
                      Latest Atelier Commission
                    </h2>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs uppercase tracking-wider text-gold-champagne hover:underline"
                    >
                      View All Orders
                    </button>
                  </div>

                  {sampleOrders.slice(0, 1).map((ord) => (
                    <div key={ord.id} className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                        <div>
                          <span className="font-serif text-base text-gold-champagne font-medium">
                            {ord.orderNumber}
                          </span>
                          <span className="text-neutral-muted ml-3">
                            Placed on {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-gold-primary/20 text-gold-champagne border border-gold-primary/40 rounded-xs self-start sm:self-auto">
                          In Insured Transit
                        </span>
                      </div>

                      <div className="divide-y divide-border-subtle/30 bg-brand-espresso p-4 rounded-xs">
                        {ord.items.map((i) => (
                          <div key={i.id} className="py-2 flex justify-between text-xs">
                            <span className="text-neutral-ivory font-serif">
                              {i.productName} ({i.variantSize}) x{i.quantity}
                            </span>
                            <span className="text-gold-champagne font-mono">
                              ${((i.unitPrice ?? i.priceNum) * i.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <Link
                          href={`/order-tracking?order=${ord.orderNumber}`}
                          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-gold-champagne hover:underline"
                        >
                          <Truck size={14} />
                          <span>Track Live Consignment</span>
                        </Link>
                        <span className="font-serif text-base text-gold-champagne">
                          Total: ${ord.totalAmount.toFixed(2)} USD
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-6">
                <h2 className="font-serif text-xl font-light text-neutral-ivory uppercase tracking-wider border-b border-border-subtle/50 pb-4">
                  Commission History &amp; Official Receipts
                </h2>

                <div className="space-y-6">
                  {sampleOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-6 bg-brand-espresso border border-border-subtle rounded-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-subtle/40 pb-3 gap-2">
                        <div>
                          <span className="font-serif text-lg text-gold-champagne font-normal">
                            {ord.orderNumber}
                          </span>
                          <span className="text-xs text-neutral-muted ml-3">
                            {new Date(ord.createdAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-gold-primary/10 border border-gold-primary/30 text-gold-champagne rounded-xs self-start sm:self-auto">
                          {ord.status.toUpperCase()} &bull; {ord.paymentStatus.toUpperCase()}
                        </span>
                      </div>

                      <div className="divide-y divide-border-subtle/20">
                        {ord.items.map((item) => (
                          <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                            <div>
                              <p className="font-serif text-neutral-ivory text-sm">{item.productName}</p>
                              <p className="text-[11px] text-neutral-muted">
                                {item.variantSize} &bull; Qty: {item.quantity}
                              </p>
                            </div>
                            <span className="font-serif text-gold-champagne text-sm">
                              ${((item.unitPrice ?? item.priceNum) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-border-subtle/40 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
                        <div className="text-neutral-muted">
                          <span>Delivering to: </span>
                          <span className="text-neutral-ivory">
                            {ord.shippingAddress.city}, {ord.shippingAddress.country}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Link
                            href={`/order-tracking?order=${ord.orderNumber}`}
                            className="inline-flex items-center space-x-1 text-gold-champagne hover:underline"
                          >
                            <Truck size={14} />
                            <span>Track Courier</span>
                          </Link>
                          <span className="font-serif text-base text-gold-champagne">
                            ${ord.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-6">
                <div className="flex justify-between items-center border-b border-border-subtle/50 pb-4">
                  <h2 className="font-serif text-xl font-light text-neutral-ivory uppercase tracking-wider">
                    Client Destination Address Book
                  </h2>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="px-4 py-2 bg-gold-primary text-brand-deep text-xs uppercase tracking-wider font-medium hover:bg-gold-champagne flex items-center space-x-1.5 rounded-xs transition-colors"
                  >
                    <Plus size={14} />
                    <span>Add Destination</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-5 bg-brand-espresso border border-border-subtle rounded-xs space-y-3 relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="font-serif text-base text-neutral-ivory font-normal">
                            {addr.label || "Residence"}
                          </span>
                          {addr.isDefaultShipping && (
                            <span className="px-2 py-0.5 text-[9px] uppercase tracking-wider bg-gold-primary/20 text-gold-champagne border border-gold-primary/40 rounded-xs">
                              Default Shipping
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-neutral-soft font-light mt-2 leading-relaxed">
                          <strong>{addr.fullName}</strong><br />
                          {addr.streetAddress1}<br />
                          {addr.streetAddress2 && <>{addr.streetAddress2}<br /></>}
                          {addr.city}, {addr.stateProvince} {addr.postalCode}<br />
                          {addr.country}
                        </p>

                        {addr.phone && (
                          <p className="text-[11px] text-neutral-muted mt-2 font-mono">
                            {addr.phone}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-border-subtle/40 flex items-center justify-between text-xs">
                        {!addr.isDefaultShipping ? (
                          <button
                            onClick={() => setDefaultShippingAddress(addr.id)}
                            className="text-gold-champagne hover:underline text-[11px] uppercase tracking-wider"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[11px] text-neutral-muted italic">Primary Destination</span>
                        )}

                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-neutral-muted hover:text-red-400 p-1 transition-colors"
                          aria-label="Delete address"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="bg-brand-rich border border-border-subtle p-6 sm:p-8 rounded-xs space-y-6">
                <div className="flex justify-between items-center border-b border-border-subtle/50 pb-4">
                  <h2 className="font-serif text-xl font-light text-neutral-ivory uppercase tracking-wider">
                    Concierge &amp; Olfactory Preferences
                  </h2>
                  {saveProfileSuccess && (
                    <span className="text-xs text-gold-champagne flex items-center space-x-1">
                      <Check size={14} />
                      <span>Preferences Saved</span>
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-5 max-w-lg">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                      Client Full Name &amp; Title
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                      Contact Telephone
                    </label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-sans text-neutral-muted mb-1.5">
                      Preferred Scent Family
                    </label>
                    <select
                      value={preferredFamily}
                      onChange={(e) => setPreferredFamily(e.target.value)}
                      className="w-full bg-brand-espresso border border-border-subtle px-4 py-3 text-xs text-neutral-ivory focus:outline-hidden focus:border-gold-primary transition-colors"
                    >
                      <option value="Oriental">Oriental &bull; Resins, Amber &amp; Vanilla</option>
                      <option value="Woody">Woody &bull; Sandalwood, Cedar &amp; Agarwood</option>
                      <option value="Floral">Floral &bull; Damascena Rose &amp; Iris</option>
                      <option value="Fresh">Fresh &bull; Neroli, Bergamot &amp; Sea Minerals</option>
                      <option value="Unisex">Unisex Bespoke Blend</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gold-primary text-brand-deep font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-gold-champagne transition-colors"
                  >
                    Save Preferences
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>

        {/* Modal: Add Address */}
        {showAddressModal && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-deep/80 backdrop-blur-xs animate-in fade-in duration-200"
          >
            <div className="w-full max-w-lg bg-brand-rich border border-gold-primary/50 p-6 sm:p-8 rounded-xs shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-border-subtle pb-3">
                <h3 className="font-serif text-lg text-neutral-ivory font-light">
                  Add Delivery Address
                </h3>
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="text-neutral-muted hover:text-neutral-ivory text-xs uppercase"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleCreateAddress} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-muted mb-1">
                    Label (e.g. Townhouse, Atelier, Villa)
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrLabel}
                    onChange={(e) => setNewAddrLabel(e.target.value)}
                    className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-muted mb-1">
                    Street Address (Line 1) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrStreet1}
                    onChange={(e) => setNewAddrStreet1(e.target.value)}
                    className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-muted mb-1">
                    Suite, Apartment, Gate Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={newAddrStreet2}
                    onChange={(e) => setNewAddrStreet2(e.target.value)}
                    className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-muted mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddrCity}
                      onChange={(e) => setNewAddrCity(e.target.value)}
                      className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-muted mb-1">
                      State / Prov *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddrState}
                      onChange={(e) => setNewAddrState(e.target.value)}
                      className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-muted mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddrPostal}
                      onChange={(e) => setNewAddrPostal(e.target.value)}
                      className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-neutral-muted mb-1">
                    Country *
                  </label>
                  <select
                    value={newAddrCountry}
                    onChange={(e) => setNewAddrCountry(e.target.value)}
                    className="w-full bg-brand-espresso border border-border-subtle px-3 py-2 text-neutral-ivory"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Germany">Germany</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAddrIsDefault}
                      onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                      className="accent-gold-primary"
                    />
                    <span className="text-[11px] text-neutral-muted">
                      Set as primary default destination
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-4 py-2 border border-border-subtle text-neutral-muted hover:text-neutral-ivory"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gold-primary text-brand-deep uppercase tracking-wider font-medium hover:bg-gold-champagne"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
