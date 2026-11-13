import { Router } from "express";
import { addTrackingEvent } from "../controllers/trackingHistory.controller.js";

const router = Router();

router.post("/shipment/:id/tracking", addTrackingEvent);
export default router;