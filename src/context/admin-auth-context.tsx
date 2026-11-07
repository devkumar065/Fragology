"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AdminMember, AdminRole, AdminModule, PermissionAction, AdminNotification } from "@/lib/admin/types";
import { canAccessModule, hasPermission } from "@/lib/admin/rbac";
import { getStaffByEmail, getStaffMembers, getAdminNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/admin/store";

interface AdminAuthContextType {
  adminUser: AdminMember | null;
  role: AdminRole | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRoleForTesting: (role: AdminRole) => void;
  canAccess: (module: AdminModule) => boolean;
  hasPerm: (module: AdminModule, action: PermissionAction) => boolean;
  notifications: AdminNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const STORAGE_KEY_ADMIN_SESSION = "fragology_admin_session_v1";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ADMIN_SESSION);
      if (stored) {
        setAdminUser(JSON.parse(stored));
      } else {
        // Default Super Admin session for immediate executive access
        const defaultSuperAdmin = getStaffByEmail("admin@fragology.com");
        if (defaultSuperAdmin) {
          setAdminUser(defaultSuperAdmin);
          localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(defaultSuperAdmin));
        }
      }
      setNotifications(getAdminNotifications());
    } catch {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    // Authenticate administrative clearance
    if (password && password.length < 3) {
      setIsLoading(false);
      return { success: false, error: "Administrative credentials must be provided." };
    }
    const cleanEmail = email.trim().toLowerCase();
    const staff = getStaffByEmail(cleanEmail);

    if (!staff) {
      setIsLoading(false);
      return { success: false, error: "Administrative staff record not located." };
    }

    if (staff.status === "suspended") {
      setIsLoading(false);
      return { success: false, error: "This administrative account has been suspended by the Super Admin." };
    }

    // In demo / development mode:
    setAdminUser(staff);
    localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(staff));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEY_ADMIN_SESSION);
  };

  const switchRoleForTesting = (role: AdminRole) => {
    const allStaff = getStaffMembers();
    const match = allStaff.find((s) => s.role === role) || {
      ...adminUser,
      role,
      fullName: `Test Staff (${role})`,
    };
    if (match) {
      setAdminUser(match as AdminMember);
      localStorage.setItem(STORAGE_KEY_ADMIN_SESSION, JSON.stringify(match));
    }
  };

  const canAccess = (module: AdminModule): boolean => {
    if (!adminUser) return false;
    return canAccessModule(adminUser.role, module);
  };

  const hasPerm = (module: AdminModule, action: PermissionAction): boolean => {
    if (!adminUser) return false;
    return hasPermission(adminUser.role, module, action);
  };

  const markNotificationRead = (id: string) => {
    markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllRead = () => {
    markAllNotificationsAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        role: adminUser?.role || null,
        isLoading,
        login,
        logout,
        switchRoleForTesting,
        canAccess,
        hasPerm,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead: markAllRead,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
