import type { Metadata } from "next";
import { school } from "@/lib/school";
import ApplyContent from "@/components/apply/ApplyContent";

export const metadata: Metadata = {
  title: "Apply",
  description: `Apply to the ${school.program.name} programme at ${school.name} — download the official application form, or apply online and it goes straight to admissions.`,
};

export default function ApplyPage() {
  return <ApplyContent />;
}
