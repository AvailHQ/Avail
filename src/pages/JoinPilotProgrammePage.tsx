import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { getDemoRequestStats, submitDemoRequest } from "../lib/api";

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
    title: "Join the waitlist",
    desc: "Let us know about your team and we’ll keep you updated on access.",
  },
  {
    Icon: () => <TrendingUp className="w-5 h-5" aria-hidden="true" />,
    title: "Improve athlete availability",
    desc: "Reduce over- and under-loading by aligning training decisions with physiological readiness.",
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

interface FieldStyle {
  border: string;
  boxShadow: string;
}

// ─── Shared input styles ──────────────────────────────────────────────────────
const BASE =
  "w-full bg-white text-fluid-base text-[#111318] placeholder-[#B0B8C4] rounded-lg outline-none transition-all duration-150";

function useField(): {
  focused: boolean;
  borderStyle: FieldStyle;
  onFocus: () => void;
  onBlur: () => void;
} {
  const [focused, setFocused] = useState(false);
  const borderStyle: FieldStyle = {
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
}: InputProps) {
  const f = useField();
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-fluid-sm font-medium text-[#374151]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={f.onFocus}
        onBlur={f.onBlur}
        className={`${BASE} h-[42px] px-[14px] wide:h-[50px] wide:px-4`}
        style={f.borderStyle}
      />
      {error && <p className="text-fluid-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JoinPilotProgrammePage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    getDemoRequestStats()
      .then(({ waitlistCount }) => {
        if (!cancelled) {
          setWaitlistCount(waitlistCount);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setWaitlistCount(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const set =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({
        ...f,
        [k]: e.target.value,
      }));

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitDemoRequest(form);
      setWaitlistCount((count) => (count === null ? count : count + 1));
      setSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your request.";
      const fieldErrors =
        error && typeof error === "object" && "fieldErrors" in error
          ? (error.fieldErrors as FormErrors | undefined)
          : undefined;

      if (fieldErrors) {
        setErrors(fieldErrors);
      }

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-h-screen pt-24 pb-28 px-6 relative wide:pt-28 wide:pb-32"
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

      <div className="relative z-10 max-w-[1020px] mx-auto wide:max-w-[1440px]">
        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 wide:mb-16"
        >
          <p className="text-fluid-xs font-semibold tracking-[0.14em] uppercase text-[#74C7A7] mb-3">
            Waitlist
          </p>
          <h1
            className="font-bold tracking-[-0.035em] text-[#111318] leading-[1.1] mb-3 text-fluid-4xl"
          >
            Join waitlist
          </h1>
          <p className="text-fluid-lg text-[#6B7280] leading-[1.65] max-w-[420px] mx-auto wide:max-w-[560px]">
            Tell us about your team and we’ll let you know when AVAIL opens to
            teams like yours.
          </p>
          {waitlistCount !== null && waitlistCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D8EFE5] bg-white/75 px-4 py-2 text-fluid-sm font-medium text-[#536171] shadow-[0_8px_28px_rgba(15,23,42,0.04)] backdrop-blur"
            >
              <Users
                className="h-[14px] w-[14px] text-[#74C7A7]"
                aria-hidden="true"
              />
              <span>
                <span className="font-semibold text-[#111318]">
                  {waitlistCount.toLocaleString()}
                </span>{" "}
                {waitlistCount === 1 ? "team has" : "teams have"} joined the
                waitlist so far
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start wide:grid-cols-[1fr_520px] wide:gap-14">
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
                <h2 className="text-fluid-2xl font-bold text-[#111318] tracking-[-0.02em] mb-2">
                  Request received
                </h2>
                <p className="text-fluid-md leading-[1.72] text-[#6B7280] max-w-[300px]">
                  We’ll be in touch with next steps for the AVAIL waitlist at{" "}
                  <span className="text-[#111318] font-medium">
                    {form.email}
                  </span>
                  .
                </p>
                <Link
                  to="/"
                  className="mt-7 inline-flex items-center justify-center h-[42px] px-6 rounded-lg text-white text-fluid-md font-semibold tracking-[-0.01em] bg-gradient-to-br from-[#6FBF9E] to-[#4FA3C7] transition-all duration-150 hover:-translate-y-[1.5px] active:translate-y-0"
                  style={{
                    boxShadow: "0 2px 12px rgba(116,199,167,0.35)",
                  }}
                >
                  Back
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-2xl p-9 flex flex-col gap-5 border border-gray-200 bg-white/90 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-m wide:p-11 wide:gap-6"
                style={{
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
                }}
              >
                {/* Title inside card */}
                <div className="mb-1">
                  <h2 className="text-fluid-xl font-bold text-[#111318] tracking-[-0.02em] mb-1">
                    Join waitlist
                  </h2>
                  <p className="text-fluid-base leading-[1.65] text-[#6B7280]">
                    Share your details and we’ll add you to the AVAIL waitlist.
                  </p>
                </div>

                <Input
                  label="Name"
                  name="name"
                  placeholder="Sarah Robertson"
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="sarah@club.com"
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                />

                <Input
                  label="Phone number (optional)"
                  name="phone"
                  type="tel"
                  placeholder="+44 7700 900123"
                  value={form.phone}
                  onChange={set("phone")}
                  error={errors.phone}
                />

                {submitError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-fluid-sm text-red-700">
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full opacity-70 h-[44px] rounded-lg text-white text-fluid-md font-semibold tracking-[-0.01em] transition-all bg-gradient-to-br from-[#6FBF9E] to-[#4FA3C7] duration-150 hover:-translate-y-[1.5px] active:translate-y-0 wide:h-[52px]"
                    style={{
                      boxShadow: "0 2px 12px rgba(116,199,167,0.35)",
                      cursor: isSubmitting ? "wait" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (isSubmitting) return;
                      e.currentTarget.style.boxShadow =
                        "0 4px 20px rgba(116,199,167,0.45)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      if (isSubmitting) return;
                      e.currentTarget.style.boxShadow =
                        "0 2px 12px rgba(116,199,167,0.35)";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Join waitlist"}
                  </button>
                  <p className="text-center text-fluid-xs text-[#9CA3AF]">
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
                  className="flex gap-5 py-8 first:pt-2 wide:gap-6 wide:py-9"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-[2px] wide:h-12 wide:w-12"
                    style={{
                      background: "rgba(116,199,167,0.10)",
                      color: "#74C7A7",
                    }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <p className="text-fluid-md font-semibold text-[#111318] tracking-[-0.01em] mb-[6px]">
                      {title}
                    </p>
                    <p className="text-fluid-base text-[#6B7280] leading-[1.7]">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              {false && (
                <section className="py-8 text-center">
                  <div className="flex items-center w-full mb-6">
                    <p className="text-fluid-sm text-gray-400 uppercase tracking-wider text-center pr-3">
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
              )}
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
              <p className="text-fluid-sm text-[#9CA3AF] leading-[1.65]">
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
