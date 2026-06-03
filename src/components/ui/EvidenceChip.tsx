import type { ReactNode } from "react";

type EvidenceChipProps = {
  children: ReactNode;
  /** AI/기술 신호 칩이면 cyan 보더 (절제 사용) */
  variant?: "lime" | "cyan";
  className?: string;
};

/**
 * pill 형태 증거 칩. border line, 배경 surface, 좌측 도트.
 * lime = 일반 증거, cyan = AI/기술 신호(허원일 카드·아이디어 AI 스텝 한정).
 */
export default function EvidenceChip({
  children,
  variant = "lime",
  className = "",
}: EvidenceChipProps) {
  const dot = variant === "cyan" ? "bg-cyan" : "bg-lime";
  const border = variant === "cyan" ? "border-cyan/40" : "border-line";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${border} bg-surface px-3.5 py-2 text-[0.8125rem] font-medium text-fg-muted ${className}`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
