import Link from "next/link";
import { ChevronUp } from "lucide-react";

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToFaq = () =>
    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });

  const year = new Date().getFullYear();

  return (
    <footer className="w-full relative bg-[#141414] pt-8 pb-6 overflow-visible">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative">

        {/* Main row: logo left | links + scroll-to-top right */}
        <div className="flex items-center justify-between py-6 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
            >
              <span className="font-bold text-sm leading-none">
                <img src="/FooterLogo.svg" alt="Logo" className="w-6 h-6" />
              </span>
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              web<span className="text-[#C8E646]">.</span>seitig
            </span>
          </div>

          {/* Right side: legal links + scroll-to-top */}
          <div className="flex items-center gap-4 relative">
            <div className="hidden sm:flex items-center gap-4 flex-wrap">
              {legalLinks.map((link) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-white/70 font-medium text-sm hover:text-white transition-colors whitespace-nowrap"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {link.label}
                  </Link>
                  <span className="text-white/20 select-none">·</span>
                </span>
              ))}
              <button
                onClick={scrollToFaq}
                className="text-white/70 font-medium text-sm hover:text-white transition-colors whitespace-nowrap"
              >
                Kontakt
              </button>
            </div>

            {/* Scroll to top - EXACT positioning like your image */}
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
          <p className="text-white/25 text-xs">
            © {year} web.seitig — Ein Angebot von{" "}
            <a
              href="https://snowdreamstudios.ch"
              target="_blank"
              rel="noreferrer"
              className="text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
            >
              Snow Dream Studios GmbH
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
