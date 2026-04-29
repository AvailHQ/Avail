import {
  appendDemoRequestRow,
  getDemoRequestCount,
} from "./googleSheetsService.js";
import {
  buildSubmitterConfirmationEmail,
  buildTeamNotificationEmail,
  sendEmail,
} from "./emailService.js";
import {
  AppError,
  buildDemoRequestRecord,
  validateDemoRequest,
} from "../utils/demoRequest.js";

export async function createDemoRequest(payload) {
  const errors = validateDemoRequest(payload);

  if (Object.keys(errors).length > 0) {
    throw new AppError("Please correct the highlighted fields.", 400, errors);
  }

  const record = buildDemoRequestRecord(payload);

  await appendDemoRequestRow(record);

  await Promise.all([
    sendEmail(buildSubmitterConfirmationEmail(record)),
    sendEmail(buildTeamNotificationEmail(record)),
  ]);

  return { record };
}

export async function getDemoRequestStats() {
  const waitlistCount = await getDemoRequestCount();

  return { waitlistCount };
}
