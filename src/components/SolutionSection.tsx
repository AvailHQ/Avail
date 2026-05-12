import React from "react";
import { motion } from "framer-motion";
import { Database, GitMerge, Layers3, Orbit } from "lucide-react";

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

const IcLongitudinalLayer = () => (
  <IconShell accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(239,250,245,0.96))]">
    <Database
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
    title: "Pre-session decision support",
    description:
      "Before training begins, coaches know who can push and who needs recovery.",
    Icon: IcCycleModel,
  },
  {
    title: "Built for female athletes",
    description: "Built for female athletes. Not adapted from male data.",
    Icon: IcDecisionEngine,
  },
  {
    title: "Her data stays hers",
    description:
      "Private health data stays private. Coaches see structured readiness signals only.",
    Icon: IcMultiSignal,
  },
];

export default function SolutionSection() {
  return (
    <section
      className="w-full px-5 py-20 relative overflow-hidden hero:px-8 hero:py-24 wide:py-28"
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

      <div className="relative z-10 mx-auto max-w-[1160px] wide:max-w-[1440px]">
        <motion.div {...fadeUp(0)} className="mb-12 max-w-[760px] hero:mb-16">
          <p className="mb-8 flex items-center gap-3 text-fluid-xs font-semibold tracking-[0.15em] uppercase text-[#6FBF9E]">
            <span className="h-2 w-2 rounded-full bg-[#4FA3C7]" />
            WHAT YOU GET
          </p>
          <h2
            id="solution-headline"
            className="mb-5 max-w-[680px] text-fluid-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#111318]"
          >
            Core capabilities
          </h2>
          <p className="max-w-[560px] text-fluid-lg leading-[1.65] text-[#6B7280]">
            Everything you need to make smarter decisions for female athletes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 wide:gap-8">
          {CAPABILITIES.map(({ title, description, Icon }, index) => (
            <motion.article
              key={title}
              {...fadeUp(0.08 + index * 0.06)}
              className="rounded-[24px] bg-gradient-to-br from-slate-200/70 via-slate-200/70 to-slate-200/70 p-px shadow-[0_18px_54px_rgba(15,23,42,0.05)] transition-colors duration-150 hover:from-[#6FBF9E] hover:via-[#A7ECD0] hover:to-[#4FA3C7]"
            >
              <div className="h-full rounded-[23px] bg-[#FEFEFC] px-6 py-7 hero:px-7 hero:py-8 wide:p-9">
                <div className="mb-16 flex hero:mb-20 wide:mb-24">
                  <Icon />
                </div>

                <h3 className="mb-4 text-fluid-xl font-bold leading-[1.15] tracking-[-0.02em] text-[#111318]">
                  {title}
                </h3>
                <p className="text-fluid-base leading-[1.65] text-[#667085]">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}

          <motion.article
            {...fadeUp(0.28)}
            className="rounded-[24px] bg-gradient-to-br from-slate-200/70 via-slate-200/70 to-slate-200/70 p-px shadow-[0_18px_54px_rgba(15,23,42,0.05)] transition-colors duration-150 hover:from-[#6FBF9E] hover:via-[#A7ECD0] hover:to-[#4FA3C7] md:col-span-3"
          >
            <div className="grid h-full gap-7 rounded-[23px] bg-[#FEFEFC] px-7 py-8 hero:grid-cols-[140px_1fr] hero:items-center hero:px-8 hero:py-10 wide:grid-cols-[170px_1fr] wide:p-12">
              <div className="flex">
                <IcLongitudinalLayer />
              </div>

              <div>
                <h3 className="mb-5 text-fluid-xl font-bold leading-[1.15] tracking-[-0.02em] text-[#111318]">
                  Gets smarter every season
                </h3>
                <p className="max-w-[920px] text-fluid-base leading-[1.65] text-[#667085]">
                  Every training session adds to a growing dataset that links
                  cycle patterns to real performance outcomes.
                  <br />
                  The longer you use it, the more precise the guidance becomes.
                  <br />
                  It's learning from your athletes, not from a textbook.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
