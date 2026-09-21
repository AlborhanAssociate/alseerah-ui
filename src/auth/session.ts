/**
 * جلسة مبسّطة للعرض. عند النقل تُستبدل بـ /api/v1/auth/me
 * وكوكي الجلسة، وتبقى الواجهة كما هي.
 */
const KEY = "alseerah.session";

export interface Session {
  name: string;
  email: string;
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signIn(session: Session) {
  try {
    localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* التخزين قد يكون محجوباً — الجلسة تبقى في الذاكرة عندئذٍ */
  }
}

export function signOut() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* لا شيء */
  }
}
