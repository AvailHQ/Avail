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

  if (!normalizeText(body.name)) errors.name = "Name is required.";

  const email = normalizeText(body.email);
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "A valid email is required.";
  }

  return errors;
}

export function buildDemoRequestRecord(body) {
  return {
    name: normalizeText(body.name),
    email: normalizeText(body.email),
    phone: normalizeText(body.phone),
    createdAt: new Date().toISOString(),
  };
}
