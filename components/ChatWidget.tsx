"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { getAnswer, type LeadData } from "@/lib/chat-knowledge";
// import { getAnswer } from "../lib/chat-knowledge";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  options?: string[];
};

const QUICK_OPTIONS = [
  "Pakete",
  "Preise",
  "Angebot",
  "Projekt anfragen",
  "Kontakt"
];

const LOCAL_ANSWERS: Record<string, string> = {
  "pakete": "Wir bieten zwei Hauptpakete: Starter (CHF 179/Mt., bis 5 Seiten) und Business Pro (CHF 249/Mt., bis 10 Seiten). Beide enthalten Hosting und Domain.",
  "preise": "Unsere Preise sind transparent: CHF 179/Mt. für Starter und CHF 249/Mt. für Business Pro. Keine Setup-Gebühr, keine versteckten Kosten.",
  "zusammenarbeit": "Wir erstellen professionelle Websites für Schweizer KMU in nur 7 Werktagen. Persönlich, schnell und unkompliziert.",
  "angebot": "Sie erhalten bei uns ein Fixpreis-Angebot ohne Vorauszahlung. Kontaktieren Sie uns für eine unverbindliche Beratung.",
  "leistungen": "Unsere Leistungen umfassen Webdesign, Entwicklung, Hosting, SSL, SEO-Grundlagen und laufenden technischen Support.",
  "dauer": "Ihre Website ist in nur 7 Werktagen nach Freigabe des Entwurfs fertig, sofern alle Inhalte vorliegen.",
  "eigentum": "Nach 12 Monaten gehört die Website zu 100 % Ihnen. Sie können bei uns bleiben oder die Daten mitnehmen.",
  "kontakt": "Sie erreichen uns unter hello@webseitig.ch oder über unser Kontaktformular. Wir antworten in der Regel innerhalb von 24h.",
  "website": "Wir spezialisieren uns auf moderne, mobile-optimierte Websites für Schweizer Unternehmen.",
  "webseite": "Wir spezialisieren uns auf moderne, mobile-optimierte Websites für Schweizer Unternehmen.",
};

export function ChatWidget() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [leadData, setLeadData] = useState<LeadData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const canSend = question.trim().length > 0 && !loading;

  async function sendQuestion(presetQuestion?: string) {
    const outgoingText = (presetQuestion ?? question).trim();
    if (!outgoingText || loading) return;

    const userMessage = { role: "user" as const, text: outgoingText };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    if (!presetQuestion) {
      setQuestion("");
    }

    // Check local answers first to avoid accidental lead form triggers in chat-knowledge
    const lowerText = outgoingText.toLowerCase();
    const localMatch = Object.keys(LOCAL_ANSWERS).find(key => lowerText.includes(key));

    // Special check for keywords that should trigger the lead form in chat-knowledge
    const isLeadTrigger = lowerText.includes("formular") || lowerText.includes("projekt starten") || lowerText.includes("anfrage senden");

    if (localMatch && !isLeadTrigger) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: LOCAL_ANSWERS[localMatch] },
        ]);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const answer = await getAnswer(userMessage.text, leadData);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: answer.message, options: answer.options },
      ]);
      // setLeadData(answer.leadData);
      if (answer.leadData !== undefined) {
        setLeadData(answer.leadData);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." },
      ]);
      // setLeadData(undefined);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="flex h-[420px] w-[calc(100vw-3rem)] max-w-[320px] flex-col rounded-3xl border border-white/10 bg-[#0F0F0F] shadow-2xl sm:w-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-3xl bg-[#0F0F0F] border-b border-white/10 px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="h-5 w-5 text-[#C8F135]" />
              Adrian
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full border border-white/15 p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4 text-[#888888]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 text-sm flex flex-col gap-3">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col px-2">

                <div className="text-[#888888] mb-5 text-sm">
                  Hallo! Wie kann ich dir helfen? Wähle ein Thema oder schreibe deine Frage.
                </div>

                <div className="text-sm">
                  <p className="text-[#888888] mb-3 font-medium">Beliebte Themen</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_OPTIONS.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => sendQuestion(option)}
                        disabled={loading}
                        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white hover:border-[#C8F135] hover:bg-white/10 transition-all active:scale-95 text-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "max-w-[80%] rounded-2xl bg-[#C8F135] px-3 py-2 text-black break-words"
                        : "max-w-[80%] rounded-2xl bg-white/5 px-3 py-2 text-white break-words"
                    }
                  >
                    {msg.text}
                    {msg.role === "assistant" && msg.options?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.options.map((option) => (
                          <button
                            key={`${idx}-${option}`}
                            onClick={() => sendQuestion(option)}
                            disabled={loading}
                            className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-white hover:border-[#C8F135] hover:text-[#C8F135] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-white/5 px-3 py-2 text-[#888888]">
                  Tippen...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Options Chips (Visible after first message, hidden during lead flow) */}
          {messages.length > 0 && (!leadData?.step || leadData.step === "skipped") && (
            <div className="px-4 pb-2 pt-2 overflow-hidden border-t border-white/5">
              <div className="flex overflow-x-auto gap-2 scrollbar-none pb-1">
                {QUICK_OPTIONS.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendQuestion(option)}
                    disabled={loading}
                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#888888] hover:border-[#C8F135] hover:text-white transition-all active:scale-95"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="rounded-b-3xl border-t border-white/10 bg-[#0F0F0F] px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendQuestion();
                }}
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-[#888888] outline-none focus:border-[#C8F135]"
                placeholder="Frag Adrian..."
              />
              <button
                onClick={() => sendQuestion()}
                disabled={!canSend}
                className="shrink-0 rounded-full bg-[#C8F135] px-4 py-2 text-sm text-black transition hover:bg-[#d4f050] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Senden
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open site chat"
        className="flex h-20 w-20 items-center justify-center 
             transition-all duration-200 ease-out 
             hover:scale-110 hover:shadow-lg active:scale-95"
      >
        <img
          src="/bot.svg"
          alt="Bot icon"
          className="h-full w-full pointer-events-none"
        />
      </button>
    </div>
  );
}
