import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * react-router يغيّر العنوان ولا يمرّر. هذا يُكمل النصف الثاني:
 * عند تغيّر المسار أو الوسم (#) يُمرَّر إلى القسم — ويحترم scroll-margin-top
 * كي لا تبتلع الترويسة الثابتة رأسَ القسم.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // القسم قد يُركَّب بعد الإطار الأوّل
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
