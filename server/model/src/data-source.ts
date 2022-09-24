import "reflect-metadata"
import { DataSource } from "typeorm"
import { Requested } from "./entity/Requested"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./model/audit.sqlite",
    synchronize: true,
    logging: false,
    entities: [Requested],
    migrations: ["./src/migration/*.ts"],
    subscribers: [],
})
