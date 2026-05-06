"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronUp } from "lucide-react";

const links = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Kontakt", href: "/#faq" }, // ✅ unified as Link
];

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

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

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const year = new Date().getFullYear();

  const linkClass =
    "inline-flex items-center text-white/70 text-[16px] sm:text-[18px] 3xl:text-[24px] hover:text-white transition-colors leading-none";

  return (
    <footer className="w-full relative pt-8 overflow-visible">
      <div className="relative bg-[#151515] px-8">
        <div className="max-w-[1568px] mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between py-6 gap-6">
            
            {/* Logo */}
            <Link
              href="/"
              onClick={handleLogoClick}
              className="flex items-center"
            >
              <img src="/FooterLogo.svg" alt="Logo" className="w-36 2xl:w-48" />
            </Link>

            {/* Links */}
            <div className="relative w-full sm:w-auto">
              
              {/* 🔥 Clean layout (no grid issues) */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-2 text-center">
                
                {links.map((item, index) => (
                  <div key={item.label} className="flex items-center">
                    
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>

                    {/* Dot separator */}
                    {index < links.length - 1 && (
                      <span className="text-[#C8F135] text-sm mx-2">•</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Scroll to top */}
              <button
                onClick={scrollToTop}
                className="absolute -top-10 right-2 w-9 h-9 rounded-full flex items-center justify-center 
                transition-all duration-200 active:scale-90 group z-10"
                style={{
                  background: `
                    linear-gradient(#141414, #141414) padding-box,
                    linear-gradient(to right, #ffffff 50%, #C8F135 50%) border-box
                  `,
                  border: "1.5px solid transparent",
                }}
                aria-label="Nach oben scrollen"
              >
                <ChevronUp
                  size={18}
                  className="text-[#C8F135] group-hover:scale-110 transition-transform"
                  strokeWidth={3}
                />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.07]" />

          {/* Copyright */}
          <div className="py-4 flex items-center justify-center text-center">
            <p className="text-[#888888] text-base 3xl:text-[24px]">
              © {year} Web.seitig. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}