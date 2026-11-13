import { AppDataSource } from "../config/data-source.js";
import { Shipment } from "../entities/Shipment.js";
import type { PackageInput } from "./PackageRepository.js";

export class ShipmentRepository {
    private repository = AppDataSource.getRepository(Shipment);

    async createWithPackages(
        data: Pick<Shipment, "idSender" | "idRecipient" | "totalCost" | "date">,
        packages: PackageInput[]
    ): Promise<Shipment> {
        const shipment = this.repository.create({
            ...data,
            state: "registered",
            packages: 
                packages.map(({ weight, dimensions, contents, idWarehouse }) => ({
                weight, dimensions, contents, idWarehouse
            }))
        });
        return this.repository.save(shipment);
    }


    async updateCost(id: number, totalCost: string): Promise<Shipment | null> {
        await this.repository.update(id, { totalCost });
        return this.repository.findOneBy({ id });
    }


    async findActive(): Promise<Shipment[]> {
        return this.repository.find({
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
}

export const shipmentRepository = new ShipmentRepository();
