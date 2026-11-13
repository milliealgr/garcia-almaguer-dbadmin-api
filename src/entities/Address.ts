import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Client } from "./Client.js";

@Entity("address")
export class Address {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    originAddress!: string;

    @Column({ type: "varchar", length: 255 })
    destinationAddress!: string;

    @Column({ type: "int" })
    idClient!: number;

    @ManyToOne(() => Client, (row) => row.addresses, { nullable: false })
    @JoinColumn({ name: "idClient" })
    client!: Relation<Client>;
}
