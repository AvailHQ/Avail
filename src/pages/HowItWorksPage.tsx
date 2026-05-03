import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Gauge,
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

// The workflow data powers the sticky stacked step section.
// To edit step copy or swap a visual, update this array and the matching mockup key.
type MockupKind =
  | "checkin"
  | "signals"
  | "engine"
  | "score"
  | "dashboard"
  | "learning";

interface WorkflowStep {
  number: string;
  eyebrow: string;
  headline: string;
  copy: string;
  bullets: string[];
  kind: MockupKind;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: "01",
    eyebrow: "Athlete Check-In",
    headline: "Capture readiness data in under 60 seconds.",
    copy: "Athletes submit quick daily inputs including sleep, fatigue, soreness, mood, cycle phase, and session RPE.",
    bullets: [
      "Daily wellness pulse",
      "Cycle context captured privately",
      "Completion feedback for athletes",
    ],
    kind: "checkin",
  },
  {
    number: "02",
    eyebrow: "Signal Integration",
    headline: "Unify fragmented athlete signals.",
    copy: "AVAIL combines wellness, cycle context, and training data into one interpretable physiological profile.",
    bullets: [
      "Wellness, load, and cycle context",
      "Wearables optional",
      "One unified athlete state",
    ],
    kind: "signals",
  },
  {
    number: "03",
    eyebrow: "AVAIL Engine",
    headline: "Model load tolerance through female physiology.",
    copy: "The AVAIL Engine estimates recovery capacity, fatigue sensitivity, and cycle-adjusted load tolerance.",
    bullets: [
      "Recovery capacity",
      "Fatigue sensitivity",
      "Cycle-adjusted tolerance",
    ],
    kind: "engine",
  },
  {
    number: "04",
    eyebrow: "Load Score",
    headline: "Turn physiology into a clear daily Load Score.",
    copy: "AVAIL generates a 0-100 Load Score with confidence level and directional training guidance.",
    bullets: [
      "0-100 daily score",
      "Confidence level",
      "Increase, maintain, or reduce guidance",
    ],
    kind: "score",
  },
  {
    number: "05",
    eyebrow: "Coach Dashboard",
    headline: "Support coaches before training begins.",
    copy: "Performance staff receive team-level readiness, individual trends, and risk alerts without accessing raw sensitive cycle data.",
    bullets: [
      "Team readiness overview",
      "Individual trend cards",
      "Risk flags without raw cycle logs",
    ],
    kind: "dashboard",
  },
  {
    number: "06",
    eyebrow: "Continuous Learning",
    headline: "Every season strengthens the system.",
    copy: "Session outcomes, availability trends, and longitudinal feedback improve AVAIL's female performance intelligence over time.",
    bullets: [
      "Outcome feedback loop",
      "Multi-season calibration",
      "Growing performance dataset",
    ],
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
                <p className="text-fluid-base font-bold text-[#111318]">{name}</p>
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

// Full-width sticky layer. The background/card touches the viewport edges,
// while the inner grid stays aligned to the site's 1120px content system.
function WorkflowCard({ step, index }: { step: WorkflowStep; index: number }) {
  return (
    <motion.article
      {...fadeUp(0.05)}
      className="relative min-h-[78vh] w-full overflow-hidden border-t border-slate-200/80 bg-[#FEFEFC] shadow-[0_-18px_54px_rgba(15,23,42,0.06)]"
    >
      <div className="relative mx-auto grid min-h-[78vh] w-full max-w-[1120px] content-center justify-items-center gap-y-4 px-6 py-4 text-center hero:grid-cols-[0.38fr_0.62fr] hero:grid-rows-[auto_auto] hero:content-center hero:justify-items-stretch hero:gap-x-8 hero:gap-y-6 hero:px-0 hero:py-8 hero:text-left wide:max-w-[1480px] wide:gap-x-12 wide:gap-y-8">
        <div className="absolute left-6 top-4 text-[clamp(3.25rem,18vw,5rem)] font-bold leading-none tracking-[-0.08em] text-slate-100 hero:static hero:self-start hero:text-fluid-display">
          {step.number}
        </div>
        <div className="relative z-10 order-2 flex flex-col justify-center hero:order-none hero:col-start-2 hero:row-start-1 hero:translate-x-6 wide:translate-x-10">
          <div className="mx-auto w-full px-1 hero:mx-0">
            <h2 className="mx-auto max-w-[820px] font-bold leading-[1.08] tracking-[-0.045em] text-[#111318] text-[clamp(1.45rem,1.75vw,2.45rem)] hero:mx-0">
              {step.headline}
            </h2>
          </div>
        </div>
        <div className="relative z-10 order-1 flex flex-col items-center justify-center py-3 hero:order-none hero:col-start-1 hero:row-start-2 hero:items-start hero:py-0">
          <p className="mb-3 text-fluid-xs font-bold uppercase tracking-[0.16em] text-[#4FA3C7]">
            {step.eyebrow}
          </p>
          <p className="max-w-[390px] text-fluid-md leading-[1.75] text-slate-500 wide:max-w-[480px]">
            {step.copy}
          </p>
          <div className="mx-auto mt-5 flex w-fit max-w-full flex-col items-stretch gap-2.5 text-left hero:mx-0 hero:mt-7 hero:gap-3">
            {step.bullets.map((bullet) => (
              <div
                key={bullet}
                className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-3 text-fluid-base font-semibold text-slate-600"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EAF8F2] text-[#27815D]">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 order-3 flex w-full flex-col justify-center hero:order-none hero:col-start-2 hero:row-start-2 hero:translate-x-6 wide:translate-x-10">
          <StepMockup kind={step.kind} />
          {index === 3 && (
            <FloatingCard
              className="bottom-10 left-6 hidden w-48 hero:block"
              delay={0.4}
            >
              <p className="text-fluid-xs font-bold text-slate-400">Guidance</p>
              <p className="mt-1 text-fluid-lg font-bold text-[#27815D]">
                Maintain load
              </p>
            </FloatingCard>
          )}
          {index === 4 && (
            <FloatingCard
              className="right-6 top-[190px] hidden w-48 hero:block"
              delay={0.2}
            >
              <p className="text-fluid-xs font-bold text-slate-400">Risk flag</p>
              <p className="mt-1 text-fluid-lg font-bold text-[#C56A3A]">
                Monitor fatigue
              </p>
            </FloatingCard>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Hero product diagram showing inputs flowing through the engine to outputs.
function HeroDiagram() {
  const nodes = [
    { label: "Inputs", Icon: SlidersHorizontal },
    { label: "AVAIL Engine", Icon: Brain },
    { label: "Outputs", Icon: Gauge },
  ];

  return (
    <motion.div
      {...heroReveal}
      transition={{ ...heroReveal.transition, delay: 0.18 }}
      className="relative mx-auto mt-16 max-w-[980px] rounded-[36px] border border-slate-200/70 bg-white/82 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl hero:p-8 wide:max-w-[1220px]"
    >
      <div className="absolute -left-8 top-12 h-36 w-36 rounded-full bg-[#6FBF9E]/18 blur-3xl" />
      <div className="absolute -right-8 bottom-12 h-44 w-44 rounded-full bg-[#4FA3C7]/16 blur-3xl" />
      <div className="relative grid gap-4 hero:grid-cols-[1fr_auto_1fr_auto_1fr] hero:items-center">
        {nodes.map(({ label, Icon }, index) => (
          <React.Fragment key={label}>
            <div
              className={`group rounded-[29px] bg-gradient-to-br from-slate-200/70 via-slate-200/70 to-slate-200/70 p-px transition-all duration-200 hover:from-[#74C7A7] hover:via-[#A7ECD0] hover:to-[#4FA3C7] ${index === 1 ? "hero:scale-110" : ""}`}
            >
              <div className="rounded-[28px] bg-[#FAFBF8] p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#4FA3C7] shadow-sm transition-colors duration-200 group-hover:text-[#1A7A55]">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-fluid-base font-bold text-[#111318]">{label}</p>
                <p className="mt-2 text-fluid-sm leading-[1.55] text-slate-500">
                  {index === 0 && "Check-ins, cycle context, training signals"}
                  {index === 1 && "Female physiology intelligence layer"}
                  {index === 2 && "Load Score, guidance, confidence"}
                </p>
              </div>
            </div>
            {index < nodes.length - 1 && (
              <div className="hidden text-slate-300 hero:block">
                <ArrowRight className="h-6 w-6" />
              </div>
            )}
          </React.Fragment>
        ))}
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
            From athlete context to confident load decisions.
          </motion.h1>
          <motion.p
            {...heroReveal}
            transition={{ ...heroReveal.transition, delay: 0.12 }}
            className="mx-auto mt-7 max-w-[660px] text-fluid-lg leading-[1.8] text-slate-500 wide:max-w-[760px]"
          >
            AVAIL transforms daily athlete inputs, cycle context, and training
            signals into decision-ready Load Scores without exposing raw
            sensitive health data.
          </motion.p>
          <HeroDiagram />
        </div>
      </section>

      {/* Sticky stacked workflow: each step overlays the previous layer while scrolling. */}
      <section className="pb-20 hero:pb-32">
        <div className="relative">
          {WORKFLOW_STEPS.map((step, index) => (
            <section
              key={step.number}
              className="sticky top-0 flex h-screen items-center pt-16"
              style={{
                zIndex: index + 1,
                // Negative margin makes the next full-screen layer arrive early enough
                // to visibly cover the previous sticky card.
                marginTop: index === 0 ? 0 : "-18vh",
              }}
              aria-label={`${step.number} ${step.eyebrow}`}
            >
              <div
                className="w-full"
                style={{
                  transform: `translateY(${index * 8}px) scale(${1 - index * 0.006})`,
                }}
              >
                <WorkflowCard step={step} index={index} />
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* Privacy and trust: clarifies data boundaries and non-medical positioning. */}
      <section className="px-6 py-28 wide:py-32" aria-labelledby="privacy-heading">
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
              Athletes retain control while coaches receive structured
              guidance, not raw cycle logs or diagnostic claims.
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
          <h2
            className="mx-auto max-w-[680px] text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#111318] sm:text-fluid-4xl sm:leading-[1.05] sm:tracking-[-0.045em] wide:max-w-[820px]"
          >
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
