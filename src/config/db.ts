import { AppDataSource } from "./data-source.js";

export const connectDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log('¡Successfully connected to the logiexpress_db database!');
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};
