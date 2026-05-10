import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Brain,
  Database,
  LayoutDashboard,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
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

// The workflow data powers the scroll-driven narrative system.
type MockupKind =
  | "checkin"
  | "signals"
  | "engine"
  | "score"
  | "dashboard"
  | "learning";

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  supporting: string;
  kind: MockupKind;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: "01",
    title: "Athlete Signals",
    description: "Capture context before training begins.",
    supporting:
      "Athletes submit lightweight daily inputs including sleep, soreness, fatigue, and cycle-related context.",
    kind: "checkin",
  },
  {
    number: "02",
    title: "Signal Integration",
    description: "Unify fragmented athlete signals.",
    supporting:
      "Avail transforms isolated wellness and training signals into one interpretable physiological state.",
    kind: "signals",
  },
  {
    number: "03",
    title: "Context Layer",
    description: "Interpret load through individualized physiology.",
    supporting:
      "The system models how each athlete may tolerate training under current physiological conditions.",
    kind: "engine",
  },
  {
    number: "04",
    title: "Load Guidance",
    description: "Turn physiology into actionable coaching support.",
    supporting:
      "Coaches receive decision-ready readiness guidance before sessions begin.",
    kind: "score",
  },
  {
    number: "05",
    title: "Team Visibility",
    description: "Surface readiness without exposing sensitive data.",
    supporting:
      "Performance staff see structured indicators, not raw physiological logs.",
    kind: "dashboard",
  },
  {
    number: "06",
    title: "Longitudinal Calibration",
    description: "Every season strengthens the system.",
    supporting:
      "As more training cycles are captured, the system gains stronger calibration and more individualized context.",
    kind: "learning",
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

// Mockup helper for repeated score/progress rows inside device visuals.
function MetricBar({
  label,
  value,
  tone = "teal",
}: {
  label: string;
  value: number;
  tone?: "teal" | "blue" | "warm";
}) {
  const color =
    tone === "warm"
      ? "from-[#F5B76B] to-[#F07F5F]"
      : tone === "blue"
        ? "from-[#4FA3C7] to-[#8EC8E5]"
        : "from-[#6FBF9E] to-[#4FA3C7]";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-fluid-xs font-semibold text-slate-500">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// Floating UI fragments sit on top of product mockups for extra SaaS depth.
function FloatingCard({
  className = "",
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_18px_44px_rgba(15,23,42,0.12)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Step 01 visual: athlete daily check-in phone.
function PhoneCheckIn() {
  return (
    <img
      src="/figure/step1.png"
      alt="Athlete readiness check-in preview"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

// Step 02 visual: multiple athlete signals converging into one integration layer.
function SignalIntegrationMockup() {
  return (
    <img
      src="/figure/step2.png"
      alt="Signal integration preview showing wellness, cycle, load, and RPE inputs"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

// Step 03 visual: AVAIL's physiology-aware engine.
function EngineMockup() {
  return (
    <img
      src="/figure/step3.png"
      alt="AVAIL Engine preview showing physiology-aware load tolerance modeling"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

// Step 04 visual: coach-ready daily Load Score.
function LoadScoreMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.09)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-fluid-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Daily Load Score
          </p>
          <p className="mt-2 text-fluid-5xl font-bold tracking-[-0.06em] text-[#111318]">
            82
          </p>
        </div>
        <div className="rounded-full bg-[#EAF8F2] px-3 py-1.5 text-fluid-xs font-bold text-[#27815D]">
          High confidence
        </div>
      </div>
      <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#6FBF9E] to-[#4FA3C7]" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {["Reduce", "Maintain", "Increase"].map((label) => (
          <div
            key={label}
            className={`rounded-2xl border p-4 text-center ${
              label === "Maintain"
                ? "border-[#6FBF9E]/40 bg-[#EAF8F2]"
                : "border-slate-200/70 bg-[#FAFBF8]"
            }`}
          >
            <p className="text-fluid-sm font-bold text-[#111318]">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border border-slate-200/80 bg-[#FAFBF8] p-5">
        <p className="text-fluid-sm font-bold text-[#111318]">
          Recommended action
        </p>
        <p className="mt-2 text-fluid-base leading-[1.6] text-slate-500">
          Maintain planned load. Monitor late-session fatigue response.
        </p>
      </div>
    </div>
  );
}

// Step 05 visual: team dashboard for performance staff.
function CoachDashboardMockup() {
  const athletes = [
    ["M. Carter", "86", "Ready"],
    ["A. Singh", "71", "Monitor"],
    ["L. Evans", "49", "Reduce"],
  ];

  return (
    <div className="relative mx-auto w-full max-w-[620px] rounded-[34px] border border-slate-200/80 bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.1)]">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-fluid-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Team dashboard
          </p>
          <h3 className="mt-1 text-fluid-2xl font-bold tracking-[-0.04em] text-[#111318]">
            Pre-training readiness
          </h3>
        </div>
        <Users className="h-8 w-8 text-[#4FA3C7]" />
      </div>
      <div className="grid grid-cols-[1fr_0.8fr] gap-4">
        <div className="space-y-3">
          {athletes.map(([name, score, status]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-[#FAFBF8] p-4"
            >
              <div>
                <p className="text-fluid-base font-bold text-[#111318]">
                  {name}
                </p>
                <p className="text-fluid-xs font-semibold text-slate-400">
                  {status}
                </p>
              </div>
              <p className="text-fluid-2xl font-bold tracking-[-0.04em] text-[#111318]">
                {score}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-slate-200/70 bg-[#FAFBF8] p-4">
          <p className="text-fluid-sm font-bold text-[#111318]">Weekly trend</p>
          <div className="mt-7 flex h-32 items-end gap-2">
            {[44, 58, 52, 71, 76, 68, 82].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-full bg-gradient-to-t from-[#6FBF9E] to-[#4FA3C7]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 06 visual: longitudinal feedback and dataset growth.
function LearningMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[580px] rounded-[34px] border border-slate-200/80 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.09)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-fluid-xs font-bold uppercase tracking-[0.14em] text-slate-400">
            Model refinement
          </p>
          <h3 className="mt-1 text-fluid-2xl font-bold tracking-[-0.04em] text-[#111318]">
            Longitudinal intelligence
          </h3>
        </div>
        <Sparkles className="h-8 w-8 text-[#6FBF9E]" />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {["Outcomes", "Availability", "Feedback"].map((label, index) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-200/70 bg-[#FAFBF8] p-4"
          >
            <p className="text-fluid-sm font-bold text-[#111318]">{label}</p>
            <p className="mt-4 text-fluid-3xl font-bold tracking-[-0.05em] text-[#111318]">
              {["2.4k", "91%", "+18"][index]}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200/70 bg-[#FAFBF8] p-5">
        <div className="mb-5 flex items-center justify-between text-fluid-sm font-bold text-slate-500">
          <span>Dataset growth</span>
          <span>Season 01-04</span>
        </div>
        <svg
          viewBox="0 0 420 120"
          className="h-32 w-full overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M6 104 C72 90 88 72 142 78 C206 85 204 38 260 46 C312 53 328 22 414 16"
            fill="none"
            stroke="#4FA3C7"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M6 104 C72 90 88 72 142 78 C206 85 204 38 260 46 C312 53 328 22 414 16"
            fill="none"
            stroke="#6FBF9E"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// Chooses the right product visual for each workflow step.
function StepMockup({ kind }: { kind: MockupKind }) {
  const mockups: Record<MockupKind, React.ReactElement> = {
    checkin: <PhoneCheckIn />,
    signals: <SignalIntegrationMockup />,
    engine: <EngineMockup />,
    score: <LoadScoreMockup />,
    dashboard: <CoachDashboardMockup />,
    learning: <LearningMockup />,
  };

  if (kind === "checkin") {
    return (
      <div className="relative mx-auto aspect-[4/3] w-[78%] max-w-[340px] overflow-hidden rounded-[24px] border border-slate-200/70 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)] sm:max-w-[500px] sm:rounded-[30px] hero:mx-0 hero:w-full hero:max-w-[620px]">
        <PhoneCheckIn />
      </div>
    );
  }

  if (kind === "signals") {
    return (
      <div className="relative mx-auto aspect-[4/3] w-[78%] max-w-[340px] overflow-hidden rounded-[24px] sm:max-w-[500px] sm:rounded-[30px] hero:mx-0 hero:w-full hero:max-w-[620px]">
        <SignalIntegrationMockup />
      </div>
    );
  }

  if (kind === "engine") {
    return (
      <div className="relative mx-auto aspect-[4/3] w-[78%] max-w-[340px] overflow-hidden rounded-[24px] sm:max-w-[500px] sm:rounded-[30px] hero:mx-0 hero:w-full hero:max-w-[620px]">
        <EngineMockup />
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-[4/3] w-[78%] max-w-[340px] overflow-hidden rounded-[24px] border border-slate-200/70 bg-[radial-gradient(circle_at_50%_15%,rgba(111,191,158,0.18),rgba(250,251,248,0.9)_42%,rgba(255,255,255,0.95)_100%)] p-3 sm:max-w-[500px] sm:rounded-[30px] hero:mx-0 hero:w-full hero:max-w-[620px] hero:p-6">
      <div className="absolute left-10 top-10 h-36 w-36 rounded-full bg-[#6FBF9E]/14 blur-3xl" />
      <div className="absolute bottom-12 right-10 h-44 w-44 rounded-full bg-[#4FA3C7]/14 blur-3xl" />
      <div className="relative z-10 flex h-full items-center justify-center">
        {mockups[kind]}
      </div>
    </div>
  );
}

const flowPath =
  "M86 96 C164 46 245 58 305 122 C362 184 450 182 502 118 C566 40 660 58 708 136 C758 218 850 218 930 154";

function stepWindow(index: number) {
  const count = WORKFLOW_STEPS.length;
  const center = count === 1 ? 0 : index / (count - 1);
  const half = 0.13;

  return [
    Math.max(0, center - half),
    center,
    Math.min(1, center + half),
  ] as const;
}

function StaticNarrativePanel() {
  return (
    <div className="flex min-h-[430px] flex-col justify-center hero:min-h-[590px]">
      <p className="mb-12 flex items-center gap-3 text-fluid-xs font-bold uppercase tracking-[0.2em] text-[#4FA3C7]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#4FA3C7] shadow-[0_0_18px_rgba(79,163,199,0.72)]" />
        Contextual Pipelines
      </p>
      <h2 className="max-w-[620px] text-[clamp(3.1rem,6.4vw,6.4rem)] font-bold leading-[0.96] tracking-[-0.06em] text-[#111318]">
        Contextual Pipelines.
      </h2>
      <p className="mt-10 max-w-[610px] text-fluid-xl font-semibold leading-[1.85] tracking-[-0.02em] text-slate-500 wide:text-fluid-2xl">
        Avail transforms fragmented athlete signals into individualized
        physiological context before coaching decisions are made.
      </p>
    </div>
  );
}

function FlowNode({
  index,
  progress,
  className,
  label,
  meta,
  children,
  featured = false,
}: {
  index: number;
  progress: MotionValue<number>;
  className: string;
  label: string;
  meta: string;
  children?: React.ReactNode;
  featured?: boolean;
}) {
  const [start, center] = stepWindow(index);
  const opacity = useTransform(progress, [Math.max(0, start - 0.02), center], [0.2, 1]);
  const scale = useTransform(progress, [Math.max(0, start - 0.02), center], [0.94, 1]);
  const glow = useTransform(
    progress,
    [start, center, Math.min(1, center + 0.12)],
    [
      "0 16px 44px rgba(15,23,42,0.06), 0 0 0 rgba(79,163,199,0)",
      featured
        ? "0 24px 80px rgba(79,163,199,0.22), 0 0 86px rgba(111,191,158,0.22)"
        : "0 20px 64px rgba(79,163,199,0.14), 0 0 56px rgba(111,191,158,0.12)",
      "0 16px 44px rgba(15,23,42,0.08), 0 0 34px rgba(111,191,158,0.08)",
    ],
  );

  return (
    <motion.div
      className={`absolute rounded-[22px] border border-slate-200/75 bg-white/86 p-4 shadow-[0_16px_44px_rgba(15,23,42,0.06)] backdrop-blur-xl ${className}`}
      style={{ opacity, scale, boxShadow: glow }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-400">
            {meta}
          </p>
          <p className="mt-1 text-fluid-sm font-bold tracking-[-0.01em] text-[#111318]">
            {label}
          </p>
        </div>
        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#6FBF9E] shadow-[0_0_18px_rgba(111,191,158,0.72)]" />
      </div>
      {children}
    </motion.div>
  );
}

function AthleteSignalCards({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08, 0.22], [0, 1, 0.88]);
  const y = useTransform(progress, [0, 0.12], [18, 0]);

  return (
    <motion.div
      className="absolute left-[4%] top-[20%] hidden w-[170px] space-y-2 hero:block"
      style={{ opacity, y }}
    >
      {["Sleep 7.8h", "Soreness low", "Cycle context"].map((item, index) => (
        <motion.div
          key={item}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.28,
          }}
          className="rounded-2xl border border-slate-200/70 bg-white/86 px-3 py-2 text-[0.72rem] font-bold text-slate-500 shadow-[0_12px_34px_rgba(15,23,42,0.06)] backdrop-blur-xl"
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}

function LoadGuidancePanel({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.5, 0.62, 0.82], [0, 1, 0.92]);
  const y = useTransform(progress, [0.5, 0.62], [22, 0]);

  return (
    <motion.div
      className="absolute bottom-[10%] left-[41%] w-[210px] rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_64px_rgba(15,23,42,0.09)] backdrop-blur-xl"
      style={{ opacity, y }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-400">
            Load guidance
          </p>
          <p className="mt-2 text-fluid-3xl font-bold tracking-[-0.055em] text-[#111318]">
            82
          </p>
        </div>
        <span className="rounded-full bg-[#EAF8F2] px-2.5 py-1 text-[0.64rem] font-bold text-[#27815D]">
          91%
        </span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#6FBF9E] to-[#4FA3C7]" />
      </div>
      <p className="mt-4 text-fluid-xs font-bold text-[#27815D]">
        Maintain planned load
      </p>
    </motion.div>
  );
}

function TeamVisibilityPanel({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.66, 0.78, 0.94], [0, 1, 0.94]);
  const scale = useTransform(progress, [0.66, 0.78], [0.96, 1]);

  return (
    <motion.div
      className="absolute right-[5%] top-[18%] w-[255px] rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.09)] backdrop-blur-xl"
      style={{ opacity, scale }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-400">
          Team visibility
        </p>
        <Users className="h-4 w-4 text-[#4FA3C7]" />
      </div>
      {[
        ["Athlete A", "Ready", "bg-[#EAF8F2] text-[#27815D]"],
        ["Athlete B", "Monitor", "bg-[#FFF3E7] text-[#A35E22]"],
        ["Athlete C", "Ready", "bg-[#EAF8F2] text-[#27815D]"],
      ].map(([name, state, tone]) => (
        <div
          key={name}
          className="mb-2 flex items-center justify-between rounded-2xl bg-[#FAFBF8] px-3 py-2"
        >
          <span className="text-fluid-xs font-bold text-[#111318]">{name}</span>
          <span className={`rounded-full px-2 py-1 text-[0.62rem] font-bold ${tone}`}>
            {state}
          </span>
        </div>
      ))}
      <p className="mt-3 text-[0.68rem] font-semibold leading-[1.45] text-slate-400">
        Structured indicators only
      </p>
    </motion.div>
  );
}

function CalibrationPanel({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.82, 0.94], [0, 1]);
  const pathLength = useTransform(progress, [0.82, 1], [0, 1]);

  return (
    <motion.div
      className="absolute bottom-[12%] right-[8%] w-[255px] rounded-[24px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_22px_70px_rgba(15,23,42,0.09)] backdrop-blur-xl"
      style={{ opacity }}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-slate-400">
          Calibration
        </p>
        <Database className="h-4 w-4 text-[#6FBF9E]" />
      </div>
      <svg viewBox="0 0 220 86" className="h-[86px] w-full overflow-visible">
        <path
          d="M8 72 C46 64 58 44 88 50 C128 58 132 22 164 28 C188 32 198 16 214 12"
          fill="none"
          stroke="rgba(148,163,184,0.18)"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <motion.path
          d="M8 72 C46 64 58 44 88 50 C128 58 132 22 164 28 C188 32 198 16 214 12"
          fill="none"
          pathLength={pathLength}
          stroke="#6FBF9E"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <p className="text-fluid-xs font-bold text-[#111318]">
        Season-level context strengthens over time.
      </p>
    </motion.div>
  );
}

function SystemArchitectureFlow({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [0.02, 0.98], [0.04, 1]);

  return (
    <div className="relative min-h-[580px] overflow-hidden rounded-[34px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(250,251,248,0.78))] shadow-[0_30px_90px_rgba(15,23,42,0.07)] backdrop-blur-xl hero:min-h-[650px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(111,191,158,0.12),rgba(255,255,255,0)_58%)]" />
      <div className="absolute inset-8 rounded-[28px] border border-slate-200/50" />
      <AthleteSignalCards progress={progress} />
      <svg
        viewBox="0 0 1000 360"
        className="absolute left-1/2 top-[32%] h-[250px] w-[112%] -translate-x-1/2 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter id="workflow-flow-glow" x="-20%" y="-90%" width="140%" height="280%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="workflow-flow-gradient" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#6FBF9E" stopOpacity="0.45" />
            <stop offset="48%" stopColor="#4FA3C7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9EF0CE" stopOpacity="0.72" />
          </linearGradient>
        </defs>
        <path
          d={flowPath}
          fill="none"
          stroke="rgba(30,45,61,0.11)"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <motion.path
          d={flowPath}
          fill="none"
          filter="url(#workflow-flow-glow)"
          pathLength={pathLength}
          stroke="url(#workflow-flow-gradient)"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          className="workflow-flow-dash"
          d={flowPath}
          fill="none"
          filter="url(#workflow-flow-glow)"
          stroke="#8EC8E5"
          strokeDasharray="2 34"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <circle r="5" fill="#8EC8E5" filter="url(#workflow-flow-glow)">
          <animateMotion dur="9s" path={flowPath} repeatCount="indefinite" />
        </circle>
      </svg>
      <FlowNode
        className="left-[9%] top-[42%] w-[160px]"
        index={0}
        label="Athlete Signals"
        meta="Input"
        progress={progress}
      />
      <FlowNode
        className="left-[27%] top-[20%] w-[178px]"
        index={1}
        label="Signal Integration"
        meta="Unify"
        progress={progress}
      >
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[42, 68, 88].map((height) => (
            <div key={height} className="h-12 rounded-full bg-slate-100">
              <div
                className="mt-auto rounded-full bg-gradient-to-t from-[#6FBF9E] to-[#4FA3C7]"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
      </FlowNode>
      <FlowNode
        className="left-[40%] top-[43%] w-[190px]"
        featured
        index={2}
        label="Context Layer"
        meta="Interpret"
        progress={progress}
      >
        <div className="workflow-breathe mx-auto mt-5 h-20 w-20 rounded-full border border-[#6FBF9E]/40 bg-[radial-gradient(circle,rgba(111,191,158,0.26),rgba(79,163,199,0.10)_52%,rgba(255,255,255,0)_68%)]" />
      </FlowNode>
      <LoadGuidancePanel progress={progress} />
      <TeamVisibilityPanel progress={progress} />
      <CalibrationPanel progress={progress} />
    </div>
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
      className="relative min-h-[540vh] border-y border-slate-200/70 bg-[#FEFEFC]"
      aria-labelledby="workflow-narrative-heading"
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden px-6 py-24">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(111,191,158,0.13),rgba(254,254,252,0)_70%)]" />
        <div className="relative mx-auto grid w-full max-w-[1120px] gap-12 hero:grid-cols-[0.43fr_0.57fr] hero:items-center wide:max-w-[1480px] wide:gap-16">
          <div>
            <h2 id="workflow-narrative-heading" className="sr-only">
              How Avail turns athlete context into coaching guidance
            </h2>
            <StaticNarrativePanel />
          </div>
          <SystemArchitectureFlow progress={scrollYProgress} />
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
