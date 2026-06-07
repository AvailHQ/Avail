import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

const PROOF_POINTS = [
  {
    value: "7 / 780",
    label: "Only 7 papers studied cycle phase and elite performance rigorously.",
  },
  {
    value: "314",
    label: "Elite female athletes across all cycle-performance research combined.",
  },
  {
    value: "0",
    label:
      "Long-term team-sport datasets linking cycle context, training load, and outcomes.",
  },
];

export default function ProofSection() {
  return (
    <section
      className="w-full bg-[#111318] px-6 py-20 text-white hero:px-8 hero:py-24 wide:py-28"
      aria-labelledby="proof-headline"
    >
      <div className="mx-auto max-w-[1160px] wide:max-w-[1440px]">
        <motion.div {...fadeUp(0)} className="max-w-[760px]">
          <p className="mb-7 text-fluid-xs font-semibold uppercase tracking-[0.15em] text-[#6FBF9E]">
            EVIDENCE
          </p>
          <h2
            id="proof-headline"
            className="max-w-[760px] text-fluid-4xl font-bold leading-[1.1] tracking-[-0.03em]"
          >
            Did You Know?
          </h2>
          <p className="mt-6 max-w-[680px] text-fluid-base sm:text-fluid-lg leading-[1.65] text-white/62">
            Most training tools were built without the data women&apos;s sport actually needs.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.12)}
          className="my-12 h-px w-full bg-white/12 hero:my-14"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 wide:gap-16">
          {PROOF_POINTS.map((point, index) => (
            <motion.article
              key={point.value}
              {...fadeUp(0.16 + index * 0.06)}
              className="max-w-[360px]"
            >
              <p className="mb-4 text-fluid-3xl font-bold leading-none tracking-[-0.03em] text-white">
                {point.value}
              </p>
              <p className="text-fluid-base leading-[1.65] text-white/58">
                {point.label}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
