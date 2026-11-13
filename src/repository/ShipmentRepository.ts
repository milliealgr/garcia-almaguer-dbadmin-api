import { AppDataSource } from "../config/data-source.js";
import { Shipment } from "../entities/Shipment.js";

export class ShipmentRepository {
    private repository = AppDataSource.getRepository(Shipment);

    async findAll(): Promise<Shipment[]> {
        return await this.repository.find({
            relations: ["sender", "recipient", "packages"],
            order: { date: "DESC", id: "DESC" }
        });
    }

    async findById(id: number): Promise<Shipment | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["sender", "recipient", "packages"]
        });
    }

    async findActive(): Promise<Shipment[]> {
        return await this.repository.find({
            where: [{ state: "registered" }, { state: "in_transit" }],
            relations: ["sender", "recipient", "packages"],
            order: { date: "DESC", id: "DESC" }
        });
    }

    async findByClient(idClient: number): Promise<Shipment[]> {
        return await this.repository.find({
            where: [{ idSender: idClient }, { idRecipient: idClient }],
            relations: ["sender", "recipient", "packages"],
            order: { date: "DESC", id: "DESC" }
        });
    }

    async save(shipment: Shipment): Promise<Shipment> {
        return await this.repository.save(shipment);
    }

    async create(shipmentData: Partial<Shipment>): Promise<Shipment> {
        const shipment = this.repository.create(shipmentData);
        return await this.repository.save(shipment);
    }

    async update(id: number, shipmentData: Partial<Shipment>): Promise<Shipment | null> {
        await this.repository.update(id, shipmentData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}

export const shipmentRepository = new ShipmentRepository();
