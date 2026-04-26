function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

export class AppError extends Error {
  constructor(message, statusCode = 500, errors) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export function validateDemoRequest(body) {
  const errors = {};

  if (!normalizeText(body.firstName)) errors.firstName = "First name is required.";
  if (!normalizeText(body.lastName)) errors.lastName = "Last name is required.";

  const email = normalizeText(body.email);
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "A valid email is required.";
  }

  if (!normalizeText(body.org)) {
    errors.org = "Team or organization is required.";
  }

  if (!normalizeText(body.role)) {
    errors.role = "Role is required.";
  }

  if (body.consent !== true) {
    errors.consent = "Consent is required.";
  }

  return errors;
}

export function buildDemoRequestRecord(body) {
  return {
    firstName: normalizeText(body.firstName),
    lastName: normalizeText(body.lastName),
    email: normalizeText(body.email),
    org: normalizeText(body.org),
    role: normalizeText(body.role),
    level: normalizeText(body.level),
    message: normalizeText(body.message),
    consent: body.consent === true,
    createdAt: new Date().toISOString(),
  };
}
