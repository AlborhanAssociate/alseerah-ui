import { useState } from "react";
import clsx from "clsx";

/**
 * صورة المستخدم. تتراجع إلى الحرف الأوّل إن لم تُوجد صورة أو تعذّر تحميلها —
 * وهو حال من سجّل ببريده لا بحساب جوجل.
 */
export function Avatar({
  name,
  src,
  size = 32,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;

  return (
    <span
      style={{ width: size, height: size }}
      className={clsx(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-ink",
        "text-paper ring-1 ring-ink/10",
        className,
      )}
    >
      {show ? (
        <img
          src={src}
          alt=""
          width={size}
          height={size}
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <span style={{ fontSize: Math.round(size * 0.4) }} className="font-semibold leading-none">
          {name.charAt(0)}
        </span>
      )}
    </span>
  );
}
