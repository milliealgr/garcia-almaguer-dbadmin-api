import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from "typeorm";
import { Package } from "./Package.js";

@Entity("warehouse")
export class Warehouse {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @Column({ type: "varchar", length: 255 })
    location!: string;

    @Column({ type: "int" })
    maxCapacity!: number;

    @OneToMany(() => Package, (row) => row.warehouse)
    packages!: Relation<Package[]>;
}
