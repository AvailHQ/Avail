import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { submitDemoRequest } from "../lib/api";

interface FormState {
  name: string;
  email: string;
  phone: string;
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

export default function WaitlistFormPanel() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
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
        [key]: e.target.value,
      }));

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Valid email required";
    }
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
