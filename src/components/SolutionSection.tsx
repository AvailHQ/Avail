import React from "react";
import { motion } from "framer-motion";
import { ChartLine, GitMerge, Layers3, Orbit, Database, ShieldCheck } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const iconStroke = 2.2;

function IconShell({
  children,
  accentClass,
}: {
  children: React.ReactNode;
  accentClass: string;
}) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/80 shadow-[0_8px_18px_rgba(15,23,42,0.06)] wide:h-14 wide:w-14 ${accentClass}`}
    >
      {children}
    </div>
  );
}

const IcCycleModel = () => (
  <IconShell accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(239,248,253,0.96))]">
    <Orbit
      className="h-6 w-6 text-[#4FA3C7] wide:h-7 wide:w-7"
      strokeWidth={iconStroke}
      aria-hidden="true"
    />
  </IconShell>
);

const IcDecisionEngine = () => (
  <IconShell accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(236,250,244,0.96))]">
    <GitMerge
      className="h-6 w-6 text-[#6CC6A6] wide:h-7 wide:w-7"
      strokeWidth={iconStroke}
      aria-hidden="true"
    />
  </IconShell>
);

const IcMultiSignal = () => (
  <IconShell accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(239,248,253,0.96))]">
    <Layers3
      className="h-6 w-6 text-[#4FA3C7] wide:h-7 wide:w-7"
      strokeWidth={iconStroke}
      aria-hidden="true"
    />
  </IconShell>
);

const IcContinuousLearning = () => (
  <IconShell accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(241,250,246,0.96))]">
    <ChartLine
      className="h-6 w-6 text-[#6FBF9E] wide:h-7 wide:w-7"
      strokeWidth={iconStroke}
      aria-hidden="true"
    />
  </IconShell>
);

const IcDataMoat = () => (
  <IconShell accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(239,250,245,0.96))]">
    <Database
      className="h-6 w-6 text-[#4FA3C7] wide:h-7 wide:w-7"
      strokeWidth={iconStroke}
      aria-hidden="true"
    />
  </IconShell>
);

const IcPrivacyFirst = () => (
  <IconShell accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(241,250,246,0.96))]">
    <ShieldCheck
      className="h-6 w-6 text-[#6FBF9E] wide:h-7 wide:w-7"
      strokeWidth={iconStroke}
      aria-hidden="true"
    />
  </IconShell>
);

interface Capability {
  title: string;
  description: string;
  Icon: () => React.ReactElement;
}

const CAPABILITIES: Capability[] = [
  {
    title: "Adaptive Readiness Engine",
    description: "Models cycle impact on physiology and performance.",
    Icon: IcCycleModel,
  },
  {
    title: "Decision engine",
    description: "Turns integrated data into clear daily actions.",
    Icon: IcDecisionEngine,
  },
  {
    title: "Multi-signal integration",
    description: "Brings key signals into one unified readiness view.",
    Icon: IcMultiSignal,
  },
  {
    title: "Continuous learning",
    description: "Refines decisions through feedback and outcomes.",
    Icon: IcContinuousLearning,
  },
  {
    title: "Data Moat",
    description: "A growing women’s performance dataset that sharpens every decision.",
    Icon: IcDataMoat,
  },
  {
    title: "Privacy-First Architecture",
    description: "Keeps athlete data protected while giving staff clear, usable insights.",
    Icon: IcPrivacyFirst,
  },
];

export default function SolutionSection() {
  return (
    <section
      className="w-full py-28 px-6 relative overflow-hidden"
      aria-labelledby="solution-headline"
      style={{
        background:
          "radial-gradient(ellipse 90% 75% at 50% 30%, #ffffff 0%, #F8F8F6 100%)",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="capabilityGrid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.8" fill="rgba(0,0,0,0.04)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#capabilityGrid)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1180px] hero:max-w-[1320px] wide:max-w-[1560px]">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <p className="text-fluid-xs font-semibold tracking-[0.15em] uppercase text-[#9CA3AF] mb-4">
            Solution
          </p>
          <h2
            id="solution-headline"
            className="font-bold tracking-[-0.03em] text-[#111318] leading-[1.12] mb-3 text-fluid-4xl"
          >
            Core capabilities
          </h2>
          <p className="text-fluid-lg text-[#6B7280] leading-[1.65] max-w-[520px] mx-auto">
            Everything you need to make smarter decisions for female athletes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 wide:grid-cols-6 wide:gap-6">
          {CAPABILITIES.map(({ title, description, Icon }, index) => (
            <motion.article
              key={title}
              {...fadeUp(0.08 + index * 0.06)}
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: "0 22px 44px rgba(111,191,158,0.14)",
                transition: { duration: 0.12, ease: "linear" },
              }}
              className="group min-h-[246px] rounded-[28px] border border-slate-200/70 bg-[#FEFEFC] px-5 py-6 shadow-[0_18px_54px_rgba(15,23,42,0.05)] wide:min-h-[270px] wide:p-7"
            >
              <div className="mb-8 flex transition-transform duration-150 group-hover:scale-[1.05] wide:mb-9">
                <Icon />
              </div>

              <h3 className="mb-3 text-fluid-lg font-bold leading-[1.15] tracking-[-0.02em] text-[#111318]">
                {title}
              </h3>
              <p className="text-fluid-base leading-[1.65] text-[#667085]">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
