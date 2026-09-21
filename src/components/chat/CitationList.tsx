import { useState } from "react";
import { SectionLabel } from "../ui/primitives";
import { CitationCard } from "./CitationCard";
import type { Citation } from "../../types";

/**
 * قائمة المصادر — بطاقة تحت أخرى بعرض كامل.
 * تملك حالة الفتح كي لا تُفتح أكثر من بطاقة معًا.
 */
export function CitationList({ citations }: { citations: Citation[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section>
      <SectionLabel>المصادر</SectionLabel>
      <div className="flex flex-col gap-2">
        {citations.map((c) => (
          <CitationCard
            key={c.id}
            citation={c}
            open={openId === c.id}
            onToggle={() => setOpenId((id) => (id === c.id ? null : c.id))}
          />
        ))}
      </div>
    </section>
  );
}
