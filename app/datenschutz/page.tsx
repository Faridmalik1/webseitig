import type { Metadata } from "next";
import DatenschutzContent from "./DatenschutzContent";

export const metadata: Metadata = {
  title: "Datenschutz | Web.seitig",
  alternates: {
    canonical: "https://webseitig.ch/datenschutz",
  },
};

export default function DatenschutzPage() {
  return <DatenschutzContent />;
}