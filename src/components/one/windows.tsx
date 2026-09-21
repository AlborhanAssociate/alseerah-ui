import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { FEATURES, NOTDO, SOURCES, TIMELINE } from "@/components/one/content";

/**
 * محتوى النوافذ الأربع بصيغةٍ واحدة: نصٌّ منسَّق في عمودٍ مقروء،
 * تمهيدٌ قصير ثمّ مداخل، لكلّ مدخلٍ سطرُ عنوان وفقرة، تفصل بينها شعيراتٌ رفيعة.
 */

function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-2xl">{children}</div>;
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="text-pretty text-[15.5px] leading-8 text-[#ece2c8]/85 light:text-ink-700">{children}</p>;
}

function Entries({ children }: { children: ReactNode }) {
  return <dl className="mt-6 divide-y divide-white/10 light:divide-ink/10">{children}</dl>;
}

function Entry({ n, title, kicker, children }: { n?: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-x-4 sm:gap-y-1">
      <dt className="contents">
        {n ? <span className="tabular text-[1.25rem] leading-none text-gold-light/80 light:text-gold sm:pt-1">{n}</span> : <span className="hidden sm:block" />}
        <span className="text-[17px] leading-snug text-white light:text-ink">
          {title}
          {kicker && <span className="ms-2 text-[12.5px] text-gold-light light:text-gold">{kicker}</span>}
        </span>
      </dt>
      <dd className="text-pretty text-[14.5px] leading-8 text-[#ece2c8]/75 light:text-ink-600 sm:col-start-2">{children}</dd>
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="mt-10 text-[13px] text-gold-light light:text-gold">{children}</h3>;
}

const AR = ["١", "٢", "٣", "٤", "٥", "٦"];

export function FeaturesWindow() {
  return (
    <Prose>
      <Lead>ستّ قدراتٍ تجمعها محادثةٌ واحدة، كلّها تعود بك إلى المصدر.</Lead>
      <Entries>
        {FEATURES.map((f, i) => (
          <Entry key={f.title} n={AR[i]} title={f.title}>{f.desc}</Entry>
        ))}
      </Entries>
    </Prose>
  );
}

export function TimelineWindow() {
  return (
    <Prose>
      <Lead>ثلاثٌ وعشرون سنةً من المولد الشريف إلى حجّة الوداع، في خمس مراحلٍ يتصفّحها الباحث مرحلةً مرحلة.</Lead>
      <Entries>
        {TIMELINE.map((s, i) => (
          <Entry key={s.name} n={AR[i]} title={s.name} kicker={s.phase}>{s.desc}</Entry>
        ))}
      </Entries>
    </Prose>
  );
}

export function SourcesWindow() {
  return (
    <Prose>
      <Lead>{SOURCES.intro}</Lead>
      <Entries>
        {SOURCES.books.map((b, i) => (
          <Entry key={b.title} n={AR[i]} title={b.title}>{b.desc}</Entry>
        ))}
      </Entries>

      <Heading>وكلّ جوابٍ له سند</Heading>
      <blockquote className="mt-3 border-s-2 border-gold-light/60 light:border-gold/60 ps-4 text-[16px] leading-8 text-white light:text-ink">
        {SOURCES.hadith}
        <footer className="mt-1.5 text-[12.5px] text-[#ece2c8]/60 light:text-ink-500">
          {SOURCES.tags[0]} · {SOURCES.tags[1]} · <span className="text-gold-light light:text-gold">{SOURCES.tags[2]}</span>
        </footer>
      </blockquote>
      <Entries>
        {SOURCES.points.map((p, i) => (
          <div key={p} className="flex gap-4 py-3.5 first:pt-5 last:pb-0">
            <span className="tabular w-[3.5rem] shrink-0 text-[1rem] leading-8 text-gold-light/80 light:text-gold">{AR[i]}</span>
            <p className="text-[14.5px] leading-8 text-[#ece2c8]/75 light:text-ink-600">{p}</p>
          </div>
        ))}
      </Entries>
    </Prose>
  );
}

export function NotDoWindow() {
  return (
    <Prose>
      <Lead>ستّةُ التزاماتٍ بصيغة النفي، لأنّ الوعد بما لا نفعله أوضح من تعداد ما نفعله.</Lead>
      <Entries>
        {NOTDO.map((p, i) => (
          <Entry key={p.no} n={AR[i]} title={p.no}>{p.desc}</Entry>
        ))}
      </Entries>
      <a
        href="mailto:info@alborhan.sa"
        className="mt-10 inline-flex items-center gap-2 text-[14.5px] text-[#ece2c8]/80 underline decoration-white/25 light:text-ink-700 light:decoration-ink/25 underline-offset-[6px] transition-colors hover:text-white light:hover:text-ink"
      >
        <Mail className="size-4" strokeWidth={1.75} aria-hidden />
        تواصَل مع الفريق العلميّ
      </a>
    </Prose>
  );
}
