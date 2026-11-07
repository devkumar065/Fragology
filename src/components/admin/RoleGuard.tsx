"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { useAdminAuth } from "@/context/admin-auth-context";
import { AdminModule, PermissionAction } from "@/lib/admin/types";
import { ROLE_LABELS } from "@/lib/admin/rbac";

export interface RoleGuardProps {
  module: AdminModule;
  action?: PermissionAction;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({
  module,
  action = "view",
  children,
  fallback,
}: RoleGuardProps) {
  const { adminUser, role, canAccess, hasPerm } = useAdminAuth();

  const isAllowed = action === "view" ? canAccess(module) : hasPerm(module, action);

  if (isAllowed) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="p-12 text-center bg-brand-rich border border-border-subtle rounded-xs space-y-4 max-w-xl mx-auto my-12 shadow-2xl">
      <div className="w-14 h-14 mx-auto rounded-full bg-red-950/40 border border-red-500/40 flex items-center justify-center text-red-400">
        <ShieldAlert size={28} />
      </div>
      <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-red-400 block">
        Security Clearance Restricted
      </span>
      <h2 className="font-serif text-2xl font-light text-neutral-ivory">
        Access Denied
      </h2>
      <p className="text-xs text-neutral-muted leading-relaxed font-light">
        Your assigned administrative role (<span className="text-gold-champagne font-mono">{role ? ROLE_LABELS[role] : "Unauthenticated"}</span>) does not possess authority to access or execute actions in the <strong className="text-neutral-ivory uppercase tracking-wider">{module}</strong> operational module.
      </p>
      <div className="pt-2 text-[11px] text-neutral-muted font-mono">
        Staff Member: {adminUser?.email || "Unknown"}
      </div>
    </div>
  );
}
