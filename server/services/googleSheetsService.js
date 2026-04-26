import { google } from "googleapis";
import { env } from "../config/env.js";
import { AppError } from "../utils/demoRequest.js";

let sheetsClient;

function getSheetsClient() {
  if (sheetsClient) {
    return sheetsClient;
  }

  if (
    !env.googleSheetsSpreadsheetId ||
    !env.googleServiceAccountEmail ||
    !env.googleServiceAccountPrivateKey
  ) {
    throw new AppError(
      "Google Sheets is not configured. Please check the Google service account environment variables.",
      500,
    );
  }

  const auth = new google.auth.JWT({
    email: env.googleServiceAccountEmail,
    key: env.googleServiceAccountPrivateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsClient = google.sheets({
    version: "v4",
    auth,
  });

  return sheetsClient;
}

export async function appendDemoRequestRow(record) {
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: env.googleSheetsSpreadsheetId,
    range: `${env.googleSheetsSheetName}!A:I`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          record.createdAt,
          record.firstName,
          record.lastName,
          record.email,
          record.org,
          record.role,
          record.level,
          record.message,
          record.consent ? "Yes" : "No",
        ],
      ],
    },
  });
}
