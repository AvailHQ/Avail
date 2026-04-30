import { motion } from 'framer-motion'

const PLAYERS = [
  { initials: 'SR', name: 'S. Robertson', score: 82, variant: 'high' },
  { initials: 'MC', name: 'M. Clarke',    score: 65, variant: 'mid'  },
  { initials: 'AT', name: 'A. Thompson',  score: 91, variant: 'high' },
]

export default function TeamList() {
  return (
    <div>
      <div className="flex justify-between pb-2 text-fluid-xs font-semibold tracking-[0.06em] uppercase text-[#9ca3af]">
        <span>Squad</span>
        <span>Score</span>
      </div>
      <div className="flex flex-col gap-3" role="list" aria-label="Team load scores">
        {PLAYERS.map(({ initials, name, score, variant }, i) => (
          <div key={name} className="flex items-center gap-3" role="listitem">
            <div
              className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0 text-fluid-xs font-bold tracking-[0.02em] ${
                variant === 'high'
                  ? 'bg-gradient-to-br from-[#E4F5EE] to-[#CCE9DC] text-[#6FBF9E]'
                  : 'bg-gradient-to-br from-[#FEF3E2] to-[#FAE3BC] text-[#A06820]'
              }`}
              aria-hidden="true"
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-fluid-base font-medium text-[#111318] mb-[5px] truncate">{name}</span>
              <div
                className="h-[5px] bg-[#e8ecf0] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Load score ${score}`}
              >
                <motion.div
                  className={`h-full rounded-full ${
                    variant === 'high'
                      ? 'bg-gradient-to-r from-[#6FBF9E] to-[#4FA3C7]'
                      : 'bg-gradient-to-r from-[#F0B429] to-[#E08C10]'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ delay: 0.9 + i * 0.13, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
            <span className="text-fluid-base font-bold text-[#111318] tabular-nums min-w-[22px] text-right">{score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
