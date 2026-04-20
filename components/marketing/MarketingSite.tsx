"use client";

import { About } from "@/components/marketing/About";
import { CTABanner } from "@/components/marketing/CTABanner";
import { ContactModal } from "@/components/marketing/ContactModal";
import { FAQ } from "@/components/marketing/FAQ";
import { Features } from "@/components/marketing/Features";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { Navbar } from "@/components/marketing/Navbar";
import { Portfolio } from "@/components/marketing/Portfolio";
import { Pricing } from "@/components/marketing/Pricing";
import { Services } from "@/components/marketing/Services";
import { Testimonials } from "@/components/marketing/Testimonials";
import { ModalProvider } from "@/components/shared/modal-context";

export function MarketingSite() {
  return (
    <ModalProvider>
      <div className="min-h-[100dvh] flex flex-col bg-[#171717]">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Services />
          <Features />
          <Pricing />
          <Portfolio />
          <Testimonials />
          <FAQ />
          <CTABanner />
        </main>
        <Footer />
        <ContactModal />
      </div>
    </ModalProvider>
  );
}
