import {
  appendDemoRequestRow,
  getDemoRequestCount,
  updateDemoRequestEmailStatus,
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

function getEmailErrorMessage(error) {
  if (!error) {
    return "";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function sendDemoRequestEmails(record) {
  const [submitterResult, teamResult] = await Promise.allSettled([
    sendEmail(buildSubmitterConfirmationEmail(record)),
    sendEmail(buildTeamNotificationEmail(record)),
  ]);

  const failures = [];

  if (submitterResult.status === "rejected") {
    failures.push(`submitter: ${getEmailErrorMessage(submitterResult.reason)}`);
  }

  if (teamResult.status === "rejected") {
    failures.push(`team: ${getEmailErrorMessage(teamResult.reason)}`);
  }

  return {
    submitter: submitterResult.status === "fulfilled" ? "Sent" : "Failed",
    team: teamResult.status === "fulfilled" ? "Sent" : "Failed",
    errorMessage: failures.join(" | "),
  };
}

export async function createDemoRequest(payload) {
  const errors = validateDemoRequest(payload);

  if (Object.keys(errors).length > 0) {
    throw new AppError("Please correct the highlighted fields.", 400, errors);
  }

  const record = buildDemoRequestRecord(payload);

  const appendedRow = await appendDemoRequestRow(record);
  const emailStatus = await sendDemoRequestEmails(record);

  if (emailStatus.errorMessage) {
    console.error("Demo request email failure", {
      record,
      emailStatus,
    });
  }

  await updateDemoRequestEmailStatus(appendedRow.rowNumber, emailStatus);

  return { record, emailStatus };
}

export async function getDemoRequestStats() {
  const waitlistCount = await getDemoRequestCount();

  return { waitlistCount };
}
