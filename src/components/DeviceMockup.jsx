import { motion } from 'framer-motion'
import DashboardMockup from './DashboardMockup'

export default function DeviceMockup() {
  return (
    <motion.div
      className="relative w-full flex justify-center items-end px-6"
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
    >
      {/* Glow shadow underneath the device */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-16 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(79,163,199,0.22) 0%, rgba(111,191,158,0.12) 40%, transparent 75%)',
          filter: 'blur(24px)',
        }}
        aria-hidden="true"
      />

      {/* Tablet frame */}
      <div
        className="relative w-full max-w-[960px]"
        style={{
          perspective: '1200px',
        }}
      >
        <motion.div
          className="relative w-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(4deg)',
          }}
          whileHover={{ transform: 'rotateX(1deg)' }}
          transition={{ type: 'spring', stiffness: 180, damping: 26 }}
        >
          {/* Device outer shell */}
          <div
            className="relative w-full rounded-t-[20px] overflow-hidden"
            style={{
              background: '#1A1A1E',
              padding: '10px 10px 0',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.06) inset, ' +
                '0 32px 80px rgba(0,0,0,0.28), ' +
                '0 8px 24px rgba(0,0,0,0.18)',
            }}
          >
            {/* Top bar with camera */}
            <div className="flex items-center justify-center h-5 mb-[6px]">
              <div className="w-[6px] h-[6px] rounded-full bg-[#3A3A3E]" aria-hidden="true" />
            </div>

            {/* Screen — white background, dashboard inside */}
            <div className="relative w-full rounded-t-[10px] overflow-hidden bg-white" style={{ minHeight: 520 }}>
              <DashboardMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
