import clsx from "clsx";
import type { ReactNode } from "react";

/** بدائيّات مشتركة — كبسولات وأزرار أيقونيّة وشارات */

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "rounded-md bg-paper-raised px-2 py-[3px] ring-1 ring-ink/[0.06]",
        "text-[11px] text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2.5 flex items-center gap-3 text-[11px] text-ink-muted">
      {children}
      <span aria-hidden className="h-px flex-1 bg-line-soft" />
    </div>
  );
}
