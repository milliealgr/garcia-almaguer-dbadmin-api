import { AppDataSource } from "../config/data-source.js";
import { DetalleVenta } from "../entities/DetalleVenta.js";

export class DetalleVentaRepository {
    private repository = AppDataSource.getRepository(DetalleVenta);

    async findAll(): Promise<DetalleVenta[]> {
        return await this.repository.find({
            relations: ["venta", "producto", "producto.categoria"]
        });
    }

    async findById(id: number): Promise<DetalleVenta | null> {
        return await this.repository.findOne({
            where: { detalleId: id },
            relations: ["venta", "producto", "producto.categoria"]
        });
    }

    async findByVenta(ventaId: number): Promise<DetalleVenta[]> {
        return await this.repository.find({
            where: { ventaId },
            relations: ["venta", "producto"]
        });
    }

    async findByProducto(productoId: number): Promise<DetalleVenta[]> {
        return await this.repository.find({
            where: { productoId },
            relations: ["venta", "producto"]
        });
    }

    async save(detalleVenta: DetalleVenta): Promise<DetalleVenta> {
        return await this.repository.save(detalleVenta);
    }

    async create(detalleVentaData: Partial<DetalleVenta>): Promise<DetalleVenta> {
        const detalleVenta = this.repository.create(detalleVentaData);
        return await this.repository.save(detalleVenta);
    }

    async update(id: number, detalleVentaData: Partial<DetalleVenta>): Promise<DetalleVenta | null> {
        await this.repository.update(id, detalleVentaData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    async deleteByVenta(ventaId: number): Promise<boolean> {
        const result = await this.repository.delete({ ventaId });
        return result.affected !== 0;
    }
}

export const detalleVentaRepository = new DetalleVentaRepository();
