import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { signIn } from "@/auth/session";
import { ThemeButton } from "@/components/ui/ThemeButton";
import { Logo } from "@/components/brand/Logo";

/**
 * شاشة الدخول. لوحان داخل هامشٍ من حواف الشاشة:
 * النموذج على اليمين، ولوحة الهويّة على اليسار بطاقةً مستديرةً تحمل صورة القبّة والآية.
 */
export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) {
      setError("أدخل بريدًا إلكترونيًّا صحيحًا.");
      return;
    }
    if (password.length < 8) {
      setError("كلمة المرور ثمانية أحرف على الأقلّ.");
      return;
    }

    setBusy(true);
    /* اسم العرض يأتي من ملفّ المستخدم على الخادم عند النقل؛ هنا اسم الحساب التجريبيّ */
    const name = "مزمل سراج";
    window.setTimeout(() => {
      signIn({ name, email });
      navigate("/chat", { replace: true });
    }, 450);
  }

  const field =
    "flex h-12 items-center gap-2.5 rounded-xl bg-paper-raised px-3.5 ring-1 ring-ink/[0.08] transition-[box-shadow,ring-color] focus-within:ring-2 focus-within:ring-gold/45";

  return (
    <div className="ambient relative grid min-h-svh bg-paper-warm p-4 lg:h-svh lg:grid-cols-2 lg:gap-5 lg:p-5">
      {/* النموذج */}
      <div className="flex min-h-0 flex-col px-2 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="السيرة ai — الصفحة الرئيسيّة" className="transition-opacity hover:opacity-80">
            <Logo className="h-10 dark:[&_[data-wordmark]_path]:fill-white" />
          </Link>
          <div className="flex items-center gap-1">
            <ThemeButton size={16} className="size-9 text-ink-muted hover:bg-sand/45 hover:text-ink" />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12.5px] text-ink-muted transition-colors hover:bg-sand/45 hover:text-ink"
            >
              <ArrowRight size={14} strokeWidth={1.75} />
              العودة للرئيسيّة
            </Link>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <p className="text-[12.5px] font-medium text-gold">مرحبًا بعودتك</p>
          <h1 className="mt-2 text-[28px] font-bold leading-snug text-ink">تسجيل الدخول</h1>
          <p className="mt-2 text-[14px] leading-7 text-ink-soft">تابع محادثاتك في السيرة النبويّة من حيث انتهيت.</p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4" noValidate>
            <label className="flex flex-col gap-1.5">
              <span className="text-[12.5px] font-medium text-ink-soft">البريد الإلكترونيّ</span>
              <span className={field}>
                <Mail size={16} strokeWidth={1.75} className="shrink-0 text-ink-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  dir="ltr"
                  className="w-full bg-transparent text-start text-[14px] text-ink outline-none placeholder:text-ink-muted"
                />
              </span>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="flex items-center justify-between">
                <span className="text-[12.5px] font-medium text-ink-soft">كلمة المرور</span>
                <Link to="/login" className="text-[12px] text-gold hover:underline">
                  نسيتها؟
                </Link>
              </span>
              <span className={field}>
                <Lock size={16} strokeWidth={1.75} className="shrink-0 text-ink-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="٨ أحرف على الأقلّ"
                  autoComplete="current-password"
                  className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-muted"
                />
              </span>
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-sepia/10 px-3 py-2 text-[12.5px] text-sepia">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-1 flex h-12 items-center justify-center rounded-xl bg-ink text-[14px] font-semibold text-paper shadow-btn transition-colors hover:bg-ink-soft disabled:opacity-60"
            >
              {busy ? "جارٍ الدخول…" : "دخول"}
            </button>
          </form>

          <p className="mt-7 text-center text-[13px] text-ink-soft">
            لا تملك حسابًا؟{" "}
            <Link to="/login" className="font-semibold text-gold hover:underline">
              أنشئ حسابًا مجانيًّا
            </Link>
          </p>
        </div>

        <p className="text-center text-[12px] text-ink-muted lg:text-start">
          بالدخول توافق على{" "}
          <Link to="/terms" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
            شروط الاستخدام
          </Link>{" "}
          و{" "}
          <Link to="/privacy" className="underline decoration-line-strong underline-offset-4 hover:text-ink">
            سياسة الخصوصيّة
          </Link>
          .
        </p>
      </div>

      {/* لوحة الهويّة: بطاقة مستديرة داخل الهامش. ألوانها ثابتةٌ في النمطَين لأنّها صورةٌ داكنة. الصورة مؤقّتة. */}
      <aside className="relative hidden min-h-0 overflow-hidden rounded-3xl bg-[#141a1e] shadow-lg lg:flex lg:flex-col">
        <img src={`${import.meta.env.BASE_URL}login-minaret.jpg`} alt="" className="absolute inset-0 size-full object-cover object-[50%_45%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141a1e]/80 via-[#141a1e]/25 to-transparent" />

        <div className="relative flex flex-1 flex-col justify-end p-10 xl:p-12">
          <ul className="flex flex-wrap gap-2.5">
            {["+٢٠ مرجعًا من أمّهات الكتب", "إجابةٌ معزوّةٌ إلى كتابها وبابها", "٤ لغات"].map((t) => (
              <li
                key={t}
                className="rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] text-[#ece2c8] ring-1 ring-inset ring-white/15 backdrop-blur"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
