"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const testimonials = [
  {
    name: "Mirela T.",
    role: "Coiffeursalon",
    city: "Zürich",
    quote:
      "Ich hab 11 Jahre lang nur über Weiterempfehlung gearbeitet. Irgendwann fragt ein neuer Kunde: ‚Haben Sie eine Website?' und ich stehe da. Das war mir peinlich ehrlich gesagt. Seit ich die Seite habe, buchen Leute die ich gar nicht kenne — einfach weil sie mich bei Google gefunden haben.",
    image: "/services/logo1.svg",
  },
  {
    name: "Linh N.",
    role: "Nagelstudio",
    city: "Bern",
    quote:
      "Ich hab Instagram, aber das reicht irgendwann nicht mehr. Kunden wollten Preise sehen, Fotos, wie man bucht. Das musste ich immer einzeln erklären. Jetzt schicke ich einfach den Link. Die Website hat sich im ersten Monat schon bezahlt gemacht.",
    image: "/services/logo2.svg",
  },
  {
    name: "Marco S.",
    role: "Personal Trainer",
    city: "St. Gallen",
    quote:
      "Meine Kunden fragen mich manchmal warum eine Stunde so viel kostet. Wenn ich dann eine saubere Website habe mit meinen Methoden, Referenzen, einem richtigen Foto von mir — dann stellen sie die Frage seltener. Das klingt komisch aber es stimmt. Eine professionelle Website ist auch Preisrechtfertigung.",
    image: "/services/logo3.svg",
  },
  {
    name: "Reto B.",
    role: "Elektroinstallationen",
    city: "Winterthur",
    quote:
      "Hab ehrlich gesagt nicht viel erwartet. In meiner Branche wird viel versprochen. Aber die 7 Tage haben die eingehalten — und seit die Website oben ist, fragen meine Kunden manchmal: ‚Hast du umgebaut?' Nein, ich hab einfach endlich eine ordentliche Website.",
    image: "/services/logo4.svg",
  },
  {
    name: "Nadine F.",
    role: "Kosmetikstudio",
    city: "Basel",
    quote:
      "Ich hab das schon zweimal versucht, einmal mit Wix und einmal mit einer kleinen Agentur. Beides war eine Katastrophe. Hier war das komplett anders. Die haben mir sogar die Texte geschrieben, weil ich nicht wusste was ich schreiben soll. Mittlerweile buchen Kunden direkt über die Seite.",
    image: "/services/logo5.svg",
  },
  {
    name: "Dragan M.",
    role: "Maler- und Gipsergeschäft",
    city: "Zürich",
    quote:
      "Ich bin aus Serbien, mein Deutsch ist okay aber für Texte nicht gut genug. Das war immer mein Problem mit Websites. Die haben das einfach übernommen. Jetzt schaut's aus wie ein richtiges Unternehmen — weil es ja auch eines ist.",
    image: "/services/logo6.svg",
  },
  {
    name: "Claudia W.",
    role: "Physiotherapeutin",
    city: "Luzern",
    quote:
      "Was mich überzeugt hat: Die wollten zuerst wissen was ich brauche, nicht was sie mir verkaufen können. Das 15-Minuten-Gespräch war wirklich nur ein Gespräch. Danach hab ich unterschrieben.",
    image: "/services/logo7.svg",
  },
];

const GAP = 20;
const SPEED = 0.5; // px per frame — increase for faster scroll

function TestimonialAvatar({ image, name }: { image: string; name: string }) {
  return (
    <div className="w-12 h-12 overflow-hidden shrink-0 flex items-center justify-center border border-[#888888] rounded-full">
      <img
        src={image}
        alt={`${name} - Kundenstimme`}
        className="w-[36px] h-[21px] object-contain"
      />
    </div>
  );
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>();
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const isStepping = useRef(false);

  // Duplicate cards once — we reset when we've scrolled one full set width
  const loopedTestimonials = [...testimonials, ...testimonials];

  // Compute the pixel width of one card based on current viewport
  const getCardWidth = useCallback((): number => {
    if (!wrapperRef.current) return 300;
    const containerWidth = wrapperRef.current.offsetWidth;
    const cols = containerWidth < 768 ? 1 : containerWidth < 1024 ? 2 : 3;
    return (containerWidth - GAP * (cols - 1)) / cols;
  }, []);

  // One full set width = N cards + N gaps
  const getOneSetWidth = useCallback((): number => {
    return testimonials.length * (getCardWidth() + GAP);
  }, [getCardWidth]);

  // Apply current offset to the track DOM node
  const applyOffset = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    }
    const cardW = getCardWidth();
    const activeIdx =
      Math.round(offsetRef.current / (cardW + GAP)) % testimonials.length;
    setCurrentIndex((activeIdx + testimonials.length) % testimonials.length);
  }, [getCardWidth]);

  // Main RAF loop
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current && !isStepping.current) {
        offsetRef.current += SPEED;
        const oneSet = getOneSetWidth();
        if (offsetRef.current >= oneSet) {
          offsetRef.current -= oneSet;
        }
        applyOffset();
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [getOneSetWidth, applyOffset]);

  // Smooth ease-out step animation
  const animateTo = useCallback(
    (targetOffset: number, onDone?: () => void) => {
      isStepping.current = true;
      const startOffset = offsetRef.current;
      const delta = targetOffset - startOffset;
      const duration = 320;
      const startTime = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const frame = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        offsetRef.current = startOffset + delta * easeOutCubic(t);

        // Wrap within bounds while animating
        const oneSet = getOneSetWidth();
        if (offsetRef.current < 0) offsetRef.current += oneSet;
        if (offsetRef.current >= oneSet) offsetRef.current -= oneSet;

        applyOffset();

        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          offsetRef.current = ((targetOffset % getOneSetWidth()) + getOneSetWidth()) % getOneSetWidth();
          applyOffset();
          isStepping.current = false;
          onDone?.();
        }
      };
      requestAnimationFrame(frame);
    },
    [getOneSetWidth, applyOffset]
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      if (isStepping.current) return;
      pausedRef.current = true;

      const cardW = getCardWidth();
      const cardStep = cardW + GAP;
      const oneSet = getOneSetWidth();

      // Snap to nearest card boundary
      const snapped = Math.round(offsetRef.current / cardStep) * cardStep;
      let target = snapped + dir * cardStep;

      // Normalise into [0, oneSet)
      target = ((target % oneSet) + oneSet) % oneSet;

      animateTo(target, () => {
        // Resume auto-scroll after 2 seconds
        setTimeout(() => {
          pausedRef.current = false;
        }, 2000);
      });
    },
    [getCardWidth, getOneSetWidth, animateTo]
  );

  const goToIndex = useCallback(
    (index: number) => {
      if (isStepping.current) return;
      pausedRef.current = true;

      const cardStep = getCardWidth() + GAP;
      const target = index * cardStep;

      animateTo(target, () => {
        setTimeout(() => {
          pausedRef.current = false;
        }, 2000);
      });
    },
    [getCardWidth, animateTo]
  );

  return (
    <section id="testimonials" className="bg-[#0F0F0F] py-10 md:py-16 relative px-8">
      <div className="max-w-[1568px] mx-auto px-6 md:px-8">
        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-white text-[28px] sm:text-[32px] lg:text-[52px] text-left tracking-wide mb-6 md:mb-0 max-w-[900px]"
          >
            Was unsere Kunden sagen — in ihren eigenen Worten.
          </motion.h2>

          {/* Navigation Buttons */}
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => step(-1)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C8F135] hover:bg-[#b8ea4f] transition-all duration-200 flex items-center justify-center"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={20} className="text-black" />
            </button>
            <button
              onClick={() => step(1)}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C8F135] hover:bg-[#b8ea4f] transition-all duration-200 flex items-center justify-center"
              aria-label="Next testimonials"
            >
              <ChevronRight size={20} className="text-black" />
            </button>
          </div>
        </div>

        {/* Clip wrapper — hides overflow */}
        <div ref={wrapperRef} className="overflow-hidden">
          {/* Track — moved via CSS transform, never scrollLeft */}
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{ gap: `${GAP}px` }}
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              if (!isStepping.current) pausedRef.current = false;
            }}
          >
            {loopedTestimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col gap-4 flex-shrink-0 testimonial-card"
                style={{
                  background: "#1c1c1c",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <TestimonialAvatar image={t.image} name={t.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white text-[16px] sm:text-[18px]">
                        {t.name}
                      </p>
                      <span className="text-[#888888] text-[14px] sm:text-[16px]">
                        {" "}— {t.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <img
                        src="/location.svg"
                        alt="location"
                        className="w-5 h-5"
                      />
                      <p className="text-white text-[14px] sm:text-[16px]">
                        {t.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-white text-sm leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-[#C8FA5F]"
                  : "w-1.5 bg-[#3a3a3a] hover:bg-[#4a4a4a]"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div> */}
      </div>

      <style jsx global>{`
        /* Scrollbar suppression (kept as fallback) */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Card widths — CSS drives sizing, JS reads it back */
        .testimonial-card {
          width: calc((100% - ${GAP * 2}px) / 3);
        }
        @media (max-width: 1023px) {
          .testimonial-card {
            width: calc((100% - ${GAP}px) / 2);
          }
        }
        @media (max-width: 767px) {
          .testimonial-card {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}