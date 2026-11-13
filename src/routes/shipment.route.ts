import { Router } from "express";
import { createShipment, updateShipmentCost, getActiveShipments, getClientShipments } from "../controllers/shipment.controller.js";
import { warehouseCapacityError } from "./warehouseCapacityError.js";

const router = Router();

router.post("/shipment", createShipment, warehouseCapacityError);
router.put("/shipment/:id/cost", updateShipmentCost);
router.get("/shipments", getActiveShipments);

router.get("/client/:id/shipments", getClientShipments);

export default router;
