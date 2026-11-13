import { AppDataSource } from "../config/data-source.js";
import { TrackingHistory } from "../entities/TrackingHistory.js";

export class TrackingHistoryRepository {
    private repository = AppDataSource.getRepository(TrackingHistory);

    async findAll(): Promise<TrackingHistory[]> {
        return await this.repository.find({
            relations: ["shipment"]
        });
    }

    async findById(id: number): Promise<TrackingHistory | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ["shipment"]
        });
    }

    async save(trackingHistory: TrackingHistory): Promise<TrackingHistory> {
        return await this.repository.save(trackingHistory);
    }

    async create(trackingHistoryData: Partial<TrackingHistory>): Promise<TrackingHistory> {
        const trackingHistory = this.repository.create(trackingHistoryData);
        return await this.repository.save(trackingHistory);
    }

    async update(id: number, trackingHistoryData: Partial<TrackingHistory>): Promise<TrackingHistory | null> {
        await this.repository.update(id, trackingHistoryData);
        return await this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected === 1;
    }
}

export const trackingHistoryRepository = new TrackingHistoryRepository();
