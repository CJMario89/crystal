"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Requested_1 = require("./entity/Requested");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "./model/audit.sqlite",
    synchronize: true,
    logging: false,
    entities: [Requested_1.Requested],
    migrations: ["./src/migration/*.ts"],
    subscribers: [],
});
