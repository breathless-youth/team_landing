"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type SectionMarkerProps = {
  /** 마커 우측 헤더/콘텐츠 */
  children: ReactNode;
  /** 트레이서선 길이 비율(전체 높이 대비). 성장스토리는 길게. */
  className?: string;
  /** 도트에 펄스(결승선 모티프) 적용 */
  pulse?: boolean;
};

/**
 * 러닝 트레이서 (시그니처 1).
 * 좌측 lime 수직선 + 시작점 도트. 진입 시 선이 위→아래로 scaleY(0→1).
 * 모바일은 들여쓰기 좁히고 도트 유지. reduced-motion이면 선 즉시 표기.
 */
export default function SectionMarker({
  children,
  className = "",
  pulse = false,
}: SectionMarkerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative pl-5 sm:pl-8 ${className}`}
    >
      {/* 시작점 도트 (glow) */}
      <span
        aria-hidden
        className={`absolute left-0 top-1.5 z-10 h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_12px_2px_#C6F24E66] ${
          pulse ? "animate-dot-pulse" : ""
        }`}
      />
      {/* 트레이서 수직선 — 위에서 아래로 그려짐 */}
      <span
        aria-hidden
        className="absolute left-[4.5px] top-1.5 bottom-0 w-[2px] origin-top bg-gradient-to-b from-lime to-lime/10"
        style={{
          transform: drawn ? "scaleY(1)" : "scaleY(0)",
          transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      {children}
    </div>
  );
}
