export const COOKIE_SETTINGS_EVENT = "avail:open-cookie-settings";
export const COOKIE_CONSENT_CHANGED_EVENT = "avail:cookie-consent-changed";

const STORAGE_KEY = "avail_cookie_consent_v1";

export type CookieConsentState = {
  analytics: boolean;
  decidedAt: string;
  version: 1;
};

export function readCookieConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookieConsentState) : null;
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  return readCookieConsent()?.analytics === true;
}

export function writeCookieConsent(analytics: boolean) {
  const consent: CookieConsentState = {
    analytics,
    decidedAt: new Date().toISOString(),
    version: 1,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: consent }),
  );

  return consent;
}
