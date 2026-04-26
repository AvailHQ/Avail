import React from 'react'
import { motion } from 'framer-motion'

// ─── Input icons ─────────────────────────────────────────────────────────────

const IcCyclePhase = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
    <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 1.5"/>
    <path d="M10 3.5A6.5 6.5 0 0 0 5 13.5 4.5 4.5 0 0 1 10 3.5z" fill="currentColor"/>
  </svg>
)

const IcSleep = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
    <path d="M16.5 13.5A7.5 7.5 0 0 1 6 3a7.5 7.5 0 1 0 10.5 10.5z" fill="currentColor"/>
  </svg>
)

const IcBolt = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
    <path d="M11.5 2L4 11.5h6.5L8 18l8-9h-6.5L11.5 2z" fill="currentColor"/>
  </svg>
)

const IcPerson = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
    <circle cx="10" cy="5.5" r="3.2" fill="currentColor"/>
    <path d="M3.5 18c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const IcBarChart = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
    <rect x="2.5" y="10" width="3.2" height="7.5" rx="1.2" fill="currentColor"/>
    <rect x="8.4" y="6"  width="3.2" height="11.5" rx="1.2" fill="currentColor"/>
    <rect x="14.3" y="2.5" width="3.2" height="15" rx="1.2" fill="currentColor"/>
  </svg>
)

// Engine description icons
const IcLoop = () => (
  <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
    <path d="M12 7A5 5 0 1 1 7 2" stroke="#6FBF9E" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M7 2l2.5 2.5M7 2L9.5 0" stroke="#6FBF9E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IcLayers = () => (
  <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
    <path d="M7 1L13 4.5 7 8 1 4.5z" stroke="#6FBF9E" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M1 8L7 11.5l6-3.5" stroke="#6FBF9E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IcTrend = () => (
  <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 flex-shrink-0" aria-hidden="true">
    <path d="M1 10.5L4.5 7l3 3L13 3" stroke="#6FBF9E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 3H13v3.5" stroke="#6FBF9E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Sparkline
const Sparkline = () => (
  <svg viewBox="0 0 88 40" fill="none" className="w-20 h-9" aria-hidden="true">
    <path
      d="M2 30 C10 30 14 22 22 20 S34 24 42 18 S56 12 68 9 S78 11 86 8"
      stroke="#6FBF9E"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────

const INPUTS: InputItem[] = [
  { label: 'Cycle Phase',      sub: 'Menstrual cycle data', color: '#7C3AED', bg: '#F0EDFF', Icon: IcCyclePhase },
  { label: 'Sleep',            sub: 'Duration & quality',   color: '#059669', bg: '#EDFAF4', Icon: IcSleep      },
  { label: 'Fatigue',          sub: 'Daily fatigue score',  color: '#D97706', bg: '#FFF5EB', Icon: IcBolt       },
  { label: 'Soreness',         sub: 'Muscle soreness',      color: '#2563EB', bg: '#EEF4FF', Icon: IcPerson     },
  { label: 'Training History', sub: 'Load & performance',   color: '#64748B', bg: '#F3F5F7', Icon: IcBarChart   },
]

const INPUT_COLORS = ['#7C3AED', '#059669', '#D97706', '#2563EB', '#64748B']

interface InputItem {
  label: string
  sub: string
  color: string
  bg: string
  Icon: () => React.ReactElement
}

type EngineLine = [() => React.ReactElement, string]

const ENGINE_LINES: EngineLine[] = [
  [IcLoop,   'Cycle-aware AI model'   ],
  [IcLayers, 'Multi-signal integration'],
  [IcTrend,  'Load calculation'        ],
]

// SVG coordinate system (viewBox 960 × 480)
// Layout: left col 250px | gap ~105px | orb 260px | gap ~105px | right col 240px
const IN_X    = 250   // right edge of input cards
const ORB_CX  = 480   // center-x of orb
const ORB_CY  = 235   // center-y of orb
const ORB_R   = 130   // orb radius → left edge 350, right edge 610
const OUT_X   = 720   // left edge of output cards
const INPUT_YS  = [82, 158, 235, 312, 388]   // y-centers of 5 input cards
const OUTPUT_YS = [175, 308]                  // y-centers of 2 output cards

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SolutionSection() {
  return (
    <section
      className="w-full py-28 px-6 relative overflow-hidden"
      aria-labelledby="solution-headline"
      style={{
        background: 'radial-gradient(ellipse 80% 70% at 50% 45%, #ffffff 0%, #F8F8F6 100%)',
      }}
    >
      {/* ── Dot grid ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="solGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="0.85" fill="rgba(0,0,0,0.055)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#solGrid)" />
      </svg>

      <div className="relative z-10 max-w-[1040px] mx-auto">

        {/* ── Header ── */}
        <motion.div {...inView(0)} className="text-center mb-16">
          <p className="text-[10.5px] font-semibold tracking-[0.15em] uppercase text-[#9CA3AF] mb-4">
            Solution
          </p>
          <h2
            id="solution-headline"
            className="font-bold tracking-[-0.03em] text-[#111318] leading-[1.13] mb-4"
            style={{ fontSize: 'clamp(24px, 3.2vw, 40px)' }}
          >
            From signals to smarter decisions
          </h2>
          <p className="text-[15px] text-[#6B7280] leading-[1.65] max-w-[400px] mx-auto">
            Integrating athlete data into clear, daily training decisions
          </p>
        </motion.div>

        {/* ── Diagram ── */}
        <motion.div {...inView(0.1)} className="relative" style={{ minHeight: 480 }}>

          {/* SVG connection layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 960 480"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glowSm" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="1.8" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <marker id="arrGreen" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M1 1.5 L8 4.5 L1 7.5" fill="none" stroke="#6FBF9E" strokeWidth="1.2"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* ── Input → Engine ── */}
            {INPUT_YS.map((y, i) => {
              const col  = INPUT_COLORS[i]
              const midX = (IN_X + (ORB_CX - ORB_R)) / 2   // ≈ 300
              const midY = (y + ORB_CY) / 2
              return (
                <g key={`in-${i}`}>
                  {/* Curve */}
                  <path
                    d={`M ${IN_X} ${y} C ${IN_X + 65} ${y} ${ORB_CX - ORB_R + 10} ${ORB_CY} ${ORB_CX - ORB_R} ${ORB_CY}`}
                    stroke={col} strokeWidth="1.3" fill="none" opacity="0.30"
                  />
                  {/* Start dot (card edge) */}
                  <circle cx={IN_X} cy={y} r="4.5" fill={col} opacity="0.75" filter="url(#glow)"/>
                  {/* Mid glowing node */}
                  <circle cx={midX} cy={midY} r="2.8" fill={col} opacity="0.45" filter="url(#glowSm)"/>
                </g>
              )
            })}

            {/* ── Engine → Output ── */}
            {OUTPUT_YS.map((y, i) => {
              const midX = (ORB_CX + ORB_R + OUT_X) / 2   // ≈ 665
              const midY = (ORB_CY + y) / 2
              return (
                <g key={`out-${i}`}>
                  <path
                    d={`M ${ORB_CX + ORB_R} ${ORB_CY} C ${ORB_CX + ORB_R + 60} ${ORB_CY} ${OUT_X - 60} ${y} ${OUT_X} ${y}`}
                    stroke="#6FBF9E" strokeWidth="1.3" strokeDasharray="5 4"
                    fill="none" opacity="0.5" markerEnd="url(#arrGreen)"
                  />
                  {/* Mid glowing node */}
                  <circle cx={midX} cy={midY} r="3" fill="#6FBF9E" opacity="0.55" filter="url(#glowSm)"/>
                </g>
              )
            })}
          </svg>

          {/* ── Three columns ── */}
          <div className="relative z-10 flex items-center justify-between h-full">

            {/* Left: Inputs */}
            <div className="flex flex-col w-[245px] flex-shrink-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF] mb-4 text-center">
                Inputs
              </p>
              <div className="flex flex-col gap-[9px]">
                {INPUTS.map(({ label, sub, color, bg, Icon }, i) => (
                  <motion.div
                    key={label}
                    {...inView(0.14 + i * 0.06)}
                    className="flex items-center gap-[14px] px-4 py-[13px] bg-white rounded-2xl"
                    style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.055), 0 0 0 1px rgba(0,0,0,0.038)' }}
                  >
                    <div
                      className="w-[38px] h-[38px] rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: bg, color }}
                    >
                      <Icon />
                    </div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-[#111318] leading-snug">{label}</p>
                      <p className="text-[10.5px] text-[#9CA3AF] leading-snug mt-[1px]">{sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Center: Avail Engine orb */}
            <div className="flex flex-col items-center flex-shrink-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF] mb-4">
                Avail Engine
              </p>
              <motion.div
                {...inView(0.24)}
                className="relative flex flex-col items-center justify-center rounded-full"
                style={{
                  width: 258,
                  height: 258,
                  background: 'radial-gradient(circle, rgba(116,199,167,0.10) 0%, rgba(116,199,167,0.03) 62%, transparent 82%)',
                }}
              >
                {/* Rings */}
                <div className="absolute inset-0    rounded-full" style={{ border: '1px solid rgba(116,199,167,0.22)' }}/>
                <div className="absolute inset-[22px] rounded-full" style={{ border: '1px solid rgba(116,199,167,0.13)' }}/>
                <div className="absolute inset-[44px] rounded-full" style={{ border: '1px dashed rgba(116,199,167,0.10)' }}/>

                {/* Content */}
                <img src="/figure/logo.svg" alt="" className="w-12 h-12 mb-3" aria-hidden="true"/>
                <p className="text-[11px] font-bold text-[#6FBF9E] tracking-[0.1em] mb-4">
                  AVAIL ENGINE
                </p>
                <div className="flex flex-col gap-[7px]">
                  {ENGINE_LINES.map(([Ic, text]) => (
                    <div key={text} className="flex items-center gap-[6px]">
                      <Ic />
                      <p className="text-[10px] text-[#9CA3AF]">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Outputs */}
            <div className="flex flex-col w-[235px] flex-shrink-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF] mb-4 text-center">
                Outputs
              </p>
              <div className="flex flex-col gap-[14px]">

                {/* Load Score */}
                <motion.div
                  {...inView(0.36)}
                  className="bg-white rounded-2xl p-5"
                  style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.055), 0 0 0 1px rgba(0,0,0,0.038)' }}
                >
                  <p className="text-[10px] font-semibold text-[#9CA3AF] mb-2 tracking-[0.02em]">
                    Load Score (PSI)
                  </p>
                  <div className="flex items-end justify-between mb-3">
                    <div className="flex items-baseline gap-[3px]">
                      <span className="text-[42px] font-bold text-[#111318] leading-none tracking-tight">76</span>
                      <span className="text-[12px] text-[#9CA3AF] font-medium">/100</span>
                    </div>
                    <Sparkline />
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <span className="w-[6px] h-[6px] rounded-full bg-[#6FBF9E] flex-shrink-0"/>
                    <span className="text-[11px] font-semibold text-[#6FBF9E]">Optimal</span>
                  </div>
                </motion.div>

                {/* Daily Recommendation */}
                <motion.div
                  {...inView(0.44)}
                  className="bg-white rounded-2xl p-5"
                  style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.055), 0 0 0 1px rgba(0,0,0,0.038)' }}
                >
                  <p className="text-[10px] font-semibold text-[#9CA3AF] mb-2 tracking-[0.02em]">
                    Daily Recommendation
                  </p>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[17px] font-bold text-[#6FBF9E] tracking-[-0.01em]">Maintain Load</p>
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#C4CAD4]" aria-hidden="true">
                      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="text-[11.5px] text-[#9CA3AF]">RPE Zone: 4–6</p>
                </motion.div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom tagline ── */}
        <motion.div {...inView(0.52)} className="flex items-center justify-center gap-2 mt-14">
          <svg viewBox="0 0 20 20" fill="none" className="w-[14px] h-[14px] flex-shrink-0" aria-hidden="true">
            <path d="M10 2L3 5v5c0 4 3 7.5 7 8.5C14 17.5 17 14 17 10V5l-7-3z"
              fill="#6FBF9E" fillOpacity=".18" stroke="#6FBF9E" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M7 10l2 2 4-4" stroke="#6FBF9E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-[12.5px] text-[#9CA3AF] font-medium">
            Evidence-based. Athlete-specific. Actionable.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
