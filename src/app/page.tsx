import Hero from "@/components/sections/Hero";
import HowWeWork from "@/components/sections/HowWeWork";
import Idea from "@/components/sections/Idea";
import MentorCTA from "@/components/sections/MentorCTA";
import TeamIntro from "@/components/sections/TeamIntro";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Hero />
      <TeamIntro />
      <HowWeWork />
      <Idea />
      <MentorCTA />

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-shell flex-col items-center gap-2 px-[clamp(1.25rem,5vw,2rem)] py-12 text-center text-xs text-fg-dim">
          <p className="font-display uppercase tracking-[0.12em]">
            숨벅찬 청년들 · AI SW 마에스트로 17기
          </p>
          <p>쉼 없이 달리는 청년들 — 기획부터 운영까지, 이번엔 AI로.</p>
        </div>
      </footer>
    </main>
  );
}
