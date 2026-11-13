import { AppDataSource } from "../config/data-source.js";
import { Warehouse } from "../entities/Warehouse.js";

export class WarehouseRepository {
    private repository = AppDataSource.getRepository(Warehouse);

    async findAll(): Promise<Warehouse[]> {
        return await this.repository.find({
            relations: ["packages"]
        });
    }

    async findById(id: number): Promise<Warehouse | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["packages"]
        });
    }

    async save(warehouse: Warehouse): Promise<Warehouse> {
        return await this.repository.save(warehouse);
    }

    async create(warehouseData: Partial<Warehouse>): Promise<Warehouse> {
        const warehouse = this.repository.create(warehouseData);
        return await this.repository.save(warehouse);
    }

    async update(id: number, warehouseData: Partial<Warehouse>): Promise<Warehouse | null> {
        await this.repository.update(id, warehouseData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}

export const warehouseRepository = new WarehouseRepository();
