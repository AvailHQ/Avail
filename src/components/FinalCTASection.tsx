import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const, delay },
});

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

export default function FinalCTASection() {
  return (
    <section className="bg-white px-6 py-16 wide:py-20">
      <motion.div
        {...fadeUp(0)}
        className="mx-auto max-w-[1080px] overflow-hidden rounded-[36px] border border-slate-200/70 bg-gradient-to-b from-white via-[#F7FBFF] to-[#DDEBFF] p-12 text-center shadow-[0_30px_80px_rgba(15,23,42,0.10)] hero:p-24 wide:max-w-[1320px]"
      >
        <h2 className="mx-auto max-w-[960px] text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em] text-[#111318] sm:text-fluid-4xl sm:leading-[1.05] sm:tracking-[-0.045em] wide:max-w-[960px]">
          Women's sport was never built for population averages
        </h2>
        <p className="mx-auto mt-5 max-w-[560px] text-fluid-base leading-[1.7] text-slate-500 sm:text-fluid-lg sm:leading-[1.75]">
          Avail brings individualized physiological context into load management.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GradientButton>Apply for Pilot Access</GradientButton>
        </div>
      </motion.div>
    </section>
  );
}
