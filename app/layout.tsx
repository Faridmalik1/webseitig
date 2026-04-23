import type { Metadata } from "next";
import Script from "next/script";
import { Paytone_One, Outfit } from "next/font/google";
import { ModalProvider } from "@/components/shared/modal-context";
import { ContactModal } from "@/components/marketing/ContactModal";
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

export const metadata: Metadata = {
  title: "web.seitig | Ihre Website in 7 Tagen – Ohne Vorauszahlung",
  description:
    "Professionelle Websites für Schweizer KMU ab CHF 149/Monat. Kein Risiko, keine Vorauszahlung – nur Ergebnisse. Fertig in 7 Tagen. Jetzt kostenlose Beratung anfragen.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${paytonOne.variable} ${outfit.variable}`}
        suppressHydrationWarning
      >
        <ModalProvider>
          {children}
          <ContactModal />
        </ModalProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2P2YS88WWB"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2P2YS88WWB');`}
        </Script>
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wg5moz76ao");`}
        </Script>
      </body>
    </html>
  );
}
