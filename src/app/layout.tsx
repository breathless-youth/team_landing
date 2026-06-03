import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import "./globals.css";

// 한글 본문/디스플레이. 디자인 방향(01b)은 Pretendard를 명시하나 next/font/google에
// Pretendard가 없어 빌드 안정성(오프라인·CDN 비의존)을 위해 Noto_Sans_KR로 대체한다.
// Pretendard로 교체하려면 `pretendard` npm 패키지를 next/font/local로 로컬 호스팅한다.
const sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

// 숫자·영문 라벨 전용 (MAU, MENTOR, 17기 영문 메타). 한글에는 적용 금지.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "숨벅찬 청년들 — AI SW 마에스트로 17기 멘토 매칭",
  description:
    "이미 1,100명이 쓰는 서비스를 만들어 본 3명이, 다음 1년을 통째로 비웁니다. 기획·배포·운영을 한 바퀴 돌려본 팀이 이번엔 AI로 한 번 더 돌립니다.",
  openGraph: {
    title: "숨벅찬 청년들 — AI SW 마에스트로 17기",
    description:
      "이미 1,100명이 쓰는 서비스를 만들어 본 3명이, 다음 1년을 통째로 비웁니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${sans.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
