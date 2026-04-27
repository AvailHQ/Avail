import { createDemoRequest } from "../server/services/demoRequestService.js";
import { AppError } from "../server/utils/demoRequest.js";

export default async function handler(req, res) {
  res.setHeader("Allow", "POST");

  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  try {
    const result = await createDemoRequest(req.body ?? {});

    return res.status(201).json({
      message: "Demo request received.",
      request: result.record,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode ?? 500).json({
        message: error.message,
        errors: error.errors ?? undefined,
      });
    }

    console.error("Unhandled demo request error", error);

    return res.status(500).json({
      message: "Something went wrong while submitting your request.",
    });
  }
}
