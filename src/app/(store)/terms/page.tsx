import React from "react";
import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/policy-layout";
import { POLICIES_DATA } from "@/data/policies";

export const metadata: Metadata = {
  title: "Terms of Service | Fragology Maison",
  description: "Terms and conditions governing the access and utilization of the Fragology online boutique.",
};

export default function TermsPage() {
  return <PolicyLayout policy={POLICIES_DATA.terms} />;
}
