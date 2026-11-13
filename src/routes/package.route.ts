import { Router } from "express";
import { addWarehousePackage } from "../controllers/package.controller.js";
import { warehouseCapacityError } from "./warehouseCapacityError.js";

const router = Router();

router.post("/warehouse/:id/package", addWarehousePackage, warehouseCapacityError);
export default router;