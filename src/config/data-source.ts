import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "../entities/Categoria.js";
import { Producto } from "../entities/Producto.js";
import { Venta } from "../entities/Venta.js";
import { DetalleVenta } from "../entities/DetalleVenta.js";

export const AppDataSource = new DataSource({
    type: "mysql", // O "mariadb"
    host: "localhost",
    port: 3307,
    username: "root",
    password: "secret",
    database: "ventas_db",
    synchronize: false, // Se mantiene false ya que las tablas fueron creadas previamente por SQL
    logging: true,
    entities: [Categoria, Producto, Venta, DetalleVenta],
    subscribers: [],
    migrations: [],
});
