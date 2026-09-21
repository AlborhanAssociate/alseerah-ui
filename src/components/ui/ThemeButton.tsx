import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { currentTheme, setTheme, type Theme } from "@/theme";

/** زرّ التبديل بين النمطَين؛ يعمل في أيّ شاشة ويتابع التغيير من غيره */
export function ThemeButton({ size = 18, className }: { size?: number; className?: string }) {
  const [theme, setLocal] = useState<Theme>(() => currentTheme());
  useEffect(() => {
    const onChange = (e: Event) => setLocal((e as CustomEvent<Theme>).detail);
    window.addEventListener("alseerah:theme", onChange);
    return () => window.removeEventListener("alseerah:theme", onChange);
  }, []);
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "التبديل إلى النمط الفاتح" : "التبديل إلى النمط الداكن"}
      title={dark ? "النمط الفاتح" : "النمط الداكن"}
      aria-pressed={dark}
      className={cn("grid place-items-center rounded-full transition-colors", className)}
    >
      {dark ? <Sun size={size} strokeWidth={1.75} aria-hidden /> : <Moon size={size} strokeWidth={1.75} aria-hidden />}
    </button>
  );
}
