import type { Metadata } from "next";
import "../index.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "web.seitig — Ihre Website. Fertig. In 7 Tagen.",
  description:
    "Professionelle Websites für Schweizer KMU. Keine Agentur-Preise. Kein technischer Aufwand. Kein Vorauszahlungsrisiko.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
