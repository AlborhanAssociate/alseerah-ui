import { getSession } from "../auth/session";

/** المستخدم الحاليّ — من الجلسة، مع قيمٍ احتياطيّة للعرض */
export function useCurrentUser() {
  const s = getSession();
  return {
    name: s?.name ?? "ضيف",
    email: s?.email ?? "",
    avatar: `${import.meta.env.BASE_URL}avatar.jpg`,
  };
}

export const currentUser = {
  get name() { return getSession()?.name ?? "ضيف"; },
  get email() { return getSession()?.email ?? ""; },
  avatar: `${import.meta.env.BASE_URL}avatar.jpg`,
};
