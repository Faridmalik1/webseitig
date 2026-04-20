"use client";

import { motion } from "framer-motion";

const pains = [
  {
    title: "Zu teuer",
    desc: "Agenturen verlangen CHF 5.000 bis CHF 15.000 im Voraus. Das ist ein grosses Risiko — besonders wenn man noch wächst.",
    highlight: false,
  },
  {
    title: "Zu kompliziert",
    desc: "Baukastensysteme klingen einfach, kosten aber viele Stunden. Und das Ergebnis sieht trotzdem unprofessionell aus.",
    highlight: false,
  },
  {
    title: "Keine Zeit",
    desc: "Sie führen ein Unternehmen. Wer soll sich um Texte, Bilder, Hosting und Technik kümmern?",
    highlight: false,
  },
  {
    title: "Kein Vertrauen",
    desc: "Sie haben bereits schlechte Erfahrungen gemacht. Viel versprochen, wenig geliefert.",
    highlight: true,
  },
];

export function About() {
  return (
    <section id="about" className="bg-[#171717] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#C8E646] text-sm mb-5 tracking-wide">
            Kommt Ihnen das bekannt vor?
          </p>
          <h2 className="text-white text-[2rem] md:text-[2.8rem] leading-tight">
            Warum Sie noch keine Website haben
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`
  rounded-2xl p-7 bg-[#1c1c1c]
  border border-white/[0.07]
  hover:border-[#C8E646]
  transition-all duration-300
`}
            >
              <h3 className="text-white text-[1.1rem] mb-3">{pain.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
