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
  return record.name;
}

export function buildSubmitterConfirmationEmail(record) {
  const name = greetingName(record) || "there";

  return {
    to: record.email,
    subject: "We received your AVAIL waitlist request",
    text: [
      `Hi ${name},`,
      "",
      "Thanks for joining the AVAIL waitlist.",
      "We've received your request and our team will review it shortly.",
      "",
      "Your submission details:",
      `- Name: ${record.name}`,
      `- Email: ${record.email}`,
      `- Phone: ${record.phone || "Not provided"}`,
      "",
      "We typically reply within 24 hours to confirm next steps.",
      "",
      "Best,",
      "AVAIL Team",
    ].join("\n"),
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for joining the AVAIL waitlist.</p>
      <p>We've received your request and our team will review it shortly.</p>
      <p><strong>Your submission details</strong></p>
      <ul>
        <li>Name: ${record.name}</li>
        <li>Email: ${record.email}</li>
        <li>Phone: ${record.phone || "Not provided"}</li>
      </ul>
      <p>We typically reply within 24 hours to confirm next steps.</p>
      <p>Best,<br />AVAIL Team</p>
    `,
  };
}

export function buildTeamNotificationEmail(record) {
  return {
    to: env.teamNotificationEmails,
    subject: `New AVAIL waitlist request from ${record.name}`.trim(),
    text: [
      "A new waitlist request was submitted.",
      "",
      `Submitted at: ${record.createdAt}`,
      `Name: ${record.name}`,
      `Email: ${record.email}`,
      `Phone: ${record.phone || "Not provided"}`,
    ].join("\n"),
    html: `
      <p>A new waitlist request was submitted.</p>
      <table cellpadding="6" cellspacing="0" border="0">
        <tr><td><strong>Submitted at</strong></td><td>${record.createdAt}</td></tr>
        <tr><td><strong>Name</strong></td><td>${record.name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${record.email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${record.phone || "Not provided"}</td></tr>
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
