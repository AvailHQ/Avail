import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Social icons ──────────────────────────────────────────────────────────
const IconLinkedIn = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconInstagram = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconEmail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

// ─── Nav links ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Overview", to: "/" },
  { label: "How it works", to: "/how-it-works" },
  { label: "Contact", href: "mailto:miaoyulun380@gmail.com" },
];

// ─── Footer ────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[1160px] px-8 pt-12 pb-0 wide:max-w-[1560px]"
      >
        {/* ── Brand ─────────────────────────────────────────── */}
        <div className="flex items-center gap-6 pb-4">
          <a
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Avail home"
          >
            <img
              src="/figure/logo.svg"
              alt=""
              className="h-7 w-auto"
              aria-hidden="true"
            />
            <span className="text-[#111318] text-fluid-lg font-bold tracking-[-0.04em]">
              Avail
            </span>
          </a>

          <p className="text-fluid-sm leading-[1.65] text-[#6B7280]">
            Pre-session physiological intelligence for elite women's sport.
          </p>
        </div>

        {/* ── Nav links — horizontal row ─────────────────────── */}
        <nav
          aria-label="Footer navigation"
          className="pt-4"
          style={{ borderTop: "1px solid #E8ECF0" }}
        >
          <ul className="flex flex-row flex-wrap items-center gap-y-3">
            {NAV_LINKS.map(({ label, to, href }, i) => (
              <li key={label} className="flex items-center">
                {i > 0 && (
                  <span
                    className="mx-6 h-3 w-px bg-[#D1D5DB]"
                    aria-hidden="true"
                  />
                )}
                {to ? (
                  <Link
                    to={to}
                    className="text-fluid-sm font-medium text-[#6B7280] hover:text-[#111318] transition-colors duration-150"
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="text-fluid-sm font-medium text-[#6B7280] hover:text-[#111318] transition-colors duration-150"
                  >
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className="py-4 flex flex-col hero:flex-row items-center justify-between gap-3">
          <p className="text-fluid-xs text-[#9CA3AF] font-medium">
            © 2026 Avail. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Avail on LinkedIn"
              className="text-[#9CA3AF] hover:text-[#111318] transition-colors duration-150"
            >
              <IconLinkedIn />
            </a>
            <a
              href="https://www.instagram.com/avail.io?igsh=MWptZHpuNmc4dWV1MQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Avail on Instagram"
              className="text-[#9CA3AF] hover:text-[#111318] transition-colors duration-150"
            >
              <IconInstagram />
            </a>
            <a
              href="mailto:miaoyulun380@gmail.com"
              aria-label="Email Avail"
              className="text-[#9CA3AF] hover:text-[#111318] transition-colors duration-150"
            >
              <IconEmail />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
