import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'Does this mean coaches will see athletes\u2019 cycle data?',
    a: [
      'No. AVAIL does not expose raw cycle data to coaches.',
      'Coaches only receive a structured Load Score and training recommendation.',
      'Athletes retain full control over what is shared.',
    ],
  },
  {
    q: 'Is this just a period tracking app?',
    a: [
      'No. AVAIL is a load management system, not a tracking tool.',
      'Cycle phase is used as a contextual signal to improve training decisions \u2014 not as a standalone feature.',
    ],
  },
  {
    q: 'How is this different from tools like Catapult or Kitman Labs?',
    a: [
      'Most existing systems are built on male-dominant datasets and focus on external load.',
      'AVAIL integrates physiological variability into load tolerance, helping coaches decide how much load an athlete can actually handle \u2014 before training.',
    ],
  },
  {
    q: 'Do athletes need to wear devices?',
    a: [
      'No. The system works with simple daily inputs (under 1 minute).',
      'Wearables can be integrated, but are not required.',
    ],
  },
  {
    q: 'What if athletes don\u2019t input data consistently?',
    a: [
      'The system adapts by reducing confidence levels and using short-term trends.',
      'More importantly, athletes receive direct feedback \u2014 so they see value, not just provide data.',
    ],
  },
  {
    q: 'Is this medically accurate or diagnosing anything?',
    a: [
      'No. AVAIL is not a medical tool.',
      'It supports training decisions, not diagnosis or treatment.',
    ],
  },
  {
    q: 'How does this actually improve performance?',
    a: [
      'By aligning training load with physiological readiness, AVAIL helps reduce under\u2011 and over\u2011loading across training cycles.',
      'The result is more consistent availability and better long-term performance.',
    ],
  },
  {
    q: 'Why would a club pay for this?',
    a: [
      'Even a small improvement in athlete availability can significantly impact performance outcomes.',
      'AVAIL gives coaches clearer, more confident decisions \u2014 every day.',
    ],
  },
]

// ─── Single FAQ item ──────────────────────────────────────────────────────────

interface FAQItemProps {
  q: string
  a: string[]
  index: number
}

function FAQItem({ q, a, index }: FAQItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="border-b border-[#F0F2F5] last:border-none"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-none wide:py-7"
        aria-expanded={open}
      >
        {/* Number + question */}
        <div className="flex items-start gap-4">
          <span
            className="text-[11px] font-semibold tabular-nums mt-[2px] flex-shrink-0 transition-colors duration-150 wide:text-[13px]"
            style={{ color: open ? '#6FBF9E' : '#C4CAD4' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-150 wide:text-[18px]"
            style={{ color: open ? '#111318' : '#374151' }}
          >
            {q}
          </span>
        </div>

        {/* Toggle icon */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-[1px] transition-all duration-200 wide:h-7 wide:w-7"
          style={{
            background: open ? 'rgba(116,199,167,0.12)' : '#F4F5F7',
          }}
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="w-[10px] h-[10px] transition-transform duration-300"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
            aria-hidden="true"
          >
            <path d="M6 1v10M1 6h10" stroke={open ? '#6FBF9E' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 flex flex-col gap-[10px] wide:pb-7 wide:pl-12">
              {a.map((para, i) => (
                <p key={i} className="text-[14px] leading-[1.72] text-[#6B7280] wide:text-[16px]">
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FAQSection() {
  return (
    <section className="w-full bg-white pt-36 pb-28 px-6 wide:pt-40 wide:pb-32" aria-labelledby="faq-headline">
      <div className="max-w-[720px] mx-auto wide:max-w-[980px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[10.5px] font-semibold tracking-[0.15em] uppercase text-[#9CA3AF] mb-4">
            FAQ
          </p>
          <h2
            id="faq-headline"
            className="font-bold tracking-[-0.03em] text-[#111318] leading-[1.13] mb-4 text-[clamp(24px,3.2vw,38px)] wide:text-[46px]"
          >
            Common questions
          </h2>
          <p className="text-[15px] text-[#6B7280] leading-[1.65] max-w-[380px] mx-auto wide:max-w-[520px]">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* Accordion */}
        <div
          className="rounded-2xl overflow-hidden bg-white"
          style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.055), 0 0 0 1px rgba(0,0,0,0.04)' }}
        >
          <div className="px-8">
            {FAQS.map((item, i) => (
              <FAQItem key={i} index={i} {...item} />
            ))}
          </div>
        </div>

        {/* Bottom CTA hint */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-center text-[13px] text-[#9CA3AF] mt-10"
        >
          Still have questions?{' '}
          <a
            href="mailto:miaoyulun380@gmail.com"
            className="text-[#6FBF9E] font-semibold hover:underline transition-all"
          >
            Get in touch
          </a>
        </motion.p>

      </div>
    </section>
  )
}
