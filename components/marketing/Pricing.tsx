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
    <section id="pricing" className="bg-[#171717] py-10 md:py-18">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Badge + heading — inside dashed border box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14"
        >
          <div
            className="inline-block w-full max-w-[900px] rounded-2xl px-8 mb-2"
          // style={{
          //   border: "1.5px dashed rgba(255,255,255,0.15)",
          // }}
          >
            <p className="text-[#C8E646] text-base mb-5 tracking-wide">
              Preise
            </p>
            <h2 className="text-white text-[1.6rem] sm:text-[2rem] md:text-[2.8rem] leading-tight break-words mb-2">
              Was eine Agentur CHF 8'000 kostet — bei uns ab CHF 179 / Monat.
            </h2>
            <p className="text-white/45 text-base md:text-lg">
              Transparent. Fair. Ohne Überraschungen.
            </p>
          </div>
        </motion.div>

        {/* Two pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="
  rounded-2xl p-8 flex flex-col
  bg-[#1c1c1c]
  border border-white/[0.07]
  hover:border-[#C8E646]
  hover:shadow-[0_0_0_1px_rgba(200,230,70,0.2),0_10px_30px_rgba(0,0,0,0.4)]
  hover:-translate-y-1
  transition-all duration-300
"
          >
            <h3 className="text-white text-xl mb-4">Starter</h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[#C8F135] text-[2.8rem] leading-none font-extrabold">CHF 179</span>
              <span className="text-white/40 text-sm ms-1">/ Monat</span>
            </div>
            <p className="text-white/35 text-xs mb-8">
              12 Monate · keine Vorauszahlung
            </p>

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8">
              {starterFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-[#C8F135] flex items-center justify-center shrink-0">
                  <Check size={15} className="text-black shrink-0" strokeWidth={2.5} />
                  </span>
                  <span className="text-white/65 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={open}
              className="group w-full py-3.5 rounded-full border border-[#C8F135] text-white text-sm hover:bg-[#C8F135] hover:text-black transition-all duration-200"
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
  rounded-2xl p-8 flex flex-col relative
  bg-[#1c1c1c]
  border border-white/[0.07]
  hover:border-[#C8E646]
  hover:shadow-[0_0_0_1px_rgba(200,230,70,0.25),0_12px_35px_rgba(0,0,0,0.5)]
  hover:-translate-y-1
  transition-all duration-300
"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-[#C8E646] py-2 text-[#171717] text-xs px-5 py-[6px] rounded-bl-[14px] rounded-tr-[14px] shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
                Meistgewählt
              </div>
            </div>

            <h3 className="text-white text-xl mb-4">Business Pro</h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-[#C8E646] text-[2.8rem] leading-none font-extrabold">CHF 249</span>
              <span className="text-white/40 text-sm ms-1">/ Monat</span>
            </div>
            <p className="text-white/35 text-xs mb-8">
              12 Monate · kein Upfront
            </p>

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8">
              {proFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded bg-[#C8F135] flex items-center justify-center shrink-0">
                  <Check size={15} className="text-black shrink-0" strokeWidth={2.5} />
                  </span>
                  <span className="text-white/65 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={open}
              className="w-full py-3.5 rounded-full bg-[#C8E646] text-[#171717] text-sm hover:bg-[#d4f050] active:scale-[0.98] transition-all duration-200"
            >
              Jetzt starten
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
