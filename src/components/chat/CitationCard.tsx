import clsx from "clsx";
import { BookOpenText, ChevronDown, CalendarClock, MapPin, Users } from "lucide-react";
import type { Citation } from "../../types";

function Chips({ icon, label, items }: { icon: React.ReactNode; label: string; items: string[] }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] text-ink-muted">
        {icon}
        {label} <span className="tabular">({items.length})</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span
            key={t}
            className="rounded-md bg-paper-sunken/70 px-2 py-[3px] text-[11px] text-ink-soft"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * بطاقة الإسناد. مطويّة تعرض الكتاب والباب والمؤلّف وموضع النصّ؛
 * مفتوحةً تعرض المقطع المسترجَع حرفيًّا ثم الكيانات والحواشي.
 */
export function CitationCard({
  citation,
  open,
  onToggle,
}: {
  citation: Citation;
  open: boolean;
  onToggle: () => void;
}) {
  const locus = [
    citation.volume && `ج ${citation.volume}`,
    citation.page && `ص ${citation.page}`,
    citation.hadithNumber && `حديث ${citation.hadithNumber}`,
  ].filter(Boolean).join(" · ");

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-xl bg-paper-raised ring-1 transition-all duration-200",
        open
          ? "shadow-card ring-gold/35"
          : "ring-ink/[0.07] hover:shadow-card hover:ring-gold/25",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-2.5 p-3.5 text-start"
      >
        <BookOpenText size={16} strokeWidth={1.75} className="mt-px shrink-0 text-gold" />
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-semibold leading-snug text-ink">
            {citation.book}
          </span>
          <span className="mt-0.5 block text-[11px] leading-relaxed text-ink-muted">
            {citation.chapter && <>{citation.chapter} · </>}
            {citation.author}
          </span>
        </span>
        {locus && (
          <span className="tabular shrink-0 text-[11px] text-ink-muted">{locus}</span>
        )}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          className={clsx(
            "mt-1 shrink-0 text-ink-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="border-t border-ink/[0.06] px-3.5 pb-4 pt-3.5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
          {citation.excerpt && (
            <div className="md:flex-1">
              <p className="mb-1.5 text-[11px] text-ink-muted">مقطع مسترجَع</p>
              <blockquote className="rounded-lg border-s-2 border-gold bg-paper-sunken/60 px-3.5 py-3 text-[13.5px] leading-[2] text-ink-soft">
                {citation.excerpt}
              </blockquote>
            </div>
          )}

          <div className="flex flex-col gap-4 md:w-[38%] md:shrink-0">
          {citation.persons?.length ? (
            <Chips icon={<Users size={14} strokeWidth={1.75} />} label="الأشخاص" items={citation.persons} />
          ) : null}
          {citation.places?.length ? (
            <Chips icon={<MapPin size={14} strokeWidth={1.75} />} label="الأماكن" items={citation.places} />
          ) : null}
          {citation.events?.length ? (
            <Chips icon={<CalendarClock size={14} strokeWidth={1.75} />} label="الأحداث" items={citation.events} />
          ) : null}

          {citation.footnotes?.length ? (
            <div>
              <p className="mb-1.5 text-[11px] text-ink-muted">الحواشي</p>
              <ol className="flex flex-col gap-1 text-[12.5px] leading-relaxed text-ink-muted">
                {citation.footnotes.map((f, i) => (
                  <li key={f} className="flex gap-2">
                    <span className="tabular shrink-0 text-gold">({i + 1})</span>
                    {f}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
