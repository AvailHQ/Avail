import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export default function HeroCopy() {
  return (
    <>
      <motion.div
        {...fadeUp(0.05)}
        className="inline-flex items-center gap-2 text-fluid-xs font-semibold tracking-[0.1em] uppercase text-[#6FBF9E] mb-6"
      >
        <span className="w-5 h-[1.5px] bg-[#6FBF9E] rounded-full" />
        CURRENT WOMEN’S SPORT SYSTEMS WERE BUILT ON MALE DATA
        <span className="w-5 h-[1.5px] bg-[#6FBF9E] rounded-full" />
      </motion.div>

      <motion.h1
        {...fadeUp(0.15)}
        className="mx-auto mb-5 max-w-[1180px] font-bold leading-[1.13] tracking-[-0.03em] text-[#111318] text-fluid-4xl wide:max-w-[1320px]"
      >
        Current load systems treat women like adjusted averages
      </motion.h1>

      <motion.p
        {...fadeUp(0.25)}
        className="text-fluid-base sm:text-fluid-lg leading-[1.68] text-[#4B5563] tracking-[-0.01em] max-w-[600px] mx-auto mb-9 wide:max-w-[680px]"
      >
        Predictive physiological modelling, individual to each athlete.
        <br />A Load Score for every athlete, before every session.
      </motion.p>

      <motion.div
        {...fadeUp(0.38)}
        className="flex items-center justify-center gap-3 flex-wrap"
      >
        <Link
          to="/join-pilot-programme"
          className="inline-flex items-center justify-center h-[46px] px-7 rounded-full text-white text-fluid-md font-semibold tracking-[-0.01em] shadow-[0_4px_18px_rgba(111,191,158,0.45)] hover:opacity-[0.88] hover:-translate-y-px active:translate-y-0 transition-all duration-150 wide:h-[56px] wide:px-9"
          style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
        >
          Join waitlist
        </Link>
      </motion.div>
    </>
  );
}
