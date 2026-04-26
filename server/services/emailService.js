import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { AppError } from "../utils/demoRequest.js";

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  if (
    !env.mailHost ||
    !env.mailPort ||
    !env.mailUser ||
    !env.mailPass ||
    !env.mailFrom ||
    env.teamNotificationEmails.length === 0
  ) {
    throw new AppError(
      "Email service is not configured. Please check the mail environment variables.",
      500,
    );
  }

  transporter = nodemailer.createTransport({
    host: env.mailHost,
    port: env.mailPort,
    secure: env.mailSecure,
    auth: {
      user: env.mailUser,
      pass: env.mailPass,
    },
  });

  return transporter;
}

function greetingName(record) {
  return [record.firstName, record.lastName].filter(Boolean).join(" ");
}

export function buildSubmitterConfirmationEmail(record) {
  const name = greetingName(record) || "there";

  return {
    to: record.email,
    subject: "We received your AVAIL demo request",
    text: [
      `Hi ${name},`,
      "",
      "Thanks for requesting a demo of AVAIL.",
      "We've received your request and our team will review it shortly.",
      "",
      "Your submission details:",
      `- Team / Organization: ${record.org}`,
      `- Role: ${record.role}`,
      `- Team Level: ${record.level || "Not provided"}`,
      `- Message: ${record.message || "Not provided"}`,
      "",
      "We typically reply within 24 hours to confirm next steps.",
      "",
      "Best,",
      "AVAIL Team",
    ].join("\n"),
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for requesting a demo of AVAIL.</p>
      <p>We've received your request and our team will review it shortly.</p>
      <p><strong>Your submission details</strong></p>
      <ul>
        <li>Team / Organization: ${record.org}</li>
        <li>Role: ${record.role}</li>
        <li>Team Level: ${record.level || "Not provided"}</li>
        <li>Message: ${record.message || "Not provided"}</li>
      </ul>
      <p>We typically reply within 24 hours to confirm next steps.</p>
      <p>Best,<br />AVAIL Team</p>
    `,
  };
}

export function buildTeamNotificationEmail(record) {
  return {
    to: env.teamNotificationEmails,
    subject: `New AVAIL demo request from ${record.firstName} ${record.lastName}`.trim(),
    text: [
      "A new demo request was submitted.",
      "",
      `Submitted at: ${record.createdAt}`,
      `First Name: ${record.firstName}`,
      `Last Name: ${record.lastName}`,
      `Email: ${record.email}`,
      `Team / Organization: ${record.org}`,
      `Role: ${record.role}`,
      `Team Level: ${record.level || "Not provided"}`,
      `Message: ${record.message || "Not provided"}`,
      `Consent: ${record.consent ? "Yes" : "No"}`,
    ].join("\n"),
    html: `
      <p>A new demo request was submitted.</p>
      <table cellpadding="6" cellspacing="0" border="0">
        <tr><td><strong>Submitted at</strong></td><td>${record.createdAt}</td></tr>
        <tr><td><strong>First Name</strong></td><td>${record.firstName}</td></tr>
        <tr><td><strong>Last Name</strong></td><td>${record.lastName}</td></tr>
        <tr><td><strong>Email</strong></td><td>${record.email}</td></tr>
        <tr><td><strong>Team / Organization</strong></td><td>${record.org}</td></tr>
        <tr><td><strong>Role</strong></td><td>${record.role}</td></tr>
        <tr><td><strong>Team Level</strong></td><td>${record.level || "Not provided"}</td></tr>
        <tr><td><strong>Message</strong></td><td>${record.message || "Not provided"}</td></tr>
        <tr><td><strong>Consent</strong></td><td>${record.consent ? "Yes" : "No"}</td></tr>
      </table>
    `,
  };
}

export async function sendEmail({ to, subject, text, html }) {
  const mailer = getTransporter();

  await mailer.sendMail({
    from: env.mailFrom,
    to,
    replyTo: env.mailReplyTo || undefined,
    subject,
    text,
    html,
  });
}
