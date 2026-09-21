import { useEffect, useMemo, useRef, useState } from "react";
import { ChatComposer } from "./ChatComposer";
import { ChatSidebar } from "./ChatSidebar";
import { ChatThread } from "./ChatThread";
import { MobileBar } from "./MobileBar";
import { WelcomeState } from "./WelcomeState";
import { messages as seedMessages, sessions } from "../../data/conversation";
import type { Message } from "../../types";
import { takePendingQuestion } from "@/lib/pendingQuestion";

/**
 * الشاشة الوحيدة. هي الطبقة الوحيدة التي ستعرف الخادم عند النقل؛
 * كلّ ما تحتها يستقبل بيانات ويصدر أحداثًا فقط.
 */
export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [activeId, setActiveId] = useState(sessions[0].id);
  const [collapsed, setCollapsed] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (query.trim() ? sessions.filter((s) => s.title.includes(query.trim())) : sessions),
    [query],
  );

  const title = sessions.find((s) => s.id === activeId)?.title ?? "محادثة جديدة";

  /* سؤالٌ قادم من صفحة الهبوط: يفتح محادثةً جديدة به مباشرة */
  useEffect(() => {
    const q = takePendingQuestion();
    if (q) setMessages([{ id: `m${Date.now()}`, role: "user", text: q }]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setNavOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [navOpen]);

  function send(text?: string) {
    const value = (text ?? draft).trim();
    if (!value) return;
    setMessages((prev) => [...prev, { id: `m${Date.now()}`, role: "user", text: value }]);
    setDraft("");
  }

  function startNew() {
    setMessages([]);
    setNavOpen(false);
  }

  return (
    <div className="ambient relative flex h-svh w-full overflow-hidden bg-paper">
        {/* الشريط الجانبيّ — سطح المكتب */}
        <div className="relative z-10 hidden lg:flex">
          <ChatSidebar
            sessions={filtered}
            activeId={activeId}
            collapsed={collapsed}
            query={query}
            onQuery={setQuery}
            onSelect={setActiveId}
            onNew={startNew}
            onToggle={() => setCollapsed((v) => !v)}
          />
        </div>

        {/* الشريط الجانبيّ — درج الجوّال */}
        {navOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              type="button"
              aria-label="إغلاق القائمة"
              onClick={() => setNavOpen(false)}
              className="absolute inset-0 bg-ink/25 backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 end-0 flex max-w-[86vw] shadow-app">
              <ChatSidebar
                sessions={filtered}
                activeId={activeId}
                collapsed={false}
                    query={query}
                onQuery={setQuery}
                onSelect={(id) => { setActiveId(id); setNavOpen(false); }}
                onNew={startNew}
                onToggle={() => setNavOpen(false)}
              />
            </div>
          </div>
        )}

        <main className="relative z-10 flex min-w-0 flex-1 flex-col">
          <MobileBar title={title} onNew={startNew} onOpenNav={() => setNavOpen(true)} />

          <div
            className={
              "flex min-h-0 flex-1 flex-col overflow-y-auto" +
              (messages.length > 0 ? " fade-to-composer" : "")
            }
          >
            {messages.length === 0 ? (
              <WelcomeState onPick={(q) => send(q)} />
            ) : (
              <ChatThread messages={messages} />
            )}
            <div ref={endRef} />
          </div>

          <ChatComposer value={draft} onChange={setDraft} onSend={() => send()} />
      </main>
    </div>
  );
}
