import type { MouseEvent } from "react";

/** يحدّث موضع ضوء المؤشّر (--mx و--my) على العنصر نفسه؛ تستعمله طبقة .spotlight داخله */
export function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}
