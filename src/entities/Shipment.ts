import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Client } from "./Client.js";
import { Package } from "./Package.js";
import { ShipmentAudit } from "./ShipmentAudit.js";
import { TrackingHistory } from "./TrackingHistory.js";

@Entity("shipment")
export class Shipment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int" })
    idSender!: number;

    @Column({ type: "int" })
    idRecipient!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    totalCost!: string;

    @Column({ type: "datetime" })
    date!: Date;

    @Column({ type: "varchar", length: 20 })
    state!: "registered" | "in_transit" | "delivered" | "canceled";

    @ManyToOne(() => Client, (row) => row.sentShipments, { nullable: false })
    @JoinColumn({ name: "idSender" })
    sender!: Relation<Client>;

    @ManyToOne(() => Client, (row) => row.receivedShipments, { nullable: false })
    @JoinColumn({ name: "idRecipient" })
    recipient!: Relation<Client>;

    @OneToMany(() => Package, (row) => row.shipment, { cascade: ["insert"] })
    packages!: Relation<Package[]>;

    @OneToMany(() => TrackingHistory, (row) => row.shipment)
    trackingHistory!: Relation<TrackingHistory[]>;

    @OneToMany(() => ShipmentAudit, (row) => row.shipment)
    auditEntries!: Relation<ShipmentAudit[]>;
}
