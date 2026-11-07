import React from "react";
import type { Metadata } from "next";
import { PolicyLayout } from "@/components/policies/policy-layout";
import { POLICIES_DATA } from "@/data/policies";

export const metadata: Metadata = {
  title: "Returns & Exchanges | Fragology Maison",
  description: "Fragology's 30-day unopened flacon return process and complimentary exterior skin-test vial guarantee.",
};

export default function ReturnsRefundsPage() {
  return <PolicyLayout policy={POLICIES_DATA.returns} />;
}
