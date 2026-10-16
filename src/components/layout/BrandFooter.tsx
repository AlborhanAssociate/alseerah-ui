import { Link } from "react-router-dom";
import { ArrowUpLeft, Globe, Mail } from "lucide-react";
import { CARDS, type CardId } from "@/components/one/content";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/cn";

/**
 * تذييل المنصّة بهويّة جمعيّة البرهان: شعار الجمعيّة وتعريفٌ موجز، ثمّ روابط المنصّة
 * والأقسام والتواصل، ثمّ شريط الحقوق. ألوانه من الرموز فيتبدّل مع النمط.
 * onExplore — على صفحة الهبوط تفتح روابطُ «استكشِف» نافذةَ القسم مباشرةً؛ وفي غيرها تنتقل إلى /#القسم.
 * wide — بعرض أقسام /classic (max-w-6xl) كي تتحاذى حوافّ التذييل مع حوافّ الصفحة.
 * dark — داخل كتلةٍ داكنة ثابتة اللون (خلفيّتها من الحاوية): نصوصٌ فاتحة وشعار الجمعيّة الأبيض وحدودٌ بيضاء خافتة.
 */
export function BrandFooter({ onExplore, wide, dark, className }: { onExplore?: (id: CardId) => void; wide?: boolean; dark?: boolean; className?: string }) {
  const base = import.meta.env.BASE_URL;
  const link = dark ? "text-[13.5px] text-white/60 transition-colors hover:text-white" : "text-[13.5px] text-ink-600 transition-colors hover:text-gold";
  const heading = cn("text-[12.5px] font-medium", dark ? "text-gold-400" : "text-gold");
  const icon = cn("size-4 shrink-0", dark ? "text-white/40" : "text-ink-muted");
  const frame = wide ? "max-w-6xl px-5 lg:px-8" : "max-w-5xl px-5 lg:px-0";

  return (
    <footer className={cn("relative shrink-0", dark ? "bg-black/30 text-white" : "border-t border-line bg-paper-panel/70 backdrop-blur-md", className)}>
      {/* شعيرةٌ علويّة: بلونَي الجمعيّة في الفاتح، وخطٌّ أبيض خافت بعرض المحتوى في الداكن */}
      {dark ? (
        <span aria-hidden className={cn("mx-auto block h-px bg-gradient-to-l from-transparent via-white/15 to-transparent", wide ? "max-w-6xl" : "max-w-5xl")} />
      ) : (
        <span aria-hidden className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-l from-transparent via-gold-600 to-transparent" />
      )}

      <div className={cn("mx-auto grid w-full gap-8 py-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6", frame)}>
        {/* الجمعيّة */}
        <div className="sm:col-span-2 lg:col-span-5">
          {/* شعار السيرة، ثمّ فاصلٌ رفيع، ثمّ «إحدى مبادرات» وشعار الجمعيّة */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link to="/" aria-label="السيرة ai — الصفحة الرئيسيّة" className={cn("transition-opacity hover:opacity-85", dark && "[&_[data-wordmark]_path]:fill-white")}>
              <Logo className="h-11 w-auto" />
            </Link>
            <span aria-hidden className={cn("h-10 w-px", dark ? "bg-white/15" : "bg-ink/10")} />
            <a href="https://alborhan.sa" target="_blank" rel="noreferrer" aria-label="جمعية البرهان لخدمة السُنّة والقرآن" className="inline-flex items-center gap-3 transition-opacity hover:opacity-85">
              {/* «إحدى مبادرات» ثمّ الشعار؛ اسم الجمعيّة في الشعار نفسه فلا يُكرَّر نصّاً */}
              <span className={cn("text-[12.5px]", dark ? "text-white/50" : "text-ink-muted")}>إحدى مبادرات</span>
              <img src={`${base}alborhan-white.png`} alt="جمعية البرهان لخدمة السُنّة والقرآن" className={cn("h-12 w-auto", !dark && "light:hidden")} />
              {!dark && <img src={`${base}alborhan.svg`} alt="جمعية البرهان لخدمة السُنّة والقرآن" className="hidden h-12 w-auto light:block" />}
            </a>
          </div>
          <p className={cn("mt-4 max-w-sm text-pretty text-[13px] leading-7", dark ? "text-white/55" : "text-ink-600")}>
            «السيرة ai» منصّةٌ علميّة تُجيب عن أسئلة السيرة النبويّة من أمّهات كتبها، وتعزو كلّ جوابٍ إلى كتابه وصفحته.
          </p>
        </div>

        {/* المنصّة */}
        <nav aria-label="المنصّة" className="lg:col-span-2">
          <h2 className={heading}>المنصّة</h2>
          <ul className="mt-3 space-y-2">
            <li><Link to="/chat" className={link}>ابدأ محادثة</Link></li>
            <li><Link to="/login" className={link}>تسجيل الدخول</Link></li>
            <li><Link to="/" className={link}>الصفحة الرئيسيّة</Link></li>
          </ul>
        </nav>

        {/* الأقسام */}
        <nav aria-label="استكشِف" className="lg:col-span-2">
          <h2 className={heading}>استكشِف</h2>
          <ul className="mt-3 space-y-2">
            {CARDS.map((c) => (
              <li key={c.id}>
                {onExplore ? (
                  <button type="button" onClick={() => onExplore(c.id)} className={link}>{c.label}</button>
                ) : (
                  <Link to={`/#${c.id}`} className={link}>{c.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* التواصل */}
        <div className="lg:col-span-3">
          <h2 className={heading}>تواصَل</h2>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a href="mailto:info@alborhan.sa" className={cn(link, "inline-flex items-center gap-2")}>
                <Mail className={icon} strokeWidth={1.75} aria-hidden />
                <span dir="ltr">info@alborhan.sa</span>
              </a>
            </li>
            <li>
              <a href="https://alborhan.sa" target="_blank" rel="noreferrer" className={cn(link, "group inline-flex items-center gap-2")}>
                <Globe className={icon} strokeWidth={1.75} aria-hidden />
                <span dir="ltr">alborhan.sa</span>
                <ArrowUpLeft className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.75} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* شريط الحقوق */}
      <div className={cn("border-t", dark ? "border-white/10" : "border-line-soft")}>
        <div className={cn("mx-auto flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 text-[12px]", dark ? "text-white/45" : "text-ink-muted", frame)}>
          <p className="flex items-center gap-2.5">
            {/* معيّنٌ برتقاليّ كمعيّنَي شعار الجمعيّة */}
            <span aria-hidden className="size-2 rotate-45 bg-gold-600" />
            <span>© <span className="tabular">2026</span> جمعية البرهان لخدمة السُنّة والقرآن. جميع الحقوق محفوظة.</span>
          </p>
          <nav aria-label="روابط قانونيّة" className="flex items-center gap-5">
            <Link to="/terms" className={cn("transition-colors", dark ? "hover:text-white" : "hover:text-ink")}>شروط الاستخدام</Link>
            <Link to="/privacy" className={cn("transition-colors", dark ? "hover:text-white" : "hover:text-ink")}>سياسة الخصوصيّة</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
