"use client";

import Link from "next/link";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#0F0F0F]">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 pt-20">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[#C8F135]/10 border border-[#C8F135]/20">
            <span className="text-[#C8F135] text-sm font-semibold tracking-wide uppercase">404 Fehler</span>
          </div>
          
          <h1 
            className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight" 
            style={{ fontFamily: "var(--font-paytone)" }}
          >
            Seite nicht <span className="text-[#C8F135]">gefunden</span>
          </h1>
          
          <p className="text-white/60 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed font-outfit">
            Hoppla! Es sieht so aus, als ob die von Ihnen gesuchte Seite nicht existiert oder verschoben wurde.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
  href="/"
  className="group flex items-center gap-2 bg-[#C8F135] text-black font-bold px-8 py-4 rounded-full hover:bg-[#d4f050] transition-all duration-300 active:scale-95"
>
  <ArrowLeft
    size={20}
    className="text-black transition-transform group-hover:-translate-x-1"
  />
  <span className="text-black">Zurück zur Startseite</span>
</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
