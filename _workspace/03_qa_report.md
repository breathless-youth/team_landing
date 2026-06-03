# 03 · QA 리포트 — 숨벅찬 청년들 (멘토 매칭 랜딩)

> 작성: qa-reviewer · 2026-06-01 (1차 검수)
> 방식: 경계면 교차 비교 — `01_content_brief.md`(의도) ↔ 실제 렌더링/코드, `02_build_notes.md` 대조.
> 빌드 검증: **불가** (아래 §검증 한계 참조). 정적 코드 리뷰로 가능한 범위 대체.

---

## ✅ 2차 재검수 결과 (team-lead, 2026-06-01 · 최신) — 멘토 발송 가능

1차에서 발견된 전 항목이 해소됨. 빌드는 team-lead 환경(node v22.12)에서 클린 실행으로 통과 검증함.

| 1차 이슈 | 상태 | 처리 |
|---|---|---|
| B-1 아이디어=마인드맵 미구현 | ✅ 해소 | `Idea.tsx` 인터랙티브 마인드맵 재구현(중앙 허브+가지5+빈노드, 클릭→사이드패널/바텀시트, SVG 트레이서 stagger, button+aria-expanded·Esc·포커스복귀·reduced-motion, 의존성0). preview_eval로 클릭→패널 4축 렌더 확인 |
| M-1 Notion 링크 누락 | ✅ 해소 | `MemberLink.notion` 추가 + 3인 URL 반영 + `MemberLinks`·CTA 렌더(HTML 12회 출현 확인) |
| M-2 FinishLine 현재형/헤더 | ✅ 해소 | team.ts·Idea 모두 "지금도 운영" 현재형, 헤더 브리프 카피로 교체 |
| m-1 허원일 velog | ✅ 해소 | `MemberLink.velog` 추가 + 렌더 |
| m-2 폰트 죽은 코드 | ✅ 해소(무이슈) | 현 globals.css에 Pretendard CDN 잔재 없음(빌더 최종본 정리). Noto_Sans_KR 대체 사유 layout.tsx 주석 명시 |
| V-1 빌드 실행 검증 | ✅ 완료 | `rm -rf .next && npm run build` exit 0, 정적생성 4/4, 콘솔/하이드레이션 에러 0. 데스크 방사형·모바일 스택 실렌더 확인 |
| PII / placeholder | ✅ 유지 | 전화번호 0건, raw `{{}}` 0건, 대표 이메일 제거(팀 채널 없음 반영) |

**잔여 Minor(발송 무관):** 황선규 GitHub 핸들 `[gnawH]` 미검증(amber 도트 표시) / 아이디어 5종은 '검토 중 후보'(멘토와 확정) / 멘토상·태그라인 미지정(균형 유지).

---

## 1차 검수 기록 (참고 · 위에서 모두 해소됨)

**🔴 멘토 발송 불가 — Blocker 1건(③ 아이디어 섹션) 수정 후 재검수 필요.**

코드 품질·구조·다른 섹션의 카피 정합성은 양호하나, **사용자가 2026-06-01 확정한 핵심 요구사항(③ 아이디어 = 마인드맵 인터랙션)이 구현되지 않고 이전(폐기된) 정적 3스텝 버전이 남아 있다.** 이 섹션이 멘토 설득의 핵심(페르소나 B·C 정조준 + "함께 고를 자리" 효능감)이므로 현 상태로는 발송 불가.

| 심각도 | 건수 |
|---|---|
| Blocker | 1 |
| Major | 2 |
| Minor | 2 |
| 검증 불가 | 1 (빌드 실행) |

---

## ✅ 통과 항목

- [x] **히어로 7초 후크** — "이미 1,100명이 쓰는 서비스를 만들어 본 3명이, 다음 1년을 통째로 비웁니다." 헤드라인 + 1,100 인라인 카운트업(`StatNumber`, group=true → "1,100" 콤마) + 증거칩 3개(MAU 1,100+ · 경진대회 대상 · 3인 전원 풀몰입). 브리프 §① 의도와 일치. 숫자가 시각적 최강조.
- [x] **② 팀 소개** — 3카드 동등 비중, 대표 증거 한 줄(`headline`) 최상단 굵게, 황선규 stats(1,200+/1,100+) lime 카운트업, 허원일 cyan 기술태그. 브리프 §② 강약 가이드 충족.
- [x] **④ 성장 스토리** — 인용구 우선·숫자 절제 타임라인, 3인 태도 인용 + "버려지지 않습니다" 착지 문단. 브리프 §④ 의도 일치.
- [x] **⑤ CTA** — "멘토님이 쓰신 시간은, 다음 주 결과물로 돌려드립니다." 클로징 굵게 + lime 솔리드 버튼(ink 텍스트). 두 번째 강조 위치. 브리프 §⑤ 일치.
- [x] **PII 정책** — 전화번호 전 화면 미노출 확인(`team.ts`·`MemberLinks.tsx`·CTA 모두 전화번호 제외). digest의 010 번호 미사용.
- [x] **placeholder 노출** — 화면에 raw `{{...}}` 없음. (브리프 §③ ⑥번 노드의 `{{+ 멘토와 함께 추가할 빈 노드}}`는 *브리프 내부 마크업*이며, 현 구현엔 해당 노드 자체가 없어 노출 위험도 없음.)
- [x] **시맨틱 헤딩** — h1(Hero) → h2(각 섹션) → h3(카드/스텝) 위계 정상. `section`/`article`/`ol`/`figure`/`blockquote` 적절.
- [x] **장식 요소 aria-hidden / 아이콘 aria-label** — 트레이서 도트·선·따옴표 `aria-hidden`, MemberLinks 아이콘 `aria-label` 부여.
- [x] **reduced-motion 가드** — globals.css 전역 + Reveal/StatNumber/SectionMarker JS `matchMedia` 이중 가드.
- [x] **대비** — lime(#C6F24E) on ink(#0B0E14), lime 버튼 위 ink 텍스트, 본문 fg(#EAEEF5). 4.5:1 충족 추정(자동 측정은 빌드 검증 불가로 미실시).
- [x] **코드 빌드 정합성(정적)** — `@/*` import 전부 실재 파일로 해석, 클라이언트 상태 컴포넌트 전부 `"use client"`, 미정의 Tailwind 유틸 없음(`lime-glow`는 config에 정의됨), tsconfig/postcss.mjs/next.config/tailwind.config 전부 존재.

---

## 🔴 Blocker

### B-1. ③ 아이디어 섹션이 폐기된 이전 버전 — 마인드맵 인터랙션 미구현
- **위치:** `src/components/sections/Idea.tsx` (전체)
- **증상:** 브리프 §③은 2026-06-01 USER_DECISIONS로 **마인드맵 인터랙션**(중앙 허브 + 방사형 후보 노드 5개 + 빈 초대 노드 ⑥, 노드 클릭/탭 시 [문제/타깃/AI 적용/수익 가설] 상세 패널·모달, 키보드 포커스·aria)으로 **전면 재작성**되었음. 그러나 구현된 `Idea.tsx`는 그 이전의 **정적 "3스텝 플로우(문제정의→수요검증→운영) + 점선 협업 슬롯"** 버전이다. 브리프가 "교체하라"고 명시한 바로 그 버전이 남아 있다.
  - 구체 후보 5종(계약서 자동화 / 진로 코치 / 매장 CV / 에이전트 빌더 / 셀러 어시스턴트)이 화면에 **하나도 없음.**
  - 중앙 허브 노드(`AI 활용 실사용·수익형 서비스`), 빈 초대 노드 ⑥("+ 함께 그릴 후보") 부재.
  - 02_build_notes.md §섹션구성·§채워야 할 항목 #3도 이 섹션을 "3스텝 + 점선 협업 슬롯"으로 기술 → **빌더가 갱신된 §③을 반영하지 못함**(이전 브리프 기준으로 빌드).
- **멘토 영향:** 이 섹션은 페르소나 B(시장형)·C(AI형)를 동시에 겨냥하고 "내가 개입해 함께 좁힐 자리가 있다"는 효능감을 주는 전환 장치다. 후보 제시·인터랙션이 없으면 "방향만 있고 준비는 안 된 팀"으로 읽혀 핵심 설득이 무너진다.
- **재현:** `src/app/page.tsx` → `<Idea />` 렌더 → 마인드맵·후보 노드 없음, 3스텝 + 점선 카드만 표시.
- **권장 수정(frontend-builder, design-director 아트디렉션 동반):**
  1. 브리프 §③ "🧠 마인드맵 구조" 데이터를 `lib/` 신규 데이터 모듈로 구조화(허브 1 + 가지 5 + 빈 노드 1, 각 가지 [문제/타깃/AI적용/수익가설]).
  2. 중앙 허브 + 방사형 노드 레이아웃, 노드 클릭/탭 시 상세 패널/모달. 모바일 탭 동작 + 키보드 포커스(Tab/Enter) + `aria-expanded`/`role="dialog"` 필수.
  3. 빈 노드 ⑥은 점선 테두리·플러스 아이콘 등 '미완성=초대' 시각 신호(기존 점선 협업 슬롯 톤 재활용 가능).
  4. 섹션 헤더를 브리프 카피로 교체: "무엇을 만들지, 함께 고를 준비를 해왔습니다." + 도입 카피의 FinishLine 현재형(아래 M-2와 함께 처리).

---

## 🟠 Major

### M-1. 멤버 Notion 프로필 링크 전면 누락 — CTA가 약속한 링크가 없음
- **위치:** `src/lib/team.ts`(`MemberLink` 타입·데이터), `src/components/ui/MemberLinks.tsx`, `src/components/sections/MentorCTA.tsx`
- **증상:** 브리프 §②는 각 멤버 카드에 `프로필 더보기(Notion)`를, §⑤ CTA는 "각 멤버의 **Notion 프로필**·GitHub·오픈채팅으로 연결"을 명시(USER_DECISIONS #6에서 사용자가 개인 링크 공개에 동의). 그러나 `MemberLink` 타입에 `notion` 필드 자체가 없고, 어느 멤버에도 Notion URL이 없으며, `MemberLinks.tsx`는 github/openchat/email만 렌더한다. **CTA 카피는 Notion 연결을 약속하는데 실제 링크는 없는 상태** — 멘토 앞에서 신뢰 손상.
- **재현:** 팀 카드/CTA 하단 어디에도 Notion 링크 없음. 코드에 notion 키 grep 시 0건.
- **권장 수정:**
  - frontend-builder: `MemberLink`에 `notion?: string` 추가, `MemberLinks.tsx`에 Notion 링크(아이콘 or "프로필 더보기" 라벨) 렌더.
  - content-strategist/team-lead: USER_DECISIONS의 3인 Notion 프로필 URL을 `team.ts`에 제공/반영. (URL 미확보 시 CTA 카피에서 "Notion" 문구를 임시 제거해 *약속-구현 불일치*만이라도 해소.)

### M-2. ③ 아이디어 — FinishLine 현재형 누락 + 섹션 헤더 카피 불일치
- **위치:** `src/components/sections/Idea.tsx` (헤더 h2, 본문 p)
- **증상:** USER_DECISIONS #3은 FinishLine을 **현재 운영 중**으로 확정("지금도 운영하고 있습니다", 현재형). `Idea.tsx` 도입 카피는 "한 바퀴 끝까지 돌려봤습니다"까지만 있고 *현재 운영 중* 진술이 빠졌다(과거형 뉘앙스 잔존). 헤더도 브리프 카피("무엇을 만들지, 함께 고를 준비를 해왔습니다")가 아니라 다른 문장("무엇을 만들지는 함께 정하고 싶습니다 / 어떻게 끝까지 만드는지는 이미 증명했습니다")으로 작성됨.
- **재현:** Idea 섹션 헤더·도입 단락 ↔ 브리프 §③ 헤더·본문 비교.
- **권장 수정:** B-1 마인드맵 재작성 시 함께 — 헤더를 브리프 카피로, 도입 본문에 "지금도 운영하고 있습니다" 현재형 반영. (team.ts 황선규 body도 "만들어 운영했고"(과거형) → 현재형 점검 권장: TeamIntro는 stats로 처리되어 영향 적으나 §② 의도상 일관성 확인.)

---

## 🟡 Minor

### m-1. 허원일 velog 링크 누락
- **위치:** `src/lib/team.ts`(허원일 `links`), `MemberLinks.tsx`
- **증상:** 브리프 §② 허원일 카드는 `프로필 더보기(Notion) · GitHub · velog · 오픈채팅`을 명시. digest에 `velog.io/@one1_programmer` 존재. 그러나 `team.ts` 허원일 links에 velog 없음, `MemberLink` 타입에 velog 필드 없음.
- **권장 수정:** `MemberLink`에 `velog?: string` 추가, 허원일에 `https://velog.io/@one1_programmer` 연결. (M-1 Notion 작업과 함께 처리하면 효율적.)

### m-2. 폰트 — 문서는 Pretendard, 실제 렌더는 Noto Sans KR (CDN import 사실상 무효)
- **위치:** `src/app/layout.tsx`(Noto_Sans_KR → `--font-sans`), `src/app/globals.css`(Pretendard CDN `@import` + `:root --font-sans: "Pretendard Variable"`)
- **증상:** 02_build_notes는 본문 폰트를 **Pretendard(CDN)**로 기술하나, `layout.tsx`는 `Noto_Sans_KR`를 `--font-sans` 변수로 `<html>`에 주입한다. `<html>` 인라인 변수가 `:root` 선언보다 우선하므로 **실제 렌더 폰트는 Noto Sans KR**이고, globals.css의 Pretendard CDN `@import`는 적용되지 않는(불필요한 외부 요청) 죽은 코드가 된다.
- **영향:** 기능·접근성 무해. 다만 디자인 토큰(01b)이 지정한 Pretendard와 다른 폰트로 출고됨 + 불필요한 CDN 요청 1건.
- **권장 수정:** 의도가 Pretendard면 `pretendard` npm 패키지를 `next/font/local`로 호스팅하고 Noto 제거. Noto가 의도된 빌드 안정 선택이면 globals.css의 Pretendard `@import`와 `:root --font-sans` 라인을 제거해 죽은 코드 정리. (어느 쪽이든 문서-구현 일치 + 정리 목적.)

---

## ⚠️ 검증 한계 (검증 불가 항목)

### V-1. `npm install && npm run build` 실행 검증 불가
- **사유:** qa-reviewer 샌드박스에서도 `node`/`npm`/`npx` 포함 모든 Bash 호출이 권한 거부됨(frontend-builder와 동일 제약). 1회 재시도(sandbox override 포함)도 거부. 따라서 **빌드 통과 여부·런타임 콘솔 에러·실제 375/768/데스크탑 반응형 렌더는 실행으로 검증하지 못함.**
- **대체 수행:** 정적 코드 리뷰로 import 해석·client 지시자·미정의 유틸·config 존재·반응형 클래스(clamp·md:grid-cols-3·세로 스택·min-h-[52px] 터치타겟)를 확인. 코드 레벨에서 빌드 실패를 일으킬 명백한 결함은 발견되지 않음.
- **조치:** **npm 사용 가능한 환경(사용자/CI)에서 `npm install && npm run build` 1회 실행 필수.** 통과 확인 전까지 빌드 통과는 "미검증"으로 남김.

---

## 재검수 시 Regression 체크리스트 (다음 회차)
- [ ] B-1: 마인드맵 인터랙션 구현(허브+가지5+빈노드, 클릭/탭 상세, 키보드·aria, 모바일 탭)
- [ ] M-1: Notion 링크 데이터·렌더·CTA 약속 일치
- [ ] M-2: FinishLine 현재형 + §③ 헤더 카피 정합
- [ ] m-1: 허원일 velog
- [ ] m-2: 폰트 문서-구현 일치/죽은 코드 정리
- [ ] V-1: 빌드 1회 실행 통과 확인
