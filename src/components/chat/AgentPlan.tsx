import { useState } from "react";
import clsx from "clsx";
import { Check, ChevronDown, ListChecks, Loader2 } from "lucide-react";
import { Tag } from "../ui/primitives";
import type { PlanStep } from "../../types";

/**
 * خطوات الإجابة — مطويّة حين تنتهي، مفتوحة أثناء العمل.
 * رأسها يحمل الحصيلة، فلا يحتاج القارئ لفتحها ليعرف ماذا جرى.
 */
export function AgentPlan({ steps, running }: { steps: PlanStep[]; running?: boolean }) {
  const [open, setOpen] = useState(Boolean(running));
  const sources = steps.find((s) => s.id === "cite")?.tag;
  const length = steps.find((s) => s.id === "compose")?.tag;

  return (
    <div className="overflow-hidden rounded-xl bg-paper-sunken/50 ring-1 ring-ink/[0.06]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[12.5px] text-gold transition-colors hover:bg-paper-sunken"
      >
        {running ? (
          <Loader2 size={14} strokeWidth={1.75} className="animate-spin" />
        ) : (
          <ListChecks size={14} strokeWidth={1.75} />
        )}
        <span className="font-medium">{running ? "جارٍ إعداد الإجابة" : "خطوات الإجابة"}</span>
        <span className="flex-1" />
        {!running && sources && <Tag>{sources}</Tag>}
        {!running && length && <Tag>{length}</Tag>}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          className={clsx("text-ink-muted transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul className="border-t border-ink/[0.05] px-3.5 pb-3 pt-1.5">
          {steps.map((step) => (
            <li key={step.id} className="flex items-center gap-2.5 py-1.5 text-[12.5px] text-ink-soft">
              <span className="grid w-3.5 shrink-0 place-items-center">
                {step.status === "running" ? (
                  <Loader2 size={14} strokeWidth={1.75} className="animate-spin text-gold" />
                ) : step.status === "done" ? (
                  <Check size={14} strokeWidth={2.25} className="text-ink-mid" />
                ) : (
                  <span aria-hidden className="size-1.5 rounded-full bg-line" />
                )}
              </span>
              {step.label}
              <span className="flex-1" />
              {step.tag && <Tag className="tabular">{step.tag}</Tag>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
