import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const TITLES: Record<string, string> = {
  "/privacy": "سياسة الخصوصيّة",
  "/terms": "شروط الاستخدام",
};

/** صفحة قانونيّة — الهيكل جاهز، والنصّ يأتي من الفريق العلميّ والقانونيّ */
export function LegalPage() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "وثيقة";

  return (
    <div className="min-h-svh bg-paper px-5 py-10 sm:px-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12.5px] text-ink-muted transition-colors hover:bg-sand/45 hover:text-ink"
      >
        <ArrowRight size={14} strokeWidth={1.75} />
        العودة للرئيسيّة
      </Link>
      <article className="mx-auto mt-10 max-w-2xl">
        <h1 className="text-[28px] font-bold text-ink">{title}</h1>
        <p className="mt-4 text-[15px] leading-[2] text-ink-soft">
          النصّ النهائيّ لهذه الوثيقة قيد الإعداد لدى الفريق. حتى صدوره، يمكنك مراسلتنا على{" "}
          <a href="mailto:info@alborhan.sa" className="text-gold underline underline-offset-2">
            info@alborhan.sa
          </a>{" "}
          لأيّ استفسار عن بياناتك أو شروط الخدمة.
        </p>
      </article>
    </div>
  );
}
