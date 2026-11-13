import { AppDataSource } from "../config/data-source.js";
import { Package } from "../entities/Package.js";

export type PackageInput = Pick<Package, "weight" | "dimensions" | "contents" | "idWarehouse">;

export class PackageRepository {
    private repository = AppDataSource.getRepository(Package);

    async addWarehousePackage(idShipment: number, item: PackageInput): Promise<Package> {
        const newPackage = this.repository.create({ ...item, idShipment });
        return this.repository.save(newPackage);
    }
}

export const packageRepository = new PackageRepository();
