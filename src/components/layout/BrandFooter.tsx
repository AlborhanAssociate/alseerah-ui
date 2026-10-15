import { Link } from "react-router-dom";
import { ArrowUpLeft, Globe, Mail } from "lucide-react";
import { CARDS, type CardId } from "@/components/one/content";
import { cn } from "@/lib/cn";

/**
 * تذييل المنصّة بهويّة جمعيّة البرهان: شعار الجمعيّة وتعريفٌ موجز، ثمّ روابط المنصّة
 * والأقسام والتواصل، ثمّ شريط الحقوق. ألوانه من الرموز فيتبدّل مع النمط.
 * onExplore — على صفحة الهبوط تفتح روابطُ «استكشِف» نافذةَ القسم مباشرةً؛ وفي غيرها تنتقل إلى /#القسم.
 */
export function BrandFooter({ onExplore, className }: { onExplore?: (id: CardId) => void; className?: string }) {
  const base = import.meta.env.BASE_URL;
  const link = "text-[13.5px] text-ink-600 transition-colors hover:text-gold";

  return (
    <footer className={cn("relative shrink-0 border-t border-line bg-paper-panel/70 backdrop-blur-md", className)}>
      {/* شعيرةٌ علويّة بلونَي الجمعيّة */}
      <span aria-hidden className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-l from-transparent via-gold-600 to-transparent" />

      <div className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-7 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6 lg:px-0">
        {/* الجمعيّة */}
        <div className="sm:col-span-2 lg:col-span-5">
          <a href="https://alborhan.sa" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3.5 transition-opacity hover:opacity-85">
            <img src={`${base}alborhan-white.png`} alt="جمعية البرهان لخدمة السُنّة والقرآن" className="h-12 w-auto light:hidden" />
            <img src={`${base}alborhan.svg`} alt="جمعية البرهان لخدمة السُنّة والقرآن" className="hidden h-12 w-auto light:block" />
            <span className="flex flex-col">
              <span className="text-[11.5px] text-ink-muted">إحدى مبادرات</span>
              <span className="text-[14.5px] font-medium text-ink">جمعية البرهان لخدمة السُنّة والقرآن</span>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-pretty text-[13px] leading-7 text-ink-600">
            «السيرة ai» منصّةٌ علميّة تُجيب عن أسئلة السيرة النبويّة من أمّهات كتبها، وتعزو كلّ جوابٍ إلى كتابه وصفحته.
          </p>
        </div>

        {/* المنصّة */}
        <nav aria-label="المنصّة" className="lg:col-span-2">
          <h2 className="text-[12.5px] font-medium text-gold">المنصّة</h2>
          <ul className="mt-3 space-y-2">
            <li><Link to="/chat" className={link}>ابدأ محادثة</Link></li>
            <li><Link to="/login" className={link}>تسجيل الدخول</Link></li>
            <li><Link to="/" className={link}>الصفحة الرئيسيّة</Link></li>
          </ul>
        </nav>

        {/* الأقسام */}
        <nav aria-label="استكشِف" className="lg:col-span-2">
          <h2 className="text-[12.5px] font-medium text-gold">استكشِف</h2>
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
          <h2 className="text-[12.5px] font-medium text-gold">تواصَل</h2>
          <ul className="mt-3 space-y-2.5">
            <li>
              <a href="mailto:info@alborhan.sa" className={cn(link, "inline-flex items-center gap-2")}>
                <Mail className="size-4 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden />
                <span dir="ltr">info@alborhan.sa</span>
              </a>
            </li>
            <li>
              <a href="https://alborhan.sa" target="_blank" rel="noreferrer" className={cn(link, "group inline-flex items-center gap-2")}>
                <Globe className="size-4 shrink-0 text-ink-muted" strokeWidth={1.75} aria-hidden />
                <span dir="ltr">alborhan.sa</span>
                <ArrowUpLeft className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={1.75} aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* شريط الحقوق */}
      <div className="border-t border-line-soft">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3.5 text-[12px] text-ink-muted lg:px-0">
          <p className="flex items-center gap-2.5">
            {/* معيّنٌ برتقاليّ كمعيّنَي شعار الجمعيّة */}
            <span aria-hidden className="size-2 rotate-45 bg-gold-600" />
            <span>© <span className="tabular">2026</span> جمعية البرهان لخدمة السُنّة والقرآن. جميع الحقوق محفوظة.</span>
          </p>
          <nav aria-label="روابط قانونيّة" className="flex items-center gap-5">
            <Link to="/terms" className="transition-colors hover:text-ink">شروط الاستخدام</Link>
            <Link to="/privacy" className="transition-colors hover:text-ink">سياسة الخصوصيّة</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
