# Avail

## Run the app

Frontend:

```bash
npm run dev:client
```

Backend:

```bash
npm run dev:server
```

Environment:

```bash
cp .env.example .env
```

The Vite dev server proxies `/api` requests to `http://localhost:3001`, so the
waitlist form will submit directly to the Express backend during local
development.

## API

`POST /api/demo-requests`

Example payload:

```json
{
  "name": "Sarah Robertson",
  "email": "sarah@club.com",
  "phone": "+44 7700 900123"
}
```

## Backend Structure

- `server/config/env.js`: loads and normalizes environment variables
- `server/routes/demoRequestRoutes.js`: API route definitions
- `server/controllers/demoRequestController.js`: request handler for waitlist submissions
- `server/services/demoRequestService.js`: orchestration for validation, Sheets, and emails
- `server/services/googleSheetsService.js`: appends each request into Google Sheets
- `server/services/emailService.js`: sends the requester confirmation email and the internal team notification email
- `server/utils/demoRequest.js`: validation, normalization, and request shaping
- `server/middleware/cors.js`: CORS handling
- `server/middleware/errorHandler.js`: shared API error responses

## Required Environment Variables

- `GOOGLE_SHEETS_SPREADSHEET_ID`: target spreadsheet ID
- `GOOGLE_SHEETS_SHEET_NAME`: sheet tab name, defaults to `Demo Requests`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Google service account email
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: private key for the service account
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASS`: SMTP settings
- `MAIL_FROM`: sender shown on outgoing emails
- `MAIL_REPLY_TO`: optional reply-to address
- `TEAM_NOTIFICATION_EMAILS`: comma-separated team inbox addresses

## Flow

1. Frontend submits the form to `POST /api/demo-requests`
2. Backend validates and normalizes the payload
3. Backend syncs the Google Sheet headers and appends the request
4. Backend sends a confirmation email to the requester
5. Backend sends a notification email to your team
