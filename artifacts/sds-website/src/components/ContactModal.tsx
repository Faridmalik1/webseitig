import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../lib/modal-context";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import { Arrow } from "@radix-ui/react-tooltip";

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

const API_BASE_URL = "/api";

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
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    close();
    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setBranche("");
      setSubmitted(false);
      setApiError(null);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !branche) return;
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim(),
          branche,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? "Fehler beim Senden");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setApiError(
        err instanceof Error ? err.message : "Unbekannter Fehler. Bitte versuche es erneut.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-[480px] rounded-2xl p-8"
              style={{ background: "#1a1a1a", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-white/40 hover:text-white/80 transition-colors"
              >
                <X size={20} />
              </button>

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Thank-you state ── */
                  <motion.div
                    key="thankyou"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                      style={{ background: "rgba(200,230,70,0.18)" }}
                    >
                      <Check size={28} className="text-[#C8E646]" strokeWidth={2.5} />
                    </motion.div>
                    <h2 className="text-white font-extrabold text-3xl mb-2">Danke!</h2>
                    <p className="text-white/50 text-sm leading-relaxed">
                      Wir melden uns innerhalb von 24 Stunden per&nbsp;WhatsApp bei&nbsp;Ihnen.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form state ── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <h2 className="text-white font-extrabold text-2xl mb-1">Kostenlos starten</h2>
                      <p className="text-white/45 text-sm">
                        Kurze Infos — wir melden uns innerhalb von 24 Stunden per WhatsApp.
                      </p>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-1.5">Dein Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Max Mustermann"
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200,230,70,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>

                    {/* E-Mail (optional) */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-1.5">
                        E-Mail <span className="text-white/30 font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="max@beispiel.de"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200,230,70,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-1.5">WhatsApp / Telefon</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+41 79 000 00 00"
                        required
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-colors"
                        style={INPUT_STYLE}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200,230,70,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>

                    {/* Branche custom dropdown */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-1.5">Deine Branche</label>
                      <div ref={dropdownRef} className="relative">
                        <button
                          type="button"
                          onClick={() => setDropdownOpen((v) => !v)}
                          className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: `1px solid ${dropdownOpen ? "rgba(200,230,70,0.5)" : "rgba(255,255,255,0.1)"}`,
                            color: branche ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                          }}
                        >
                          <span>{branche || "Bitte wählen..."}</span>
                          <motion.span
                            animate={{ rotate: dropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown size={16} className="text-white/40" />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                              animate={{ opacity: 1, y: 0, scaleY: 1 }}
                              exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 rounded-2xl overflow-hidden"
                              style={{
                                background: "#111111",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                                transformOrigin: "top",
                              }}
                            >
                              {branchen.map((b) => {
                                const isSelected = b === branche;
                                const isHovered = hoveredBranche === b;
                                return (
                                  <button
                                    key={b}
                                    type="button"
                                    onClick={() => { setBranche(b); setDropdownOpen(false); }}
                                    onMouseEnter={() => setHoveredBranche(b)}
                                    onMouseLeave={() => setHoveredBranche(null)}
                                    className="w-full text-left px-5 py-3 text-sm transition-all duration-150"
                                    style={{
                                      color: isSelected ? "#C8E646" : isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)",
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
                                    {b}
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* API error */}
                    {apiError && (
                      <div className="rounded-xl px-4 py-3 text-sm text-red-300 bg-red-500/10 border border-red-500/20">
                        {apiError}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading || !name.trim() || !phone.trim() || !branche}
                      className="w-full py-4 rounded-full bg-[#C8E646] text-[#171717] font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#d4f050] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-4 h-4 border-2 border-[#171717]/30 border-t-[#171717] rounded-full inline-block"
                        />
                      ) : (
                        <>Jetzt kostenlos beraten lassen 
                        <span className="text-lg">
                          <ArrowRight />
                          </span>
                          </>
                      )}
                    </button>

                    <p className="text-white/30 text-xs text-center -mt-1">
                      Kein Spam. Keine Kosten. Deine Daten werden nicht weitergegeben.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
