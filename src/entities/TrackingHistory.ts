import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Shipment } from "./Shipment.js";

@Entity("tracking_history")
export class TrackingHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "datetime" })
    date!: Date;

    @Column({ type: "varchar", length: 255 })
    currentLocation!: string;

    @Column({ type: "varchar", length: 255 })
    eventState!: string;

    @Column({ type: "varchar", length: 255 })
    remarks!: string;

    @Column({ type: "int" })
    idShipment!: number;

    @ManyToOne(() => Shipment, (row) => row.trackingHistory, { nullable: false })
    @JoinColumn({ name: "idShipment" })
    shipment!: Relation<Shipment>;
}
