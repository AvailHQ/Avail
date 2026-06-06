import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

interface Audience {
  title: string;
  tagline: string;
  bullets: string[];
}

interface AvatarCrop {
  centerX: number;
  centerY: number;
  size: number;
}

const SQUAD_IMAGE = {
  src: "/squad.png",
  width: 1536,
  height: 1024,
};

const AVATAR_CROPS = {
  chloe: { centerX: 306, centerY: 269, size: 368 },
  sofia: { centerX: 768, centerY: 269, size: 368 },
  priya: { centerX: 1230, centerY: 269, size: 368 },
  emma: { centerX: 306, centerY: 750, size: 368 },
} satisfies Record<string, AvatarCrop>;

function getAvatarCropStyle(avatarCrop: AvatarCrop, size: number): CSSProperties {
  const scale = size / avatarCrop.size;
  const backgroundX = size / 2 - avatarCrop.centerX * scale;
  const backgroundY = size / 2 - avatarCrop.centerY * scale;

  return {
    backgroundImage: `url('${SQUAD_IMAGE.src}')`,
    backgroundPosition: `${backgroundX}px ${backgroundY}px`,
    backgroundSize: `${SQUAD_IMAGE.width * scale}px ${SQUAD_IMAGE.height * scale}px`,
  };
}

const AUDIENCES: Audience[] = [
  {
    title: "Coach",
    tagline: "Shouldn't Have To Guess.",
    bullets: [
      "See who's ready",
      "See who needs a lighter day",
      "Before training starts",
    ],
  },
  {
    title: "Athletes",
    tagline: "Shouldn't Have To Explain Themselves.",
    bullets: [
      "A Quick Check-In.",
      "A Clearer Picture.",
      "Without Sharing Everything",
    ],
  },
  {
    title: "Performance Teams",
    tagline: "Need The Full Picture.",
    bullets: ["One view", "Every athlete", "Before decisions are made"],
  },
];

export default function WhoItsForSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAudience = AUDIENCES[activeIndex];
  const mockupOrder = [0, 1, 2];

  const getMockupStackStyle = (mockupIndex: number) => {
    const stackIndex = (mockupIndex - activeIndex + mockupOrder.length) % mockupOrder.length;
    const positions = [
      { opacity: 1, x: 0, y: 0, scale: 1, zIndex: 30 },
      { opacity: 0.42, x: 54, y: -42, scale: 0.96, zIndex: 20 },
      { opacity: 0, x: 100, y: -78, scale: 0.92, zIndex: 10 },
    ];

    return positions[stackIndex];
  };

  return (
    <section
      className="relative w-full overflow-hidden px-5 py-24 hero:px-8 hero:py-32 wide:py-36"
      aria-labelledby="who-its-for-headline"
      style={{
        background:
          "radial-gradient(ellipse 90% 75% at 50% 20%, #ffffff 0%, #F8F8F6 100%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="whoItsForGrid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.8" fill="rgba(0,0,0,0.035)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#whoItsForGrid)" />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-16 hero:grid-cols-[3fr_2fr] hero:items-center hero:gap-16 wide:max-w-[1520px] wide:gap-20">
        <motion.div
          {...fadeUp(0.12)}
          className="relative hidden h-[560px] overflow-hidden rounded-[22px] border border-slate-300 shadow-[0_24px_80px_rgba(15,23,42,0.13)] hero:block wide:h-[600px]"
          style={{ background: "#ECECEC" }}
          aria-label="Dashboard mockup"
        >
          <div className="flex h-full flex-col">
          {/* macOS title bar */}
          <div className="flex h-12 flex-shrink-0 items-center gap-2 border-b border-slate-200 px-4" style={{ background: "#ECECEC" }}>
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>

          {/* content area */}
          <div className="relative flex-1 overflow-hidden bg-white">
            {mockupOrder.map((mockupIndex) => (
              <motion.div
                key={mockupIndex}
                className="absolute inset-0 overflow-hidden bg-white"
                animate={getMockupStackStyle(mockupIndex)}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: "center center",
                  willChange: "opacity, transform",
                }}
                aria-hidden={mockupIndex !== activeIndex}
              >

          {/* Coach mockup */}
          {mockupIndex === 0 && (
            <div className="overflow-hidden">
              <div className="border-b border-slate-100 px-6 py-4">
                <p className="flex items-center gap-2 text-[13px] font-medium text-[#3B6FA0]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#3B6FA0]/30 text-[10px]">i</span>
                  Today's physiological context — use alongside your professional judgement.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3 px-6 py-5">
                {[
                  { count: 3, label: "Requires Attention", color: "#92690A", bg: "rgba(251,243,224,0.8)", icon: "⚠" },
                  { count: 2, label: "Stable Context", color: "#2D7A50", bg: "rgba(224,245,235,0.8)", icon: "✓" },
                  { count: 1, label: "Pending Check-In", color: "#2C5B8A", bg: "rgba(224,236,248,0.8)", icon: "◷" },
                  { count: 1, label: "Context Unavailable", color: "#8A929E", bg: "rgba(240,241,243,0.8)", icon: "◌" },
                ].map(({ count, label, color, bg, icon }) => (
                  <div key={label} className="rounded-2xl px-4 py-4" style={{ background: bg }}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-2xl font-bold" style={{ color }}>{count}</span>
                      <span className="text-base" style={{ color }}>{icon}</span>
                    </div>
                    <p className="text-[11px] font-semibold leading-tight" style={{ color }}>{label}</p>
                  </div>
                ))}
              </div>
              <div className="mx-6 mb-6 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-[#111318]">Squad Load Overview</p>
                  <div className="flex items-center gap-3 text-[11px] text-[#6B7280]">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#2D7A50]" />Maintain</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#92690A]" />Reduce</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#6F5BA8]" />Recovery</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Chloe Williams", score: 44, color: "#6F5BA8", width: "44%", avatarCrop: AVATAR_CROPS.chloe },
                    { name: "Sofia Rodriguez", score: 52, color: "#92690A", width: "52%", avatarCrop: AVATAR_CROPS.sofia },
                    { name: "Priya Sharma", score: 64, color: "#2D7A50", width: "64%", avatarCrop: AVATAR_CROPS.priya },
                    { name: "Emma Thompson", score: null, color: "#CBD5E1", width: "100%", avatarCrop: AVATAR_CROPS.emma },
                  ].map(({ name, score, color, width, avatarCrop }) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="h-7 w-7 flex-shrink-0 rounded-full bg-slate-200 bg-no-repeat" style={getAvatarCropStyle(avatarCrop, 28)} />
                      <p className="w-32 flex-shrink-0 text-[12px] font-medium text-[#111318]">{name}</p>
                      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width, background: score ? color : "repeating-linear-gradient(90deg, #CBD5E1 0px, #CBD5E1 6px, transparent 6px, transparent 10px)" }} />
                      </div>
                      <p className="w-12 text-right text-[12px] font-bold" style={{ color: score ? color : "#9CA3AF" }}>{score ?? "Pending"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Athlete mockup */}
          {mockupIndex === 1 && (
            <div className="grid h-full grid-cols-2 overflow-hidden bg-[#F7FBFF]">
              {/* Left — Load Score */}
              <div className="border-r border-slate-100 bg-white px-6 py-6">
                <p className="text-[15px] font-bold text-[#111318]">Good afternoon, Maya.</p>
                <p className="mb-5 text-[11px] text-[#9CA3AF]">Saturday 6 June</p>
                {/* Circle with gradient stroke via linearGradient */}
                <div className="mb-4 flex flex-col items-center">
                  <div className="relative flex h-28 w-28 items-center justify-center">
                    <svg className="absolute inset-0" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6FBF9E" />
                          <stop offset="100%" stopColor="#4FA3C7" />
                        </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="66" transform="rotate(-90 50 50)" />
                    </svg>
                    <div className="text-center">
                      <p className="text-2xl font-bold" style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>78</p>
                      <p className="mx-auto max-w-[72px] text-[7px] leading-tight text-[#6B7280]">Good Load Tolerance</p>
                    </div>
                  </div>
                </div>
                <div className="mb-2 flex justify-center">
                  <span className="rounded-full px-3 py-1 text-[11px] font-semibold text-white" style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}>Context suggests: Maintain</span>
                </div>
                <div className="mb-4 flex justify-center gap-2">
                  <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] text-[#6B7280]">Confidence: High</span>
                  <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] text-[#6B7280]">→ Stable</span>
                </div>
                {/* 7-day chart */}
                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                  <p className="mb-2 text-[11px] font-semibold text-[#111318]">7-day pattern</p>
                  <svg viewBox="0 0 160 40" className="w-full">
                    <defs>
                      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6FBF9E" />
                        <stop offset="100%" stopColor="#4FA3C7" />
                      </linearGradient>
                    </defs>
                    <polyline points="10,28 30,24 50,26 70,25 90,22 110,18 130,16 150,15" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" strokeLinejoin="round" />
                    {[10,30,50,70,90,110,130,150].map((x, i) => {
                      const ys = [28,24,26,25,22,18,16,15];
                      return <circle key={x} cx={x} cy={ys[i]} r="2.5" fill={i === 7 ? "#4FA3C7" : "#D1D5DB"} />;
                    })}
                  </svg>
                  <div className="flex justify-between text-[9px] text-[#9CA3AF]">
                    {["M","T","W","T","F","S","S"].map(d => <span key={d}>{d}</span>)}
                  </div>
                </div>
              </div>
              {/* Right — Check-in */}
              <div className="px-5 py-5">
                <p className="text-[13px] font-bold text-[#111318]">Update Today's Context</p>
                <p className="mb-4 text-[10px] text-[#9CA3AF]">⏱ Takes about 30 seconds</p>
                <div className="space-y-4">
                  {[
                    { label: "Sleep quality", lo: "Difficult", hi: "Restful", val: 55 },
                    { label: "Energy level", lo: "Very tired", hi: "Full of energy", val: 55 },
                    { label: "Body feeling", lo: "Very sore", hi: "Feeling good", val: 55 },
                    { label: "Mental readiness", lo: "Low", hi: "High", val: 55 },
                  ].map(({ label, lo, hi, val }) => (
                    <div key={label}>
                      <div className="mb-1 flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-[#111318]">{label}</p>
                        <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white" style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}>3</span>
                      </div>
                      <div className="relative h-2 rounded-full bg-slate-200">
                        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${val}%`, background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }} />
                        <div className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full shadow" style={{ left: `calc(${val}% - 8px)`, background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }} />
                      </div>
                      <div className="mt-0.5 flex justify-between text-[9px] text-[#9CA3AF]">
                        <span>{lo}</span><span>{hi}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-white p-3">
                  <p className="mb-2 text-[10px] text-[#6B7280]">Any cycle changes today?</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full px-2 py-1 text-[9px] font-bold text-white" style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}>Nothing to report</span>
                    <span className="rounded-full border border-slate-200 px-2 py-1 text-[9px] text-[#6B7280]">Period started</span>
                    <span className="rounded-full border border-slate-200 px-2 py-1 text-[9px] text-[#6B7280]">Period ended</span>
                  </div>
                </div>
                <div className="mt-3 rounded-xl py-2 text-center text-[11px] font-bold text-white" style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}>✓ Update context</div>
              </div>
            </div>
          )}

          {/* Performance Teams mockup */}
          {mockupIndex === 2 && (
            <div className="flex h-full min-h-0 flex-col overflow-hidden">
              {/* Header */}
              <div className="flex-shrink-0 border-b border-slate-100 px-6 py-3">
                <p className="text-[13px] font-semibold text-[#111318]">Squad Readiness Matrix</p>
                <p className="text-[11px] text-[#9CA3AF]">Week of 2 June · 7 athletes active</p>
              </div>

              {/* Squad Readiness Matrix */}
              <div className="flex-shrink-0 px-6 py-3">
                <div className="mb-1.5 grid grid-cols-[1fr_100px_60px_90px_110px] gap-2 text-[9px] font-semibold uppercase tracking-wide text-[#9CA3AF]">
                  <span>Athlete</span>
                  <span>Cycle context</span>
                  <span>Load</span>
                  <span>Direction</span>
                  <span>Staff note</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { name: "Chloe Williams", avatarCrop: AVATAR_CROPS.chloe, cycle: "Late luteal", load: 44, loadColor: "#6F5BA8", direction: "Recovery", dirColor: "#6F5BA8", dirBg: "rgba(111,91,168,0.08)", note: "Monitor soreness" },
                    { name: "Sofia Rodriguez", avatarCrop: AVATAR_CROPS.sofia, cycle: "Follicular", load: 52, loadColor: "#92690A", direction: "Reduce", dirColor: "#92690A", dirBg: "rgba(146,105,10,0.08)", note: "Pre-match load" },
                    { name: "Priya Sharma", avatarCrop: AVATAR_CROPS.priya, cycle: "Ovulatory", load: 64, loadColor: "#2D7A50", direction: "Maintain", dirColor: "#2D7A50", dirBg: "rgba(45,122,80,0.08)", note: "Normal response" },
                    { name: "Emma Thompson", avatarCrop: AVATAR_CROPS.emma, cycle: "Mid follicular", load: 58, loadColor: "#2D7A50", direction: "Maintain", dirColor: "#2D7A50", dirBg: "rgba(45,122,80,0.08)", note: "Returning from travel" },
                  ].map(({ name, avatarCrop, cycle, load, loadColor, direction, dirColor, dirBg, note }) => (
                    <div key={name} className="grid grid-cols-[1fr_100px_60px_90px_110px] items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 flex-shrink-0 rounded-full bg-slate-200 bg-no-repeat" style={getAvatarCropStyle(avatarCrop, 24)} />
                        <p className="text-[11px] font-medium text-[#111318]">{name}</p>
                      </div>
                      <p className="text-[10px] text-[#6B7280]">{cycle}</p>
                      <p className="text-[12px] font-bold" style={{ color: loadColor }}>{load ?? "—"}</p>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ color: dirColor, background: dirBg }}>{direction}</span>
                      <p className="text-[10px] text-[#9CA3AF]">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7-day Load Trend */}
              <div className="min-h-0 flex-1 border-t border-slate-100 px-6 py-3">
                <p className="mb-1.5 text-[11px] font-semibold text-[#111318]">7-day Load Trend</p>
                <div className="relative h-[130px]">
                  <svg viewBox="0 0 520 90" className="h-full w-full overflow-visible">
                    {/* Y axis labels */}
                    {[{ y: 10, label: "80" }, { y: 35, label: "55" }, { y: 60, label: "30" }].map(({ y, label }) => (
                      <g key={label}>
                        <text x="18" y={y + 3} fontSize="7" fill="#CBD5E1" textAnchor="end">{label}</text>
                        <line x1="22" y1={y} x2="420" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                      </g>
                    ))}
                    {/* Y axis line */}
                    <line x1="22" y1="5" x2="22" y2="70" stroke="#E2E8F0" strokeWidth="1" />

                    {/* Priya — gentle zigzag with upward trend (green) */}
                    <polyline points="22,55 78,47 134,50 190,40 246,44 302,32 358,36 420,14" fill="none" stroke="#2D7A50" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Sofia — gentle zigzag with downward trend (amber) */}
                    <polyline points="22,20 78,28 134,24 190,36 246,30 302,44 358,38 420,54" fill="none" stroke="#92690A" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Chloe — gentle zigzag, slowly rising (purple) */}
                    <polyline points="22,66 78,60 134,64 190,56 246,60 302,50 358,54 420,44" fill="none" stroke="#6F5BA8" strokeWidth="1.5" strokeLinejoin="round" />
                    {/* Emma — returning from travel, observed but stable */}
                    <polyline points="22,46 78,48 134,47 190,49 246,47 302,48 358,46 420,45" fill="none" stroke="#8FA8C5" strokeWidth="1.5" strokeLinejoin="round" />

                    {/* Avatars + firstname at end of each line */}
                    {[
                      { cy: 14, avatarCrop: AVATAR_CROPS.priya, name: "Priya" },
                      { cy: 42, avatarCrop: AVATAR_CROPS.chloe, name: "Chloe" },
                      { cy: 54, avatarCrop: AVATAR_CROPS.sofia, name: "Sofia" },
                      { cy: 66, avatarCrop: AVATAR_CROPS.emma, name: "Emma" },
                    ].map(({ cy, avatarCrop, name }, i) => (
                      <g key={i}>
                        <foreignObject x="430" y={cy - 9} width="18" height="18">
                          <div
                            className="bg-no-repeat"
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: "50%",
                              overflow: "hidden",
                              ...getAvatarCropStyle({ ...avatarCrop, size: 460 }, 18),
                            }}
                          />
                        </foreignObject>
                        <text x="451" y={cy + 3} fontSize="7.5" fill="#6B7280" fontWeight="500">{name}</text>
                      </g>
                    ))}

                    {/* X axis labels */}
                    {["M","T","W","T","F","S","S"].map((d, i) => (
                      <text key={i} x={22 + i * 56} y="80" fontSize="7" fill="#CBD5E1" textAnchor="middle">{d}</text>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          )}
              </motion.div>
            ))}
          </div>{/* end white content area */}
          <div
            className="h-12 flex-shrink-0 border-t border-slate-200 px-4"
            style={{ background: "#ECECEC" }}
            aria-hidden="true"
          />
          </div>{/* end flex column */}
        </motion.div>

        <motion.div
          {...fadeUp(0)}
          className="hero:max-w-[640px] wide:max-w-[700px]"
        >
          <p className="mb-6 flex items-center gap-3 text-fluid-xs font-semibold uppercase tracking-[0.15em] text-[#6FBF9E]">
            <span className="h-2 w-2 rounded-full bg-[#4FA3C7]" />
            BUILT AROUND THE PEOPLE MAKING THE CALLS
          </p>
          <h2
            id="who-its-for-headline"
            className="mb-10 text-fluid-3xl font-bold leading-[1.08] tracking-[-0.03em] text-[#111318] hero:mb-12 hero:text-fluid-4xl"
          >
            Who It's For
          </h2>

          <div className="relative py-2 pl-5 sm:pl-7 hero:py-4 hero:pl-9 wide:pl-10">
            <div
              className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full hero:bottom-5 hero:top-5"
              style={{
                background: "linear-gradient(180deg, #6FBF9E, #4FA3C7)",
              }}
            />
            <div className="space-y-6 hero:space-y-8">
              {AUDIENCES.map((audience, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={audience.title}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setActiveIndex(index)}
                    className="block w-full text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#6FBF9E]"
                    aria-expanded={isActive}
                  >
	                    <span
	                      className={`block min-h-[2.64em] leading-[1.32] tracking-[-0.01em] transition-colors duration-200 ${
	                        isActive
                            ? "text-fluid-lg font-normal text-[#111318] hero:text-fluid-xl"
                            : "text-fluid-md text-[#9AA3B1] hero:text-fluid-lg"
	                      }`}
	                    >
	                      <span
                          className="font-bold"
                          style={
                            isActive
                              ? {
                                  background:
                                    "linear-gradient(45deg, #6FBF9E, #4FA3C7)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }
                              : undefined
                          }
                        >
                          {audience.title}
                        </span>{" "}
                      <span className="font-normal">{audience.tagline}</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {isActive && (
	                        <motion.div
	                          key={`${audience.title}-content`}
	                          initial={{ opacity: 0, height: 0, y: 10 }}
	                          animate={{ opacity: 1, height: "auto", y: 0 }}
	                          exit={{ opacity: 0, height: 0, y: 10 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="min-h-[104px] pt-4 hero:min-h-[118px] hero:pt-5">
                            <ul className="space-y-2 text-fluid-sm leading-[1.6] text-[#3F4650] sm:text-fluid-base hero:space-y-2.5">
                              {audience.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-3">
                                  <span
                                    className="mt-[0.62em] h-1 w-1 flex-shrink-0 rounded-full bg-[#6FBF9E]"
                                    aria-hidden="true"
                                  />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
