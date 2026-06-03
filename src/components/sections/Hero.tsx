import EvidenceChip from "@/components/ui/EvidenceChip";
import Reveal from "@/components/ui/Reveal";

/**
 * ① 히어로 — 최우선 강조 (7초 후크).
 * 팀 우선: 개인 성과(MAU 등)가 아니라 "서로 다른 지역에서 하나의 목표로 부산에 모인 팀"과
 * 창업·지속가능한 가치·수익화 미션을 메인으로. 개인 증거는 팀 소개 카드에서 다룬다.
 * 좌측 정렬 비대칭, 풀-블리드 ink + 우상단 lime radial glow.
 */
export default function Hero() {
  return (
    <section
      aria-label="히어로"
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 78% 14%, #C6F24E14, transparent 58%)",
      }}
    >
      {/* 트레이서 출발점 — 상단 도트에서 페이지 궤적이 시작 */}
      <span
        aria-hidden
        className="absolute left-[clamp(1.25rem,5vw,2rem)] top-28 h-2.5 w-2.5 rounded-full bg-lime shadow-[0_0_14px_3px_#C6F24E66]"
      />

      <div className="mx-auto w-full max-w-shell px-[clamp(1.25rem,5vw,2rem)] pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="max-w-3xl pl-5 sm:pl-8">
          {/* ㉠ 상단 메타칩 */}
          <Reveal>
            <p className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] uppercase tracking-[0.14em] text-fg-dim">
              <span className="font-display text-lime">AI SW 마에스트로 17기</span>
              <span aria-hidden className="text-line">
                /
              </span>
              <span className="font-medium text-fg-muted">숨벅찬 청년들</span>
            </p>
          </Reveal>

          {/* ㉡ display 헤드라인 — 팀 집결 */}
          <Reveal delay={90}>
            <h1 className="text-display text-fg">
              각자 다른 지역에서,
              <br />
              열정 하나로 <span className="text-lime">부산</span>에 모였습니다.
            </h1>
          </Reveal>

          {/* ㉢ 지역 → 부산 집결 라인 */}
          <Reveal delay={150}>
            <p className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-sm text-fg-dim">
              <span>경기 고양</span>
              <span aria-hidden className="text-line">·</span>
              <span>경기 가평</span>
              <span aria-hidden className="text-line">·</span>
              <span>경남 김해</span>
              <span aria-hidden className="px-1 text-lime">→</span>
              <span className="font-bold text-fg">부산 서면</span>
            </p>
          </Reveal>

          {/* ㉣ lead 서브카피 — 미션 */}
          <Reveal delay={210}>
            <p className="mt-7 max-w-2xl text-lead text-fg-muted">
              연수 과정을 <span className="font-semibold text-fg">창업처럼</span>{" "}
              달립니다. 더 많은 사용자에게{" "}
              <span className="font-semibold text-fg">지속 가능한 가치</span>를
              제공하고, <span className="font-semibold text-cyan">수익화</span>까지
              가능한 프로덕트를 만드는 것.<br /><br />
              — 이것이 팀의 목표이고, 저희가 부산에 모인 이유입니다.
            </p>
          </Reveal>

          {/* ㉤ 미션 3축 칩 */}
          <Reveal delay={300}>
            <ul className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row">
              <li>
                <EvidenceChip>창업 프로세스</EvidenceChip>
              </li>
              <li>
                <EvidenceChip>지속 가능한 가치 제공</EvidenceChip>
              </li>
              <li>
                <EvidenceChip>
                  <span className="font-display font-bold text-lime">
                    수익화
                  </span>
                </EvidenceChip>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
