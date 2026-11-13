import { AppDataSource } from "../config/data-source.js";
import { ShipmentAudit } from "../entities/ShipmentAudit.js";

export class ShipmentAuditRepository {
    private repository = AppDataSource.getRepository(ShipmentAudit);

    async findAll(): Promise<ShipmentAudit[]> {
        return await this.repository.find({
            relations: ["shipment"]
        });
    }

    async findById(id: number): Promise<ShipmentAudit | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["shipment"]
        });
    }

    async save(shipmentAudit: ShipmentAudit): Promise<ShipmentAudit> {
        return await this.repository.save(shipmentAudit);
    }

    async create(shipmentAuditData: Partial<ShipmentAudit>): Promise<ShipmentAudit> {
        const shipmentAudit = this.repository.create(shipmentAuditData);
        return await this.repository.save(shipmentAudit);
    }

    async update(id: number, shipmentAuditData: Partial<ShipmentAudit>): Promise<ShipmentAudit | null> {
        await this.repository.update(id, shipmentAuditData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}

export const shipmentAuditRepository = new ShipmentAuditRepository();
