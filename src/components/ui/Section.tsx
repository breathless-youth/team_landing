import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  /** 한 단 띄운 면(CTA) */
  raised?: boolean;
  className?: string;
  /** 상단 1px 디바이더 표시 */
  divider?: boolean;
  ariaLabel?: string;
};

/**
 * 섹션 셸 — max-w 72rem 중앙, py-24 md:py-36 수직 리듬.
 * 배경색 교차 대신 line 디바이더로 구분(§3).
 */
export default function Section({
  id,
  children,
  raised = false,
  className = "",
  divider = true,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${raised ? "bg-surface" : ""} ${
        divider ? "border-t border-line" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-shell px-[clamp(1.25rem,5vw,2rem)] py-24 md:py-36">
        {children}
      </div>
    </section>
  );
}
