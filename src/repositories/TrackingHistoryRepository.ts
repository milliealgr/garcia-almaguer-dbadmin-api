import { AppDataSource } from "../config/data-source.js";
import { TrackingHistory } from "../entities/TrackingHistory.js";

export class TrackingHistoryRepository {
    private repository = AppDataSource.getRepository(TrackingHistory);

    async create(trackingHistoryData: Partial<TrackingHistory>): Promise<TrackingHistory> {
        const trackingHistory = this.repository.create(trackingHistoryData);
        return await this.repository.save(trackingHistory);
    }
}

export const trackingHistoryRepository = new TrackingHistoryRepository();
