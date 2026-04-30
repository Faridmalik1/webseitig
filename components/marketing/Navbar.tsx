"use client";

import { useState, useEffect } from "react";
import { useModal } from "../shared/modal-context";
import { navigate } from "next/dist/client/components/segment-cache/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open } = useModal();
  const router = useRouter();
const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
  e.preventDefault();

  if (pathname === "/") {
    router.refresh();
    window.location.reload();
  } else {
    router.push("/");
  }
  window.scrollTo(0, 0);
};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  return (
    <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2
    bg-black/10 backdrop-blur-xl
    border-b border-[#262626]
    shadow-[0_8px_32px_rgba(0,0,0,0.25)]
    px-4 md:px-8
  `}
  data-testid="navbar"
>
      <div className="max-w-[1568px] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-3">

        {/* Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="text-white flex items-center gap-2 text-xl tracking-tight hover:opacity-80 transition-opacity shrink-0"
        >
          <img src="/NavbarLogo.svg" alt="Logo" className="h-36 w-36" />
          {/* <div style={{ fontFamily: "var(--font-paytone)" }}>
            web<span className="text-[#C8F135]">.</span>seitig
          </div> */}
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CTA — hidden on small mobile, shown from sm breakpoint */}
          <button
  onClick={open}
  className="group hidden sm:inline-flex items-center gap-2 bg-[#C8F135] text-[#171717] font-semibold text-[16px] md:!text-[20px] px-4 md:px-5 py-2.5 rounded-full hover:bg-[#d4f050] active:scale-95 transition-all duration-200 whitespace-nowrap"
  data-testid="button-cta"
>
  <span className="hidden md:inline">Kostenlose Beratung anfragen</span>
  <span className="md:hidden">Kostenlos starten</span>

  <ArrowUpRight
    size={16}
    strokeWidth={2}
    className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-45"
  />
</button>

          {/* Mobile menu button */}
          {/* <button
            className="text-white/70 hover:text-white p-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü öffnen"
            data-testid="mobile-menu-toggle"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button> */}
        </div>
      </div>

      {/* Mobile menu */}
      {/* {mobileOpen && (
        <div className="bg-[#1a1a1a] border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3">
            {[
              { label: "Start", id: "home" },
              { label: "Über uns", id: "about" },
              { label: "So funktioniert's", id: "features" },
              { label: "Preise", id: "pricing" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-white/70 hover:text-white text-sm py-2 text-start transition-colors border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { open(); setMobileOpen(false); }}
              className="mt-2 bg-[#C8F135] text-[#171717] font-bold text-sm py-3 rounded-full"
            >
              Kostenlos starten
            </button>
          </div>
        </div>
      )} */}
    </nav>
  );
}
