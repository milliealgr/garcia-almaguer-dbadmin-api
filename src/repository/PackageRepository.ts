import { AppDataSource } from "../config/data-source.js";
import { Package } from "../entities/Package.js";

export class PackageRepository {
    private repository = AppDataSource.getRepository(Package);

    async findAll(): Promise<Package[]> {
        return await this.repository.find({
            relations: ["shipment", "warehouse"]
        });
    }

    async findById(id: number): Promise<Package | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["shipment", "warehouse"]
        });
    }

    async save(packageEntity: Package): Promise<Package> {
        return await this.repository.save(packageEntity);
    }

    async create(packageData: Partial<Package>): Promise<Package> {
        const packageEntity = this.repository.create(packageData);
        return await this.repository.save(packageEntity);
    }

    async update(id: number, packageData: Partial<Package>): Promise<Package | null> {
        await this.repository.update(id, packageData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}

export const packageRepository = new PackageRepository();
