import type { CSSProperties, MouseEvent } from "react";
import { cn } from "@/lib/cn";
import type { CardMeta } from "@/components/one/content";
import { Doodle } from "@/components/one/Doodles";

interface Props {
  meta: CardMeta;
  className?: string;
  /** حجم العبارة: كبيرٌ للبطاقات العريضة والطويلة */
  big?: boolean;
  index?: number;
  lifted?: boolean;
  onOpen: (el: HTMLElement) => void;
}

/**
 * بطاقة على نسق المرجع: تسميةٌ صغيرة في الأعلى وعبارةٌ كبيرة في الأسفل.
 * ثلاثة أشكال: صورة، ونصّ داكن، وإحصائيّة برقمٍ كبير في الوسط.
 */
export function Card({ meta, className, big, index = 0, lifted, onOpen }: Props) {
  return (
    <button
      type="button"
      id={meta.id}
      onClick={(e: MouseEvent<HTMLButtonElement>) => onOpen(e.currentTarget)}
      aria-label={meta.window}
      style={{ "--rise-delay": `${index * 70}ms` } as CSSProperties}
      className={cn(
        "rise grain vignette group relative isolate flex min-h-[11rem] flex-col overflow-hidden rounded-[9px] p-5 text-start ring-1 ring-white/[0.14] transition-[transform,box-shadow] light:ring-ink/10 duration-500 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light lg:p-6",
        meta.variant === "photo" ? "justify-end bg-[#15181a]" : "justify-end bg-white/[0.07] backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] light:bg-white/60 light:shadow-none",
        lifted && "invisible",
        className,
      )}
    >
      {meta.img && meta.variant !== "text" && (
        <>
          <img
            src={meta.img}
            alt=""
            aria-hidden
            className={cn(
              "absolute inset-0 -z-20 size-full drift object-cover brightness-[0.8] saturate-[0.8]",
              meta.focus,
            )}
          />
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 -z-10 bg-gradient-to-t from-[#0e1113]/95 via-[#0e1113]/45 to-transparent",
            )}
          />
        </>
      )}

      {meta.variant === "text" && (
        <>
          {/* أضواءٌ ناعمة خلف الزجاج كي يظهر التمويه */}
          <span aria-hidden className="pointer-events-none absolute -end-10 -top-12 -z-20 size-44 rounded-full bg-gold/30 blur-3xl light:bg-gold/25" />
          <span aria-hidden className="pointer-events-none absolute -bottom-14 -start-10 -z-20 size-48 rounded-full bg-[#3e8299]/25 blur-3xl light:bg-[#d6bc80]/30" />
          <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 text-white/[0.09] light:text-ink/[0.08]">
            <Doodle id={meta.id} />
          </span>
        </>
      )}

      {meta.variant === "text" ? (
        <span className="block max-w-[24ch]">
          {meta.numeral ? (
            <span className="flex items-baseline gap-2 text-white light:text-ink">
              <span className="tabular text-[3.4rem] leading-none tracking-tight lg:text-[3.9rem]">{meta.numeral.value}</span>
              <span className="text-[1.15rem] leading-none lg:text-[1.3rem]">{meta.numeral.unit}</span>
            </span>
          ) : meta.title ? (
            <span className="block text-[1.15rem] leading-[1.35] text-white light:text-ink lg:text-[1.3rem]">{meta.title}</span>
          ) : null}
          <span className="mt-2 block text-pretty text-[13.5px] leading-[1.75] text-[#ece2c8]/75 light:text-ink-600">{meta.statement}</span>
        </span>
      ) : meta.variant === "stat" && meta.stat ? (
        <span className="block max-w-[26ch]">
          {meta.stat.prefix && <span className="mb-1.5 block text-[13.5px] leading-none text-gold-light">{meta.stat.prefix}</span>}
          <span className="flex items-baseline gap-2 text-white">
            <span className="tabular text-[3.4rem] leading-none lg:text-[3.9rem]">{meta.stat.value}</span>
            <span className="text-[1.15rem] leading-none lg:text-[1.3rem]">{meta.stat.unit}</span>
          </span>
          <span className="mt-2 block text-pretty text-[13.5px] leading-[1.75] text-[#ece2c8]/75">{meta.stat.caption}</span>
        </span>
      ) : (
        <>

          <span
            className={cn(
              "block whitespace-pre-line text-balance leading-[1.45] text-white",
              big ? "text-[1.2rem] lg:text-[1.35rem]" : "text-[1rem] lg:text-[1.05rem]",
            )}
          >
            {meta.statement}
          </span>
        </>
      )}
    </button>
  );
}
