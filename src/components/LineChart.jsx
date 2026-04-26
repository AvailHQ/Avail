import { motion } from 'framer-motion'

const STROKE_PATH =
  'M0,45 C20,42 40,30 60,28 C80,26 100,50 120,48 C140,46 160,20 180,18 C200,16 220,38 240,40 C260,42 270,35 280,32'

const FILL_PATH = STROKE_PATH + ' L280,80 L0,80 Z'

const DOTS = [
  { cx: 0,   cy: 45, fill: '#6FBF9E' },
  { cx: 60,  cy: 28, fill: '#6FBF9E' },
  { cx: 120, cy: 48, fill: '#6FBF9E' },
  { cx: 180, cy: 18, fill: '#4FA3C7' },
  { cx: 240, cy: 40, fill: '#4FA3C7' },
  { cx: 280, cy: 32, fill: '#4FA3C7' },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function LineChart() {
  return (
    <div aria-hidden="true">
      <div className="flex justify-between mb-2">
        {DAYS.map((d) => (
          <span key={d} className="text-[11px] font-medium text-[#9ca3af] tracking-[0.02em]">
            {d}
          </span>
        ))}
      </div>
      <svg
        viewBox="0 0 280 80"
        preserveAspectRatio="none"
        className="w-full overflow-visible"
        style={{ height: 76 }}
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#74c7a7" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#74c7a7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#6FBF9E" />
            <stop offset="100%" stopColor="#4FA3C7" />
          </linearGradient>
        </defs>
        <motion.path
          d={FILL_PATH}
          fill="url(#chartFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.5 }}
        />
        <motion.path
          d={STROKE_PATH}
          fill="none"
          stroke="url(#chartLine)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 1.15, ease: [0.4, 0, 0.2, 1] }}
        />
        {DOTS.map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r="3.5"
            fill={dot.fill}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.05 + i * 0.06, duration: 0.28, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
