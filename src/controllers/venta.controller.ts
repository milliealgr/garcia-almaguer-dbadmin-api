import { Request, Response } from 'express';
import { ventaRepository } from "../repository/VentaRepository.js";
import { Venta } from "../entities/Venta.js";

export const getVenta = async (req: Request, res: Response) => {
    const venta: Venta | null = await ventaRepository.findById(Number(req.params.id));
    if (!venta) {
        return res.status(404).json({ message: "Venta no encontrada" });
    }

    return res.json({ 
        message: "Venta encontrada",
            status: 200,
            data: venta 
    });
}

export const getVentas = async (req: Request, res: Response) => {
    const ventas: Venta[] = await ventaRepository.findAll();
    
    return res.json({ 
        message: "Ventas encontradas",
        status: 200,
        data: ventas
    });
}

export const createVenta = async (req: Request, res: Response) => {
    const {cliente, total} = req.body;
    const venta = await ventaRepository.create( {cliente, total} );
        
    return res.json({ 
        message: "Venta creada",
        status: 201,
        data : venta
    });
}

export const updateVenta = async (req: Request, res: Response) => {
    const venta: Venta | null = await ventaRepository.findById(Number(req.params.id));
    if (!venta) {
        return res.status(404).json({ message: "Venta no encontrada" });
    }

    const { cliente, total } = req.body;
    const ventaActualizada = await ventaRepository.update(
        venta.ventaId, { cliente, total }
    );

    return res.json({
        message: "Venta modificada",
        status: 200,
        data: ventaActualizada
    });
}

export const deleteVenta = async (req: Request, res: Response) => {
    const venta: Venta | null = await ventaRepository.findById(Number(req.params.id));
    if (!venta) {
        return res.status(404).json({ message: "Venta no encontrada" });
    }

    await ventaRepository.delete(venta.ventaId);
    
    return res.json({
        message: "Venta eliminada",
        status: 200
    });
}