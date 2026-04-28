import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
})

export default function HeroCopy() {
  return (
    <>
      <motion.div
        {...fadeUp(0.05)}
        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#6FBF9E] mb-6"
      >
        <span className="w-5 h-[1.5px] bg-[#6FBF9E] rounded-full" />
        Load Management Intelligence
        <span className="w-5 h-[1.5px] bg-[#6FBF9E] rounded-full" />
      </motion.div>

      <motion.h1
        {...fadeUp(0.15)}
        className="font-bold leading-[1.06] tracking-[-0.04em] text-[#111318] mb-5 max-w-[1120px] mx-auto"
        style={{ fontSize: 'clamp(30px, 4.6vw, 50px)' }}
      >
        Cycle-aware load intelligence
        <br />
        for elite women's sport
      </motion.h1>

      <motion.p
        {...fadeUp(0.25)}
        className="text-[17px] leading-[1.68] text-[#4B5563] tracking-[-0.01em] max-w-[500px] mx-auto mb-9"
      >
        Turn physiological variability into clear, daily training decisions — improving athlete availability, reducing injury risk, and removing guesswork from load management.
      </motion.p>

      <motion.div
        {...fadeUp(0.38)}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        <Link
          to="/join-pilot-programme"
          className="inline-flex items-center justify-center h-[46px] px-7 rounded-full text-white text-[14px] font-semibold tracking-[-0.01em] shadow-[0_4px_18px_rgba(111,191,158,0.45)] hover:opacity-[0.88] hover:-translate-y-px active:translate-y-0 transition-all duration-150"
          style={{ background: 'linear-gradient(45deg, #6FBF9E, #4FA3C7)' }}
        >
          Join waitlist
        </Link>
      </motion.div>
    </>
  )
}
