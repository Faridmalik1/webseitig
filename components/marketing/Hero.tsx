"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useModal } from "../shared/modal-context";

const features = [
  { icon: "/electric_bolt.svg", label: "7 Tage bis zur fertigen Website" },
  { icon: "/credit_card.svg", label: "Keine Vorauszahlung — nur monatlich bezahlen" },
  { icon: "/headphones.svg", label: "Schweizer Team — persönlicher Ansprechpartner" },
  { icon: "/cloud.svg", label: "Alles inklusive — Hosting, Updates, Support" },
];

export function Hero() {
  const { open } = useModal();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-[#171717] overflow-hidden"
    >
      {/* Decorative blob — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 right-16 w-[330px] h-[240px] opacity-40 bg-no-repeat bg-contain"
        style={{
          backgroundImage: "url('/HeroBg.svg')",
        }}
      />
      {/* <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-10 w-[260px] h-[320px] opacity-20"
        style={{
          background: "#4a7a18",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          filter: "blur(30px)",
        }}
      /> */}

      {/* Main hero content */}
      <div className="flex-1 flex items-center max-w-[1200px] mx-auto w-full px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 pb-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <p className="text-[#C8E646] text-sm mb-4 sm:mb-5 tracking-wide">
              Professionelle Websites für Schweizer KMU
            </p>
            <h1 className="text-[2.4rem] sm:text-[2.8rem] md:text-[3.6rem] leading-[1.05] text-white mb-5 sm:mb-6">
              Ihre Website. Fertig. In 7 Tagen.
            </h1>
            <p className="text-white/55 text-base md:text-lg leading-relaxed max-w-[480px] mb-7 sm:mb-8">
              Keine Agentur-Preise. Kein technischer Aufwand. Kein Vorauszahlungsrisiko. Professionelle Website inklusive Hosting, Updates und Support — monatlich kündbar nach 12 Monaten.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={open}
                className="inline-flex items-center gap-2 bg-[#C8E646] text-[#171717] text-[15px] px-7 py-3.5 rounded-full hover:bg-[#d4f050] active:scale-95 transition-all duration-200"
                data-testid="hero-cta"
              >
                Jetzt kostenlos starten
                <ArrowRight size={16} className="text-[#171717]" strokeWidth={2} />
                {/* <span className="text-lg">→</span> */}
              </button>
              <p className="text-white/40 text-sm">
                Bereits über 40 Unternehmen in der Schweiz vertrauen uns
              </p>
            </div>
          </motion.div>

          {/* Right column — price card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="flex justify-center lg:justify-end mt-4 lg:mt-0"
          >
            <div
              className="relative w-[240px] sm:w-[280px] rounded-2xl px-8 py-4 shadow-2xl"
              style={{
                background: "#1e1e1e",
                border: "1px solid rgba(255,255,255,0.07)",
                transform: "rotate(-14deg)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 70% 30%, rgba(100,160,30,0.12) 0%, transparent 70%)",
                }}
              />
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                AB NUR
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-[#C8E646] font-extrabold text-[3rem] leading-none mb-1">
                CHF
              </p>
              <p className="text-[#C8E646] font-extrabold text-[3rem] leading-none mb-1">
                149
              </p>
              </div>
              <p className="text-white/50 text-sm mb-4">
                pro Monat
              </p>
              <p className="text-white/30 text-xs italic">
                inkl. Hosting & Support
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features bar — bottom strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full bg-[#262626] mt-10 sm:mt-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 py-6 px-4"
            >
              <img
                src={f.icon}
                alt={f.label}
                className="w-5 h-5 object-contain"
              />
              <p className="text-white/55 text-base leading-snug max-w-[180px]">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
