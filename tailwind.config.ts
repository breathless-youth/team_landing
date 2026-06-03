import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 베이스 (딥 차콜-네이비)
        ink: "#0B0E14", // 페이지 최하단 배경 (body)
        surface: "#121620", // 카드/섹션 박스 배경
        surface2: "#1A1F2B", // 카드 hover / 한 단계 띄운 면
        line: "#262D3A", // 디바이더·보더 (1px)

        // 텍스트
        fg: "#EAEEF5", // 본문 기본 (오프화이트, 순백 금지)
        "fg-muted": "#9AA4B6", // 보조/캡션
        "fg-dim": "#5E687A", // 비활성·메타

        // 액센트 1 — 라임 그린 (메인 에너지/궤적/CTA)
        lime: "#C6F24E", // 핵심 액센트. 숫자·CTA·트레이서선
        "lime-700": "#9BCB1E", // hover/active 딥 톤
        "lime-glow": "#C6F24E33", // 그림자/글로우용 (알파 20%)

        // 액센트 2 — 일렉트릭 시안 (보조, AI/기술 신호 한정)
        cyan: "#5BE3D6", // 아이디어 섹션 AI 스텝·기술 태그에만 절제 사용
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Pretendard", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // §2 타입 스케일 (clamp 반응형)
        display: [
          "clamp(2.5rem, 7vw, 5.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
        stat: [
          "clamp(3rem, 9vw, 7rem)",
          { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h3: [
          "clamp(1.15rem, 2.2vw, 1.5rem)",
          { lineHeight: "1.35", fontWeight: "700" },
        ],
        lead: [
          "clamp(1.05rem, 1.6vw, 1.35rem)",
          { lineHeight: "1.6", fontWeight: "500" },
        ],
      },
      maxWidth: {
        shell: "72rem", // 1152px 중앙 그리드
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "dot-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 #C6F24E33" },
          "50%": { boxShadow: "0 0 0 8px transparent" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "dot-pulse": "dot-pulse 2.5s ease-in-out infinite",
        "sheet-up": "sheet-up 300ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
