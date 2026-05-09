import type { Metadata } from "next";
import ImpressumContent from "./ImpressumContent";

export const metadata: Metadata = {
  title: "Impressum | Web.seitig",
  alternates: {
    canonical: "https://webseitig.ch/impressum",
  },
};

export default function ImpressumPage() {
  return <ImpressumContent />;
}