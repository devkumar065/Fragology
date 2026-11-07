"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CustomerProfile, CustomerAddress } from "@/types/customer";
import { createClient } from "@/lib/supabase/client";

interface AuthContextType {
  user: { id: string; email: string } | null;
  profile: CustomerProfile | null;
  addresses: CustomerAddress[];
  isLoading: boolean;
  isMockSession: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<CustomerProfile>) => Promise<{ success: boolean; error?: string }>;
  addAddress: (address: Omit<CustomerAddress, "id">) => Promise<CustomerAddress>;
  updateAddress: (id: string, address: Partial<CustomerAddress>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultShippingAddress: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_PROFILE: CustomerProfile = {
  id: "client-demo-01",
  email: "client@fragology.com",
  fullName: "Lord Dev Kumar",
  phone: "+1 (555) 382-9481",
  preferredScentFamily: "Oriental",
  newsletterOptIn: true,
  createdAt: "2026-01-15T10:00:00Z",
};

const DEMO_ADDRESSES: CustomerAddress[] = [
  {
    id: "addr-01",
    userId: "client-demo-01",
    label: "Private Residence",
    fullName: "Lord Dev Kumar",
    phone: "+1 (555) 382-9481",
    streetAddress1: "740 Park Avenue",
    streetAddress2: "Penthouse Suite 14B",
    city: "New York",
    stateProvince: "NY",
    postalCode: "10021",
    country: "United States",
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: "addr-02",
    userId: "client-demo-01",
    label: "Paris Atelier",
    fullName: "Lord Dev Kumar",
    phone: "+33 1 42 68 55 00",
    streetAddress1: "18 Place Vendôme",
    streetAddress2: "Appartement d'Honneur",
    city: "Paris",
    stateProvince: "Île-de-France",
    postalCode: "75001",
    country: "France",
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

const STORAGE_KEY_AUTH = "fragology_auth_session";
const STORAGE_KEY_ADDR = "fragology_saved_addresses";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockSession, setIsMockSession] = useState(false);

  // Initialize session
  useEffect(() => {
    async function initAuth() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || "" });
          // Fetch real profile from Supabase
          const { data: prof } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (prof) {
            setProfile({
              id: prof.id,
              email: prof.email,
              fullName: prof.full_name,
              phone: prof.phone,
              avatarUrl: prof.avatar_url,
              preferredScentFamily: prof.preferred_scent_family,
              newsletterOptIn: prof.newsletter_opt_in,
              createdAt: prof.created_at,
            });
          } else {
            setProfile({
              id: session.user.id,
              email: session.user.email || "",
              fullName: session.user.user_metadata?.full_name || "Maison Patron",
            });
          }

          // Fetch real addresses
          const { data: addrList } = await supabase
            .from("customer_addresses")
            .select("*")
            .eq("user_id", session.user.id);

          if (addrList && addrList.length > 0) {
            setAddresses(
              addrList.map((a) => ({
                id: a.id,
                userId: a.user_id,
                label: a.label,
                fullName: a.full_name,
                phone: a.phone,
                streetAddress1: a.street_address_1,
                streetAddress2: a.street_address_2,
                city: a.city,
                stateProvince: a.state_province,
                postalCode: a.postal_code,
                country: a.country,
                isDefaultShipping: a.is_default_shipping,
                isDefaultBilling: a.is_default_billing,
              }))
            );
          }
          setIsMockSession(false);
        } else {
          // Check local stored session fallback for demo mode
          const savedMock = localStorage.getItem(STORAGE_KEY_AUTH);
          if (savedMock) {
            const parsed = JSON.parse(savedMock);
            setUser({ id: parsed.id, email: parsed.email });
            setProfile(parsed);
            setIsMockSession(true);

            const savedAddrs = localStorage.getItem(STORAGE_KEY_ADDR);
            if (savedAddrs) {
              setAddresses(JSON.parse(savedAddrs));
            } else {
              setAddresses(DEMO_ADDRESSES);
              localStorage.setItem(STORAGE_KEY_ADDR, JSON.stringify(DEMO_ADDRESSES));
            }
          }
        }
      } catch {
        // Fallback to local session if Supabase is unreachable or unconfigured
        const savedMock = localStorage.getItem(STORAGE_KEY_AUTH);
        if (savedMock) {
          const parsed = JSON.parse(savedMock);
          setUser({ id: parsed.id, email: parsed.email });
          setProfile(parsed);
          setIsMockSession(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();
  }, []);

  const signIn = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const isPlaceholderSupabase =
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

      if (!isPlaceholderSupabase && password) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          setUser({ id: data.user.id, email: data.user.email || email });
          setIsMockSession(false);
        }
      } else {
        // High-end demo concierge session
        const demoUser = {
          ...DEMO_PROFILE,
          email,
          fullName: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        };
        setUser({ id: demoUser.id, email: demoUser.email });
        setProfile(demoUser);
        setAddresses(DEMO_ADDRESSES);
        setIsMockSession(true);
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(demoUser));
        localStorage.setItem(STORAGE_KEY_ADDR, JSON.stringify(DEMO_ADDRESSES));
      }
      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Failed to sign in";
      return { success: false, error: message };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const isPlaceholderSupabase =
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project");

      if (!isPlaceholderSupabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        if (data.user) {
          setUser({ id: data.user.id, email: data.user.email || email });
        }
      } else {
        const newProfile: CustomerProfile = {
          id: `client-${Date.now()}`,
          email,
          fullName,
          createdAt: new Date().toISOString(),
          newsletterOptIn: true,
        };
        setUser({ id: newProfile.id, email });
        setProfile(newProfile);
        setAddresses([]);
        setIsMockSession(true);
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(newProfile));
        localStorage.setItem(STORAGE_KEY_ADDR, JSON.stringify([]));
      }
      setIsLoading(false);
      return { success: true };
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Registration error";
      return { success: false, error: message };
    }
  };

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut().catch(() => {});
    } catch {
      // ignore
    }
    setUser(null);
    setProfile(null);
    setAddresses([]);
    setIsMockSession(false);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  const updateProfile = async (updates: Partial<CustomerProfile>) => {
    if (!profile) return { success: false, error: "Not logged in" };
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(updated));

    if (!isMockSession) {
      try {
        const supabase = createClient();
        await supabase
          .from("profiles")
          .update({
            full_name: updated.fullName,
            phone: updated.phone,
            preferred_scent_family: updated.preferredScentFamily,
            newsletter_opt_in: updated.newsletterOptIn,
          })
          .eq("id", profile.id);
      } catch {
        // ignore
      }
    }
    return { success: true };
  };

  const addAddress = async (newAddr: Omit<CustomerAddress, "id">): Promise<CustomerAddress> => {
    const addressWithId: CustomerAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`,
      userId: user?.id || "guest",
    };

    let updatedList = [...addresses];
    if (newAddr.isDefaultShipping) {
      updatedList = updatedList.map((a) => ({ ...a, isDefaultShipping: false }));
    }
    updatedList.push(addressWithId);

    setAddresses(updatedList);
    localStorage.setItem(STORAGE_KEY_ADDR, JSON.stringify(updatedList));

    if (!isMockSession && user) {
      try {
        const supabase = createClient();
        await supabase.from("customer_addresses").insert({
          user_id: user.id,
          label: newAddr.label,
          full_name: newAddr.fullName,
          phone: newAddr.phone,
          street_address_1: newAddr.streetAddress1,
          street_address_2: newAddr.streetAddress2,
          city: newAddr.city,
          state_province: newAddr.stateProvince,
          postal_code: newAddr.postalCode,
          country: newAddr.country,
          is_default_shipping: !!newAddr.isDefaultShipping,
          is_default_billing: !!newAddr.isDefaultBilling,
        });
      } catch {
        // ignore
      }
    }

    return addressWithId;
  };

  const updateAddress = async (id: string, updates: Partial<CustomerAddress>) => {
    const updatedList = addresses.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAddresses(updatedList);
    localStorage.setItem(STORAGE_KEY_ADDR, JSON.stringify(updatedList));
  };

  const deleteAddress = async (id: string) => {
    const updatedList = addresses.filter((a) => a.id !== id);
    setAddresses(updatedList);
    localStorage.setItem(STORAGE_KEY_ADDR, JSON.stringify(updatedList));
  };

  const setDefaultShippingAddress = async (id: string) => {
    const updatedList = addresses.map((a) => ({
      ...a,
      isDefaultShipping: a.id === id,
    }));
    setAddresses(updatedList);
    localStorage.setItem(STORAGE_KEY_ADDR, JSON.stringify(updatedList));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        addresses,
        isLoading,
        isMockSession,
        signIn,
        signUp,
        signOut,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultShippingAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
