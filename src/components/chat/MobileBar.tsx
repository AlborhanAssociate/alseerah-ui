import { Menu, Plus } from "lucide-react";

/**
 * شريط الجوّال فقط. على سطح المكتب لا ترويسة على لوحة المحادثة —
 * كلّ أدوات المحادثة تسكن الشريط الجانبيّ.
 */
export function MobileBar({ title, onNew, onOpenNav }: {
  title: string;
  onNew: () => void;
  onOpenNav: () => void;
}) {
  return (
    <header className="flex items-center gap-2 border-b border-line-soft px-3 py-2.5 lg:hidden">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="فتح القائمة"
        className="grid size-10 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-sunken"
      >
        <Menu size={18} strokeWidth={1.75} />
      </button>
      <h1 className="min-w-0 flex-1 truncate text-center text-[13.5px] font-semibold text-ink">
        {title}
      </h1>
      <button
        type="button"
        onClick={onNew}
        aria-label="محادثة جديدة"
        className="grid size-10 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-paper-sunken"
      >
        <Plus size={18} strokeWidth={1.75} />
      </button>
    </header>
  );
}
