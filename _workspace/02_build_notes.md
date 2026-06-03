# 02 · 빌드 노트 — 숨벅찬 청년들 (멘토 매칭 랜딩)

> 작성: frontend-builder
> 입력: `01_content_brief.md`(카피) + `01b_design_direction.md`(디자인 토큰) + `team_members_digest.md`(연락처)
> 스택: Next.js 14 (App Router) + TypeScript + Tailwind CSS

---

## 실행 방법

```bash
npm install
npm run dev      # http://localhost:3000
# 프로덕션 빌드 검증
npm run build
```

추가 런타임 의존성 없음(framer-motion 미사용 — 모션은 IntersectionObserver + CSS transition으로 구현).

---

## ⚠️ 빌드 검증 상태 (중요)

**빌드 검증은 team-lead 환경에서 수행한다(빌더 세션은 npm 권한 없음).**
빌더 샌드박스에서 `node`/`npm`/`npx`를 포함한 모든 Bash 호출이 권한 거부되어(일반 echo/ls는 동작) create-next-app 스캐폴딩·`npm run build`를 직접 실행할 수 없었습니다. 따라서 **landing-page-build 스킬의 폴백 절차(수동 스캐폴딩)** 로 표준 create-next-app(App Router+TS+Tailwind) 구조와 동일하게 프로젝트 전체를 손으로 작성하고, **team-lead(node v20/v22 + npm 11)가 `npm install && npm run build`를 대신 실행**해 통과를 확인하는 분업으로 진행했습니다.

- 코드 레벨 자체 검수: import 경로(`@/*`) 전부 실재 파일로 해석, `React.` 네임스페이스 사용은 layout.tsx의 `React.ReactNode`(create-next-app 표준 패턴)뿐, 미정의 Tailwind 유틸(`text-stat` 등) 미사용, 화면에 raw `{{...}}` placeholder 없음 확인.
- 빌드 에러 발생 시 team-lead가 로그를 전달 → 빌더가 수정 → 재검증 루프. 통과 확인 후 task #4 completed + qa-reviewer 인계.

---

## 폰트

| 용도 | 폰트 | 로딩 |
|---|---|---|
| 한글 본문/디스플레이 (`font-sans`) | **Noto Sans KR** (Pretendard 대체) | `next/font/google` (weight 400·500·700·900) → `--font-sans` 변수 |
| 숫자/영문 라벨 (`font-display`) | **Space Grotesk** | `next/font/google` (weight 500·700) → `--font-display` 변수 |

> 디자인 방향(01b)은 Pretendard를 명시하나 `next/font/google`에 Pretendard가 없어 빌드 안정성(오프라인·CDN 비의존)을 위해 Noto Sans KR로 대체했다(setup 가이드 권장 대체 폰트). 시각상 Pretendard가 필요하면 `pretendard` npm 패키지를 `next/font/local`로 로컬 호스팅해 교체(레이아웃 1파일 수정).

- Space Grotesk는 숫자·영문 라벨(MAU, 인덱스 01/02/03, 역할 라벨, →) **전용**. 한글에는 적용 안 함.
- 전역 `word-break: keep-all`(한글 단어 줄바꿈), 헤드라인 `text-wrap: balance`.

## 컬러 팔레트 (Tailwind `theme.extend.colors`)

| 토큰 | HEX | 용도 |
|---|---|---|
| `ink` | #0B0E14 | body 배경 |
| `surface` | #121620 | 카드/CTA 배경 |
| `surface2` | #1A1F2B | 카드 hover |
| `line` | #262D3A | 1px 보더·디바이더 |
| `fg` | #EAEEF5 | 본문(순백 금지) |
| `fg-muted` | #9AA4B6 | 보조 |
| `fg-dim` | #5E687A | 메타 |
| `lime` | #C6F24E | 핵심 액센트·숫자·CTA·트레이서 |
| `lime-700` | #9BCB1E | hover |
| `cyan` | #5BE3D6 | AI/기술 신호 한정(허원일 태그·아이디어 AI 스텝) |

- lime = 멈춤 신호(숫자·CTA·궤적), 본문에 흘리지 않음. cyan = AI 맥락만. 두 색 한 요소에 안 섞음.
- 그라데이션은 히어로 우상단 radial glow 1곳만.

---

## 섹션 구성 (브리프 → 컴포넌트)

| # | 섹션 | 컴포넌트 | 강조 |
|---|---|---|---|
| ① | 히어로 | `sections/Hero.tsx` | 최강. 1,100 인라인 카운트업 + 증거칩 3개 |
| ⑤ | 멘토에게/CTA | `sections/MentorCTA.tsx` | 2번째. surface 띄움, lime 솔리드 버튼, 결승 도트 펄스 |
| ② | 팀 소개 | `sections/TeamIntro.tsx` | 3카드, 대형 인덱스, 대표증거 최상단, 지표 카운트업, cyan 기술태그 |
| ③ | 아이디어 | `sections/Idea.tsx` | 3스텝 플로우 + 점선 '협업 슬롯'(미정 블록) |
| ④ | 성장 스토리 | `sections/GrowthStory.tsx` | 세로 타임라인 인용구, 숫자 절제 |

**공통 컴포넌트(`components/ui/`):** `Reveal`(진입 페이드업), `StatNumber`(카운트업), `SectionMarker`(트레이서 도트+선), `EvidenceChip`(pill), `Section`(셸), `MemberLinks`(연락 아이콘).
**데이터:** `lib/team.ts` — 멤버·링크·대표연락 단일 출처.

## 시그니처 / 모션

- 러닝 트레이서: `SectionMarker` 좌측 도트+세로선, 진입 시 scaleY(0→1) 700ms.
- 오버사이즈 숫자 카운트업: `StatNumber`, ease-out 1100ms.
- 진입 페이드업(opacity+translateY 16px, 600ms, stagger +90ms), 버튼 hover(-2px+glow), 카드 hover(surface2+lime 보더), CTA 도트 펄스.
- **reduced-motion 전역 가드:** `globals.css` `@media (prefers-reduced-motion: reduce)` + 각 JS 컴포넌트가 `matchMedia`로 최종상태 즉시 표기.

## 반응형/접근성

- 모바일 우선(375px): 헤드라인 clamp 하한 2.5rem, 증거칩 세로 스택, 3스텝/3카드 1열, CTA 버튼 풀폭·터치타겟 ≥52px.
- 시맨틱: `h1`(히어로)→`h2`(섹션)→`h3`(카드), `section`/`article`/`figure`/`blockquote`/`ol`, 아이콘 `aria-label`, 장식 요소 `aria-hidden`.
- 대비: lime(#C6F24E) on ink 충분. lime 버튼 위 텍스트는 ink(어두운 글자).

---

## 🔧 채워야 할 항목 (사용자/멘토 확정 대기 — 화면에 절제 표시 중)

콘텐츠 확정 시 **레이아웃·토큰 불변, 텍스트·상태만 교체** 가능하게 설계(브리프 §8).

1. **개인 링크 공개 범위 사용자 확정 필요** (team-lead PII 가이드)
   - 현재 GitHub·오픈채팅·이메일만 노출, **전화번호는 전 화면에서 제외**(digest에 있어도 미사용).
   - 3인 GitHub/오픈채팅은 팀 카드 + CTA 하단에 노출. 멤버별 공개 동의 최종 확인 필요.
2. **대표 연락 채널 확정** — 현재 황선규 `sun30126331@gmail.com` 가정. CTA 하단에 "대표 채널 확정 필요"(amber 도트) 표시 중. `lib/team.ts`의 `primaryContact` 한 곳만 교체.
3. **아이디어 구체 아이템** — `Idea.tsx`의 점선 '협업 슬롯' 카드(`TODO(content)` 주석). 확정 시 실선 카드로 교체(cyan 도트 유지).
4. **황선규 GitHub 핸들** — digest 표기 `[gnawH]`는 검증된 URL 아님. 잠정 `github.com/gnawH` + `githubUnverified: true`로 두어 팀 카드 GitHub 아이콘에 amber 도트(‘링크 확인 필요’)로 절제 표시. **실제 핸들 확인 후 `lib/team.ts` 교체 필요.**
5. **FinishLine 시제** — 현재 "운영했다"(과거형)로 작성(`team.ts` 황선규 body, `Idea.tsx`). 운영 중이면 현재형으로 동사만 교체.
6. **원하는 멘토상** — CTA/아이디어 카피는 3페르소나 공통 어필로 작성. 무게중심 확정 시 미세조정 가능.

## 미해결/리스크

- **빌드 검증은 team-lead 환경에서 수행(빌더 세션 npm 권한 없음).** 위 ⚠️ 참조. 통과 확인 후 task #4 completed.
- 폰트는 Pretendard 대신 Noto Sans KR(next/font/google)로 빌드. 시각상 Pretendard 필요 시 로컬 호스팅 교체(위 폰트 절 참조).
- 히어로 인라인 대형 숫자(`text-stat-inline`)와 윗줄 간 수직 간격은 데스크탑 대형 뷰포트에서 시각 점검 권장(QA).
