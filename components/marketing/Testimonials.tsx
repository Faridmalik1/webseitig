"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mirela T.",
    role: "Coiffeursalon",
    city: "Zürich",
    quote:
      "Ich hab 11 Jahre lang nur über Weiterempfehlung gearbeitet. Irgendwann fragt ein neuer Kunde: ‚Haben Sie eine Website?' und ich stehe da. Das war mir peinlich ehrlich gesagt. Seit ich die Seite habe, buchen Leute die ich gar nicht kenne — einfach weil sie mich bei Google gefunden haben.",
    image: "/testimonial1.svg",
  },
  {
    name: "Linh N.",
    role: "Nagelstudio",
    city: "Bern",
    quote:
      "Ich hab Instagram, aber das reicht irgendwann nicht mehr. Kunden wollten Preise sehen, Fotos, wie man bucht. Das musste ich immer einzeln erklären. Jetzt schicke ich einfach den Link. Die Website hat sich im ersten Monat schon bezahlt gemacht.",
    image: "/testimonial2.svg",
  },
  {
    name: "Marco S.",
    role: "Personal Trainer",
    city: "St. Gallen",
    quote:
      "Meine Kunden fragen mich manchmal warum eine Stunde so viel kostet. Wenn ich dann eine saubere Website habe mit meinen Methoden, Referenzen, einem richtigen Foto von mir — dann stellen sie die Frage seltener. Das klingt komisch aber es stimmt. Eine professionelle Website ist auch Preisrechtfertigung.",
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
         Was unsere Kunden sagen — in ihren eigenen Worten.
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
                    <p className="text-white text-sm">{t.name}</p>
                    <span className="text-white/30 text-xs"> — {t.role}</span>
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
