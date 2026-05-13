import {
  createDemoRequest,
  getDemoRequestStats as getDemoRequestStatsService,
} from "../services/demoRequestService.js";

export async function getDemoRequestStats(_req, res, next) {
  try {
    const stats = await getDemoRequestStatsService();

    res.json(stats);
  } catch (error) {
    next(error);
  }
}

export async function submitDemoRequest(req, res, next) {
  try {
    const result = await createDemoRequest(req.body ?? {});

    res.status(201).json({
      message: "Waitlist request received.",
      request: result.record,
    });
  } catch (error) {
    next(error);
  }
}
