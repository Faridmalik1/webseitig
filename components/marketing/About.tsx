"use client";

import { motion } from "framer-motion";

const pains = [
  {
    title: "Zu teuer",
    desc: "CHF 5'000 bis CHF 15'000 im Voraus — nur für den Anfang. Traditionelle Agenturen verlangen hohe Anzahlungen, bevor auch nur eine Zeile Code existiert. Für ein wachsendes Unternehmen — oder jemanden, der gerade erst in der Schweiz durchstartet — ist das schlicht unzumutbar.",
    highlight: false,
  },
  {
    title: "Zu kompliziert",
    desc: "Stundenlang gebastelt. Trotzdem unprofessionell. Wix, Squarespace und Co. klingen einfach. In der Praxis kostet es Tage — und sieht am Ende trotzdem nicht aus wie eine echte Businesswebsite. Potenzielle Kunden merken das sofort.",
    highlight: false,
  },
  {
    title: "Keine Zeit",
    desc: "Sie führen ein Unternehmen. Wer baut da nebenbei eine Website? Texte schreiben, Bilder suchen, Technik einrichten, Hosting konfigurieren — das ist ein eigener Fulltime-Job. Kein Unternehmer sollte das selbst machen müssen.",
    highlight: false,
  },
  {
    title: "Kein Vertrauen",
    desc: "Schon schlechte Erfahrungen gemacht? Sie sind nicht allein. Viel versprochen, lang gewartet, wenig geliefert. Und am Ende eine Rechnung mit Posten, die niemand so besprochen hatte. Das muss nicht Ihre Realität sein. ",
    highlight: true,
  },
];

export function About() {
  return (
    <section id="about" className="bg-[#0F0F0F] py-10 px-4 md:px-8 md:py-16">
      <div className="max-w-[1568px] mx-auto px-6 md:px-8">

        <div className="text-center mb-12 md:mb-16">
          <p className="text-[#C8E646] text-[16px] mb-5 tracking-wide">
            Kommt Ihnen das bekannt vor?
          </p>
          <h2 className="text-white text-[28px] sm:text-[32px] lg:text-[52px] leading-tight">
            Warum Sie — und so viele andere — immer noch ohne Website arbeiten.
Und was das jeden Monat wirklich kostet.
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
              <h3 className="text-white text-[16px] sm:text-[20px] mb-3">{pain.title}</h3>
              <p className="text-[#888888] text-[14px] sm:text-[16px] leading-relaxed">{pain.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
