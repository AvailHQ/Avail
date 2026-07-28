import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CONTACT_EMAIL = "myl520667@gmail.com";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
};

const TABLE_OF_CONTENTS = [
  { label: "General", id: "general" },
  { label: "Avail's role", id: "avails-role" },
  {
    label: "Information Avail collects and how Avail uses it",
    id: "information-collected",
  },
  { label: "Sharing of personal data", id: "sharing" },
  { label: "International data transfer", id: "international-transfer" },
  { label: "Retention of personal data", id: "retention" },
  { label: "Security of personal data", id: "security" },
  { label: "Your personal data rights", id: "rights" },
  { label: "Medical and welfare boundary", id: "medical-boundary" },
  { label: "Applicable law and contact", id: "law-contact" },
];

const POLICY_SECTIONS = [
  {
    heading: "1. General",
    id: "general",
    paragraphs: [
      "1.1 This Privacy Policy explains how personal information is protected, stored and used when someone visits the Avail website, joins the waitlist, communicates with Avail, or participates in an Avail pilot programme.",
      "1.2 Avail is built to provide pre-session physiological context for women's sport. Because that context may involve sensitive athlete information, privacy is part of the product architecture and not an afterthought.",
      "1.3 Avail is designed with UK GDPR and GDPR principles in mind, including transparency, purpose limitation, data minimisation, access restriction, consent control, storage limitation, and accountability.",
      "1.4 This policy should be read together with any pilot agreement, consent notice, athlete onboarding materials, and product terms that apply to the relevant Avail service.",
      "1.5 Avail may update this Privacy Policy from time to time. When changes are made, the last updated date above will be revised.",
    ],
  },
  {
    heading: "2. Avail's role",
    id: "avails-role",
    paragraphs: [
      "2.1 Avail's core principle is that athlete data belongs to the athlete. Consent should happen directly between Avail and the athlete, not through the club.",
      "2.2 Avail is designed to give coaches useful training context without exposing raw cycle data, health information, or private athlete notes unless the athlete has explicitly agreed to a specific form of sharing.",
      "2.3 This direct athlete consent architecture is intended to reduce coercive consent risk in club and employment-like environments, which is especially important under UK GDPR when special category data may be involved.",
      "2.4 Where Avail works with a club, the club may receive structured coach-facing outputs such as Load Score, load direction, confidence level, squad trends, and coaching decision logs.",
    ],
  },
  {
    heading: "3. Information Avail collects and how Avail uses it",
    id: "information-collected",
    paragraphs: [
      "3.1 Avail may collect account and contact information, including name, email address, team or club information, and messages sent to Avail.",
      "3.2 Avail may collect athlete self-report information, including sleep quality, fatigue, muscle soreness, mental readiness, period start or end taps, session outcome feedback, and other check-in responses.",
      "3.3 Avail may collect onboarding context where voluntarily provided, including training background, injury context, contraception category, diagnosed conditions, nutrition or energy availability signals, and other information used to personalise the Load Score.",
      "3.4 If an athlete connects a wearable or third-party service, Avail may collect authorised signals such as HRV, sleep, skin temperature, recovery, readiness, or strain data, depending on the integration.",
      "3.5 Avail uses this information to generate physiological context, personalise each athlete's Load Score over time, improve athlete-facing feedback, support pre-session load decisions, and understand availability patterns during a pilot.",
    ],
  },
  {
    heading: "4. Sharing of personal data",
    id: "sharing",
    paragraphs: [
      "4.1 Coaches and performance staff receive structured outputs only. They do not automatically receive raw period logs, contraception details, diagnosed conditions, mental readiness notes, detailed wearable records, or sensitive athlete profile information.",
      "4.2 If an athlete does not share data, the coach-facing dashboard should show that data is unavailable or not shared. Opt-out should not be presented as a compliance failure.",
      "4.3 Identifiable individual athlete data is not sold. Aggregated and anonymised data may be used to improve model quality, understand population-level patterns, and support research-grade insight.",
      "4.4 Avail may share personal information with service providers that help operate the website, waitlist, communications, infrastructure, analytics, security, and product services, where appropriate safeguards are in place.",
    ],
  },
  {
    heading: "5. International data transfer",
    id: "international-transfer",
    paragraphs: [
      "5.1 Avail aims to use UK or EU data residency for production athlete data. Where personal data is transferred internationally, Avail should use appropriate safeguards required by UK GDPR, GDPR, or other applicable data protection law.",
      "5.2 Wearable providers, infrastructure providers, email providers, analytics tools, or other service providers may process information in different locations depending on their own systems and contractual terms.",
    ],
  },
  {
    heading: "6. Retention of personal data",
    id: "retention",
    paragraphs: [
      "6.1 Avail should retain personal data only for as long as needed for the website, waitlist, pilot programme, product operation, legal obligations, security, and legitimate product improvement.",
      "6.2 Where data has been anonymised and aggregated so it no longer identifies an individual, it may not be possible to remove one person's contribution from that aggregate record.",
      "6.3 Athletes and users may request access, correction, or deletion where legally applicable by contacting Avail.",
    ],
  },
  {
    heading: "7. Security of personal data",
    id: "security",
    paragraphs: [
      "7.1 Avail aims to protect sensitive data through encrypted transmission, encrypted storage, role-based access control, audit logging, and separation between athlete health data and coach-facing outputs.",
      "7.2 Avail's product architecture should validate consent before data access, record access events, and limit sensitive information to authorised users and systems.",
      "7.3 Before production athlete data is processed, Avail should complete appropriate legal, privacy, and security review.",
    ],
  },
  {
    heading: "8. Your personal data rights",
    id: "rights",
    paragraphs: [
      "8.1 Depending on applicable law, including UK GDPR or GDPR where relevant, individuals may have rights to access, correct, delete, restrict, object to, or receive a copy of their personal data.",
      "8.2 These rights may include the right to be informed about how personal data is used, the right of access, the right to rectification, the right to erasure, the right to restrict processing, the right to data portability, and the right to object to certain processing.",
      "8.3 Athletes should be able to change or withdraw consent. Different data types may have different sharing permissions.",
      "8.4 Where processing relies on consent, withdrawing consent should not affect processing that happened lawfully before withdrawal.",
      "8.5 Privacy requests can be sent to Avail using the contact details at the end of this policy.",
    ],
  },
  {
    heading: "9. Medical and welfare boundary",
    id: "medical-boundary",
    paragraphs: [
      "9.1 Avail does not diagnose, treat, prescribe, or replace professional medical advice. The Load Score is physiological context for human decision-making, not a medical instruction.",
      "9.2 Avail may identify patterns that suggest an athlete could benefit from a welfare or medical conversation. These patterns are not diagnoses.",
      "9.3 Where welfare-related prompts are used, the athlete should be prompted first. Sensitive reasons should not be automatically shown to the coach. Any medical or welfare routing should follow consent, protocol, and professional review.",
    ],
  },
  {
    heading: "10. Applicable law and contact",
    id: "law-contact",
    paragraphs: [
      "10.1 This policy is written for Avail's current UK-focused website, waitlist, and pilot planning context. It is intended to reflect UK GDPR and GDPR principles, but it should be reviewed by a GDPR specialist before production athlete data is processed.",
      "10.2 For privacy questions, data requests, or concerns, contact Avail at ",
    ],
  },
];

export default function PrivacyPage() {
  const [activeSectionId, setActiveSectionId] = useState(
    TABLE_OF_CONTENTS[0].id,
  );

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      const fixedHeader =
        document.querySelector("header.fixed") ?? document.querySelector("header");
      const headerBottom = fixedHeader?.getBoundingClientRect().bottom ?? 0;
      const activationLine = headerBottom + 16;
      let nextActiveId = TABLE_OF_CONTENTS[0].id;

      const isNearPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 24;

      if (isNearPageBottom) {
        setActiveSectionId(TABLE_OF_CONTENTS[TABLE_OF_CONTENTS.length - 1].id);
        return;
      }

      for (const item of TABLE_OF_CONTENTS) {
        const section = document.getElementById(item.id);
        const heading = document.getElementById(`${item.id}-heading`);

        if (!section || !heading) continue;

        const sectionRect = section.getBoundingClientRect();

        if (
          sectionRect.top <= activationLine &&
          sectionRect.bottom > activationLine
        ) {
          nextActiveId = item.id;
          break;
        }

        if (heading.getBoundingClientRect().top <= activationLine) {
          nextActiveId = item.id;
        }
      }

      setActiveSectionId(nextActiveId);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <main className="bg-[#F7F8F8] text-[#273142]">
      <section
        className="px-6 pb-24 pt-20 hero:pt-32 wide:pb-32"
        aria-labelledby="privacy-page-title"
      >
        <div className="mx-auto grid max-w-[1180px] gap-12 hero:grid-cols-[minmax(0,1fr)_320px] hero:gap-16 wide:max-w-[1560px] wide:grid-cols-[minmax(0,1040px)_360px] wide:gap-24">
          <motion.article {...fadeIn} className="min-w-0">
            <header className="mb-14 hero:mb-16">
              <h1
                id="privacy-page-title"
                className="text-fluid-4xl font-bold leading-[1.08] tracking-[-0.035em] text-[#2D3748]"
              >
                Privacy Policy
              </h1>
              <p className="mt-8 max-w-[1020px] text-fluid-xl italic leading-[1.72] text-[#344056]">
                This Privacy Policy describes the personal information Avail
                collects and processes from website visitors, clubs, athletes,
                coaches, and users of its services. It also explains how Avail
                approaches athlete consent, coach visibility, model learning,
                and sensitive physiological data.
              </p>
              <p className="mt-8 text-fluid-lg italic leading-[1.65] text-[#344056]">
                Last updated 28 July 2026
              </p>
            </header>

            <div className="space-y-14 hero:space-y-16">
              {POLICY_SECTIONS.map((section) => (
                <section
                  key={section.heading}
                  id={section.id}
                  className="scroll-mt-28"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <h2
                    id={`${section.id}-heading`}
                    className="mb-6 text-fluid-3xl font-bold leading-[1.15] tracking-[-0.035em] text-[#2D3748]"
                  >
                    {section.heading}
                  </h2>
                  <div className="space-y-6">
                    {section.paragraphs.map((paragraph, index) => (
                      <p
                        key={`${section.id}-${index}`}
                        className="max-w-[1060px] text-fluid-lg leading-[1.78] text-[#334155]"
                      >
                        {section.id === "law-contact" && index === 1 ? (
                          <>
                            {paragraph}
                            <a
                              href={`mailto:${CONTACT_EMAIL}`}
                              className="font-semibold text-[#2E6E8E] underline decoration-[#4FA3C7]/45 underline-offset-4 transition-colors duration-150 hover:text-[#4FA3C7]"
                            >
                              {CONTACT_EMAIL}
                            </a>
                            .
                          </>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </motion.article>

          <motion.aside
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.08 }}
            className="hero:sticky hero:top-28 hero:self-start"
          >
            <nav
              aria-label="Privacy policy table of contents"
              className="rounded-[8px] border border-[#E2E8F0] bg-white p-8 shadow-[0_12px_36px_rgba(15,23,42,0.035)]"
            >
              <h2 className="mb-8 text-fluid-xl font-bold leading-[1.2] tracking-[-0.02em] text-[#2D3748]">
                Table of contents
              </h2>
              <ol className="space-y-5">
                {TABLE_OF_CONTENTS.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`block border-l-2 py-1 pl-5 text-fluid-base font-semibold leading-[1.45] transition-colors duration-150 ${
                        activeSectionId === item.id
                          ? "border-[#4FA3C7] text-[#4FA3C7]"
                          : "border-transparent text-[#111827] hover:border-[#A9D8CC] hover:text-[#2E6E8E]"
                      }`}
                      aria-current={
                        activeSectionId === item.id ? "true" : undefined
                      }
                    >
                      {index + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
