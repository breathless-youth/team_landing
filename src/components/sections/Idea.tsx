"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionMarker from "@/components/ui/SectionMarker";

/**
 * ③ 아이디어 — 인터랙티브 마인드맵 (중앙 허브 + 방사형 후보 노드)
 * 사양: _workspace/01b_design_direction.md §6-③ (라인 148~188).
 * - 의존성 0: React state + absolute %좌표 노드 + 단일 <svg> 오버레이 path 6개.
 * - 데스크(≥md): 방사형 캔버스 + 우측 사이드 패널. 모바일(<md): 세로 스택 + 바텀시트.
 * - 시그니처 '러닝 트레이서'를 허브→노드 엣지로(곡선 + stagger 그려짐).
 * - a11y: button + aria-expanded, 키보드 Enter/Space/Esc, 포커스 복귀, reduced-motion 가드.
 */

type Idea = {
  id: string;
  label: string;
  problem: string;
  target: string;
  ai: string;
  revenue: string;
};

const HUB_LABEL = "AI 활용 실사용·수익형 서비스";

const IDEAS: Idea[] = [
  {
    id: "fitting",
    label: "3D 가상 피팅",
    problem:
      "온라인 의류는 내 체형에 맞는지·어떤 사이즈가 맞는지 알기 어려워 구매를 포기하거나 교환·반품이 반복됩니다. (온라인 의류 평균 반품률 24.4% — 최대 원인이 사이즈·핏)",
    target: "온라인 패션몰·D2C 브랜드(B2B)와, 사이즈·핏 선택이 어려운 소비자.",
    ai: "사용자 체형 3D 아바타에 상품 실측 데이터를 결합해 부위별 핏·사이즈 비교·반품 가능성까지 분석합니다 (단순 사진 합성이 아님).",
    revenue:
      "쇼핑몰에 피팅 위젯 + 분석 대시보드 제공 → 월 구독·상품 수·API 호출 기반 과금, 이후 반품률 감소 성과 과금으로 확장.",
  },
  {
    id: "retro",
    label: "AI 회고 다이어리",
    problem:
      "백지에서 일기를 쓰기는 막막하고, 자기성찰과 목표를 꾸준히 이어갈 동기를 유지하기 어렵습니다.",
    target: "20~30대 직장인, 취준생·대학생 등 자기계발 관심층(MZ).",
    ai: "매일 정해진 시간에 AI가 하루를 돌아보는 질문을 던져 능동적 성찰을 유도하고, 답변으로 캐릭터를 키워 지속 동기를 부여합니다.",
    revenue:
      "캐릭터 스킨·아이템 인앱 결제 + 구독형 주간·월간 AI 회고 리포트 (자기계발 국내 ~2조 원 시장).",
  },
  {
    id: "petcare",
    label: "반려동물 응급 케어",
    problem:
      "반려동물이 갑자기 아플 때 보호자는 ‘지금 병원 가야 하나·야간엔 아침까지 기다려도 되나·얼마 나오나’를 판단하기 어렵습니다. 병원마다 진료비 격차가 크고 치료비는 매년 오르는데, 펫보험은 높은 보험료·가입 제한으로 대안이 되기 어렵습니다.",
    target:
      "야간·주말에 반려동물 이상 증상을 겪는 초보 보호자 (국내 반려인 1,546만 명 · 반려가구 591만).",
    ai: "증상을 입력하면 AI가 응급도를 분류(바로 가야 함 / 아침까지 관찰)하고, 근처 야간·응급 동물병원과 예상 진료비 범위를 안내합니다.",
    revenue:
      "병원 제휴·예약 연결 수수료 + 프리미엄 구독(상시 증상 상담·진료 기록) (가설).",
  },
];

const INVITE_ID = "invite";

/** 노드 좌표(% 기준, 허브=50,50). 허브 주위 4노드(후보 3 + 초대) 배치. */
const POS: Record<string, { x: number; y: number }> = {
  fitting: { x: 22, y: 28 },
  retro: { x: 78, y: 28 },
  petcare: { x: 22, y: 80 },
  [INVITE_ID]: { x: 78, y: 80 },
};

/** 허브(50,50)→노드 곡선 path. 중점에서 법선으로 살짝 휘어 '뻗어나가는' 느낌. */
function edgePath(x: number, y: number): string {
  const hx = 50;
  const hy = 50;
  const mx = (hx + x) / 2;
  const my = (hy + y) / 2;
  const dx = x - hx;
  const dy = y - hy;
  const len = Math.hypot(dx, dy) || 1;
  const bow = 7;
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M${hx} ${hy} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x} ${y}`;
}

export default function Idea() {
  const [selected, setSelected] = useState<string | null>(null);
  const [drawn, setDrawn] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // 섹션 진입 시 엣지 그려짐 트리거 (reduced-motion이면 즉시)
  useEffect(() => {
    const node = canvasRef.current;
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
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const open = (id: string, el: HTMLButtonElement | null) => {
    triggerRef.current = el;
    setSelected(id);
  };

  const close = useCallback(() => {
    setSelected(null);
    triggerRef.current?.focus();
  }, []);

  // Esc로 닫기 + 패널 열리면 닫기 버튼으로 포커스 이동
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [selected, close]);

  const selectedIdea = IDEAS.find((i) => i.id === selected) ?? null;
  const isInvite = selected === INVITE_ID;
  const branchIds = [...IDEAS.map((i) => i.id), INVITE_ID];

  return (
    <Section id="idea" ariaLabel="아이디어">
      <SectionMarker>
        <Reveal>
          <h2 className="text-h2 text-fg">
            무엇을 만들지, 함께 고를 준비를 해왔습니다.
            <br />
            <span className="underline-lime">고르는 건 멘토님과 함께.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lead text-fg-muted">
            방향은 분명합니다.{" "}
            <strong className="font-semibold text-fg">
              <span className="text-cyan">AI</span>를 실제로 쓰는, 사람이 돈을 낼
              만한 서비스.
            </strong>{" "}
            우리는 FinishLine에서 문제정의 → 수요검증 → 운영을 한 바퀴 끝까지
            돌려봤고, 지금도 운영하고 있습니다. 이번엔 그 사이클을 AI로 한 번 더
            돌립니다.
          </p>
        </Reveal>
      </SectionMarker>

      <Reveal>
        <p className="mb-6 mt-14 pl-5 font-display text-sm uppercase tracking-[0.12em] text-fg-dim sm:pl-8">
          검토 중인 출발점 · 노드를 눌러 펼쳐보세요
        </p>
      </Reveal>

      {/* ===== 데스크톱: 방사형 마인드맵 + 사이드 패널 ===== */}
      <div className="hidden md:flex md:items-stretch md:gap-0">
        <div
          ref={canvasRef}
          className="relative min-h-[clamp(520px,68vh,720px)] flex-1 min-w-0"
        >
          {/* 엣지 오버레이 (러닝 트레이서) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {IDEAS.map((idea, i) => {
              const active = selected === idea.id;
              return (
                <path
                  key={idea.id}
                  d={edgePath(POS[idea.id].x, POS[idea.id].y)}
                  fill="none"
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                  stroke={active ? "#C6F24E" : "#262D3A"}
                  strokeWidth={active ? 2.5 : 1.5}
                  strokeLinecap="round"
                  strokeDasharray={1}
                  strokeDashoffset={drawn ? 0 : 1}
                  style={{
                    transition: `stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1) ${
                      i * 90
                    }ms, stroke 250ms ease, stroke-width 250ms ease`,
                    filter: active
                      ? "drop-shadow(0 0 4px #C6F24E88)"
                      : "none",
                  }}
                />
              );
            })}
            {/* 빈 노드 엣지 — 점선 cyan (초대 신호) */}
            <path
              d={edgePath(POS[INVITE_ID].x, POS[INVITE_ID].y)}
              fill="none"
              vectorEffect="non-scaling-stroke"
              stroke="#5BE3D6"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              strokeLinecap="round"
              style={{
                opacity: drawn ? (selected === INVITE_ID ? 1 : 0.55) : 0,
                transition: "opacity 500ms ease 560ms, stroke-width 250ms ease",
              }}
            />
          </svg>

          {/* 중앙 허브 */}
          <div
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: "50%", top: "50%" }}
          >
            <div className="max-w-[12rem] rounded-2xl border border-lime/40 bg-surface2 px-5 py-4 text-center shadow-[0_0_28px_-6px_#C6F24E55]">
              <span className="block font-display text-[0.7rem] uppercase tracking-[0.12em] text-lime">
                우리의 방향
              </span>
              <span className="mt-1.5 block break-keep text-[0.95rem] font-bold leading-snug text-fg">
                {HUB_LABEL}
              </span>
            </div>
          </div>

          {/* 가지 노드 5 */}
          {IDEAS.map((idea) => {
            const active = selected === idea.id;
            return (
              <button
                key={idea.id}
                type="button"
                aria-label={`후보: ${idea.label}`}
                aria-expanded={active}
                aria-haspopup="dialog"
                onClick={(e) => open(idea.id, e.currentTarget)}
                className={`group absolute z-20 flex min-h-[44px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left transition-all duration-200 ${
                  active
                    ? "border-lime bg-surface2 shadow-[0_0_20px_-4px_#C6F24E66]"
                    : "border-line bg-surface hover:-translate-y-[calc(50%+2px)] hover:border-lime/50 hover:bg-surface2"
                }`}
                style={{ left: `${POS[idea.id].x}%`, top: `${POS[idea.id].y}%` }}
              >
                <span
                  aria-hidden
                  className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                    active
                      ? "bg-lime shadow-[0_0_8px_1px_#C6F24E88]"
                      : "bg-lime/70 group-hover:bg-lime"
                  }`}
                />
                <span className="max-w-[10rem] break-keep text-[0.875rem] font-medium leading-tight text-fg">
                  {idea.label}
                </span>
              </button>
            );
          })}

          {/* 빈 노드 — 멘토 초대 */}
          <button
            type="button"
            aria-label="후보: 멘토와 함께 그릴 빈 노드"
            aria-expanded={selected === INVITE_ID}
            aria-haspopup="dialog"
            onClick={(e) => open(INVITE_ID, e.currentTarget)}
            className={`group absolute z-20 flex min-h-[44px] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border border-dashed px-4 py-2.5 text-left transition-all duration-200 ${
              selected === INVITE_ID
                ? "border-cyan bg-cyan/10"
                : "border-cyan/50 hover:border-cyan hover:bg-cyan/[0.08]"
            }`}
            style={{ left: `${POS[INVITE_ID].x}%`, top: `${POS[INVITE_ID].y}%` }}
          >
            <span
              aria-hidden
              className="text-base font-bold leading-none text-cyan transition-transform duration-150 group-hover:rotate-90"
            >
              +
            </span>
            <span className="break-keep text-[0.875rem] font-medium leading-tight text-fg-muted">
              함께 그릴 후보
            </span>
          </button>
        </div>

        {/* 사이드 패널 (데스크톱) */}
        <div
          className={`relative shrink-0 overflow-hidden transition-[width,margin] duration-300 ease-reveal ${
            selected ? "ml-6 w-[360px]" : "ml-0 w-0"
          }`}
        >
          <div
            role="dialog"
            aria-label="아이디어 후보 상세"
            aria-hidden={!selected}
            className="h-full w-[360px] rounded-2xl border border-line bg-surface p-7"
            style={{
              opacity: selected ? 1 : 0,
              transform: selected ? "translateX(0)" : "translateX(16px)",
              transition:
                "opacity 300ms ease 80ms, transform 300ms cubic-bezier(0.22,1,0.36,1) 80ms",
            }}
          >
            {selected && (
              <PanelBody
                idea={selectedIdea}
                isInvite={isInvite}
                onClose={close}
                closeRef={closeRef}
              />
            )}
          </div>
        </div>
      </div>

      {/* ===== 모바일: 세로 스택 + 바텀시트 ===== */}
      <div className="md:hidden">
        <div className="rounded-2xl border border-lime/40 bg-surface2 px-5 py-4">
          <span className="block font-display text-[0.7rem] uppercase tracking-[0.12em] text-lime">
            우리의 방향
          </span>
          <span className="mt-1 block break-keep text-[1.05rem] font-bold leading-snug text-fg">
            {HUB_LABEL}
          </span>
        </div>

        <ul className="mt-3 space-y-2.5">
          {branchIds.map((id) => {
            const idea = IDEAS.find((i) => i.id === id);
            const invite = id === INVITE_ID;
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-label={
                    invite
                      ? "후보: 멘토와 함께 그릴 빈 노드"
                      : `후보: ${idea?.label}`
                  }
                  aria-expanded={selected === id}
                  aria-haspopup="dialog"
                  onClick={(e) => open(id, e.currentTarget)}
                  className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                    invite
                      ? "border-dashed border-cyan/50 active:bg-cyan/[0.08]"
                      : "border-line bg-surface active:bg-surface2"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`shrink-0 ${
                      invite
                        ? "text-base font-bold leading-none text-cyan"
                        : "h-2 w-2 rounded-full bg-lime"
                    }`}
                  >
                    {invite ? "+" : ""}
                  </span>
                  <span
                    className={`flex-1 break-keep text-[0.95rem] font-medium leading-tight ${
                      invite ? "text-fg-muted" : "text-fg"
                    }`}
                  >
                    {invite ? "함께 그릴 후보" : idea?.label}
                  </span>
                  <span aria-hidden className="text-fg-dim">
                    ›
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* 바텀시트 모달 */}
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-end"
            role="dialog"
            aria-modal="true"
            aria-label="아이디어 후보 상세"
          >
            <button
              type="button"
              aria-label="닫기"
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 bg-ink/70"
            />
            <div className="animate-sheet-up relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border-t border-line bg-surface p-6 pb-10">
              <div
                aria-hidden
                className="mx-auto mb-5 h-1 w-10 rounded-full bg-line"
              />
              <PanelBody
                idea={selectedIdea}
                isInvite={isInvite}
                onClose={close}
                closeRef={closeRef}
              />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

/* ---------- 상세 패널 본문 (데스크 패널 + 모바일 시트 공용) ---------- */

function PanelBody({
  idea,
  isInvite,
  onClose,
  closeRef,
}: {
  idea: Idea | null;
  isInvite: boolean;
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement>;
}) {
  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-1 font-display text-[0.7rem] uppercase tracking-[0.1em] ${
            isInvite ? "border-cyan/60 text-cyan" : "border-lime/60 text-lime"
          }`}
        >
          {isInvite ? "함께 채울 자리" : "검토 중인 후보"}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="상세 닫기"
          className="-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-fg-dim transition-colors hover:bg-surface2 hover:text-fg"
        >
          ✕
        </button>
      </div>

      {isInvite ? (
        <div>
          <h3 className="text-h3 text-fg">+ 함께 그릴 후보</h3>
          <p className="mt-3 text-[0.95rem] leading-[1.75] text-fg-muted">
            비어 있는 노드 하나. 멘토님이 보시는{" "}
            <span className="font-medium text-cyan">시장 기회</span>를 여기에
            함께 채우고 싶습니다 — 이 자리가 우리가 그리는 첫 협업입니다.
          </p>
        </div>
      ) : idea ? (
        <div>
          <h3 className="text-h3 text-fg">{idea.label}</h3>
          <dl className="mt-5 space-y-4">
            <Axis label="문제" value={idea.problem} />
            <Axis label="타깃" value={idea.target} />
            <Axis label="AI 적용" value={idea.ai} />
            <Axis label="수익 가설" value={idea.revenue} />
          </dl>
        </div>
      ) : null}
    </div>
  );
}

function Axis({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-display text-[0.7rem] uppercase tracking-[0.12em] text-fg-dim">
        {label}
      </dt>
      <dd className="mt-1 text-[0.9rem] leading-[1.65] text-fg">{value}</dd>
    </div>
  );
}
