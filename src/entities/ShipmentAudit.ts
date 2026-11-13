import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Relation } from "typeorm";
import { Shipment } from "./Shipment.js";

@Entity("shipment_audit")
export class ShipmentAudit {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    previousCost!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    newCost!: string;

    @Column({ type: "varchar", length: 255 })
    user!: string;

    @Column({ type: "datetime" })
    date!: Date;

    @Column({ type: "int" })
    idShipment!: number;

    @ManyToOne(() => Shipment, (row) => row.auditEntries, { nullable: false })
    @JoinColumn({ name: "idShipment" })
    shipment!: Relation<Shipment>;
}
