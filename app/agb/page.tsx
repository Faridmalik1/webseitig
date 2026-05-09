import type { Metadata } from "next";
import AgbContent from "./AgbContent";

export const metadata: Metadata = {
  title: "AGB | Web.seitig",
  alternates: {
    canonical: "https://webseitig.ch/agb",
  },
};

export default function AgbPage() {
  return <AgbContent />;
}