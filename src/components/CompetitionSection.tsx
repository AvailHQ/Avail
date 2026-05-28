import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  User,
  Activity,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────

interface CompItem {
  title: string;
  desc: string;
}
interface TabData {
  leftLabel: string;
  leftHeadline: string;
  rightHeadline: string;
  rows: Array<{ left: CompItem; right: CompItem }>;
}

// ── Data ───────────────────────────────────────────────────────────────────

const TABS = ["vs. traditional systems", "vs. wearables", "vs. cycle apps"];

const RIGHT_ICONS = [Clock, User, Activity, SlidersHorizontal, ShieldCheck];

const DATA: TabData[] = [
  {
    leftLabel: "TRADITIONAL SYSTEMS",
    leftHeadline: "Always one step behind",
    rightHeadline: "Built for what's next",
    rows: [
      {
        left: {
          title: "Load Comes First",
          desc: "By the time the data appears, the session is already over.",
        },
        right: {
          title: "Know Before Training Starts",
          desc: "Most systems explain the session after it happens. Avail helps coaches adjust before it begins.",
        },
      },
      {
        left: {
          title: "Same Model For Everyone",
          desc: "Most systems still treat women like smaller men.",
        },
        right: {
          title: "Every Athlete Is Different",
          desc: "Two players can react completely differently to the same session load.",
        },
      },
      {
        left: {
          title: "Only Explains What Happened",
          desc: "GPS and RPE don't explain why it happened.",
        },
        right: {
          title: "Built For Female Athletes",
          desc: "Not adapted later. Built this way from day one.",
        },
      },
      {
        left: {
          title: "Never Adapts",
          desc: "The athlete changes. The system doesn't.",
        },
        right: {
          title: "Learns Over Time",
          desc: "The more the athlete uses it, the smarter it gets.",
        },
      },
      {
        left: {
          title: "Built For Reporting",
          desc: "Great charts. Little real guidance.",
        },
        right: {
          title: "Helps Coaches Make Better Calls",
          desc: "Not more dashboards. Better decisions.",
        },
      },
    ],
  },
  {
    leftLabel: "WEARABLES",
    leftHeadline: "Good at tracking. Bad at context",
    rightHeadline: "Turns data into decisions",
    rows: [
      {
        left: {
          title: "Collects Data All Day",
          desc: "But still can't tell coaches what to change.",
        },
        right: {
          title: "Shows What Today Actually Looks Like",
          desc: "Not just recovery numbers. Real context.",
        },
      },
      {
        left: {
          title: "Generic Scores",
          desc: "One number for millions of people.",
        },
        right: {
          title: "Built Around Women's Physiology",
          desc: "Not a generic readiness score.",
        },
      },
      {
        left: {
          title: "Mostly Useful After Training",
          desc: "Not before decisions are made.",
        },
        right: {
          title: "Fits Into Coaching",
          desc: "Coaches can actually use it before training starts.",
        },
      },
      {
        left: {
          title: "No Coaching Layer",
          desc: "The athlete sees the data. The staff usually doesn't.",
        },
        right: {
          title: "Learns The Athlete",
          desc: "Not every athlete reacts the same way.",
        },
      },
      {
        left: {
          title: "Dependent On Hardware",
          desc: "No device, no system.",
        },
        right: {
          title: "Works With Or Without Devices",
          desc: "Wearables help. They aren't required.",
        },
      },
    ],
  },
  {
    leftLabel: "CYCLE APPS",
    leftHeadline: "Mostly just tracking",
    rightHeadline: "Built for performance",
    rows: [
      {
        left: {
          title: "Tracks The Cycle",
          desc: "But nothing changes because of it.",
        },
        right: {
          title: "Training Decisions Connected To Cycle Data",
          desc: "Not just tracking for awareness.",
        },
      },
      {
        left: {
          title: "Built For Consumers",
          desc: "Not elite sport environments.",
        },
        right: {
          title: "Coaches Actually See Useful Outputs",
          desc: "The information reaches the people making decisions.",
        },
      },
      {
        left: {
          title: "Generic Advice For Everyone",
          desc: "Different athletes get the same guidance.",
        },
        right: {
          title: "Learns Each Athlete Personally",
          desc: "Not generic “phase advice”.",
        },
      },
      {
        left: {
          title: "No Connection To Training",
          desc: "Useful information stays isolated in the app.",
        },
        right: {
          title: "Every Check-In Changes Something",
          desc: "The data leads to action.",
        },
      },
      {
        left: {
          title: "No Load Recommendations",
          desc: "Phase tracked. Session unchanged.",
        },
        right: {
          title: "Built For Elite Sport",
          desc: "Performance environments, not wellness apps.",
        },
      },
    ],
  },
];

// ── X icon ─────────────────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="w-3.5 h-3.5"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2l8 8M10 2l-8 8"
        stroke="#9CA3AF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Section ────────────────────────────────────────────────────────────────

export default function CompetitionSection() {
  const [active, setActive] = useState(0);
  const tabData = DATA[active];

  return (
    <section
      className="w-full bg-white py-20 px-6 wide:py-24"
      aria-labelledby="competition-headline"
    >
      <div className="mx-auto max-w-[1160px] wide:max-w-[1560px]">
        {/* ── Header: centered copy + tabs below ──────────── */}
        <div className="mb-0 text-center">
          <p className="text-fluid-xs font-semibold tracking-[0.14em] uppercase text-[#9CA3AF] mb-5">
            The Problem With Current Systems
          </p>
          <h2
            id="competition-headline"
            className="text-[clamp(0.98rem,5.1vw,3.25rem)] sm:text-fluid-4xl font-bold text-[#111318] leading-[1.13] tracking-normal mb-5"
          >
            Every Tool Looks Backwards
          </h2>
          <p className="text-fluid-lg leading-[1.65] text-[#6B7280] max-w-[720px] mx-auto wide:max-w-[860px] mb-12">
            Most athlete data only tells you what already went wrong
            <br />
            Avail helps coaches make changes before it does
          </p>

          {/* Tab bar — centered pill switcher with sliding card */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-stretch gap-1 rounded-[20px] overflow-hidden"
              style={{ border: "1px solid #E8ECF0" }}
            >
              {TABS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActive(i)}
                  className="relative px-5 py-2.5 text-[0.78rem] sm:text-fluid-sm font-semibold focus-visible:outline-none"
                >
                  {/* Sliding card background */}
                  {i === active && (
                    <motion.div
                      layoutId="tab-card"
                      className="absolute inset-0 rounded-[20px] bg-white"
                      style={{
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 34,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      i === active
                        ? "text-[#4AAA82]"
                        : "text-[#9CA3AF] hover:text-[#6B7280]"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Comparison content ────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mt-6">
              {/* Column headers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 pb-6 border-b border-[#E0E4EA]">
                <div>
                  <p className="text-fluid-xs font-semibold tracking-[0.14em] uppercase text-[#4AAA82] mb-2">
                    Avail
                  </p>
                  <p className="text-fluid-2xl font-bold text-[#111318] leading-tight">
                    {tabData.rightHeadline}
                  </p>
                </div>
                <div className="mt-6 sm:mt-0">
                  <p className="text-fluid-xs font-semibold tracking-[0.14em] uppercase text-[#9CA3AF] mb-2">
                    {tabData.leftLabel}
                  </p>
                  <p className="text-fluid-2xl font-bold text-[#111318] leading-tight">
                    {tabData.leftHeadline}
                  </p>
                </div>
              </div>

              {tabData.rows.map(({ left, right }, i) => {
                const Icon = RIGHT_ICONS[i];
                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 pt-10 pb-3 border-t border-[#E0E4EA] last:border-b last:border-b-[#E0E4EA]"
                  >
                    {/* Left: AVAIL item */}
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 w-9 h-9 rounded-full bg-[#DFF4EC] flex items-center justify-center shrink-0">
                        <Icon
                          className="w-[18px] h-[18px] text-[#4AAA82]"
                          strokeWidth={1.9}
                        />
                      </div>
                      <div>
                        <p className="text-fluid-base font-bold text-[#111318] leading-snug mb-1">
                          {right.title}
                        </p>
                        <p className="text-fluid-sm text-[#6B7280] leading-[1.65]">
                          {right.desc}
                        </p>
                      </div>
                    </div>

                    {/* Right: negative item */}
                    <div className="flex items-start gap-4 mt-6 sm:mt-0">
                      <div className="mt-0.5 w-9 h-9 rounded-full bg-[#E8ECF0] flex items-center justify-center shrink-0">
                        <XIcon />
                      </div>
                      <div>
                        <p className="text-fluid-base font-bold text-[#111318] leading-snug mb-1">
                          {left.title}
                        </p>
                        <p className="text-fluid-sm text-[#6B7280] leading-[1.65]">
                          {left.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
