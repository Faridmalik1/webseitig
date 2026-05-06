"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    num: "01",
    q: "Was passiert nach den 12 Monaten?",
    a: "Nach 12 Monaten gehört Ihnen die Website zu 100 %. Egal was. Sie können einfach weiter bei uns bleiben, oder Sie nehmen die Dateien mit und hosten selbst. Kein Anruf den Sie fürchten müssen, kein Vertrag der sich automatisch verlängert, keine Gebühr die plötzlich auftaucht. Die meisten bleiben, weil es einfacher ist und weil der Service stimmt. Aber die Entscheidung liegt bei Ihnen. So wie es sein sollte.",
  },
  {
    num: "02",
    q: "Gehört mir die Website wirklich?",
    a: "Ja. In den ersten 12 Monaten kümmern wir uns um alles: Hosting, Updates, Technik, Sicherheit. Ab Monat 13 gehört Ihnen die Website vollständig: alle Dateien, alle Rechte, ohne Einschränkung. Sie sind nicht von uns abhängig. Sie bleiben, weil Sie zufrieden sind. Nicht weil Sie keine andere Wahl haben. Das ist der Unterschied zu den meisten Agenturen.",
  },
  {
    num: "03",
    q: "Muss ich technisches Wissen mitbringen?",
    a: "Keines. Wirklich null. Sie sagen uns was Sie machen, wer Ihre Kunden sind und was Ihnen wichtig ist. Den Rest übernehmen wir. Texte schreiben, Bilder auswählen, Technik einrichten, alles. Auch wenn Ihr Deutsch nicht perfekt ist, kein Problem. Wir sind das gewohnt und machen das gerne für Sie. Viele unserer Kunden haben noch nie eine E-Mail wegen Ihrer Website schreiben müssen. Das ist der Punkt. ",
  },
  {
    num: "04",
    q: "Wie schnell ist die Website wirklich fertig?",
    a: `In 7 Werktagen. Nach Ihrer Freigabe des Entwurfs. Nicht „in etwa zwei Wochen." Nicht sobald wir Kapazität haben. Sieben Tage. Wir sagen das, weil wir es einhalten. Wenn Sie wollen, fragen Sie unsere Kunden.`,
  },
  {
    num: "05",
    q: "Gibt es eine Einrichtungsgebühr?",
    a: "Nein. Und das meinen wir ernst. Keine Setup-Gebühr, keine einmalige Startpauschale, kein Posten im Kleingedruckten. Sie zahlen ab dem Tag, an dem Ihre Website live geht. Nur die monatliche Rate, die wir Ihnen von Anfang an nennen. CHF 179 ist CHF 179. Nicht CHF 179 plus etwas.",
  },
  {
    num: "06",
    q: "Was ist, wenn mir das Design nicht gefällt?",
    a: "Dann überarbeiten wir. So oft wie nötig, bis es stimmt. Kein Nagelstudio fängt an, bevor Sie die Farbe gewählt haben. Wir auch nicht. Erst Ihre Freigabe, dann geht's live. Nicht andersrum.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
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
    if (!email.includes("@")) {
      setEmailError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
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
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
          details?: string;
        } | null;
        throw new Error(
          payload?.details ?? payload?.error ?? "Message could not be sent.",
        );
      }

      setSent(true);
      setEmail("");
      setQuestion("");
      setTimeout(() => setSent(false), 3000);
      // Show Success State
      setSent(true);
      //  Reset Form Fields
      setQuestion("");
      setEmail("");
      //  Reset the "Sent" status after 5 seconds so they can type again
      setTimeout(() => {
        setSent(false);
      }, 5000);

    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="faq" className="bg-[#0F0F0F] py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-[1568px] mx-auto px-6 md:px-8">
        <h2 className="text-white text-[28px] sm:text-[32px] lg:text-[52px] text-center mb-12">
          Häufig gestellte Fragen
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="flex flex-col divide-y divide-white/[0.07]">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              // const isOpen = openIndex === index;
              return (
                <div key={i}>
                  <button
                    className="w-full flex items-center gap-4 py-5 text-start group"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <div className="flex items-end gap-2 shrink-0">
                      <div className="w-6 h-[1.5px] bg-[#C8F135] rounded-full mb-2 opacity-40"/>
                      <span className="text-[#C8F135] text-[16px] sm:text-[20px] lg:text-[28px] opacity-40 font-bold tracking-widest">
                        {faq.num}
                      </span>
                    </div>

                    <span
                      className={`flex-1 text-[18px] sm:text-[20px] 2xl:text-[24px] transition-colors ${
                        isOpen ? "text-[#C8F135]" : "text-white"
                      }`}
                    >
                      {faq.q}
                    </span>

                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-full  
                      flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45 " : ""
                      }`}
                    >
                      <Plus
                        size={18}
                        className={`transition-colors duration-300 `}
                      />
                    </div>
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
                        <p className="text-[#888888] text-[16px] sm:text-[18px] 2xl:text-[24px] leading-relaxed pb-5 ps-[3.5rem] whitespace-pre-line">
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
            <h3 className="text-white text-[24px] sm:text-[28px] mb-2">Noch Fragen?</h3>
            <p className="text-[#888888] text-[16px] sm:text-[18px] 2xl:text-[24px] leading-relaxed mb-5">
              Schreiben Sie uns einfach. Wir antworten schnell und unkompliziert.

            </p>

            <form onSubmit={handleSend}>
              <textarea
                required
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ihre Frage..."
                rows={4}
                className="w-full rounded-3xl px-4 py-3 text-sm text-white/80 placeholder-white/25 resize-none outline-none transition-colors mb-4"
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
                placeholder="Ihre E-Mail"
                className="w-full rounded-2xl px-4 py-3 text-base sm:text-xl text-white/80 placeholder-white/25 outline-none transition-colors mb-3"
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
                className="group w-full py-2 rounded-full bg-[#C8F135] text-[#171717] text-[16px] md:!text-[20px]  
  hover:bg-[#d4f050] active:scale-[0.98] transition-all duration-200 
  flex items-center justify-center gap-2 mb-3 whitespace-nowrap
  disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  "Wird gesendet..."
                ) : sent ? (
                  "Gesendet ✓"
                ) : (
                  <>
                    Frage senden
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-300 ease-out 
        group-hover:translate-x-1 group-hover:rotate-45"
                    />
                  </>
                )}
              </button>
              {sent && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[#C8F135] text-base mt-2"
                >
                  Vielen Dank! Wir haben Ihre Nachricht erhalten. Unser Team wird sich in Kürze bei Ihnen melden.
                </motion.p>
              )}
            </form>

            {/* <p className="text-[#C8F135] text-xs text-center">
              Antwort innerhalb von 24h per WhatsApp
            </p> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
