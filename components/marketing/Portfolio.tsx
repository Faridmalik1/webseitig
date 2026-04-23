"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    num: "01",
    name: "BewegungsHaus Zurich",
    image: "/projects/BewegungsHaus.svg",
    desc: "BewegungsHaus Zürich bietet individuelle Physiotherapie, Massage und Rehabilitation in Winterthur – modern, professionell und von allen Schweizer Krankenkassen anerkannt.",
    stack: ["Next.js", "Node.js", "Sanity CMS"],
    days: "7 Tage",
  },
  {
    num: "02",
    name: "Autoglanz",
    image: "/projects/autoglanz.svg",
    desc: "Autoglanz bietet exklusive Fahrzeugaufbereitung auf höchstem Niveau. Wir bewahren den Wert Ihres Automobils durch professionelle Lackveredelung, Leidenschaft und höchste Präzision.",
    stack: ["React", "GSAP", "Node.js"],
    days: "5 Tage",
  },
  {
    num: "03",
    name: "Alpentreu",
    image: "/projects/alpentreu.svg",
    desc: "AlpenTreu bietet erstklassige Architekturberatung und Planung für Ihr Bauvorhaben. Mit Präzision und Verlässlichkeit begleiten wir Sie von der Vision bis zur Realisierung.",
    stack: ["Angular", "Node.js", "Contentful"],
    days: "9 Tage",
  },
  {
    num: "04",
    name: "Aurelia Beaute",
    image: "/projects/aureliebeaute.svg",
    desc: "Exklusive Pflege und professionelle Behandlungen in entspannter Wohlfühlatmosphäre – entdecken Sie Ihre natürliche Schönheit bei Aurelia Beaute.",
    stack: ["WordPress", "Booksy API", "Elementor"],
    days: "6 Tage",
  },
  {
    num: "05",
    name: "Clean Swiss Pro",
    image: "/projects/Cleanswiss.svg",
    desc: "Clean Swiss Pro bietet erstklassige Reinigungsdienstleistungen für Privat- und Geschäftskunden. Wir garantieren höchste Sauberkeit, Zuverlässigkeit und Professionalität für Ihr Objekt.",
    stack: ["WordPress", "Elementor", "Contact Form 7"],
    days: "4 Tage",
  },
  {
    num: "06",
    name: "MaxPeak",
    image: "/projects/maxpeak.svg",
    desc: "MaxPeak bietet professionelles Personal Training und individuelles Coaching für maximale Erfolge. Erreichen Sie Ihre sportlichen Ziele mit hocheffektiven Trainingsplänen und Expertenwissen.",
    stack: ["React", "Node.js", "Stripe API"],
    days: "8 Tage",
  },
  {
    num: "07",
    name: "Voltarc",
    image: "/projects/voltarc.svg",
    desc: " Professionelle Elektroinstallationen, Photovoltaik und Smart-Home. Höchste Präzision und Sicherheit für Ihre elektrischen Projekte.",
    stack: ["Next.js", "Node.js", "HubSpot CRM"],
    days: "7 Tage",
  },
  {
    num: "08",
    name: "Veloce Vins",
    image: "/projects/velocevins.svg",
    desc: "Veloce Vins bietet eine exquisite Auswahl edler Weine und privaten Sommelier-Service. Entdecken Sie exklusive Raritäten und erstklassige Qualität für Kenner.",
    stack: ["Shopify", "Liquid", "Shopify Apps"],
    days: "6 Tage",
  },
  {
    num: "09",
    name: "HolzForm",
    image: "/projects/manufaktur.svg",
    desc: "HolzForm fertigt exklusive Massivholzmöbel und individuelle Innenausbauten nach Maß. Wir vereinen traditionelles Handwerk mit modernem Design für zeitlose, langlebige Unikate.",
    stack: ["Shopify", "Liquid", "Sanity CMS"],
    days: "9 Tage",
  },
  {
    num: "10",
    name: "WeissWerk",
    image: "/projects/velocevins.svg",
    desc: "WeissWerk bietet erstklassige Malerarbeiten und kreative Farbkonzepte für Ihre Räume. Wir garantieren höchste Qualität, Präzision und langlebige Ergebnisse für Ihr Zuhause.",
    stack: ["WordPress", "Elementor", "Google Maps API"],
    days: "5 Tage",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div
      className="rounded-4xl overflow-hidden flex flex-col"
      style={{ background: "#1c1c1c", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        className="w-full overflow-hidden rounded-3xl border-2 border-[#3F3F3F]"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col">
        <h3 className="text-white text-[1.4rem] font-semibold mb-2">{project.name}</h3>
        <p className="text-white/45 text-sm leading-relaxed mb-5">{project.desc}</p>

        <div className="mb-5">
          <p className="text-white text-sm mb-2 font-medium">Tech-Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tag, i) => (
              <span
                key={i}
                className="text-white/60 text-xs border border-white/15 rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-white text-xl font-medium">Zeitleiste</p>
          <p className="text-[#C8E646] text-xl">{project.days}</p>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMd, setIsMd] = useState(false);
  const [containerHeight, setContainerHeight] = useState(560);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Measure card grid height and update on resize or slide change
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        setContainerHeight(cardRef.current.offsetHeight);
      }
    };

    // Small delay to let the DOM settle after animation starts
    const timeout = setTimeout(measure, 50);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, [current, isMd]);

  const total = projects.length;

  const goTo = useCallback(
    (idx: number) => {
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total]);

  const visibleProjects = isMd
    ? [projects[current], projects[(current + 1) % total]]
    : [projects[current]];

  return (
    <section id="portfolio" className="bg-[#171717] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[#C8E646] text-sm mb-3 tracking-wide">Unsere Arbeit</p>
            <h2 className="text-white text-[2rem] md:text-[2.8rem] leading-tight">
              Ausgewählte Projekte
            </h2>
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="relative mb-6 mt-10"
          style={{ minHeight: containerHeight }}
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={current}
              ref={cardRef}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
              style={{ position: "absolute", width: "100%" }}
            >
              {visibleProjects.map((project) => (
                <ProjectCard key={project.num} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-[#C8E646] flex items-center justify-center hover:bg-[#C8E646]/10 transition-all duration-200"
          >
            <ChevronLeft size={18} className="text-[#C8E646]" />
          </button>

          <div className="flex gap-2 items-center">
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

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-[#C8E646] flex items-center justify-center hover:bg-[#C8E646]/10 transition-all duration-200"
          >
            <ChevronRight size={18} className="text-[#C8E646]" />
          </button>
        </div>

      </div>
    </section>
  );
}