import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import PricingComingSoonModal from "./PricingComingSoonModal";

export default function Nav() {
  const [showPricingModal, setShowPricingModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#F7F9FC]/80 backdrop-blur-xl border-b border-[#E8ECF0] shadow-[0_1px_0_rgba(0,0,0,0.05)]">
        <nav
          className="max-w-[1160px] mx-auto h-full px-8 flex items-center gap-8"
          aria-label="Main navigation"
        >
          <a
            href="/"
            className="flex items-center gap-2 mr-auto"
            aria-label="Avail home"
          >
            <img
              src="/figure/logo.svg"
              alt=""
              className="h-10 w-10"
              aria-hidden="true"
            />
            <span className="text-[17px] font-bold tracking-[-0.04em] text-[#111318]">
              Avail
            </span>
          </a>

          <ul className="hidden hero:flex items-center gap-6 h-full" role="list">
            <li>
              <a
                href="/#solution-headline"
                className="text-[13px] font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="/#team-headline"
                className="text-[13px] font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
              >
                Science
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowPricingModal(true)}
                className="text-[13px] font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
              >
                Pricing
              </button>
            </li>
          </ul>

          <Link
            to="/join-pilot-programme"
            className="inline-flex items-center justify-center h-9 px-4 rounded-full text-white text-[12px] font-semibold tracking-[0.01em] shadow-[0_1px_8px_rgba(111,191,158,0.32)] hover:opacity-85 hover:-translate-y-px transition-all duration-150"
            style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
          >
            Join waitlist
          </Link>
        </nav>
      </header>

      <AnimatePresence>
        {showPricingModal && (
          <PricingComingSoonModal onClose={() => setShowPricingModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
