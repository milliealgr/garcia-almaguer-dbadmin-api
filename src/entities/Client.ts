import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Address } from "./Address.js";
import { Shipment } from "./Shipment.js";

@Entity("client")
export class Client {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 20 })
    state!: "active" | "inactive";

    @Column({ type: "int" })
    creditLimit!: number;

    @OneToMany(() => Address, (row) => row.client)
    addresses!: Relation<Address[]>;

    @OneToMany(() => Shipment, (row) => row.sender)
    sentShipments!: Relation<Shipment[]>;

    @OneToMany(() => Shipment, (row) => row.recipient)
    receivedShipments!: Relation<Shipment[]>;
}
