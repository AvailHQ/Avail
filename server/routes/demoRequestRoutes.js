import { Router } from "express";
import {
  getDemoRequestStats,
  submitDemoRequest,
} from "../controllers/demoRequestController.js";

const router = Router();

router.get("/stats", getDemoRequestStats);
router.post("/", submitDemoRequest);

export default router;
