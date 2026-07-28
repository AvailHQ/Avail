import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  writeCookieConsent,
} from "../lib/cookieConsent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const savedConsent = readCookieConsent();

    if (savedConsent) {
      setAnalyticsEnabled(savedConsent.analytics);
      return;
    }

    setIsVisible(true);
  }, []);

  useEffect(() => {
    const openSettings = () => {
      const savedConsent = readCookieConsent();
      setAnalyticsEnabled(savedConsent?.analytics ?? false);
      setIsManaging(true);
      setIsVisible(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);

    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, []);

  const saveChoice = (analytics: boolean) => {
    writeCookieConsent(analytics);
    setAnalyticsEnabled(analytics);
    setIsVisible(false);
    setIsManaging(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto w-[calc(100%-2rem)] max-w-[1120px] rounded-[14px] border border-[#DDE5EA] bg-white p-5 shadow-[0_22px_70px_rgba(15,23,42,0.18)] hero:bottom-6 hero:px-7 hero:py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
        >
          <div className="flex flex-col gap-5 hero:flex-row hero:items-center hero:gap-10">
            <div className="min-w-0 flex-1">
              <p
                id="cookie-consent-title"
                className="text-fluid-lg font-bold tracking-[-0.02em] text-[#111318]"
              >
                Cookies and site behaviour analytics
              </p>
              <p className="mt-2 max-w-[640px] text-fluid-sm leading-[1.6] text-[#5F6B7A]">
                We use essential cookies to keep this site working. With your
                permission, we may use analytics to understand page views,
                scroll depth, and interactions.{" "}
                <Link
                  to="/privacy#cookies-analytics"
                  className="font-semibold text-[#2E6E8E] underline decoration-[#4FA3C7]/45 underline-offset-4 hover:text-[#4FA3C7]"
                >
                  Read the Privacy Policy
                </Link>
              </p>

              {isManaging && (
                <div className="mt-4 max-w-[640px] rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFB] p-4">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(event) =>
                        setAnalyticsEnabled(event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-[#4FA3C7]"
                    />
                    <span>
                      <span className="block text-fluid-sm font-bold text-[#111318]">
                        Analytics and behaviour measurement
                      </span>
                      <span className="mt-1 block text-fluid-sm leading-[1.6] text-[#64748B]">
                        Helps Avail understand how visitors use the website.
                        Optional and off unless you allow it.
                      </span>
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-2.5 hero:flex-row hero:items-center">
              {isManaging ? (
                <button
                  type="button"
                  onClick={() => saveChoice(analyticsEnabled)}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-[#111318] px-6 text-fluid-sm font-bold text-white transition-colors duration-150 hover:bg-[#2A3038]"
                >
                  Save preferences
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsManaging(true)}
                    className="order-3 inline-flex h-11 items-center justify-center px-2 text-fluid-sm font-semibold text-[#2E6E8E] transition-colors duration-150 hover:text-[#4FA3C7] hero:order-1"
                  >
                    Manage preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => saveChoice(false)}
                    className="order-2 inline-flex h-11 items-center justify-center rounded-lg border border-[#D8DEE6] bg-white px-6 text-fluid-sm font-bold text-[#111318] transition-colors duration-150 hover:bg-[#F7F8F8]"
                  >
                    Reject non-essential
                  </button>
                  <button
                    type="button"
                    onClick={() => saveChoice(true)}
                    style={{
                      background: "linear-gradient(45deg, #6FBF9E, #4FA3C7)",
                    }}
                    className="order-1 inline-flex h-11 items-center justify-center rounded-lg px-6 text-fluid-sm font-bold text-white transition-all duration-150 hover:-translate-y-[1.5px] active:translate-y-0 hero:order-3"
                  >
                    Accept all
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
