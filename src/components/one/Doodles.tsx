import type { CardId } from "@/components/one/content";

/**
 * نمطٌ تجريديّ خفيف للبطاقات النصّيّة: خطوطٌ كنتوريّة كخرائط التضاريس،
 * دوائرٌ بيضويّة متداخلة بدورانٍ وأحجامٍ مختلفة، بلا معنى مقصود.
 */
const STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 0.9 } as const;

function Contours({ cx, cy, n, rx, ry, rot, step }: { cx: number; cy: number; n: number; rx: number; ry: number; rot: number; step: number }) {
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rx + i * step} ry={ry + i * step * 0.72} opacity={1 - i / (n + 2)} />
      ))}
    </g>
  );
}

const VARIANTS: Record<string, { cx: number; cy: number; n: number; rx: number; ry: number; rot: number; step: number }[]> = {
  notdo: [
    { cx: 250, cy: 40, n: 7, rx: 18, ry: 10, rot: -18, step: 13 },
    { cx: 60, cy: 150, n: 6, rx: 14, ry: 9, rot: 24, step: 15 },
    { cx: 300, cy: 200, n: 4, rx: 10, ry: 6, rot: 8, step: 12 },
  ],
  timeline: [
    { cx: 70, cy: 50, n: 7, rx: 16, ry: 9, rot: 16, step: 14 },
    { cx: 270, cy: 130, n: 6, rx: 20, ry: 12, rot: -26, step: 13 },
    { cx: 140, cy: 210, n: 4, rx: 10, ry: 6, rot: 40, step: 12 },
  ],
};

export function Doodle({ id }: { id: CardId }) {
  const set = VARIANTS[id];
  if (!set) return null;
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden {...STROKE}>
      {set.map((c, i) => <Contours key={i} {...c} />)}
    </svg>
  );
}
