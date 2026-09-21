import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Bell, ChevronUp, CircleUserRound, House, LogOut, MessageSquareText,
  PanelRightClose, PanelRightOpen, Search, SquarePen, X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../ui/Avatar";
import { ThemeButton } from "../ui/ThemeButton";
import { Logo } from "../brand/Logo";
import { signOut } from "../../auth/session";
import { currentUser } from "../../data/user";
import type { Session } from "../../types";

const GROUP_LABEL: Record<Session["group"], string> = {
  today: "اليوم",
  yesterday: "أمس",
  week: "آخر ٧ أيام",
  month: "آخر ٣٠ يومًا",
  older: "أقدم",
};

const ORDER: Session["group"][] = ["today", "yesterday", "week", "month", "older"];

interface Props {
  sessions: Session[];
  activeId: string;
  collapsed: boolean;
  query: string;
  onQuery: (q: string) => void;
  onSelect: (id: string) => void;
  onNew: () => void;
  onToggle: () => void;
}


/** بطاقة الحساب — تفتح قائمة التنقّل العامّ فوقها */
function AccountCard({ name, email, avatar }: { name: string; email: string; avatar?: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ITEMS = [
    { label: "الرئيسية", Icon: House, danger: false, run: () => navigate("/") },
    { label: "الملف الشخصيّ", Icon: CircleUserRound, danger: false, run: () => {} },
    { label: "تسجيل الخروج", Icon: LogOut, danger: true, run: () => { signOut(); navigate("/"); } },
  ];

  return (
    <div ref={root} className="relative shrink-0">
      {open && (
        <div
          role="menu"
          className="absolute bottom-full inset-x-0 z-20 mb-1.5 overflow-hidden rounded-xl bg-paper-raised p-1 shadow-card ring-1 ring-ink/[0.07]"
        >
          {ITEMS.map(({ label, Icon, danger, run }) => (
            <button
              key={label}
              type="button"
              role="menuitem"
              onClick={() => { setOpen(false); run(); }}
              className={clsx(
                "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-start text-[12.5px] transition-colors",
                danger
                  ? "text-sepia hover:bg-sepia/10"
                  : "text-ink-soft hover:bg-paper-sunken hover:text-ink",
              )}
            >
              <Icon size={14} strokeWidth={1.75} />
              {label}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={clsx(
          "flex w-full items-center gap-2.5 rounded-xl bg-paper-raised p-2 text-start ring-1 transition-all duration-200",
          open
            ? "shadow-card ring-gold/35"
            : "ring-ink/[0.07] hover:shadow-card hover:ring-gold/25",
        )}
      >
        <Avatar name={name} src={avatar} size={32} />
        <span className="min-w-0 flex-1">
          <span className="block text-[13.5px] font-semibold leading-tight text-ink">{name}</span>
          <span className="tabular block truncate text-right text-[11px] text-ink-muted">{email}</span>
        </span>
        <ChevronUp
          size={14}
          strokeWidth={1.75}
          className={clsx("shrink-0 text-ink-muted transition-transform duration-200", open && "rotate-180")}
        />
      </button>
    </div>
  );
}

/**
 * الشريط الجانبيّ: هويّة · بدء · بحث · المحادثات · الحساب.
 * لا تنقّل ظاهر — القائمة تأخذ كل المساحة، والتنقّل العامّ من بطاقة الحساب.
 */
export function ChatSidebar({
  sessions, activeId, collapsed, query, onQuery, onSelect, onNew, onToggle,
}: Props) {
  const [searching, setSearching] = useState(false);

  const groups = ORDER
    .map((group) => ({ group, items: sessions.filter((s) => s.group === group) }))
    .filter((g) => g.items.length > 0);

  /* ── المسار الأيقونيّ عند الطيّ ── */
  if (collapsed) {
    return (
      <aside className="flex w-16 flex-col items-center gap-3 border-s border-line bg-paper-panel py-4">
        <Link to="/" aria-label="السيرة ai — الصفحة الرئيسيّة" className="rounded-lg transition-opacity hover:opacity-80">
          <img src={`${import.meta.env.BASE_URL}logo-mark.svg`} alt="" className="size-9" />
        </Link>
        <button
          type="button" onClick={onToggle}
          aria-label="فتح الشريط الجانبيّ" title="فتح الشريط الجانبيّ"
          className="grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-sunken"
        >
          <PanelRightOpen size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button" onClick={onNew}
          aria-label="محادثة جديدة" title="محادثة جديدة"
          className="grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-sand/45"
        >
          <SquarePen size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button" onClick={onToggle}
          aria-label="البحث في المحادثات" title="البحث في المحادثات"
          className="grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-sunken"
        >
          <Search size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="الإشعارات" title="الإشعارات"
          className="grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-sunken"
        >
          <Bell size={18} strokeWidth={1.75} />
        </button>
        <ThemeButton size={18} className="size-9 text-ink-soft hover:bg-paper-sunken" />

        <span className="flex-1" />

        <button type="button" aria-label={currentUser.name} title={currentUser.name}>
          <Avatar name={currentUser.name} src={currentUser.avatar} size={34} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="flex w-[260px] flex-col gap-3 border-s border-line bg-paper-panel p-3.5 xl:w-[272px]">
      {/* الهويّة */}
      <div className="mb-4 flex items-center justify-between px-1 pt-1">
        <Link to="/" aria-label="السيرة ai — الصفحة الرئيسيّة" className="rounded-lg transition-opacity hover:opacity-80">
          <Logo className="h-9 dark:[&_[data-wordmark]_path]:fill-white" />
        </Link>
        <div className="flex items-center gap-0.5">
          <button
            type="button" aria-label="الإشعارات" title="الإشعارات"
            className="grid size-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-paper-sunken hover:text-ink-soft"
          >
            <Bell size={16} strokeWidth={1.75} />
          </button>
          <ThemeButton size={16} className="size-8 text-ink-muted hover:bg-paper-sunken hover:text-ink-soft" />
          <button
            type="button" onClick={onToggle}
            aria-label="طيّ الشريط الجانبيّ" title="طيّ الشريط الجانبيّ"
            className="grid size-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-paper-sunken hover:text-ink-soft"
          >
            <PanelRightClose size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* البدء والبحث — صفّان بأيقونة وعنوان */}
      <div className="flex shrink-0 flex-col gap-0.5">
        <button
          type="button"
          onClick={onNew}
          className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13.5px] font-medium text-ink transition-colors hover:bg-sand/45"
        >
          <SquarePen size={18} strokeWidth={1.75} className="shrink-0 text-ink-soft" />
          محادثة جديدة
        </button>

        {searching ? (
          <div className="flex h-10 items-center gap-3 rounded-lg bg-sand/45 px-3">
            <Search size={18} strokeWidth={1.75} className="shrink-0 text-ink-soft" />
            <input
              autoFocus
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  onQuery("");
                  setSearching(false);
                }
              }}
              placeholder="ابحث في المحادثات"
              aria-label="البحث في المحادثات"
              className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:font-normal placeholder:text-ink-muted"
            />
            <button
              type="button"
              onClick={() => { onQuery(""); setSearching(false); }}
              aria-label="إغلاق البحث"
              className="grid size-5 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-paper-raised hover:text-ink"
            >
              <X size={14} strokeWidth={1.75} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSearching(true)}
            className="flex h-10 items-center gap-3 rounded-lg px-3 text-[13.5px] font-medium text-ink transition-colors hover:bg-sand/45"
          >
            <Search size={18} strokeWidth={1.75} className="shrink-0 text-ink-soft" />
            البحث في المحادثات
          </button>
        )}
      </div>

      {/* المحادثات — كل المساحة المتبقّية */}
      <div className="relative -mx-1 min-h-0 flex-1">
        <div className="flex h-full flex-col gap-3 overflow-y-auto px-1 pb-3">
          {groups.length === 0 && (
            <p className="px-3 py-6 text-center text-[12.5px] text-ink-muted">
              لا توجد محادثات مطابقة
            </p>
          )}
          {groups.map(({ group, items }) => (
            <div key={group} className="flex flex-col gap-0.5">
              <p className="sticky top-0 z-10 -mx-1 bg-paper-panel px-4 pb-1.5 pt-2 text-[11px] font-medium text-ink-muted">
                {GROUP_LABEL[group]}
              </p>
              {items.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelect(s.id)}
                  title={s.title}
                  aria-current={s.id === activeId ? "page" : undefined}
                  className={clsx(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start text-[13.5px] transition-colors",
                    s.id === activeId
                      ? "bg-sand/70 font-medium text-ink"
                      : "text-ink-soft hover:bg-sand/35",
                  )}
                >
                  <span className="truncate">{s.title}</span>
                  {s.id === activeId && (
                    <MessageSquareText
                      size={14}
                      strokeWidth={1.75}
                      aria-hidden
                      className="ms-auto shrink-0 text-gold"
                    />
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-paper-panel to-transparent"
        />
      </div>

      {/* الحساب */}
      <AccountCard name={currentUser.name} email={currentUser.email} avatar={currentUser.avatar} />
    </aside>
  );
}
