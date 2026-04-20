"use client";

import { motion } from "framer-motion";
import { useModal } from "../shared/modal-context";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  const { open } = useModal();

  return (
    <div className="mx-6">
    <section
      className="relative overflow-hidden max-w-[1200px] rounded-3xl mx-auto px-6 md:px-8 py-20 md:py-24 text-center bg-[#C8F135]"
    >
      <img
        src="/Progress_Left.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-10 w-[200px] md:w-[250px] h-auto z-0"
      />

      <img
        src="/Progress_Right.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-10 rotate-30 w-[150px] md:w-[200px] h-auto z-0"
      />

      <div className="relative z-10 ">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="font-extrabold text-[2rem] md:text-[3rem] text-[#171717] leading-tight mb-4"
        >
          Bereit für deine neue Website?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-[#737373] text-base md:text-xl font-medium mb-8 max-w-[500px] mx-auto"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Kostenlose Beratung. Kein Druck. Kein Risiko. In 15 Minuten weisst du, was möglich ist.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          onClick={open}
                    className="inline-flex items-center gap-2 bg-[#171717] text-white font-bold text-sm sm:text-lg px-6 sm:px-8 py-2 sm:py-4 rounded-full hover:bg-[#2a2a2a] active:scale-95 transition-all duration-200"
        >
          Jetzt kostenlos starten
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </section>
    </div>
  );
}
