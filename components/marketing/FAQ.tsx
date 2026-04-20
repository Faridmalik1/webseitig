"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    num: "01",
    q: "Was passiert nach den 12 Monaten?",
    a: "Nein. Du schickst uns dein Logo und ein paar Infos — wir  machen den Rest. Texte, Bilder, Technik: alles bei uns.",
  },
  {
    num: "02",
    q: "Gehört mir die Website wirklich?",
    a: "Ja. Du bekommst vollen Zugang zu allen Dateien, dem Hosting-Panel und der Domain. Die Website gehört dir.",
  },
  {
    num: "03",
    q: "Muss ich technisches Wissen mitbringen?",
    a: "Nein. Du schickst uns dein Logo und ein paar Infos — wir machen den Rest. Texte, Bilder, Technik: alles bei uns.",
  },
  {
    num: "04",
    q: "Wie schnell ist die Website wirklich fertig?",
    a: "In der Regel 7 Tage nach deiner Freigabe des ersten Entwurfs. Oft auch schneller.",
  },
  {
    num: "05",
    q: "Gibt es eine Einrichtungsgebür?",
    a: "Nein. Kein Setup-Fee, kein Upfront. Du zahlst erst, wenn die Website live geht.",
  },
  {
    num: "06",
    q: "Was ist, wenn mir das Design nicht gefällt?",
    a: "Wir passen solange an, bis du zufrieden bist. Inklusive unbegrenzte Feedbackrunden vor dem Launch.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(2);
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setEmailError("E-Mail ist erforderlich.");
      return;
    }

    setEmailError(null);

    if (!question.trim()) {
      setError("Frage ist erforderlich.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/faq-inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          question: question.trim(),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string; details?: string }
          | null;
        throw new Error(payload?.details ?? payload?.error ?? "Message could not be sent.");
      }

      setSent(true);
      setEmail("");
      setQuestion("");
      setTimeout(() => setSent(false), 3000);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="faq" className="bg-[#171717] py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <h2 className="text-white text-[2rem] md:text-[2.8rem] text-center mb-12">
           Häufig gestellte Fragen
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="flex flex-col divide-y divide-white/[0.07]">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    className="w-full flex items-center gap-4 py-5 text-start group"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-6 h-[1.5px] bg-[#C8F135] rounded-full" />
                      <span className="text-[#C8F135] text-lg font-extrabold tracking-widest">
                        {faq.num}
                      </span>
                    </div>

                    <span
                      className={`flex-1 text-base transition-colors ${
                        isOpen ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {faq.q}
                    </span>

                    <span className="text-white/40 shrink-0">
                      {isOpen ? (
                        <Minus size={16} strokeWidth={2} />
                      ) : (
                        <Plus size={16} strokeWidth={2} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/45 text-base leading-relaxed pb-5 ps-[3.5rem]">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-7 sticky top-24"
            style={{
              background: "linear-gradient(135deg, #1e2a0e 0%, #1c1c1c 60%)",
              border: "1px solid rgba(200,230,70,0.15)",
            }}
          >
            <h3 className="text-white text-[1.4rem] mb-2">Noch Fragen?</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Schreib uns einfach — wir antworten schnell und unkompliziert.
            </p>

            <form onSubmit={handleSend}>              

              <textarea
                required
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Deine Frage..."
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/25 resize-none outline-none transition-colors mb-4"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (event.target.value.trim()) {
                    setEmailError(null);
                  }
                }}
                placeholder="Deine E-Mail"
                className="w-full rounded-xl px-4 py-3 text-sm text-white/80 placeholder-white/25 outline-none transition-colors mb-3"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              />

              {emailError ? (
                <p className="-mt-1 mb-3 px-1 text-sm text-red-300">
                  {emailError}
                </p>
              ) : null}

              {/* {error ? (
                <p className="mb-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </p>
              ) : null} */}

              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="w-full py-3 rounded-xl bg-[#C8E646] text-[#171717] text-sm hover:bg-[#d4f050] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 mb-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  "Wird gesendet..."
                ) : sent ? (
                  "Gesendet ✓"
                ) : (
                  <>
                    Frage senden
                    <ArrowUpRight size={16} />
                  </>
                )}
              </button>
            </form>

            <p className="text-[#C8E646] text-xs text-center">
              Antwort innerhalb von 24h per WhatsApp
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
