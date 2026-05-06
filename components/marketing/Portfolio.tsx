"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
    desc: "Professionelle Elektroinstallationen, Photovoltaik und Smart-Home. Höchste Präzision und Sicherheit für Ihre elektrischen Projekte.",
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
    desc: "HolzForm fertigt exklusive Massivholzmöbel und individuelle Innenausbauten nach Mass. Wir vereinen traditionelles Handwerk mit modernem Design für zeitlose, langlebige Unikate.",
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

// ─── Infinite-loop strategy ────────────────────────────────────────────────
// We clone 2 cards at the start and 2 at the end of the list so that both
// desktop (shows 2 cards) and mobile (shows 1 card) always have a filled
// viewport when wrapping around. After the CSS transition ends we silently
// teleport back to the real position (no animation → user never sees the jump).
//
// Extended layout:
//   [ last-1 | last | proj0 | proj1 | … | proj9 | proj0 | proj1 ]
//              ^clone-head              clone-tail^
//
// OFFSET = 2  → real project[0] lives at extIndex 2
const CLONES = 2;
const extendedProjects = [
  { ...projects[projects.length - 2], num: "clone-head-0" },
  { ...projects[projects.length - 1], num: "clone-head-1" },
  ...projects,
  { ...projects[0], num: "clone-tail-0" },
  { ...projects[1], num: "clone-tail-1" },
];
const OFFSET = CLONES; // index of real project[0] inside extendedProjects

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div
      className="rounded-4xl overflow-hidden flex flex-col h-full rounded-tl-[15px] rounded-tr-[15px] sm:rounded-tl-[42px] sm:rounded-tr-[42px]"
      style={{ background: "#1c1c1c", border: "1px solid #444444" }}
    >
      <div
        className="w-full overflow-hidden rounded-tl-[15px] rounded-tr-[15px] sm:rounded-tl-[40px] sm:rounded-tr-[40px] rounded-bl-[15px] rounded-br-[15px] sm:rounded-bl-[40px] sm:rounded-br-[40px] border-3 md:border-4 border-[#3F3F3F]"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover object-top block"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white text-[18px] sm:text-[20px] lg:text-[28px] font-semibold mb-2">
          {project.name}
        </h3>
        <p className="text-[#888888] sm:text-[16px] md:text-[18px] 3xl:text-[24px] leading-relaxed mb-5 min-h-[78px]">
          {project.desc}
        </p>

        <div className="mt-auto">
          {/* Tech Stack */}
          <div className="mb-5">
            <p className="text-white sm:text-[16px] md:text-[20px] 3xl:text-[24px] mb-2 font-paytone">
              Tech-Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tag, i) => (
                <span
                  key={i}
                  className="text-[#F5F4F0] sm:text-[16px] md:text-[18px] 3xl:text-[24px] bg-[#FFFFFF1A] rounded-full px-3.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-white text-[16px] font-paytone sm:text-[18px] md:text-[20px] 3xl:text-[24px]">
              Zeitleiste
            </p>
            <p className="text-[#C8F135] text-[16px] sm:text-[18px] md:text-[20px] 3xl:text-[24px] font-paytone">
              {project.days}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const total = projects.length;
  const extTotal = extendedProjects.length;

  // `realIndex`  → which real project (0–9) is the active/left card
  // `trackIndex` → position inside extendedProjects we translate to
  const [realIndex, setRealIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(OFFSET);
  const [animated, setAnimated] = useState(true);
  const [isMd, setIsMd] = useState(false);
  const jumping = useRef(false);
  const [isLg, setIsLg] = useState(false);


  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsMd(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
  const mq = window.matchMedia("(min-width: 1024px)");
  setIsLg(mq.matches);
  const handler = (e) => setIsLg(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}, []);

  // Each card occupies (100 / perPage) % of the visible window.
  // The track width = extTotal cards, so each card is (1/extTotal) of the track.
  // translateX is expressed as % of the track, so:
  //   offset = trackIndex / extTotal * 100  (%)
  const perPage = isLg ? 2 : 1;

  // The visible window shows `perPage` cards.
  // Track total width in "viewport units" = extTotal / perPage viewports wide.
  // We move by 1 card = (1 / extTotal) of track = (perPage / extTotal) * 100 % of viewport?
  // Simpler: set track width = extTotal * cardSlotPx via percentage trick:
  //   wrapper width = 100%  (the visible viewport for cards)
  //   track width   = extTotal / perPage * 100%
  //   each card     = 100% / extTotal of track  =  (1/perPage)*100% of viewport
  //   translateX    = trackIndex * (100% / extTotal) of track
  //                 = trackIndex / extTotal * 100%  of track
  // But translateX % is relative to the element itself (the track), so:
  const translatePct = (trackIndex / extTotal) * 100; // % of track width

  // Silent teleport after transition ends
  const handleTransitionEnd = () => {
    if (jumping.current) return;

    let newTrack: number | null = null;
    let newReal: number | null = null;

    // Went past the tail clones → jump to real start area
    if (trackIndex >= OFFSET + total) {
      newReal = ((trackIndex - OFFSET) % total);
      newTrack = OFFSET + newReal;
    }
    // Went before the head clones → jump to real end area
    else if (trackIndex < OFFSET) {
      newReal = total - (OFFSET - trackIndex);
      if (newReal < 0) newReal = total + newReal;
      newTrack = OFFSET + newReal;
    }

    if (newTrack !== null && newReal !== null) {
      jumping.current = true;
      setAnimated(false);
      setRealIndex(newReal);
      setTrackIndex(newTrack);
      // Two rAFs ensure the DOM has painted with animation:none before re-enabling
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimated(true);
          jumping.current = false;
        })
      );
    }
  };

  const navigate = (deltaTrack: number, deltaReal: number) => {
    if (jumping.current) return;
    setTrackIndex((t) => t + deltaTrack);
    setRealIndex((r) => (r + deltaReal + total) % total);
    setAnimated(true);
  };

  const prev = () => navigate(-1, -1);
  const next = () => navigate(+1, +1);

  const goTo = useCallback(
    (idx: number) => {
      if (jumping.current) return;
      setRealIndex(idx);
      setTrackIndex(OFFSET + idx);
      setAnimated(true);
    },
    []
  );

  return (
    <section id="portfolio" className="bg-[#0F0F0F] py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-[1568px] mx-auto px-6 md:px-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[#C8F135] text-[16px] md:text-[20px] 3xl:text-[24px] tracking-wide">Unsere Arbeit</p>
            <h2 className="text-white text-[28px] sm:text-[28px] lg:text-[52px] leading-tight">
              Ausgewählte Projekte. Alle in 7 Tagen geliefert.
            </h2>
          </div>
        </div>

        {/* Carousel — overflow hidden viewport */}
        <div className="relative mt-10 mb-6 overflow-hidden">
          <div
            className="flex items-stretch"
            style={{
              // Track is extTotal cards wide; each card fills (1/perPage) of the viewport
              width: `${(extTotal / perPage) * 100}%`,
              transform: `translateX(-${translatePct}%)`,
              transition: animated
                ? "transform 0.55s cubic-bezier(0.32, 0.72, 0, 1)"
                : "none",
              willChange: "transform",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedProjects.map((project, i) => (
              <div
                key={`${project.num}-${i}`}
                style={{ width: `${100 / extTotal}%` }}
                className="px-2.5 box-border"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-[#C8F135] flex items-center justify-center hover:bg-[#C8F135]/10 transition-all duration-200"
          >
            <ChevronLeft size={18} className="text-[#C8F135]" />
          </button>

          <div className="flex gap-2 items-center">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === realIndex
                    ? "bg-[#C8F135] w-5 h-2.5"
                    : "bg-white/25 hover:bg-white/40 w-2.5 h-2.5"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-[#C8F135] flex items-center justify-center hover:bg-[#C8F135]/10 transition-all duration-200"
          >
            <ChevronRight size={18} className="text-[#C8F135]" />
          </button>
        </div>

      </div>
    </section>
  );
}