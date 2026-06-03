"use client";

import { useEffect, useRef, useState } from "react";

type StatNumberProps = {
  /** 카운트업 목표 숫자 (예: 1100, 1200) */
  value: number;
  /** 숫자 뒤 접미사 (예: "+", "년", "명") */
  suffix?: string;
  /** 숫자 앞 접두사 */
  prefix?: string;
  /** 천 단위 콤마 표기 여부 */
  group?: boolean;
  className?: string;
  /** 카운트업 시간(ms) */
  duration?: number;
};

/**
 * 오버사이즈 숫자 카운트업 (시그니처 2).
 * 진입 시 0→value, Space Grotesk + lime. reduced-motion이면 최종값 즉시 표기.
 */
export default function StatNumber({
  value,
  suffix = "",
  prefix = "",
  group = true,
  className = "",
  duration = 1100,
}: StatNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(eased * value));
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = group ? display.toLocaleString("en-US") : String(display);

  return (
    <span ref={ref} className={`font-display tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
