import { Request, Response } from "express";
import { trackingHistoryRepository } from "../repositories/TrackingHistoryRepository.js";

export const addTrackingEvent = async (req: Request, res: Response) => {
    const idShipment = Number(req.params.id);
    const { 
        currentLocation, 
        eventState, 
        remarks, 
        date = new Date() 
    } = req.body ?? {};

    if (!currentLocation || !eventState || remarks == null) {
        return res.status(400).json({ message: "Provide a location, event state and remarks" });
    }

    const event = await trackingHistoryRepository.create({
        idShipment, 
        currentLocation, 
        eventState, 
        remarks, 
        date: new Date(date)
    });
    
    return res.status(201).json({ message: "Tracking event added", status: 201, data: event });
};
