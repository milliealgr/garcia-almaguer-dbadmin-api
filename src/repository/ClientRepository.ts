import { AppDataSource } from "../config/data-source.js";
import { Client } from "../entities/Client.js";

export class ClientRepository {
    private repository = AppDataSource.getRepository(Client);

    async findAll(): Promise<Client[]> {
        return await this.repository.find({
            relations: ["addresses"]
        });
    }

    async findById(id: number): Promise<Client | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["addresses"]
        });
    }

    async save(client: Client): Promise<Client> {
        return await this.repository.save(client);
    }

    async create(clientData: Partial<Client>): Promise<Client> {
        const client = this.repository.create(clientData);
        return await this.repository.save(client);
    }

    async update(id: number, clientData: Partial<Client>): Promise<Client | null> {
        await this.repository.update(id, clientData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}

export const clientRepository = new ClientRepository();
