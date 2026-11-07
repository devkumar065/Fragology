"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { DashboardStatCard } from "@/components/admin/DashboardStatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { computeDashboardAnalytics, getAuditLogs } from "@/lib/admin/store";
import { Order } from "@/types/order";

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  // Sample orders pool for real metric calculations
  const demoOrders: Order[] = useMemo(() => {
    return [
      {
        id: "ord-1",
        orderNumber: "FRG-20261107-6007",
        customerEmail: "patron@fragology.com",
        customerName: "Duchess Madeleine",
        status: "confirmed",
        paymentStatus: "paid",
        paymentProvider: "stripe",
        currency: "USD",
        subtotal: 420.0,
        discountAmount: 42.0,
        shippingFee: 0.0,
        taxAmount: 30.24,
        totalAmount: 408.24,
        couponCode: "FRAGOLOGY10",
        shippingAddress: {
          id: "addr-01",
          fullName: "Duchess Madeleine",
          streetAddress1: "1000 5th Avenue",
          city: "New York",
          stateProvince: "NY",
          postalCode: "10028",
          country: "United States",
        },
        items: [
          {
            id: "golden-reverie-100ml",
            productId: "golden-reverie",
            productSlug: "golden-reverie",
            productName: "Golden Reverie",
            variantSize: "100ml",
            volumeDisplay: "100ml Architectural Flacon",
            concentration: "Extrait de Parfum (30%)",
            priceNum: 240,
            priceDisplay: "$240",
            quantity: 1,
          },
          {
            id: "velvet-essence-50ml",
            productId: "velvet-essence",
            productSlug: "velvet-essence",
            productName: "Velvet Essence",
            variantSize: "50ml",
            volumeDisplay: "50ml Presentation Flacon",
            concentration: "Extrait de Parfum (30%)",
            priceNum: 180,
            priceDisplay: "$180",
            quantity: 1,
          },
        ],
        createdAt: "2026-11-07T09:49:00Z",
      },
      {
        id: "ord-demo-01",
        orderNumber: "FRG-20261107-8491",
        customerEmail: "client@fragology.com",
        customerName: "Lord Dev Kumar",
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
          id: "addr-02",
          fullName: "Lord Dev Kumar",
          streetAddress1: "740 Park Avenue",
          city: "New York",
          stateProvince: "NY",
          postalCode: "10021",
          country: "United States",
        },
        items: [
          {
            id: "golden-reverie-100ml",
            productId: "golden-reverie",
            productSlug: "golden-reverie",
            productName: "Golden Reverie",
            variantSize: "100ml",
            volumeDisplay: "100ml Grand Flacon",
            concentration: "Extrait de Parfum (30%)",
            priceNum: 240,
            priceDisplay: "$240",
            quantity: 1,
          },
        ],
        createdAt: "2026-11-05T14:22:00Z",
      },
      {
        id: "ord-3",
        orderNumber: "FRG-20261104-3918",
        customerEmail: "lady.genevieve@vane-estates.com",
        customerName: "Lady Genevieve Vane",
        status: "delivered",
        paymentStatus: "paid",
        paymentProvider: "stripe",
        currency: "USD",
        subtotal: 510.0,
        discountAmount: 102.0,
        shippingFee: 0.0,
        taxAmount: 32.64,
        totalAmount: 440.64,
        couponCode: "MAISON20",
        shippingAddress: {
          id: "addr-03",
          fullName: "Lady Genevieve Vane",
          streetAddress1: "22 Grosvenor Square",
          city: "London",
          stateProvince: "Greater London",
          postalCode: "W1K 6LF",
          country: "United Kingdom",
        },
        items: [
          {
            id: "santale-nocturne-100ml",
            productId: "santale-nocturne",
            productSlug: "santale-nocturne",
            productName: "Santal Nocturne",
            variantSize: "100ml",
            volumeDisplay: "100ml Grand Flacon",
            concentration: "Extrait de Parfum (30%)",
            priceNum: 255,
            priceDisplay: "$255",
            quantity: 2,
          },
        ],
        createdAt: "2026-11-04T10:15:00Z",
      },
    ];
  }, []);

  const analytics = useMemo(() => {
    return computeDashboardAnalytics(demoOrders);
  }, [demoOrders]);

  const auditLogs = useMemo(() => {
    return getAuditLogs(undefined, 5);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border-subtle pb-6 gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-gold-primary block">
            Executive Control Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-ivory tracking-wide mt-1">
            Operations &amp; Analytics
          </h1>
          <p className="text-xs text-neutral-muted font-light mt-1">
            Real-time sales velocity, atelier inventory status, and fulfillment telemetry.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center space-x-1.5 p-1 bg-brand-rich border border-border-subtle rounded-xs text-xs font-mono">
          <Calendar size={13} className="text-gold-primary ml-2 mr-1" />
          <button
            onClick={() => setDateRange("7d")}
            className={`px-2.5 py-1 rounded-xs transition-colors ${
              dateRange === "7d" ? "bg-gold-primary text-brand-deep font-medium" : "text-neutral-muted hover:text-neutral-ivory"
            }`}
          >
            7D
          </button>
          <button
            onClick={() => setDateRange("30d")}
            className={`px-2.5 py-1 rounded-xs transition-colors ${
              dateRange === "30d" ? "bg-gold-primary text-brand-deep font-medium" : "text-neutral-muted hover:text-neutral-ivory"
            }`}
          >
            30D
          </button>
          <button
            onClick={() => setDateRange("90d")}
            className={`px-2.5 py-1 rounded-xs transition-colors ${
              dateRange === "90d" ? "bg-gold-primary text-brand-deep font-medium" : "text-neutral-muted hover:text-neutral-ivory"
            }`}
          >
            90D
          </button>
          <button
            onClick={() => setDateRange("all")}
            className={`px-2.5 py-1 rounded-xs transition-colors ${
              dateRange === "all" ? "bg-gold-primary text-brand-deep font-medium" : "text-neutral-muted hover:text-neutral-ivory"
            }`}
          >
            ALL
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatCard
          label="Total Realized Revenue"
          value={`$${analytics.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          changePct={analytics.revenueChangePct}
          subtext="Captured through Stripe & Razorpay"
          icon={<DollarSign size={16} />}
        />

        <DashboardStatCard
          label="Commissions Received"
          value={analytics.totalOrders}
          changePct={analytics.ordersChangePct}
          subtext={`${analytics.pendingOrdersCount} orders currently in processing`}
          icon={<ShoppingCart size={16} />}
        />

        <DashboardStatCard
          label="Average Commission Value"
          value={`$${analytics.averageOrderValue.toFixed(2)}`}
          changePct={5.4}
          subtext="Reflects high extrait concentration mix"
          icon={<TrendingUp size={16} />}
        />

        <DashboardStatCard
          label="Registered Patrons"
          value={analytics.totalCustomers}
          changePct={12.0}
          subtext="Verified client concierge accounts"
          icon={<Users size={16} />}
        />
      </div>

      {/* Charts & Analytics Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Velocity Chart (Visual bar progression) */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-brand-rich border border-border-subtle rounded-xs space-y-6 shadow-luxury-card">
          <div className="flex justify-between items-center border-b border-border-subtle/50 pb-4">
            <div>
              <h2 className="font-serif text-lg font-light text-neutral-ivory uppercase tracking-wider">
                Daily Revenue Velocity
              </h2>
              <p className="text-[11px] text-neutral-muted font-light mt-0.5">
                Past 7 days realized settlement volume (USD)
              </p>
            </div>
            <span className="font-mono text-xs text-gold-champagne bg-brand-espresso px-2.5 py-1 border border-border-subtle rounded-xs">
              Live Feed
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
            {analytics.revenueTrend.map((day) => {
              const maxRev = 2500;
              const heightPct = Math.max(15, Math.min(100, (day.revenue / maxRev) * 100));
              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="font-mono text-[10px] text-neutral-muted group-hover:text-gold-champagne transition-colors">
                    ${day.revenue}
                  </span>
                  <div className="w-full bg-brand-espresso rounded-xs h-44 flex items-end p-1">
                    <div
                      className="w-full bg-gradient-to-t from-gold-muted via-gold-primary to-gold-champagne rounded-xs group-hover:shadow-gold-subtle transition-all duration-300"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-muted">
                    {day.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fulfillment Distribution */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-brand-rich border border-border-subtle rounded-xs space-y-6 shadow-luxury-card flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-lg font-light text-neutral-ivory uppercase tracking-wider border-b border-border-subtle/50 pb-4">
              Fulfillment Status
            </h2>
            <div className="space-y-4 pt-4 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-muted flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-gold-primary" />
                  <span>Confirmed &amp; Paid</span>
                </span>
                <span className="font-mono text-neutral-ivory">
                  {analytics.orderStatusDistribution.confirmed}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-muted flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Atelier Processing</span>
                </span>
                <span className="font-mono text-neutral-ivory">
                  {analytics.orderStatusDistribution.processing}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-muted flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>In Insured Transit</span>
                </span>
                <span className="font-mono text-neutral-ivory">
                  {analytics.orderStatusDistribution.shipped}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-muted flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Delivered &amp; Signed</span>
                </span>
                <span className="font-mono text-neutral-ivory">
                  {analytics.orderStatusDistribution.delivered}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-brand-espresso border border-border-subtle rounded-xs text-[11px] text-neutral-muted space-y-1">
            <span className="text-gold-champagne font-serif block text-xs">
              100% Chain-of-Custody Verified
            </span>
            <p className="font-light">
              All consignments shipped in temperature-regulated insulated freight with direct signature required.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-brand-rich border border-border-subtle rounded-xs space-y-5 shadow-luxury-card">
          <div className="flex justify-between items-center border-b border-border-subtle/50 pb-3">
            <h2 className="font-serif text-lg font-light text-neutral-ivory uppercase tracking-wider">
              Recent Commissions
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs uppercase tracking-wider text-gold-champagne hover:underline flex items-center space-x-1"
            >
              <span>View All Orders</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-mono uppercase tracking-wider text-neutral-muted border-b border-border-subtle pb-2">
                  <th className="py-2">Order Reference</th>
                  <th className="py-2">Patron</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/30">
                {analytics.recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-brand-espresso/40 transition-colors">
                    <td className="py-3 font-mono text-gold-champagne font-medium">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3">
                      <span className="block font-serif text-neutral-ivory">{ord.customerName}</span>
                      <span className="text-[10px] text-neutral-muted">{ord.customerEmail}</span>
                    </td>
                    <td className="py-3 font-mono text-neutral-ivory">
                      ${ord.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={ord.status} size="sm" />
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/orders/${ord.orderNumber}`}
                        className="text-gold-champagne hover:underline font-mono text-[11px]"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performing Perfumes */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-brand-rich border border-border-subtle rounded-xs space-y-5 shadow-luxury-card">
          <div className="flex justify-between items-center border-b border-border-subtle/50 pb-3">
            <h2 className="font-serif text-lg font-light text-neutral-ivory uppercase tracking-wider">
              Top Perfumes
            </h2>
            <Link
              href="/admin/products"
              className="text-xs uppercase tracking-wider text-gold-champagne hover:underline"
            >
              Catalog
            </Link>
          </div>

          <div className="space-y-4">
            {analytics.topSellingProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-gold-primary text-xs w-4">0{idx + 1}.</span>
                  <div>
                    <span className="font-serif text-neutral-ivory block">{p.name}</span>
                    <span className="text-[10px] text-neutral-muted">{p.volumeSold} Flacons Commissioned</span>
                  </div>
                </div>
                <span className="font-mono text-gold-champagne">
                  ${p.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Low Stock Warning */}
          <div className="pt-4 border-t border-border-subtle/40 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-amber-400">
              <AlertTriangle size={14} />
              <span>1 SKU Low Stock Notice</span>
            </div>
            <Link
              href="/admin/inventory"
              className="text-[11px] uppercase tracking-wider text-gold-champagne hover:underline"
            >
              Audit Inventory
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Audit Trail */}
      <div className="p-6 sm:p-8 bg-brand-rich border border-border-subtle rounded-xs space-y-4 shadow-luxury-card">
        <div className="flex justify-between items-center border-b border-border-subtle/50 pb-3">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-gold-primary" />
            <h2 className="font-serif text-lg font-light text-neutral-ivory uppercase tracking-wider">
              Administrative Audit Log Feed
            </h2>
          </div>
          <Link
            href="/admin/settings"
            className="text-xs uppercase tracking-wider text-gold-champagne hover:underline"
          >
            Full Audit Logs
          </Link>
        </div>

        <div className="divide-y divide-border-subtle/30 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-gold-champagne uppercase text-[10px] bg-brand-espresso px-2 py-0.5 border border-border-subtle rounded-xs">
                    {log.action}
                  </span>
                  <span className="text-neutral-ivory font-serif">{log.changeSummary}</span>
                </div>
                <span className="text-[11px] text-neutral-muted block">
                  Executed by <strong className="text-neutral-soft">{log.adminEmail}</strong> ({log.adminRole})
                </span>
              </div>
              <span className="font-mono text-[10px] text-neutral-muted shrink-0">
                {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
