"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Michael K.",
    role: "Elektriker",
    city: "München",
    quote:
      "Ich hab nicht geglaubt, dass das in 7 Tagen klappt. Aber die haben geliefert. Meine Kunden fragen jetzt aktiv nach der Website.",
    image: "/testimonial1.svg",
  },
  {
    name: "Sandra K.",
    role: "Kosmetikstudio",
    city: "Hamburg",
    quote:
      "Endlich eine Website ohne 5.000€ im Voraus. Der monatliche Betrag ist überschaubar — und der Service ist top.",
    image: "/testimonial2.svg",
  },
  {
    name: "Thomas R.",
    role: "Schreinerei",
    city: "Stuttgart",
    quote:
      "Als Handwerker hat man keine Zeit für Technik. Webseitig kümmert sich um alles. Ich ruf an, die machen's.",
    image: "/testimonial3.svg",
  },
];

function TestimonialAvatar({ image, name }: { image: string; name: string }) {
  return (
    <div className="w-12 h-12 overflow-hidden shrink-0">
      <img
        src={image}
        alt={`${name} - Kundenstimme`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#171717] py-10 md:py-18">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-white font-extrabold text-[1.6rem] md:text-[2rem] text-center tracking-wide mb-12"
        >
          Kundenstimmen
        </motion.h2>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: "#1c1c1c", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <TestimonialAvatar image={t.image} name={t.name} />

                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <span className="text-white/30 text-xs">{t.role}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 1.5C3.5 1.5 1.5 3.5 1.5 6C1.5 8.5 3.5 10.5 6 10.5C8.5 10.5 10.5 8.5 10.5 6C10.5 3.5 8.5 1.5 6 1.5Z"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                        fill="none"
                      />
                      <circle cx="6" cy="6" r="1.5" fill="rgba(255,255,255,0.3)" />
                    </svg>
                    <p className="text-white text-xs">{t.city}</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-white text-sm leading-relaxed">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
