"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import { useModal } from "../shared/modal-context";

const branchen = [
  "Handwerk & Bau",
  "Gastronomie & Food",
  "Kosmetik & Beauty",
  "Gesundheit & Fitness",
  "Einzelhandel",
  "Dienstleistung & Beratung",
  "Immobilien",
  "Andere",
];

const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
};

export function ContactModal() {
  const { isOpen, close } = useModal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branche, setBranche] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredBranche, setHoveredBranche] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setBranche("");
    setDropdownOpen(false);
    setHoveredBranche(null);
    setSubmitted(false);
    setLoading(false);
    setApiError(null);
  }

  function handleClose() {
    close();
    window.setTimeout(resetForm, 250);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !branche) {
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim(),
          branche,
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Fehler beim Senden");
      }

      setSubmitted(true);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Unbekannter Fehler. Bitte versuche es erneut.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-[480px] rounded-2xl p-8"
              style={{ background: "#1a1a1a", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 text-white/40 hover:text-white/80 transition-colors"
              >
                <X size={20} />
              </button>

              {submitted ? (
                <div className="flex flex-col items-center text-center py-6">
                  <div
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: "rgba(200,230,70,0.18)" }}
                  >
                    <Check size={28} className="text-[#C8E646]" strokeWidth={2.5} />
                  </div>
                  <h2 className="mb-2 text-3xl font-extrabold text-white">Danke!</h2>
                  <p className="text-sm leading-relaxed text-white/50">
                    Wir melden uns innerhalb von 24 Stunden per WhatsApp bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h2 className="mb-1 text-2xl font-extrabold text-white">Kostenlos starten</h2>
                    <p className="text-sm text-white/45">
                      Kurze Infos - wir melden uns innerhalb von 24 Stunden per WhatsApp.
                    </p>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white">Dein Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Max Mustermann"
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white">
                      E-Mail 
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="max@beispiel.de"
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white">
                      WhatsApp / Telefon
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+41 79 000 00 00"
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-white">
                      Deine Branche
                    </label>
                    <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((current) => !current)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: `1px solid ${dropdownOpen ? "rgba(200,230,70,0.5)" : "rgba(255,255,255,0.1)"}`,
                          color: branche ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                        }}
                      >
                        <span>{branche || "Bitte waehlen..."}</span>
                        <motion.span
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} className="text-white/40" />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {dropdownOpen ? (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 overflow-hidden rounded-2xl"
                            style={{
                              background: "#111111",
                              border: "1px solid rgba(255,255,255,0.08)",
                              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                              transformOrigin: "top",
                            }}
                          >
                            {branchen.map((item) => {
                              const isSelected = item === branche;
                              const isHovered = hoveredBranche === item;

                              return (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => {
                                    setBranche(item);
                                    setDropdownOpen(false);
                                  }}
                                  onMouseEnter={() => setHoveredBranche(item)}
                                  onMouseLeave={() => setHoveredBranche(null)}
                                  className="w-full px-5 py-3 text-left text-sm transition-all duration-150"
                                  style={{
                                    color: isSelected
                                      ? "#C8E646"
                                      : isHovered
                                        ? "rgba(255,255,255,1)"
                                        : "rgba(255,255,255,0.65)",
                                    background: isSelected
                                      ? "rgba(200,230,70,0.1)"
                                      : isHovered
                                        ? "rgba(255,255,255,0.06)"
                                        : "transparent",
                                    border: isSelected
                                      ? "1px solid rgba(200,230,70,0.4)"
                                      : "1px solid transparent",
                                    borderRadius: "10px",
                                    margin: "3px 6px",
                                    width: "calc(100% - 12px)",
                                    fontWeight: isSelected ? 600 : 400,
                                  }}
                                >
                                  {item}
                                </button>
                              );
                            })}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  </div>

                  {apiError ? (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {apiError}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading || !name.trim() || !phone.trim() || !branche}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8E646] py-4 text-[15px] font-bold text-[#171717] transition-all duration-200 hover:bg-[#d4f050] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#171717]/30 border-t-[#171717]" />
                    ) : (
                      <>
                        Jetzt kostenlos beraten lassen
                        <span className="text-lg">
                          <ArrowRight />
                        </span>
                      </>
                    )}
                  </button>

                  <p className="-mt-1 text-center text-xs text-white/30">
                    Kein Spam. Keine Kosten. Deine Daten werden nicht weitergegeben.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
