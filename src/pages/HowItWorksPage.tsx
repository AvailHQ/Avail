import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Brain,
  Database,
  LayoutDashboard,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

// Shared reveal timings used across the page so motion stays consistent.
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1], delay },
});

const heroReveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
};

interface PipelineStage {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  cardX: number;
  cardY: number;
  nodeX: number;
  nodeY: number;
  nodeSide: "left" | "right";
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    number: "01",
    eyebrow: "STAGE 01 // SIGNAL CAPTURE",
    title: "Athlete Context Intake",
    body: "Capture athlete context before training begins.",
    cardX: 88,
    cardY: 260,
    nodeX: 384,
    nodeY: 334,
    nodeSide: "right",
  },
  {
    number: "02",
    eyebrow: "STAGE 02 // SIGNAL INTEGRATION",
    title: "Context Unification",
    body: "Unify fragmented athlete signals into one interpretable state.",
    cardX: 384,
    cardY: 560,
    nodeX: 384,
    nodeY: 634,
    nodeSide: "left",
  },
  {
    number: "03",
    eyebrow: "STAGE 03 // CONTEXT MODELING",
    title: "Individualized Interpretation",
    body: "Interpret load through individualized physiology.",
    cardX: 88,
    cardY: 860,
    nodeX: 384,
    nodeY: 934,
    nodeSide: "right",
  },
  {
    number: "04",
    eyebrow: "STAGE 04 // DECISION LAYER",
    title: "Load Guidance Generation",
    body: "Turn physiology into actionable coaching support.",
    cardX: 384,
    cardY: 1160,
    nodeX: 384,
    nodeY: 1234,
    nodeSide: "left",
  },
  {
    number: "05",
    eyebrow: "STAGE 05 // TEAM VISIBILITY",
    title: "Structured Readiness View",
    body: "Surface readiness without exposing sensitive data.",
    cardX: 88,
    cardY: 1460,
    nodeX: 384,
    nodeY: 1534,
    nodeSide: "right",
  },
  {
    number: "06",
    eyebrow: "STAGE 06 // LONGITUDINAL CALIBRATION",
    title: "Continuous Context Refinement",
    body: "Every season strengthens the system.",
    cardX: 384,
    cardY: 1760,
    nodeX: 384,
    nodeY: 1834,
    nodeSide: "left",
  },
];

const TRUST_CARDS = [
  {
    title: "Athlete Data Control",
    body: "Athletes choose what is shared and keep sensitive context protected.",
  },
  {
    title: "Structured Coach Insights",
    body: "Coaches receive guidance and readiness signals, not raw cycle logs.",
  },
  {
    title: "Non-Diagnostic Guidance",
    body: "AVAIL supports performance decisions and does not make medical claims.",
  },
  {
    title: "Consent-First Workflow",
    body: "Sensitive inputs stay tied to clear consent and team data boundaries.",
  },
  {
    title: "Privacy-Preserving Design",
    body: "Performance workflows stay useful without exposing unnecessary detail.",
  },
];

function GradientButton({ children }: { children: React.ReactNode }) {
  return (
    <Link
      to="/join-pilot-programme"
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-fluid-base font-bold text-white shadow-[0_12px_30px_rgba(79,163,199,0.24)] transition-all duration-150 hover:-translate-y-px hover:opacity-90 wide:h-[54px] wide:px-7"
      style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function StaticNarrativePanel() {
  return (
    <div className="flex min-h-[360px] flex-col pt-4 hero:min-h-[520px] hero:pt-20 wide:pt-24">
      <p className="mb-12 flex items-center gap-3 text-fluid-xs font-bold uppercase tracking-[0.2em] text-[#4FA3C7] wide:mb-14">
        <span className="h-2 w-2 rounded-full bg-[#4FA3C7] shadow-[0_0_18px_rgba(79,163,199,0.72)]" />
        Contextual Pipelines
      </p>
      <h2 className="workflow-narrative-title max-w-[760px] whitespace-normal font-bold leading-[1.13] tracking-[-0.03em] text-[#111318] text-[1rem] min-[390px]:text-[1.04rem] sm:text-fluid-4xl">
        Contextual Pipelines.
      </h2>
      <p className="mt-8 max-w-[590px] text-fluid-lg font-semibold leading-[1.82] tracking-[-0.01em] text-slate-500 wide:mt-9 wide:max-w-[660px] wide:text-fluid-xl">
        Avail transforms fragmented athlete signals into individualized
        physiological context before coaching decisions are made.
      </p>
    </div>
  );
}

const pipelinePath =
  "M384 334 C510 424 270 544 384 634 C270 724 510 844 384 934 C510 1024 270 1144 384 1234 C270 1324 510 1444 384 1534 C510 1624 270 1744 384 1834";

const pipelineTrackEndY =
  PIPELINE_STAGES[0].cardY -
  PIPELINE_STAGES[PIPELINE_STAGES.length - 1].cardY -
  80;

function SignalPipelineCard({
  stage,
  index,
  progress,
}: {
  stage: PipelineStage;
  index: number;
  progress: MotionValue<number>;
}) {
  const stageCenter =
    PIPELINE_STAGES.length === 1
      ? 0
      : index / (PIPELINE_STAGES.length - 1);
  const stageStart = Math.max(0, stageCenter - 0.13);
  const stageEnd = Math.min(1, stageCenter + 0.14);
  const opacity = useTransform(
    progress,
    [0, stageStart, stageCenter, stageEnd, 1],
    index === 0 ? [0.96, 0.96, 1, 0.76, 0.66] : [0.48, 0.62, 1, 0.76, 0.66],
  );
  const scale = useTransform(
    progress,
    [stageStart, stageCenter, stageEnd],
    [0.985, 1, 0.99],
  );
  const borderColor = useTransform(
    progress,
    [stageStart, stageCenter, stageEnd],
    ["rgba(148,163,184,0.18)", "rgba(79,163,199,0.42)", "rgba(148,163,184,0.2)"],
  );
  const boxShadow = useTransform(
    progress,
    [stageStart, stageCenter, stageEnd],
    [
      "0 18px 52px rgba(15,23,42,0.045), 0 0 0 rgba(79,163,199,0)",
      "0 24px 70px rgba(15,23,42,0.08), 0 0 46px rgba(79,163,199,0.12)",
      "0 18px 52px rgba(15,23,42,0.052), 0 0 18px rgba(111,191,158,0.06)",
    ],
  );
  const dotShadow = useTransform(
    progress,
    [stageStart, stageCenter, stageEnd],
    [
      "0 0 0 rgba(53,199,234,0)",
      "0 0 20px rgba(53,199,234,0.54), 0 0 38px rgba(79,163,199,0.18)",
      "0 0 14px rgba(53,199,234,0.24)",
    ],
  );

  return (
    <>
      <motion.article
        className="absolute w-[296px] rounded-[20px] border bg-white/88 p-5 text-left backdrop-blur-xl"
        style={{
          left: stage.cardX,
          top: stage.cardY,
          opacity,
          scale,
          borderColor,
          boxShadow,
        }}
      >
        <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-[#4FA3C7]">
          {stage.eyebrow}
        </p>
        <h3 className="mt-4 text-fluid-lg font-bold leading-[1.14] tracking-[-0.026em] text-[#111318]">
          {stage.title}
        </h3>
        <p className="mt-3 max-w-[255px] text-fluid-xs font-semibold leading-[1.58] text-slate-500">
          {stage.body}
        </p>
      </motion.article>
      <motion.span
        aria-hidden="true"
        className="absolute h-[18px] w-[18px] rounded-full border-2 border-[#E7FAFF] bg-[#35C7EA]"
        style={{
          left: stage.nodeX - 9,
          top: stage.nodeY - 9,
          opacity,
          boxShadow: dotShadow,
        }}
      />
    </>
  );
}

function MobileSignalPipeline({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [0.05, 0.96], [0, 1]);

  return (
    <div className="relative mt-12 hero:hidden">
      <svg
        className="absolute left-4 top-0 h-full w-10 overflow-visible"
        viewBox="0 0 44 980"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="mobile-pipeline-glow" x="-120%" y="-10%" width="340%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M24 18 C8 114 40 176 22 266 C8 356 40 424 22 514 C6 604 42 668 24 760 C10 852 38 910 22 962"
          fill="none"
          stroke="rgba(30,45,61,0.12)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <motion.path
          d="M24 18 C8 114 40 176 22 266 C8 356 40 424 22 514 C6 604 42 668 24 760 C10 852 38 910 22 962"
          fill="none"
          filter="url(#mobile-pipeline-glow)"
          pathLength={pathLength}
          stroke="#4FA3C7"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
      </svg>
      <div className="space-y-5 pl-14">
        {PIPELINE_STAGES.map((stage) => (
          <div
            key={stage.number}
            className="relative rounded-[22px] border border-slate-200/75 bg-white/86 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          >
            <span className="absolute -left-[2.35rem] top-7 h-4 w-4 rounded-full border-[3px] border-[#FEFEFC] bg-[#4FA3C7] shadow-[0_0_18px_rgba(79,163,199,0.42)]" />
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#4FA3C7]">
              {stage.eyebrow}
            </p>
            <h3 className="mt-4 text-fluid-lg font-bold tracking-[-0.02em] text-[#111318]">
              {stage.title}
            </h3>
            <p className="mt-3 text-fluid-sm font-semibold leading-[1.65] text-slate-500">
              {stage.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalPipelineFlow({ progress }: { progress: MotionValue<number> }) {
  const smoothProgress = useSpring(progress, {
    stiffness: 220,
    damping: 30,
    mass: 0.12,
  });
  const pathLength = useTransform(smoothProgress, [0.035, 0.82], [0, 1]);
  const trackY = useTransform(progress, [0, 0.82], [0, pipelineTrackEndY]);

  return (
    <>
      <div className="relative hidden h-[min(78vh,760px)] min-h-[650px] overflow-visible hero:block wide:h-[min(80vh,880px)] wide:min-h-[760px] wide:w-[704px] wide:justify-self-end">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_54%_45%,rgba(111,191,158,0.12),rgba(254,254,252,0)_58%)]" />
        <div className="absolute left-[50%] top-0 h-[2000px] w-[704px] -translate-x-1/2 overflow-visible wide:left-1/2">
          <motion.div className="absolute inset-0 overflow-visible" style={{ y: trackY }}>
            <svg
              viewBox="0 0 704 2000"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <filter id="pipeline-active-glow" x="-28%" y="-8%" width="156%" height="116%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d={pipelinePath}
                fill="none"
                stroke="rgba(30,45,61,0.11)"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <motion.path
                d={pipelinePath}
                fill="none"
                filter="url(#pipeline-active-glow)"
                pathLength={pathLength}
                stroke="#35C7EA"
                strokeLinecap="round"
                strokeWidth="5"
                opacity="0.18"
              />
              <motion.path
                d={pipelinePath}
                fill="none"
                pathLength={pathLength}
                stroke="#35C7EA"
                strokeLinecap="round"
                strokeWidth="2.7"
              />
            </svg>
            {PIPELINE_STAGES.map((stage, index) => (
              <SignalPipelineCard
                key={stage.number}
                index={index}
                progress={smoothProgress}
                stage={stage}
              />
            ))}
          </motion.div>
        </div>
      </div>
      <MobileSignalPipeline progress={smoothProgress} />
    </>
  );
}

function WorkflowNarrativeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-slate-200/70 bg-[#FEFEFC] hero:min-h-[300vh] wide:min-h-[305vh]"
      aria-labelledby="workflow-narrative-heading"
    >
      <div className="relative flex min-h-screen items-center overflow-visible px-6 py-24 hero:sticky hero:top-0 hero:overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(111,191,158,0.13),rgba(254,254,252,0)_70%)]" />
        <div className="workflow-narrative-grid relative mx-auto grid w-full max-w-[1280px] gap-10 hero:grid-cols-[0.48fr_0.52fr] hero:items-start wide:max-w-[1560px] wide:grid-cols-[minmax(0,620px)_704px] wide:gap-[236px]">
          <div>
            <h2 id="workflow-narrative-heading" className="sr-only">
              How Avail turns athlete context into coaching guidance
            </h2>
            <StaticNarrativePanel />
          </div>
          <SignalPipelineFlow progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

// Hero system diagram showing athlete signals flowing through AVAIL's context layer.
function HeroDiagram() {
  const signalPath =
    "M70 138 C155 102 222 102 312 136 C410 174 482 160 560 120 C644 78 724 88 802 130 C874 168 920 162 984 126";
  const mobileSignalPath =
    "M180 0 C156 92 204 148 180 220 C156 302 204 356 180 434 C158 520 202 588 180 760";
  const nodes = [
    {
      label: "Athlete Inputs",
      subtitle: "Raw Signals",
      Icon: Activity,
      desktopPosition: "hero:right-auto hero:left-[4%] hero:top-[72px] hero:translate-x-0",
      mobilePosition: "left-1/2 top-2 -translate-x-1/2",
      rippleDelay: "0s",
    },
    {
      label: "Signal Process",
      subtitle: "Normalization",
      Icon: SlidersHorizontal,
      desktopPosition: "hero:right-auto hero:left-[25%] hero:top-[82px] hero:translate-x-0",
      mobilePosition: "left-1/2 top-[142px] -translate-x-1/2",
      rippleDelay: "2.5s",
    },
    {
      label: "Context Layer",
      subtitle: "Interpretation",
      Icon: Brain,
      featured: true,
      desktopPosition:
        "hero:right-auto hero:left-1/2 hero:top-[58px] hero:-translate-x-1/2",
      mobilePosition: "left-1/2 top-[284px] -translate-x-1/2",
      rippleDelay: "5s",
    },
    {
      label: "Coaching Decisions",
      subtitle: "Action Layer",
      Icon: LayoutDashboard,
      desktopPosition: "hero:left-auto hero:right-[23%] hero:top-[66px] hero:translate-x-0",
      mobilePosition: "left-1/2 top-[446px] -translate-x-1/2",
      rippleDelay: "7.3s",
    },
    {
      label: "Longitudinal Calibration",
      subtitle: "Continuous Learning",
      Icon: Database,
      desktopPosition: "hero:left-auto hero:right-[4%] hero:top-[72px] hero:translate-x-0",
      mobilePosition: "left-1/2 top-[590px] -translate-x-1/2",
      rippleDelay: "9.5s",
    },
  ];

  return (
    <motion.div
      {...heroReveal}
      transition={{ ...heroReveal.transition, delay: 0.18 }}
      className="relative mx-auto mt-16 max-w-[1180px] overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/82 px-5 py-8 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl hero:px-8 hero:py-10 wide:max-w-[1480px] wide:px-12"
    >
      <div className="absolute -left-8 top-12 h-36 w-36 rounded-full bg-[#6FBF9E]/18 blur-3xl" />
      <div className="absolute -right-8 bottom-12 h-44 w-44 rounded-full bg-[#4FA3C7]/16 blur-3xl" />

      <svg
        viewBox="0 0 1050 260"
        className="pointer-events-none absolute left-1/2 top-8 hidden h-[260px] w-[calc(100%-56px)] -translate-x-1/2 overflow-visible hero:block"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="hero-signal-glow"
            x="-20%"
            y="-80%"
            width="140%"
            height="260%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hero-signal-gradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#6FBF9E" stopOpacity="0.38" />
            <stop offset="52%" stopColor="#4FA3C7" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#8EC8E5" stopOpacity="0.42" />
          </linearGradient>
        </defs>
        <path
          d={signalPath}
          fill="none"
          stroke="rgba(148,163,184,0.20)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d={signalPath}
          className="hero-signal-line"
          fill="none"
          filter="url(#hero-signal-glow)"
          stroke="url(#hero-signal-gradient)"
          strokeDasharray="18 28"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <circle r="5" fill="#8EC8E5" filter="url(#hero-signal-glow)">
          <animateMotion
            dur="10.5s"
            path={signalPath}
            repeatCount="indefinite"
          />
        </circle>
        <circle
          r="3"
          fill="#6FBF9E"
          opacity="0.82"
          filter="url(#hero-signal-glow)"
        >
          <animateMotion
            begin="4.2s"
            dur="12s"
            path={signalPath}
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      <div className="relative min-h-[760px] hero:min-h-[300px]">
        <svg
          viewBox="0 0 360 760"
          className="pointer-events-none absolute inset-0 h-full w-full hero:hidden"
          aria-hidden="true"
        >
          <defs>
            <filter
              id="hero-mobile-signal-glow"
              x="-80%"
              y="-20%"
              width="260%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="hero-mobile-signal-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6FBF9E" stopOpacity="0.7" />
              <stop offset="48%" stopColor="#4FA3C7" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#8EC8E5" stopOpacity="0.74" />
            </linearGradient>
          </defs>
          <path
            d={mobileSignalPath}
            fill="none"
            stroke="rgba(79,163,199,0.28)"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d={mobileSignalPath}
            className="hero-signal-line"
            fill="none"
            filter="url(#hero-mobile-signal-glow)"
            stroke="url(#hero-mobile-signal-gradient)"
            strokeDasharray="16 24"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <circle r="6" fill="#4FA3C7" filter="url(#hero-mobile-signal-glow)">
            <animateMotion
              dur="10.5s"
              path={mobileSignalPath}
              repeatCount="indefinite"
            />
          </circle>
          <circle r="4" fill="#6FBF9E" opacity="0.9" filter="url(#hero-mobile-signal-glow)">
            <animateMotion
              begin="4.2s"
              dur="12s"
              path={mobileSignalPath}
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {nodes.map(
          ({
            label,
            subtitle,
            Icon,
            featured,
            desktopPosition,
            mobilePosition,
            rippleDelay,
          }) => (
            <div
              key={label}
              className={`absolute flex h-[120px] w-[120px] flex-col items-center justify-center border-0 bg-transparent p-2 text-center shadow-none outline-none hero:h-[132px] hero:w-[132px] ${mobilePosition} ${desktopPosition} ${
                featured ? "hero:h-[150px] hero:w-[150px]" : ""
              }`}
            >
              <motion.div
                style={
                  {
                    "--ripple-delay": rippleDelay,
                  } as React.CSSProperties
                }
                animate={
                  featured
                    ? {
                        y: [0, -6, 0],
                        scale: [1, 1.025, 1],
                        boxShadow: [
                          "0 0 0 1px rgba(111,191,158,0.34), 0 18px 60px rgba(111,191,158,0.24), 0 0 86px rgba(111,191,158,0.18)",
                          "0 0 0 1px rgba(111,191,158,0.58), 0 24px 78px rgba(111,191,158,0.34), 0 0 112px rgba(111,191,158,0.26)",
                          "0 0 0 1px rgba(111,191,158,0.34), 0 18px 60px rgba(111,191,158,0.24), 0 0 86px rgba(111,191,158,0.18)",
                        ],
                      }
                    : undefined
                }
                transition={
                  featured
                    ? { duration: 5.8, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
                className={`hero-node-icon mb-3 flex items-center justify-center rounded-[18px] border bg-white/90 text-[#4FA3C7] shadow-[0_14px_36px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 ${
                  featured
                    ? "h-20 w-20 border-[#6FBF9E]/60 bg-white/95 shadow-[0_0_0_1px_rgba(111,191,158,0.34),0_18px_60px_rgba(111,191,158,0.24),0_0_86px_rgba(111,191,158,0.18)]"
                    : "h-14 w-14 border-slate-200/80"
              }`}
            >
              <Icon
                  className={featured ? "h-9 w-9" : "h-6 w-6"}
                  strokeWidth={1.9}
                aria-hidden="true"
              />
            </motion.div>
            <div className="w-[190px] max-w-[72vw] text-center">
              <p
                className={`font-bold leading-[1.16] tracking-[0.01em] text-[#111318] ${
                  featured ? "text-fluid-base" : "text-fluid-sm opacity-70"
                }`}
              >
                {label}
              </p>
              <p
                className={`mt-1.5 text-[0.7rem] font-semibold leading-[1.2] text-slate-500 sm:text-fluid-xs ${
                  featured ? "" : "opacity-70"
                }`}
              >
                {subtitle}
              </p>
            </div>
          </div>
          ),
        )}
      </div>
    </motion.div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="bg-[#FAFBF8] text-[#111318]">
      {/* Hero: page promise and high-level product flow. */}
      <section
        className="relative overflow-hidden px-6 pb-28 pt-32 hero:pt-40 wide:pb-32"
        aria-labelledby="how-it-works-hero"
      >
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(111,191,158,0.20),rgba(250,251,248,0)_68%)]" />
        <div className="relative z-10 mx-auto max-w-[1120px] text-center wide:max-w-[1560px]">
          <motion.p
            {...heroReveal}
            className="mb-5 text-fluid-xs font-bold uppercase tracking-[0.18em] text-[#4FA3C7]"
          >
            How it works
          </motion.p>
          <motion.h1
            {...heroReveal}
            transition={{ ...heroReveal.transition, delay: 0.06 }}
            id="how-it-works-hero"
            className="mx-auto max-w-[900px] font-bold leading-[1.13] tracking-[-0.03em] text-[#111318] text-[1rem] min-[390px]:text-[1.04rem] sm:text-fluid-4xl wide:max-w-[1180px]"
          >
            Turning athlete context into better training decisions.
          </motion.h1>
          <motion.p
            {...heroReveal}
            transition={{ ...heroReveal.transition, delay: 0.12 }}
            className="mx-auto mt-7 max-w-[660px] text-fluid-lg leading-[1.8] text-slate-500 wide:max-w-[760px]"
          >
            Avail surfaces individualized physiological context before training
            decisions are made, helping coaching staff interpret load beyond
            population averages.
          </motion.p>
          <HeroDiagram />
        </div>
      </section>

      {/* Scroll-driven narrative: athlete context activates into a living system flow. */}
      <WorkflowNarrativeSection />

      {/* Privacy and trust: clarifies data boundaries and non-medical positioning. */}
      <section
        className="px-6 py-28 wide:py-32"
        aria-labelledby="privacy-heading"
      >
        <div className="mx-auto max-w-[1120px] wide:max-w-[1560px]">
          <motion.div {...fadeUp(0)}>
            <p className="mb-4 text-fluid-xs font-bold uppercase tracking-[0.16em] text-[#4FA3C7]">
              Privacy and trust
            </p>
            <h2
              id="privacy-heading"
              className="flex items-center gap-4 font-bold leading-[1.06] tracking-[-0.045em] text-[#111318] text-fluid-4xl"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF8F2] text-[#27815D] shadow-[0_14px_34px_rgba(39,129,93,0.12)]">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              Private by design.
            </h2>
            <p className="mt-6 max-w-[520px] text-fluid-lg leading-[1.8] text-slate-500">
              Athletes retain control while coaches receive structured guidance,
              not raw cycle logs or diagnostic claims.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="mt-16 grid gap-7 hero:grid-cols-3 wide:gap-9"
          >
            {TRUST_CARDS.map((card) => (
              <div
                key={card.title}
                className="group rounded-[25px] bg-gradient-to-br from-slate-200/80 via-slate-200/70 to-slate-200/80 p-px transition-all duration-200 hover:-translate-y-[2px] hover:from-[#6FBF9E] hover:via-[#A7ECD0] hover:to-[#4FA3C7] hover:shadow-[0_22px_54px_rgba(15,23,42,0.10)]"
              >
                <div className="h-full rounded-[24px] bg-[#FEFEFC]/90 p-7 transition-colors duration-200 group-hover:bg-white hero:min-h-[170px] wide:p-8">
                  <h3 className="text-fluid-lg font-bold tracking-[-0.02em] text-[#111318]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-fluid-md leading-[1.75] text-slate-500">
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final conversion CTA. */}
      <section className="bg-white px-6 py-28 wide:py-32">
        <motion.div
          {...fadeUp(0)}
          className="mx-auto max-w-[1080px] overflow-hidden rounded-[36px] border border-slate-200/70 bg-gradient-to-b from-white via-[#F7FBFF] to-[#DDEBFF] p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] hero:p-16 wide:max-w-[1320px]"
        >
          <h2 className="mx-auto max-w-[680px] text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#111318] sm:text-fluid-4xl sm:leading-[1.05] sm:tracking-[-0.045em] wide:max-w-[820px]">
            Modernise women's load management.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-fluid-base leading-[1.7] text-slate-500 sm:text-fluid-lg sm:leading-[1.75]">
            Bring cycle-aware performance intelligence into the decisions your
            staff already make every day.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GradientButton>Apply for Pilot Access</GradientButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
