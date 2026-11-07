import React from "react";
import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/policy-layout";
import { POLICIES_DATA } from "@/data/policies";

export const metadata: Metadata = {
  title: "Privacy Policy | Fragology Maison",
  description: "Fragology's standards governing data protection, personal privacy, and client account security.",
};

export default function PrivacyPolicyPage() {
  return <PolicyLayout policy={POLICIES_DATA.privacy} />;
}
