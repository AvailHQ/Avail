import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const TESTIMONIALS = [
  {
    logoSrc: "/figure/ASC.png",
    logoAlt: "Stretford A.S.C.",
    name: "Coach Tom Pope",
    role: "ASC Stretford Head Coach",
    quote: "Tell us before training, not after the data comes back.",
  },
  {
    logoSrc: "/figure/UA92.png",
    logoAlt: "UA92",
    name: "Chris George Smith",
    role: "UA92 Sport Science Staff",
    quote: "We need a clearer reason behind the readiness number.",
  },
  {
    logoSrc: "/figure/salford_fc.svg",
    logoAlt: "Salford City FC",
    name: "Salford City FC",
    role: "Early pilot network",
    quote: "The useful signal is who needs a different load today.",
  },
];

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

export default function PilotTestimonialSection() {
  const [testimonialOrder, setTestimonialOrder] = useState(TESTIMONIALS);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTestimonialOrder((current) => {
        const last = current[current.length - 1];
        return [last, ...current.slice(0, -1)];
      });
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const visibleTestimonials = testimonialOrder.slice(0, 3);

  return (
    <section className="bg-white px-6 py-20 wide:py-24">
      <div className="mx-auto grid max-w-[1160px] gap-12 hero:grid-cols-[0.92fr_1.08fr] hero:items-center wide:max-w-[1320px]">
        <motion.div {...fadeUp(0)} className="max-w-[520px]">
          <p className="mb-7 text-fluid-xs font-semibold uppercase tracking-[0.15em] text-[#6FBF9E]">
            PILOT PROGRAMME
          </p>
          <h2 className="text-fluid-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#111318]">
            We&apos;re expanding our pilot network now
          </h2>
          <p className="mt-6 max-w-[460px] text-fluid-base leading-[1.7] text-slate-500 sm:text-fluid-lg sm:leading-[1.75]">
            Join the calibration season. You get the product, we build the model
            with real training feedback
          </p>
          <div className="mt-9">
            <GradientButton>Apply for Pilot Access</GradientButton>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.12)}
          className="relative flex min-h-[360px] flex-col justify-center gap-5"
          style={{ perspective: "900px" }}
          aria-label="Coach feedback themes"
        >
          {visibleTestimonials.map((item, index) => {
            const isActive = index === 1;
            const layerClass =
              index === 0 ? "z-0" : index === 1 ? "z-20" : "z-10";
            const rotateX = index === 0 ? -7 : index === 2 ? 7 : 0;

            return (
            <motion.article
              key={item.name}
              layout
              className={`relative h-[148px] overflow-hidden rounded-[18px] border border-slate-200/70 bg-white/86 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur ${
                isActive
                  ? "border-l-[6px] border-l-[#6FBF9E]"
                  : "border-l-[6px] border-l-slate-200"
              } ${
                isActive
                  ? "hero:ml-0 hero:mr-12"
                  : "hero:ml-24 hero:mr-0"
              } ${layerClass}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              animate={{
                opacity: isActive ? 1 : 0.5,
                y: 0,
                scale: isActive ? 1 : 0.92,
                rotateX,
              }}
              transition={{
                layout: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.75 },
                scale: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                rotateX: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <Quote
                className={`absolute right-5 top-5 h-7 w-7 ${
                  isActive ? "text-[#4FA3C7]" : "text-[#6FBF9E]/28"
                }`}
                strokeWidth={2.2}
                aria-hidden="true"
              />
              <div className="flex items-start gap-4 pr-10">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#DFF4EC] p-2 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  <img
                    src={item.logoSrc}
                    alt={item.logoAlt}
                    className="max-h-10 max-w-10 object-contain"
                  />
                </div>
                <div>
                  <p className="text-fluid-base font-bold leading-tight text-[#111318]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-fluid-xs font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
                    {item.role}
                  </p>
                  <p className="mt-3 text-fluid-base leading-[1.55] text-[#667085]">
                    &quot;{item.quote}&quot;
                  </p>
                </div>
              </div>
            </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
