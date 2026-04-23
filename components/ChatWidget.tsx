"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { getAnswer } from "../lib/chat-knowledge";

export function ChatWidget() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const canSend = question.trim().length > 0;

  async function sendQuestion() {
    if (!canSend) return;

    const userMessage = { role: "user" as const, text: question.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const answer = await getAnswer(userMessage.text);
      setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:left-auto sm:right-6">
      {isOpen && (
        <div className="w-full max-w-[320px] rounded-3xl border border-slate-700 bg-slate-800 shadow-2xl sm:w-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-3xl bg-slate-950 px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MessageSquare className="h-5 w-5 text-[#C8F135]" />
              Seiten-Chat
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full border border-white/15 p-1 hover:bg-white/10"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-60 space-y-3 overflow-y-auto px-4 py-4 text-sm sm:max-h-80">
            {messages.length === 0 ? (
              <div className="text-slate-400">
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
                        ? "max-w-[80%] rounded-2xl bg-[#C8F135] px-3 py-2 text-black"
                        : "max-w-[80%] rounded-2xl bg-slate-700 px-3 py-2 text-slate-200"
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl bg-slate-700 px-3 py-2 text-slate-400">
                  Tippen…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="rounded-b-3xl border-t border-slate-700 bg-slate-800 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendQuestion();
                }}
                className="min-w-0 flex-1 rounded-full border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-[#C8F135]"
                placeholder="Ask a question..."
              />
              <button
                onClick={sendQuestion}
                disabled={!canSend || loading}
                className="shrink-0 rounded-full bg-[#C8F135] px-4 py-2 text-sm text-black transition hover:bg-[#B8E125] disabled:cursor-not-allowed disabled:opacity-50"
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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B8E125] text-white shadow-xl"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
