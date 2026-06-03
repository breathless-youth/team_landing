import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { firstMentor, mentorAlignment } from "@/lib/team";

/**
 * ⑤ 멘토에게 / CTA — 두 번째 강조, 결승선.
 * 중앙정렬, surface 한 단 띄움, 트레이서가 결승 리본처럼 좌우로 퍼짐.
 * lime 솔리드 버튼 + ink 텍스트.
 * 대표 연락: 사용자 확정으로 팀 단일 채널 없음 → 팀원 개별 프로필(Notion·GitHub·오픈채팅)로 유도.
 */
export default function MentorCTA() {
  return (
    <Section id="mentor" raised ariaLabel="멘토에게">
      <div className="mx-auto max-w-3xl text-center">
        {/* 결승 도트 + 좌우로 퍼지는 lime 리본 */}
        <Reveal>
          <div className="mb-10 flex items-center justify-center gap-3">
            <span aria-hidden className="h-[2px] w-16 bg-gradient-to-l from-lime to-transparent" />
            <span
              aria-hidden
              className="h-3 w-3 rounded-full bg-lime shadow-[0_0_14px_3px_#C6F24E66] animate-dot-pulse"
            />
            <span aria-hidden className="h-[2px] w-16 bg-gradient-to-r from-lime to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="text-h2 text-fg">
            기본기·운영은 우리가 채웠습니다.
            <br />
            <span className="text-lime">{firstMentor.name} 멘토님</span>껜{" "}
            <span className="text-fg">기획부터 함께 달릴 동행</span>을 바랍니다.
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-[1.8] text-fg-muted">
            0부터 가르쳐야 하는 팀이 아닙니다. 만들 줄 알고, 배포할 줄 알고,
            사용자에게 닿아 본 3인이 시간을 통째로 비워 두고 기다립니다. 우리가
            바라는 건 결과물 검사가 아니라,{" "}
            <span className="font-medium text-fg">
              기획 단계부터 끝까지 같이 고민해 주실 한 분
            </span>{" "}
            입니다.
          </p>
        </Reveal>

        {/* 멘토 — 멘토님이 우리에게 바라는 점이자, 우리가 바라는 점(정렬 7) + 함께하고 싶은 이유 */}
        <Reveal delay={240}>
          <div className="mt-14">
            <p className="font-display text-sm uppercase tracking-[0.12em] text-cyan">
              {firstMentor.name} 멘토님 × 숨벅찬 청년들
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-fg-muted">
              멘토님이 우리에게 바라는 점이자, 우리가 멘토님께 바라는 점 — 서로
              맞닿는 일곱 가지.
            </p>

            <ul className="mt-7 grid gap-3 text-left sm:grid-cols-2">
              {mentorAlignment.map((c) => (
                <li key={c.no}>
                  <div className="flex h-full items-start gap-3 rounded-xl border border-dashed border-cyan/50 bg-cyan/[0.03] p-4 transition-colors duration-200 hover:border-cyan hover:bg-cyan/[0.07]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed border-cyan/60 text-[0.7rem] font-bold leading-none text-cyan">
                      {c.no}
                    </span>
                    <div>
                      <span className="block break-keep text-[0.95rem] font-bold text-fg">
                        {c.want}
                      </span>
                      <span className="mt-1 block break-keep text-xs leading-relaxed text-fg-muted">
                        {c.hint}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* 우리가 함께하고 싶은 이유 (이력·링크 없이, 이유 중심) */}
            <div className="mt-6 rounded-2xl border border-lime/30 bg-lime/[0.04] p-6 text-left md:p-7">
              <p className="font-display text-xs uppercase tracking-[0.12em] text-lime">
                우리가 함께하고 싶은 이유
              </p>
              <p className="mt-3 max-w-3xl text-[0.95rem] leading-[1.8] text-fg-muted">
                {firstMentor.why}
              </p>
            </div>
          </div>
        </Reveal>

        {/* 클로징 — 페이지에서 히어로 다음으로 굵게 */}
        <Reveal delay={270}>
          <p className="mx-auto mt-10 max-w-2xl text-h2 font-bold text-fg">
            멘토님이 쓰신 시간은,
            <br className="sm:hidden" /> 다음 주{" "}
            <span className="text-lime">결과물</span>로 돌려드립니다.
          </p>
          <p className="mt-4 text-lead text-fg-muted">
            함께 만들 6개월, 진심으로 기대하고 있습니다.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
