/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  /* النمط الداكن يُفعَّل بسمة data-theme="dark" على جذر الوثيقة */
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        /* ── لوحة جمعيّة البرهان ──
           #4a3856 بنفسجيّ (ink) · #db6e44 برتقاليّ (gold) · #a0482c صدئيّ (sepia) · #f4e6dc كريميّ (sand)
           أسماء المفاتيح باقية كما هي حتّى لا تتغيّر المكوّنات
           الألوان التي تتبدّل بين النمطَين تُقرأ من متغيّرات CSS معرَّفة في index.css */
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)", soft: "rgb(var(--ink-soft) / <alpha-value>)",
          mid: "rgb(var(--ink-mid) / <alpha-value>)", muted: "rgb(var(--ink-muted) / <alpha-value>)",
          50: "rgb(var(--ink-50) / <alpha-value>)", 100: "rgb(var(--ink-100) / <alpha-value>)",
          200: "rgb(var(--ink-200) / <alpha-value>)", 300: "rgb(var(--ink-300) / <alpha-value>)",
          400: "rgb(var(--ink-400) / <alpha-value>)", 500: "rgb(var(--ink-500) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)", 700: "rgb(var(--ink-700) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)", 900: "rgb(var(--ink-900) / <alpha-value>)",
          950: "rgb(var(--ink-950) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--gold) / <alpha-value>)", light: "#eba584", pale: "rgb(var(--gold-pale) / <alpha-value>)",
          100: "rgb(var(--gold-100) / <alpha-value>)", 200: "rgb(var(--gold-200) / <alpha-value>)",
          300: "#f2c4ad", 400: "#eba584",
          500: "#e3865f", 600: "rgb(var(--gold-600) / <alpha-value>)", 700: "rgb(var(--gold-700) / <alpha-value>)", 800: "rgb(var(--gold-800) / <alpha-value>)", 900: "#6e3016",
        },
        sepia: {
          DEFAULT: "rgb(var(--sepia) / <alpha-value>)", light: "#d99a7f",
          200: "#f3dcd1", 300: "#e8bba6", 400: "#d99a7f", 500: "#c4704d",
          600: "#a8532f", 700: "rgb(var(--sepia) / <alpha-value>)", 800: "#5e2a17",
        },
        /* ألوانٌ ثابتة لا تتبدّل مع النمط: للأسطح الداكنة دائماً (أزرار، لوحات، طبقات فوق الصور) */
        plum: { 500: "#7a658d", 600: "#604d71", 700: "#544162", 800: "#4a3856", 900: "#382942", 950: "#1f1626" },
        cream: { DEFAULT: "#f4e6dc" },
        sand: { DEFAULT: "rgb(var(--sand) / <alpha-value>)", deep: "rgb(var(--sand-deep) / <alpha-value>)" },
        paper: {
          DEFAULT: "rgb(var(--paper) / <alpha-value>)", panel: "rgb(var(--paper-panel) / <alpha-value>)",
          raised: "rgb(var(--paper-raised) / <alpha-value>)", sunken: "rgb(var(--paper-sunken) / <alpha-value>)",
          warm: "rgb(var(--paper-warm) / <alpha-value>)",
        },
        line: { DEFAULT: "rgb(var(--line) / <alpha-value>)", soft: "rgb(var(--line-soft) / <alpha-value>)", strong: "rgb(var(--line-strong) / <alpha-value>)" },
      },
      fontFamily: {
        /* خطّ واحد لكل الأدوار */
        sans: ['"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
        display: ['"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
        body: ['"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
        madinah: ['"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
        quran: ['"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
        latin: ['"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "999px", card: "16px", box: "22px", app: "26px",
        xs: "4px", sm: "8px", md: "12px", lg: "18px", xl: "26px", "2xl": "34px",
      },
      boxShadow: {
        app:  "0 24px 64px rgba(74,56,86,.13)",
        card: "0 10px 28px rgba(74,56,86,.09)",
        chip: "0 1px 4px rgba(74,56,86,.06)",
        btn:  "0 5px 16px rgba(74,56,86,.2)",
        xs:   "0 1px 2px rgba(74,56,86,.05)",
        sm:   "0 2px 8px rgba(74,56,86,.06)",
        md:   "0 8px 24px rgba(74,56,86,.08)",
        lg:   "0 18px 48px rgba(74,56,86,.10)",
        gold: "0 8px 28px rgba(219,110,68,.18)",
      },
      maxWidth: { answer: "64ch" },
      /* درجاتٌ تستعملها المكوّنات وليست في مقياس Tailwind 3 الافتراضيّ */
      spacing: { "4.5": "1.125rem", "6.5": "1.625rem", "13": "3.25rem" },
      lineHeight: { "6.5": "1.625rem" },
    },
  },
  plugins: [
    /* متغيّر «light»: يُفعَّل حين يحمل جذرُ الصفحة data-theme="light" */
    function ({ addVariant }) {
      addVariant("light", ['[data-theme="light"] &', '&[data-theme="light"]']);
    },
  ],
};
