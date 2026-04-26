import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

// ─── Field options ────────────────────────────────────────────────────────────
const ROLES = ["Coach", "Performance Staff", "Sports Scientist", "Other"];
const TEAM_LEVELS = ["Elite", "Academy", "Other"];

// ─── Right-side value propositions ───────────────────────────────────────────
const VALUES = [
  {
    Icon: () => (
      <svg
        viewBox="0 0 22 22"
        fill="none"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="6"
          width="5"
          height="10"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="8.5"
          y="3"
          width="5"
          height="16"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="15"
          y="8"
          width="5"
          height="6"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7 11h1.5M13.5 11H15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "See how AVAIL fits your workflow",
    desc: "Understand how Load Score, athlete inputs, and recommendations work in real training environments.",
  },
  {
    Icon: () => (
      <svg
        viewBox="0 0 22 22"
        fill="none"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <circle
          cx="11"
          cy="11"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M7.5 11l2.5 2.5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Validate the pilot opportunity",
    desc: "Explore whether your team is suitable for a 4–6 month pilot programme.",
  },
  {
    Icon: () => (
      <svg
        viewBox="0 0 22 22"
        fill="none"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path
          d="M11 2L3.5 5.5v6c0 4.5 3.2 7.8 7.5 8.5 4.3-.7 7.5-4 7.5-8.5v-6L11 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 11l2 2 3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Protect athlete data from day one",
    desc: "Coaches see decision-ready insights, not raw sensitive cycle data.",
  },
  {
    Icon: () => <TrendingUp className="w-5 h-5" aria-hidden="true" />,
    title: "Improve athlete availability",
    desc: "Reduce over- and under-loading by aligning training decisions with physiological readiness.",
  },
];

// ─── Shared input styles ──────────────────────────────────────────────────────
const BASE =
  "w-full bg-white text-[13.5px] text-[#111318] placeholder-[#B0B8C4] rounded-lg outline-none transition-all duration-150";

function useField() {
  const [focused, setFocused] = useState(false);
  const borderStyle = {
    border: focused ? "1px solid #74C7A7" : "1px solid #E5E7EB",
    boxShadow: focused ? "0 0 0 3px rgba(116,199,167,0.10)" : "none",
  };
  return {
    focused,
    borderStyle,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
}

function Input({
  label,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  const f = useField();
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-[12px] font-medium text-[#374151]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...f}
        className={`${BASE} h-[42px] px-[14px]`}
        style={f.borderStyle}
      />
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function Select({ label, error, options, value, onChange, placeholder, name }) {
  const f = useField();
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-[12px] font-medium text-[#374151]">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          {...f}
          className={`${BASE} h-[42px] pl-[14px] pr-10 appearance-none cursor-pointer`}
          style={{ ...f.borderStyle, color: value ? "#111318" : "#B0B8C4" }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} style={{ color: "#111318" }}>
              {o}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-[10px] h-[10px] pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="#9CA3AF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
  );
}

function Textarea({ label, placeholder, value, onChange, name }) {
  const f = useField();
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-[12px] font-medium text-[#374151]">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        {...f}
        className={`${BASE} px-[14px] py-[10px] resize-none leading-[1.65]`}
        style={f.borderStyle}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BookDemoPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    org: "",
    role: "",
    level: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({
      ...f,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.org.trim()) e.org = "Required";
    if (!form.role) e.role = "Please select a role";
    if (!form.consent) e.consent = "Please agree to continue";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen pt-24 pb-28 px-6 relative"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 20%, #ffffff 0%, #F8F8F6 100%)",
      }}
    >
      {/* Dot grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="demoGrid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.85" fill="rgba(0,0,0,0.05)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#demoGrid)" />
      </svg>

      <div className="relative z-10 max-w-[1020px] mx-auto">
        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#74C7A7] mb-3">
            Pilot Programme
          </p>
          <h1
            className="font-bold tracking-[-0.035em] text-[#111318] leading-[1.1] mb-3"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            Book a Demo
          </h1>
          <p className="text-[15px] text-[#6B7280] leading-[1.65] max-w-[420px] mx-auto">
            30 minutes. No slides. Just a live walkthrough built around your
            team.
          </p>
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start ">
          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.06,
            }}
          >
            {submitted ? (
              <div
                className="bg-white rounded-2xl p-10 flex flex-col items-center text-center"
                style={{
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(116,199,167,0.10)" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-7 h-7"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12l5 5L19 7"
                      stroke="#74C7A7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className="text-[20px] font-bold text-[#111318] tracking-[-0.02em] mb-2">
                  Request received
                </h2>
                <p className="text-[14px] leading-[1.72] text-[#6B7280] max-w-[300px]">
                  We'll be in touch within 24 hours to confirm your demo time at{" "}
                  <span className="text-[#111318] font-medium">
                    {form.email}
                  </span>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl p-9 flex flex-col gap-5 border border-gray-200 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-m"
                style={{
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
                }}
              >
                {/* Title inside card */}
                <div className="mb-1">
                  <h2 className="text-[18px] font-bold text-[#111318] tracking-[-0.02em] mb-1">
                    Book a Demo
                  </h2>
                  <p className="text-[13px] leading-[1.65] text-[#6B7280]">
                    Tell us about your team and we'll show how AVAIL can support
                    daily load decisions.
                  </p>
                </div>

                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    placeholder="Sarah"
                    value={form.firstName}
                    onChange={set("firstName")}
                    error={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    placeholder="Robertson"
                    value={form.lastName}
                    onChange={set("lastName")}
                    error={errors.lastName}
                  />
                </div>

                <Input
                  label="Work Email"
                  name="email"
                  type="email"
                  placeholder="sarah@club.com"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                />

                <Input
                  label="Team / Organization"
                  name="org"
                  placeholder="Manchester City FC"
                  value={form.org}
                  onChange={set("org")}
                  error={errors.org}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Role"
                    name="role"
                    options={ROLES}
                    value={form.role}
                    onChange={set("role")}
                    placeholder="Select role"
                    error={errors.role}
                  />
                  <Select
                    label="Team Level"
                    name="level"
                    options={TEAM_LEVELS}
                    value={form.level}
                    onChange={set("level")}
                    placeholder="Select level"
                  />
                </div>

                <Textarea
                  label="Message"
                  name="message"
                  placeholder="What are you looking to explore?"
                  value={form.message}
                  onChange={set("message")}
                />

                {/* Consent */}
                <div className="flex flex-col gap-[5px]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-[1px]">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={form.consent}
                        onChange={set("consent")}
                        className="sr-only peer"
                      />
                      <div
                        className="w-[16px] h-[16px] rounded-[4px] border flex items-center justify-center flex-shrink-0 transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-[#74C7A7]/30"
                        style={{
                          background: form.consent ? "#74C7A7" : "#fff",
                          borderColor: form.consent ? "#74C7A7" : "#D1D5DB",
                        }}
                      >
                        {form.consent && (
                          <svg
                            viewBox="0 0 10 10"
                            fill="none"
                            className="w-[9px] h-[9px]"
                            aria-hidden="true"
                          >
                            <path
                              d="M1.5 5l2.5 2.5 5-5"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-[12.5px] text-[#6B7280] leading-[1.5]">
                      I agree to be contacted about AVAIL
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-[11px] text-red-400 pl-7">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="submit"
                    className="w-full opacity-70 h-[44px] rounded-lg text-white text-[14px] font-semibold tracking-[-0.01em] transition-all bg-gradient-to-br from-[#6FBF9E] to-[#4FA3C7] duration-150 hover:-translate-y-[1.5px] active:translate-y-0"
                    style={{
                      boxShadow: "0 2px 12px rgba(116,199,167,0.35)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(116,199,167,0.45)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 12px rgba(116,199,167,0.35)";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    Book Demo
                  </button>
                  <p className="text-center text-[11.5px] text-[#9CA3AF]">
                    We typically respond within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── RIGHT: Value props ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.14,
            }}
            className="flex flex-col gap-0 relative"
          >
            {/* Subtle green glow */}
            <div
              className="absolute -inset-8 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 40%, rgba(116,199,167,0.09) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col divide-y divide-[#F0F2F5]">
              {VALUES.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.22 + i * 0.09,
                  }}
                  className="flex gap-5 py-8 first:pt-2"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-[2px]"
                    style={{
                      background: "rgba(116,199,167,0.10)",
                      color: "#74C7A7",
                    }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <p className="text-[14.5px] font-semibold text-[#111318] tracking-[-0.01em] mb-[6px]">
                      {title}
                    </p>
                    <p className="text-[13px] text-[#6B7280] leading-[1.7]">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              <section className="py-8 text-center">
                <div className="flex items-center w-full mb-6">
                  <p className="text-sm text-gray-400 uppercase tracking-wider text-center pr-3">
                    Validated By
                  </p>
                  <p className="w-[70%] h-px bg-black opacity-20"></p>
                </div>

                <div className="flex justify-center gap-10 opacity-50">
                  <div className="text-gray-400">Women's Football Club</div>
                  <div className="text-gray-400">Elite Academy</div>
                  <div className="text-gray-400">Performance Team</div>
                </div>
              </section>
            </div>

            {/* Footer note */}
            <div className="mt-6 flex items-start gap-3 px-1">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="w-4 h-4 flex-shrink-0 mt-[1px] text-[#74C7A7]"
                aria-hidden="true"
              >
                <path
                  d="M8 1.5L1.5 4v5c0 3.5 2.8 6.2 6.5 7 3.7-.8 6.5-3.5 6.5-7V4L8 1.5z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.5 8l2 2 3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-[12px] text-[#9CA3AF] leading-[1.65]">
                Athlete data is never exposed to coaching staff. AVAIL is not a
                medical tool and does not replace clinical judgment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
