import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Kurzes Gespräch, 15 Minuten",
    desc: "Wir lernen Ihr Unternehmen kennen. Ohne technischen Fachjargon, ohne Verkaufsdruck.",
  },
  {
    num: "02",
    title: "Wir bauen Ihren ersten Entwurf",
    desc: "Innerhalb von 48 Stunden zeigen wir Ihnen ein fertiges Design. Sie geben Feedback — wir passen an.",
  },
  {
    num: "03",
    title: "Live in 7 Tagen",
    desc: "Nach Ihrer Freigabe gehen wir live. Ihre Domain, Ihr Hosting — alles inklusive. Sie bezahlen erst jetzt.",
  },
  {
    num: "04",
    title: "Wir bleiben dabei",
    desc: "Updates, Sicherheit, kleine Anpassungen — alles inklusive. Keine unerwarteten Rechnungen.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-[#151515] py-4 md:py-10">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Badge + heading */}
        <div className="text-center mb-14 md:mb-18">
          <p className="text-[#C8E646] text-sm font-semibold mb-5 tracking-wide">
            So funktioniert es
          </p>
          <h2 className="text-white font-extrabold text-[2rem] md:text-[2.8rem] leading-tight mb-4">
           Einfacher als Sie denken.
          </h2>
          <p className="text-white/45 text-base md:text-lg">
           Wir bauen, Sie genehmigen — in 7 Tagen sind Sie online.
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

              <h3 className="text-white font-bold text-base leading-snug mb-3">
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
