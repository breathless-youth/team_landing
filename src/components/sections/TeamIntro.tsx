import Image from "next/image";
import MemberLinks from "@/components/ui/MemberLinks";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionMarker from "@/components/ui/SectionMarker";
import StatNumber from "@/components/ui/StatNumber";
import { members } from "@/lib/team";

/**
 * ② 팀 소개 — 3카드 동등 비중. 상단 캐릭터 이미지(2:3 일러스트) +
 * 이름·역할 + 대형 인덱스, 대표 증거 한 줄(가장 굵게) · 지표 · 본문 · 기술태그 · 링크.
 * hover 시 인덱스 lime 점등("퍼즐이 맞물린다").
 */
export default function TeamIntro() {
  return (
    <Section id="team" ariaLabel="팀 소개">
      <SectionMarker>
        <Reveal>
          <h2 className="text-h2 text-fg">한 명도 빠진 역할이 없습니다.</h2>
          <p className="mt-4 max-w-2xl text-lead text-fg-muted">
            제품을 처음부터 끝까지 만들 수 있게 짠 3인입니다. 유쾌하게 소통하고
            진지하게 몰입합니다. 모르는 건 숨기지 않고 바로 공유하고, 끝까지
            완수합니다.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-fg-dim">
            <span
              aria-hidden
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-lime/80"
            />
            <span className="break-keep">
              거리를 열정으로 좁힌 팀 — 황선규·허원일은 부산 센터 인근에
              자취하고, 권상재는 센터까지 1시간을 마다하지 않고 오갑니다.
            </span>
          </p>
        </Reveal>
      </SectionMarker>

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {members.map((m, i) => (
          <Reveal as="li" key={m.name} delay={i * 90}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-200 hover:border-lime/40">
              {/* 캐릭터 이미지 (2:3 일러스트) */}
              {m.photo && (
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-ink">
                  <Image
                    src={m.photo}
                    alt={`${m.name} 캐릭터 일러스트`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
              {/* 이름 · 역할 + 대형 인덱스 */}
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-bold leading-tight text-fg">
                    {m.name}
                  </div>
                  <div className="mt-1 font-display text-[0.75rem] uppercase tracking-[0.1em] text-fg-dim">
                    {m.roleLabel}
                  </div>
                </div>
                <span className="font-display text-3xl font-bold leading-none text-fg-dim transition-colors duration-200 group-hover:text-lime">
                  {m.index}
                </span>
              </div>

              {/* 대표 증거 한 줄 — 가장 굵게 */}
              <h3 className="text-h3 text-fg">{m.headline}</h3>

              {/* 대표 지표 — lime + 카운트업 */}
              {m.stats && (
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5">
                  {m.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-3xl font-bold leading-none text-lime">
                        <StatNumber value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="mt-1 text-xs text-fg-dim">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <ul className="mt-5 space-y-2.5">
                {m.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-lime/70"
                    />
                    <span className="break-keep text-[0.9rem] leading-[1.65] text-fg-muted">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>

              {/* cyan 보더 기술 태그 — AI 신호 */}
              {m.techTags && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {m.techTags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-cyan/40 px-2.5 py-1 text-xs font-medium text-cyan"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              {/* 연락 링크 — Notion · GitHub · velog · 오픈채팅 · 이메일 (전화번호 제외) */}
              <div className="mt-auto pt-6">
                <MemberLinks links={m.links} name={m.name} />
              </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
