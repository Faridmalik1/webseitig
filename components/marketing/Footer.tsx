"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronUp } from "lucide-react";

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToFaq = () => {
    if (pathname === "/") {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#faq");
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="w-full relative bg-[#141414] pt-8 pb-6 overflow-visible">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative">

        <div className="flex flex-col sm:flex-row sm:justify-between py-6 gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1">
            <div className="flex items-center justify-center">
              <img src="/FooterLogo.svg" alt="Logo" className="w-36" />
            </div>
            {/* <span className="text-[#7E7E7E] text-xl tracking-tight" style={{ fontFamily: "var(--font-paytone)" }}>
              web<span className="text-[#C8E646]">.</span>seitig
            </span> */}
          </Link>

          {/* Links */}
          <div className="relative w-full sm:w-auto">

            {/* ✅ Grid on mobile, flex on desktop */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-center sm:flex sm:items-center sm:gap-4">

              {[...legalLinks, { label: "Kontakt", action: scrollToFaq }].map((item, index, arr) => (
                <span key={item.label} className="flex items-center gap-4">
                  {"href" in item ? (
                    <Link
                      href={item.href}
                      className="text-white/70 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="text-white/70 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                  {index < arr.length - 1 && (
                    <span className="text-[#C8E646] text-sm">•</span>
                  )}
                </span>
              ))}

              {/* <button
        onClick={scrollToFaq}
        className="text-white/70 text-sm hover:text-white transition-colors"
      >
        Kontakt
      </button> */}

            </div>

            {/* Scroll to top button (unchanged) */}
            <button
              onClick={scrollToTop}
              className="absolute -top-10 right-2 w-9 h-9 rounded-full flex items-center justify-center 
      transition-all duration-200 active:scale-90 group z-10"
              style={{
                background: `
          linear-gradient(#141414, #141414) padding-box,
          linear-gradient(to right, #ffffff 50%, #C8E646 50%) border-box
        `,
                border: "1.5px solid transparent"
              }}
              aria-label="Nach oben scrollen"
            >
              <ChevronUp
                size={18}
                className="text-[#C8E646] group-hover:scale-110 transition-transform"
                strokeWidth={3}
              />
            </button>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.07]" />

        {/* Copyright row */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-center gap-1 text-center">
          <p className="text-[#888888] text-base">
            © {year} Web.seitig. Alle Rechte vorbehalten.{" "}
          </p>
        </div>

      </div>
    </footer>
  );
}
