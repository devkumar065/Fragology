"use client";

import React from "react";
import Link from "next/link";
import { X, Check, Bell, Package, AlertTriangle, MessageSquare, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/context/admin-auth-context";
import { AdminNotificationType } from "@/lib/admin/types";

export interface AdminNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminNotificationDrawer({ isOpen, onClose }: AdminNotificationDrawerProps) {
  const { notifications, unreadNotificationCount, markNotificationRead, markAllNotificationsRead } = useAdminAuth();

  const getIcon = (type: AdminNotificationType) => {
    switch (type) {
      case "new_order":
        return <Package size={15} className="text-gold-primary" />;
      case "low_stock":
      case "out_of_stock":
        return <AlertTriangle size={15} className="text-amber-400" />;
      case "payment_alert":
      case "refund_request":
        return <CreditCard size={15} className="text-red-400" />;
      case "new_review":
      case "contact_enquiry":
      default:
        return <MessageSquare size={15} className="text-gold-champagne" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-deep/80 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-brand-rich border-l border-border-subtle shadow-2xl flex flex-col h-full text-neutral-ivory"
          >
        {/* Header */}
        <div className="p-6 border-b border-border-subtle flex items-center justify-between bg-brand-deep">
          <div className="flex items-center space-x-3">
            <Bell size={18} className="text-gold-primary" />
            <div>
              <h3 className="font-serif text-lg font-light tracking-wide text-neutral-ivory">
                Operational Alerts
              </h3>
              <span className="text-[10px] text-neutral-muted uppercase tracking-wider">
                {unreadNotificationCount} Unread Notifications
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-muted hover:text-neutral-ivory"
            aria-label="Close notifications"
          >
            <X size={18} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-2.5 bg-brand-espresso border-b border-border-subtle flex justify-between items-center text-xs">
          <span className="text-[11px] text-neutral-muted">Atelier Activity Telemetry</span>
          {unreadNotificationCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] uppercase tracking-wider text-gold-champagne hover:underline flex items-center space-x-1"
            >
              <Check size={12} />
              <span>Mark All Read</span>
            </button>
          )}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border-subtle/50 p-2">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-muted font-light">
              No active administrative notifications.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xs transition-colors flex items-start space-x-3.5 ${
                  notif.isRead ? "bg-transparent opacity-75" : "bg-brand-espresso/60 border border-gold-primary/20"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-brand-deep border border-border-subtle flex items-center justify-center shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-serif text-neutral-ivory font-medium">
                      {notif.title}
                    </h4>
                    <span className="text-[9px] text-neutral-muted font-mono">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-muted font-light mt-1 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <Link
                      href={notif.linkUrl}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        onClose();
                      }}
                      className="text-gold-champagne hover:underline uppercase tracking-wider text-[10px]"
                    >
                      Inspect Record &rarr;
                    </Link>

                    {!notif.isRead && (
                      <button
                        onClick={() => markNotificationRead(notif.id)}
                        className="text-[10px] text-neutral-muted hover:text-neutral-ivory"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
