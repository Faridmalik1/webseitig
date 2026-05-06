"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useModal } from "../shared/modal-context";

const logos = [
  { id: 1, img: "/services/logo1.svg" },
  { id: 2, img: "/services/logo2.svg" },
  { id: 3, img: "/services/logo3.svg" },
  { id: 4, img: "/services/logo4.svg" },
  { id: 5, img: "/services/logo5.svg" },
  { id: 6, img: "/services/logo6.svg" },
  { id: 7, img: "/services/logo7.svg" },
  { id: 8, img: "/services/logo8.svg" },
];

export function Services() {
  const { open } = useModal();
  return (
    <section id="services" className="bg-[#0F0F0F] py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-[1568px] mx-auto px-6 md:px-8">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-white text-[28px] sm:text-[32px] lg:text-[40px] xl:text-[52px] text-center mb-10"
        >
          Unternehmen, die uns vertrauen. Quer durch die Schweiz.
        </motion.h2>

        {/* Logos card container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-[40px] border border-dotted border-[#606060] overflow-hidden"
          style={{ background: "#1c1c1c" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-dotted divide-[#606060]">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-dotted divide-[#606060] border-t border-dotted border-[#606060]">
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
            className="inline-flex items-center gap-2 bg-[#C8F135] text-black! text-sm px-6 py-2.5 rounded-full no-underline hover:bg-[#d4f050] hover:!text-black active:scale-95 transition-all duration-200"
          >
            Mehr anzeigen
            <ArrowUpRight size={16} />
          </a>
        </div> */}
        <div className="flex justify-center mt-8">
          <button
            onClick={open}
            className="group inline-flex items-center gap-2 bg-[#C8F135] text-[#171717] font-semibold text-[16px] md:!text-[20px] 3xl:text-[24px] px-4 md:px-5 py-2.5 rounded-full hover:bg-[#d4f050] active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
            Jetzt Website sichern

            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-45"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
