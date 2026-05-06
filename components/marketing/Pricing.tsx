"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useModal } from "../shared/modal-context";

const starterFeatures = [
  "Bis zu 5 Seiten",
  "Mobile-optimiert",
  "Kontaktformular",
  "SSL + Hosting inklusive",
  "SEO-Grundlagen",
  "Texte inklusive",
  "Lieferung in 7 Tagen",
];

const proFeatures = [
  "Bis zu 10 Seiten",
  "Blog / News-Bereich",
  "Google Maps & Bewertungen",
  "Speed-Optimierung",
  "1 Std. Änderungen pro Monat",
  "Prioritäts-Support 24h",
  "Google Analytics Setup",
  "Mehrsprachige Seite auf Anfrage",
];

export function Pricing() {
  const { open } = useModal();

  return (
    <section id="pricing" className="bg-[#0F0F0F] py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-[1568px] mx-auto px-6 md:px-8">

        {/* Badge + heading — inside dashed border box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14"
        >
          <div
            className="inline-block w-full max-w-[1200px] rounded-3xl px-8 mb-2"
          // style={{
          //   border: "1.5px dashed rgba(255,255,255,0.15)",
          // }}
          >
            <p className="text-[#C8F135] text-[16px] lg:text-[18px] 3xl:text-[24px] mb-5 tracking-wide">
              Preise
            </p>
            <h2 className="text-white text-[28px] sm:text-[32px] lg:text-[52px] leading-tight break-words mb-2">
              Was eine Agentur CHF 8'000 kostet. Bei uns ab CHF 179 / Monat.
            </h2>
            <p className="text-[#888888] text-[18px] sm:text-[20px]">
              Transparent. Fair. Ohne Überraschungen.
            </p>
          </div>
        </motion.div>

        {/* Two pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="
  rounded-[40px] p-8 flex flex-col
  bg-[#151515]
  border border-white/[0.07]
  hover:border-[#C8F135]
  hover:shadow-[0_0_0_1px_rgba(200,230,70,0.2),0_10px_30px_rgba(0,0,0,0.4)]
  hover:-translate-y-1
  transition-all duration-300
"
          >
            <h3 className="text-white mb-4 text-[16px] sm:text-[20px] 3xl:text-[24px]">Starter</h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[#C8F135] font-paytone text-[28px] lg:text-[32px] xl:text-[48px] leading-none">CHF 179</span>
              <span className="text-[#737373] text-[16px] lg:text-[18px] 3xl:text-[24px] ms-1">/ Monat</span>
            </div>
            <p className="text-[#737373] text-[16px] lg:text-[18px] 3xl:text-[24px] mb-8">
              12 Monate · keine Vorauszahlung
            </p>

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8">
              {starterFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-[#C8F135] flex items-center justify-center shrink-0">
                    <Check size={15} className="text-black shrink-0" strokeWidth={2.5} />
                  </span>
                  <span className="text-[#888888] text-[16px] lg:text-[18px] 3xl:text-[24px]">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={open}
              className="w-full py-2 sm:py-3.5 rounded-full bg-[#C8F135] text-[#171717] text-[16px] lg:text-[18px] 3xl:text-[24px] hover:bg-[#d4f050] active:scale-[0.98] transition-all duration-200"
            >
              Jetzt starten
            </button>
          </motion.div>

          {/* Business Pro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="
  rounded-3xl p-8 flex flex-col relative
  bg-[#151515]
  border border-white/[0.07]
  hover:border-[#C8F135]
  hover:shadow-[0_0_0_1px_rgba(200,230,70,0.25),0_12px_35px_rgba(0,0,0,0.5)]
  hover:-translate-y-1
  transition-all duration-300
"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#C8F135] text-[#171717] text-[16px] lg:text-[18px] 3xl:text-[24px] px-5 py-[6px] rounded-bl-[14px] rounded-tr-[14px] shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                Meistgewählt
              </div>
            </div>

            <h3 className="text-white mb-4 text-[16px] sm:text-[20px] 3xl:text-[24px]">Business Pro</h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[#C8F135] font-paytone text-[28px] sm:text-[32px] lg:text-[48px] leading-none">CHF 249</span>
              <span className="text-[#888888] text-[16px] lg:text-[18px] 3xl:text-[24px] ms-1">/ Monat</span>
            </div>
            <p className="text-[#888888] text-[16px] lg:text-[18px] 3xl:text-[24px] mb-8">
              12 Monate · keine Vorauszahlung
            </p>

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8">
              {proFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-[#C8F135] flex items-center justify-center shrink-0">
                    <Check size={15} className="text-black shrink-0" strokeWidth={2.5} />
                  </span>
                  <span className="text-[#888888] text-[16px] lg:text-[18px] 3xl:text-[24px]">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={open}
              className="w-full py-2 sm:py-3.5 rounded-full bg-[#C8F135] text-[#171717] text-[16px] lg:text-[18px] 3xl:text-[24px] hover:bg-[#d4f050] active:scale-[0.98] transition-all duration-200"
            >
              Jetzt starten
            </button>
          </motion.div>

        </div>
        <div className="mt-8">
          <div
            className="
    relative rounded-[40px]
    bg-black/10 backdrop-blur-xl
    border border-[#262626]
    px-6 md:px-10 py-6 md:py-8
    overflow-hidden
  "
          >
            <div className="absolute inset-0 bg-[#272727] opacity-60 pointer-events-none z-0" />

  {/* content layer */}
  <div className="relative z-10">
    {/* <h3 className="text-white text-lg md:text-xl 3xl:text-[28px] text-center mb-3">
      Unter beiden Plans. Risk Reversal Block:
    </h3> */}

    <p className="text-white text-[16px] lg:text-[18px] 3xl:text-[24px] leading-relaxed max-w-[1000px] mx-auto px-6 md:px-8 text-center">
      Nicht zufrieden mit dem Entwurf? Wir überarbeiten, bis Sie es sind. Kein Auftrag, keine Rechnung. Nach 12 Monaten können Sie monatlich kündigen. Ohne Fragen, ohne versteckte Kosten.
    </p>
  </div>
          </div>
        </div>
      </div>
    </section>
  );
}
