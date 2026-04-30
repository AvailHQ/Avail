import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { submitDemoRequest } from "../lib/api";

const ROLES = ["Coach", "Performance Staff", "Sports Scientist", "Other"];
const TEAM_LEVELS = ["Elite", "Academy", "Other"];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  org: string;
  role: string;
  level: string;
  message: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

interface FieldStyle {
  border: string;
  boxShadow: string;
}

const BASE =
  "w-full bg-white text-fluid-base text-[#111318] placeholder-[#B0B8C4] rounded-lg outline-none transition-all duration-150";

function useField(): {
  borderStyle: FieldStyle;
  onFocus: () => void;
  onBlur: () => void;
} {
  const [focused, setFocused] = useState(false);
  return {
    borderStyle: {
      border: focused ? "1px solid #74C7A7" : "1px solid #E5E7EB",
      boxShadow: focused ? "0 0 0 3px rgba(116,199,167,0.10)" : "none",
    },
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
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}) {
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

function Select({
  label,
  error,
  options,
  value,
  onChange,
  placeholder,
  name,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}) {
  const f = useField();
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-fluid-sm font-medium text-[#374151]">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={f.onFocus}
          onBlur={f.onBlur}
          className={`${BASE} h-[42px] pl-[14px] pr-10 appearance-none cursor-pointer wide:h-[50px] wide:pl-4`}
          style={{ ...f.borderStyle, color: value ? "#111318" : "#B0B8C4" }}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} style={{ color: "#111318" }}>
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 12"
          fill="none"
          className="absolute right-3 top-1/2 h-[10px] w-[10px] -translate-y-1/2 pointer-events-none"
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
      {error && <p className="text-fluid-xs text-red-400">{error}</p>}
    </div>
  );
}

function Textarea({
  label,
  placeholder,
  value,
  onChange,
  name,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const f = useField();
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-fluid-sm font-medium text-[#374151]">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        onFocus={f.onFocus}
        onBlur={f.onBlur}
        className={`${BASE} resize-none px-[14px] py-[10px] leading-[1.65] wide:px-4 wide:py-3`}
        style={f.borderStyle}
      />
    </div>
  );
}

export default function WaitlistFormPanel() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    org: "",
    role: "",
    level: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;

    const timeout = window.setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [navigate, submitted]);

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((current) => ({
        ...current,
        [key]:
          e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value,
      }));

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Required";
    if (!form.lastName.trim()) nextErrors.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Valid email required";
    }
    if (!form.org.trim()) nextErrors.org = "Required";
    if (!form.role) nextErrors.role = "Please select a role";
    if (!form.consent) nextErrors.consent = "Please agree to continue";
    return nextErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitDemoRequest(form);
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

      if (fieldErrors) setErrors(fieldErrors);
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-[620px] flex-col items-center rounded-2xl bg-white p-10 text-center shadow-[0_1px_16px_rgba(0,0,0,0.06)]"
        style={{ border: "1px solid #E5E7EB" }}
      >
        <div
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(116,199,167,0.10)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <path
              d="M5 12l5 5L19 7"
              stroke="#74C7A7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-fluid-2xl font-bold tracking-[-0.02em] text-[#111318]">
          Request received
        </h2>
        <p className="max-w-[320px] text-fluid-md leading-[1.72] text-[#6B7280]">
          We’ll be in touch with next steps for the AVAIL waitlist at{" "}
          <span className="font-medium text-[#111318]">{form.email}</span>.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex max-w-[620px] flex-col gap-5 rounded-2xl border border-gray-200 bg-white/90 p-9 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur wide:max-w-[760px] wide:gap-6 wide:p-11"
      style={{
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div className="mb-1">
        <h2 className="mb-1 text-fluid-xl font-bold tracking-[-0.02em] text-[#111318]">
          Join waitlist
        </h2>
        <p className="text-fluid-base leading-[1.65] text-[#6B7280]">
          Share a few details and we’ll add your team to the AVAIL waitlist.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-fluid-sm text-red-700">
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-[5px]">
        <label className="flex cursor-pointer items-start gap-3">
          <div className="relative mt-[1px]">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={set("consent")}
              className="peer sr-only"
            />
            <div
              className="flex h-[16px] w-[16px] flex-shrink-0 items-center justify-center rounded-[4px] border transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-[#74C7A7]/30"
              style={{
                background: form.consent ? "#74C7A7" : "#fff",
                borderColor: form.consent ? "#74C7A7" : "#D1D5DB",
              }}
            >
              {form.consent && (
                <svg viewBox="0 0 10 10" fill="none" className="h-[9px] w-[9px]" aria-hidden="true">
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
          <span className="text-fluid-sm leading-[1.5] text-[#6B7280]">
            I agree to be contacted about AVAIL
          </span>
        </label>
        {errors.consent && (
          <p className="pl-7 text-fluid-xs text-red-400">{errors.consent}</p>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-[44px] w-full rounded-lg bg-gradient-to-br from-[#6FBF9E] to-[#4FA3C7] text-fluid-md font-semibold tracking-[-0.01em] text-white opacity-70 transition-all duration-150 hover:-translate-y-[1.5px] hover:opacity-100 active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:opacity-70 wide:h-[52px]"
          style={{
            boxShadow: "0 2px 12px rgba(116,199,167,0.35)",
            cursor: isSubmitting ? "wait" : "pointer",
          }}
        >
          {isSubmitting ? "Submitting..." : "Join waitlist"}
        </button>
        <p className="text-center text-fluid-xs text-[#9CA3AF]">
          We typically respond within 24 hours.
        </p>
      </div>
    </motion.form>
  );
}
