import type { Metadata } from "next";
import { Paytone_One, Outfit } from "next/font/google";
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
  title: "web.seitig",
  description: "Single Next.js 16 app for homepage, lead capture, and CRM.",
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
        {children}
      </body>
    </html>
  );
}
