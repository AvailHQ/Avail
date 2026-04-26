import React from "react";
import { motion } from "framer-motion";
import {
  ChartLine,
  GitMerge,
  Layers3,
  Orbit,
} from "lucide-react";

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
      className={`flex items-center justify-center w-[86px] h-[86px] rounded-[26px] border border-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.06)] ${accentClass}`}
    >
      {children}
    </div>
  );
}

const IcCycleModel = () => (
  <IconShell
    accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(239,248,253,0.96))]"
  >
    <Orbit className="w-12 h-12 text-[#4FA3C7]" strokeWidth={iconStroke} aria-hidden="true" />
  </IconShell>
);

const IcDecisionEngine = () => (
  <IconShell
    accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(236,250,244,0.96))]"
  >
    <GitMerge className="w-12 h-12 text-[#6CC6A6]" strokeWidth={iconStroke} aria-hidden="true" />
  </IconShell>
);

const IcMultiSignal = () => (
  <IconShell
    accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(239,248,253,0.96))]"
  >
    <Layers3 className="w-12 h-12 text-[#4FA3C7]" strokeWidth={iconStroke} aria-hidden="true" />
  </IconShell>
);

const IcContinuousLearning = () => (
  <IconShell
    accentClass="bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(241,250,246,0.96))]"
  >
    <ChartLine className="w-12 h-12 text-[#6FBF9E]" strokeWidth={iconStroke} aria-hidden="true" />
  </IconShell>
);

interface Capability {
  title: string;
  description: string;
  Icon: () => React.ReactElement;
}

const CAPABILITIES: Capability[] = [
  {
    title: "Cycle-aware modelling",
    description:
      "Models cycle impact on physiology and performance.",
    Icon: IcCycleModel,
  },
  {
    title: "Decision engine",
    description:
      "Turns integrated data into clear daily actions.",
    Icon: IcDecisionEngine,
  },
  {
    title: "Multi-signal integration",
    description:
      "Brings key signals into one unified readiness view.",
    Icon: IcMultiSignal,
  },
  {
    title: "Continuous learning",
    description:
      "Refines decisions through feedback and outcomes.",
    Icon: IcContinuousLearning,
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
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="capabilityGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.8" fill="rgba(0,0,0,0.04)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#capabilityGrid)" />
      </svg>

      <div className="relative z-10 max-w-[1180px] mx-auto">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <p className="text-[10.5px] font-semibold tracking-[0.15em] uppercase text-[#9CA3AF] mb-4">
            Solution
          </p>
          <h2
            id="solution-headline"
            className="font-bold tracking-[-0.03em] text-[#111318] leading-[1.12] mb-3"
            style={{ fontSize: "clamp(24px, 3.1vw, 40px)" }}
          >
            Core capabilities
          </h2>
          <p className="text-[15px] text-[#6B7280] leading-[1.65] max-w-[520px] mx-auto">
            Everything you need to make smarter decisions for female athletes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {CAPABILITIES.map(({ title, description, Icon }, index) => (
            <motion.article
              key={title}
              {...fadeUp(0.08 + index * 0.06)}
              className="group rounded-[24px] bg-white/92 border border-[#E9EDF2] px-6 py-7 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_18px_40px_rgba(111,191,158,0.12)]"
            >
              <div className="mb-6 flex items-center justify-center rounded-[20px] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.98),rgba(240,250,246,0.92))] h-[122px] border border-[#F2F5F8] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                <Icon />
              </div>

              <h3 className="text-[22px] leading-[1.08] tracking-[-0.02em] font-bold text-[#111318] mb-3">
                {title}
              </h3>
              <p className="text-[14px] leading-[1.75] text-[#667085]">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
