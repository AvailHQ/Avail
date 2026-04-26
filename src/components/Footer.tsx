import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Social icons (SVG only — links are in the bottom bar) ────────────────
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconEmail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

// ─── Link columns ──────────────────────────────────────────────────────────
const COLUMNS = [
  {
    heading: "Platform",
    links: ["Overview", "How it works", "Pricing"],
  },
  {
    heading: "Company",
    links: ["About", "Team", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "Case Studies", "FAQ", "Blog"],
  },
  {
    heading: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookies"],
  },
];

// ─── Footer ────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer>
      <div className="bg-[#f5f5f5]">
        {/* ── Main body ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1160px] mx-auto px-8 pt-16 pb-12 grid grid-cols-1 hero:grid-cols-5 gap-12"
        >
          {/* ── Brand column ── */}
          <div className="hero:col-span-1 flex flex-col gap-6">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2"
              aria-label="Avail home"
            >
              <img
                src="/figure/logo.svg"
                alt=""
                className="h-8 w-auto"
                aria-hidden="true"
              />
              <span className="text-[#111318] text-[17px] font-bold tracking-[-0.04em]">
                Avail
              </span>
            </a>

            {/* Tagline */}
            <p className="text-[13px] leading-[1.65] text-[#6B7280] max-w-[200px]">
              Cycle-aware load intelligence for elite women's sport.
            </p>

            {/* CTA */}
            <Link
              to="/join-pilot-programme"
              className="inline-flex items-center justify-center self-start h-9 px-4 rounded-full text-white text-[12px] font-semibold tracking-[0.01em] shadow-[0_2px_12px_rgba(111,191,158,0.3)] hover:opacity-85 hover:-translate-y-px transition-all duration-150"
              style={{ background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)" }}
            >
              Join Pilot Programme
            </Link>
          </div>

          {/* ── Link columns ── */}
          <div className="hero:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLUMNS.map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF] mb-1">
                  {heading}
                </p>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[13px] font-medium text-[#6B7280] hover:text-[#111318] transition-colors duration-150 leading-snug"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom bar ────────────────────────────────── */}
        <div
          className="max-w-[1160px] mx-auto px-8 py-5 flex flex-col hero:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid #E8ECF0" }}
        >
          <p className="text-[12px] text-[#9CA3AF] font-medium">
            © 2026 Avail. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
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
      </div>
    </footer>
  );
}
