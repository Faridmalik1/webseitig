import type { Metadata } from "next";
import { Paytone_One, Outfit } from "next/font/google";
import { ModalProvider } from "@/components/shared/modal-context";
import { ContactModal } from "@/components/marketing/ContactModal";
import { ChatWidget } from "@/components/ChatWidget";
import { ConsentManager } from "@/components/ConsentManager";
import "./globals.css";

const paytonOne = Paytone_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-paytone",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

// export const metadata: Metadata = {
//   title: "web.seitig | Ihre Website in 7 Tagen – Ohne Vorauszahlung",
//   description:
//     "Professionelle Websites für Schweizer KMU ab CHF 179/Monat. Kein Risiko, keine Vorauszahlung – nur Ergebnisse. Fertig in 7 Tagen. Jetzt kostenlose Beratung anfragen.",
//   icons: {
//     icon: "/favicon.svg",
//   },
//   alternates: {
//     canonical: "https://webseitig.ch",
//   },
// };

export const metadata: Metadata = {
  title: "web.seitig | Ihre Website in 7 Tagen – Ohne Vorauszahlung",
  description:
    "Professionelle Websites für Schweizer KMU ab CHF 179/Monat. Kein Risiko, keine Vorauszahlung – nur Ergebnisse. Fertig in 7 Tagen. Jetzt kostenlose Beratung anfragen.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://webseitig.ch",
  },
  openGraph: {
    title: "web.seitig | Ihre Website in 7 Tagen – Ohne Vorauszahlung",
    description:
      "Professionelle Websites für Schweizer KMU ab CHF 179/Monat. Kein Risiko, keine Vorauszahlung – nur Ergebnisse. Fertig in 7 Tagen. Jetzt kostenlose Beratung anfragen.",
    url: "https://webseitig.ch",
    siteName: "web.seitig",
    locale: "de",
    type: "website",
    images: [
      {
        url: "https://webseitig.ch/favicon.svg",
        width: 1200,
        height: 630,
        alt: "web.seitig – Ihre Website in 7 Tagen",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${paytonOne.variable} ${outfit.variable}`}
        suppressHydrationWarning
      >
        <ModalProvider>
          {children}
          <ContactModal />
          <ChatWidget />
        </ModalProvider>
        <ConsentManager />
      </body>
    </html>
  );
}
