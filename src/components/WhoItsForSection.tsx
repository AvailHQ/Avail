import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

interface Audience {
  title: string;
  tagline: string;
  bullets: string[];
}

const AUDIENCES: Audience[] = [
  {
    title: "Coach",
    tagline: "Shouldn't Have To Guess.",
    bullets: [
      "See who's ready",
      "See who needs a lighter day",
      "Before training starts",
    ],
  },
  {
    title: "Athletes",
    tagline: "Shouldn't Have To Explain Themselves.",
    bullets: [
      "A Quick Check-In.",
      "A Clearer Picture.",
      "Without Sharing Everything",
    ],
  },
  {
    title: "Performance Teams",
    tagline: "Need The Full Picture.",
    bullets: ["One view", "Every athlete", "Before decisions are made"],
  },
];

export default function WhoItsForSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeAudience = AUDIENCES[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden px-5 py-24 hero:px-8 hero:py-32 wide:py-36"
      aria-labelledby="who-its-for-headline"
      style={{
        background:
          "radial-gradient(ellipse 90% 75% at 50% 20%, #ffffff 0%, #F8F8F6 100%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="whoItsForGrid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.8" fill="rgba(0,0,0,0.035)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#whoItsForGrid)" />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-[1240px] gap-16 hero:grid-cols-[minmax(340px,500px)_minmax(0,1fr)] hero:items-center hero:gap-[clamp(8rem,11vw,12rem)] wide:max-w-[1520px] wide:grid-cols-[minmax(500px,620px)_minmax(0,760px)]">
        <motion.div
          {...fadeUp(0.12)}
          className="relative hidden aspect-[1.03/1] overflow-hidden rounded-[28px] border border-white/80 bg-white/72 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl hero:block wide:aspect-[1.08/1]"
          aria-label={`Image placeholder for ${activeAudience.title}`}
        >
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at 28% 24%, rgba(111,191,158,0.16), transparent 34%), radial-gradient(circle at 72% 70%, rgba(79,163,199,0.14), transparent 36%), linear-gradient(135deg, rgba(255,255,255,0.94), rgba(247,251,255,0.82))",
            }}
          />
        </motion.div>

        <motion.div
          {...fadeUp(0)}
          className="hero:max-w-[720px] wide:max-w-[760px]"
        >
          <p className="mb-8 flex items-center gap-3 text-fluid-xs font-semibold uppercase tracking-[0.15em] text-[#6FBF9E]">
            <span className="h-2 w-2 rounded-full bg-[#4FA3C7]" />
            BUILT AROUND THE PEOPLE MAKING THE CALLS
          </p>
          <h2
            id="who-its-for-headline"
            className="mb-12 text-fluid-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#111318] hero:mb-14"
          >
            Who It's For
          </h2>

          <div className="relative py-3 pl-5 sm:pl-7 hero:py-6 hero:pl-10 wide:pl-12">
            <div
              className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full"
              style={{
                background: "linear-gradient(180deg, #6FBF9E, #4FA3C7)",
              }}
            />
            <div className="space-y-7 hero:space-y-11">
              {AUDIENCES.map((audience, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={audience.title}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setActiveIndex(index)}
                    className="block w-full text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#6FBF9E]"
                    aria-expanded={isActive}
                  >
                    <span
                      className={`block text-fluid-md leading-[1.35] tracking-[-0.01em] transition-colors duration-200 sm:text-fluid-lg hero:text-fluid-xl hero:leading-[1.25] hero:tracking-[-0.02em] ${
                        isActive ? "text-[#111318]" : "text-[#8A929E]"
                      }`}
                    >
                      <span className="font-bold">{audience.title}</span>{" "}
                      <span className="font-normal">{audience.tagline}</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key={`${audience.title}-content`}
                          initial={{ opacity: 0, height: 0, y: -4 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -4 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 hero:pt-6">
                            <ul className="space-y-2 pl-2 text-fluid-sm leading-[1.6] text-[#2F343A] sm:text-fluid-base hero:space-y-3 hero:pl-3">
                              {audience.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-3">
                                  <span
                                    className="text-[#6FBF9E]"
                                    aria-hidden="true"
                                  >
                                    ·
                                  </span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
