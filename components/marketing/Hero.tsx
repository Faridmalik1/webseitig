"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useModal } from "../shared/modal-context";

const features = [
  { icon: "/electric_bolt.svg", label: "Website fertig in 7 Tagen — garantiert" },
  { icon: "/credit_card.svg", label: "Keine Vorauszahlung — nur monatlich, kündbar" },
  { icon: "/headphones.svg", label: "Schweizer Team — Ihr persönlicher Ansprechpartner" },
  { icon: "/cloud.svg", label: "Alles inklusive — Hosting, Updates, Support" },
];

export function Hero() {
  const { open } = useModal();

  return (
    <div>
      <section
        id="home"
        className="relative flex flex-col bg-[#0F0F0F] overflow-hidden px-8 md:px-16 xl:max-h-[900px]"
      >
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
        <div className="relative flex items-center max-w-[1568px] mx-auto w-full pt-28 xl:pt-16 pb-8 xl:pb-16">

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center xl:mt-8">

            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <p className="text-[#C8E646] text-[14px] md:text-[16px] mb-4 sm:mb-5 tracking-wide">
                Für Selbstständige und KMU in der Schweiz
              </p>
              <h1 className="text-[28px] sm:text-[32px] lg:text-[52px] leading-[1.05] text-white mb-5 sm:mb-6">
                Jeden Tag ohne Website verlieren Sie Kunden — an die Konkurrenz.
              </h1>
              <p className="text-[#888888] text-[16px] md:text-[20px] leading-relaxed max-w-[600px] mb-7 sm:mb-8">
                Wir bauen Ihre professionelle Website in 7 Tagen. Keine Vorauszahlung. Kein technisches Wissen. Alles inklusive — kündbar nach 12 Monaten.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={open}
                  className="group inline-flex items-center gap-2 whitespace-nowrap bg-[#C8E646] text-[#171717] text-[14px] md:!text-[20px] px-7 py-3 rounded-full hover:bg-[#d4f050] active:scale-95 transition-all duration-200"
                >
                  Jetzt kostenlos anfragen

                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-45"
                  />
                </button>
                <p className="text-[#888888] text-[14px] md:text-[16px]">
                  Über 40 Unternehmen in der Schweiz vertrauen uns — von Zürich bis St. Gallen.
                </p>
              </div>
              <div className="text-[#888888] flex gap-2 mt-6 text-[14px] md:text-[16px]">
                <img
                  src="/star.svg"
                  alt="Stars"
                  className="w-5 h-5 object-contain"
                />
                <p>5.0 Google-Bewertungen</p>
              </div>
            </motion.div>

            {/* Right column — price card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
              className="flex justify-center lg:justify-end mt-16 sm:mt-24 lg:mt-0 xl:mt-12"
            >
              <div className="relative flex items-center justify-center">
                {/* Decorative blob exactly behind the card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[20%] -translate-y-[100%] md:-translate-y-[100%] w-[200px] sm:w-[240px] h-[220px] sm:h-[240px] opacity-40 bg-no-repeat bg-contain z-0"
                  style={{
                    backgroundImage: "url('/HeroBg.svg')",
                    backgroundPosition: "center",
                  }}
                />

                <div
                  className="relative z-10 w-[240px] sm:w-[280px] rounded-2xl px-8 py-4 
  shadow-2xl bg-black/30 backdrop-blur-xl will-change-transform"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    transform: "rotate(-14deg)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 70% 30%, rgba(100,160,30,0.12) 0%, transparent 70%)",

                    }}
                  />
                  <p className="text-[#888888] text-[14px] md:text-[16px] uppercase tracking-widest mb-2">
                    AB NUR
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="font-paytone text-[#C8E646] font-medium text-[28px] sm:text-[32px] lg:text-[60px] leading-none mb-1">
                      CHF
                    </p>
                    <p className="font-paytone text-[#C8E646] font-medium text-[28px] sm:text-[32px] lg:text-[60px] leading-none mb-1">
                      179
                    </p>
                  </div>
                  <p className="text-[#F5F4F0] text-sm mb-4">
                    Monat
                  </p>
                  <p className="text-[#888888] text-xs italic">
                    inkl. Hosting, Updates & Support
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features bar — bottom strip */}
        <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full bg-[#151515] rounded-lg mt-8 lg:mt-0 max-w-[1568px] mx-auto"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 py-8 px-4"
            >
              <img
                src={f.icon}
                alt={f.label}
                className="w-5 h-5 object-contain"
              />
              <p className="text-[#F5F4F0] text-[13px] sm:text-[14px] md:text-[16px] leading-tight max-w-[150px] sm:max-w-[240px] break-words">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
      </section>
      
    </div>
  );
}
