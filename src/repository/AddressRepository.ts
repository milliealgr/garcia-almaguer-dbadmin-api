import { AppDataSource } from "../config/data-source.js";
import { Address } from "../entities/Address.js";

export class AddressRepository {
    private repository = AppDataSource.getRepository(Address);

    async findAll(): Promise<Address[]> {
        return await this.repository.find({
            relations: ["client"]
        });
    }

    async findById(id: number): Promise<Address | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["client"]
        });
    }

    async save(address: Address): Promise<Address> {
        return await this.repository.save(address);
    }

    async create(addressData: Partial<Address>): Promise<Address> {
        const address = this.repository.create(addressData);
        return await this.repository.save(address);
    }

    async update(id: number, addressData: Partial<Address>): Promise<Address | null> {
        await this.repository.update(id, addressData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}

export const addressRepository = new AddressRepository();
