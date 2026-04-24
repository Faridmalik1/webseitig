"use client";

import { About } from "@/components/marketing/About";
import { CTABanner } from "@/components/marketing/CTABanner";
import { ChatWidget } from "@/components/ChatWidget";
import { FAQ } from "@/components/marketing/FAQ";
import { Features } from "@/components/marketing/Features";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { Navbar } from "@/components/marketing/Navbar";
import { Portfolio } from "@/components/marketing/Portfolio";
import { Pricing } from "@/components/marketing/Pricing";
import { Services } from "@/components/marketing/Services";
import { Testimonials } from "@/components/marketing/Testimonials";

export function MarketingSite() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F0F0F]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
