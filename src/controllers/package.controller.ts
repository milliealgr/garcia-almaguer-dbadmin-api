import { Request, Response } from "express";
import { packageRepository } from "../repositories/PackageRepository.js";

export const addWarehousePackage = async (req: Request, res: Response) => {
    const { 
        idShipment, 
        weight, 
        dimensions, 
        contents 
    } = req.body ?? {};
    const item = { idWarehouse: Number(req.params.id), weight, dimensions, contents };
    
    if (!Number.isInteger(idShipment) || idShipment <= 0) {
        return res.status(400).json({ message: "Not a valid shipment" });
    }

    const savedPackage = await packageRepository.addWarehousePackage(idShipment, item);
    return res.status(201).json({ message: "Package added", status: 201, data: savedPackage });
};
