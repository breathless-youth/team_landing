import type { MemberLink } from "@/lib/team";

/** 인라인 SVG 아이콘 — 외부 의존성 없이 시맨틱하게. */
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.44-2.7 5.41-5.27 5.7.42.36.8 1.08.8 2.18v3.23c0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M12 3C6.86 3 2.7 6.28 2.7 10.32c0 2.6 1.74 4.88 4.36 6.18-.19.66-.7 2.4-.8 2.78-.13.47.17.46.36.34.15-.1 2.4-1.63 3.38-2.3.66.1 1.34.15 2 .15 5.14 0 9.3-3.28 9.3-7.32S17.14 3 12 3Z" />
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
      <path d="M4.6 3.4 15 2.6c1.3-.1 1.6 0 2.4.6l3.3 2.3c.6.4.8.5.8 1v13.2c0 .9-.3 1.4-1.4 1.5l-12 .7c-.8 0-1.2-.1-1.7-.7L3.5 18c-.5-.7-.7-1.2-.7-1.8V4.8c0-.7.3-1.3 1.8-1.4Zm.8 1.7c-.3 0-.2.3 0 .5l1.7 1.2c.4.3.6.3 1.2.2l9.6-.6c.2 0 0-.3-.1-.3l-1.9-1.4c-.3-.2-.6-.4-1.2-.3l-9.3.6.2.1ZM9 8.4v9.4l1.8-.1V11l.1.1 3.3 6.5 1.9-.1V8h-1.7v6.2l-.1-.1L11 8.3 9 8.4Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

/**
 * 멤버 연락 링크 — GitHub · 오픈채팅 · 이메일까지만(PII 정책).
 * 전화번호는 노출하지 않는다.
 */
export default function MemberLinks({
  links,
  name,
}: {
  links: MemberLink;
  name: string;
}) {
  // 더 큰 라벨형 버튼 — 아이콘 + 텍스트, 터치타겟 ≥44px.
  const base =
    "inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-line bg-ink/40 px-3.5 py-2.5 text-sm font-medium text-fg-muted transition-colors duration-200 hover:border-lime/50 hover:bg-surface2 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {links.notion && (
        <a
          href={links.notion}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label={`${name} 프로필 (Notion)`}
        >
          <NotionIcon />
          프로필
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label={`${name} GitHub`}
        >
          <GithubIcon />
          GitHub
        </a>
      )}
      {links.velog && (
        <a
          href={links.velog}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label={`${name} 기술 블로그 (velog)`}
        >
          velog
        </a>
      )}
      {links.openchat && (
        <a
          href={links.openchat}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label={`${name} 오픈채팅`}
        >
          <ChatIcon />
          오픈채팅
        </a>
      )}
      {links.email && (
        <a
          href={`mailto:${links.email}`}
          className={base}
          aria-label={`${name} 이메일`}
        >
          <MailIcon />
          이메일
        </a>
      )}
    </div>
  );
}
