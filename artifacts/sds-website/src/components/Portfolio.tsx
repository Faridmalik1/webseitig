import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    num: "01",
    name: "Elektriker Müller",
    desc: "Lokaler Elektriker-Betrieb aus Zürich. Moderne Website mit Online-Anfrage-Formular, Google Maps-Integration und mobiloptimiertem Design.",
    stack: ["WordPress", "Google Maps", "SEO"],
    days: "6 Tage",
    image: null,
  },
  {
    num: "02",
    name: "Kosmetikstudio Bella",
    desc: "Kosmetikstudio in Basel mit Online-Terminbuchung, Bildergalerie und Preisliste. Inklusive Instagram-Feed-Integration.",
    stack: ["React", "Calendly", "Lightbox"],
    days: "7 Tage",
    image: null,
  },
  {
    num: "03",
    name: "Schreinerei Baumgartner",
    desc: "Traditionsreiche Schreinerei aus Bern. Portfolio-Website mit Projektreferenzen, Kontaktformular und SSL-Zertifikat.",
    stack: ["Next.js", "Framer", "Cloudflare"],
    days: "5 Tage",
    image: null,
  },
];

function ProjectImage({ name }: { name: string }) {
  return (
    <div
      className="w-full h-full min-h-[240px] rounded-xl overflow-hidden relative flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1a2a0d 0%, #0d1a06 60%, #1a1a1a 100%)" }}
    >
      {/* Laptop mockup SVG */}
      <svg viewBox="0 0 320 200" className="w-[80%] opacity-80" fill="none">
        {/* Screen */}
        <rect x="40" y="10" width="240" height="150" rx="8" fill="#222" stroke="#444" strokeWidth="2"/>
        {/* Screen content */}
        <rect x="48" y="18" width="224" height="134" rx="4" fill="#1a1a1a"/>
        {/* Fake website header */}
        <rect x="48" y="18" width="224" height="22" rx="4" fill="#2a2a2a"/>
        <rect x="55" y="24" width="40" height="10" rx="3" fill="#C8E646" opacity="0.7"/>
        <rect x="200" y="24" width="60" height="10" rx="3" fill="#3a3a3a"/>
        {/* Fake hero */}
        <rect x="55" y="50" width="100" height="16" rx="3" fill="#fff" opacity="0.8"/>
        <rect x="55" y="72" width="80" height="10" rx="3" fill="#555"/>
        <rect x="55" y="88" width="50" height="10" rx="3" fill="#555"/>
        <rect x="55" y="108" width="70" height="20" rx="6" fill="#C8E646" opacity="0.8"/>
        {/* Right card */}
        <rect x="180" y="48" width="80" height="92" rx="6" fill="#2a2a2a" stroke="#3a3a3a" strokeWidth="1"/>
        <rect x="188" y="58" width="30" height="8" rx="2" fill="#888" opacity="0.5"/>
        <rect x="188" y="70" width="60" height="22" rx="3" fill="#C8E646" opacity="0.3"/>
        {/* Base */}
        <path d="M20 162 H300 L290 175 H30 Z" fill="#2a2a2a" stroke="#444" strokeWidth="1"/>
        <rect x="130" y="158" width="60" height="4" rx="2" fill="#444"/>
      </svg>
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c]/60 to-transparent pointer-events-none rounded-xl"/>
      <span className="absolute bottom-3 left-4 text-[#C8E646] text-xs font-semibold opacity-60">{name}</span>
    </div>
  );
}

export function Portfolio() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const prev = () => goTo((current - 1 + projects.length) % projects.length);
  const next = () => goTo((current + 1) % projects.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const project = projects[current];

  return (
    <section id="portfolio" className="bg-[#171717] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Header row */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[#C8E646] text-sm font-semibold mb-3 tracking-wide">
              Unsere Arbeit
            </p>
            <h2 className="text-white font-extrabold text-[2rem] md:text-[2.8rem] leading-tight">
              Ausgewählte Projekte
            </h2>
          </div>
          <motion.span
            key={project.num}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#C8E646] font-extrabold text-[3.5rem] md:text-[4.5rem] leading-none opacity-70 select-none"
          >
            {project.num}
          </motion.span>
        </div>

        {/* Carousel card */}
        <div className="relative overflow-hidden rounded-2xl" style={{ minHeight: 280 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#1c1c1c", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

                {/* Left — image */}
                <div className="p-5">
                  <ProjectImage name={project.name} />
                </div>

                {/* Right — details */}
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-white font-extrabold text-[1.6rem] mb-3">
                    {project.name}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  <div className="mb-5">
                    <p className="text-white font-semibold text-sm mb-2">Tech-Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tag) => (
                        <span
                          key={tag}
                          className="text-white/60 text-xs border border-white/15 rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.07]">
                    <p className="text-white font-semibold text-sm">Zeitleiste</p>
                    <p className="text-[#C8E646] font-bold text-sm">{project.days}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation: arrows + dots */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Prev arrow */}
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 active:scale-90"
            style={{ border: "1.5px solid rgba(255,255,255,0.18)" }}
            aria-label="Vorheriges Projekt"
          >
            <ChevronLeft size={16} className="text-white/60" strokeWidth={2} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-[#C8E646] w-5 h-2.5"
                    : "bg-white/25 hover:bg-white/40 w-2.5 h-2.5"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 active:scale-90"
            style={{ border: "1.5px solid rgba(255,255,255,0.18)" }}
            aria-label="Nächstes Projekt"
          >
            <ChevronRight size={16} className="text-white/60" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
