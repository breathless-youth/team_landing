/**
 * 팀 멤버 데이터 — 단일 출처.
 *
 * PII 정책(team-lead 가이드 준수):
 *  - 공개 링크는 GitHub · 오픈채팅(카카오) · 이메일까지만.
 *  - 전화번호는 절대 포함하지 않는다(digest에 있어도 제외).
 *  - 대표 연락 채널은 사용자 확정 전까지 황선규 이메일을 가정.
 *
 * 미확정 항목(빌더 표시):
 *  - 황선규 GitHub: digest에 `[gnawH]`로만 표기 → 검증된 URL 아님.
 *    githubUnverified: true 로 두고 화면에서 '확인 필요'를 절제 표시.
 */

export type MemberLink = {
  /** Notion 프로필 (사용자 제공·공개 동의 완료) — 대표 프로필로 우선 노출 */
  notion?: string;
  github?: string;
  githubUnverified?: boolean;
  /** 기술 블로그 (허원일 velog) */
  velog?: string;
  openchat?: string;
  email?: string;
};

export type Member = {
  index: string; // Space Grotesk 대형 인덱스
  roleLabel: string; // 영문 역할 라벨 (font-display)
  name: string;
  role: string; // 한글 역할
  /** 캐릭터 이미지 공개 경로 (public/team/). */
  photo?: string;
  /** 카드 최상단, 가장 굵게 들어갈 대표 증거 한 줄 */
  headline: string;
  /** 본문 — 불릿 포인트로 표시 */
  points: string[];
  /** lime + 카운트업 처리할 대표 지표 (있으면) */
  stats?: { value: number; suffix: string; label: string }[];
  /** cyan 보더 기술 태그 (AI 신호) */
  techTags?: string[];
  links: MemberLink;
};

export const members: Member[] = [
  {
    index: "01",
    roleLabel: "FRONTEND · INFRA · AI NATIVE",
    name: "허원일",
    role: "Frontend · Infra · AI Native",
    photo: "/team/wonil.png",
    headline: "인프라까지 이해하고 사용자 경험을 개선하는 프론트엔드 엔지니어.",
    points: [
      "동아리 홈페이지 개발에 참여하며 프론트엔드 개발에 관심을 가짐",
      "배포에 참여하지 못한 점이 아쉬워 데브옵스 부트캠프를 통해 인프라 지식을 쌓음",
      "React 기반 생태계의 다양한 라이브러리를 경험함",
      "재사용성 높은 컴포넌트를 만드는 것에 관심이 많음",
    ],
    techTags: ["React", "Next.js", "TypeScript", "Python", "CI/CD"],
    links: {
      notion:
        "https://www.notion.so/34ca01badc2180f28e7ef5f2be88f3ce?v=33da01badc2180d0bd03000cd17634ca&source=copy_link",
      github: "https://github.com/wonza-hub",
      velog: "https://velog.io/@one1_programmer",
      openchat: "https://open.kakao.com/o/sCYigVri",
      email: "wonza4372@naver.com",
    },
  },
  {
    index: "02",
    roleLabel: "BACKEND · INFRA",
    name: "권상재",
    role: "Backend · Infra",
    photo: "/team/sangjae.png",
    headline: "서버부터 배포·운영까지 책임지는 백엔드.",
    stats: [
      { value: 10000, suffix: "+", label: "다운로드 수" },
    ],
    points: [
      "EC2·Docker·Nginx 배포 + GitHub Actions로 CI/CD·모니터링까지 — “로컬에서만 도는 코드”는 만들지 않음",
      "소마에 풀몰입하려 학점까지 비움",
      "“역할에 갇히지 않고 끝까지 완수한다”가 신조",
    ],
    techTags: ["Spring", "Java", "MySQL", "Docker"],
    links: {
      notion:
        "https://www.notion.so/34ca01badc21801f8a78eb0cc2c63fb6?v=33da01badc2180d0bd03000cd17634ca&source=copy_link",
      github: "https://github.com/sangjaekwon",
      openchat: "https://open.kakao.com/o/sAaGGVri",
      email: "sjsj00718@gmail.com",
    },
  },
  {
    index: "03",
    roleLabel: "FULLSTACK · INFRA · AI",
    name: "황선규",
    role: "Fullstack · Infra · 창업",
    photo: "/team/seongyu.png",
    headline: "문제 정의부터 운영까지 A to Z를 경험한 풀스택.",
    points: [
      "졸업 진단 웹서비스 FinishLine을 만들어 지금도 직접 운영 중 (지표 ↑)",
      "2025 강원 AI 아이디어 경진대회 대상 · 창업동아리 회장 · 1인 이커머스 경험",
      "“실패는 성장의 과정”이라며 시행착오를 기록하는 사람",
    ],
    stats: [
      { value: 1200, suffix: "+", label: "가입자" },
      { value: 1100, suffix: "+", label: "최대 MAU" },
    ],
    techTags: [
      "React",
      "Django",
      "Python",
      "AI",
      "GitHub Actions",
      "Postman",
      "MySQL",
      "AWS",
      "Expo",
      "Docker",
    ],
    links: {
      notion:
        "https://www.notion.so/350a01badc21808a9241c3d647c4caad?v=33da01badc2180d0bd03000cd17634ca&source=copy_link",
      github: "https://github.com/gnawH",
      openchat: "https://open.kakao.com/o/sPmMywsi",
      email: "sun30126331@gmail.com",
    },
  },
];

/**
 * 팀 대표 연락 채널 — 사용자 확정(2026-06-01): 별도 팀 채널 없음.
 * → CTA는 단일 대표 이메일 대신 팀원 개별 프로필(Notion·GitHub·오픈채팅)로 유도한다.
 *   "누구에게나 열려 있다"는 개방성을 강점으로 프레이밍.
 */
export const teamContact = {
  hasTeamChannel: false,
};

/**
 * 함께하고 싶은 멘토(김도영 멘토님) — 우리가 멘토님께 바라는 건 "기획부터 함께".
 * 구체 이력·LinkedIn은 노출하지 않고, "우리가 왜 함께하고 싶은지"만 진솔하게 적는다.
 */
export const firstMentor = {
  name: "김도영",
  // 우리가 원하는 이유에 집중: 기획 단계부터 끝까지 함께, 탄탄한 백엔드 설계와 개발 문화
  why: "우리는 다 만들어 둔 결과물을 확인받기보다, 기획 단계부터 함께 고민해 주실 멘토님을 바랍니다. 왜 이걸 만드는지부터 어떻게 탄탄하게 설계할지까지 — 김도영 멘토님과 함께라면 우리가 가진 실행력에 단단한 구조와 좋은 개발 문화가 더해져, 처음부터 끝까지 제대로 완주할 수 있을 거라 기대합니다.",
};

/**
 * 멘토님이 우리에게 바라는 점이자, 우리가 멘토님께 바라는 점 — 서로 맞닿는 7가지 지점.
 * 김도영 멘토님의 모집 기준을 우리 팀의 목소리로 정렬했다.
 */
export const mentorAlignment: {
  no: string;
  want: string;
  hint: string;
}[] = [
    {
      no: "01",
      want: "탄탄한 백엔드 설계",
      hint: "Kotlin·Java/Spring으로 흔들리지 않는 구조를 함께",
    },
    {
      no: "02",
      want: "‘왜?’를 함께 고민",
      hint: "답보다 질문으로, 근본을 짚으며 성장",
    },
    {
      no: "03",
      want: "기획부터 MVP까지",
      hint: "아이디어부터 첫 제품까지 같이 달릴 파트너",
    },
    {
      no: "04",
      want: "일정·운영 잡기",
      hint: "처음이라 막막한 프로젝트 운영, 리듬을 함께",
    },
    {
      no: "05",
      want: "코드리뷰·개발문화",
      hint: "리뷰와 컨벤션, 좋은 팀 문화를 함께 세팅",
    },
    {
      no: "06",
      want: "DB 튜닝·성능 최적화",
      hint: "더 빠른 서비스를 위한 쿼리·성능 개선",
    },
    {
      no: "07",
      want: "MSA·이벤트 기반 아키텍처",
      hint: "확장 가능한 구조를 직접 부딪히며 배우기",
    },
  ];
