import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import PricingComingSoonModal from "./PricingComingSoonModal";

export default function Nav() {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openPricingModal = () => {
    closeMobileMenu();
    setShowPricingModal(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#F7F9FC]/80 backdrop-blur-xl border-b border-[#E8ECF0] shadow-[0_1px_0_rgba(0,0,0,0.05)] wide:h-20">
        <nav
          className="max-w-[1160px] mx-auto h-full px-5 hero:px-8 flex items-center gap-8 wide:max-w-[1440px]"
          aria-label="Main navigation"
        >
          <a
            href="/"
            className="flex items-center gap-2 mr-auto"
            aria-label="Avail home"
            onClick={closeMobileMenu}
          >
            <img
              src="/figure/logo.svg"
              alt=""
              className="h-10 w-10 wide:h-12 wide:w-12"
              aria-hidden="true"
            />
            <span className="text-fluid-lg font-bold tracking-[-0.04em] text-[#111318]">
              Avail
            </span>
          </a>

          <ul className="hidden hero:flex items-center gap-6 h-full wide:gap-8" role="list">
            <li>
              <Link
                to="/how-it-works"
                className="text-fluid-base font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
              >
                How it works
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={openPricingModal}
                className="text-fluid-base font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
              >
                Pricing
              </button>
            </li>
          </ul>

          <Link
            to="/join-pilot-programme"
            className="hidden hero:inline-flex items-center justify-center h-9 px-4 rounded-full text-white text-fluid-sm font-semibold tracking-[0.01em] shadow-[0_1px_8px_rgba(111,191,158,0.32)] hover:opacity-85 hover:-translate-y-px transition-all duration-150 wide:h-11 wide:px-6"
            style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
          >
            Join waitlist
          </Link>

          <button
            type="button"
            className="hero:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D8DEE6] bg-white/80 text-[#111318] shadow-[0_1px_8px_rgba(0,0,0,0.06)]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={19} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="hero:hidden absolute left-0 right-0 top-16 border-b border-[#E8ECF0] bg-[#F7F9FC]/95 px-5 py-4 shadow-[0_16px_32px_rgba(17,19,24,0.08)] backdrop-blur-xl"
            >
              <div className="flex flex-col gap-1">
                <Link
                  to="/how-it-works"
                  onClick={closeMobileMenu}
                  className="rounded-[8px] px-3 py-3 text-fluid-md font-semibold text-[#374151] active:bg-[#EEF2F5]"
                >
                  How it works
                </Link>
                <button
                  type="button"
                  onClick={openPricingModal}
                  className="rounded-[8px] px-3 py-3 text-left text-fluid-md font-semibold text-[#374151] active:bg-[#EEF2F5]"
                >
                  Pricing
                </button>
                <Link
                  to="/join-pilot-programme"
                  onClick={closeMobileMenu}
                  className="mt-3 inline-flex h-11 items-center justify-center rounded-full text-fluid-md font-semibold text-white shadow-[0_2px_12px_rgba(111,191,158,0.34)]"
                  style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
                >
                  Join waitlist
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {showPricingModal && (
          <PricingComingSoonModal onClose={() => setShowPricingModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
