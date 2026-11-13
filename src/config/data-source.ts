import "reflect-metadata";
import { DataSource } from "typeorm";
import { Client } from "../entities/Client.js";
import { Address } from "../entities/Address.js";
import { Shipment } from "../entities/Shipment.js";
import { Warehouse } from "../entities/Warehouse.js";
import { Package } from "../entities/Package.js";
import { TrackingHistory } from "../entities/TrackingHistory.js";
import { ShipmentAudit } from "../entities/ShipmentAudit.js";

export const AppDataSource = new DataSource({
    type: "mysql", 
    host: "localhost",
    port: 3315,
    username: "root",
    password: "secret",
    database: "logiexpress_db",
    synchronize: false, 
    logging: true,
    entities: [Client, Address, Shipment, Warehouse, Package, TrackingHistory, ShipmentAudit],
    subscribers: [],
    migrations: [],
});
