"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useModal } from "../shared/modal-context";

const logos = [
  { id: 1, img: "/logos/logo1.svg" },
  { id: 2, img: "/logos/logo2.svg" },
  { id: 3, img: "/logos/logo3.svg" },
  { id: 4, img: "/logos/logo4.svg" },
  { id: 5, img: "/logos/logo5.svg" },
  { id: 6, img: "/logos/logo6.svg" },
  { id: 7, img: "/logos/logo7.svg" },
  { id: 8, img: "/logos/logo8.svg" },
];

export function Services() {
  const { open } = useModal();
  return (
    <section id="services" className="bg-[#171717] pb-20 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-white text-[1.9rem] md:text-[2.4rem] text-center mb-10"
        >
          Unternehme, wo üs vertraue
        </motion.h2>

        {/* Logos card container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.07] overflow-hidden"
          style={{ background: "#1c1c1c" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.07]">
            {logos.slice(0, 4).map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center py-10 px-6 opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src={logo.img}
                  alt="company logo"
                  className="h-10 object-contain"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.07] border-t border-white/[0.07]">
            {logos.slice(4, 8).map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center py-10 px-6 opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src={logo.img}
                  alt="company logo"
                  className="h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* "Mehr anzeigen" button */}
        {/* <div className="flex justify-center mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#C8E646] text-black! text-sm px-6 py-2.5 rounded-full no-underline hover:bg-[#d4f050] hover:!text-black active:scale-95 transition-all duration-200"
          >
            Mehr anzeigen
            <ArrowUpRight size={16} />
          </a>
        </div> */}
        <div className="flex justify-center mt-8">
          <button
            onClick={open}
            className="inline-flex items-center gap-2 bg-[#C8E646] text-[#171717] font-semibold text-sm px-4 md:px-5 py-2.5 rounded-full hover:bg-[#d4f050] active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            Kostenlose Beratung anfragen
            {/* <ArrowUpRight size={16} /> */}
          </button>
        </div>
      </div>
    </section>
  );
}
