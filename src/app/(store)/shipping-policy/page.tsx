import React from "react";
import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/policy-layout";
import { POLICIES_DATA } from "@/data/policies";

export const metadata: Metadata = {
  title: "Shipping & Climate Delivery Policy | Fragology Maison",
  description: "Fragology's climate-insulated courier shipping standards and international delivery estimates.",
};

export default function ShippingPolicyPage() {
  return <PolicyLayout policy={POLICIES_DATA.shipping} />;
}
