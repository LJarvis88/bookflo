"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, MessageSquare } from "lucide-react";
import {
  CHAT_INTENTS,
  CHAT_WELCOME,
  replyToChat,
} from "@/data/chatbot";
import {
  BOOKFLO_WHATSAPP_DISPLAY,
  bookfloWhatsAppUrl,
} from "@/lib/contact";

type Msg = {
  id: string;
  role: "bot" | "user";
  text: string;
  showWhatsApp?: boolean;
};

const QUICK_CHIPS = CHAT_INTENTS.filter((i) => i.label).slice(0, 5);

function WhatsAppLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={bookfloWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[#1ebe57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${className}`}
    >
      <MessageSquare className="h-3.5 w-3.5" aria-hidden />
      WhatsApp · {BOOKFLO_WHATSAPP_DISPLAY}
    </a>
  );
}

export function MarketingChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { id: "welcome", role: "bot", text: CHAT_WELCOME },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
    const t = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(t);
  }, [open, messages]);

  function pushBot(text: string, showWhatsApp?: boolean) {
    setMessages((prev) => [
      ...prev,
      {
        id: `b-${Date.now()}-${prev.length}`,
        role: "bot",
        text,
        showWhatsApp,
      },
    ]);
  }

  function ask(question: string) {
    const q = question.trim();
    if (!q) return;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}-${prev.length}`, role: "user", text: q },
    ]);
    const reply = replyToChat(q);
    // Tiny delay so the exchange feels conversational without an LLM
    window.setTimeout(() => {
      pushBot(reply.text, reply.showWhatsApp);
    }, 220);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = input;
    setInput("");
    ask(q);
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="BOOKFLO chat helper"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-auto flex w-[min(100vw-2rem,22.5rem)] flex-col overflow-hidden rounded-2xl border border-bf-line/90 bg-white shadow-lift"
          >
            <header className="flex items-start justify-between gap-3 border-b border-bf-line/70 bg-gradient-to-br from-[#F7F0FC] via-white to-[#EEF4F7] px-4 py-3.5">
              <div>
                <p className="font-display text-sm font-semibold tracking-tight text-bf-ink">
                  BOOKFLO helper
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-bf-muted">
                  Instant answers · WhatsApp if you need a human
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-bf-muted transition hover:bg-black/[0.04] hover:text-bf-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bf-accent"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div
              ref={listRef}
              className="flex max-h-[min(52vh,22rem)] flex-col gap-2.5 overflow-y-auto px-3.5 py-3.5"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[90%] rounded-2xl rounded-br-md bg-bf-accent px-3 py-2 text-[13px] leading-relaxed text-white"
                        : "max-w-[92%] rounded-2xl rounded-bl-md bg-[#F4F1F7] px-3 py-2 text-[13px] leading-relaxed text-bf-ink"
                    }
                  >
                    {m.text}
                  </div>
                  {m.showWhatsApp ? <WhatsAppLink /> : null}
                </div>
              ))}

              <div className="flex flex-wrap gap-1.5 pt-1">
                {messages.length <= 3
                  ? QUICK_CHIPS.map((chip) => (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => ask(chip.label!)}
                        className="rounded-full border border-bf-line bg-white px-2.5 py-1 text-[11px] font-medium text-bf-ink transition hover:border-bf-accent/40 hover:bg-[#F7F0FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bf-accent"
                      >
                        {chip.label}
                      </button>
                    ))
                  : null}
                <button
                  type="button"
                  onClick={() => ask("I’d like to speak to a human")}
                  className="rounded-full border border-bf-line bg-white px-2.5 py-1 text-[11px] font-medium text-bf-ink transition hover:border-bf-accent/40 hover:bg-[#F7F0FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bf-accent"
                >
                  Talk to a human
                </button>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-bf-line/70 bg-[#FAFBFC] px-3 py-2.5"
            >
              <label className="sr-only" htmlFor={`${panelId}-input`}>
                Ask about BOOKFLO
              </label>
              <input
                ref={inputRef}
                id={`${panelId}-input`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, trial…"
                autoComplete="off"
                className="min-w-0 flex-1 rounded-full border border-bf-line bg-white px-3.5 py-2 text-sm text-bf-ink outline-none placeholder:text-bf-muted/80 focus:border-bf-accent"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bf-accent text-white transition hover:bg-[#6b4a68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bf-accent disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            <div className="border-t border-bf-line/60 bg-white px-3 py-2.5">
              <WhatsAppLink className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close BOOKFLO chat" : "Open BOOKFLO chat"}
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-bf-accent px-4 text-sm font-medium text-white shadow-lift transition hover:bg-[#6b4a68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bf-accent"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <>
            <MessageCircle className="h-5 w-5" aria-hidden />
            <span className="pr-0.5">Chat</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
