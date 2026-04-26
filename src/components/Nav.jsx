import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── Dropdown item icons (16×16, stroke-based) ─────────────────────────────
const IcGrid = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="1" y="1" width="5" height="5" rx="1" />
    <rect x="8" y="1" width="5" height="5" rx="1" />
    <rect x="1" y="8" width="5" height="5" rx="1" />
    <rect x="8" y="8" width="5" height="5" rx="1" />
  </svg>
);
const IcFlow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1 7h8M6 4l3 3-3 3" />
    <line x1="11" y1="2" x2="11" y2="12" strokeDasharray="1.5 1.5" />
  </svg>
);
const IcTag = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1 1h5l6 6a1.5 1.5 0 010 2.12L9.12 12a1.5 1.5 0 01-2.12 0L1 6V1z" />
    <circle cx="3.5" cy="3.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);
const IcInfo = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="6" />
    <line x1="7" y1="6.5" x2="7" y2="10" />
    <circle cx="7" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const IcUsers = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="5" cy="4" r="2.5" />
    <path d="M1 12c0-2.2 1.8-4 4-4s4 1.8 4 4" />
    <path d="M10 6a2 2 0 100-4M13 12c0-1.9-1.3-3.5-3-3.9" />
  </svg>
);
const IcMail = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="1" y="3" width="12" height="9" rx="1.5" />
    <path d="M1 5l6 4 6-4" />
  </svg>
);
const IcDoc = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8 1H3a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6L8 1z" />
    <path d="M8 1v5h4" />
    <line x1="4" y1="9" x2="10" y2="9" />
    <line x1="4" y1="11" x2="7" y2="11" />
  </svg>
);
const IcChart = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="1" y="7" width="3" height="6" rx="0.5" />
    <rect x="5.5" y="4" width="3" height="9" rx="0.5" />
    <rect x="10" y="1" width="3" height="12" rx="0.5" />
  </svg>
);
const IcFaq = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="6" />
    <path d="M5.5 5.5a1.5 1.5 0 012.5 1.1C8 7.8 7 8 7 9" />
    <circle cx="7" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const IcPen = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9.5 2.5l2 2L5 11H3V9l6.5-6.5z" />
    <line x1="8" y1="4" x2="10" y2="6" />
  </svg>
);

// ─── Chevron ───────────────────────────────────────────────────────────────
const IcChevron = ({ open }) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path d="M2 3.5L5 6.5L8 3.5" />
  </svg>
);

// ─── Mega-menu data (mirrors footer content) ───────────────────────────────
const MEGA_MENU = [
  {
    heading: "PLATFORM",
    items: [
      {
        Icon: IcGrid,
        label: "Overview",
        desc: "See how Avail works end-to-end",
      },
      {
        Icon: IcFlow,
        label: "How it works",
        desc: "The load intelligence model explained",
      },
      { Icon: IcTag, label: "Pricing", desc: "Plans for elite teams" },
    ],
  },
  {
    heading: "COMPANY",
    items: [
      { Icon: IcInfo, label: "About", desc: "Our mission and approach" },
      { Icon: IcUsers, label: "Team", desc: "The people behind Avail" },
      { Icon: IcMail, label: "Contact", desc: "Get in touch with us" },
    ],
  },
  {
    heading: "RESOURCES",
    items: [
      {
        Icon: IcDoc,
        label: "Documentation",
        desc: "Technical guides and references",
      },
      { Icon: IcChart, label: "Case Studies", desc: "Results from real teams" },
      { Icon: IcFaq, label: "FAQ", desc: "Frequently asked questions" },
      { Icon: IcPen, label: "Blog", desc: "Insights on sports science" },
    ],
  },
];

// ─── Nav ───────────────────────────────────────────────────────────────────
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#F7F9FC]/80 backdrop-blur-xl border-b border-[#E8ECF0] shadow-[0_1px_0_rgba(0,0,0,0.05)]">
        <nav
          className="max-w-[1160px] mx-auto h-full px-8 flex items-center gap-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
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

          {/* Links */}
          <ul
            className="hidden hero:flex items-center gap-6 h-full"
            role="list"
          >
            {/* Platform — dropdown trigger */}
            <li
              className="relative h-full"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                className={`flex h-full items-center gap-1 text-[13px] font-medium transition-colors duration-150 ${open ? "text-[#111318]" : "text-[#4B5563]"} hover:text-[#111318]`}
                aria-expanded={open}
                aria-haspopup="true"
              >
                Platform
                <IcChevron open={open} />
              </button>
            </li>

            {/* Other links */}
            {["Science", "Teams"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-[13px] font-medium text-[#4B5563] hover:text-[#111318] transition-colors duration-150"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/book-demo"
            className="inline-flex items-center justify-center h-9 px-4 rounded-full text-white text-[12px] font-semibold tracking-[0.01em] shadow-[0_1px_8px_rgba(111,191,158,0.32)] hover:opacity-85 hover:-translate-y-px transition-all duration-150"
            style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
          >
            Book a Demo
          </Link>
        </nav>
      </header>

      {/* ── Mega-menu panel ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed left-0 right-0 z-[49]"
            style={{ top: 64 }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="max-w-[1160px] mx-auto px-8">
              <div className="bg-[#f5f5f5] border border-t-0 border-[#E8ECF0] rounded-b-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] px-8 py-7">
                <div className="grid grid-cols-3 gap-10">
                  {MEGA_MENU.map(({ heading, items }) => (
                    <div key={heading}>
                      {/* Column heading */}
                      <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#9CA3AF] mb-4">
                        {heading}
                      </p>

                      {/* Items */}
                      <div className="flex flex-col gap-0.5">
                        {items.map(({ Icon, label, desc }) => (
                          <a
                            key={label}
                            href="#"
                            className="group flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl hover:bg-white transition-colors duration-100"
                          >
                            {/* Icon chip */}
                            <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-white border border-[#E8ECF0] shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#6B7280] group-hover:border-[#C8E6DA] group-hover:text-[#6FBF9E] transition-colors duration-100">
                              <Icon />
                            </div>

                            {/* Text */}
                            <div>
                              <p className="text-[13px] font-semibold text-[#111318] leading-none mb-[3px] group-hover:text-[#6FBF9E] transition-colors duration-100">
                                {label}
                              </p>
                              <p className="text-[11.5px] text-[#9CA3AF] leading-snug">
                                {desc}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
