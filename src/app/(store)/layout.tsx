import React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StoreProviders } from "@/components/providers/store-providers";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProviders>
      <div className="min-h-screen flex flex-col bg-brand-deep text-neutral-ivory">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </StoreProviders>
  );
}
