/**
 * سؤالٌ كُتب في صفحة الهبوط قبل الوصول إلى المحادثة.
 * يُحفظ في sessionStorage كي ينجو من التحويل إلى شاشة الدخول ثمّ العودة.
 */
const KEY = "alseerah.pendingQuestion";

export function setPendingQuestion(text: string) {
  try {
    sessionStorage.setItem(KEY, text);
  } catch {
    /* التخزين معطّل: نتجاوز بصمت، فالمستخدم يصل إلى المحادثة على أيّ حال */
  }
}

/** يُرجع السؤال ويحذفه كي لا يُرسَل مرّتين */
export function takePendingQuestion(): string | null {
  try {
    const v = sessionStorage.getItem(KEY);
    if (v) sessionStorage.removeItem(KEY);
    return v?.trim() || null;
  } catch {
    return null;
  }
}
