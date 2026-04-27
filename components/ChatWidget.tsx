"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { getAnswer, type LeadData } from "../lib/chat-knowledge";

export function ChatWidget() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | undefined>();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const canSend = question.trim().length > 0;

  async function sendQuestion() {
    if (!canSend) return;

    const userMessage = { role: "user" as const, text: question.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const response = await getAnswer(userMessage.text, leadData);
      setMessages((prev) => [...prev, { role: "assistant", text: response.message }]);
      setLeadData(response.leadData);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="w-[calc(100vw-3rem)] max-w-[320px] h-[420px] flex flex-col rounded-3xl border border-white/10 bg-[#0F0F0F] shadow-2xl backdrop-blur-xl sm:w-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-3xl bg-black/50 px-4 py-3 text-white border-b border-white/10">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="h-5 w-5 text-[#C8F135]" />
              Seiten-Chat
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full border border-white/15 p-1 hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4 text-white/60" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.length === 0 ? (
              <div className="text-white/60">
                Hallo! Ich bin der Chatbot von webseitig. Wie kann ich dir helfen? Frage mich nach Services, Preisen oder Kontakt.
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
                        ? "max-w-[80%] rounded-2xl bg-[#C8F135] px-3 py-2 text-black font-medium"
                        : "max-w-[80%] rounded-2xl bg-white/10 px-3 py-2 text-white/90 border border-white/10"
                    }
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <div key={i} className={i > 0 ? 'mt-2' : ''}>{line}</div>
                    ))}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-white/10 px-3 py-2 text-white/60 border border-white/10">
                  Tippen…
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="rounded-b-3xl border-t border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendQuestion();
                }}
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#C8F135] focus:bg-white/10 transition-colors"
                placeholder="Schreiben Sie Ihre Nachricht..."
              />
              <button
                onClick={sendQuestion}
                disabled={!canSend || loading}
                className="shrink-0 rounded-full bg-[#C8F135] px-4 py-2 text-sm text-black font-medium transition-all hover:bg-[#B8E125] disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 active:scale-95"
              >
                Senden
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open site chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8F135] text-black shadow-xl transition-all hover:bg-[#B8E125] hover:scale-110 active:scale-95"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}
