"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Erstgespräch. Kostenlos, unverbindlich.",
    desc: "Wir lernen Ihr Unternehmen kennen. Kein Fachjargon, kein Verkaufsdruck. Nur ein ehrliches Gespräch über das, was Sie wirklich brauchen.",
  },
  {
    num: "02",
    title: "Fertiger Entwurf in 48 Stunden",
    desc: "Innerhalb von zwei Tagen sehen Sie, wie Ihre Website aussieht. Sie geben Feedback. Wir passen an, bis Sie 100 % zufrieden sind.",
  },
  {
    num: "03",
    title: "Live in 7 Tagen",
    desc: "Nach Ihrer Freigabe gehen wir live. Domain, Hosting, SSL, Texte: alles inklusive. Sie bezahlen erst jetzt.",
  },
  {
    num: "04",
    title: "Wir bleiben bei Ihnen",
    desc: "Updates, Sicherheit, kleine Änderungen: alles im Preis enthalten. Keine Überraschungsrechnungen. Kein Support, der plötzlich extra kostet.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[#151515] py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-[1568px] mx-auto px-6 md:px-8">

        {/* Badge + heading */}
        <div className="text-center mb-14 md:mb-18">
          <p className="text-[#C8F135] text-[16px] sm:text-[18px] 3xl:text-[24px] mb-5 tracking-wide">
            So funktioniert es
          </p>
          <h2 className="text-white text-[28px] sm:text-[32px] lg:text-[52px] leading-tight mb-4">
           Einfacher als Sie denken. Fertig in 7 Tagen.
          </h2>
          <p className="text-white/45 text-[16px] sm:text-[18px] 3xl:text-[24px] leading-relaxed">
           Sie kümmern sich um Ihr Unternehmen. Wir bauen Ihre Website: von A bis Z.
          </p>
        </div>

        {/* Steps row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`px-6 py-2 ${
                i < steps.length - 1
                  ? "border-b lg:border-b-0 lg:border-r border-white/[0.08]"
                  : ""
              }`}
            >
              {/* Line + number */}
              <div className="flex items-end gap-3 mb-5">
                <div className="w-8 h-[2px] mb-2 bg-[#C8F135] rounded-full opacity-40" />
                <span className="text-[#C8F135] text-[16px] sm:text-[20px] lg:text-[28px] font-bold tracking-widest opacity-40">
                  {step.num}
                </span>
              </div>

              <h3 className="text-white text-[18px] sm:text-[20px] 3xl:text-[24px] leading-snug mb-3">
                {step.title}
              </h3>
              <p className="text-[#888888] text-[16px] sm:text-[18px] 3xl:text-[24px] leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
