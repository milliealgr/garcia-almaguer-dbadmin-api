import { Request, Response } from "express";
import { productoRepository } from '../repository/ProductoRepository.js'
import { Producto } from '../entities/Producto.js'

export const getProducto = async (req: Request, res: Response) => {
    const producto: Producto | null = await productoRepository.findById(Number(req.params.id));
    if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json({ 
        message: "Producto encontrado",
        status: 200,
        data: producto 
    });
}

export const getProductos = async (req: Request, res: Response) => {
    const productos: Producto[] = await productoRepository.findAll();
    return res.json({ 
        message: "Productos encontrados",
        status: 200,
        data: productos
     });
}

export const createProducto = async (req: Request, res: Response) => {
    const {nombre, precio, stock, categoriaId} = req.body;
    
    const producto = await productoRepository.create(
        {nombre, precio, stock, categoriaId}
    )
    
    return res.json({ 
        message: "Producto creado",
        status: 201,
        data : producto
    });
}

export const updateProducto = async (req: Request, res: Response) => {
    const producto: Producto | null = await productoRepository.findById(Number(req.params.id));
    if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    const { nombre, precio, stock, categoriaId } = req.body;
    const productoActualizado = await productoRepository.update(
        producto.productoId, { nombre, precio, stock, categoriaId }
    );

    return res.json({
        message: "Producto modificado",
        status: 200,
        data: productoActualizado
    });
}

export const deleteProducto = async (req: Request, res: Response) => {
    const producto: Producto | null = await productoRepository.findById(Number(req.params.id));
    if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    if (producto.detallesVenta.length > 0) {
        return res.status(409).json({ message: "El producto está registrado en ventas" });
    }
    
    await productoRepository.delete(producto.productoId);
        
    return res.json({
        message: "Producto eliminado",
        status: 200
    });
}