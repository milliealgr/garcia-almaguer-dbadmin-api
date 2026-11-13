import type { ErrorRequestHandler } from "express";
import { QueryFailedError } from "typeorm";

export const warehouseCapacityError: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof QueryFailedError && error.driverError.sqlState === "45000") {
        return res.status(400).json({ message: "Warehouse is full" });
    }
    next(error);
};
