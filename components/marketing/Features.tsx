"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "15-Minuten-Gespräch — kostenlos, unverbindlich",
    desc: "Wir lernen Ihr Unternehmen kennen. Kein Fachjargon, kein Verkaufsdruck. Nur ein ehrliches Gespräch über das, was Sie wirklich brauchen.",
  },
  {
    num: "02",
    title: "Fertiger Entwurf in 48 Stunden",
    desc: "Innerhalb von zwei Tagen sehen Sie, wie Ihre Website aussieht. Sie geben Feedback — wir passen an, bis Sie 100 % zufrieden sind.",
  },
  {
    num: "03",
    title: "Live in 7 Tagen",
    desc: "Nach Ihrer Freigabe gehen wir live. Domain, Hosting, SSL, Texte — alles inklusive. Sie bezahlen erst jetzt.",
  },
  {
    num: "04",
    title: "Wir bleiben bei Ihnen",
    desc: "Updates, Sicherheit, kleine Änderungen — alles im Preis enthalten. Keine Überraschungsrechnungen. Kein versteckter Support.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[#151515] py-4 md:py-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Badge + heading */}
        <div className="text-center mb-14 md:mb-18">
          <p className="text-[#C8E646] text-sm mb-5 tracking-wide">
            So funktioniert es
          </p>
          <h2 className="text-white text-[2rem] md:text-[2.8rem] leading-tight mb-4">
           Einfacher als Sie denken. Fertig in 7 Tagen.
          </h2>
          <p className="text-white/45 text-base md:text-lg">
           Sie kümmern sich um Ihr Unternehmen. Wir bauen Ihre Website — von A bis Z.
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
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-[2px] bg-[#C8F135] rounded-full" />
                <span className="text-[#C8F135] text-lg font-bold tracking-widest">
                  {step.num}
                </span>
              </div>

              <h3 className="text-white text-base leading-snug mb-3">
                {step.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
