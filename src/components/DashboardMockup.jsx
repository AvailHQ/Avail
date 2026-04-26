import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// ─── Score counter hook ────────────────────────────────────────────────────
function useCounter(target, duration = 1200, delay = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const ease = (x) => 1 - Math.pow(1 - x, 3)
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        setValue(Math.round(ease(p) * target))
        if (p < 1) requestAnimationFrame(tick)
        else setValue(target)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [target, duration, delay])
  return value
}

// ─── Inline SVG line chart ─────────────────────────────────────────────────
const STROKE = 'M0,56 C14,52 28,38 48,34 C68,30 88,62 112,58 C136,54 152,22 176,18 C200,14 220,44 244,46 C268,48 280,38 300,34'
const FILL   = STROKE + ' L300,80 L0,80 Z'

function MiniChart() {
  return (
    <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="dmFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#74c7a7" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#74c7a7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dmLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#6FBF9E" />
          <stop offset="100%" stopColor="#4FA3C7" />
        </linearGradient>
      </defs>
      <motion.path d={FILL} fill="url(#dmFill)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }} />
      <motion.path d={STROKE} fill="none" stroke="url(#dmLine)"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 1.0, duration: 1.2, ease: [0.4, 0, 0.2, 1] }} />
      {/* Highlight dot at peak */}
      <motion.circle cx="176" cy="18" r="4" fill="white" stroke="#6FBF9E" strokeWidth="2"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.3, ease: 'backOut' }} />
    </svg>
  )
}

// ─── Sidebar squad item ────────────────────────────────────────────────────
function SquadItem({ initials, label, color, active }) {
  return (
    <div className={`flex items-center gap-2 px-2 py-[5px] rounded-[7px] cursor-pointer transition-colors duration-100 ${active ? 'bg-[#F0FAF6]' : 'hover:bg-[#F7F9FC]'}`}>
      <span className={`w-5 h-5 rounded-[5px] flex items-center justify-center text-[9px] font-bold flex-shrink-0`}
        style={{ background: color, color: '#fff' }}>{initials}</span>
      <span className={`text-[11px] font-medium truncate ${active ? 'text-[#1A7A55]' : 'text-[#4B5563]'}`}>{label}</span>
    </div>
  )
}

// ─── Stat card ─────────────────────────────────────────────────────────────
function StatCard({ label, value, unit, change, positive, children }) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E8ECF0] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex-1 min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-[#9CA3AF] mb-2">{label}</p>
      <div className="flex items-end gap-1">
        <span className="text-[28px] font-bold tracking-[-0.04em] text-[#111318] leading-none tabular-nums">{value}</span>
        {unit && <span className="text-[13px] text-[#9CA3AF] mb-[2px]">{unit}</span>}
      </div>
      {children}
      {change && (
        <p className={`text-[10px] font-medium mt-1 ${positive ? 'text-[#1A7A55]' : 'text-[#DC2626]'}`}>
          {positive ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  )
}

// ─── Player row ────────────────────────────────────────────────────────────
function PlayerRow({ initials, name, score, variant, index }) {
  return (
    <div className="flex items-center gap-3 py-[7px] border-b border-[#F3F4F6] last:border-0">
      <div className={`w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0 text-[9px] font-bold ${
        variant === 'high' ? 'bg-gradient-to-br from-[#E4F5EE] to-[#CCE9DC] text-[#6FBF9E]'
        : variant === 'mid' ? 'bg-gradient-to-br from-[#FEF3E2] to-[#FAE3BC] text-[#A06820]'
        : 'bg-gradient-to-br from-[#EEF2FF] to-[#DDE4FB] text-[#5B6FD1]'
      }`} aria-hidden="true">{initials}</div>
      <span className="flex-1 text-[11px] font-medium text-[#111318] min-w-0 truncate">{name}</span>
      <div className="w-24 h-[4px] bg-[#E8ECF0] rounded-full overflow-hidden mx-2">
        <motion.div
          className={`h-full rounded-full ${
            variant === 'high' ? 'bg-gradient-to-r from-[#6FBF9E] to-[#4FA3C7]'
            : variant === 'mid' ? 'bg-gradient-to-r from-[#F0B429] to-[#E08C10]'
            : 'bg-gradient-to-r from-[#7B8FF7] to-[#5B6FD1]'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: 1.0 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-[11px] font-bold text-[#111318] tabular-nums w-6 text-right">{score}</span>
    </div>
  )
}

// ─── Main dashboard ────────────────────────────────────────────────────────
const PLAYERS = [
  { initials: 'SR', name: 'S. Robertson',  score: 82, variant: 'high' },
  { initials: 'MC', name: 'M. Clarke',     score: 65, variant: 'mid'  },
  { initials: 'AT', name: 'A. Thompson',   score: 91, variant: 'high' },
  { initials: 'JW', name: 'J. Williams',   score: 74, variant: 'blue' },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function DashboardMockup() {
  const score = useCounter(78, 1200, 800)

  return (
    <div className="flex h-full min-h-[520px] text-[#111318] select-none">

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="w-[180px] flex-shrink-0 border-r border-[#E8ECF0] flex flex-col bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E8ECF0]">
          <img src="/figure/logo.svg" alt="Avail" className="w-5 h-5" aria-hidden="true" />
          <span className="text-[13px] font-bold tracking-[-0.03em]">avail</span>
          {/* collapse icon */}
          <svg className="ml-auto w-3 h-3 text-[#9CA3AF]" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M8 3L5 6L8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Squads */}
        <div className="px-3 pt-4 flex-1">
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#9CA3AF] px-2 mb-1">Squads</p>
          <SquadItem initials="SS" label="Senior Squad"  color="#6FBF9E" active />
          <SquadItem initials="U2" label="U23 Squad"     color="#4FA3C7" />
          <SquadItem initials="AC" label="Academy"       color="#7B8FF7" />

          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#9CA3AF] px-2 mt-4 mb-1">Tools</p>
          {[
            {
              label: 'All Athletes',
              Icon: () => (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="4.5" cy="3" r="1.5"/>
                  <path d="M1 10c0-1.7 1.6-3 3.5-3S8 8.3 8 10"/>
                  <path d="M8.5 4.5a1.5 1.5 0 100-3M11 10c0-1.5-1.1-2.8-2.5-3"/>
                </svg>
              ),
            },
            {
              label: 'Load Report',
              Icon: () => (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 1H3a1 1 0 00-1 1v8a1 1 0 001 1h6a1 1 0 001-1V5L7 1z"/>
                  <path d="M7 1v4h4"/>
                  <line x1="3.5" y1="7.5" x2="8.5" y2="7.5"/>
                  <line x1="3.5" y1="9.5" x2="6" y2="9.5"/>
                </svg>
              ),
            },
            {
              label: 'Analytics',
              Icon: () => (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="1" y="7" width="2.5" height="4" rx="0.4"/>
                  <rect x="4.75" y="4" width="2.5" height="7" rx="0.4"/>
                  <rect x="8.5" y="1" width="2.5" height="10" rx="0.4"/>
                </svg>
              ),
            },
            {
              label: 'Settings',
              Icon: () => (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="6" cy="6" r="1.8"/>
                  <path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11M2.6 2.6l1 1M8.4 8.4l1 1M9.4 2.6l-1 1M3.6 8.4l-1 1"/>
                </svg>
              ),
            },
          ].map(({ Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-2 py-[5px] rounded-[7px] hover:bg-[#F7F9FC] cursor-pointer">
              <span className="text-[#9CA3AF] flex-shrink-0"><Icon /></span>
              <span className="text-[11px] font-medium text-[#4B5563]">{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom user avatar */}
        <div className="px-4 py-3 border-t border-[#E8ECF0] flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6FBF9E] to-[#4FA3C7] flex-shrink-0" />
          <span className="text-[10px] font-medium text-[#4B5563] truncate">Coach Admin</span>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────── */}
      <div className="flex-1 flex flex-col bg-[#F7F9FC] overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-[#E8ECF0]">
          <div>
            <p className="text-[9px] text-[#9CA3AF] font-medium">Squads</p>
            <p className="text-[14px] font-bold tracking-[-0.02em]">Senior Squad</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Model pill */}
            <span className="text-[9px] font-semibold text-[#4B5563] bg-[#F3F4F6] border border-[#E8ECF0] rounded-[5px] px-2 py-[3px] flex items-center gap-1">
              All athletes <span className="text-[#9CA3AF]">▾</span>
            </span>
            {/* Date range */}
            <span className="text-[9px] font-semibold text-[#4B5563] bg-[#F3F4F6] border border-[#E8ECF0] rounded-[5px] px-2 py-[3px] flex items-center gap-1">
              Thu 24 Apr 2026 <span className="text-[#9CA3AF]">▾</span>
            </span>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 px-5 py-4 overflow-hidden">

          {/* Stat cards */}
          <div className="flex gap-3 mb-4">
            {/* Load Score */}
            <StatCard label="Load Score" value={score} unit="/100" change="+2.3% vs last week" positive>
              <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-medium text-[#9CA3AF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6FBF9E]" />updated 6 min ago
              </span>
            </StatCard>

            {/* Availability */}
            <StatCard label="Availability" value="86" unit="%" change="+3 pts this week" positive />

            {/* Status */}
            <div className="bg-white rounded-[12px] border border-[#E8ECF0] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex-1 min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-[#9CA3AF] mb-2">Status</p>
              <span className="inline-flex items-center gap-[5px] h-7 px-3 rounded-[7px] bg-[#EDFAF4] text-[#1A7A55] text-[11px] font-semibold tracking-[0.04em] uppercase border border-[rgba(26,122,85,0.12)]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#6FBF9E]" aria-hidden="true" />
                Maintain
              </span>
              <p className="text-[9px] text-[#9CA3AF] mt-2 leading-[1.5]">No change to planned training load recommended.</p>
            </div>
          </div>

          {/* Two-column: chart + squad overview */}
          <div className="flex gap-3 h-[calc(100%-110px)]">

            {/* Chart card */}
            <div className="bg-white rounded-[12px] border border-[#E8ECF0] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-[#111318]">Load Score &amp; 7-day trend</p>
                <div className="flex items-center gap-3 text-[9px] font-medium text-[#9CA3AF]">
                  <span className="flex items-center gap-1"><span className="w-3 h-[2px] rounded bg-gradient-to-r from-[#6FBF9E] to-[#4FA3C7] inline-block" />Load score</span>
                </div>
              </div>
              {/* Chart with Y-axis on left, day labels below */}
              <div className="flex-1 min-h-0 flex gap-[6px]">
                {/* Y-axis */}
                <div className="flex flex-col justify-between py-[2px] flex-shrink-0">
                  <span className="text-[7px] text-[#C4C9D4] leading-none">100</span>
                  <span className="text-[7px] text-[#C4C9D4] leading-none">0</span>
                </div>
                {/* Chart + X-axis labels */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex-1 min-h-0">
                    <MiniChart />
                  </div>
                  <div className="flex justify-between mt-[3px]">
                    {DAYS.map(d => (
                      <span key={d} className="text-[7px] font-medium text-[#C4C9D4]">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Squad overview card */}
            <div className="bg-white rounded-[12px] border border-[#E8ECF0] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] w-[220px] flex-shrink-0 flex flex-col">
              <p className="text-[11px] font-semibold text-[#111318] mb-1">Squad Overview</p>
              <p className="text-[9px] text-[#9CA3AF] mb-3">Today · 4 athletes</p>
              <div className="flex-1">
                {PLAYERS.map((p, i) => (
                  <PlayerRow key={p.name} {...p} index={i} />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
                <span className="text-[9px] text-[#9CA3AF] font-medium">Squad avg</span>
                <span className="text-[11px] font-bold text-[#111318] tabular-nums">78</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
