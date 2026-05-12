"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const CONSENT_KEY = "webseitig.analyticsConsent";
const GA_ID = "G-2P2YS88WWB";
const CLARITY_ID = "wg5moz76ao";

type ConsentChoice = "accepted" | "rejected";

function clearAnalyticsCookies() {
  const cookieNames = ["_ga", `_ga_${GA_ID.replace("G-", "")}`, "_gid", "_gat"];

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
  });
}

export function ConsentManager() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(CONSENT_KEY);

    if (savedChoice === "accepted" || savedChoice === "rejected") {
      setChoice(savedChoice);
    }

    setReady(true);

    const openSettings = () => {
      setChoice(null);
      window.dispatchEvent(new CustomEvent("webseitig:consent-changed", { detail: { visible: true } }));
    };
    window.addEventListener("webseitig:open-consent", openSettings);

    return () => {
      window.removeEventListener("webseitig:open-consent", openSettings);
    };
  }, []);

  const showBanner = ready && choice === null;

  useEffect(() => {
    if (showBanner && !isMinimized) {
      const timer = setTimeout(() => {
        setIsMinimized(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showBanner, isMinimized]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("webseitig:consent-changed", {
      detail: {
        visible: showBanner,
        minimized: isMinimized
      }
    }));
  }, [showBanner, isMinimized]);

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_KEY, nextChoice);
    setChoice(nextChoice);

    if (nextChoice === "rejected") {
      clearAnalyticsCookies();
    }
  };

  const analyticsAllowed = choice === "accepted";

  return (
    <>
      {analyticsAllowed && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");`}
          </Script>
        </>
      )}

      {showBanner && (
        <>
          {/* Mobile-only fixed tab (outside translating container to avoid transform issues) */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={`fixed right-0 z-[120] flex h-12 w-12 items-center justify-center border border-white/10 bg-[#121212]/95 text-white backdrop-blur-xl transition-all duration-500 -rotate-90 origin-center md:hidden ${
              isMinimized ? "bottom-40" : "bottom-[50vh]"
            }`}
            aria-label={isMinimized ? "Cookie-Einstellungen öffnen" : "Cookie-Einstellungen schließen"}
          >
            <Cookie className="h-6 w-6 rotate-90" />
          </button>

          <div
            className={`fixed inset-x-0 bottom-0 z-[100] transition-all duration-500 ease-in-out pointer-events-none ${
              isMinimized ? "translate-y-full md:translate-y-[calc(100%-52px)]" : "translate-y-0"
            }`}
            role="dialog"
            aria-live="polite"
            aria-label="Cookie-Einstellungen"
          >
            {/* Desktop-only attached tab (inside translating container) */}
            <div className="mx-auto hidden max-w-[1568px] justify-end pl-4 pr-48 pointer-events-none md:flex">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="relative z-[10] translate-y-[1px] flex h-[52px] w-[52px] items-center justify-center border-l border-r border-t border-white/10 bg-[#121212]/95 text-white backdrop-blur-xl transition-colors hover:text-[#C8F135] pointer-events-auto"
                aria-label={isMinimized ? "Cookie-Einstellungen öffnen" : "Cookie-Einstellungen schließen"}
              >
                <Cookie className="h-6 w-6" />
              </button>
            </div>

            <div className="border-t border-white/10 bg-[#121212]/95 shadow-[0_-18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl pointer-events-auto">
              <div className="mx-auto flex max-w-[1568px] flex-col gap-4 px-4 py-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-5xl">
                  <p className="text-[16px] font-semibold text-white md:text-[18px]">
                    Wir verwenden Cookies
                  </p>
                  <p className="mt-1 text-[14px] leading-relaxed text-white/70 md:text-[16px]">
                    Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Wenn Sie fortfahren, akzeptieren Sie unsere Verwendung von Cookies.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Link
                    href="/datenschutz"
                    className="rounded-full border border-white/20 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:border-[#C8F135] hover:bg-white/5 text-center"
                  >
                    Mehr erfahren
                  </Link>
                  <button
                    type="button"
                    onClick={() => saveChoice("accepted")}
                    className="rounded-full bg-[#C8F135] px-5 py-3 text-[15px] font-semibold text-[#171717] transition-colors hover:bg-[#d4f050]"
                  >
                    Akzeptieren
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
