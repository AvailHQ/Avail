import { createDemoRequest } from "../services/demoRequestService.js";

export async function submitDemoRequest(req, res, next) {
  try {
    const result = await createDemoRequest(req.body ?? {});

    res.status(201).json({
      message: "Demo request received.",
      request: result.record,
    });
  } catch (error) {
    next(error);
  }
}
