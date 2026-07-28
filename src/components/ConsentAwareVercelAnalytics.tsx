import { useEffect, useState } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  hasAnalyticsConsent,
} from "../lib/cookieConsent";

function beforeSend(event: BeforeSendEvent) {
  return hasAnalyticsConsent() ? event : null;
}

export default function ConsentAwareVercelAnalytics() {
  const [canLoadAnalytics, setCanLoadAnalytics] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setCanLoadAnalytics(hasAnalyticsConsent());
    };

    syncConsent();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, syncConsent);
    };
  }, []);

  return canLoadAnalytics ? <Analytics beforeSend={beforeSend} /> : null;
}
