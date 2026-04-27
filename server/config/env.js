import dotenv from "dotenv";

dotenv.config({ quiet: true });

function required(name, fallback = "") {
  return process.env[name] ?? fallback;
}

function normalizePrivateKey(value) {
  const trimmed = value.trim().replace(/^['"]|['"]$/g, "");
  return trimmed.replace(/\\n/g, "\n").replace(/\\r/g, "\r").trim();
}

export const env = {
  port: Number(process.env.PORT) || 3001,
  clientOrigin: process.env.CLIENT_ORIGIN || "",
  googleSheetsSpreadsheetId: required("GOOGLE_SHEETS_SPREADSHEET_ID"),
  googleSheetsSheetName:
    process.env.GOOGLE_SHEETS_SHEET_NAME || "Demo Requests",
  googleServiceAccountEmail: required("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
  googleServiceAccountPrivateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    ? normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)
    : "",
  mailHost: required("MAIL_HOST"),
  mailPort: Number(process.env.MAIL_PORT) || 587,
  mailSecure: process.env.MAIL_SECURE === "true",
  mailUser: required("MAIL_USER"),
  mailPass: required("MAIL_PASS"),
  mailFrom: required("MAIL_FROM"),
  mailReplyTo: process.env.MAIL_REPLY_TO || "",
  teamNotificationEmails: (process.env.TEAM_NOTIFICATION_EMAILS || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean),
};

// Optional startup warning
if (!env.teamNotificationEmails.length) {
  console.warn("Warning: No team notification emails configured.");
}
