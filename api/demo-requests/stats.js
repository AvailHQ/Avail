import { getDemoRequestStats } from "../../server/services/demoRequestService.js";
import { AppError } from "../../server/utils/demoRequest.js";

export default async function handler(req, res) {
  res.setHeader("Allow", "GET");

  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method not allowed.",
    });
  }

  try {
    const stats = await getDemoRequestStats();

    return res.status(200).json(stats);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode ?? 500).json({
        message: error.message,
        errors: error.errors ?? undefined,
      });
    }

    console.error("Unhandled demo request stats error", error);

    return res.status(500).json({
      message: "Something went wrong while loading waitlist stats.",
    });
  }
}
