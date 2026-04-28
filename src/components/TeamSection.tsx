import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
type TeamMember = {
  name: string;
  role: string;
  accent: string;
  photo: string;
  quote: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Muhe Wang",
    role: "Bio-domain & Pgysiology Lead",
    accent: "#74c7a7",
    photo: "/figure/myl.jpg",
    quote:
      "“My goal is to help ensure female athletes are no longer treated as underrepresented variables in sports science, but as a priority in performance innovation.”",
  },
  {
    name: "Yash Saxena",
    role: "Product & Science Lead",
    accent: "#74c7a7",
    photo: "/figure/myl.jpg",
    quote:
      "Performance decisions get better when physiology is treated as context, not noise. AVAIL turns that context into clear daily guidance.",
  },
  {
    name: "Marc Miao",
    role: "Technical & Security Lead",
    accent: "#74c7a7",
    photo: "/figure/myl.jpg",
    quote:
      "Closing the intelligence gap in women’s sport is not just a technical challenge, it is the foundation for building safer, smarter, and physiology-aware performance systems",
  },
  {
    name: "Omar Kamesa",
    role: "Business & Partnerships Lead",
    accent: "#74c7a7",
    photo: "/figure/omar.jpg",
    quote:
      "We build alongside clubs and performance teams so AVAIL fits the rhythm of real training environments, not just perfect dashboards.",
  },
];

const MINT = "#74c7a7";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Ghost avatar (faded side) ─────────────────────────────────────────────
function GhostAvatar({ member }: { member: TeamMember }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-full overflow-hidden opacity-50"
      style={{ width: 78, height: 78 }}
    >
      <img
        src={member.photo}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* White wash overlay */}
      <div className="absolute inset-0 bg-white/35 rounded-full" />
      {/* Soft border */}
      <div className="absolute inset-0 rounded-full border border-[#E8ECF0]" />
    </div>
  );
}

// ─── Active avatar (center) ────────────────────────────────────────────────
function ActiveAvatar({ member }: { member: TeamMember }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 124, height: 124 }}>
      {/* Mint glow */}
      <div
        className="absolute inset-[-10px] rounded-full blur-[28px]"
        style={{ background: MINT, opacity: 0.22 }}
      />
      {/* Accent ring */}
      <div
        className="absolute inset-[-4px] rounded-full"
        style={{
          border: `2.5px solid ${MINT}`,
          boxShadow: `0 0 0 5px ${MINT}20`,
        }}
      />
      {/* Photo */}
      <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: "center calc(50% - 5px)" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

function QuoteIcon() {
  return (
    <svg
      width="44"
      height="34"
      viewBox="0 0 44 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18.8 0C11.4 2.6 7.4 8.2 6.8 16.8h8.7c-.1 5.3-2.8 9.3-8.1 12.2L11 34c7.8-3.3 12.7-9.5 13.2-19.2V0h-5.4Zm19.1 0C30.5 2.6 26.5 8.2 26 16.8h8.7c-.1 5.3-2.8 9.3-8.1 12.2l3.5 5c7.8-3.3 12.7-9.5 13.2-19.2V0h-5.4Z"
        fill={MINT}
      />
    </svg>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = TEAM.length;

  const active = TEAM[activeIndex];
  const prevMember = TEAM[(activeIndex - 1 + n) % n];
  const nextMember = TEAM[(activeIndex + 1) % n];

  function step(delta: number) {
    setActiveIndex((i) => (i + delta + n) % n);
  }

  return (
    <section
      className="relative overflow-hidden px-6 w-full pt-24 pb-32"
      aria-labelledby="team-headline"
      style={{
        background:
          "radial-gradient(ellipse 92% 75% at 50% 30%, #ffffff 0%, #F7F9FC 100%)",
      }}
    >
      {/* Dot grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="teamDots"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.85" fill="rgba(0,0,0,0.05)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#teamDots)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1100px] pb-5">
        {/* ── Centered header ─────────────────────────────── */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p className="mb-3 text-[10.5px] pt-4 font-semibold uppercase tracking-[0.26em] text-[#9CA3AF]">
            Our Team
          </p>
          {/* Mint underline */}
          <div
            className="mx-auto w-8 h-[2.5px] rounded-full"
            style={{ background: MINT }}
          />
        </motion.div>

        {/* ── Two-column body ──────────────────────────────── */}
        <div className="grid grid-cols-2 items-center gap-[8rem] pb-5">
          {/* ── LEFT: Quote (45%) ───────────────────────────── */}
          <motion.div {...fadeUp(0.08)} className="min-w-0 max-w-[620px]">
            <div className="mb-8 select-none">
              <QuoteIcon />
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active.name + "-quote"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[560px]"
              >
                <h2
                  id="team-headline"
                  className="max-w-[560px] font-bold leading-[1.5] tracking-[-0.035em] text-[#111318]"
                  style={{ fontSize: "clamp(22px, 2.6vw, 28px)" }}
                >
                  {active.quote}
                </h2>
              </motion.blockquote>
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Carousel (55%) ───────────────────────── */}
          <motion.div
            {...fadeUp(0.16)}
            className="min-w-0 flex max-w-[460px] flex-col items-center gap-5 justify-self-center"
          >
            {/* Avatar row: [←] [ghost] [active] [ghost] [→] */}
            <div className="flex w-[500px] max-w-none items-center justify-center gap-8 overflow-visible">
              {/* ← arrow (outside-left) */}
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous team member"
                className="flex-shrink-0 w-10 h-10 rounded-full border border-[#E0E5EC] bg-white shadow-sm flex items-center justify-center text-[#6B7280] transition-colors duration-150 hover:border-[#74c7a7] hover:text-[#2C8A72]"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.2} />
              </button>

              {/* Left ghost */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={prevMember.name + "-ghost-l"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GhostAvatar member={prevMember} />
                </motion.div>
              </AnimatePresence>

              {/* Active center */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name + "-active"}
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ActiveAvatar member={active} />
                </motion.div>
              </AnimatePresence>

              {/* Right ghost */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={nextMember.name + "-ghost-r"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <GhostAvatar member={nextMember} />
                </motion.div>
              </AnimatePresence>

              {/* → arrow (outside-right) */}
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next team member"
                className="flex-shrink-0 w-10 h-10 rounded-full border border-[#E0E5EC] bg-white shadow-sm flex items-center justify-center text-[#6B7280] transition-colors duration-150 hover:border-[#74c7a7] hover:text-[#2C8A72]"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.2} />
              </button>
            </div>

            {/* Name + role */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name + "-label"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="text-center"
              >
                <p className="text-[18px] font-bold tracking-[-0.03em] text-[#111318] leading-none">
                  {active.name}
                </p>
                <p
                  className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: MINT }}
                >
                  {active.role}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="flex items-center gap-[7px]">
              {TEAM.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Go to team member ${i + 1}`}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === activeIndex ? 22 : 7,
                    height: 7,
                    background:
                      i === activeIndex ? MINT : "rgba(156,163,175,0.45)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
