import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionMarker from "@/components/ui/SectionMarker";

/**
 * 우리가 일하는 방법 — 실제 작업 이미지(ready.so 스타일 라운드 프레임)를 주인공으로,
 * 텍스트는 간결한 동반 설명. 교차(이미지↔텍스트) 배치.
 * 출처: assets/working/{Ground Rule, Google Sticky Decision}.png → public/working/.
 */

const groundHighlights = [
  "주 6일+ 팀 미팅 · 주 1회 팀장 1:1 회고",
  "막히면 미루지 않고 바로 공유 · 정보는 투명하게",
  "쿠션 어법으로, 감정이 아닌 객관적 근거로 설득",
];

const domains = ["반려동물", "관계", "자기계발", "주거·자취", "건강", "교육", "취미"];

const stickySteps = [
  { no: "01", title: "Pain Point 발산", desc: "삶의 영역별로 진짜 불편을 스티키로 쏟아냅니다." },
  { no: "02", title: "Idea 발산", desc: "각 불편에서 해결 아이디어를 자유롭게 펼칩니다." },
  { no: "03", title: "도트 투표로 수렴", desc: "팀원 투표로 가능성 높은 후보만 남깁니다." },
];

/** ready.so식 라운드 프레임 이미지 */
function FramedShot({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface2 p-2 shadow-[0_28px_80px_-28px_rgba(0,0,0,0.75)]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-auto w-full rounded-xl"
      />
    </div>
  );
}

export default function HowWeWork() {
  return (
    <Section id="how" ariaLabel="우리가 일하는 방법">
      <SectionMarker>
        <Reveal>
          <h2 className="text-h2 text-fg">
            우리는 <span className="underline-lime">일하는 방식</span>을 먼저
            정했습니다.
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-fg-muted">
            재능보다 합(合), 합보다 약속 — 6개월을 끝까지 함께 달리기 위해
            규칙부터 합의하고, 아이디어는 감이 아니라 방법으로 고릅니다.
          </p>
        </Reveal>
      </SectionMarker>

      {/* 행 1 — 그라운드 룰 (이미지 좌 / 텍스트 우) */}
      <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <FramedShot
            src="/working/ground-rule.png"
            alt="숨벅찬 청년들 팀 그라운드 룰 — 미팅 주기, 소통 규칙(존댓말·정보 투명·쿠션 어법·객관적 근거 설득), 회고 등을 정리한 노션 문서"
            width={1732}
            height={1282}
          />
        </Reveal>
        <Reveal delay={90}>
          <div>
            <p className="font-display text-xs uppercase tracking-[0.14em] text-lime">
              Team Ground Rule
            </p>
            <h3 className="mt-2 text-h3 text-fg">함께 일하는 규칙</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
              미팅 주기부터 소통 방식, 회고까지 — 흩어져 있던 셋이 한 팀으로
              움직이기 위한 규칙을 먼저 합의했습니다.
            </p>
            <ul className="mt-5 space-y-2.5">
              {groundHighlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-lime/70"
                  />
                  <span className="break-keep text-[0.95rem] leading-relaxed text-fg">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* 행 2 — Sticky Decision (텍스트 좌 / 이미지 우) */}
      <div className="mt-16 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <div>
            <p className="font-display text-xs uppercase tracking-[0.14em] text-cyan">
              Google Sticky Decision
            </p>
            <h3 className="mt-2 text-h3 text-fg">아이디어를 고르는 법</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">
              구글 벤처스의 의사결정 기법으로, 삶의 여러 영역에서 진짜 문제를
              모으고 투표로 좁혔습니다.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {domains.map((d, i) => (
                <li
                  key={d}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium ${i % 2 === 0
                    ? "border-lime/30 bg-lime/[0.07] text-lime"
                    : "border-cyan/30 bg-cyan/[0.07] text-cyan"
                    }`}
                  style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.5}deg)` }}
                >
                  {d}
                </li>
              ))}
            </ul>

            <ol className="mt-6 space-y-3.5">
              {stickySteps.map((s) => (
                <li key={s.no} className="flex gap-4">
                  <span className="font-display text-lg font-bold leading-tight text-cyan">
                    {s.no}
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-bold text-fg">{s.title}</p>
                    <p className="mt-0.5 break-keep text-sm leading-relaxed text-fg-muted">
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-sm text-fg-dim">
              <span aria-hidden className="mr-1.5 text-cyan">
                ↓
              </span>
              이렇게 추린 후보가 아래{" "}
              <span className="text-fg">아이디어 마인드맵</span>입니다.
            </p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <FramedShot
            src="/working/sticky-decision.png"
            alt="숨벅찬 청년들의 Google Sticky Decision 아이디에이션 보드 — 관계·자기계발·주거·자유주제 등 영역별 Pain Point와 Idea 스티키 노트, 도트 투표 결과"
            width={734}
            height={1298}
          />
        </Reveal>
      </div>
    </Section>
  );
}
