import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Shipment } from "./Shipment.js";
import { Warehouse } from "./Warehouse.js";

@Entity("package")
export class Package {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    weight!: string;

    @Column({ type: "varchar", length: 255 })
    dimensions!: string;

    @Column({ type: "varchar", length: 255 })
    contents!: string;

    @Column({ type: "int" })
    idShipment!: number;

    @Column({ type: "int" })
    idWarehouse!: number;

    @ManyToOne(() => Shipment, (row) => row.packages, { nullable: false })
    @JoinColumn({ name: "idShipment" })
    shipment!: Relation<Shipment>;

    @ManyToOne(() => Warehouse, (row) => row.packages, { nullable: false })
    @JoinColumn({ name: "idWarehouse" })
    warehouse!: Relation<Warehouse>;
}
