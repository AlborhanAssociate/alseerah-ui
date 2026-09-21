/**
 * النمط العامّ للتطبيق (فاتح/داكن) على جذر الوثيقة.
 * يُطبَّق قبل أوّل رسمٍ كي لا تومض الصفحة، ويُحفظ في المتصفّح، ويتبع النظام إن لم يُختَر شيء.
 */
export type Theme = "light" | "dark";
const KEY = "alseerah.theme";

export function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* التخزين معطّل */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* التخزين معطّل: يبقى الاختيار لهذه الجلسة */
  }
  window.dispatchEvent(new CustomEvent("alseerah:theme", { detail: theme }));
}

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
