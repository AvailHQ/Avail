import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function PricingComingSoonModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#111318]/30 px-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] rounded-2xl bg-white p-8 text-center shadow-[0_24px_70px_rgba(17,19,24,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full text-white"
          style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
        >
          <Lock className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
        </div>
        <h2
          id="pricing-modal-title"
          className="text-fluid-2xl font-bold tracking-[-0.02em] text-[#111318]"
        >
          Pricing coming soon
        </h2>
        <p className="mx-auto mt-3 max-w-[310px] text-fluid-md leading-[1.7] text-[#6B7280]">
          Pricing will be published after the pilot programme.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 inline-flex h-[42px] items-center justify-center rounded-lg px-7 text-fluid-md font-semibold text-white transition-all duration-150 hover:-translate-y-[1px]"
          style={{
            background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)",
            boxShadow: "0 2px 12px rgba(116,199,167,0.35)",
          }}
        >
          Got it
        </button>
      </motion.div>
    </motion.div>
  );
}
