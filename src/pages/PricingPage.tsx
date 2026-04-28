import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import WaitlistFormPanel from "../components/WaitlistFormPanel";

interface Plan {
  name: string;
  audience: string;
  price: string;
  priceSuffix: string;
  billing: string;
  features: string[];
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Basic",
    audience:
      "Best for early-stage pilot clubs looking to digitize their pipeline.",
    price: "£7,500",
    priceSuffix: "/season",
    billing: "Billed annually",
    features: [
      "Up to 25 athletes",
      "Core Load Score engine",
      "Basic performance dashboard",
      "Manual daily data entry",
      "Weekly reporting",
      "Standard support",
    ],
  },
  {
    name: "Professional",
    audience: "Best for professional clubs & performance departments.",
    price: "£15,000",
    priceSuffix: "/season",
    billing: "Billed annually",
    features: [
      "GPS + HR integration",
      "Advanced trend analytics",
      "Multi-season tracking",
      "Enhanced dashboards",
      "Priority support",
      "Expanded athlete monitoring",
    ],
    featured: true,
  },
  {
    name: "Elite",
    audience: "Best for federations & enterprise organisations.",
    price: "£25,000+",
    priceSuffix: "/season",
    billing: "Custom enterprise pricing",
    features: [
      "Custom integrations",
      "Federation dashboard",
      "Cross-club benchmarking",
      "Advanced tolerance modelling",
      "Dedicated onboarding",
      "Quarterly performance reviews",
    ],
  },
];

type PricingMode = "pilot" | "official";

function BillingSwitch({
  mode,
  onChange,
}: {
  mode: PricingMode;
  onChange: (mode: PricingMode) => void;
}) {
  return (
    <div className="mx-auto mt-14 flex w-full max-w-[440px] rounded-full bg-[#E9EBED] p-0 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#111318]">
      <button
        type="button"
        onClick={() => onChange("pilot")}
        className={`flex h-[58px] flex-1 items-center justify-center rounded-full px-5 transition-all duration-200 ${
          mode === "pilot"
            ? "text-white shadow-[0_10px_28px_rgba(79,163,199,0.24)]"
            : ""
        }`}
        style={
          mode === "pilot"
            ? { background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }
            : undefined
        }
        aria-pressed={mode === "pilot"}
      >
        Pilot Programme
      </button>
      <button
        type="button"
        onClick={() => onChange("official")}
        className={`flex h-[58px] flex-1 items-center justify-center rounded-full px-5 transition-all duration-200 ${
          mode === "official"
            ? "text-white shadow-[0_10px_28px_rgba(79,163,199,0.24)]"
            : ""
        }`}
        style={
          mode === "official"
            ? { background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }
            : undefined
        }
        aria-pressed={mode === "official"}
      >
        Official Launched
      </button>
    </div>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const cardClasses = plan.featured
    ? "relative text-white border-[#5BAFC0] shadow-[0_26px_60px_rgba(79,163,199,0.28)] hover:shadow-[0_32px_72px_rgba(79,163,199,0.38)]"
    : "bg-white text-[#2D3438] border-[#E3E8EC] shadow-[0_18px_46px_rgba(17,19,24,0.06)] hover:border-[#C9D3D8] hover:shadow-[0_28px_68px_rgba(17,19,24,0.11)]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.08 * index,
      }}
      className={`flex min-h-[520px] flex-col rounded-[18px] border px-7 py-9 transition-all duration-300 ease-out hover:-translate-y-2 hero:px-8 hero:py-10 ${cardClasses}`}
      style={
        plan.featured
          ? { background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }
          : undefined
      }
    >
      {plan.featured && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9EF0CE] px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#006D57] shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
          Most Popular
        </div>
      )}

      <div>
        <h2
          className={`text-[21px] font-bold leading-tight ${plan.featured ? "uppercase tracking-[-0.01em]" : ""}`}
        >
          {plan.name}
        </h2>
        <p
          className={`mt-4 min-h-[56px] text-[15px] font-medium leading-[1.45] ${plan.featured ? "text-white/72" : "text-[#5B636B]"}`}
        >
          {plan.audience}
        </p>
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap items-baseline gap-x-1">
          <span className="text-[34px] font-bold tracking-[-0.03em] leading-none hero:text-[36px]">
            {plan.price}
          </span>
          <span
            className={`text-[13px] font-semibold ${plan.featured ? "text-white/75" : "text-[#5B636B]"}`}
          >
            {plan.priceSuffix}
          </span>
        </div>
        <p
          className={`mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] ${plan.featured ? "text-white/55" : "text-[#7D858C]"}`}
        >
          {plan.billing}
        </p>
      </div>

      <ul className="mt-10 flex flex-col gap-6" role="list">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckCircle2
              className={`mt-[2px] h-[17px] w-[17px] flex-none ${plan.featured ? "text-[#B9F7DA]" : "text-[#007A60]"}`}
              strokeWidth={2.4}
              aria-hidden="true"
            />
            <span
              className={`text-[14.5px] font-medium leading-snug ${plan.featured ? "text-white/88" : "text-[#5B636B]"}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function PricingPage() {
  const [mode, setMode] = useState<PricingMode>("official");

  return (
    <main
      className="min-h-screen px-6 pb-16 pt-28 font-sans hero:pb-24 hero:pt-24"
      style={{
        background:
          "radial-gradient(ellipse 90% 55% at 50% 42%, rgba(111,191,158,0.15) 0%, rgba(247,249,252,0) 55%), linear-gradient(180deg, #F7F9FC 0%, #FFFFFF 100%)",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1000px] text-center"
        aria-labelledby="pricing-headline"
      >
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6FBF9E]">
          Pricing
        </p>
        <h1
          id="pricing-headline"
          className="mx-auto max-w-[860px] font-bold leading-[1.04] tracking-[-0.04em] text-[#111318]"
          style={{ fontSize: "clamp(38px, 6.4vw, 48px)" }}
        >
          Performance infrastructure built to scale.
        </h1>
        <p className="mx-auto mt-8 max-w-[670px] text-[17px] leading-[1.68] tracking-[-0.01em] text-[#4B5563] hero:text-[19px]">
          Flexible data architecture and intelligence tools designed for the
          unique demands of elite sports organizations and performance
          departments.
        </p>
        <BillingSwitch mode={mode} onChange={setMode} />
      </motion.section>

      {mode === "pilot" ? (
        <section
          className="mx-auto mt-16 max-w-[1160px]"
          aria-label="Pilot programme waitlist"
        >
          <WaitlistFormPanel />
        </section>
      ) : (
        <section
          className="mx-auto mt-16 grid max-w-[1160px] grid-cols-1 gap-8 hero:grid-cols-3"
          aria-label="Pricing plans"
        >
          {PLANS.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </section>
      )}
    </main>
  );
}
