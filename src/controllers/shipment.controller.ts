import { Request, Response } from "express";
import { shipmentRepository } from "../repositories/ShipmentRepository.js";

export const createShipment = async (req: Request, res: Response) => {
    const { 
        idSender, 
        idRecipient, 
        totalCost,
        packages, 
        date = new Date() 
    } = req.body ?? {};

    if (!Array.isArray(packages) || packages.length === 0) {
        return res.status(400).json({ message: "Provide at least one package" });
    }

    const shipment = await shipmentRepository.createWithPackages({
        idSender, 
        idRecipient, 
        totalCost, 
        date: new Date(date)
    }, packages);

    return res.status(201).json({ message: "Shipment created", status: 201, data: shipment });
};


export const updateShipmentCost = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { totalCost } = req.body ?? {};
    const shipment = await shipmentRepository.updateCost(id, totalCost);
    
    if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
    }

    return res.json({ message: "Shipment cost updated", status: 200, data: shipment });
};


export const getActiveShipments = async (req: Request, res: Response) => {
    const shipments = await shipmentRepository.findActive();
    return res.json({ message: "Active shipments:", status: 200, data: shipments });
};


export const getClientShipments = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const shipments = await shipmentRepository.findByClient(id);
    return res.json({ message: "Client shipments:", status: 200, data: shipments });
};